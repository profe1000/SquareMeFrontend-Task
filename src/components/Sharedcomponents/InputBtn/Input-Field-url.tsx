import { ReactNode } from "react";
import "./Input-Field.css";

type ICustomInputLink = {
  icon?: ReactNode;
  type?: string;
  name?: string;
  testId?: string;
  placeholder?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  required?: boolean;
  className?: string;
  style?: any;
};

const CustomInputLink: React.FC<ICustomInputLink> = (
  props: ICustomInputLink
) => {
  return (
    <>
      <div className="relative w-full">
        <input
          required={props.required}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type={props.type || "text"}
          onBlur={props.onBlur}
          style={props.style}
          className={`pl-20 py-2 border rounded-lg w-full h-14 bg-white border-green text-sm text-gray-500 ${
            props.icon ? "pr-10" : "pr-4"
          } ${props.className}`}
          placeholder={props.placeholder}
        />
        <div
          className={
            "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 border-r"
          }
        >
          <span className="pr-2 text-sm">http://</span>
        </div>
        {props.icon && (
          <div
            className={
              "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500"
            }
          >
            {props.icon}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomInputLink;
