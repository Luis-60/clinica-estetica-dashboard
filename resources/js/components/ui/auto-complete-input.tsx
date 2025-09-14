import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./command";
import { Command as CommandPrimitive } from "cmdk";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type KeyboardEvent,
} from "react";

import { Skeleton } from "./skeleton";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type Option = {
  value: string | number;
  label: string | ReactNode;
  searchText?: string; // Texto para busca quando label é um componente
  text?: React.ReactNode | null;
} & Record<string, any>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  value?: Option;
  onValueChange?: (value: Option) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  cleanAfterSelect?: boolean;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
  className,
  cleanAfterSelect = false,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<string>(
    value
      ? value.text
        ? String(value.text)
        : typeof value.label === "string"
          ? value.label
          : value.searchText || ""
      : ""
  );

  // Sincronizar estado interno quando value prop muda
  useEffect(() => {
    setSelected(value as Option);
    const displayText = value
      ? value.text
        ? String(value.text)
        : typeof value.label === "string"
          ? value.label
          : value.searchText || ""
      : "";
    setInputValue(displayText);
  }, [value]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find((option) => {
          const searchText = option.text
            ? String(option.text)
            : typeof option.label === "string"
              ? option.label
              : option.searchText || "";
          return searchText === input.value;
        });
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    const displayText = selected
      ? selected.text
        ? String(selected.text)
        : typeof selected.label === "string"
          ? selected.label
          : selected.searchText || ""
      : "";
    setInputValue(displayText);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      const displayText = selectedOption.text
        ? String(selectedOption.text)
        : typeof selectedOption.label === "string"
          ? selectedOption.label
          : selectedOption.searchText || "";

      if (!cleanAfterSelect) {
        setInputValue(displayText);

        setSelected(selectedOption);
      }
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown} className="w-full">
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={isLoading ? undefined : setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(className, "text-base")}
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl outline-none",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200 bg-background dark:ring-slate-800">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  const searchText = option.text
                    ? String(option.text)
                    : typeof option.label === "string"
                      ? option.label
                      : option.searchText || "";
                  return (
                    <CommandItem
                      key={option.value}
                      value={searchText}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
