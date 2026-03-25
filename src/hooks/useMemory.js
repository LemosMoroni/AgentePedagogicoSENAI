import { useState, useCallback } from 'react'

const KEY = 'senai_aulas'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function useMemory() {
  const [records, setRecords] = useState(load)

  const save = useCallback((entry) => {
    setRecords(prev => {
      const next = [...prev, { ...entry, id: Date.now() }]
      const trimmed = next.slice(-100)
      localStorage.setItem(KEY, JSON.stringify(trimmed))
      return trimmed
    })
  }, [])

  const remove = useCallback((id) => {
    setRecords(prev => {
      const next = prev.filter(r => r.id !== id)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const getContext = useCallback((disciplina, curso) => {
    const keyword = disciplina.toLowerCase().split(' ')[0]
    const rel = records
      .filter(r =>
        r.disciplina?.toLowerCase().includes(keyword) ||
        r.curso?.toLowerCase().includes(curso.toLowerCase().split(' ')[0])
      )
      .slice(-3)
    if (!rel.length) return ''
    return '\n\nMEMÓRIA DE AULAS ANTERIORES (garanta progressão, evite repetir estratégias):\n' +
      rel.map(r => `- "${r.disciplina}" — Estratégia: ${r.estrategia}, Bloom: ${r.bloom}, Avaliação: ${r.instrumentos}`).join('\n')
  }, [records])

  // Insights derivados
  const insights = (() => {
    if (records.length < 2) return []
    const list = []
    const bc = {}; records.forEach(r => { const b = r.bloom?.split('/')[0]?.trim(); if (b) bc[b] = (bc[b] || 0) + 1 })
    const topB = Object.entries(bc).sort((a, b) => b[1] - a[1])[0]
    if (topB) list.push(`Bloom cognitivo mais trabalhado: <strong>${topB[0]}</strong> (${topB[1]}x)`)
    const ec = {}; records.forEach(r => { if (r.estrategia) ec[r.estrategia] = (ec[r.estrategia] || 0) + 1 })
    const topE = Object.entries(ec).sort((a, b) => b[1] - a[1])[0]
    if (topE) list.push(`Estratégia MSEP favorita: <strong>${topE[0]}</strong>`)
    const np = {}; records.forEach(r => { if (r.nome) np[r.nome] = (np[r.nome] || 0) + 1 })
    const topN = Object.entries(np).sort((a, b) => b[1] - a[1])[0]
    if (topN?.[1] > 1) list.push(`Professor com mais planos: <strong>${topN[0]}</strong> (${topN[1]} aulas)`)
    if (records.length >= 5) list.push(`<strong>${records.length} interações</strong> — padrões em consolidação`)
    return list
  })()

  const stats = {
    total: records.length,
    cursos: new Set(records.map(r => r.curso?.split('|')[0]?.trim())).size,
    profs: new Set(records.map(r => r.nome)).size,
    bloomTop: (() => {
      const bc = {}; records.forEach(r => { const b = r.bloom?.split('/')[0]?.trim(); if (b) bc[b] = (bc[b] || 0) + 1 })
      return Object.entries(bc).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
    })(),
  }

  const getSuggestions = useCallback((field) => {
    const seen = new Set()
    return records
      .map(r => r[field])
      .filter(v => v && typeof v === 'string' && v.trim())
      .reverse()
      .filter(v => { if (seen.has(v)) return false; seen.add(v); return true })
  }, [records])

  return { records, save, remove, getContext, insights, stats, getSuggestions }
}
