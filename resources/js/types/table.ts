import { ColumnMeta } from '@tanstack/react-table';

// Extensão do tipo ColumnMeta para incluir displayName
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    displayName?: string;
  }
}
