import React from 'react';

interface NumberInputProps {
  value: number | string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  min = 0,
  max = 10,
  step = 1,
  disabled = false,
  onChange,
  onBlur,
  className = '',
  label,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || val === undefined || val === null) {
      onChange(0);
      return;
    }
    const num = Number(val);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className="flex flex-col gap-1 items-start w-fit">
      {label && (
        <span className="text-sm font-medium text-gray-700 mb-1">{label}</span>
      )}
      <div className="relative w-fit">
        <input
          type="text"
          min={min}
          max={max}
          step={step}
          value={value === '' || value === undefined || value === null ? '' : value}
          onChange={handleInputChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`bg-gray-50 border border-gray-300 rounded text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-24 h-8 px-2 py-1 pr-8 ${className}`}
          style={{ minWidth: 0, width: '5.5rem', height: '2rem', fontSize: '1rem' }}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none select-none">/ {max}</span>
      </div>
    </div>
  );
};