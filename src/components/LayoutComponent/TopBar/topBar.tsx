import "./topbar.css";

export const TopBar: React.FC<{}> = () => {
  return (
    <>
      {/* Top Bar Card */}
      <div className="fixedMenu bg-blue-900">
        <div className="w-[95%] max-w-[1120px] m-auto">
          <div className="grid grid-cols-2 h-[70px]">
            <div className="flex items-center">
              <h2 className="text-white font-semibold"> PLACEHOLDER </h2>
            </div>
            <div className="flex items-center justify-end">
              <span className="p-2 mx-1 my-1 rounded bg-blue-500">
                <img
                  style={{ width: "16px" }}
                  src={`${
                    process.env.PUBLIC_URL + "/images/topBar/searchBar.svg "
                  }`}
                  alt="_img"
                />
              </span>
              <span className="p-2 mx-1 my-1 rounded bg-blue-500 hidden md:block">
                <img
                  style={{ width: "16px" }}
                  src={`${
                    process.env.PUBLIC_URL + "/images/topBar/notification.svg "
                  }`}
                  alt="_img"
                />
              </span>
              <span className="p-2 mx-1 my-1 rounded bg-blue-500">
                <img
                  style={{ width: "16px" }}
                  src={`${
                    process.env.PUBLIC_URL + "/images/topBar/logout.svg "
                  }`}
                  alt="_img"
                />
              </span>
              <span className="mx-4 my-1 hidden md:block">
                <img
                  style={{ width: "32px" }}
                  src={`${
                    process.env.PUBLIC_URL + "/images/topBar/avatar.svg "
                  }`}
                  alt="_img"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid menuSpace">
        <br />
      </div>
    </>
  );
};

export default TopBar;
