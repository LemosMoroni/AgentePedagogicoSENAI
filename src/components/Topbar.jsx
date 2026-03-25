import { Menu } from 'lucide-react'

const PAGE_META = {
  gerar:   { title: 'Gerar plano de aula',       sub: 'Metodologia SENAI de Educação Profissional' },
  memoria: { title: 'Memória do agente',          sub: 'Histórico de aulas geradas · Insights adaptativos' },
  sobre:   { title: 'Sobre o Agente Pedagógico',  sub: 'Desenvolvido pelo SENAI/SC · Lages · 2026' },
}

export default function Topbar({ panel, totalAulas, onMenuClick }) {
  const { title, sub } = PAGE_META[panel] || PAGE_META.gerar

  return (
    <header className="topbar">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 flex-shrink-0"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="text-base font-bold text-gray-900 truncate">{title}</h1>
          <p className="text-xs text-gray-400 truncate hidden sm:block">{sub}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
<span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          {totalAulas} aula{totalAulas !== 1 ? 's' : ''}
        </span>
      </div>
    </header>
  )
}
