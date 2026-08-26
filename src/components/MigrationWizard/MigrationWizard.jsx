/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../assets/baseURL/api';
import './MigrationWizard.css';

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
    setItems((prev) => prev.map((item) => item.source_item_id === sourceItemId ? { ...item, selected: item.eligible ? selected : false } : item));
  };

  const setAllEligible = (selected) => {
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
      {step < 3 && (
        <PreferencePanel
          preference={preference}
          onChange={choosePreference}
          onDeleteRequest={() => setModal('delete')}
        />
      )}

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

      {step === 3 && (
        <section className="migration-card migration-wizard-card migration-final-card">
          <CardTitle title="Migration preference" step={step} />
          <div className="migration-final-preferences">
            <PreferenceOption
              checked={preference === PREFERENCES.DECLINE}
              onChange={() => choosePreference(PREFERENCES.DECLINE)}
              label="I don't want to migrate my profile details and items to Taggy"
            >
              <p>Your Reloved profile and listings will not be transferred to Taggy.</p>
              {preference === PREFERENCES.DECLINE && (
                <button type="button" className="migration-delete-link" onClick={(event) => { event.preventDefault(); setModal('delete'); }}>Request deletion of my Reloved data</button>
              )}
            </PreferenceOption>

            <PreferenceOption
              checked={preference === PREFERENCES.AGREE}
              onChange={() => choosePreference(PREFERENCES.AGREE)}
              label="I agree to migrate my profile details and selected items to Taggy"
            >
              <p>Your profile details and the checked listings above will be included in the migration.</p>
              {preference === PREFERENCES.AGREE && (
                <>
                  <p className="migration-selected-count">
                    {selectedEligibleItems.length > 0
                      ? `${selectedEligibleItems.length} eligible listing(s) selected`
                      : 'No listings selected — only your account/profile will migrate.'}
                  </p>
                  <button className="migration-link-button migration-link-button-inline" type="button" onClick={(event) => { event.preventDefault(); setModal('terms'); }}>View migration terms &amp; data confirmation</button>
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

          <div className="migration-card-footer migration-card-footer-split">
            <button className="migration-secondary" type="button" onClick={() => setStep(preference === PREFERENCES.DECLINE ? 1 : 2)}>Previous</button>
            {preference === PREFERENCES.DECLINE ? (
              <button className="migration-primary" type="button" onClick={() => setModal('decline')} disabled={saving}>Confirm preference</button>
            ) : (
              <button className="migration-primary" type="button" onClick={() => submitDecision(finalAgreeDecision)} disabled={preference !== PREFERENCES.AGREE || !acknowledged || saving}>{saving ? 'Saving...' : 'Confirm preference'}</button>
            )}
          </div>
        </section>
      )}

      {modal === 'terms' && <TermsModal decision={finalAgreeDecision} consent={consentFor(finalAgreeDecision)} selectedCount={selectedEligibleItems.length} onClose={() => setModal(null)} onAccept={() => { setAcknowledged(true); setModal(null); }} />}
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
        <a className="migration-primary migration-final-link" href={taggyUrl}>Go to Taggy</a>
      </section>
    </MigrationShell>
  );
}

function ConfirmationCopy({ data }) {
  const count = data.selected_item_count || 0;
  if (data.decision === DECISIONS.ACCOUNT_ITEMS) return <><h1>Thank you</h1><h2>Your migration preference has been confirmed.</h2><p>Your Reloved account details and <strong>{count} selected eligible listing(s)</strong> will be prepared for migration to Taggy.</p><p>Thank you for taking the time to review and confirm your information.</p></>;
  if (data.decision === DECISIONS.ACCOUNT_ONLY) return <><h1>Thank you</h1><h2>Your migration preference has been confirmed.</h2><p>Your Reloved account details will be prepared for migration to Taggy.</p><p>Your listings will not be transferred.</p></>;
  if (data.decision === DECISIONS.DELETE) return <><h1>Your request has been saved</h1><p>Nothing will be transferred to Taggy and your deletion request has been recorded.</p></>;
  return <><h1>Your preference has been saved.</h1><p>Nothing from your Reloved account or listings will be transferred to Taggy.</p></>;
}

function MigrationShell({ children, step, title }) {
  return <main className="migration-page"><img src={relovedWordmark} alt="Reloved" className="migration-wordmark" />{step && title && <h1 className="migration-page-title">Step {step} of 3 — {title}</h1>}{children}</main>;
}

function PreferencePanel({ preference, onChange, onDeleteRequest }) {
  return (
    <section className="migration-card migration-preference-panel">
      <h2>Migration preference</h2>
      <PreferenceOption
        checked={preference === PREFERENCES.DECLINE}
        onChange={() => onChange(PREFERENCES.DECLINE)}
        label="I don't want to migrate my profile details and items to Taggy"
      />
      {preference === PREFERENCES.DECLINE && (
        <div className="migration-decline-copy">
          <p>Your profile and listings will not be transferred to Taggy. Your existing Reloved data will remain with Reloved and will continue to be handled in accordance with the Reloved privacy and data-retention policy.</p>
          <button type="button" className="migration-delete-link" onClick={onDeleteRequest}>Request deletion of my Reloved data</button>
        </div>
      )}
      <PreferenceOption
        checked={preference === PREFERENCES.AGREE}
        onChange={() => onChange(PREFERENCES.AGREE)}
        label="I agree to migrate my profile details and selected items to Taggy"
      />
    </section>
  );
}

function PreferenceOption({ checked, onChange, label, children }) {
  return <label className={`migration-pref-option ${checked ? 'selected' : ''}`}><input type="checkbox" checked={checked} onChange={onChange} /><span><strong>{label}</strong>{children}</span></label>;
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

function TermsModal({ decision, consent, selectedCount, onClose, onAccept }) {
  return <Modal title="Migration terms & data confirmation" onClose={onClose} onAccept={onAccept}><p>{consent?.content}</p><ul><li>Your reviewed migration profile will be provided to Taggy.</li><li>{decision === DECISIONS.ACCOUNT_ITEMS ? `${selectedCount} selected eligible listing(s) will be prepared for transfer.` : 'No listings are selected, so your listings will not be transferred.'}</li><li>Taggy is a separate live marketplace and additional account setup or verification may be required.</li><li>You confirm the information you reviewed is accurate.</li></ul></Modal>;
}

function DeclineModal({ consent, onClose, onAccept }) {
  return <Modal title="Confirm no migration" onClose={onClose} onAccept={onAccept}><p>{consent?.content}</p><p>Nothing from your Reloved account or listings will be transferred to Taggy. This is different from requesting deletion.</p></Modal>;
}

function DeleteModal({ consent, onClose, onAccept }) {
  return <Modal title="Confirm deletion request" onClose={onClose} onAccept={onAccept}><p>{consent?.content}</p><p>Nothing will transfer to Taggy. A deletion request will be recorded; legal, regulatory and backup retention requirements may still apply.</p></Modal>;
}

function Modal({ title, children, onClose, onAccept }) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return <div className="migration-modal-backdrop" onClick={onClose}><section className="migration-modal" role="dialog" aria-modal="true" aria-labelledby="migration-modal-title" onClick={(e) => e.stopPropagation()}><h2 id="migration-modal-title">{title}</h2>{children}<label className="migration-ack"><input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} /> I have read and acknowledge this confirmation.</label><div className="migration-actions"><button className="migration-secondary" type="button" onClick={onClose}>Close</button><button className="migration-primary" type="button" disabled={!checked} onClick={onAccept}>Accept & continue</button></div></section></div>;
}

function renderApiError(err) {
  const msg = err.response?.data?.message;
  if (typeof msg === 'string') return msg;
  if (msg && typeof msg === 'object') return Object.values(msg).flat().join(' ');
  return 'Something went wrong. Please try again.';
}
