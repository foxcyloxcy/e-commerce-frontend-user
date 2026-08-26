/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import './MigrationLandingPage.css';

const taggyUrl = import.meta.env.VITE_TAGGY_URL || 'https://taggy.com';

export default function MigrationLandingPage({ parentIsLoggedIn }) {
  const navigate = useNavigate();

  const reviewAccount = () => {
    if (parentIsLoggedIn) {
      navigate('/migration');
      return;
    }
    navigate(`/login?redirect=${encodeURIComponent('/migration')}`);
  };

  return (
    <main className="migration-landing">
      <section className="migration-landing-image" aria-label="Reloved lifestyle image" />
      <section className="migration-landing-content">
        <img src="/reloved_icon.png" alt="Reloved" className="migration-landing-logo" />
        <div className="migration-landing-card">
          <p className="migration-eyebrow">Important update</p>
          <h1>Reloved is moving to Taggy</h1>
          <p>
            Reloved is preparing to move to Taggy. Please review your Reloved account details and choose whether you would like your profile and eligible fashion listings prepared for migration.
          </p>
          <p>
            Opening the review does not mean you consent. Your preference is only saved after you complete the final confirmation step.
          </p>
          <div className="migration-landing-actions">
            <a className="migration-button migration-button-primary" href={taggyUrl}>Go to Taggy</a>
            <button className="migration-button migration-button-secondary" type="button" onClick={reviewAccount}>Review my Reloved account</button>
          </div>
        </div>
        <p className="migration-landing-copyright">© {new Date().getFullYear()} Reloved. All rights reserved.</p>
      </section>
    </main>
  );
}
