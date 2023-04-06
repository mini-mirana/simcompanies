import { ColumnMeta } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    Filter: (props: any) => any
  }
}
