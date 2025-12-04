import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Downloads from './pages/Downloads'
import Settings from './pages/Settings'

function App() {
  // TODO: Add auth check here later
  // const isAuthenticated = checkAuth()
  // if (!isAuthenticated) return <SetupWizard />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/downloads" replace />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="settings" element={<Settings />} />
          {/* TODO: Add Analytics and FolderExplorer routes later */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
