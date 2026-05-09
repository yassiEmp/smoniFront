import { ErrorMessage } from "formik";

import shield_icon from "@assets/authentification/register/shield.svg";

const ErrorField = ({ name }: { name: string }) => (
  <ErrorMessage
    name={name}
    render={(msg) => (
      <div className="flex items-center gap-1 text-[13px] text-red-600 mt-1">
        <img src={shield_icon} alt="Erreur" className="w-[14px] h-auto" />
        <span>{msg}</span>
      </div>
    )}
  />
);

export default ErrorField;
