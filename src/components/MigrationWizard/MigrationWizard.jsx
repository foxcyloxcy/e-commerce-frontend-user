/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import api from '../../assets/baseURL/api';
import './MigrationWizard.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const DECISIONS = {
  ACCOUNT_ITEMS: 'CONSENT_ACCOUNT_AND_ITEMS',
  ACCOUNT_ONLY: 'CONSENT_ACCOUNT_ONLY',
  DECLINE: 'DECLINED_KEEP_RELOVED',
  DELETE: 'DELETE_REQUESTED',
};

const PREFERENCES = {
  AGREE: 'agree',
  DECLINE: 'decline',
};

const taggyUrl = import.meta.env.VITE_TAGGY_URL || 'https://taggy.ae';
const migrationTermsUrl = '/legal/2026-08-31-RelovedtoTaggyTermsandConditions.pdf';
const relovedWordmark = 'https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/reloved_header_logo.png';

const emptyProfile = {
  first_name: '',
  last_name: '',
  email: '',
  mobile_number: '',
  address: '',
  gender: 0,
  date_of_birth: '',
  member_since: '',
};

export default function MigrationWizard({ userToken }) {
  const navigate = useNavigate();
  const selectAllRef = useRef(null);
  const [step, setStep] = useState(1);
  const [migrationCase, setMigrationCase] = useState(null);
  const [profile, setProfile] = useState(emptyProfile);
  const [items, setItems] = useState([]);
  const [consentVersions, setConsentVersions] = useState([]);
  const [preference, setPreference] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${userToken}`, 'Content-Type': 'application/json' }), [userToken]);

  const loadWizard = useCallback(async () => {
    if (!userToken) return;
    setLoading(true);
    setError('');
    try {
      const [startRes, profileRes, itemsRes, consentRes] = await Promise.all([
        api.get('/api/auth/migration', { headers: authHeaders }),
        api.get('/api/auth/migration/profile', { headers: authHeaders }),
        api.get('/api/auth/migration/items', { headers: authHeaders }),
        api.get('/api/auth/migration/consent', { headers: authHeaders }),
      ]);

      const currentCase = startRes.data.data;
      setMigrationCase(currentCase);
      setProfile({ ...emptyProfile, ...profileRes.data.data });
      setItems(itemsRes.data.data || []);
      setConsentVersions(consentRes.data.data?.consent_versions || []);

      if (currentCase.submitted_at) {
        navigate('/migration/confirmation', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load the migration wizard. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [authHeaders, navigate, userToken]);

  useEffect(() => { loadWizard(); }, [loadWizard]);

  const eligibleItems = items.filter((item) => item.eligible);
  const selectedEligibleItems = items.filter((item) => item.eligible && item.selected);
  const allEligibleSelected = eligibleItems.length > 0 && selectedEligibleItems.length === eligibleItems.length;
  const partiallySelected = selectedEligibleItems.length > 0 && !allEligibleSelected;

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = partiallySelected;
  }, [partiallySelected]);

  const finalAgreeDecision = selectedEligibleItems.length > 0 ? DECISIONS.ACCOUNT_ITEMS : DECISIONS.ACCOUNT_ONLY;

  const consentFor = (decision) => {
    const map = {
      [DECISIONS.ACCOUNT_ITEMS]: 'ACCOUNT_AND_ITEMS',
      [DECISIONS.ACCOUNT_ONLY]: 'ACCOUNT_ONLY',
      [DECISIONS.DECLINE]: 'DECLINE_KEEP',
      [DECISIONS.DELETE]: 'DELETE_REQUEST',
    };
    return consentVersions.find((version) => version.consent_type === map[decision]);
  };

  const formatDate = (value) => value ? new Date(value).toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not provided';

  const choosePreference = (value) => {
    setPreference(value);
    setAcknowledged(false);
  };

  const saveProfileAndNext = async () => {
    if (preference !== PREFERENCES.AGREE) return;
    setSaving(true);
    setError('');
    try {
      const payload = { ...profile };
      delete payload.member_since;
      await api.patch('/api/auth/migration/profile', payload, { headers: authHeaders });
      setStep(2);
    } catch (err) {
      setError(renderApiError(err));
    } finally { setSaving(false); }
  };

  const saveItemsAndNext = async () => {
    if (preference !== PREFERENCES.AGREE) return;
    setSaving(true);
    setError('');
    try {
      const selected_item_ids = selectedEligibleItems.map((item) => item.source_item_id);
      await api.patch('/api/auth/migration/items', { selected_item_ids }, { headers: authHeaders });
      setStep(3);
    } catch (err) {
      setError(renderApiError(err));
    } finally { setSaving(false); }
  };

  const setItemSelected = (sourceItemId, selected) => {
    setAcknowledged(false);
    setItems((prev) => prev.map((item) => item.source_item_id === sourceItemId ? { ...item, selected: item.eligible ? selected : false } : item));
  };

  const setAllEligible = (selected) => {
    setAcknowledged(false);
    setItems((prev) => prev.map((item) => ({ ...item, selected: item.eligible ? selected : false })));
  };

  const submitDecision = async (decision) => {
    setSaving(true);
    setError('');
    try {
      await api.post('/api/auth/migration/decision', { decision, acknowledged: true }, { headers: authHeaders });
      navigate('/migration/confirmation', { replace: true });
    } catch (err) {
      setError(renderApiError(err));
    } finally { setSaving(false); setModal(null); }
  };

  const disabledContent = preference !== PREFERENCES.AGREE;
  const pageTitle = step === 1 ? 'Your details' : step === 2 ? 'Your listings' : 'Move to Taggy';

  if (loading) {
    return <MigrationShell step={step} title={pageTitle}><div className="migration-card migration-loading">Loading your Reloved migration review...</div></MigrationShell>;
  }

  return (
    <MigrationShell step={step} title={pageTitle}>
      <PreferencePanel
        step={step}
        preference={preference}
        acknowledged={acknowledged}
        onChange={choosePreference}
        onOpenTerms={() => setModal('terms')}
        onDeleteRequest={() => setModal('delete')}
      >
        {step === 3 && (
          <div className="migration-card-footer migration-card-footer-split">
            <button className="migration-secondary" type="button" onClick={() => setStep(preference === PREFERENCES.DECLINE ? 1 : 2)}>Previous</button>
            {preference === PREFERENCES.DECLINE ? (
              <button className="migration-primary" type="button" onClick={() => setModal('decline')} disabled={saving}>Confirm preference</button>
            ) : (
              <button className="migration-primary" type="button" onClick={() => submitDecision(finalAgreeDecision)} disabled={preference !== PREFERENCES.AGREE || !acknowledged || saving}>{saving ? 'Saving...' : 'Confirm preference'}</button>
            )}
          </div>
        )}
      </PreferencePanel>

      {error && <div className="migration-error migration-card" role="alert">{error}</div>}
      {migrationCase?.response_deadline && <p className="migration-deadline">Response deadline: {formatDate(migrationCase.response_deadline)}</p>}

      {step === 1 && (
        <section className={`migration-card migration-wizard-card ${disabledContent ? 'migration-content-disabled' : ''}`}>
          <CardTitle title="Your profile details" step={step} />
          <fieldset disabled={disabledContent}>
            <div className="migration-form-grid">
              <Field label="First name" value={profile.first_name} onChange={(v) => setProfile({ ...profile, first_name: v })} required />
              <Field label="Last name" value={profile.last_name} onChange={(v) => setProfile({ ...profile, last_name: v })} required />
              <Field label="Email address" type="email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} required />
              <label className="migration-field"><span>Address</span><textarea value={profile.address || ''} onChange={(e) => setProfile({ ...profile, address: e.target.value })} /></label>
              <Field label="Date of birth" type="date" value={profile.date_of_birth || ''} onChange={(v) => setProfile({ ...profile, date_of_birth: v })} />
              <Field label="Phone number" value={profile.mobile_number} onChange={(v) => setProfile({ ...profile, mobile_number: v })} />
              <Field label="Member since" value={formatDate(profile.member_since)} readOnly />
            </div>
          </fieldset>
          <p className="migration-helper">These details are saved as your Taggy migration draft only. Your Reloved profile is not changed.</p>
          <div className="migration-card-footer">
            {preference === PREFERENCES.DECLINE ? (
              <button className="migration-primary" type="button" onClick={() => setModal('decline')} disabled={saving}>Confirm Preference</button>
            ) : (
              <button className="migration-primary" type="button" onClick={saveProfileAndNext} disabled={saving || preference !== PREFERENCES.AGREE}>{saving ? 'Saving...' : 'Next'}</button>
            )}
          </div>
        </section>
      )}

      {step === 2 && (
        <section className={`migration-card migration-wizard-card ${disabledContent ? 'migration-content-disabled' : ''}`}>
          <CardTitle title="Your current items" step={step} />
          <p className="migration-muted">Only Taggy-supported fashion listings can be transferred. Unsupported listings are shown but cannot be selected.</p>
          <fieldset disabled={disabledContent}>
            <label className="migration-select-all">
              <input ref={selectAllRef} type="checkbox" checked={allEligibleSelected} onChange={(e) => setAllEligible(e.target.checked)} disabled={eligibleItems.length === 0 || disabledContent} />
              <span>Select all items</span>
            </label>
            <div className="migration-listings" aria-label="Your Reloved listings">
              {items.length ? items.map((item) => <ListingRow key={item.source_item_id} item={item} onChange={setItemSelected} />) : <div className="migration-empty">No listings were found for your account.</div>}
            </div>
          </fieldset>
          <div className="migration-card-footer migration-card-footer-split">
            <button className="migration-secondary" type="button" onClick={() => setStep(1)}>Previous</button>
            {preference === PREFERENCES.DECLINE ? (
              <button className="migration-primary" type="button" onClick={() => setModal('decline')} disabled={saving}>Confirm Preference</button>
            ) : (
              <button className="migration-primary" type="button" onClick={saveItemsAndNext} disabled={saving || preference !== PREFERENCES.AGREE}>{saving ? 'Saving...' : 'Next'}</button>
            )}
          </div>
        </section>
      )}


      {modal === 'terms' && <TermsModal selectedCount={selectedEligibleItems.length} onClose={() => setModal(null)} onAccept={() => { setAcknowledged(true); setModal(null); }} />}
      {modal === 'decline' && <DeclineModal consent={consentFor(DECISIONS.DECLINE)} onClose={() => setModal(null)} onAccept={() => submitDecision(DECISIONS.DECLINE)} />}
      {modal === 'delete' && <DeleteModal consent={consentFor(DECISIONS.DELETE)} onClose={() => setModal(null)} onAccept={() => submitDecision(DECISIONS.DELETE)} />}
    </MigrationShell>
  );
}

export function MigrationConfirmationPage({ userToken }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${userToken}` }), [userToken]);

  useEffect(() => {
    if (!userToken) return;
    api.get('/api/auth/migration/confirmation', { headers: authHeaders })
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err.response?.data?.message || 'No confirmed migration preference was found.'));
  }, [authHeaders, userToken]);

  return (
    <MigrationShell>
      <section className="migration-card migration-confirmation-card">
        {error && <><h1>Your migration preference is not complete</h1><p>{error}</p></>}
        {!error && !data && <p>Loading confirmation...</p>}
        {data && <ConfirmationCopy data={data} />}
        <a className="migration-primary migration-final-link" href={taggyUrl}>Explore Taggy</a>
      </section>
    </MigrationShell>
  );
}

function ConfirmationCopy({ data }) {
  if (data.decision === DECISIONS.ACCOUNT_ITEMS || data.decision === DECISIONS.ACCOUNT_ONLY) {
    return <><div className="migration-confirmation-icon"><MailOutlineIcon fontSize="inherit" /></div><h1>Migration in progress</h1><p>Once your request is completed, we'll notify you at your registered email. In the meantime, feel free to explore Taggy.</p></>;
  }

  if (data.decision === DECISIONS.DELETE) {
    return <><div className="migration-confirmation-icon migration-confirmation-icon-delete"><DeleteOutlineIcon fontSize="inherit" /></div><h1>Don&apos;t want to migrate</h1><p>Your deletion request has been received and will be processed in line with applicable data-processing and retention requirements.</p></>;
  }

  return <><div className="migration-confirmation-icon"><MailOutlineIcon fontSize="inherit" /></div><h1>Your migration preference was saved</h1><p>Your Reloved account and listings will not be transferred to Taggy. Your Reloved information remains handled under the applicable Reloved privacy and retention policy.</p></>;
}

function MigrationShell({ children, step, title }) {
  return <main className="migration-page"><img src={relovedWordmark} alt="Reloved" className="migration-wordmark" />{step && title && <h1 className="migration-page-title">Step {step} of 3 — {title}</h1>}{children}</main>;
}

function PreferencePanel({ step, preference, acknowledged, onChange, onOpenTerms, onDeleteRequest, children }) {
  const declineSelected = preference === PREFERENCES.DECLINE;
  const agreeSelected = preference === PREFERENCES.AGREE;

  return (
    <section className="migration-card migration-preference-panel">
      <CardTitle title="Migration preference" step={step} />
      <div className="migration-preference-options">
        <PreferenceOption
          checked={declineSelected}
          muted={agreeSelected}
          onChange={() => onChange(PREFERENCES.DECLINE)}
          label="I don't want to migrate my profile details and items to Taggy"
        >
          <p>Your Reloved profile and listings will not be transferred to Taggy.</p>
          {declineSelected && (
            <>
              <div className="migration-decline-copy">
                You have chosen not to migrate your profile details or items.<br />
                All previous information is now disabled.
              </div>
              <button type="button" className="migration-delete-link" onClick={(event) => { event.preventDefault(); onDeleteRequest(); }}>Request deletion of my Reloved data</button>
            </>
          )}
        </PreferenceOption>

        <PreferenceOption
          checked={agreeSelected}
          muted={declineSelected}
          onChange={() => onChange(PREFERENCES.AGREE)}
          label="I agree to migrate my profile details and selected items to Taggy"
        >
          <p>Your profile details and the checked listings above will be included in the migration.</p>
          {agreeSelected && (
            <>
              <button className="migration-link-button migration-link-button-inline" type="button" onClick={(event) => { event.preventDefault(); onOpenTerms(); }}>View migration terms &amp; data confirmation</button>
              {!acknowledged && (
                <div className="migration-warning migration-warning-inline">
                  Before you can confirm migration, please open <strong>Migration terms &amp; data confirmation</strong>, review the information, and accept the acknowledgement.
                </div>
              )}
              {acknowledged && <div className="migration-ok migration-warning-inline">Migration terms and data confirmation acknowledged.</div>}
            </>
          )}
        </PreferenceOption>
      </div>
      {children}
    </section>
  );
}

function PreferenceOption({ checked, muted, onChange, label, children }) {
  return <label className={`migration-pref-option ${checked ? 'selected' : ''} ${muted ? 'muted' : ''}`}><input type="checkbox" checked={checked} onChange={onChange} /><span><strong>{label}</strong>{children}</span></label>;
}

function CardTitle({ title, step }) {
  return <div className="migration-card-title"><div><h2>{title}</h2><StepIndicator step={step} /></div><span>Step {step}/3</span></div>;
}

function StepIndicator({ step }) {
  return <div className="migration-steps" aria-label={`Step ${step} of 3`}>{[1, 2, 3].map((s) => <span key={s} className={s <= step ? 'active' : ''} />)}</div>;
}

function Field({ label, value, onChange, type = 'text', readOnly = false, required = false }) {
  return <label className="migration-field"><span>{label}</span><input type={type} value={value || ''} readOnly={readOnly} required={required} onChange={(e) => onChange?.(e.target.value)} /></label>;
}

function ListingRow({ item, onChange }) {
  return <label className={`migration-listing ${!item.eligible ? 'unsupported' : ''}`}><input type="checkbox" checked={!!item.selected && item.eligible} disabled={!item.eligible} onChange={(e) => onChange(item.source_item_id, e.target.checked)} /><img src={item.thumbnail_url || '/reloved_icon.png'} alt="" /><span className="listing-main"><strong>{item.item_name}</strong><small>{[item.size, item.condition].filter(Boolean).join(' / ') || 'Details saved from Reloved'}</small><small>AED {item.price}</small><small>AED {item.price} incl.</small>{!item.eligible && <em>Not eligible for Taggy</em>}</span><span className="listing-side"><small className={item.active ? 'active' : ''}>{item.active ? 'Active listing' : item.status_name}</small></span></label>;
}

function TermsModal({ selectedCount, onClose, onAccept }) {
  const viewerRef = useRef(null);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return undefined;

    const updateWidth = () => setPageWidth(Math.max(0, viewer.clientWidth - (window.innerWidth <= 680 ? 20 : 40)));
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(viewer);
    return () => observer.disconnect();
  }, []);

  return (
    <Modal
      title="Migration terms & data confirmation"
      className="migration-terms-modal"
      acknowledgementLabel="I confirm that I have reviewed the Reloved to Taggy Migration Terms and understand the information included in my selected migration option."
      onClose={onClose}
      onAccept={onAccept}
    >
      <div className="migration-terms-summary" aria-label="Your migration includes">
        <strong>Your migration includes:</strong>
        <span>✓ Your reviewed Reloved account/profile details</span>
        <span>{selectedCount > 0 ? `✓ ${selectedCount} selected eligible listing${selectedCount === 1 ? '' : 's'}` : '— No listings selected'}</span>
      </div>
      <div ref={viewerRef} className="migration-pdf-viewer" aria-label="Reloved to Taggy Migration Terms document">
        <Document
          file={migrationTermsUrl}
          loading={<p className="migration-pdf-status">Loading Migration Terms…</p>}
          error={<p className="migration-pdf-status migration-pdf-error">The embedded document could not be displayed on this device.</p>}
          onLoadSuccess={({ numPages: loadedPages }) => setNumPages(loadedPages)}
        >
          {pageWidth > 0 && Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`migration-terms-page-${index + 1}`}
              pageNumber={index + 1}
              width={pageWidth}
              devicePixelRatio={Math.min(window.devicePixelRatio || 1, 1.5)}
              loading={<p className="migration-pdf-status">Loading page {index + 1}…</p>}
            />
          ))}
        </Document>
      </div>
    </Modal>
  );
}

function DeclineModal({ consent, onClose, onAccept }) {
  return <Modal title="Confirm no migration" onClose={onClose} onAccept={onAccept}><p>{consent?.content}</p><p>Nothing from your Reloved account or listings will be transferred to Taggy. This is different from requesting deletion.</p></Modal>;
}

function DeleteModal({ consent, onClose, onAccept }) {
  return <Modal title="Confirm deletion request" onClose={onClose} onAccept={onAccept}><p>{consent?.content}</p><p>Nothing will transfer to Taggy. A deletion request will be recorded; legal, regulatory and backup retention requirements may still apply.</p></Modal>;
}

function Modal({ title, children, onClose, onAccept, acknowledgementLabel = 'I have read and acknowledge this confirmation.', className = '' }) {
  const [checked, setChecked] = useState(false);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(document.activeElement);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog?.focus();

    const handler = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;
      const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = previousBodyOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [onClose]);

  return <div className="migration-modal-backdrop" onClick={onClose}><section ref={dialogRef} className={`migration-modal ${className}`} role="dialog" aria-modal="true" aria-labelledby="migration-modal-title" tabIndex="-1" onClick={(e) => e.stopPropagation()}><header className="migration-modal-header"><h2 id="migration-modal-title">{title}</h2><button className="migration-modal-close" type="button" aria-label="Close dialog" onClick={onClose}>×</button></header>{children}<label className="migration-ack"><input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} /> <span>{acknowledgementLabel}</span></label><div className="migration-actions"><button className="migration-secondary" type="button" onClick={onClose}>Close</button><button className="migration-primary" type="button" disabled={!checked} onClick={onAccept}>Accept & continue</button></div></section></div>;
}

function renderApiError(err) {
  const msg = err.response?.data?.message;
  if (typeof msg === 'string') return msg;
  if (msg && typeof msg === 'object') return Object.values(msg).flat().join(' ');
  return 'Something went wrong. Please try again.';
}
