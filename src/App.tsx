import React, { useEffect } from "react";
import "./App.css";

import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage/page";
import DetailModal from "./components/DetailModal/page";
import { MediaType } from "./models/Media";
import NewPopular from "./pages/NewPopularPage/newPopularPage";

const Layout = () => {
  return (
    <div>
      <NavBar />

      <Outlet />

      <Footer />
    </div>
  );
};

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const background = state?.backgroundLocation;
  // 특정 경로에서 body 스타일 업데이트
  useEffect(() => {
    if (location.pathname === "/latest" || location.pathname === "/latest2") {
      document.body.style.overflowX = "hidden"; // 좌우 스크롤 막기
    } else {
      document.body.style.overflowX = "auto"; // 기본값 복원
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, [location.pathname]);
  return (
    <div className="app">
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="browse" element={<HomePage />} />
          <Route path="latest" element={<NewPopular />} />
          <Route
            path="movie/:id"
            element={<DetailModal mediaType={MediaType.MOVIE} />}
          />
          <Route
            path="tv/:id"
            element={<DetailModal mediaType={MediaType.TV} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
