import { useEffect, useRef, useState } from 'react'

const email = 'markdulaydanila@gmail.com'

const projects = [
  {
    id: '01',
    code: 'CG-01',
    name: 'CareerGuide',
    label: 'Guidance engine',
    site: 'https://careerguide1.onrender.com/',
    repo: 'https://github.com/Icode4youu/CareerGuide',
    tone: 'cyan',
    image: 'careerguide.webp',
    imageAlt: 'CareerGuide mobile landing page screenshot',
    description:
      'A career guidance platform that converts student skills assessments into course recommendations, progress tracking, counselor workflows, and portfolio evidence.',
    stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'Android'],
    telemetry: ['6 skill paths', '4 user roles', 'Assessment engine'],
  },
  {
    id: '02',
    code: 'CS-02',
    name: 'CampusSpill',
    label: 'Realtime wall',
    site: 'https://campusspill.onrender.com/',
    repo: 'https://github.com/Icode4youu/CampusSpill',
    tone: 'fuchsia',
    image: 'campusspill.webp',
    imageAlt: 'CampusSpill mobile feed screenshot',
    description:
      'An anonymous student network with realtime posting, Supabase-backed interactions, installable PWA behavior, and mobile-ready APK packaging.',
    stack: ['PHP', 'Supabase', 'PWA', 'JavaScript', 'APK'],
    telemetry: ['Realtime feed', 'Anonymous posts', 'Installable'],
  },
]

const stackFaces = ['React', 'Tailwind', 'PHP', 'MySQL', 'Supabase', 'PWA']

const SECTION_IDS = ['top', 'modules', 'stack', 'profile', 'process', 'contact']

const systemStats = [
  { value: '02', label: 'deployed systems' },
  { value: '06', label: 'skill paths modeled' },
  { value: '04', label: 'user roles wired' },
  { value: '2/2', label: 'mobile-ready builds' },
]

const stackGroups = [
  { id: 'S1', title: 'Languages', items: ['PHP', 'JavaScript', 'SQL'] },
  { id: 'S2', title: 'Backend & data', items: ['MySQL', 'Supabase', 'REST APIs', 'Auth & roles'] },
  { id: 'S3', title: 'Frontend', items: ['React', 'Tailwind CSS', 'Bootstrap', 'Vite'] },
  { id: 'S4', title: 'Delivery', items: ['PWA builds', 'Android packaging', 'Render', 'GitHub Pages'] },
]

const processSteps = [
  { id: '01', title: 'Map the workflow', text: 'I study the users, roles, and real processes a system needs to support before writing code.' },
  { id: '02', title: 'Model the data', text: 'I design the tables, relationships, and permissions so the system has a solid backbone.' },
  { id: '03', title: 'Build the interface', text: 'I turn the workflows into screens with real states — loading, empty, error — not placeholders.' },
  { id: '04', title: 'Ship and package', text: 'I deploy for the web, package for mobile, and keep the system maintainable.' },
]

const capabilities = [
  {
    id: 'A',
    title: 'Product architecture',
    text: 'I structure users, roles, data, and workflows before turning the system into screens.',
  },
  {
    id: 'B',
    title: 'Full-stack execution',
    text: 'I connect frontend interfaces to PHP backends, MySQL schemas, and Supabase features.',
  },
  {
    id: 'C',
    title: 'Mobile-ready delivery',
    text: 'I build PWAs and Android wrappers so web systems can feel closer to native apps.',
  },
]

function useCursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const move = (event) => {
      glowRef.current?.style.setProperty('--x', `${event.clientX}px`)
      glowRef.current?.style.setProperty('--y', `${event.clientY}px`)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return glowRef
}

function useMouseTelemetry() {
  const telemetryRef = useRef(null)

  useEffect(() => {
    const update = (event) => {
      if (telemetryRef.current) {
        telemetryRef.current.textContent = `X:${String(event.clientX).padStart(4, '0')} / Y:${String(
          event.clientY,
        ).padStart(4, '0')}`
      }
    }

    window.addEventListener('mousemove', update)
    return () => window.removeEventListener('mousemove', update)
  }, [])

  return telemetryRef
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}

function useElementProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const element = ref.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const distance = rect.height - window.innerHeight
        const value = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0
        setProgress(value)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref])

  return progress
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function useSectionSpy() {
  const [active, setActive] = useState(SECTION_IDS[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return active
}

function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let animationId = 0
    let particles = []
    let width = 0
    let height = 0
    let ratio = 1

    const resize = () => {
      ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.offsetWidth * ratio
      height = canvas.offsetHeight * ratio
      canvas.width = width
      canvas.height = height

      const count = Math.min(110, Math.max(45, Math.floor((width * height) / (26000 * ratio))))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45 * ratio,
        vy: (Math.random() - 0.5) * 0.45 * ratio,
        r: (Math.random() * 1.7 + 0.6) * ratio,
      }))
    }

    const render = () => {
      context.clearRect(0, 0, width, height)

      particles.forEach((particle, index) => {
        if (!reduced) {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < 0 || particle.x > width) particle.vx *= -1
          if (particle.y < 0 || particle.y > height) particle.vy *= -1
        }

        context.beginPath()
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        context.fillStyle = index % 3 === 0 ? 'rgba(240,171,252,.65)' : 'rgba(103,232,249,.55)'
        context.fill()

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.hypot(dx, dy)
          const maxDistance = 105 * ratio

          if (distance < maxDistance) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(148,163,184,${0.16 * (1 - distance / maxDistance)})`
            context.lineWidth = 1
            context.stroke()
          }
        }

        const mouseDistance = Math.hypot(particle.x - mouse.x * ratio, particle.y - mouse.y * ratio)
        const mouseRadius = 160 * ratio
        if (mouseDistance < mouseRadius) {
          context.beginPath()
          context.moveTo(particle.x, particle.y)
          context.lineTo(mouse.x * ratio, mouse.y * ratio)
          context.strokeStyle = `rgba(34,211,238,${0.24 * (1 - mouseDistance / mouseRadius)})`
          context.stroke()
        }
      })

      if (!reduced) animationId = requestAnimationFrame(render)
    }

    const move = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    resize()
    render()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', move)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}

function handleTilt(event) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  card.style.setProperty('--rx', `${((y / rect.height) - 0.5) * -7}deg`)
  card.style.setProperty('--ry', `${((x / rect.width) - 0.5) * 8}deg`)
  card.style.setProperty('--mx', `${x}px`)
  card.style.setProperty('--my', `${y}px`)
}

function resetTilt(event) {
  event.currentTarget.style.setProperty('--rx', '0deg')
  event.currentTarget.style.setProperty('--ry', '0deg')
}

function ArrowIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GithubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.28 9.28 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function MailIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16v12H4V6Zm1.4 1.2L12 12.3l6.6-5.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownloadIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CopyIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FacebookIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
    </svg>
  )
}

function LinkedinIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A6 6 0 0 1 16 8ZM2 9h4v12H2V9Zm2-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
    </svg>
  )
}

function InstagramIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  )
}

const socials = [
  { name: 'GitHub', url: 'https://github.com/Icode4youu', Icon: GithubIcon },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mark-dulay-danila-841870441/', Icon: LinkedinIcon },
  { name: 'Facebook', url: 'https://www.facebook.com/mrkdlydnl', Icon: FacebookIcon },
  { name: 'Instagram', url: 'https://www.instagram.com/mrkdlydnl4/', Icon: InstagramIcon },
]

function GlitchText({ text, className = '' }) {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  )
}

function TechCube() {
  const cubeRef = useRef(null)
  const motion = useRef({ rx: -18, ry: 0, vx: 0, vy: 0, dragging: false, lastX: 0, lastY: 0 })

  useEffect(() => {
    const cube = cubeRef.current
    const m = motion.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const loop = () => {
      if (!m.dragging) {
        m.ry += m.vy + (reduced ? 0 : 0.22)
        m.rx += m.vx
        m.vx *= 0.94
        m.vy *= 0.94
      }
      cube.style.transform = `rotateX(${m.rx}deg) rotateY(${m.ry}deg)`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [])

  const onPointerDown = (event) => {
    const m = motion.current
    m.dragging = true
    m.vx = 0
    m.vy = 0
    m.lastX = event.clientX
    m.lastY = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event) => {
    const m = motion.current
    if (!m.dragging) return
    const dx = event.clientX - m.lastX
    const dy = event.clientY - m.lastY
    m.ry += dx * 0.5
    m.rx -= dy * 0.5
    m.vx = -dy * 0.5
    m.vy = dx * 0.5
    m.lastX = event.clientX
    m.lastY = event.clientY
  }

  const stopDragging = () => {
    motion.current.dragging = false
  }

  return (
    <div
      className="cube-scene"
      role="img"
      aria-label="Draggable 3D cube showing the tech stack"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <div ref={cubeRef} className="tech-cube">
        {stackFaces.map((face, index) => (
          <div key={face} className={`cube-face cube-face-${index}`}>
            {face}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectScreenshot({ project }) {
  return (
    <a
      href={project.site}
      target="_blank"
      rel="noreferrer"
      className={`screenshot-shell screenshot-${project.tone}`}
      aria-label={`Open ${project.name} live site`}
    >
      <span className="screenshot-top">
        <i />
        Live mobile capture
      </span>
      <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={project.imageAlt} draggable="false" />
      <span className="screenshot-bottom">
        <span>{project.code}</span>
        <em>Open system</em>
      </span>
    </a>
  )
}

function UniversePanel({ project, active }) {
  return (
    <article
      className={`universe-panel module-${project.tone} ${active ? 'is-active' : ''}`}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
    >
      <div className="universe-panel-index">{project.id}</div>
      <div className="universe-panel-content">
        <div className="module-meta">
          <span>{project.code}</span>
          <span>{project.label}</span>
          <span className="live-pill">Live</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="module-stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="module-telemetry">
          {project.telemetry.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="module-actions">
          <a href={project.site} target="_blank" rel="noreferrer" className="launch-link">
            Visit site
            <ArrowIcon />
          </a>
          <a href={project.repo} target="_blank" rel="noreferrer" className="ghost-link">
            <GithubIcon />
            View code
          </a>
          <a href={`mailto:${email}?subject=${encodeURIComponent(`Question about ${project.name}`)}`} className="ghost-link">
            Ask about it
          </a>
        </div>
      </div>
      <ProjectScreenshot project={project} />
    </article>
  )
}

function ModuleUniverse() {
  const universeRef = useRef(null)
  const progress = useElementProgress(universeRef)
  const activeIndex = progress > 0.52 ? 1 : 0

  return (
    <section ref={universeRef} id="modules" className="module-universe">
      <div className="universe-stage">
        <div className="universe-topline" data-reveal>
          <p>01 / deployed modules</p>
          <span>scroll to switch system</span>
        </div>

        <div className="constellation" style={{ '--progress': progress }}>
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="core-node">MD</div>
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.site}
              target="_blank"
              rel="noreferrer"
              className={`orbit-node orbit-${index} module-${project.tone} ${activeIndex === index ? 'is-active' : ''}`}
              style={{
                '--orbit-angle': `${progress * 220 + index * 180}deg`,
                '--orbit-counter': `${-(progress * 220 + index * 180)}deg`,
              }}
            >
              <span>{project.code}</span>
              <strong>{project.name}</strong>
            </a>
          ))}
        </div>

        <div className="universe-panels">
          {projects.map((project, index) => (
            <UniversePanel key={project.name} project={project} active={activeIndex === index} />
          ))}
        </div>

        <div className="universe-footer">
          <div className="universe-labels">
            {projects.map((project, index) => (
              <span key={project.name} className={activeIndex === index ? 'is-active' : ''}>
                {project.code}
              </span>
            ))}
          </div>
          <div className="universe-progress">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </section>
  )
}

const TERMINAL_HELP = 'commands: whoami | projects | stack | socials | email | resume | open cg/cs | ls | ping | date | clear | exit — plus a few secrets…'

const KNOWN_COMMANDS = [
  'help', 'whoami', 'projects', 'stack', 'socials', 'email', 'resume', 'open',
  'ls', 'dir', 'ping', 'date', 'sudo', 'hire', 'matrix', 'hello', 'hi', 'kamusta',
  '42', 'clear', 'exit', 'close',
]

function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j += 1) dp[0][j] = j
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
  }
  return dp[a.length][b.length]
}

const BOOT_LINES = [
  'MD://BIOS v2026.1 — memory check ............ ok',
  'mounting /portfolio ........................ ok',
  'loading modules [careerguide] [campusspill]  ok',
  'establishing signal ........................ 98%',
  'starting interface ......................... ok',
  'welcome, guest.',
]

function BootSequence({ onDone }) {
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const finish = () => {
      sessionStorage.setItem('md-booted', '1')
      setLeaving(true)
      setTimeout(onDone, 320)
    }

    const id = setInterval(() => {
      setCount((prev) => {
        if (prev + 1 >= BOOT_LINES.length) {
          clearInterval(id)
          setTimeout(finish, 450)
        }
        return prev + 1
      })
    }, 230)

    window.addEventListener('keydown', finish)
    window.addEventListener('pointerdown', finish)
    return () => {
      clearInterval(id)
      window.removeEventListener('keydown', finish)
      window.removeEventListener('pointerdown', finish)
    }
  }, [onDone])

  return (
    <div className={`boot-overlay ${leaving ? 'is-leaving' : ''}`}>
      <div className="boot-box">
        {BOOT_LINES.slice(0, count).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <span className="boot-cursor" />
      </div>
      <span className="boot-skip">press any key to skip</span>
    </div>
  )
}

const MATRIX_GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789MD$#<>+='
const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']

function MatrixRain({ onClose }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const ratio = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
    }
    resize()

    const size = 16 * ratio
    const columns = Math.floor(canvas.width / size)
    const rows = Math.ceil(canvas.height / size)
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * rows * 2) - rows)

    const tick = setInterval(() => {
      context.fillStyle = 'rgba(3, 3, 9, 0.1)'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.font = `${size}px monospace`

      drops.forEach((y, index) => {
        const glyph = MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)]
        context.fillStyle = Math.random() > 0.9 ? '#67e8f9' : '#4ade80'
        context.fillText(glyph, index * size, y * size)

        if (y * size > canvas.height && Math.random() > 0.975) {
          drops[index] = 0
        } else {
          drops[index] = y + 1
        }
      })
    }, 55)

    const autoClose = setTimeout(onClose, 12000)
    window.addEventListener('keydown', onClose)
    window.addEventListener('pointerdown', onClose)
    window.addEventListener('resize', resize)

    return () => {
      clearInterval(tick)
      clearTimeout(autoClose)
      window.removeEventListener('keydown', onClose)
      window.removeEventListener('pointerdown', onClose)
      window.removeEventListener('resize', resize)
    }
  }, [onClose])

  return (
    <div className="matrix-overlay" aria-hidden="true">
      <canvas ref={canvasRef} />
      <span className="matrix-caption">matrix mode — press any key to exit</span>
    </div>
  )
}

function TerminalOverlay({ open, onClose, onMatrix }) {
  const [lines, setLines] = useState([
    'MD://SHELL v2026.1 — interactive mode',
    'type "help" to list commands.',
  ])
  const [value, setValue] = useState('')
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines, open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const execute = (raw) => {
    const cmd = raw.trim()
    if (!cmd) return
    const [name, arg] = cmd.toLowerCase().split(/\s+/)
    const out = []

    switch (name) {
      case 'help':
        out.push(TERMINAL_HELP)
        break
      case 'whoami':
        out.push('mark dulay danila — i build student-facing systems.')
        break
      case 'projects':
        out.push(
          'cg  careerguide   guidance engine — careerguide1.onrender.com',
          'cs  campusspill   realtime wall   — campusspill.onrender.com',
          'tip: "open cg" or "open cs" launches the live site',
        )
        break
      case 'stack':
        out.push('php · mysql · supabase · javascript · react · tailwind · pwa · android')
        break
      case 'socials':
        out.push(
          'github     github.com/Icode4youu',
          'linkedin   linkedin.com/in/mark-dulay-danila-841870441',
          'facebook   facebook.com/mrkdlydnl',
          'instagram  instagram.com/mrkdlydnl4',
        )
        break
      case 'email':
        try {
          navigator.clipboard.writeText(email)
          out.push(`${email} — copied to clipboard`)
        } catch {
          out.push(email)
        }
        break
      case 'resume':
        window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank')
        out.push('opening resume.pdf…')
        break
      case 'open':
        if (arg === 'cg' || arg === 'careerguide') {
          window.open(projects[0].site, '_blank')
          out.push('launching careerguide…')
        } else if (arg === 'cs' || arg === 'campusspill') {
          window.open(projects[1].site, '_blank')
          out.push('launching campusspill…')
        } else {
          out.push('usage: open cg | open cs')
        }
        break
      case 'ls':
      case 'dir':
        out.push('modules/  stack/  profile/  process/  signal/')
        break
      case 'ping':
        out.push('pong — signal at 98%')
        break
      case 'date':
        out.push(new Date().toString())
        break
      case 'sudo':
        if (cmd.includes('hire')) {
          out.push('access granted — hiring pipeline initiated.', 'confirm via markdulaydanila@gmail.com')
        } else {
          out.push('sudo: permission denied — this shell is read-only')
        }
        break
      case 'hire':
        out.push('flattered. type "email" to grab my contact.')
        break
      case 'matrix':
        out.push('entering the matrix…')
        setLines((prev) => [...prev, `mark@danila:~$ ${raw}`, ...out])
        setValue('')
        setTimeout(() => {
          onClose()
          onMatrix()
        }, 600)
        return
      case 'hello':
      case 'hi':
      case 'kamusta':
        out.push('hello! type "help" if you get lost.')
        break
      case '42':
        out.push('the answer.')
        break
      case 'clear':
        setLines([])
        setValue('')
        return
      case 'exit':
      case 'close':
        onClose()
        return
      default: {
        const suggestion = KNOWN_COMMANDS.find((known) => editDistance(name, known) <= 2)
        out.push(`command not found: ${name}${suggestion ? ` — did you mean "${suggestion}"?` : ' — type "help"'}`)
      }
    }

    setLines((prev) => [...prev, `mark@danila:~$ ${raw}`, ...out])
    setValue('')
  }

  return (
    <div className="terminal-overlay" role="dialog" aria-modal="true" aria-label="Interactive terminal" onClick={onClose}>
      <div className="terminal-shell" onClick={(event) => event.stopPropagation()}>
        <div className="terminal-bar">
          <span className="term-dot" />
          <span className="term-dot" />
          <span className="term-dot" />
          <span className="terminal-title">md://tty — mark@danila</span>
          <button type="button" onClick={onClose} className="terminal-close">
            esc
          </button>
        </div>
        <div ref={bodyRef} className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {lines.map((line, index) => (
            <p key={index} className={line.startsWith('mark@danila') ? 'term-echo' : ''}>
              {line}
            </p>
          ))}
          <form
            className="terminal-prompt"
            onSubmit={(event) => {
              event.preventDefault()
              execute(value)
            }}
          >
            <span>mark@danila:~$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal command"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const glowRef = useCursorGlow()
  const telemetryRef = useMouseTelemetry()
  const progress = useScrollProgress()
  const activeSection = useSectionSpy()
  const [copied, setCopied] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [matrixMode, setMatrixMode] = useState(false)
  const [booted, setBooted] = useState(() => sessionStorage.getItem('md-booted') === '1')
  useReveal()

  useEffect(() => {
    let index = 0
    const onKey = (event) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key.toLowerCase()
      index = key === KONAMI[index] ? index + 1 : key === KONAMI[0] ? 1 : 0
      if (index === KONAMI.length) {
        setMatrixMode(true)
        index = 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === '`' && document.activeElement?.tagName !== 'INPUT') {
        event.preventDefault()
        setTerminalOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div id="top" className="min-h-screen bg-[#030309] text-slate-300">
      <ParticleField />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <div ref={telemetryRef} className="mouse-telemetry" aria-hidden="true">
        X:0000 / Y:0000
      </div>

      <header className="hud-header">
        <a href="#top" className="hud-brand">
          <span>MD</span>
          <small>portfolio.sys</small>
        </a>
        <nav>
          <a href="#modules">Modules</a>
          <a href="#stack">Stack</a>
          <a href="#profile">Profile</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href={`mailto:${email}`} className="hud-contact">
          Contact
        </a>
      </header>

      <aside className="section-rail" aria-label="Section navigation">
        <a href="#top" className={activeSection === 'top' ? 'is-active' : ''}><span />Boot</a>
        <a href="#modules" className={activeSection === 'modules' ? 'is-active' : ''}><span />Modules</a>
        <a href="#stack" className={activeSection === 'stack' ? 'is-active' : ''}><span />Stack</a>
        <a href="#profile" className={activeSection === 'profile' ? 'is-active' : ''}><span />Profile</a>
        <a href="#process" className={activeSection === 'process' ? 'is-active' : ''}><span />Process</a>
        <a href="#contact" className={activeSection === 'contact' ? 'is-active' : ''}><span />Signal</a>
      </aside>

      <main className="relative z-10">
        <section className="hero-shell">
          <div className="hero-left">
            <div data-reveal className="system-line">
              <span className="status-light" />
              system://mark-danila online
            </div>
            <h1 className="mega-title" aria-label="Mark Danila builds campus systems">
              <GlitchText text="MARK" />
              <GlitchText text="DANILA" className="outline-glitch" />
              <span className="title-tail">builds systems</span>
            </h1>
            <p data-reveal style={{ '--delay': '160ms' }} className="hero-copy">
              I design student-centered platforms with real workflows: assessments, dashboards, realtime feeds, PWAs, and Android-ready builds.
            </p>
            <div data-reveal style={{ '--delay': '260ms' }} className="hero-actions">
              <a href="#modules" className="primary-command">
                Launch modules
                <ArrowIcon />
              </a>
              <a href="https://github.com/Icode4youu" target="_blank" rel="noreferrer" className="secondary-command">
                <GithubIcon />
                Icode4youu
              </a>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className="secondary-command">
                <DownloadIcon />
                Download CV
              </a>
              <button type="button" className="ghost-link" onClick={() => setTerminalOpen(true)}>
                $ open tty
              </button>
            </div>
          </div>

          <div data-reveal style={{ '--delay': '200ms' }} className="hero-panel">
            <div className="panel-chrome">
              <span />
              <span />
              <span />
            </div>
            <div className="panel-title">
              <p>module.status</p>
              <strong>LIVE</strong>
            </div>
            <div className="module-list">
              {projects.map((project) => (
                <a key={project.name} href={project.site} target="_blank" rel="noreferrer" className={`status-row status-${project.tone}`}>
                  <span>{project.code}</span>
                  <strong>{project.name}</strong>
                  <em>Open</em>
                </a>
              ))}
            </div>
            <TechCube />
            <div className="signal-readout">
              <span>signal</span>
              <div><i /></div>
              <strong>98%</strong>
            </div>
          </div>
        </section>

        <section className="signal-strip" aria-label="Development areas">
          <div className="signal-track">
            {['interfaces', 'databases', 'realtime systems', 'student tools', 'pwa builds', 'php backends'].map((item) => (
              <span key={item}>{item}</span>
            ))}
            {['interfaces', 'databases', 'realtime systems', 'student tools', 'pwa builds', 'php backends'].map((item) => (
              <span key={`${item}-copy`} aria-hidden="true">{item}</span>
            ))}
          </div>
        </section>

        <ModuleUniverse />

        <section className="stats-strip" aria-label="System numbers">
          {systemStats.map((stat, index) => (
            <div key={stat.label} data-reveal style={{ '--delay': `${index * 90}ms` }} className="stat-cell">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section id="stack" className="stack-section">
          <div data-reveal className="stack-head">
            <p className="section-kicker">02 / stack matrix</p>
            <h2>The tools behind the systems.</h2>
          </div>
          <div className="stack-grid">
            {stackGroups.map((group, index) => (
              <div key={group.id} data-reveal style={{ '--delay': `${index * 100}ms` }} className="stack-card">
                <span>{group.id}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="profile" className="profile-section">
          <div className="profile-side">
            <div data-reveal className="profile-number">03</div>
            <figure data-reveal style={{ '--delay': '140ms' }} className="profile-photo">
              <img src={`${import.meta.env.BASE_URL}portrait.webp`} alt="Mark Dulay Danila" />
              <figcaption className="photo-tag">operator.img</figcaption>
            </figure>
          </div>
          <div data-reveal className="profile-copy">
            <p className="section-kicker">03 / Profile</p>
            <h2>I build software for the places students actually live.</h2>
            <p>
              I’m Mark Dulay Danila. My work sits between system planning and product polish: mapping the data model, wiring the backend, building the interface, then packaging it for web and mobile use.
            </p>
            <p>
              The projects here are early proof, but they already show the kind of work I want to keep doing: useful systems with memorable interfaces and real deployment paths.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <div key={capability.id} data-reveal style={{ '--delay': `${index * 120}ms` }} className="capability-card">
                <span>{capability.id}</span>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="process-section">
          <p data-reveal className="section-kicker">04 / build process</p>
          <div className="process-track">
            {processSteps.map((step, index) => (
              <div key={step.id} data-reveal style={{ '--delay': `${index * 110}ms` }} className="process-step">
                <span>{step.id}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div data-reveal className="contact-shell">
            <p className="section-kicker">05 / Signal</p>
            <h2>
              Open a channel.
              <br />
              Build something unusual.
            </h2>
            <p>
              Available for internships, junior developer roles, freelance builds, and student-facing product work.
            </p>
            <div className="contact-actions">
              <div className="email-group">
                <a href={`mailto:${email}`} className="primary-command email-command">
                  <MailIcon />
                  {email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`copy-chip ${copied ? 'is-copied' : ''}`}
                  title="Copy email"
                  aria-label="Copy email address"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              <a href="https://github.com/Icode4youu" target="_blank" rel="noreferrer" className="secondary-command">
                <GithubIcon />
                GitHub / Icode4youu
              </a>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className="secondary-command">
                <DownloadIcon />
                Download CV
              </a>
            </div>
            <div className="social-row" aria-label="Social links">
              {socials.map(({ name, url, Icon }) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" className="social-chip">
                  <Icon />
                  {name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>MD://2026</span>
        <nav aria-label="Footer">
          <a href="#modules">Modules</a>
          <a href="#stack">Stack</a>
          <a href="#profile">Profile</a>
          <a href="#contact">Signal</a>
        </nav>
        <span>React / Tailwind / press ` for tty</span>
        <a href="#top" className="footer-top">Back to top</a>
      </footer>

      <TerminalOverlay
        key={String(terminalOpen)}
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onMatrix={() => setMatrixMode(true)}
      />
      {matrixMode && <MatrixRain onClose={() => setMatrixMode(false)} />}
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
    </div>
  )
}
