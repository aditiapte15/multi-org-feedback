'use client';
import { useState } from 'react';

export default function SampleForm() {
  const [formData, setFormData] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => {
        const updated = checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value);
        return { ...prev, [name]: updated };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Feedback submitted!');
    console.log(formData);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">📋 Sample Feedback Form</h2>

        <label className="block mb-4 text-black">
          How was the event?
          <textarea name="q1" value={formData.q1} onChange={handleChange} className="w-full mt-2 p-2 border rounded text-black" required />
        </label>

        <label className="block mb-4 text-black">
          What can be improved?
          <textarea name="q2" value={formData.q2} onChange={handleChange} className="w-full mt-2 p-2 border rounded text-black" required />
        </label>

        <label className="block mb-4 text-black">
          Any other comments?
          <textarea name="q3" value={formData.q3} onChange={handleChange} className="w-full mt-2 p-2 border rounded text-black" />
        </label>

        {/* Radio Button Example */}
        <div className="mb-4 text-black">
          <p className="mb-2">Would you attend another event like this?</p>
          <label className="mr-4">
            <input type="radio" name="q4" value="Yes" checked={formData.q4 === 'Yes'} onChange={handleChange} />
            <span className="ml-2">Yes</span>
          </label>
          <label>
            <input type="radio" name="q4" value="No" checked={formData.q4 === 'No'} onChange={handleChange} />
            <span className="ml-2">No</span>
          </label>
        </div>

        {/* Checkbox Example */}
        <div className="mb-6 text-black">
          <p className="mb-2">What did you like? (Select all that apply)</p>
          <label className="block">
            <input type="checkbox" name="q5" value="Speakers" onChange={handleChange} checked={formData.q5.includes('Speakers')} />
            <span className="ml-2">Speakers</span>
          </label>
          <label className="block">
            <input type="checkbox" name="q5" value="Venue" onChange={handleChange} checked={formData.q5.includes('Venue')} />
            <span className="ml-2">Venue</span>
          </label>
          <label className="block">
            <input type="checkbox" name="q5" value="Food" onChange={handleChange} checked={formData.q5.includes('Food')} />
            <span className="ml-2">Food</span>
          </label>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Submit Feedback
        </button>
      </form>
    </main>
  );
}
