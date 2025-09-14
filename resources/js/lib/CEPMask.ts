export const applyCEPMask = (value: string): string => {
    const cleaned = value.replace(/\D/g, '').slice(0, 8)
    return cleaned
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2-$3')
        .replace(/[-/]$/, '');
            
};