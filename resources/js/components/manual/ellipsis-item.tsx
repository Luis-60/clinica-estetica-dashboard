import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EllipsisItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "destructive";
}

export function EllipsisItem({
  icon: Icon,
  label,
  onClick,
  variant = "default",
}: EllipsisItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        variant === "destructive"
          ? "hover:bg-destructive/10 hover:text-destructive"
          : "hover:bg-accent hover:text-accent-foreground",
        "flex items-center gap-2 rounded-xl px-4 py-2 text-left transition-colors duration-300"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}