import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import {AppProvider} from './AppContext';

import './style.css';


const rootElement = document.getElementById('root');

createRoot(rootElement).render(
    <AppProvider>
    <Router>
        <App />
    </Router>
    </AppProvider>
);