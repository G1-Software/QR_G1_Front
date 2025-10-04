import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
