"use client";

import React, { useState, useRef, useEffect } from "react";
import { EllipsisVerticalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EllipsisMenu({ open, setOpen, children, className }: { open: boolean , setOpen: React.Dispatch<React.SetStateAction<boolean>>; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Botão trigger */}
    <button
        onClick={() => setOpen((prev) => !prev)}
        className={`p-1 h-8 w-8 rounded-xl flex items-center justify-center
                    hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer ${className}`}
        >
        <EllipsisVerticalIcon className="h-5 w-5" />
    </button>

      {/* Dropdown animado */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute p-1 right-0 md:left-0 z-99 mt-2 w-48 rounded-xl shadow-lg bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white"
          >
            <EllipsisDropdown>{children}</EllipsisDropdown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// Container para o conteúdo do dropdown
export function EllipsisDropdown({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}
