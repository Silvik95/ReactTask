import React, { FunctionComponent, Suspense, useEffect, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

// Store
import { useAuthorizeMutation, useAuthenticateMutation } from './services/authApi';

// Components
import Layout from './common/hoc/Layout';

// Lazy components
const Home = React.lazy(() => import('./common/pages/Home'));
const About = React.lazy(() => import('./common/pages/About'));

// Routes
const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: About }
];

const App: FunctionComponent = () => {
  const [authorize] = useAuthorizeMutation();
  const [authenticate] = useAuthenticateMutation();

  const handleAuth = useCallback(async () => {
    const { token } = await authenticate(null).unwrap();

    if (!token) {
      await authorize({ user: process.env.USER, password: process.env.PASSWORD });
    }
  }, [authenticate, authorize]);

  useEffect(() => {
    handleAuth();
  }, [handleAuth]);

  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route path={path} key={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </Layout>
  );
};
export default App;
