import { SurveyProvider } from './context/SurveyContext'
import Header from './components/layout/Header'
import BuilderLayout from './components/layout/BuilderLayout'

function App() {
  return (
    <SurveyProvider>
      <div className="min-h-screen bg-zinc-100">
        <Header />
        <BuilderLayout />
      </div>
    </SurveyProvider>
  )
}

export default App
