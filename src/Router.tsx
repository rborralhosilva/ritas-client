import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/single/Home";
import Work from "./pages/single/Work";
import NotFoundPage from "./pages/404";
import { fetchData } from "./utils/loader";

export default function Router() {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      {/* Root Route */}
      <Route index element={<Homepage />} />

      {/* Works Routes */}
      <Route
        path=":slug"
        element={<Work />}
        loader={({ params }) => fetchData(`works/${params.slug}`)}
      />

      {/* Catch-All for Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
