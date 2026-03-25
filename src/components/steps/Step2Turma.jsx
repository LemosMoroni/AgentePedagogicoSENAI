import { Users, FileUp, FileCheck, X } from 'lucide-react'
import { UC_MAP, CURSO_GROUPS, CURSO_LABELS } from '../../data/constants.js'
import clsx from 'clsx'
import AutocompleteInput from '../AutocompleteInput.jsx'

export default function Step2Turma({ data, onChange, onNext, onPrev, memory }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  const setE = (k) => (e) => onChange({ ...data, [k]: e.target.value })

  const handlePdf = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(',')[1]
      onChange({ ...data, planoCursoPdf: { name: file.name, base64 } })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const curso = data.curso || ''
  const hasUC = !!UC_MAP[curso]

  const handleCursoChange = (e) => {
    onChange({ ...data, curso: e.target.value, uc: '', disciplina: '' })
  }

  const handleNext = () => onNext()

  return (
    <div className="animate-slide-up">
      <div className="card">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-senai-blue-lt flex items-center justify-center flex-shrink-0">
            <Users size={18} className="text-senai-blue" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Dados da turma e disciplina
          </div>
        </div>

        <div className="space-y-4">
          {/* Curso */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Curso *</label>
            <select className="field-input" value={curso} onChange={handleCursoChange}>
              <option value="">— Selecione o curso —</option>
              {CURSO_GROUPS.map(g => (
                <optgroup key={g.group} label={g.group}>
                  {g.options.map(o => (
                    <option key={o} value={o}>{CURSO_LABELS[o] || o}</option>
                  ))}
                </optgroup>
              ))}
              <option value="outro">Outro curso (digitar manualmente)</option>
            </select>
          </div>

          {/* UC selector */}
          {hasUC && (
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Unidade Curricular *</label>
              <p className="text-xs text-gray-400">Selecione a UC da aula a ser substituída</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {UC_MAP[curso].ucs.map(uc => (
                  <button
                    key={uc}
                    type="button"
                    onClick={() => set('uc')(uc)}
                    className={clsx(
                      'text-xs px-3 py-1.5 rounded-full border transition-all',
                      data.uc === uc
                        ? 'bg-senai-blue-lt text-senai-blue border-senai-blue/25 font-semibold'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                    )}
                  >
                    {uc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Disciplina manual */}
          {!hasUC && (
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                {curso === 'outro' ? 'Nome do curso' : 'Disciplina / Unidade Curricular *'}
              </label>
              {curso === 'outro' && (
                <input className="field-input mb-2" value={data.cursoCustom || ''} onChange={setE('cursoCustom')} placeholder="Nome completo do curso" />
              )}
              <AutocompleteInput
                value={data.disciplina || ''}
                onChange={setE('disciplina')}
                placeholder="Ex: Instalações Elétricas Prediais"
                suggestions={memory?.getSuggestions('disciplina') ?? []}
              />
            </div>
          )}

          {/* Plano de curso PDF */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Plano de curso <span className="font-normal text-gray-400">(opcional)</span>
            </label>
            {data.planoCursoPdf ? (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                <FileCheck size={16} className="text-green-600 flex-shrink-0" />
                <span className="text-sm text-green-700 flex-1 truncate">{data.planoCursoPdf.name}</span>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, planoCursoPdf: null })}
                  className="text-green-400 hover:text-green-700 flex-shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 hover:border-senai-blue rounded-xl px-3 py-2.5 transition-colors group">
                <FileUp size={16} className="text-gray-400 group-hover:text-senai-blue flex-shrink-0" />
                <span className="text-sm text-gray-400 group-hover:text-senai-blue">Anexar PDF do plano de curso</span>
                <input type="file" accept=".pdf" className="hidden" onChange={handlePdf} />
              </label>
            )}
            <p className="text-xs text-gray-400">O Claude lerá o plano para contextualizar melhor a aula</p>
          </div>

          {/* Módulo / Alunos / Duração */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Módulo</label>
              <select className="field-input" value={data.modulo || '1º módulo'} onChange={setE('modulo')}>
                {['1º módulo', '2º módulo', '3º módulo', '4º módulo'].map(m => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Nº de alunos</label>
              <input
                type="number" min="1" max="60"
                className="field-input"
                value={data.alunos || '20'}
                onChange={setE('alunos')}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Duração</label>
              <select className="field-input" value={data.duracao || '4h'} onChange={setE('duracao')}>
                <option value="4h">4 horas (padrão)</option>
                <option value="2h">2 horas</option>
                <option value="3h">3 horas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button className="btn-ghost" onClick={onPrev}>← Voltar</button>
        <button className="btn-primary" onClick={handleNext}>Próximo →</button>
      </div>
    </div>
  )
}
