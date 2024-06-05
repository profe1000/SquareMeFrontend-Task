import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAuthRoutes from "./pages/userAuthenticationpages/userAuthRoute";
import UserDashboardPagesRoute from "./pages/userDashboard/userDashboardPagesRoute";
import Nopage from "./pages/Nopage/Nopage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<UserAuthRoutes />} />
        <Route path="dashboard/*" element={<UserDashboardPagesRoute />} />
        {/* <Route
          path="users/*"
          element={
            <ProtectedRoute>
              <ExplorePagesRoute />
            </ProtectedRoute>
          }
        /> */}
        <Route path="auth/*" element={<UserAuthRoutes />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
