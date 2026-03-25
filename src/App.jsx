import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import PanelGerar from './components/panels/PanelGerar.jsx'
import PanelSobre from './components/panels/PanelSobre.jsx'
import { useMemory } from './hooks/useMemory.js'
import { useGenerate } from './hooks/useGenerate.js'

export default function App() {
  const [panel, setPanel] = useState('gerar')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const memory = useMemory()
  const genState = useGenerate()

  const [bloom, setBloom] = useState({ cog: 'Aplicar', psi: 'Realizar', afe: 'Valorizar' })

  return (
    <div className="layout flex min-h-screen">
      <Sidebar
        active={panel}
        onNav={setPanel}
        totalAulas={memory.stats.total}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        <Topbar
          panel={panel}
          bloomSel={bloom}
          totalAulas={memory.stats.total}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl w-full mx-auto">
          {panel === 'gerar' && (
            <PanelGerar
              memory={memory}
              generate={genState.generate}
              genState={genState}
              bloom={bloom}
              onBloomChange={setBloom}
            />
          )}
          {panel === 'sobre' && (
            <PanelSobre />
          )}
        </main>
      </div>
    </div>
  )
}
