import { ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Spin } from "antd";
export const withRouter = (component: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense
        fallback={<Spin delay={300} className="overlay" size="large" />}
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );
