import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4 pt-10">📣 FeedbackGenie</h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-8 pt-5">
        Let your users speak. Collect structured feedback for your product, event, or course — effortlessly.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <Link href="/register">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            📝 Register Your Organization
          </button>
        </Link>

        <Link href="/feedback/form/sample-org">
          <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
            👁 View Sample Form
          </button>
        </Link>
      </div>
    </main>
  </>
  );
}
