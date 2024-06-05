import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type IProtectRoutesType = {
  children: any;
  customUrl?: string;
};

export const ProtectedRoute: React.FC<IProtectRoutesType> = ({
  children,
  customUrl = "/",
}) => {
  const authState = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    navigateAway();
  }, [authState.isAutheticatedUser]);

  const navigateAway = () => {
    if (!authState.isAutheticatedUser) {
      // user is not authenticated
      navigate(customUrl);
    }
  };

  return children;
};
