let formDatabase = {}; // In-memory store

export async function GET(request, { params }) {
  const { org } = params;
  const form = formDatabase[org] || {
    title: `Feedback Form for ${org}`,
    description: 'We value your feedback!',
    questions: ['How was your experience?', 'Suggestions?', 'Would you recommend us?']
  };

  return new Response(JSON.stringify(form), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request, { params }) {
  const { org } = params;
  const body = await request.json();

  // Save to mock DB
  formDatabase[org] = body;

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
