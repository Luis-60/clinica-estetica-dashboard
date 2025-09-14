import * as React from 'react';
import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';

type TabData = {
  label: string;
  value: string; // rota para navegar
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
};

type UnderlineTabsProps = {
  tabs: TabData[];
  currentPath?: string;
  className?: string;
  onTabChange?: (value: string) => void;
};

export function UnderlineTabs({ 
  tabs, 
  currentPath, 
  className,
  onTabChange 
}: UnderlineTabsProps) {
  // Determina a aba ativa baseada no path atual
  const getActiveTab = () => {
    if (currentPath) {
      return tabs.find(tab => currentPath.startsWith(tab.value))?.value || tabs[0]?.value;
    }
    return tabs[0]?.value;
  };

  const [activeTab, setActiveTab] = React.useState(getActiveTab());

  React.useEffect(() => {
    setActiveTab(getActiveTab());
  }, [currentPath]);

  const handleTabClick = (tabValue: string, disabled?: boolean) => {
    if (disabled) return;
    
    setActiveTab(tabValue);
    
    // Chama callback se fornecido
    if (onTabChange) {
      onTabChange(tabValue);
    }
    
    // Navega usando Inertia.js
    router.get(tabValue);
  };

  return (
    <div className={cn('w-full', className)}>
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map(({ label, value, icon: Icon, disabled }) => {
          const isActive = activeTab === value;
          
          return (
            <button
              key={value}
              onClick={() => handleTabClick(value, disabled)}
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

// Variação com estilo de pills em vez de underline
export function PillTabs({ 
  tabs, 
  currentPath, 
  className,
  onTabChange 
}: UnderlineTabsProps) {
  const getActiveTab = () => {
    if (currentPath) {
      return tabs.find(tab => currentPath.startsWith(tab.value))?.value || tabs[0]?.value;
    }
    return tabs[0]?.value;
  };

  const [activeTab, setActiveTab] = React.useState(getActiveTab());

  React.useEffect(() => {
    setActiveTab(getActiveTab());
  }, [currentPath]);

  const handleTabClick = (tabValue: string, disabled?: boolean) => {
    if (disabled) return;
    
    setActiveTab(tabValue);
    
    if (onTabChange) {
      onTabChange(tabValue);
    }
    
    router.get(tabValue);
  };

  return (
    <div className={cn('w-full', className)}>
      <nav className="flex space-x-1 rounded-lg bg-muted p-1" aria-label="Tabs">
        {tabs.map(({ label, value, icon: Icon, disabled }) => {
          const isActive = activeTab === value;
          
          return (
            <button
              key={value}
              onClick={() => handleTabClick(value, disabled)}
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