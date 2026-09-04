import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      {submitted ? (
        <div className="p-4 bg-green-100 text-green-700 rounded-md">
          Thank you for reaching out! We will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              required
              className="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-black"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-black"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea 
              rows="5"
              required
              className="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-black"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors self-start">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;