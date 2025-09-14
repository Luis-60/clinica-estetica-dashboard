import { FileIcon } from "lucide-react";
import { ChangeEventHandler, useState } from "react";

interface Props {
  label: string;
  accept: string;
  multiple?: boolean;
  value: File[];
  onChange: (files: File[]) => void;
}

export default function InputFile({
  label,
  accept,
  multiple = false,
  value,
  onChange,
}: Props) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onChange(filesArray);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onChange(filesArray);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
        dragActive
          ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="text-center pointer-events-none">
        <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {value.length > 0 ? (
              <ul className="space-y-1">
                {value.map((file, idx) => (
                  <li
                    key={idx}
                    className="text-blue-600 dark:text-blue-400 font-medium text-sm"
                  >
                    {file.name}
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Clique para enviar
                </span>{" "}
                ou arraste e solte
              </>
            )}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {label}
          </p>
        </div>
      </div>
    </div>
    
  );
}
