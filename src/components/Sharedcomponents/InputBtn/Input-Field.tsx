import { ReactNode } from "react";
import "./Input-Field.css";

type ICustomInput = {
  icon?: ReactNode;
  type?: string;
  name?: string;
  testId?: string;
  placeholder?: string;
  onBlur?;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  required?: boolean;
  className?: string;
  style?: any;
};

const CustomInput: React.FC<ICustomInput> = (props: ICustomInput) => {
  return (
    <>
      <div className="relative w-full">
        <input
          required={props.required}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          type={props.type || "text"}
          style={props.style}
          className={`pl-4 py-2 border rounded-lg w-full  h-14 bg-white border-green text-sm text-gray-500 ${
            props.icon ? " pr-10" : " pr-4"
          } ${props.className}`}
          placeholder={props.placeholder}
        />
        {props.icon && (
          <div
            className={
              "absolute inset-y-0 right-0 pr-3  flex items-center  pointer-events-none text-gray-500"
            }
          >
            {props.icon}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomInput;
