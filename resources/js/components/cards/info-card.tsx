import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string
  className?: string;
  children?: React.ReactNode;
}

export function InfoCard({ icon, title, children, className }: InfoCardProps) {
  return (
    <div className={`rounded-lg border p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <span className="text-xl font-bold text-foreground">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
