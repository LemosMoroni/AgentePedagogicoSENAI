import { STEP_LABELS } from '../data/constants.js'
import clsx from 'clsx'

export default function StepsBar({ current, onGoTo }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 px-5 py-3 mb-6 shadow-sm overflow-x-auto scrollbar-hide">
      <div className="flex items-center min-w-max">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1
          const state = n === current ? 'active' : n < current ? 'done' : 'future'
          return (
            <div key={n} className="flex items-center">
              {n > 1 && (
                <div className={clsx(
                  'w-8 h-0.5 mx-1.5 rounded-full flex-shrink-0 transition-colors',
                  n <= current ? 'bg-senai-orange' : 'bg-gray-200'
                )} />
              )}
              <button
                onClick={() => n < current && onGoTo(n)}
                disabled={n >= current}
                className={clsx(
                  'flex items-center gap-2 flex-shrink-0',
                  n < current ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <div className={clsx(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                  state === 'active' && 'bg-senai-blue text-white shadow-lg shadow-senai-blue/30',
                  state === 'done'   && 'bg-senai-orange text-white',
                  state === 'future' && 'bg-gray-200 text-gray-400'
                )}>
                  {state === 'done' ? '✓' : n}
                </div>
                <span className={clsx(
                  'text-xs font-semibold whitespace-nowrap hidden sm:block',
                  state === 'active' && 'text-senai-blue',
                  state === 'done'   && 'text-senai-orange',
                  state === 'future' && 'text-gray-300'
                )}>
                  {label}
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
