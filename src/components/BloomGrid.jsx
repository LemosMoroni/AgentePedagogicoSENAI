import clsx from 'clsx'

export default function BloomGrid({ items, selected, onSelect, cols = 6 }) {
  return (
    <div className={`grid gap-2 mt-2`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {items.map(item => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelect(item.label)}
          className={clsx(
            'bloom-card text-left',
            selected === item.label && 'bloom-card-active'
          )}
        >
          <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            {item.nivel}
          </div>
          <div className={clsx(
            'text-[13px] font-bold',
            selected === item.label ? 'text-senai-blue' : 'text-gray-800'
          )}>
            {item.label}
          </div>
          <div className={clsx(
            'text-[10px] mt-1 leading-snug hidden sm:block',
            selected === item.label ? 'text-senai-blue-mid' : 'text-gray-400'
          )}>
            {item.verbs}
          </div>
        </button>
      ))}
    </div>
  )
}
