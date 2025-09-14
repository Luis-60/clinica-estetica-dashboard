import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "./button";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputIcon?: React.ReactNode | string;
}

function Input({ className, type, inputIcon, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [innerType, setInnerType] = React.useState<string | null>(null);

  return (
    <div className="relative w-full">
      {inputIcon && (
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none brightness-50">
          {inputIcon}
        </div>
      )}
      <input
        type={innerType ?? type}
        data-slot="input"
        className={cn(
          inputIcon && "ps-10",
          "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-white text-gray-900 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-white file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {type === "password" && (
        <Button
          type="button"
          variant="ghost"
          className="absolute inset-y-0 end-0 flex items-center ps-3.5 brightness-50 hover:bg-none"
          onClick={() => {
            setInnerType(!showPassword ? "text" : "password");
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      )}
    </div>
  );
}

export { Input };
