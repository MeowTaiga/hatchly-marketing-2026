import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { installClickPing, pingSiteVisit } from './lib/discordPing';
import './index.css';

installClickPing();
void pingSiteVisit();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
