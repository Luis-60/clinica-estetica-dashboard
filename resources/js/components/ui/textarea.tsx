import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  bordered?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, bordered = true, ...props }, ref) => (
    <div className="relative w-full">
      {label && (
        <span className="absolute left-1 -top-3 px-1 bg-background text-sm font-medium text-accent-foreground z-10">{label}</span>
      )}
      <textarea
        ref={ref}
        className={cn(
          bordered
            ? "border-input border"
            : "border-none",
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-md bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    </div>
  )
);

Textarea.displayName = "Textarea";

export { Textarea };