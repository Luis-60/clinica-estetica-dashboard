import { useEffect, useState } from "react";
import Papa from "papaparse";

type ExibeCsvProps = {
  file: File;
  onDataChange?: (data: any[]) => void; // Optional callback to sync data to parent
};

export default function ExibeCsv({ file, onDataChange }: ExibeCsvProps) {
  const [csvData, setCsvData] = useState<any[]>([]);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const result = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });
      setCsvData(result.data);
      onDataChange?.(result.data); // Sync parsed data to parent
    };
    reader.readAsText(file);
  }, [file]);

  const handleChange = (rowIdx: number, key: string, newValue: string) => {
    const updated = [...csvData];
    updated[rowIdx] = { ...updated[rowIdx], [key]: newValue };
    setCsvData(updated);
    onDataChange?.(updated);
  };

  if (csvData.length === 0) return null;

  return (
    <div className="border border-foreground w-full rounded overflow-x-auto">
      <div className="flex bg-foreground text-background font-medium">
        {Object.keys(csvData[0]).map((key) => (
          <div key={key} className="border border-foreground px-2 py-1 flex-1">
            {key}
          </div>
        ))}
      </div>

      {csvData.map((row, idx) => (
        <div key={idx} className="flex">
          {Object.entries(row).map(([key, value], i) => (
            <div key={i} className="border border-foreground px-2 py-1 flex-1">
              <input
                className="w-full bg-transparent outline-none"
                type="text"
                value={value?.toString()}
                onChange={(e) => handleChange(idx, key, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
