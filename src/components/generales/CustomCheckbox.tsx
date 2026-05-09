import { useFormikContext } from "formik";

interface FormValues {
  [key: string]: boolean | string | number;
}

interface CustomCheckboxProps {
  name: string;
  label: string;
}

const CustomCheckbox = ({ name, label }: CustomCheckboxProps) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const checked = values[name] as boolean;

  return (
    <label
      onClick={() => setFieldValue(name, !checked)}
      className="flex items-center gap-2 cursor-pointer"
    >
      <div
        className={`w-4 h-4 rounded-[4px] border-[2px] flex items-center justify-center 
        ${checked ? "bg-[#6C61F6] border-[#6C61F6]" : "border-[#6C61F6]"}`}
      >
        {checked && (
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.5L4.5 8L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <span className="text-sm text-[#0A090C] font-medium leading-[140%]">
        {label}
      </span>
    </label>
  );
};

export default CustomCheckbox;
