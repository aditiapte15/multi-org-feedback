'use client';
import { useState } from 'react';

export default function OrgFeedbackForm() {
  const [questions, setQuestions] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Form:', questions);
    alert('Form structure logged in console (mock save)');
    // In real case: POST to DB with org name
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">🛠 Create Your Feedback Form</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
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
