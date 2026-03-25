import { ClipboardList, Info, X } from 'lucide-react'
import Logo from './Logo.jsx'
import clsx from 'clsx'

const NAV = [
  { id: 'gerar', label: 'Gerar plano de aula', Icon: ClipboardList },
  { id: 'sobre', label: 'Sobre o agente',       Icon: Info },
]

export default function Sidebar({ active, onNav, mobileOpen, onClose }) {
  return (
    <>
      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={clsx(
        'sidebar',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Logo white />
            <button
              onClick={onClose}
              className="lg:hidden text-white/50 hover:text-white p-1 rounded-lg"
            >
              <X size={18} />
            </button>
          </div>
          <div className="mt-3 text-[10px] text-white/30 uppercase tracking-widest">
            Agente Pedagógico · v1.0
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          <div className="px-2 pb-2 text-[10px] font-bold text-white/25 uppercase tracking-[0.12em]">
            Principal
          </div>
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { onNav(id); onClose() }}
              className={clsx('nav-item', active === id && 'nav-item-active')}
            >
              <Icon size={16} className="flex-shrink-0" />
              <span className="flex-1 text-left">{label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[10px] text-white/25 leading-relaxed"><br />
            SENAI/SC · Lages · 2026
          </p>
        </div>
      </aside>
    </>
  )
}
