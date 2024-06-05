import { LoadingOutlined, MailOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sampleApiCall } from "../../apiservice/authService";
import { IAuthType } from "../../apiservice/authService.type";
import useFormatApiRequest from "../../hooks/formatApiRequest";
import { useAppDispatch } from "../../Redux/reduxCustomHook";
import { NotificationType } from "../../utils/mscType.type";
import CustomInput from "../Sharedcomponents/InputBtn/Input-Field";
import CustomInputLink from "../Sharedcomponents/InputBtn/Input-Field-url";
import PasswordInput from "../Sharedcomponents/PasswordBtn/Password-input";
import "./Dashboard-Comp.css";

const DashbaordForm = () => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [loadApi, setLoadApi] = useState(false);
  const [user, setUser] = useState<any>({});
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Use to collect Site Description Change
  const handleInputChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values: any) => ({ ...values, [name]: value }));
  };

  // Use to Submit Form
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoadApi(true);
    setFormLoading(true);
  };

  // A custom hook to format the login Api
  const result = useFormatApiRequest(
    () => sampleApiCall(user),
    loadApi,
    () => {
      setLoadApi(false);
    },
    () => {
      processApi();
    }
  );

  // Process Api
  const processApi = async () => {
    if (result.httpState === "SUCCESS") {
      setFormLoading(false);
      const signinResult: IAuthType = result.data;
      // storePlainString(USER_TOKEN_KEY, signinResult?.data?.token || "");
      // storeJSON(USER_AUTH_DATA_KEY, signinResult);
      // dispatch({ type: "AUTH_ADD_DATA", payload: signinResult });

      setTimeout(() => {
        navigate("/users/home");
      }, 1500);
      openNotificationWithIcon(
        "info",
        "",
        "Your Account Have being created",
        "#D9FFB5"
      );

      // Handle Success Here
    } else if (result.httpState === "ERROR") {
      setFormLoading(false);
      //Handle Error Here
      openNotificationWithIcon(
        "info",
        "",
        result.data?.response?.data?.message ||
          result.errorMsg ||
          "Login Error",
        "#FFC2B7"
      );
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

  return (
    <>
      {/* " The context is use to hold the notification from ant design" */}
      {contextHolder}
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div>
          <div className="mb-6">
            <p className="font-semibold font-sans text-2xl">Shortend URL</p>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <label className="font-sans text-sm font-semibold">Name</label>
              <CustomInput
                required
                name="name"
                value={user?.name}
                onChange={handleInputChange}
                type="name"
                placeholder="Input Name"
                className="bg-slate-100 h-12"
              ></CustomInput>
            </div>

            {/* Website URl */}
            <div className="mb-6">
              <label className="font-sans text-sm font-semibold">
                WebSite Url
              </label>
              <CustomInputLink
                required
                name="websiteUrl"
                value={user?.websiteUrl}
                onChange={handleInputChange}
                type="text"
                placeholder="Website Url"
                className="bg-slate-100 h-12"
              ></CustomInputLink>
            </div>

            {/* Name */}
            <div className="mb-6">
              <label className="font-sans text-sm font-semibold">
                Description
              </label>
              <CustomInput
                required
                name="description"
                value={user?.description}
                onChange={handleInputChange}
                type="text"
                placeholder="Input Description"
                className="bg-slate-100 h-12"
              ></CustomInput>
            </div>

            {/* Shorten URL Button */}
            <div className="mb-8">
              <button className="w-full h-12  font-sans bg-blue-900 text-white rounded-xl text-lg">
                {!formLoading ? (
                  <span className="text-sm font-semibold font-sans">
                    Shorten URL
                  </span>
                ) : (
                  <LoadingOutlined rev={undefined} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashbaordForm;
