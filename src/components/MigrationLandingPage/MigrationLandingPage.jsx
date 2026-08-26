/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import './MigrationLandingPage.css';

const taggyUrl = import.meta.env.VITE_TAGGY_URL || 'https://taggy.ae';
const relovedWordmark = 'https://reloved-prod.s3.eu-west-1.amazonaws.com/asset/reloved_header_logo.png';

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
        <div className="migration-landing-copy">
          <img src={relovedWordmark} alt="Reloved" className="migration-landing-logo" />
          <h1>Reloved is moving to Taggy</h1>
          <p>
            We’re excited to introduce the next home for the Reloved community.
          </p>
          <p>
            If you have an existing Reloved account, log in to review your profile and current listings, then choose what you’d like to move across to Taggy.
          </p>
          <div className="migration-landing-actions">
            <a className="migration-button migration-button-primary" href={taggyUrl}>Go to Taggy</a>
            <button className="migration-button migration-button-secondary" type="button" onClick={reviewAccount}>Review my Reloved account</button>
          </div>
        </div>
        <p className="migration-landing-copyright">Copyright © Reloved 2026</p>
      </section>
    </main>
  );
}
