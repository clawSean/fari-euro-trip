import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Euro Summer failed to render", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#fffaf5] px-6 text-center text-slate-950">
          <div className="max-w-md rounded-3xl border border-rose-200 bg-white p-8 shadow-sm">
            <p className="text-5xl" aria-hidden="true">🍦</p>
            <h1 className="mt-5 font-serif text-3xl font-bold">Gelato had a tiny meltdown.</h1>
            <p className="mt-3 leading-7 text-slate-600">The trip plan is safe. Reload this page to bring the baddie itinerary back.</p>
            <button className="mt-6 rounded-full bg-slate-950 px-5 py-3 font-bold text-white" onClick={() => window.location.reload()}>
              Reload Euro Summer
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
