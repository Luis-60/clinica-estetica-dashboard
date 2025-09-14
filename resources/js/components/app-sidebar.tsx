import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BarChart3, BookOpen, Calendar, FileCheck, LuggageIcon, FileText, Folder, Gavel, GraduationCap, LayoutGrid, Newspaper, Pen, PieChart, Settings, Users, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { props } = usePage();
    const auth = props.auth as { user: any; userTypes: string[] };
// Grupo principal - Usuário comum
const mainNavItems: NavItem[] = [
    {
        title: 'Menu',
        href: '/menu',
        icon: LayoutGrid,
    },
    
];



const administradorItems: NavItem[] = [
    {
        title: 'Autores',
        href: route('autores.index'),
        icon: Pen,
    },
    {
        title: 'Artigos',
        href: route('artigos.index'),
        icon: Newspaper,
    },
    {
        title: 'Avaliadores',
        href: route('avaliadores.index'),
        icon: Users,
    },
    {
        title: 'Orientadores',
        href: route('orientadores.index'),
        icon: GraduationCap,
    },
    
    {
        title: 'Coordenadores',
        href: route('coordenadores.index'),
        icon: LuggageIcon,
    },

    {
        title: 'Eventos',
        href: route('eventos.index'),
        icon: Calendar
    },
    {
        title: 'Áreas',
        href: route('areas.index'),
        icon: Folder
    },
    // {
    //     title: 'Cursos e Períodos',
    //     href: route('cursos-periodos.index'),
    //     icon: BookOpen
    // },
    {
        title: 'Designar Avaliador',
        href: route('designarAvaliador.index'),
        icon: Gavel,
    },

];

// Grupo Coordenadores
const coordenadorItems: NavItem[] = [
    {
        title: 'Designar Avaliador',
        href: route('designarAvaliador.index'),
        icon: Gavel,
    },
];

// Grupo Avaliadores
const avaliadorItems: NavItem[] = [
    {
        title: 'Avaliar Artigos',
        href: `/avaliar-artigo/${auth.user.id}`,
        icon: FileText,
    },
];
// Grupo Avaliadores
const orientadorItems: NavItem[] = [
    {
        title: 'Orientar Artigos',
        href: '/relatorios/artigos',
        icon: FileText,
    },
];


const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

    
    // Função para determinar quais grupos exibir baseado no tipo de usuário
    const getNavItemsForUser = () => {
        const userTypes = auth?.userTypes || [];
        
        // Se for administrador, mostra tudo
        if (userTypes.includes('Administrador SEGET') || userTypes.includes('Administrador SEAC')) {
            return {
                items: mainNavItems,
                administrador: administradorItems,
                coordenador: [],
                avaliador: [],
                orientador: [],
            };
        }
        
        // Se for coordenador, mostra apenas o grupo de coordenadores
        if (userTypes.includes('Coordenador')) {
            return {
                items: mainNavItems,
                administrador: [],
                coordenador: coordenadorItems,
                avaliador: [],
                orientador: [],
            };
        }
        
        // Se for avaliador, mostra apenas o grupo de avaliadores
        if (userTypes.includes('Avaliador Seget') || userTypes.includes('Avaliador Seac')) {
            return {
                items: mainNavItems,
                administrador: [],
                coordenador: [],
                avaliador: avaliadorItems,
                orientador: [],
            };
        }
        
        // Se for orientador, mostra apenas o grupo de orientadores
        if (userTypes.includes('Orientador')) {
            return {
                items: mainNavItems,
                administrador: [],
                coordenador: [],
                avaliador: [],
                orientador: orientadorItems,
            };
        }
        
        // Se for apenas autor ou usuário comum, mostra apenas itens principais
        return {
            items: mainNavItems,
            administrador: [],
            coordenador: [],
            avaliador: [],
            orientador: [],
        };
    };

    const navItems = getNavItemsForUser();
    
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain 
                    items={navItems.items}
                    administrador={navItems.administrador}
                    coordenador={navItems.coordenador}
                    orientador={navItems.orientador}
                    avaliador={navItems.avaliador}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
