import { LucideIcon } from "lucide-react";

interface EllipsisItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function EllipsisItem({ icon: Icon, label, onClick }: EllipsisItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl px-4 py-2 text-left 
                 hover:bg-gray-100 dark:hover:bg-neutral-800 
                 transition-colors"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
