import type { CSSProperties } from 'react'
import type { CoverKind } from '../data/projects'

const CANDLES = [38, 52, 44, 60, 48, 66, 58, 74, 62, 80, 70, 64, 82, 76, 90, 84]

function TradingCover() {
  return (
    <div className="cover cover--trading">
      <span className="cover__tag">BTCUSDT</span>
      <div className="candles">
        {CANDLES.map((height, index) => (
          <i
            key={index}
            data-down={index % 3 === 1 || undefined}
            style={{ '--h': `${height}%`, '--i': index } as CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}

function TemplatesCover() {
  return (
    <div className="cover cover--templates">
      {[0, 1, 2].map((index) => (
        <div className="mini-page" key={index} style={{ '--i': index } as CSSProperties}>
          <b />
          <span />
          <i />
          <i />
        </div>
      ))}
    </div>
  )
}

function ChatCover() {
  return (
    <div className="cover cover--chat">
      <p className="bubble bubble--user">Do you offer a free quote?</p>
      <p className="bubble bubble--bot">Yes. Here is the page it comes from.</p>
      <p className="bubble bubble--bot bubble--typing">
        <i />
        <i />
        <i />
      </p>
    </div>
  )
}

const BARS = [46, 72, 58, 88, 64, 96]

function LedgerCover() {
  return (
    <div className="cover cover--ledger">
      <div className="bars">
        {BARS.map((height, index) => (
          <i key={index} style={{ '--h': `${height}%`, '--i': index } as CSSProperties} />
        ))}
      </div>
      <div className="ledger-rows">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

/* Small animated illustrations standing in for screenshots. */
export function Cover({ kind }: { kind: CoverKind }) {
  const covers = {
    trading: <TradingCover />,
    templates: <TemplatesCover />,
    chat: <ChatCover />,
    ledger: <LedgerCover />,
  }
  return <div aria-hidden="true">{covers[kind]}</div>
}
