import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

interface UserInfoProps {
  user?: Partial<User>; // Torna o user opcional e aceita Partial<User>
  showEmail?: boolean;
}

export function UserInfo({ user, showEmail = false }: UserInfoProps) {
    const getInitials = useInitials();
    
    // Se user for undefined, retorna null ou um fallback UI
    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        ??
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">Usuário não disponível</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.nome || 'Usuário'} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {user.nome ? getInitials(user.nome) : '??'}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                    {user.nome || 'Usuário sem nome'}
                </span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email || 'Sem email'}
                    </span>
                )}
            </div>
        </div>
    );
}
