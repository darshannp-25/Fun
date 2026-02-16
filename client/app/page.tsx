import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <span className="text-blue-600">
            FullStack Fun!
          </span>
        </h1>

        <p className="mt-3 text-2xl">
          A demonstration of Next.js + Express + MongoDB
        </p>

        <div className="flex mt-6 gap-4">
          <Link
            href="/login"
            className="p-6 mt-6 text-left border w-64 rounded-xl hover:text-blue-600 focus:text-blue-600 border-gray-200"
          >
            <h3 className="text-2xl font-bold">Login &rarr;</h3>
            <p className="mt-4 text-xl">
              Access your dashboard securely.
            </p>
          </Link>

          <Link
            href="/register"
            className="p-6 mt-6 text-left border w-64 rounded-xl hover:text-blue-600 focus:text-blue-600 border-gray-200"
          >
            <h3 className="text-2xl font-bold">Register &rarr;</h3>
            <p className="mt-4 text-xl">
              Create a new account to get started.
            </p>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Next.js
        </a>
      </footer>
    </div>
  );
}
