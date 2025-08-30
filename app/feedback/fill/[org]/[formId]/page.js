"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function FillFormPage() {
  const { org, formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch form details
  useEffect(() => {
    async function fetchForm() {
      try {
        const res = await fetch(`/api/forms/${org}`);
        const data = await res.json();

        if (res.ok) {
          const selectedForm = data.forms.find((f) => f._id === formId);
          setForm(selectedForm);
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, [org, formId]);

  // ✅ Track answers
  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  // ✅ Submit answers to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/responses/${org}/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (res.ok) {
        alert("✅ Response submitted!");
        setAnswers({});
      } else {
        const err = await res.json();
        alert("❌ Error: " + err.error);
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      alert("❌ Failed to submit response");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading form...</p>;
  if (!form) return <p className="text-center mt-6">Form not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">
        {form.title}
      </h1>
      <p className="text-gray-600 mb-6 text-center text-blue-600">
        {form.description}
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {form.questions.map((q) => (
          <div key={q._id} className="bg-white p-4 rounded shadow text-black">
            <label className="block font-semibold mb-2">{q.label}</label>

            {q.type === "text" && (
              <input
                type="text"
                value={answers[q._id] || ""}
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => handleChange(q._id, e.target.value)}
                required={q.required}
              />
            )}

            {q.type === "radio" &&
              q.options.map((opt, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={q._id}
                    value={opt}
                    checked={answers[q._id] === opt}
                    onChange={(e) => handleChange(q._id, e.target.value)}
                    required={q.required}
                  />{" "}
                  {opt}
                </label>
              ))}

            {q.type === "checkbox" &&
              q.options.map((opt, i) => (
                <label key={i} className="block">
                  <input
                    type="checkbox"
                    checked={answers[q._id]?.includes(opt) || false}
                    onChange={(e) => {
                      const prev = answers[q._id] || [];
                      if (e.target.checked) {
                        handleChange(q._id, [...prev, opt]);
                      } else {
                        handleChange(q._id, prev.filter((x) => x !== opt));
                      }
                    }}
                  />{" "}
                  {opt}
                </label>
              ))}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Response
        </button>
      </form>
    </div>
  );
}
