import { Button } from '@/components/ui/button'

export function SortColumnButton({ nome, column }: { nome: string, column: any }) {
    return (
        <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            variant="ghost"
            className='gap-10 flex'
        >
            {nome + " "}
            {column.getIsSorted() === 'asc' && '↑'}
            {column.getIsSorted() === 'desc' && '↓'}
        </Button>
    );
}