import { useState } from 'react'

const KEY = 'senai_api_key'

export function useApiKey() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(KEY) || '')

  const save = (key) => {
    localStorage.setItem(KEY, key)
    setApiKey(key)
  }

  const remove = () => {
    localStorage.removeItem(KEY)
    setApiKey('')
  }

  return { apiKey, save, remove, hasKey: !!apiKey }
}
