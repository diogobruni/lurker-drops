import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { getLocale, localeTag, t } from '@/shared/i18n';
import App from './App';
import { IS_POPOUT } from './popout';
import './index.css';

if (IS_POPOUT) document.documentElement.classList.add('popout');

document.documentElement.lang = localeTag(getLocale());
document.title = t('app.name');

const root = document.getElementById('root');
if (!root) throw new Error('Popup root element not found.');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
