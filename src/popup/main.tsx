import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { IS_POPOUT } from './popout';
import './index.css';

if (IS_POPOUT) document.documentElement.classList.add('popout');

const root = document.getElementById('root');
if (!root) throw new Error('Popup root element not found.');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
