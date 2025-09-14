export default function SectionHeader({ icon, title, className }: { icon: React.ReactNode, title: string, className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}
