import { Component, createRef } from "react";

// Keep recovery independent of the router, animations, and other app components.
export class AppErrorBoundary extends Component {
  state = { hasError: false };
  headingRef = createRef();

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Application render error:", error, info);
    this.headingRef.current?.focus();
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#000422] px-5 py-16 text-white">
        <section
          role="alert"
          aria-labelledby="app-error-heading"
          className="w-full max-w-lg rounded-3xl border border-white/15 bg-white/[0.04] p-7 text-center sm:p-12"
        >
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#C4B5FD]">
            A little interruption
          </p>
          <h1
            id="app-error-heading"
            ref={this.headingRef}
            tabIndex={-1}
            className="font-heading text-3xl font-extrabold tracking-tight outline-none sm:text-4xl"
          >
            Something went wrong.
          </h1>
          <p className="mt-5 font-body text-sm leading-relaxed text-slate-300 sm:text-base">
            This page ran into a problem. Reload it to try again, or head back to the home page.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-[#4100F5] px-6 py-3 font-heading text-sm font-semibold transition-colors hover:bg-[#5C1BF6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4B5FD]"
            >
              Reload page
            </button>
            <a
              href="/"
              className="rounded-full border border-white/20 px-6 py-3 font-heading text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4B5FD]"
            >
              Back to home
            </a>
          </div>
          <p className="mt-7 font-body text-xs leading-relaxed text-slate-400">
            Still stuck?{" "}
            <a className="text-[#C4B5FD] underline underline-offset-4 hover:text-white" href="mailto:dcreativs.studio@gmail.com">
              Email the studio
            </a>.
          </p>
        </section>
      </main>
    );
  }
}
