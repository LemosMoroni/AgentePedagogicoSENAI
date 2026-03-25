import clsx from 'clsx'

// Single select (radio)
export function SingleTag({ options, value, onChange, variant = 'blue' }) {
  const cls = { blue: 'tag-blue', info: 'tag-info', orange: 'tag-orange' }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={clsx('tag', value === opt && cls[variant])}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

// Multi select (checkbox)
export function MultiTag({ options, value = [], onChange, variant = 'info' }) {
  const cls = { blue: 'tag-blue', info: 'tag-info', orange: 'tag-orange' }
  const toggle = (opt) =>
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt])
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={clsx('tag', value.includes(opt) && cls[variant])}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
