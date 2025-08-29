import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, { placeholder: string; type?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }>(
  ({ placeholder, type = "text", value, onChange }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          className="px-4 py-2 border m-2 rounded border-slate-200 outline-slate-400"
        />
      </div>
    );
  }
);
