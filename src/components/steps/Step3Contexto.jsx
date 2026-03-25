import { FileText } from 'lucide-react'
import { SingleTag, MultiTag } from '../TagGroup.jsx'
import { RECURSOS_OPTIONS } from '../../data/constants.js'

export default function Step3Contexto({ data, onChange, onNext, onPrev }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  const setE = (k) => (e) => onChange({ ...data, [k]: e.target.value })

  return (
    <div className="animate-slide-up">
      <div className="card">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-senai-blue-lt flex items-center justify-center flex-shrink-0">
            <FileText size={18} className="text-senai-blue" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Contexto da aula
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Familiaridade com a disciplina</label>
            <SingleTag
              options={['Básico', 'Intermediário', 'Avançado']}
              value={data.nivel || 'Avançado'}
              onChange={set('nivel')}
              variant="blue"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">O que a turma já viu até agora?</label>
            <textarea
              className="field-input"
              rows={3}
              value={data.conteudoAnterior || ''}
              onChange={setE('conteudoAnterior')}
              placeholder="Ex: Já estudaram fundamentos de qualidade e Lean. Ainda não viram PDCA, Ishikawa e Diagrama de Pareto..."
            />
            <p className="text-xs text-gray-400">Base para a Zona de Desenvolvimento Proximal (Vygotsky) — quanto mais detalhes, melhor</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Recursos disponíveis na sala</label>
            <MultiTag
              options={RECURSOS_OPTIONS}
              value={data.recursos || ['Projetor / TV', 'Quadro branco']}
              onChange={set('recursos')}
              variant="info"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Observações adicionais{' '}
              <span className="font-normal text-gray-400">(opcional)</span>
            </label>
            <textarea
              className="field-input"
              rows={2}
              value={data.observacoes || ''}
              onChange={setE('observacoes')}
              placeholder="Ex: Turma tem dificuldade em cálculos. Prefiro aula prática. Tem avaliação na semana que vem..."
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="btn-ghost" onClick={onPrev}>← Voltar</button>
        <button className="btn-primary" onClick={onNext}>Próximo →</button>
      </div>
    </div>
  )
}
