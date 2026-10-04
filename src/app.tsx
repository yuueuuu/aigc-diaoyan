import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage/HomePage";
import TechPage from "@/pages/TechPage/TechPage";
import IndustryPage from "@/pages/IndustryPage/IndustryPage";
import ApplicationsPage from "@/pages/ApplicationsPage/ApplicationsPage";
import TrendsPage from "@/pages/TrendsPage/TrendsPage";
import AppendixPage from "@/pages/AppendixPage/AppendixPage";
import { Layout } from "@/components/Layout";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tech" element={<TechPage />} />
        <Route path="industry" element={<IndustryPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="trends" element={<TrendsPage />} />
        <Route path="appendix" element={<AppendixPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
