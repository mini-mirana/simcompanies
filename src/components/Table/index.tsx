import { useMemo, useState } from 'react'
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  Table as TableType,
  useReactTable
} from '@tanstack/react-table'
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/solid'
import { DebouncedInput } from '../Input'
import { Button, PageButton } from '../Button'
import { ResourceData } from '@/types/resource'

type TableProps = {
  columns: ColumnDef<ResourceData, number>[]
  data: ResourceData[]
}

export const Table = ({ columns, data }: TableProps) => {
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  return (
    <>
      <div className='sm:flex sm:gap-x-2'>
        <label className='flex gap-x-2 items-baseline'>
          <span className='text-gray-700'>Search: </span>
          <DebouncedInput
            type='text'
            disabled={table.getGlobalFacetedRowModel().rows.length === 0}
            className='rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder={
              table.getGlobalFacetedRowModel().rows.length === 0
                ? ''
                : `${table.getGlobalFacetedRowModel().rows.length} records...`
            }
          />
        </label>

        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) =>
            header.column.columnDef?.meta?.Filter ? (
              <div className='mt-2 sm:mt-0' key={header.id}>
                {flexRender(header.column.columnDef.meta.Filter, header.getContext())}
              </div>
            ) : null
          )
        )}
      </div>

      <div className='mt-4 flex flex-col'>
        <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-x-auto overflow-y-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          scope='col'
                          className='group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: `flex items-center justify-between ${
                                  header.column.getCanSort() && table.getGlobalFacetedRowModel().rows.length !== 0
                                    ? 'cursor-pointer select-none'
                                    : ''
                                }`,
                                onClick:
                                  header.column.getCanSort() && table.getGlobalFacetedRowModel().rows.length !== 0
                                    ? header.column.getToggleSortingHandler()
                                    : () => {}
                              }}>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              <span>
                                {{
                                  asc: (
                                    <svg
                                      className='w-4 h-4 text-gray-400'
                                      stroke='currentColor'
                                      fill='currentColor'
                                      strokeWidth='0'
                                      viewBox='0 0 320 512'
                                      height='1em'
                                      width='1em'
                                      xmlns='http://www.w3.org/2000/svg'>
                                      <path d='M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z'></path>
                                    </svg>
                                  ),
                                  desc: (
                                    <svg
                                      className='w-4 h-4 text-gray-400'
                                      stroke='currentColor'
                                      fill='currentColor'
                                      strokeWidth='0'
                                      viewBox='0 0 320 512'
                                      height='1em'
                                      width='1em'
                                      xmlns='http://www.w3.org/2000/svg'>
                                      <path d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z'></path>
                                    </svg>
                                  )
                                }[header.column.getIsSorted() as string] ?? (
                                  <svg
                                    className='w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100'
                                    stroke='currentColor'
                                    fill='currentColor'
                                    strokeWidth='0'
                                    viewBox='0 0 320 512'
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z'></path>
                                  </svg>
                                )}
                              </span>
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {table.getGlobalFacetedRowModel().rows.length === 0
                    ? Array.from(Array(table.getState().pagination.pageSize).keys()).map((rowNumber) => (
                        <tr key={rowNumber}>
                          {table.getHeaderGroups().map((headerGroup) =>
                            Array.from(Array(headerGroup.headers.length).keys()).map((columnNumber) => (
                              <td key={columnNumber} className='px-6 py-4 whitespace-nowrap' role='cell'>
                                <div className='w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse' />
                              </td>
                            ))
                          )}
                        </tr>
                      ))
                    : table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className='px-6 py-4 whitespace-nowrap' role='cell'>
                              <div className='text-sm text-gray-500'>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='py-3 flex items-center justify-between'>
        <div className='flex-1 flex justify-between sm:hidden'>
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
        <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <div className='flex gap-x-2 items-baseline'>
            <span className='text-sm text-gray-700'>
              Page <span className='font-medium'>{table.getState().pagination.pageIndex + 1}</span> of{' '}
              <span className='font-medium'>{table.getPageCount()}</span>
            </span>
            <label>
              <span className='sr-only'>Items Per Page</span>
              <select
                disabled={table.getGlobalFacetedRowModel().rows.length === 0}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}>
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
              <PageButton
                className='rounded-l-md'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                <span className='sr-only'>First</span>
                <ChevronDoubleLeftIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </PageButton>
              <PageButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </PageButton>
              <PageButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <span className='sr-only'>Next</span>
                <ChevronRightIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </PageButton>
              <PageButton
                className='rounded-r-md'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                <span className='sr-only'>Last</span>
                <ChevronDoubleRightIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

type FilterProps = {
  column: Column<any, unknown>
  header: Header<any, unknown>
  table: TableType<any>
}

export const Filter = ({ column, header, table }: FilterProps) => {
  const uniqueValues = Array.from(column.getFacetedUniqueValues().keys())
  const sortedUniqueValues = useMemo(() => uniqueValues.sort(), [uniqueValues])

  return (
    <label className='flex gap-x-2 items-baseline'>
      <span className='text-gray-700'>{flexRender(header.column.columnDef.header, header.getContext())}: </span>
      <select
        disabled={table.getGlobalFacetedRowModel().rows.length === 0}
        className='rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        name={column.id}
        id={column.id}
        value={(column.getFilterValue() ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value || undefined)}>
        <option value=''>All</option>
        {sortedUniqueValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  )
}
