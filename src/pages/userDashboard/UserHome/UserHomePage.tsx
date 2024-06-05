import DashbaordForm from "../../../components/DashboardComponents/Dashboard-Form";
import { UrlList } from "../../../components/DashboardComponents/UrlList";
import TopBar from "../../../components/LayoutComponent/TopBar/topBar";
import "../userDashboard.css";

export const UserHomePage = () => {
  return (
    <>
      <div className="grid bg-stone-100 min-h-[100vh]">
        <TopBar></TopBar>
        <div className="grid w-[95%] max-w-[1120px] m-auto mt-8 mb-8">
          <DashbaordForm></DashbaordForm>
        </div>
        <div className="grid w-[100%] max-w-[1120px] m-auto mt-8 mb-8 md:w-[95%]">
          <UrlList></UrlList>
        </div>
      </div>
    </>
  );
};

export default UserHomePage;
