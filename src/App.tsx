import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import FormLayout from './pages/Form/FormLayout';
import DefaultLayout from './layout/DefaultLayout';
import FormLayoutTwo from './pages/Form/FormLayoutTwo';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          path="/forms/form-elements"
          index
          element={
            <>
              <PageTitle title="Recorrido de un Árbol" />
              <FormLayoutTwo />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Algoritmo de Dijkstra" />
              <FormLayout />
            </>
          }
        />        
      </Routes>
    </DefaultLayout>
  );
}

export default App;
