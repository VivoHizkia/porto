import { LAYER_LABELS, LAYER_ORDER, type Layer } from '../data/profile'

/* Three stacked bars showing which layers of the stack a project covers. */
export function LayerMarks({ layers }: { layers: Layer[] }) {
  const covered = LAYER_ORDER.filter((layer) => layers.includes(layer))
  const label = `Covers: ${covered.map((layer) => LAYER_LABELS[layer]).join(', ')}`

  return (
    <span className="layer-marks" role="img" aria-label={label} title={label}>
      {LAYER_ORDER.map((layer) => (
        <span
          key={layer}
          className="layer-marks__bar"
          data-layer={layer}
          data-on={layers.includes(layer) || undefined}
        />
      ))}
    </span>
  )
}
