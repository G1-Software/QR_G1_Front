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
import { ScanQrNotice } from "./pages/ScanQrNotice";
import { StaffPage } from "./pages/StaffPage";
import { PrivateRoute } from "./components/PrivateRoute";
import "./styles/index.css";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin;

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
          <Route path="*" element={<ScanQrNotice />} />
          <Route path="/:id" element={<CategoryPage />} />
          <Route path="/subcategoryA/:id" element={<SubCategoryPageA />} />
          <Route path="/subcategoryB/:id" element={<SubCategoryPageB />} />
          <Route path="/subcategoryC/:id" element={<SubCategoryPageC />} />
          <Route path="/subsubcategoryB1/:id" element={<SubsubategoryPageB1 />} />
          <Route path="/subsubcategoryB3/:id" element={<SubsubategoryPageB3 />} />
          <Route path="/subsubcategoryC1/:id" element={<SubsubategoryPageC1 />} />
          <Route path="/subsubcategoryC2/:id" element={<SubsubategoryPageC2 />} />
          <Route path="/subsubcategoryC3/:id" element={<SubsubategoryPageC3 />} />
          <Route path="/staff" element={
    <PrivateRoute>
      <StaffPage />
    </PrivateRoute>
  } />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
