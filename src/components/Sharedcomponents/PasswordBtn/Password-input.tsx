import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { ReactNode, useState } from "react";
import "./Password-input.css";

type IPasswordInput = {
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

const PasswordInput: React.FC<IPasswordInput> = (props: IPasswordInput) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <input
          required={props?.required}
          name={props?.name}
          value={props.value}
          onChange={props?.onChange}
          type={togglePassword ? " text" : "password"}
          style={props.style}
          onBlur={props.onBlur}
          className={`pr-10 py-2 border rounded-lg w-full  h-14 bg-white border-green text-sm pl-4 text-gray-500 ${props.className}`}
          placeholder={props?.placeholder}
        />

        <div
          className={
            "absolute inset-y-0 right-0 pr-3  flex items-center text-gray-500"
          }
        >
          {togglePassword ? (
            <EyeOutlined
              onClick={() => {
                setTogglePassword(!togglePassword);
              }}
              className="passwordIcon"
              rev={undefined}
            />
          ) : (
            <EyeInvisibleOutlined
              onClick={() => {
                setTogglePassword(!togglePassword);
              }}
              className="passwordIcon"
              rev={undefined}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
