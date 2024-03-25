import type { ChangeEvent, FC } from "react";
import clsx from "clsx";

interface CurrencyInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  label?: string;
  errorMessage?: string;
  helperMessage?: string;
  testId?: string;
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  value,
  onChange,
  isValid,
  label,
  errorMessage,
  helperMessage,
  testId,
}) => {
  return (
    <>
      {label && (
        <label className="block text-gray-600 text-sm mb-1">{label}</label>
      )}
      <div className="flex items-stretch">
        <span className="bg-gray-400 text-white px-2">£</span>
        <input
          type="text"
          data-testId={testId}
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
