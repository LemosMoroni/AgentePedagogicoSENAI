import { Copy, FileDown, Presentation, RotateCcw, Send, CheckCheck, BookOpen, Users, Clock, Brain, X } from 'lucide-react'
import { useState } from 'react'
import { UC_MAP, CURSO_LABELS } from '../../data/constants.js'
import { ANTHROPIC_API_KEY } from '../../config.js'

// ── Helpers ───────────────────────────────────────────────────────────────────
function getDisciplina(formData) {
  const { curso, uc, disciplina } = formData
  return UC_MAP[curso] ? uc : disciplina
}

function getCursoLabel(formData) {
  const { curso, cursoCustom } = formData
  if (curso === 'outro') return cursoCustom || 'Curso personalizado'
  if (UC_MAP[curso]) return 'Aprendizagem Industrial — Embalagens de Papel | ' + UC_MAP[curso].label
  return CURSO_LABELS[curso] || curso
}

// ── Renderiza o resultado formatado ──────────────────────────────────────────
function ResultBody({ text }) {
  const campos = text.split(/\[CAMPO:\s*/)
  const parts = []

  for (let i = 1; i < campos.length; i++) {
    const idx = campos[i].indexOf(']')
    if (idx === -1) continue
    const titulo = campos[i].substring(0, idx).trim()
    const conteudo = campos[i].substring(idx + 1).trim()
    parts.push({ titulo, conteudo })
  }

  if (!parts.length) {
    return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }} />
  }

  return (
    <div>
      {parts.map(({ titulo, conteudo }) => (
        <div key={titulo}>
          <h3 className="result-section">{titulo}</h3>
          {titulo.toLowerCase().includes('cronograma')
            ? <CronogramaTable text={conteudo} />
            : <TextContent text={conteudo} />
          }
        </div>
      ))}
    </div>
  )
}

function CronogramaTable({ text }) {
  const linhas = text.split('\n').filter(l => l.trim().startsWith('LINHA:'))
  if (!linhas.length) return <TextContent text={text} />
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 mt-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-senai-blue text-white">
            {['Tempo', 'Etapa', 'Atividade', 'Estratégia'].map(h => (
              <th key={h} className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l, i) => {
            const cells = l.replace('LINHA:', '').split('|').map(x => x.trim())
            return (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {cells.map((c, j) => (
                  <td key={j} className="px-3 py-2 text-xs text-gray-700 border-t border-gray-100 align-top">{c}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function TextContent({ text }) {
  const lines = text.split('\n').filter(l => l.trim())
  const elements = []
  let listItems = []

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul key={elements.length} className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-2 pl-2">
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
      listItems = []
    }
  }

  lines.forEach((line, i) => {
    const t = line.trim()
    if (t.startsWith('-') || t.startsWith('•') || /^\d+\./.test(t)) {
      listItems.push(t.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, ''))
    } else {
      flushList()
      elements.push(<p key={i} className="text-sm text-gray-700 mb-1 leading-relaxed">{t}</p>)
    }
  })
  flushList()
  return <div>{elements}</div>
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Step6Gerar({
  formData, bloom, stratData,
  generate, status, dots, loadingMsg, result, promptFallback,
  onPrev, onReset
}) {
  const [copied, setCopied] = useState(false)
  const [roteiro, setRoteiro] = useState('')
  const [loadingRoteiro, setLoadingRoteiro] = useState(false)
  const disciplina = getDisciplina(formData)
  const curso = getCursoLabel(formData)

  const ROTEIRO_SYSTEM = `Você é um especialista em apresentações educacionais. Ao receber um plano de aula, crie um roteiro de slides objetivo e claro para uso em sala de aula.

Para cada slide use exatamente este formato:
SLIDE [N] — [Título]
• [bullet]
• [bullet]
Nota: [dica rápida ao professor]

Regras: máximo 6 bullets por slide, linguagem direta e acessível ao aluno, foque no essencial. Crie quantos slides forem necessários para cobrir o conteúdo.`

  const handleRoteiro = async () => {
    setLoadingRoteiro(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'anthropic-beta': 'prompt-caching-2024-07-31',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 2000,
          system: [{ type: 'text', text: ROTEIRO_SYSTEM, cache_control: { type: 'ephemeral' } }],
          messages: [{ role: 'user', content: `PLANO DE AULA:\n${result}` }],
        }),
      })
      const data = await res.json()
      setRoteiro(data.content?.map(b => b.text || '').join('') || '')
    } finally {
      setLoadingRoteiro(false)
    }
  }

  const handleCopy = () => {
    const text = document.getElementById('result-body-text')?.innerText || ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const handlePDF = () => {
    const nome = formData.nome || 'Professor'
    const content = document.getElementById('result-body-text')?.innerHTML || ''
    const w = window.open('', '_blank')
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Plano — ${disciplina}</title>
    <style>
      body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:2rem;font-size:13px;color:#111;line-height:1.6}
      .cab{display:flex;align-items:center;gap:14px;margin-bottom:2rem;padding-bottom:1rem;border-bottom:3px solid #003087}
      .logo{background:#003087;color:#fff;padding:8px 16px;font-weight:900;font-size:20px;border-radius:5px;letter-spacing:.04em}
      .cab h1{font-size:15px;color:#003087;margin:0;font-weight:700}
      .cab p{font-size:11px;color:#666;margin:3px 0 0}
      .bloom-bar{display:flex;gap:6px;margin:6px 0 16px}
      .bp{background:#003087;color:#fff;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600}
      h3{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:#003087;margin:1.5rem 0 .4rem;padding-bottom:4px;border-bottom:2px solid #E8450A}
      p{margin:0 0 4px}ul{padding-left:1.25rem;margin:0 0 8px}li{margin-bottom:2px}
      table{width:100%;border-collapse:collapse;font-size:12px;table-layout:fixed}
      th{background:#003087;color:#fff;padding:6px 10px;text-align:left;font-size:11px;font-weight:700}
      td{padding:5px 10px;border:1px solid #ddd;vertical-align:top;word-wrap:break-word}
      tr:nth-child(even) td{background:#f8f9fa}
      .rod{margin-top:2rem;padding-top:.75rem;border-top:1px solid #ddd;font-size:11px;color:#999;text-align:center}
    </style></head><body>
    <div class="cab">
      <div class="logo">SENAI</div>
      <div>
        <h1>Plano de Aula — ${disciplina}</h1>
        <p>Prof.: ${nome} · ${new Date().toLocaleDateString('pt-BR')} · MSEP · SGN · Bloom</p>
      </div>
    </div>
    <div class="bloom-bar">
      <span class="bp">Cognitivo: ${bloom.cog}</span>
      <span class="bp">Psicomotor: ${bloom.psi}</span>
      <span class="bp">Afetivo: ${bloom.afe}</span>
    </div>
    ${content}
    <div class="rod">Agente Pedagógico SENAI · MSEP · Bloom · Verificar antes de lançar no SGN</div>
    </body></html>`)
    w.document.close()
    setTimeout(() => w.print(), 600)
  }

  // ── IDLE: review & send ───────────────────────────────────────────────────
  if (status === 'idle') {
    return (
      <div className="animate-slide-up space-y-4">
        {/* Header */}
        <div className="bg-gradient-to-br from-senai-blue-dk via-senai-blue to-senai-blue-mid rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Send size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Tudo pronto para gerar!</h2>
              <p className="text-white/60 text-sm mt-0.5">Revise o resumo e confirme para gerar o plano completo</p>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="card space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Users size={12} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Professor</span>
              </div>
              <div className="text-sm font-semibold text-gray-800 truncate">{formData.nome || <span className="text-gray-400 font-normal">não preenchido</span>}</div>
              <div className="text-xs text-gray-500 truncate">{formData.formacao || '—'}</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <BookOpen size={12} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Disciplina</span>
              </div>
              <div className="text-sm font-semibold text-gray-800 truncate">{disciplina || <span className="text-gray-400 font-normal">não preenchido</span>}</div>
              <div className="text-xs text-gray-500 truncate">{curso || '—'}</div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5">
              <Clock size={11} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">{formData.modulo || '1º módulo'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5">
              <Users size={11} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">{formData.alunos || '20'} alunos</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5">
              <Clock size={11} className="text-gray-500" />
              <span className="text-xs font-medium text-gray-600">{formData.duracao || '4h'}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Brain size={12} className="text-gray-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Bloom</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[['Cognitivo', bloom.cog], ['Psicomotor', bloom.psi], ['Afetivo', bloom.afe]].map(([label, val]) => (
                <span key={label} className="bg-senai-blue-lt text-senai-blue text-xs font-semibold px-3 py-1 rounded-full">
                  {label}: {val}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-1 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-2">MSEP</span>
              <span className="bg-senai-orange-lt text-senai-orange text-xs font-bold px-3 py-1 rounded-full">
                {stratData.estrategia || 'Situação-Problema'}
              </span>
            </div>
            {formData.planoCursoPdf && (
              <span className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-100">
                PDF anexado
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button className="btn-ghost" onClick={onPrev}>← Ajustar</button>
          <button className="btn-orange flex-1 text-base py-3" onClick={generate}>
            <Send size={17} /> Gerar plano de aula
          </button>
        </div>
      </div>
    )
  }

  // ── LOADING ───────────────────────────────────────────────────────────────
  if (status === 'loading') {
    const dotState = ['idle', 'active', 'done']
    return (
      <div className="animate-fade-in">
        <div className="card text-center py-12">
          <div className="w-12 h-12 border-3 border-gray-200 border-t-senai-blue rounded-full animate-spin-slow mx-auto mb-5" />
          <p className="text-base font-semibold text-gray-700 mb-6">{loadingMsg}</p>
          <div className="max-w-xs mx-auto space-y-2 text-left">
            {[
              'Consultando memória de aulas anteriores',
              'Alinhando com Bloom e MSEP',
              'Construindo conteúdo técnico',
              'Montando cronograma e SA',
              'Formatando campos do SGN',
            ].map((msg, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                  dots[i] === 2 ? 'bg-green-500' :
                  dots[i] === 1 ? 'bg-senai-blue animate-pulse-dot' :
                  'bg-gray-200'
                }`} />
                <span className={dots[i] === 2 ? 'text-green-600 font-medium' : dots[i] === 1 ? 'text-senai-blue font-medium' : ''}>{msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── ERROR ─────────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className="animate-slide-up space-y-4">
        <div className="card border-red-100 bg-red-50">
          <h3 className="text-base font-bold text-red-700 mb-1">Erro ao gerar o plano</h3>
          <p className="text-sm text-red-600">{promptFallback || 'Não foi possível conectar à API.'}</p>
        </div>
        <button className="btn-ghost" onClick={onReset}>
          <RotateCcw size={15} /> Tentar novamente
        </button>
      </div>
    )
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  if (status === 'done') {
    return (
      <>
      <div className="animate-slide-up space-y-4">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
          {/* Header */}
          <div className="bg-senai-blue px-5 py-3.5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-sm font-bold text-white">
                Plano: {disciplina} · {stratData.estrategia} · Bloom {bloom.cog}
              </h2>
              <p className="text-white/50 text-xs mt-0.5">SGN · MSEP · Taxonomia de Bloom</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              >
                {copied ? <><CheckCheck size={13} /> Copiado!</> : <><Copy size={13} /> Copiar</>}
              </button>
              <button
                onClick={handlePDF}
                className="flex items-center gap-1.5 bg-white text-senai-blue text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all"
              >
                <FileDown size={13} /> PDF
              </button>
              <button
                onClick={handleRoteiro}
                disabled={loadingRoteiro}
                className="flex items-center gap-1.5 bg-senai-orange text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                <Presentation size={13} /> {loadingRoteiro ? 'Gerando...' : 'Roteiro de slides'}
              </button>
            </div>
          </div>

          {/* Bloom badges */}
          <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100 flex gap-2 flex-wrap">
            {[
              { label: 'Cognitivo', val: bloom.cog },
              { label: 'Psicomotor', val: bloom.psi },
              { label: 'Afetivo', val: bloom.afe },
            ].map(({ label, val }) => (
              <span key={label} className="bg-senai-blue text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {label}: {val}
              </span>
            ))}
          </div>

          {/* Body */}
          <div id="result-body-text" className="px-6 py-5 max-h-[65vh] overflow-y-auto">
            <ResultBody text={result} />
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button className="btn-ghost" onClick={onReset}>
            <RotateCcw size={15} /> Voltar e editar
          </button>
        </div>
      </div>

      {/* Modal roteiro de slides */}
      {roteiro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Presentation size={18} className="text-senai-orange" />
                <h3 className="font-bold text-gray-800">Roteiro de Slides</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(roteiro)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg"
                >
                  <Copy size={13} /> Copiar
                </button>
                <button onClick={() => setRoteiro('')} className="text-gray-400 hover:text-gray-600 p-1">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto px-5 py-4 flex-1">
              {roteiro.split('\n').filter(l => l.trim()).map((line, i) => {
                const isSlide = /^SLIDE\s+\d+/i.test(line)
                const isNota = /^Nota:/i.test(line)
                const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-')
                if (isSlide) return (
                  <div key={i} className="mt-5 first:mt-0 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-senai-orange flex-shrink-0" />
                    <span className="text-sm font-bold text-senai-blue">{line}</span>
                  </div>
                )
                if (isNota) return <p key={i} className="text-xs text-gray-400 italic mt-1 mb-0.5 pl-4">{line}</p>
                if (isBullet) return <p key={i} className="text-sm text-gray-700 pl-4 leading-relaxed">{line}</p>
                return <p key={i} className="text-sm text-gray-600 leading-relaxed">{line}</p>
              })}
            </div>
          </div>
        </div>
      )}
      </>
    )
  }

  return null
}
