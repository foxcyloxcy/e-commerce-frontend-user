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
          <h1>Move your Reloved account<br />to Taggy</h1>
          <p>
            Review the profile information and listings currently stored in our database. Choose which items you would like to migrate, then provide your migration consent below.
          </p>
          <div className="migration-landing-actions">
            <a className="migration-button migration-button-primary" href={taggyUrl}>Go to Taggy</a>
            <button className="migration-button migration-button-secondary" type="button" onClick={reviewAccount}>Login to Migrate Data</button>
          </div>
        </div>
        <p className="migration-landing-copyright">Copyright © Reloved 2026</p>
      </section>
    </main>
  );
}
