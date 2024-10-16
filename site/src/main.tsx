import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConfigProvider, theme } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CoursePage from './pages/CoursePage.tsx';

const isProd = import.meta.env.PROD;
const { darkAlgorithm } = theme;

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
        },
        {
            path: '/course/:slug',
            element: <CoursePage />,
        },
    ],
    {
        basename: isProd ? '/OMSCS-Review-Analyzer' : '/',
    },
);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </StrictMode>,
);
