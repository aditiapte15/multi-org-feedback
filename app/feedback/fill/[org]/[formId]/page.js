'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function FillFormPage() {
  const { org, formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForm() {
      try {
        const res = await fetch(`/api/forms/${org}`);
        const data = await res.json();

        if (res.ok) {
          // find the form by ID
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

  const handleChange = (qid, value) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting answers:", answers);
    alert("✅ Response submitted!");
  };

  if (loading) return <p className="text-center mt-6">Loading form...</p>;
  if (!form) return <p className="text-center mt-6">Form not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">{form.title}</h1>
      <p className="text-gray-600 mb-6 text-center text-blue-600">{form.description}</p>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {form.questions.map((q) => (
          <div key={q._id} className="bg-white p-4 rounded shadow text-black">
            <label className="block font-semibold mb-2">{q.label}</label>

            {q.type === "text" && (
              <input
                type="text"
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
