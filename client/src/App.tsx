import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import FallBackLoading from "./components/FallBackLoading";

const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Code = lazy(() => import("./pages/Code"));
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FallBackLoading />}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/code"} element={<Code />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
