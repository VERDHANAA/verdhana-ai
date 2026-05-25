import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-zinc-50">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 justify-center font-bold text-xl mb-8">
          <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600" />
          Verdhana AI
        </Link>
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-sm text-zinc-600 mb-6">Sign in to your account</p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <Link
              href="/dashboard"
              className="block text-center w-full py-2 rounded-lg bg-black text-white font-medium hover:bg-zinc-800"
            >
              Sign in
            </Link>
          </form>
          <p className="text-sm text-center mt-6 text-zinc-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-violet-700 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
