import { LoadingOutlined, MailOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authSignUp } from "../../../apiservice/authService";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from "../../../components/Sharedcomponents/InputBtn/Input-Field";
import PasswordInput from "../../../components/Sharedcomponents/PasswordBtn/Password-input";
import useFormatApiRequest from "../../../hooks/formatApiRequest";
import { NotificationType } from "../../../utils/mscType.type";
import "../userAuth.css";

const UserSignUp = () => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [loadApi, setLoadApi] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoadApi(true);
      setFormLoading(true);
    },
  });

  // A custom hook to format the signup API call
  const result = useFormatApiRequest(
    () => authSignUp(formik.values),
    loadApi,
    () => {
      setLoadApi(false);
    },
    () => {
      processApi();
    }
  );

  // Process the API response
  const processApi = async () => {
    if (result.httpState === "SUCCESS") {
      setFormLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 1500);
      openNotificationWithIcon(
        "info",
        "",
        "Your Account Has Been Created",
        "#D9FFB5"
      );
    } else if (result.httpState === "ERROR") {
      setFormLoading(false);
      openNotificationWithIcon(
        "info",
        "",
        result.data?.response?.data?.message ||
          result.errorMsg ||
          "Signup Error",
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
      {contextHolder}
      <div className="grid bg-stone-100 min-h-[100vh]">
        <div className="w-[95%] max-w-[500px] m-auto border mt-20 mb-20 rounded-lg bg-white">
          <div className="grid p-8">
            <div className="mb-6 flex flex-col justify-center items-center">
              <p className="font-semibold font-sans text-2xl">
                Create an account
              </p>
              <p className="font-sans text-md text-gray-500">
                Enter your credentials to create your account
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
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
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-8">
                <label className="font-sans text-sm font-semibold">
                  CREATE PASSWORD
                </label>
                <PasswordInput
                  required
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="mb-8">
                <label className="font-sans text-sm font-semibold">
                  CONFIRM PASSWORD
                </label>
                <PasswordInput
                  required
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirm Password"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-600">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <div className="mb-8">
                <button className="w-full h-14  font-sans bg-blue-900 text-white rounded-xl text-lg">
                  {!formLoading ? (
                    <span className="text-sm font-semibold font-sans">
                      Create Account
                    </span>
                  ) : (
                    <LoadingOutlined rev={undefined} />
                  )}
                </button>
              </div>
              <div className="mb-8 flex justify-center">
                <span className="text-gray-500">Already have an account?</span>{" "}
                &nbsp;
                <Link className="text-blue-900" to={"/auth"}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
