import { FileIcon } from "lucide-react";

interface FileTypeConfig {
    extension: string;
    label: string;
    color: string;
}

function FileIconComponent({ config, fileName, className }: {
    config: FileTypeConfig;
    fileName: string;
    className?: string;
}) {
    return (
        <div className="flex flex-col max-w-24"
            >
            <div 
                className={`relative flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity ${className}`} 
            >
                <FileIcon className={`w-16 h-16 text-${config.color}-600 border-${config.color}-600 rounded p-2`} strokeWidth={1} />
                <span className={`absolute left-5 top-7 inset-0 flex text-xs font-bold text-${config.color}-600 z-10 pointer-events-none`}>
                    {config.label}
                </span>
            </div>
        </div>
    );
}

export function FileTypes({ file, className }: { file?: string, className?: string }) {
    const fileName = file ;
    
    if (!file || !fileName ) return null;


    const getFileConfig = (fileName: string): FileTypeConfig => {
        if (fileName.endsWith(".pdf")) {
            return { extension: ".pdf", label: "PDF", color: "red" };
        }
        if (fileName.endsWith(".doc")) {
            return { extension: ".doc", label: "DOC", color: "blue" };
        }
        if (fileName.endsWith(".docx")) {
            return { extension: ".docx", label: "DOCX", color: "green" };
        }
        if (fileName.endsWith(".csv")) {
            return { extension: ".csv", label: "CSV", color: "yellow" };
        }
        return { extension: "", label: "FILE", color: "gray" };
    };

    const config = getFileConfig(fileName);

    return (
        <FileIconComponent 
            config={config} 
            fileName={fileName} 
            className={className}
        />
    );
}