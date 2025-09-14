import React from "react";

interface StepperProps {
  step: number;
  steps: string[];
  onStepChange?: (step: number) => void;
}

export default function Stepper({ step, steps, onStepChange }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((label, idx) => {
        const active = step === idx + 1;
        const completed = step > idx + 1;
        const clickable = typeof onStepChange === 'function' && (completed || !active);
        return (
          <div key={label} className="flex items-center gap-2">
            {clickable ? (
              <button
                type="button"
                onClick={() => onStepChange(idx + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 focus:outline-none
                  ${active ? 'bg-blue-600 border-blue-600 text-white' : completed ? 'bg-blue-100 border-blue-400 text-blue-700 hover:bg-blue-200' : 'bg-gray-200 border-gray-300 text-gray-500 hover:bg-gray-300'}`}
                aria-label={`Ir para etapa ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ) : (
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200
                  ${active ? 'bg-blue-600 border-blue-600 text-white' : completed ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-200 border-gray-300 text-gray-500'}`}
              >
                {idx + 1}
              </div>
            )}
            {idx < steps.length - 1 && (
              <div className={`h-1 w-8 rounded ${completed ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
