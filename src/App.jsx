import { useEffect, useRef, useState } from 'react'

const email = 'markdulaydanila@gmail.com'

const projects = [
  {
    id: '01',
    code: 'CG-01',
    name: 'CareerGuide',
    label: 'Guidance engine',
    site: 'https://careerguide1.onrender.com/',
    tone: 'cyan',
    image: '/careerguide.png',
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
    tone: 'fuchsia',
    image: '/campusspill.png',
    imageAlt: 'CampusSpill mobile feed screenshot',
    description:
      'An anonymous student network with realtime posting, Supabase-backed interactions, installable PWA behavior, and mobile-ready APK packaging.',
    stack: ['PHP', 'Supabase', 'PWA', 'JavaScript', 'APK'],
    telemetry: ['Realtime feed', 'Anonymous posts', 'Installable'],
  },
]

const stackFaces = ['React', 'Tailwind', 'PHP', 'MySQL', 'Supabase', 'PWA']

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

function GlitchText({ text, className = '' }) {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  )
}

function TechCube() {
  return (
    <div className="cube-scene" aria-hidden="true">
      <div className="tech-cube">
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
      <img src={project.image} alt={project.imageAlt} draggable="false" />
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

export default function App() {
  const glowRef = useCursorGlow()
  const telemetryRef = useMouseTelemetry()
  const progress = useScrollProgress()
  useReveal()

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
          <a href="#profile">Profile</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href={`mailto:${email}`} className="hud-contact">
          Contact
        </a>
      </header>

      <aside className="section-rail" aria-label="Section navigation">
        <a href="#top"><span />Boot</a>
        <a href="#modules"><span />Modules</a>
        <a href="#profile"><span />Profile</a>
        <a href="#contact"><span />Signal</a>
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

        <section id="profile" className="profile-section">
          <div data-reveal className="profile-number">02</div>
          <div data-reveal className="profile-copy">
            <p className="section-kicker">Profile</p>
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

        <section id="contact" className="contact-section">
          <div data-reveal className="contact-shell">
            <p className="section-kicker">Signal</p>
            <h2>
              Open a channel.
              <br />
              Build something unusual.
            </h2>
            <p>
              Available for internships, junior developer roles, freelance builds, and student-facing product work.
            </p>
            <div className="contact-actions">
              <a href={`mailto:${email}`} className="primary-command">
                <MailIcon />
                {email}
              </a>
              <a href="https://github.com/Icode4youu" target="_blank" rel="noreferrer" className="secondary-command">
                <GithubIcon />
                GitHub / Icode4youu
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>MD://2026</span>
        <span>React / Tailwind / Interactive systems</span>
      </footer>
    </div>
  )
}
