'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ViewFormsPage() {
  const { org } = useParams();
  const [forms, setForms] = useState([]);
  const [copiedFormId, setCopiedFormId] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch(`/api/forms/${org}`);
        const data = await res.json();
        setForms(data.forms || []);
      } catch (error) {
        console.error('Failed to load forms:', error);
      }
    };
    fetchForms();
  }, [org]);

  const handleCopy = (formId) => {
    const shareURL = `${window.location.origin}/feedback/fill/${org}/${formId}`;
    navigator.clipboard.writeText(shareURL);
    setCopiedFormId(formId);
    setTimeout(() => setCopiedFormId(null), 2000);
  };

  if (!forms || forms.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No forms found for {org}. Create one first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          📋 Forms for {org}
        </h1>

        {forms.map((form, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              {form.title}
            </h2>
            <p className="text-gray-600 mb-4">{form.description}</p>

            <div className="flex gap-4">
              <button
                onClick={() => alert('TODO: Show responses for ' + form.title)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                View Responses
              </button>

              <button
                onClick={() => handleCopy(form._id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {copiedFormId === form._id ? 'Copied!' : 'Copy Share Link'}
              </button>
            </div>

            <div className="mt-3 text-sm text-gray-500">
              Shareable Link:{" "}
              <code className="break-all">
                {`${window.location.origin}/feedback/fill/${org}/${form._id}`}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
