import * as React from "react";
import { cn } from "@/lib/utils";

export interface FileInputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FileInputBox = React.forwardRef<HTMLInputElement, FileInputBoxProps>(
  ({ className, label = "Clique ou arraste um PDF aqui", error, ...props }, ref) => {
    const [dragActive, setDragActive] = React.useState(false);

    return (
      <div>
        <label
          className={cn(
            "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
            error && "border-red-500 bg-red-50",
            className
          )}
          onDragOver={e => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={e => {
            e.preventDefault();
            setDragActive(false);
          }}
          onDrop={e => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && props.onChange) {
              const event = {
                ...e,
                target: { files: e.dataTransfer.files }
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              props.onChange(event);
            }
          }}
        >
          <input
            ref={ref}
            type="file"
            accept="application/pdf"
            className="hidden"
            {...props}
          />
          {/* Ícone PDF SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="4" y="2" width="16" height="20" rx="2" fill="#fff" stroke="#ef4444" strokeWidth="2"/>
            <path  stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            <text x="12" y="20" textAnchor="left" fontSize="6" fill="#ef4444">PDF</text>
          </svg>
          <span className="text-gray-500 text-sm">{label}</span>
          <span className="mt-2 text-xs text-gray-400">Apenas PDF</span>
        </label>
        {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
      </div>
    );
  }
);

FileInputBox.displayName = "FileInputBox";