import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../assets/baseURL/api';
import ModTheme from '../ThemeComponent/ModTheme';
import './ConsentFormPage.css';

const emptyProfile = {
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  date_of_birth: '',
  mobile_number: '',
  member_since: '',
};

const ConsentFormPage = ({ userToken }) => {
  const [profile, setProfile] = useState(emptyProfile);
  const [items, setItems] = useState([]);
  const [decline, setDecline] = useState(false);
  const [agree, setAgree] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsAcknowledge, setTermsAcknowledge] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [savedPreference, setSavedPreference] = useState(null);

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${userToken}`,
    'Content-Type': 'application/json',
  }), [userToken]);

  const loadConsentPageData = useCallback(async () => {
    if (!userToken) return;

    setLoading(true);

    try {
      const [profileRes, itemsRes, consentRes] = await Promise.all([
        api.get('/api/auth/me/profile', { headers: authHeaders }),
        api.get('/api/auth/me/items?status=0,1,2,3,4&page=1&size=100', { headers: authHeaders }),
        api.get('/api/auth/me/migration-consent', { headers: authHeaders }),
      ]);

      const user = profileRes.data.data || {};
      setProfile({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        address: user.address || '',
        date_of_birth: user.date_of_birth || '',
        mobile_number: user.mobile_number || '',
        member_since: user.created_at ? new Date(user.created_at).toLocaleDateString('en-AE', { month: 'long', year: 'numeric' }) : '',
      });

      const loadedItems = itemsRes.data.data?.data || [];
      setItems(loadedItems.map((item) => ({
        uuid: item.uuid,
        selected: true,
        item_name: item.item_name || '',
        item_meta: `AED ${item.price || 0} · ${item.status_name || 'Listing'}`,
        image_url: item.default_image?.image_url || '',
      })));

      if (consentRes.data.data) {
        setSavedPreference(consentRes.data.data.preference);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Unable to load migration form',
        text: error.response?.data?.message || 'Please try again later.',
        icon: 'error',
        confirmButtonColor: ModTheme.palette.primary.main,
      });
    } finally {
      setLoading(false);
    }
  }, [authHeaders, userToken]);

  useEffect(() => {
    loadConsentPageData();
  }, [loadConsentPageData]);

  const selectedCount = items.filter((item) => item.selected).length;
  const allSelected = items.length > 0 && selectedCount === items.length;
  const partiallySelected = selectedCount > 0 && selectedCount < items.length;
  const canConfirm = decline || (agree && termsAccepted);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (uuid, field, value) => {
    setItems((prev) => prev.map((item) => (
      item.uuid === uuid ? { ...item, [field]: value } : item
    )));
  };

  const handleSelectAll = (checked) => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: checked })));
  };

  const handleDeclineChange = (checked) => {
    setDecline(checked);

    if (checked) {
      setAgree(false);
      setTermsAccepted(false);
      setTermsAcknowledge(false);
    }
  };

  const handleAgreeChange = (checked) => {
    setAgree(checked);

    if (checked) {
      setDecline(false);
    } else {
      setTermsAccepted(false);
      setTermsAcknowledge(false);
    }
  };

  const openTerms = (event) => {
    event.preventDefault();

    if (!agree) {
      setAgree(true);
      setDecline(false);
    }

    setTermsOpen(true);
  };

  const acceptTerms = () => {
    setTermsAccepted(true);
    setTermsOpen(false);
  };

  const savePreference = async () => {
    if (!canConfirm) return;

    setSubmitting(true);

    const payload = decline
      ? { preference: 'decline', terms_accepted: false }
      : {
        preference: 'migrate',
        terms_accepted: true,
        profile_snapshot: profile,
        selected_items: items.filter((item) => item.selected).map(({ uuid, item_name, item_meta, image_url }) => ({
          uuid,
          item_name,
          item_meta,
          image_url,
        })),
      };

    try {
      const res = await api.post('/api/auth/me/migration-consent', payload, { headers: authHeaders });
      setSavedPreference(payload.preference);

      Swal.fire({
        title: 'Preference saved',
        text: res.data.message || 'Your migration preference has been saved.',
        icon: 'success',
        confirmButtonColor: ModTheme.palette.primary.main,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Unable to save preference',
        text: error.response?.data?.message || 'Please try again later.',
        icon: 'error',
        confirmButtonColor: ModTheme.palette.primary.main,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="consent-page"><div className="consent-card">Loading migration consent form...</div></div>;
  }

  return (
    <main className="consent-page">
      <div className="consent-brand">
        <div className="consent-brand-left">
          <div className="consent-logo">R→T</div>
          <div>
            <div className="consent-eyebrow">Account migration</div>
            <h1>Move your Reloved account to Taggy</h1>
          </div>
        </div>
      </div>

      <p className="consent-intro">
        Review the profile information and listings currently stored in our database. Choose which items you would like to migrate, then provide your migration consent below.
      </p>

      {savedPreference && (
        <div className="consent-saved-note">
          Last saved preference: <strong>{savedPreference === 'migrate' ? 'Migrate to Taggy' : 'Do not migrate'}</strong>
        </div>
      )}

      <div className={decline ? 'consent-disabled-area' : ''}>
        <section className="consent-card">
          <div className="consent-section-title">
            <div>
              <h2>Your profile details</h2>
              <p>These details will be included if you approve migration.</p>
            </div>
          </div>

          <div className="consent-profile-grid">
            <ProfileInput label="First name" value={profile.first_name} onChange={(value) => handleProfileChange('first_name', value)} />
            <ProfileInput label="Last name" value={profile.last_name} onChange={(value) => handleProfileChange('last_name', value)} />
            <ProfileInput label="Email address" type="email" value={profile.email} onChange={(value) => handleProfileChange('email', value)} />
            <ProfileInput label="Address" value={profile.address} onChange={(value) => handleProfileChange('address', value)} />
            <ProfileInput label="Date of birth" type="date" value={profile.date_of_birth || ''} onChange={(value) => handleProfileChange('date_of_birth', value)} />
            <ProfileInput label="Phone number" type="tel" value={profile.mobile_number} onChange={(value) => handleProfileChange('mobile_number', value)} />
            <ProfileInput label="Member since" value={profile.member_since} onChange={(value) => handleProfileChange('member_since', value)} />
          </div>
          <div className="consent-helper-text">Review and edit these details before confirming. The information saved here will be used for your Taggy account migration.</div>
        </section>

        <section className="consent-card">
          <div className="consent-section-title">
            <div>
              <h2>Your current items</h2>
              <p>Select the listings you want included in the migration.</p>
            </div>
          </div>

          <label className="consent-choice consent-select-all">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(input) => {
                if (input) input.indeterminate = partiallySelected;
              }}
              onChange={(event) => handleSelectAll(event.target.checked)}
            />
            <div>
              <strong>Select all items</strong>
              <span>Select or clear all listings below.</span>
            </div>
          </label>

          <div className="consent-items">
            {items.length ? items.map((item) => (
              <label className="consent-item" key={item.uuid}>
                <input type="checkbox" checked={item.selected} onChange={(event) => handleItemChange(item.uuid, 'selected', event.target.checked)} />
                {item.image_url ? <img className="consent-thumb" src={item.image_url} alt={item.item_name} /> : <div className="consent-thumb" />}
                <div className="consent-item-info">
                  <input className="consent-input" type="text" value={item.item_name} onChange={(event) => handleItemChange(item.uuid, 'item_name', event.target.value)} />
                  <input className="consent-input consent-item-meta-input" type="text" value={item.item_meta} onChange={(event) => handleItemChange(item.uuid, 'item_meta', event.target.value)} />
                </div>
              </label>
            )) : <div className="consent-helper-text">No current items found.</div>}
          </div>
        </section>
      </div>

      <section className="consent-card consent-preference-card">
        <div className="consent-section-title">
          <div>
            <h2>Migration preference</h2>
            <p>Please choose one option below.</p>
          </div>
        </div>

        {decline && <div className="consent-notice">You have chosen not to migrate your profile details or items. The information above is now disabled.</div>}

        <label className={`consent-choice ${agree ? 'consent-choice-disabled' : ''}`}>
          <input type="checkbox" checked={decline} disabled={agree} onChange={(event) => handleDeclineChange(event.target.checked)} />
          <div>
            <strong>I don&apos;t want to migrate my profile details and items to Taggy</strong>
            <span>Your Reloved profile and listings will not be transferred to Taggy.</span>
          </div>
        </label>

        <label className={`consent-choice ${decline ? 'consent-choice-disabled' : ''}`}>
          <input type="checkbox" checked={agree} disabled={decline} onChange={(event) => handleAgreeChange(event.target.checked)} />
          <div>
            <strong>I agree to migrate my profile details and selected items to Taggy</strong>
            <span>Your profile details and the checked listings above will be included in the migration.</span>
            <a href="#" className="consent-terms-link" onClick={openTerms}>View migration terms &amp; data confirmation</a>
          </div>
        </label>

        {agree && !termsAccepted && <div className="consent-terms-warning">Before you can confirm migration, please open <strong>Migration terms &amp; data confirmation</strong>, review the information, and accept the acknowledgement.</div>}
        {agree && termsAccepted && <div className="consent-terms-ok">Migration terms and data confirmation accepted. You can now confirm your preference.</div>}

        <div className="consent-actions">
          <button className="consent-secondary" type="button" onClick={() => window.history.back()}>Cancel</button>
          <button className="consent-primary" type="button" disabled={!canConfirm || submitting} onClick={savePreference}>{submitting ? 'Saving...' : 'Confirm preference'}</button>
        </div>

        <div className="consent-status">
          {decline && 'You have selected: Do not migrate.'}
          {agree && (termsAccepted ? `You have selected migration consent with ${selectedCount} item(s). Terms accepted.` : `Please review and accept the migration terms before confirming ${selectedCount} selected item(s).`)}
        </div>
      </section>

      {termsOpen && (
        <div className="consent-modal-backdrop" onClick={() => setTermsOpen(false)}>
          <div className="consent-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <h3>Migration terms &amp; data confirmation</h3>
            <p>By confirming migration, you authorize Reloved to transfer your selected account information and listings to Taggy so your Taggy account can be prepared for use.</p>
            <ul>
              <li>Your profile details, including your name, email, phone number, address, date of birth and other displayed account information, may be transferred to Taggy.</li>
              <li>Only the listings you select on this page will be included in the migration.</li>
              <li>Your migrated profile and selected listings may become visible on Taggy, which is a live selling marketplace, subject to Taggy&apos;s account and listing rules.</li>
              <li>You confirm that the information shown on this page is accurate and that the items selected for migration belong to you and are correctly represented.</li>
              <li>After you confirm, your Taggy account will be prepared using the migrated information. You may be required to complete additional account setup or verification on Taggy.</li>
              <li>If you do not want your information transferred, select the option not to migrate instead.</li>
            </ul>
            <label className="consent-modal-confirm">
              <input type="checkbox" checked={termsAcknowledge} onChange={(event) => setTermsAcknowledge(event.target.checked)} />
              <div><strong>I have reviewed the information above and confirm that the profile details and selected listings are accurate for migration to Taggy.</strong></div>
            </label>
            <div className="consent-modal-actions">
              <button className="consent-secondary" type="button" onClick={() => setTermsOpen(false)}>Close</button>
              <button className="consent-primary" type="button" disabled={!termsAcknowledge} onClick={acceptTerms}>Accept &amp; continue</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const ProfileInput = ({ label, type = 'text', value, onChange }) => (
  <div className="consent-field">
    <div className="consent-label">{label}</div>
    <input className="consent-input" type={type} value={value || ''} onChange={(event) => onChange(event.target.value)} />
  </div>
);

export default ConsentFormPage;
