import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConfigProvider, theme } from 'antd';

const { darkAlgorithm } = theme;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
            <App />
        </ConfigProvider>
    </StrictMode>,
);
