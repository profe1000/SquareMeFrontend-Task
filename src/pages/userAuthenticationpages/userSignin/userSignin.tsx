import { LoadingOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sampleApiCall } from "../../../apiservice/authService";
import { IAuthType } from "../../../apiservice/authService.type";
import CustomInput from "../../../components/Sharedcomponents/InputBtn/Input-Field";
import PasswordInput from "../../../components/Sharedcomponents/PasswordBtn/Password-input";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { useAppDispatch } from "../../../Redux/reduxCustomHook";
import { NotificationType } from "../../../utils/mscType.type";
import "../userAuth.css";

const UserSignin = () => {
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
        // Handle Success Here
        navigate("/users/home");
      }, 1500);
      openNotificationWithIcon("info", "", "Login Success", "#D9FFB5");

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

      {/* "Main Desgin" */}
      <div className="grid bg-stone-100 min-h-[100vh]">
        {/* "Login Card" */}
        <div className="w-[95%] max-w-[500px] m-auto border mt-20 mb-20 rounded-lg bg-white">
          <div className="grid p-8">
            {/* "Header Text" */}
            <div className="mb-6 flex flex-col justify-center items-center">
              <p className="font-semibold font-sans text-2xl"> Log In </p>
              <p className="font-sans text-md text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email Address */}
              <div className="mb-6">
                <label className="font-sans text-sm font-semibold">
                  EMAIL ADDRESS
                </label>
                <CustomInput
                  required
                  name="email"
                  value={user?.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Email Address"
                  icon={<MailOutlined />}
                ></CustomInput>
              </div>

              {/* Password */}
              <div className="mb-8">
                <label className="font-sans text-sm font-semibold">
                  PASSWORD
                </label>
                <PasswordInput
                  required
                  name="password"
                  value={user?.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                ></PasswordInput>
              </div>

              {/* Login Button */}
              <div className="mb-8">
                <button className="w-full h-14  font-sans bg-blue-900 text-white rounded-xl text-lg">
                  {!formLoading ? (
                    <span className="text-sm font-semibold font-sans">
                      Log Into Account
                    </span>
                  ) : (
                    <LoadingOutlined rev={undefined} />
                  )}
                </button>
              </div>

              {/* Create An Account Button */}
              <div className="mb-8 flex justify-center">
                <span className="text-gray-500">Are you new here?</span> &nbsp;
                <Link className="text-blue-900" to={"/auth/signup"}>
                  Create An Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignin;
