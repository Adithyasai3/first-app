import type { Phase } from '../setupStatus'

const statusIcon = { done: '✓', skipped: '–' } as const
const statusLabel = { done: 'Verified', skipped: 'Skipped' } as const

export function PhaseCard({ phase }: { phase: Phase }) {
  const verifiedCount = phase.checks.filter((check) => check.status === 'done').length

  return (
    <article className="phase-card" aria-labelledby={`phase-${phase.id}`}>
      <header className="phase-head">
        <span className="phase-num">0{phase.id}</span>
        <div>
          <p className="phase-nick">{phase.nickname}</p>
          <h2 id={`phase-${phase.id}`}>{phase.name}</h2>
        </div>
        <span className="phase-progress">{verifiedCount}/{phase.checks.length} verified</span>
      </header>

      <ul className="checks">
        {phase.checks.map((check) => (
          <li key={check.label} className={`check check-${check.status}`}>
            <span className="check-icon" aria-label={statusLabel[check.status]}>
              {statusIcon[check.status]}
            </span>
            <span>
              <span className="check-label">{check.label}</span>
              <span className="check-note">{check.note}</span>
            </span>
          </li>
        ))}
      </ul>

      <ul className="tools" aria-label={`${phase.name} tools`}>
        {phase.tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </article>
  )
}
