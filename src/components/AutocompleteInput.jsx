export default function AutocompleteInput({ value, onChange, suggestions = [], className = '', id, ...props }) {
  const listId = `ac-${id || props.placeholder?.slice(0, 10).replace(/\s/g, '') || Math.random()}`

  return (
    <>
      <input
        {...props}
        id={id}
        value={value}
        onChange={onChange}
        list={listId}
        className={`field-input ${className}`}
      />
      <datalist id={listId}>
        {suggestions.map((s, i) => <option key={i} value={s} />)}
      </datalist>
    </>
  )
}
