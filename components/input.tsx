import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  name: string;
  type: string;
  register: UseFormRegisterReturn;
  errorMsg?: string;
  [key: string]: any;
}

export default function Input({
  id,
  name,
  type,
  register,
  errorMsg,
  ...rest
}: InputProps) {
  return (
    <div className="h-24">
      <label htmlFor={id} className="text-sm">
        {name}
      </label>
      <input
        {...register}
        type={type}
        id={id}
        className="border border-slate-400 block w-full h-10 rounded-md mt-1 px-3"
        required
        {...rest}
      />
      <span className="text-xs text-red-500">{errorMsg}</span>
    </div>
  );
}
