import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Ripple } from 'primereact/ripple';
interface NavMainProps {
    items?: NavItem[];
    admin?: NavItem[];
    user?: NavItem[];
    configuracoes?: NavItem[];
}

export function NavMain({ items = [], admin = [], user = [], configuracoes = [] }: NavMainProps) {
    const page = usePage();

    const renderGroup = (label: string, groupItems: NavItem[]) => {
        if (!groupItems.length) return null;

        return (
            <SidebarGroup className="px-2 py-0">
                <SidebarGroupLabel>{label}</SidebarGroupLabel>

                <SidebarMenu>
                    {groupItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.routeName
                            ? route().current(item.routeName)
                            : page.url.startsWith(item.href);

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch className="relative">
                                        {Icon && <Icon />}
                                        <span>{item.title}</span>
                                        <Ripple style={{ background: 'rgba(0,0,0,0.2' }}/>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroup>
        );
    };

    return (
        <>
            {/* Grupo principal */}
            {renderGroup('Menu', items)}
            {renderGroup('Administrador', admin)}
            {renderGroup('Usuário', user)}
            {renderGroup('Configurações', configuracoes)}
        </>
    );
}
