import "./Layout.css";
import { Outlet } from "react-router-dom";
import Layout, { Content } from "antd/es/layout/layout";

const UserPagesLayout = () => {
  return (
    <Layout>
      <div className="bg-white" style={{ minHeight: "100vh" }}>
        <Content>
          <Outlet />
        </Content>
      </div>
    </Layout>
  );
};

export default UserPagesLayout;
