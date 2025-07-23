'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrgFeedbackForm() {
  const [questions, setQuestions] = useState([]);
  const [orgName, setOrgName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        label: '',
        type: 'text',
        options: [''],
        required: false,
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const org = window.location.pathname.split('/').pop();
    const payload = { title, description, questions };

    await fetch(`/api/forms/${org}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    router.push(`/feedback/view/${org}`); // ✅ redirect after saving
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🛠 Create Your Feedback Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Enter Organization Name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="w-full px-4 py-2 border rounded text-black mb-4"
          required
        />

        <input
          type="text"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded text-black mb-4"
          required
        />

        <textarea
          placeholder="Form Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded text-black mb-4"
          required
        />

        {questions.map((q, index) => (
          <div key={q.id} className="bg-white p-6 rounded shadow-md space-y-4">
            <input
              type="text"
              placeholder="Enter your question"
              value={q.label}
              onChange={(e) => updateQuestion(index, 'label', e.target.value)}
              className="w-full px-4 py-2 border rounded text-black"
              required
            />

            <select
              value={q.type}
              onChange={(e) => updateQuestion(index, 'type', e.target.value)}
              className="w-full px-4 py-2 border rounded text-black"
            >
              <option value="text">Text Input</option>
              <option value="radio">Multiple Choice (Radio)</option>
              <option value="checkbox">Checkbox</option>
            </select>

            {(q.type === 'radio' || q.type === 'checkbox') && (
              <div className="space-y-2">
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(index, optIndex, e.target.value)}
                    placeholder={`Option ${optIndex + 1}`}
                    className="w-full px-4 py-2 border rounded text-black"
                    required
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addOption(index)}
                  className="text-blue-600 hover:underline"
                >
                  + Add Option
                </button>
              </div>
            )}

            <label className="text-black">
              <input
                type="checkbox"
                checked={q.required}
                onChange={(e) => updateQuestion(index, 'required', e.target.checked)}
                className="mr-2"
              />
              Required
            </label>
          </div>
        ))}

        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            ➕ Add Question
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            💾 Save Form
          </button>
        </div>
      </form>
    </div>
  );
}
