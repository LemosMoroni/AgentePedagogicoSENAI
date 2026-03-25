import { Zap } from 'lucide-react'
import BloomGrid from '../BloomGrid.jsx'
import { BLOOM_COG, BLOOM_PSI, BLOOM_AFE } from '../../data/constants.js'

export default function Step4Bloom({ bloom, onChange, onNext, onPrev }) {
  const set = (k) => (v) => onChange({ ...bloom, [k]: v })

  return (
    <div className="animate-slide-up">
      <div className="card">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-senai-blue-lt flex items-center justify-center flex-shrink-0">
            <Zap size={18} className="text-senai-blue" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Taxonomia de Bloom — nível da aula
          </div>
        </div>

        <div className="space-y-6">
          {/* Cognitivo */}
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm font-bold text-gray-700">Domínio Cognitivo</span>
              <span className="text-xs text-gray-400">— o que o aluno deve saber</span>
            </div>
            <BloomGrid items={BLOOM_COG} selected={bloom.cog} onSelect={set('cog')} cols={6} />
          </div>

          {/* Psicomotor */}
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm font-bold text-gray-700">Domínio Psicomotor</span>
              <span className="text-xs text-gray-400">— o que o aluno deve executar</span>
            </div>
            <BloomGrid items={BLOOM_PSI} selected={bloom.psi} onSelect={set('psi')} cols={6} />
          </div>

          {/* Afetivo */}
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm font-bold text-gray-700">Domínio Afetivo</span>
              <span className="text-xs text-gray-400">— como o aluno deve se relacionar</span>
            </div>
            <BloomGrid items={BLOOM_AFE} selected={bloom.afe} onSelect={set('afe')} cols={5} />
          </div>
        </div>
      </div>

      {/* Resumo selecionado */}
      <div className="bg-senai-blue-lt border border-senai-blue/15 rounded-2xl px-4 py-3 mt-3 flex flex-wrap gap-3 text-sm">
        <span className="font-semibold text-senai-blue">Selecionado:</span>
        {[
          { label: 'Cognitivo', val: bloom.cog },
          { label: 'Psicomotor', val: bloom.psi },
          { label: 'Afetivo', val: bloom.afe },
        ].map(({ label, val }) => (
          <span key={label} className="text-senai-blue-mid">
            <span className="text-senai-blue/50">{label}:</span> <strong>{val}</strong>
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button className="btn-ghost" onClick={onPrev}>← Voltar</button>
        <button className="btn-primary" onClick={onNext}>Próximo →</button>
      </div>
    </div>
  )
}
