import "../../App.css";
import { Routes, Route } from "react-router-dom";
import Nopage from "../Nopage/Nopage";
import UserSignin from "./userSignin/userSignin";
import UserSignUp from "./userSignUp/userSignUp";

const UserAuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<UserSignin />} />
      <Route path="/signin" element={<UserSignin />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="*" element={<Nopage />} />
    </Routes>
  );
};

export default UserAuthRoutes;
