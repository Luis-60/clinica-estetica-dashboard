"use client";

import { cn } from "@/lib/utils";
import { CommandGroup, CommandItem, Command as CommandPrimitive } from "cmdk";
import { Check, X } from "lucide-react";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { Badge } from "../ui/badge";
import { CommandList } from "../ui/command";
import { Skeleton } from "../ui/skeleton";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  className?: string;
  error?: boolean;
  inputIcon?: React.ReactNode | string;
  emptyMessage?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  setSelectedValues,
  placeholder = "Digite para buscar...",
  className,
  error,
  inputIcon,
  emptyMessage = "Nenhuma opção encontrada",
  isLoading = false,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Filtrar opções baseado no input e excluir já selecionadas
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedValues.includes(option.value)
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      // Manter opções abertas quando digitando
      if (!isOpen) {
        setOpen(true);
      }

      // Enter para selecionar primeira opção disponível
      if (
        event.key === "Enter" &&
        input.value !== "" &&
        filteredOptions.length > 0
      ) {
        event.preventDefault();
        const optionToSelect = filteredOptions[0];
        if (optionToSelect) {
          handleSelectOption(optionToSelect.value);
          setInputValue(""); // Limpar input após selecionar
        }
      }

      // Escape para fechar
      if (event.key === "Escape") {
        input.blur();
        setOpen(false);
      }

      // Backspace para remover último item selecionado quando input vazio
      if (
        event.key === "Backspace" &&
        input.value === "" &&
        selectedValues.length > 0
      ) {
        event.preventDefault();
        const newValues = [...selectedValues];
        newValues.pop();
        setSelectedValues(newValues);
      }
    },
    [isOpen, filteredOptions, selectedValues, setSelectedValues]
  );

  const handleBlur = useCallback(() => {
    // Delay para permitir clique em opções
    setTimeout(() => {
      setOpen(false);
      setInputValue(""); // Limpar input quando perder foco
    }, 150);
  }, []);

  const handleSelectOption = useCallback(
    (value: string) => {
      if (!selectedValues.includes(value)) {
        setSelectedValues([...selectedValues, value]);
      }
      setInputValue(""); // Limpar input após selecionar

      // Manter foco no input para continuar digitando
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 0);
    },
    [selectedValues, setSelectedValues]
  );

  const removeSelected = useCallback(
    (value: string) => {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    },
    [selectedValues, setSelectedValues]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div className="relative rounded-md h-9 group">
        {inputIcon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none brightness-50 z-10">
            {inputIcon}
          </div>
        )}

        {/* Container do input com tags selecionadas */}
        <div
          className={cn(
            // Base styles matching your Input component
            "text-lg rounded-lg block w-full p-1 group-focus-within:ring-ring/50 border border-input group-focus-within:border-ring group-focus-within:ring-[3px]",
            // Icon padding
            inputIcon && "ps-8",
            // Error styles
            error
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 ring-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : "border-input",
            // Additional utility styles
            "transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "flex flex-wrap gap-1 items-center cursor-text",
            className
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Tags selecionadas */}
          {selectedValues.map((value) => {
            const option = options.find((opt) => opt.value === value);
            return (
              <Badge
                key={value}
                className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md text-sm h-"
              >
                <span>{option?.label || value}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelected(value);
                  }}
                  className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 cursor-pointer"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            );
          })}

          {/* Input para digitar */}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => !isLoading && setInputValue(e.target.value)}
            onBlur={handleBlur}
            onFocus={() => setOpen(true)}
            placeholder={selectedValues.length === 0 ? placeholder : ""}
            disabled={disabled}
            className="flex-1 bg-transparent ps-2 border-0 outline-none min-w-[120px] peer"
          />
        </div>
      </div>

      {/* Dropdown de opções */}
          {filteredOptions.length > 0 && !isLoading ? (
            <div className="relative">
              <div
                className={cn(
                  "animate-in fade-in-0 zoom-in-95 absolute w-full rounded bg-background outline-none shadow-lg border border-input z-50",
                  isOpen ? "block" : "hidden"
                )}
              >
                <CommandList className="rounded max-h-60 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-3 text-center">
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : null}

                  <CommandGroup>
                    {filteredOptions.map((option) => {
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => handleSelectOption(option.value)}
                          className="flex w-full items-center gap-2 cursor-pointer hover:bg-accent px-3 py-2"
                        >
                          <Check className="w-4 h-4 opacity-0" />
                          {option.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>

                  {!isLoading &&
                  filteredOptions.length === 0 &&
                  inputValue !== "" ? (
                    <div className="select-none rounded-sm px-2 py-3 text-center text-sm text-gray-500">
                      {emptyMessage}
                    </div>
                  ) : null}
                </CommandList>
              </div>
            </div>
          ) : null}
    </CommandPrimitive>
  );
};

export default MultiSelect;
