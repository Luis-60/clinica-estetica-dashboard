import { useCallback } from 'react';

export function useInitials() {
    return (fullName?: string) => {
        if (!fullName) return '??';
        
        const names = fullName.split(' ');
        const firstName = names[0] || '';
        const lastName = names.length > 1 ? names[names.length - 1] : '';
        
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };
}