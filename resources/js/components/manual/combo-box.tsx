"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type CmbOption = {
  value: string | number;
  label: string;
  text?: React.ReactNode | null;
};

interface Props {
  icon?: React.ReactNode | null;
  placeholder?: string | null;

  value?: string | number;
  onChange?: (value: any) => void;
  options: CmbOption[];
}

export function ComboBox({
  icon,
  placeholder = "Selecione",
  value,
  onChange,
  options,
}: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {icon}
          {value
            ? (() => {
                const option = options.find(
                  (option) => option.value?.toString() === value.toString()
                );

                return option ? option.text || option.label : placeholder;
              })()
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command
          filter={(_, search, options) => {
            return options
              ?.map((keyword) =>
                keyword.toLowerCase().includes(search.toLowerCase())
              )
              .some((result) => !!result)
              ? 1
              : 0;
          }}
          className="bg-card w-full"
        >
          {/* <CommandInput placeholder="Pesquisar" className="h-9" /> */}
          <CommandList className="w-full">
            <CommandEmpty>Sem Opções.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  className="cursor-pointer"
                  key={option.value}
                  keywords={[option.label]}
                  value={option.value?.toString()}
                  onSelect={(currentValue) => {
                    onChange?.(currentValue);
                    setOpen(false);
                  }}
                >
                  {option.text ? option.text : option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
