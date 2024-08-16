import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./custom.scss";
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './assets/images/components/App/App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);

