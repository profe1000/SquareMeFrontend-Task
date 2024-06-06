import { LoadingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { useState } from "react";
import useFormatApiRequest from "../../hooks/formatApiRequest";
import { useAppDispatch } from "../../Redux/reduxCustomHook";
import { NotificationType } from "../../utils/mscType.type";
import CustomInput from "../Sharedcomponents/InputBtn/Input-Field";
import CustomInputLink from "../Sharedcomponents/InputBtn/Input-Field-url";
import "./Dashboard-Comp.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUrl } from "../../apiservice/dashboardService";

const DashboardForm = () => {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [loadApi, setLoadApi] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [payload, setPayLoad] = useState<any>({});
  const dispatch = useAppDispatch();

  // Validation schema
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    websiteUrl: yup
      .string()
      .matches(/^(?!https?:\/\/)(?=.*\.[a-zA-Z]{2,}$).+/, "Enter a valid URL")
      .required("Website URL is required"),
    description: yup.string().required("Description is required"),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      name: "",
      websiteUrl: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Add https:// to the front of the website URL if not already present
      const formattedValues = {
        ...values,
        websiteUrl:
          values.websiteUrl.startsWith("http://") ||
          values.websiteUrl.startsWith("https://")
            ? values.websiteUrl
            : `https://${values.websiteUrl}`,
      };
      setPayLoad(formattedValues);
      setLoadApi(true);
      setFormLoading(true);
    },
  });

  // Custom hook to format the API call
  const result = useFormatApiRequest(
    () => addUrl(payload),
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
      dispatch({ type: "CHANGE_URL_LOAD_STATE", payload: true });
      openNotificationWithIcon(
        "info",
        "",
        "Your Link Has Been Created",
        "#D9FFB5"
      );

      // Handle success here
    } else if (result.httpState === "ERROR") {
      setFormLoading(false);
      // Handle error here
      openNotificationWithIcon(
        "info",
        "",
        result.data?.response?.data?.message || result.errorMsg || "Error",
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
      {/* Context for ant design notification */}
      {contextHolder}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div className="mb-6">
            <p className="font-semibold font-sans text-2xl">Shortened URL</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <label className="font-sans text-sm font-semibold">Name</label>
              <CustomInput
                required
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Input Name"
                className="bg-slate-100 h-12"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>

            {/* Website URL */}
            <div className="mb-6">
              <label className="font-sans text-sm font-semibold">
                Website URL
              </label>
              <CustomInputLink
                required
                name="websiteUrl"
                value={formik.values.websiteUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Website URL"
                className="bg-slate-100 h-12"
              />
              {formik.touched.websiteUrl && formik.errors.websiteUrl ? (
                <div className="text-red-600">{formik.errors.websiteUrl}</div>
              ) : null}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="font-sans text-sm font-semibold">
                Description
              </label>
              <CustomInput
                required
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Input Description"
                className="bg-slate-100 h-12"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-600">{formik.errors.description}</div>
              ) : null}
            </div>

            {/* Shorten URL Button */}
            <div className="mb-8">
              <button
                className="w-full h-12 font-sans bg-blue-900 text-white rounded-xl text-lg"
                type="submit"
              >
                {!formLoading ? (
                  <span className="text-sm font-semibold font-sans">
                    Shorten URL
                  </span>
                ) : (
                  <LoadingOutlined />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashboardForm;
