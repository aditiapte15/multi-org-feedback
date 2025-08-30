"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ViewFormsPage() {
  const { org } = useParams();
  const [forms, setForms] = useState([]);
  const [copiedFormId, setCopiedFormId] = useState(null);
  const [responses, setResponses] = useState({});
  const [loadingResponses, setLoadingResponses] = useState({});

  // ✅ Load forms for the org
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch(`/api/forms/${org}`);
        const data = await res.json();
        setForms(data.forms || []);
      } catch (error) {
        console.error("Failed to load forms:", error);
      }
    };
    fetchForms();
  }, [org]);

  // ✅ Copy share link
  const handleCopy = (formId) => {
    const shareURL = `${window.location.origin}/feedback/fill/${org}/${formId}`;
    navigator.clipboard.writeText(shareURL);
    setCopiedFormId(formId);
    setTimeout(() => setCopiedFormId(null), 2000);
  };

  // ✅ Fetch responses when clicking "View Responses"
  const handleViewResponses = async (formId) => {
    if (responses[formId]) {
      // toggle off if already open
      setResponses((prev) => {
        const updated = { ...prev };
        delete updated[formId];
        return updated;
      });
      return;
    }

    setLoadingResponses((prev) => ({ ...prev, [formId]: true }));

    try {
      const res = await fetch(`/api/responses/${org}/${formId}`);
      const data = await res.json();

      if (res.ok) {
        setResponses((prev) => ({ ...prev, [formId]: data }));
      } else {
        console.error("Error fetching responses:", data.error);
        setResponses((prev) => ({ ...prev, [formId]: [] }));
      }
    } catch (error) {
      console.error("Failed to load responses:", error);
      setResponses((prev) => ({ ...prev, [formId]: [] }));
    } finally {
      setLoadingResponses((prev) => ({ ...prev, [formId]: false }));
    }
  };

  if (!forms || forms.length === 0) {
    return (
      <div className="text-center mt-10 text-black-500">
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

        {forms.map((form) => (
          <div key={form._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              {form.title}
            </h2>
            <p className="text-gray-600 mb-4">{form.description}</p>

            <div className="flex gap-4">
              <button
                onClick={() => handleViewResponses(form._id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {responses[form._id] ? "Hide Responses" : "View Responses"}
              </button>

              <button
                onClick={() => handleCopy(form._id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {copiedFormId === form._id ? "Copied!" : "Copy Share Link"}
              </button>
            </div>

            <div className="mt-3 text-sm text-gray-500">
              Shareable Link:{" "}
              <code className="break-all">
                {`${window.location.origin}/feedback/fill/${org}/${form._id}`}
              </code>
            </div>

            {/* ✅ Show responses if loaded */}
            {loadingResponses[form._id] && (
              <p className="mt-4 text-gray-500">Loading responses...</p>
            )}

            {responses[form._id] && (
              <div className="mt-4 space-y-3 text-black">
                <h3 className="text-lg font-semibold">Responses:</h3>
                {responses[form._id].length === 0 ? (
                  <p className="text-black-500">No responses yet.</p>
                ) : (
                  responses[form._id].map((r, idx) => (
                    <div
                      key={idx}
                      className="border p-3 rounded bg-gray-50 text-sm"
                    >
                      {Object.entries(r.answers).map(([q, ans], i) => (
                        <p key={i}>
                          <strong>{q}:</strong>{" "}
                          {Array.isArray(ans) ? ans.join(", ") : ans}
                        </p>
                      ))}
                      <p className="text-xs text-black-300 mt-1">
                        Submitted on:{" "}
                        {new Date(r.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
