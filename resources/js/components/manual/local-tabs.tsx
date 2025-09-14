import * as React from 'react';
import { cn } from '@/lib/utils';

type TabData = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
};

type LocalTabsProps = {
  tabs: TabData[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
};

// Componente de tabs simples que não navega, apenas alterna estado local
export function LocalTabs({ 
  tabs, 
  value,
  onValueChange,
  className
}: LocalTabsProps) {
  const handleTabClick = (tabValue: string, disabled?: boolean) => {
    if (disabled) return;
    onValueChange(tabValue);
  };

  return (
    <div className={cn('w-full', className)}>
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map(({ label, value: tabValue, icon: Icon, disabled }) => {
          const isActive = value === tabValue;
          
          return (
            <button
              key={tabValue}
              onClick={() => handleTabClick(tabValue, disabled)}
              disabled={disabled}
              className={cn(
                'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium transition-colors',
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:border-gray-300 hover:text-gray-700',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {Icon && (
                <Icon 
                  className={cn(
                    'mr-2 h-4 w-4',
                    isActive 
                      ? 'text-primary' 
                      : 'text-muted-foreground group-hover:text-gray-700'
                  )} 
                />
              )}
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// Versão em formato de pills
export function LocalPillTabs({ 
  tabs, 
  value,
  onValueChange,
  className
}: LocalTabsProps) {
  const handleTabClick = (tabValue: string, disabled?: boolean) => {
    if (disabled) return;
    onValueChange(tabValue);
  };

  return (
    <div className={cn('w-full', className)}>
      <nav className="flex space-x-1 rounded-lg bg-muted p-1" aria-label="Tabs">
        {tabs.map(({ label, value: tabValue, icon: Icon, disabled }) => {
          const isActive = value === tabValue;
          
          return (
            <button
              key={tabValue}
              onClick={() => handleTabClick(tabValue, disabled)}
              disabled={disabled}
              className={cn(
                'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {Icon && (
                <Icon className="mr-2 h-4 w-4" />
              )}
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
