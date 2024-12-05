import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";
import Rings from "./components/Rings";
import Signin_up from "./components/Signin_up";
import Dashboard from "./Dashboardpages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Signin_up" element={<Signin_up isModal />} />
        <Route path="/Cart" element={<Cart isModal />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Rings" element={<Rings />} />

        {/* AA */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
