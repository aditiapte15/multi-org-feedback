'use client';
import { useState } from 'react';

export default function SampleForm() {
  const [formData, setFormData] = useState({
    q1: '',
    q2: '',
    q3: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Submit Feedback
        </button>
      </form>
    </main>
  );
}
