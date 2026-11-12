export type CheckStatus = 'done' | 'skipped'

export interface Check {
  label: string
  status: CheckStatus
  note: string
}

export interface Phase {
  id: number
  name: string
  nickname: string
  tools: string[]
  checks: Check[]
}

// Verified on this Windows 11 machine, 2026-11-12.
export const phases: Phase[] = [
  {
    id: 1,
    name: 'OS & workspace',
    nickname: 'The Space',
    tools: ['winget 1.29', 'Windows Terminal 1.24', 'VS Code 1.145', 'Git 2.48', 'GitHub CLI 2.103', 'ripgrep', 'jq', 'Gitleaks'],
    checks: [
      { label: 'Package manager works', status: 'done', note: 'winget v1.29.380' },
      { label: 'Split terminal and editor open', status: 'done', note: '4-pane Windows Terminal + VS Code' },
      { label: 'Git works, GitHub CLI signed in', status: 'done', note: 'gh signed in (keyring)' },
    ],
  },
  {
    id: 2,
    name: 'Runtimes & packages',
    nickname: 'The Engine',
    tools: ['fnm 1.39', 'Node 26.13 LTS', 'npm 11.20', 'uv 0.13', 'Python 3.13', 'Docker 29.6'],
    checks: [
      { label: 'Node, npm, fnm, uv verified', status: 'done', note: 'fnm loads from the PowerShell profile' },
      { label: 'PHP and Composer', status: 'skipped', note: 'Only needed for Laravel' },
      { label: 'Docker hello-world succeeds', status: 'done', note: 'Started with start-docker.ps1' },
    ],
  },
  {
    id: 3,
    name: 'AI coding agents',
    nickname: 'The Builders',
    tools: ['Claude Code 2.1', 'Codex 0.167', 'Antigravity 1.5', 'OpenCode 2.2'],
    checks: [
      { label: 'Agents launch and sign in', status: 'done', note: 'Claude, Codex, Antigravity all answered a prompt' },
    ],
  },
  {
    id: 4,
    name: 'Local AI',
    nickname: 'The Intelligence',
    tools: ['Ollama 0.40', 'qwen3.5:4b'],
    checks: [
      { label: 'Ollama answers a local prompt', status: 'done', note: 'About 9 tokens/s on CPU, localhost only' },
    ],
  },
  {
    id: 5,
    name: 'Quality & data',
    nickname: 'The Safety Net',
    tools: ['Playwright 1.65', 'Bruno 4.3', 'DBeaver Community', 'Postgres 18'],
    checks: [
      { label: 'Bruno and DBeaver open', status: 'done', note: 'Request and table checked with real data' },
      { label: 'Vite React app loads', status: 'done', note: 'This dashboard' },
      { label: 'Playwright test passes', status: 'done', note: 'Desktop and Pixel 7 mobile' },
    ],
  },
  {
    id: 6,
    name: 'Ship & extend',
    nickname: 'The Outcome',
    tools: ['GitHub Actions', 'Cloudflare Tunnel', 'Context7 MCP'],
    checks: [
      { label: 'On GitHub, CI passes', status: 'done', note: 'Lint, build, Playwright on every push' },
      { label: 'Safe demo link (optional)', status: 'done', note: 'Temporary quick tunnel, then closed' },
    ],
  },
]
