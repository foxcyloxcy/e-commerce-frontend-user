import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useHotjar = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Hotjar only once on first mount
    if (!window.hj) {
      (function(h, o, t, j, a, r) {
        h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments); };
        h._hjSettings = { hjid: 6372055, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script'); r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    }
  }, []);

  useEffect(() => {
    // Notify Hotjar of route changes in SPA
    if (window.hj) {
      window.hj('stateChange', location.pathname);
    }
  }, [location]);
};

export default useHotjar;
