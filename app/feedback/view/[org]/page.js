'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ViewFormPage() {
  const { org } = useParams();
  const [form, setForm] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const res = await fetch(`/api/forms/${org}`);
        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error('Failed to load form:', error);
      }
    };
    fetchFormData();
  }, [org]);

  const handleCopy = () => {
    const shareURL = `${window.location.origin}/feedback/view/${org}`;
    navigator.clipboard.writeText(shareURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!form) return <div className="text-center mt-10 text-gray-500">Loading form...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-2">{form.title}</h1>
        <p className="text-gray-600 mb-6">{form.description}</p>

        <div className="space-y-4 mb-8">
          {form.questions.map((q, idx) => (
            <div key={idx} className="p-4 border rounded-md bg-gray-50">
              <label className="block text-gray-800 font-medium mb-1">Q{idx + 1}: {q.label || q}</label>
              <input
                type="text"
                disabled
                placeholder="Answer goes here..."
                className="w-full px-3 py-2 border rounded-md bg-white text-gray-500"
              />
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
          <div className="text-sm text-blue-900 overflow-auto">
            🔗 Shareable Link:<br />
            <code>{`${window.location.origin}/feedback/view/${org}`}</code>
          </div>
          <button
            onClick={handleCopy}
            className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
}
