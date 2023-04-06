import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

type DebouncedInputProps = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps & Omit<ComponentPropsWithoutRef<'input'>, keyof DebouncedInputProps>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}
