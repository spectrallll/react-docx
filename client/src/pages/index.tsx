import { lazy } from "react";
import { Route, Routes } from "react-router-dom";


const MainPage = lazy(() => import("./index/index"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<MainPage />} />
    </Routes>
  )
}
