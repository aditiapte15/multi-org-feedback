
export default function ViewFeedbackPage({ params }) {
  const { org } = params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <h1 className="text-2xl font-bold text-green-800">Viewing feedback for {org}.</h1>
    </div>
  );
}
