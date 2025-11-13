import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { routes } from "@/shared/router/routes";
import { AdList } from "@/pages/adList/";
import { MainLayout } from "@/widgets/mainLayout";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routes.adList.path} element={<AdList />} />
        </Route>

        <Route path="/" element={<Navigate to={routes.adList.path} replace />} />
        <Route
          path={routes.allNotExistingRoutes.path}
          element={<Navigate to={routes.notFound.path} replace />}
        />
        <Route path={routes.notFound.path} />
      </Routes>
    </Router>
  );
};
