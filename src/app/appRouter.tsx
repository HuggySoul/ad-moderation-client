import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom";
import { routes } from "@/shared/router/routes";
import { AdList } from "@/pages/adList/";
import { MainLayout } from "@/widgets/mainLayout";
import { Result } from "antd";
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
        <Route
          path={routes.notFound.path}
          element={
            <Result
              extra={<NavLink to={routes.adList.path}>К списку объявлений</NavLink>}
              status={404}
              title={"404"}
              subTitle="Такой страницы не существует"
            />
          }
        />
      </Routes>
    </Router>
  );
};
