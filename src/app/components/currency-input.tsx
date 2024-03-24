import type { ChangeEvent, FC } from "react";
import clsx from "clsx";

interface CurrencyInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  label?: string;
  errorMessage?: string;
  helperMessage?: string;
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  value,
  onChange,
  isValid,
  label,
  errorMessage,
  helperMessage,
}) => {
  return (
    <>
      {label && <label>{label}</label>}
      <div className="flex items-stretch">
        <span className="bg-gray-400 text-white px-2">£</span>
        <input
          type="text"
          className={clsx("border-solid border px-1", {
            "border-red-600": !isValid,
          })}
          value={value}
          onChange={onChange}
        />
      </div>
      {!isValid && errorMessage && (
        <p className="text-sm text-red-600 leading-tight mt-1">
          {errorMessage}
        </p>
      )}
      {isValid && helperMessage && (
        <p className="text-sm text-gray-400 leading-tight mt-1">
          {helperMessage}
        </p>
      )}
    </>
  );
};

export default CurrencyInput;
