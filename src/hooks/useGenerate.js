import { useState } from 'react'
import { ANTHROPIC_API_KEY } from '../config.js'

const LOADING_MSGS = [
  'Consultando memória de aulas anteriores...',
  'Alinhando com Bloom e MSEP selecionados...',
  'Construindo conteúdo técnico da disciplina...',
  'Montando cronograma e Situação de Aprendizagem...',
  'Formatando campos do SGN...',
]

export function useGenerate() {
  const [status, setStatus] = useState('idle') // idle | loading | done | fallback | error
  const [dots, setDots] = useState([0, 0, 0, 0, 0]) // 0=idle 1=active 2=done
  const [loadingMsg, setLoadingMsg] = useState('')
  const [result, setResult] = useState('')
  const [promptFallback, setPromptFallback] = useState('')

  const animateDots = () => {
    let idx = 0
    setDots([1, 0, 0, 0, 0])
    setLoadingMsg(LOADING_MSGS[0])
    const t = setInterval(() => {
      idx++
      if (idx >= 5) { clearInterval(t); return }
      setDots(prev => prev.map((_d, i) => i < idx ? 2 : i === idx ? 1 : 0))
      setLoadingMsg(LOADING_MSGS[idx])
    }, 900)
    return t
  }

  const generate = async (prompt, pdfData = null, systemPrompt = null) => {
    setStatus('loading')
    setResult('')
    setPromptFallback('')
    const timer = animateDots()

    const content = pdfData
      ? [
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfData.base64 } },
          { type: 'text', text: prompt },
        ]
      : prompt

    const betaFlags = ['prompt-caching-2024-07-31']
    if (pdfData) betaFlags.push('pdfs-2024-09-25')

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'anthropic-beta': betaFlags.join(','),
    }

    const body = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2800,
      messages: [{ role: 'user', content }],
    }
    if (systemPrompt) {
      body.system = [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }]
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })

      clearInterval(timer)
      setDots([2, 2, 2, 2, 2])

      if (res.ok) {
        const data = await res.json()
        const text = data.content?.map(b => b.text || '').join('') || ''
        if (text) { setResult(text); setStatus('done'); return }
      }

      const err = await res.json().catch(() => ({}))
      setPromptFallback(err.error || 'Erro ao gerar plano de aula.')
      setStatus('error')
    } catch (e) {
      clearInterval(timer)
      setDots([2, 2, 2, 2, 2])
      setPromptFallback('Erro de conexão com o servidor.')
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setDots([0, 0, 0, 0, 0])
    setResult('')
    setPromptFallback('')
    setLoadingMsg('')
  }

  return { status, dots, loadingMsg, result, promptFallback, generate, reset }
}
