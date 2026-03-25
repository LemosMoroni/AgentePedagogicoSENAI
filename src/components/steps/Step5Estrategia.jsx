import { Layers } from 'lucide-react'
import { SingleTag, MultiTag } from '../TagGroup.jsx'
import { ESTRATEGIAS, ENSINO_OPTIONS, AVALIACAO_OPTIONS, EXTRAS_OPTIONS } from '../../data/constants.js'

export default function Step5Estrategia({ data, onChange, onNext, onPrev }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })

  const estrategia = data.estrategia || 'Situação-Problema'
  const estDesc = ESTRATEGIAS.find(e => e.label === estrategia)?.desc || ''

  return (
    <div className="animate-slide-up">
      <div className="card">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-senai-blue-lt flex items-center justify-center flex-shrink-0">
            <Layers size={18} className="text-senai-blue" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Estratégia pedagógica — MSEP
          </div>
        </div>

        <div className="space-y-5">
          {/* Estratégia desafiadora */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Estratégia de aprendizagem desafiadora</label>
            <SingleTag
              options={ESTRATEGIAS.map(e => e.label)}
              value={estrategia}
              onChange={set('estrategia')}
              variant="orange"
            />
            {estDesc && (
              <div className="info-box">{estDesc}</div>
            )}
          </div>

          {/* Estratégias de ensino */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Estratégias de ensino</label>
            <MultiTag
              options={ENSINO_OPTIONS}
              value={data.ensino || ['Exposição dialogada', 'Atividade prática']}
              onChange={set('ensino')}
              variant="info"
            />
          </div>

          {/* Instrumentos de avaliação */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Instrumentos de avaliação</label>
            <MultiTag
              options={AVALIACAO_OPTIONS}
              value={data.avaliacao || ['Observação / participação', 'Questões orais']}
              onChange={set('avaliacao')}
              variant="info"
            />
          </div>

          {/* Material de apoio */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Material de apoio solicitado</label>
            <MultiTag
              options={EXTRAS_OPTIONS}
              value={data.extras || []}
              onChange={set('extras')}
              variant="info"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="btn-ghost" onClick={onPrev}>← Voltar</button>
        <button className="btn-primary" onClick={onNext}>Revisar e gerar →</button>
      </div>
    </div>
  )
}
