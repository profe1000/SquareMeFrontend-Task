import { LoadingOutlined, MailOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authSignIn } from "../../../apiservice/authService";
import { IAuthType } from "../../../apiservice/authService.type";
import CustomInput from "../../../components/Sharedcomponents/InputBtn/Input-Field";
import PasswordInput from "../../../components/Sharedcomponents/PasswordBtn/Password-input";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { useAppDispatch } from "../../../Redux/reduxCustomHook";
import { storePlainString, storeJSON } from "../../../utils/localStorage";
import { NotificationType } from "../../../utils/mscType.type";
import * as yup from "yup";
import { useFormik } from "formik";
import "../userAuth.css";
import { useState } from "react";
import { USER_TOKEN_KEY, USER_AUTH_DATA_KEY } from "../../../hooks/useAuth";
import { mockSigninResult } from "../../../utils/mock.data";

const UserSignin = () => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [loadApi, setLoadApi] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Yup validation schema
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[!@#$%^&*()_+}{":;'?\/\\.,><|])\S*$/,
        "Password must contain at least one special character"
      ),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoadApi(true);
      setFormLoading(true);
    },
  });

  // Custom hook to format the API call
  const result = useFormatApiRequest(
    () => authSignIn(formik.values),
    loadApi,
    () => {
      setLoadApi(false);
    },
    () => {
      processApi();
    }
  );

  // Process API result
  const processApi = async () => {
    if (result.httpState === "SUCCESS") {
      setFormLoading(false);
      const signinResult: IAuthType = mockSigninResult || result.data;
      storePlainString(USER_TOKEN_KEY, signinResult?.data?.token || "");
      storeJSON(USER_AUTH_DATA_KEY, signinResult);
      dispatch({ type: "AUTH_ADD_DATA", payload: signinResult });
      setTimeout(() => {
        // Handle Success Here
        navigate("/dashboard");
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

  return (
    <>
      {/* The context is used to hold the notification from ant design */}
      {contextHolder}

      {/* Main Design */}
      <div className="grid bg-stone-100 min-h-[100vh]">
        {/* Login Card */}
        <div className="w-[95%] max-w-[500px] m-auto border mt-20 mb-20 rounded-lg bg-white">
          <div className="grid p-8">
            {/* Header Text */}
            <div className="mb-6 flex flex-col justify-center items-center">
              <p className="font-semibold font-sans text-2xl"> Log In </p>
              <p className="font-sans text-md text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/* Email Address */}
              <div className="mb-6">
                <label className="font-sans text-sm font-semibold">
                  EMAIL ADDRESS
                </label>
                <CustomInput
                  required
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  placeholder="Email Address"
                  icon={<MailOutlined />}
                ></CustomInput>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>

              {/* Password */}
              <div className="mb-8">
                <label className="font-sans text-sm font-semibold">
                  PASSWORD
                </label>
                <PasswordInput
                  required
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Password"
                ></PasswordInput>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>

              {/* Login Button */}
              <div className="mb-8">
                <button
                  className="w-full h-14  font-sans bg-blue-900 text-white rounded-xl text-lg"
                  type="submit"
                  disabled={formLoading}
                >
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
