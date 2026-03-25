import { User } from 'lucide-react'
import AutocompleteInput from '../AutocompleteInput.jsx'

export default function Step1Professor({ data, onChange, onNext, memory }) {
  const set = (k) => (e) => onChange({ ...data, [k]: e.target.value })
  const s = (field) => memory?.getSuggestions(field) ?? []

  const handleNext = () => onNext()

  return (
    <div className="animate-slide-up">
      <div className="card">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-senai-blue-lt flex items-center justify-center flex-shrink-0">
            <User size={18} className="text-senai-blue" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Perfil do professor substituto
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Nome completo *</label>
              <AutocompleteInput value={data.nome || ''} onChange={set('nome')} placeholder="Ex: João da Silva" suggestions={s('nome')} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Formação principal *</label>
              <AutocompleteInput value={data.formacao || ''} onChange={set('formacao')} placeholder="Ex: Engenheiro Elétrico" suggestions={s('formacao')} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Especialidades</label>
            <AutocompleteInput
              value={data.especialidades || ''}
              onChange={set('especialidades')}
              placeholder="Ex: Automação, CLPs, Eletrotécnica industrial..."
              suggestions={s('especialidades')}
            />
            <p className="text-xs text-gray-400">Separe por vírgula — ajuda o agente a adaptar o conteúdo ao seu perfil</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Experiência profissional</label>
            <textarea
              className="field-input"
              rows={3}
              value={data.experiencia || ''}
              onChange={set('experiencia')}
              placeholder="Ex: 8 anos como eletricista industrial, trabalhei com painéis de controle, automação e CLPs..."
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="btn-primary" onClick={handleNext}>Próximo →</button>
      </div>
    </div>
  )
}
