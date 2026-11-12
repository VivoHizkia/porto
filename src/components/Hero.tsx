import { LAYER_LABELS, LAYER_ORDER, profile, skillGroups, stats } from '../data/profile'

const LAYER_STACK = {
  interface: 'React · Next.js',
  server: 'Node.js · Laravel',
  data: 'MySQL · PostgreSQL',
}

export function Hero() {
  const [firstLine, secondLine] = profile.tagline.split(' to ')

  return (
    <header className="hero" id="top">
      <div className="hero__top">
        <p className="eyebrow">
          {profile.role} / {profile.location}
        </p>
        <p className="hero__status">
          <i aria-hidden="true" />
          Open to full-stack roles
        </p>
      </div>

      <h1 className="hero__name">
        Vivo Hizkia
        <br />
        Imanuel
      </h1>

      <div className="hero__grid">
        <div>
          <p className="hero__tagline">
            {firstLine}
            <br />
            to {secondLine}
          </p>
          <div className="hero__actions">
            <a className="button button--dark" href="#projects">
              View projects <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#contact">
              Contact me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div>
          <p className="hero__intro">{profile.intro}</p>
          <dl className="hero__stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd>
                  {stat.value}
                  {stat.suffix}
                </dd>
                <dt>{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ol className="stack-band" aria-label="The layers I work across">
        {LAYER_ORDER.map((layer, index) => {
          const group = skillGroups.find((item) => item.layer === layer)
          return (
            <li key={layer}>
              <span className="stack-band__index">0{index + 1}</span>
              <div>
                <strong>{LAYER_LABELS[layer]}</strong>
                <p>{group?.summary}</p>
                <small>{LAYER_STACK[layer]}</small>
              </div>
            </li>
          )
        })}
      </ol>
    </header>
  )
}
