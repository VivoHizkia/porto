import { Component, type ReactNode } from 'react'

type Props = { children: ReactNode; fallback: ReactNode }
type State = { failed: boolean }

/* Keeps a WebGL failure from taking the rest of the page down with it. */
export class SceneBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
