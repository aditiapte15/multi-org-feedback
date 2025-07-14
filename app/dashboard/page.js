import Link from "next/link";

export default function DashboardPage() {

  const org ="ABC";
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
    <div className="bg-white p-8 rounded-lg shadow-md items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Welcome to your Dashboard</h1>
      <p className="mb-4 text-lg text-blue-800 text-center">Hello, Org {org}!</p>
      <div className="flex gap-4">
        <Link href={`/feedback/form/${org}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Feedback Form
        </button>
        </Link>
        <Link href={`/feedback/view/${org}`}>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          View Feedback
        </button>
        </Link>
        <Link href="/logout">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
        </Link>
        </div>
      </div>
    </div>
  );
}
