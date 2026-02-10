import { Link } from "react-router";
import Editor from "../assets/Editor.png";

/* Small feature item */
const FeatureItem = ({ icon, text }) => (
  <div className="flex items-start gap-3 text-sm text-gray-700">
    <span className="text-base">{icon}</span>
    <span>{text}</span>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ================= NAVBAR ================= */}
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-4xl font-bold">
            Notely
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/login"
              className="rounded px-3 py-2 hover:bg-gray-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <main className="flex-1 ">
        <section className="mx-auto max-w-5xl px-8 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Write clearly.
            <br />
            Think better.
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            A calm workspace for notes, ideas, and focused writing —
            without distractions.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="rounded-lg bg-black px-6 py-3 text-white text-sm hover:bg-gray-800"
            >
              Create workspace
            </Link>
            <Link
              to="/login"
              className="rounded-lg border px-6 py-3 text-sm hover:bg-gray-200"
            >
              Login
            </Link>
          </div>
        </section>

        {/* ================= EDITOR PREVIEW ================= */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-8 grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <span className="inline-block mb-3 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                Writing experience
              </span>

              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                A calm place to think,
                <br />
                write, and refine
              </h2>

              <p className="mt-5 text-lg text-gray-600">
                Focus on your ideas while formatting, autosave,
                and previews work quietly in the background.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <FeatureItem icon="✍️" text="Distraction-free editor" />
                <FeatureItem icon="📝" text="Rich text formatting" />
                <FeatureItem icon="💾" text="Autosave while typing" />
                <FeatureItem icon="👁️" text="Instant preview mode" />
              </div>
            </div>

            {/* Editor Preview */}
            <div className="relative">
              {/* subtle glow */}
              <div className="absolute -inset-3 rounded-2xl bg-linear-to-br from-gray-200/50 to-transparent blur-lg" />

              <div className="relative rounded-xl border bg-white shadow-xl overflow-hidden">
                {/* window bar */}
                <div className="flex items-center gap-2 px-4 py-2 border-b bg-gray-50">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <img
                  src={Editor}
                  alt="Notes editor preview"
                  className="w-full object-cover max-h-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Open a page. Start writing.
          </h2>

          <p className="mt-3 text-gray-600">
            Everything else stays out of the way.
          </p>

          <div className="mt-8">
            <Link
              to="/register"
              className="inline-block rounded bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              Create your workspace →
            </Link>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-8 py-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
          <p>© {new Date().getFullYear()} NotesApp. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
