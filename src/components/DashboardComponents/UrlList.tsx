import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Empty, notification, Pagination, Result, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleApiCall } from "../../apiservice/authService";
import useFormatApiRequest from "../../hooks/formatApiRequest";
import { useAppDispatch } from "../../Redux/reduxCustomHook";
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
  const [tableData, setTableData] = useState<any[]>([]);
  const [api, contextHolder] = notification.useNotification();

  // Pagination Constant/Variables
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const perPage = 10;

  // For Navigator/Redux
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Use Effect to reload API when External Filter has changed
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

  // A custom hook to Load All urlItem Details
  const urlItemDataResult = useFormatApiRequest(
    () => sampleApiCall(urlItemDefaultFilter),
    loadurlItemData,
    () => {
      setLoadUrlItemData(false);
    },
    () => {
      processurlItemResult();
    }
  );

  // Process The Current UrlItem Data Result
  const processurlItemResult = async () => {
    if (urlItemDataResult.httpState === "SUCCESS") {
      setTableData(urlItemDataResult.data?.data || [{}, {}, {}]);
      setUrlItemLoadState("completed");
      setTotalItems(urlItemDataResult.data?.meta?.total || 1);
    } else if (urlItemDataResult.httpState === "ERROR") {
      setUrlItemLoadState("error");
    } else if (urlItemDataResult.httpState === "LOADING") {
      setUrlItemLoadState("loading");
    }
  };

  // Show Notification
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

  // Table Configuration
  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "applicantName",
      key: "applicantName",
      render: (text, records, index) => (
        <p className="pt-4 pb-4">{"James Manager"}</p>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, records, index) => <p>{"James Manager"}</p>,
    },

    {
      title: "Shorten URL",
      dataIndex: "shortenUrl",
      key: "shortenUrl",
      render: (text, records, index) => <p>{"James Manager"}</p>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, records, index) => (
        <p>
          <img
            style={{ width: "16px" }}
            src={`${process.env.PUBLIC_URL + "/images/dashboard/copy.svg "}`}
            alt="_img"
          />
        </p>
      ),
    },
  ];

  // Use to Control Pagination On Change Event
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
      {/* " The context is use to hold the notification from ant design" */}
      {contextHolder}
      <div className="grid pt-4">
        {/* " Show Loading Indicator" */}
        {/* {urlItemLoadState === "loading" && (
          <div className="mt-2 mb-2 flex justify-center items-center pt-20 pb-20">
            <Spin size="large" />
          </div>
        )} */}

        {/* " Show Loading Error" */}
        {/* {urlItemLoadState === "error" && (
          <div className="mt-2 mb-2">
            <Result
              status="500"
              title={<span className="">Error</span>}
              subTitle={
                <span className="">
                  Sorry, something went wrong, it could be a network Related
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
        )} */}

        {/* " Show No data" */}
        {/* {urlItemLoadState === "noData" && (
          <div className="mt-2">
            <Empty></Empty>
          </div>
        )} */}

        {/* " Show Data " */}
        {urlItemLoadState !== "notLoading" && (
          <div className="mt-2">
            <div>
              {/* UrlItem */}
              <div className="grid shadow rounded-lg">
                <Table
                  loading={urlItemLoadState === "loading"}
                  rowKey="id"
                  size="small"
                  columns={columns}
                  dataSource={tableData}
                  pagination={{ hideOnSinglePage: true }}
                />

                {!hidePagination && (
                  <div className="grid mt-2 mb-2">
                    <Pagination
                      current={currentPage || 1}
                      onChange={onPageChange}
                      pageSize={perPage}
                      total={totalItems}
                    />
                  </div>
                )}
              </div>
              {/* End UrlItem */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
