import {
  BellOutlined,
  DashboardOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Redux/reduxCustomHook";
import { RootState } from "../../../Redux/store";
import "./Tabbar.css";

const Tabbar = () => {
  const location = useLocation();
  const [currentUrlPath, setCurrentUrlPath] = useState("");
  const [menu, setMenu] = useState<IMenuType[]>([]);

  const authData: any = useAppSelector((state: RootState) => state);

  const navigate = useNavigate();

  type IMenuType = {
    icon: string | any;
    url: string;
    title: string;
    onClick?: () => void;
  };

  const generalMenu: IMenuType[] = [
    {
      icon: <DashboardOutlined />,
      url: "/explore/explore-professionals",
      title: "Explore",
    },
    {
      icon: <HomeOutlined />,
      url: "/",
      title: "Home",
    },
    {
      icon: <BellOutlined />,
      url: "/explore/notifications",
      title: "Notification",
    },
    {
      icon: <UserOutlined />,
      url: "/auth",
      title: "Profile",
    },
  ];

  useEffect(() => {
    setCurrentUrlPath(location.pathname);
    updateMenuType();
  }, [location, authData]);

  const updateMenuType = () => {
    // Used Url path to check
    setMenu(generalMenu);
  };
  return (
    <>
      <div className="grid tabBarSpace">
        &nbsp; <br />
      </div>
      <div className="bottomBar border-t safeArea bg-white">
        <div className="w3-content">
          <div className="grid">
            <div className="grid grid-flow-col justify-stretch">
              {menu.map((menu: IMenuType, index: number) => (
                <Link
                  className="flex flex-col justify-center items-center h-20"
                  to={menu.url}
                >
                  <span
                    className={
                      currentUrlPath === menu.url
                        ? "text-green"
                        : "w3-text-dark-grey"
                    }
                    style={{ zoom: "1.2" }}
                  >
                    {menu.icon}
                  </span>
                  <span
                    className={
                      "w3-tiny myfont1 subtext " +
                      (currentUrlPath === menu.url
                        ? " text-green"
                        : "w3-text-dark-grey")
                    }
                  >
                    {menu.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabbar;
