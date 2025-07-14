
export default function OrgFeedbackFormPage({ params }) {
  const { org } = params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <h1 className="text-2xl font-bold text-blue-700">Hello {org}! This is your feedback form.</h1>
    </div>
  );
}
