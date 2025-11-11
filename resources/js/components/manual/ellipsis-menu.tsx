import React from "react";
import { EllipsisVerticalIcon } from "lucide-react";
import * as Popover from '@radix-ui/react-popover';

interface EllipsisMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
}

export function EllipsisMenu({ open, setOpen, children, className }: EllipsisMenuProps) {
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={`p-1 h-8 w-8 rounded-xl flex items-center justify-center
          hover:bg-gray-200/40 dark:hover:bg-neutral-800/40 cursor-pointer ${className || ''} transition duration-500`}
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-48"
          sideOffset={5}
          align="end"
          alignOffset={-5}
        >
          <div className="flex flex-col">
            {children}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// Container para o conteúdo do dropdown
export function EllipsisDropdown({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}