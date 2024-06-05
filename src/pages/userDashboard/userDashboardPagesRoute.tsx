import "../../App.css";
import { Routes, Route } from "react-router-dom";
import Nopage from "../Nopage/Nopage";
import UserPagesLayout from "./Layout/Layout";
import UserHomePage from "./UserHome/UserHomePage";

const UserDashboardPagesRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserPagesLayout />}>
        <Route index element={<UserHomePage />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path="*" element={<Nopage />} />
      </Route>
    </Routes>
  );
};

export default UserDashboardPagesRoute;
