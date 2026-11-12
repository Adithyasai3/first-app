import { PhaseCard } from './components/PhaseCard'
import { phases } from './setupStatus'
import './App.css'

function App() {
  const checks = phases.flatMap((phase) => phase.checks)
  const done = checks.filter((check) => check.status === 'done').length
  const skipped = checks.length - done

  return (
    <main className="dashboard">
      <header className="hero">
        <p className="eyebrow">Nightclub · Founder Labs</p>
        <h1>Setup status</h1>
        <p className="summary" data-testid="summary">
          <strong>{done}</strong> of {checks.length} checks verified
          {skipped > 0 && <> · {skipped} skipped</>}
        </p>
      </header>

      <section className="grid" aria-label="Setup phases">
        {phases.map((phase) => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </section>
    </main>
  )
}

export default App
