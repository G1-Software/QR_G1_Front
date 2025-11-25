import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { CategoryPage } from "./pages/CategoryPage";
import { SubCategoryPageA } from "./pages/SubcategoryPageA";
import { SubCategoryPageB } from "./pages/SubcategoryPageB";
import { SubCategoryPageC } from "./pages/SubcategoryPageC";
import { SubsubategoryPageB1 } from "./pages/SubsubcategoryPageB1";
import { SubsubategoryPageB3 } from "./pages/SubsubcategoryPageB3";
import { SubsubategoryPageC1 } from "./pages/SubsubcategoryPageC1";
import { SubsubategoryPageC2 } from "./pages/SubsubcategoryPageC2";
import { SubsubategoryPageC3 } from "./pages/SubsubcategoryPageC3";
import { RequestPage } from "./pages/RequestPage";
import { ScanQrNotice } from "./pages/ScanQrNotice";
import { EditorPage } from "./pages/EditorPage";
import { StaffPage } from "./pages/StaffPage";
import { PrivateRoute } from "./components/PrivateRoute";
import "./styles/index.css";
import { Instructive } from "./pages/Instructive";
import { InformationPage } from "./pages/InformationPage";
import { AdminHome } from "./pages/AdminHome";
import { TokenProtectedRoute } from "./components/TokenProtectedRoute";
import { DashboardListOfRequests } from "./pages/DashboardListOfRequests";
import { RequestsDashboard } from "./pages/RequestsDashboard";
import { QRMetricsDashboard } from "./pages/QRMetricsDashboard";
import { PublicHome } from "./pages/PublicHome";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const redirectUri =
  import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: "openid profile email",
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/scanqrnotice" element={<ScanQrNotice />} />
          <Route path="/home" element={<PublicHome />} />

          <Route
            path="/"
            element={
              <TokenProtectedRoute>
                <CategoryPage />
              </TokenProtectedRoute>
            }
          />
          <Route
            path="/informacion_clinica"
            element={
              <TokenProtectedRoute>
                <SubCategoryPageA />
              </TokenProtectedRoute>
            }
          />
          <Route
            path="/informacion_administrativa"
            element={
              <TokenProtectedRoute>
                <SubCategoryPageB />
              </TokenProtectedRoute>
            }
          />
          <Route
            path="/informacion_acompanantes_visitas"
            element={
              <TokenProtectedRoute>
                <SubCategoryPageC />
              </TokenProtectedRoute>
            }
          />
          <Route
            path="/coberturas_especiales"
            element={
              <TokenProtectedRoute>
                <SubsubategoryPageB1 />
              </TokenProtectedRoute>
            }
          />
          <Route
            path="/presupuestos_cuenta_pagos"
            element={
              <TokenProtectedRoute>
                <SubsubategoryPageB3 />
              </TokenProtectedRoute>
            }
          />
          <Route
            path="/informacion_general_acompaniantes_visitas"
            element={
              <TokenProtectedRoute>
                <SubsubategoryPageC1 />
              </TokenProtectedRoute>
            }
          />
          <Route
            path="/horarios_condiciones"
            element={
              <TokenProtectedRoute>
                <SubsubategoryPageC2 />
              </TokenProtectedRoute>
            }
          />
          <Route
            path="/servicios_apoyo_visitas"
            element={
              <TokenProtectedRoute>
                <SubsubategoryPageC3 />
              </TokenProtectedRoute>
            }
          />
          <Route
            path="/admin/editor"
            element={
              <PrivateRoute>
                <EditorPage></EditorPage>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/metricas_solicitudes"
            element={
              <PrivateRoute>
                <RequestsDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/metricas_qr"
            element={
              <PrivateRoute>
                <QRMetricsDashboard/>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/instructivo"
            element={
              <PrivateRoute>
                <Instructive></Instructive>
              </PrivateRoute>
            }
          />
          <Route
            path="/pagina_informacion"
            element={
              <TokenProtectedRoute>
                <InformationPage></InformationPage>
              </TokenProtectedRoute>
            }
          />
          
          <Route path="/solicitudes" element={<RequestPage />} />
          {/*           
    <Route path="/staff" element={
    <PrivateRoute>
      <StaffPage />
    </PrivateRoute>
  } /> */}

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/listado_solicitudes"
            element={
              <PrivateRoute>
                <DashboardListOfRequests></DashboardListOfRequests>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
