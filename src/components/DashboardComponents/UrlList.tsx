import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Modal, notification, Pagination, Result } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { getUrl } from "../../apiservice/dashboardService";
import { IURLData } from "../../apiservice/dashboardService.type ";
import useFormatApiRequest from "../../hooks/formatApiRequest";
import { useAppDispatch, useAppSelector } from "../../Redux/reduxCustomHook";
import { RootState } from "../../Redux/store";
import { appZIndex } from "../../utils/appconst";
import { ILoadState } from "../../utils/loading.utils.";
import "./Dashboard-Comp.css";

type NotificationType = "success" | "info" | "warning" | "error";

type IUrlList = {
  externalFilter?: any;
  initialDefaultFilter?: any;
  hidePagination?: boolean;
};

export const UrlList: React.FC<IUrlList> = ({
  externalFilter,
  initialDefaultFilter,
  hidePagination = false,
}) => {
  const [urlItemLoadState, setUrlItemLoadState] =
    useState<ILoadState>("loading");
  const [loadurlItemData, setLoadUrlItemData] = useState(true);
  const [urlItemDefaultFilter, setUrlItemDefaultFilter] = useState(
    initialDefaultFilter || {}
  );
  const [tableData, setTableData] = useState<IURLData[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [link, setLink] = useState<string>("");

  // Pagination constants/variables
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const perPage = 10;

  const [showModal, setShowModal] = useState<boolean>(false);

  // For Redux
  const dispatch = useAppDispatch();
  const tableLoadState: boolean = useAppSelector(
    (state: RootState) => state?.UrlTableLoadState
  );

  // Handle showing the modal with the shortened URL
  const handleShowModal = (index) => {
    setShowModal(true);
    setLink(tableData[index].shortened_url);
  };

  // Handle hiding the modal
  const handleCancelModal = () => {
    setShowModal(false);
  };

  // Handle copying the shortened URL to the clipboard
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
      openNotificationWithIcon(
        "info",
        "",
        "Link Copied To Clip Board",
        "#D9FFB5"
      );
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  // Use Effect to reload API when Table Load State changes in Redux
  useEffect(() => {
    if (tableLoadState) {
      dispatch({
        type: "CHANGE_URL_LOAD_STATE",
        payload: false,
      });
      setLoadUrlItemData(true);
      setUrlItemLoadState("loading");
    }
  }, [tableLoadState]);

  // Use Effect to reload API when External Filter changes
  useEffect(() => {
    if (externalFilter) {
      setUrlItemDefaultFilter({
        ...urlItemDefaultFilter,
        ...externalFilter,
      });
      setLoadUrlItemData(true);
      setUrlItemLoadState("loading");
    }
  }, [externalFilter]);

  // Custom hook to load all URL item details
  const urlItemDataResult = useFormatApiRequest(
    () => getUrl(),
    loadurlItemData,
    () => {
      setLoadUrlItemData(false);
    },
    () => {
      processurlItemResult();
    }
  );

  // Process the current URL item data result
  const processurlItemResult = async () => {
    if (urlItemDataResult.httpState === "SUCCESS") {
      setTableData(urlItemDataResult.data?.data);
      setUrlItemLoadState("completed");
      setTotalItems(urlItemDataResult.data?.meta?.total || 1);
    } else if (urlItemDataResult.httpState === "ERROR") {
      setUrlItemLoadState("error");
    } else if (urlItemDataResult.httpState === "LOADING") {
      setUrlItemLoadState("loading");
    }
  };

  // Show notification
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
    background?: string
  ) => {
    api[type]({
      message,
      description,
      placement: "bottomRight",
      style: { background },
    });
  };

  // Table configuration
  const columns: ColumnsType<IURLData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, records, index) => <p className="pt-4 pb-4">{text}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, records, index) => <p>{text}</p>,
    },
    {
      title: "Shorten URL",
      dataIndex: "shortened_url",
      key: "shortened_url",
      render: (text, records, index) => <p>{text}</p>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, records, index) => (
        <p
          onClick={() => {
            handleShowModal(index);
          }}
        >
          <img
            style={{ width: "16px" }}
            src={`${process.env.PUBLIC_URL + "/images/dashboard/copy.svg"}`}
            alt="_img"
          />
        </p>
      ),
    },
  ];

  const columnsSM: ColumnsType<IURLData> = [
    {
      title: "Shorten URL",
      dataIndex: "shortened_url",
      key: "shortened_url",
      render: (text, records, index) => <p className="pt-4 pb-4">{text}</p>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, records, index) => (
        <p
          onClick={() => {
            handleShowModal(index);
          }}
        >
          <img
            style={{ width: "16px" }}
            src={`${process.env.PUBLIC_URL + "/images/dashboard/copy.svg"}`}
            alt="_img"
          />
        </p>
      ),
    },
  ];

  // Handle pagination change
  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setUrlItemDefaultFilter({
      ...urlItemDefaultFilter,
      page: page,
      perPage: pageSize,
    });
    setLoadUrlItemData(true);
  };

  return (
    <>
      {/* The context is used to hold the notification from ant design */}
      {contextHolder}
      <div className="grid pt-4">
        {/* Show loading error */}
        {urlItemLoadState === "error" && (
          <div className="mt-2 mb-2">
            <Result
              status="500"
              title={<span className="">Error</span>}
              subTitle={
                <span className="">
                  Sorry, something went wrong, it could be a network related
                  error
                </span>
              }
              extra={
                <Button onClick={() => setLoadUrlItemData(true)} type="primary">
                  Reload
                </Button>
              }
            />
          </div>
        )}

        {/* Show data */}
        {urlItemLoadState !== "error" && (
          <div className="mt-2">
            <div>
              {/* URL Item */}
              <div className="grid shadow rounded-lg">
                {/* Table to show on large screens */}
                <Table
                  className="hidden md:grid"
                  loading={urlItemLoadState === "loading"}
                  rowKey="id"
                  size="small"
                  columns={columns}
                  dataSource={tableData}
                  pagination={{ hideOnSinglePage: true }}
                />

                {/* Table to show on small screens */}
                <Table
                  className="grid md:hidden"
                  loading={urlItemLoadState === "loading"}
                  rowKey="id"
                  size="small"
                  columns={columnsSM}
                  dataSource={tableData}
                  pagination={{ hideOnSinglePage: true }}
                />

                {/* Pagination controls */}
                {!hidePagination && (
                  <div className="grid pt-2 pb-2 bg-white rounded-lg">
                    <div className="flex px-2 py-2">
                      <div className="flex items-center justify-start">
                        <button className="flex items-center w-full h-10 px-2 py-2 font-sans border text-gray-500 rounded-xl text-lg">
                          <span className="text-sm font-semibold font-sans">
                            <ArrowLeftOutlined /> Previous
                          </span>
                        </button>
                      </div>
                      <div className="flex grow items-center justify-center">
                        <Pagination
                          current={currentPage || 1}
                          onChange={onPageChange}
                          pageSize={perPage}
                          total={totalItems}
                        />
                      </div>
                      <div className="flex items-center justify-end">
                        <button className="flex items-center w-full h-10 px-2 py-2 font-sans border text-gray-500 rounded-xl text-lg">
                          <span className="text-sm font-semibold font-sans">
                            Next <ArrowRightOutlined />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* End URL Item */}
            </div>
          </div>
        )}
      </div>

      {/* Modal for showing the full URL */}
      <Modal
        zIndex={appZIndex.modal}
        open={showModal}
        title={
          <>
            <img
              style={{ width: "48px" }}
              src={`${process.env.PUBLIC_URL + "/images/dashboard/copy_2.svg"}`}
              alt="_img"
            />
          </>
        }
        onCancel={handleCancelModal}
        width={600}
        footer={[<p style={{ minHeight: "00px" }}></p>]}
      >
        <div style={{ maxHeight: "300px", overflow: "scroll" }}>
          <div className="grid mt-4">
            <h1 className="font-semibold text-lg"> View Full URL </h1>
            <p className="mt-6 text-sm"> Share Link</p>
            <div className="flex mt-2">
              <div className="grow">
                <input
                  readOnly
                  value={link}
                  className="w-full border h-12 rounded-lg text-sm px-2 py-2"
                />
              </div>
              <div className="w-12 flex items-center justify-center">
                <img
                  onClick={handleCopyClick}
                  style={{ width: "32px" }}
                  src={`${
                    process.env.PUBLIC_URL + "/images/dashboard/copy_3.svg"
                  }`}
                  alt="_img"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
            <div>
              <button
                onClick={handleCancelModal}
                className="w-full h-12 font-sans border text-gray-500 rounded-xl text-lg"
              >
                <span className="text-sm font-semibold font-sans">Cancel</span>
              </button>
            </div>
            <div>
              <button className="w-full h-12 font-sans bg-blue-900 text-white rounded-xl text-lg">
                <span className="text-sm font-semibold font-sans">Done</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
