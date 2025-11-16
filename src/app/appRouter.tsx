import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { Result, Skeleton } from "antd";
import { routes } from "@/shared/router/routes";
import { MainLayout } from "@/widgets/mainLayout";

const AdList = lazy(() => import("@/pages/adList").then((m) => ({ default: m.AdList })));

const AdItem = lazy(() => import("@/pages/adItem").then((m) => ({ default: m.AdItem })));

const Stats = lazy(() =>
  import("@/pages/stats/stats").then((m) => ({ default: m.Stats }))
);

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path={routes.adList.path}
            element={
              <Suspense
                fallback={
                  <div style={{ padding: 24 }}>
                    <Skeleton active paragraph={{ rows: 8 }} />
                  </div>
                }
              >
                <AdList />
              </Suspense>
            }
          />

          <Route
            path={routes.adItem.path}
            element={
              <Suspense
                fallback={
                  <div style={{ padding: 24 }}>
                    <Skeleton active paragraph={{ rows: 10 }} />
                  </div>
                }
              >
                <AdItem />
              </Suspense>
            }
          />

          <Route
            path={routes.stats.path}
            element={
              <Suspense
                fallback={
                  <div style={{ padding: 24 }}>
                    <Skeleton active paragraph={{ rows: 12 }} />
                  </div>
                }
              >
                <Stats />
              </Suspense>
            }
          />
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
              title="404"
              subTitle="Такой страницы не существует"
            />
          }
        />
      </Routes>
    </Router>
  );
};
