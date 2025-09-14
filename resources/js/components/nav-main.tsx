import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface NavMainProps {
    items?: NavItem[];
    orientador?: NavItem[];
    administrador?: NavItem[];
    coordenador?: NavItem[];
    avaliador?: NavItem[];
    configuracoes?: NavItem[];
}

export function NavMain({ items = [], avaliador = [], administrador = [], configuracoes = [], orientador = [], coordenador = [] }: NavMainProps) {
    const page = usePage();
    
    return (
        <>
            {/* Grupo principal (Usuário Comum) */}
            {items.length > 0 && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}

            {/* Administrador */}
            {administrador.length > 0 && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Administrador</SidebarGroupLabel>
                    <SidebarMenu>
                        {administrador.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}

            {/* Grupo Orientadores */}
            {orientador.length > 0 && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Orientador</SidebarGroupLabel>
                    <SidebarMenu>
                        {orientador.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}

            {/* Grupo Avaliadores */}
            {avaliador.length > 0 && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Avaliador</SidebarGroupLabel>
                    <SidebarMenu>
                        {avaliador.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}

            {/* Grupo Coordenadores */}
            {coordenador.length > 0 && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Coordenador</SidebarGroupLabel>
                    <SidebarMenu>
                        {coordenador.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}

            {/* Grupo Configurações */}
            {configuracoes.length > 0 && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Configurações</SidebarGroupLabel>
                    <SidebarMenu>
                        {configuracoes.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}
        </>
    );
}
