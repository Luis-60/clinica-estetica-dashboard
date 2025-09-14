import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { ChangeEventHandler } from "react";

type FieldBaseProps = {
  label: string;
  fieldClassName?: string;
  placeholder?: string;
  errors?: string;
  inputIcon?: React.ReactNode | string | null;
  disabled?: boolean;
  type?: string;
};

type WithInputProps = {
  value: string | number | readonly string[] | undefined;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  children?: never;
};

type WithChildrenProps = {
  children: React.ReactNode;
  className?: never;
  value?: never;
  onChange?: never;
  type?: never;
};

type FieldProps = FieldBaseProps & (WithInputProps | WithChildrenProps);

export default function Field({
  label,
  placeholder,
  type,
  className,
  fieldClassName,
  value,
  inputIcon,
  onChange,
  errors,
  children,
}: FieldProps) {
  return (
    <div className={cn(fieldClassName, "grid gap-1 w-full")}>
      <label className="font-bold">{label}</label>
      {children ? (
        children
      ) : (
        <Input
          inputIcon={inputIcon}
          placeholder={placeholder ?? label}
          type={type ?? "text"}
          value={value}
          onChange={onChange}
          className={cn(errors ? "border-destructive" : "", className + "")}
        />
      )}
      {errors && <span className={"text-destructive text-sm"}>{errors}</span>}
    </div>
  );
}
