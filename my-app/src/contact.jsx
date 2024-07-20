import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const firebaseEndpoint = 'https://airline-tickets-46241-default-rtdb.firebaseio.com/trips/messages.json';
      const newContact = {
        name: name,
        email: email,
        message: message
      };
      const response = await axios.post(firebaseEndpoint, newContact);

      if (response.status === 200) {
        setSubmitSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmitError('Failed to submit. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact message:', error);
      setSubmitError('Failed to submit. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* About Us Section */}
      <div className="flex-1 bg-cover bg-center text-white py-12 px-4 md:px-8 "
  style={{
    backgroundImage: "url('/imageaboutus.avif')",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>
      <h2 className="text-3xl font-bold text-center mb-8 ">About Us</h2>
        <div className="bg-gray-800 bg-opacity-5 p-6 rounded-lg shadow-lg">
          <p className="mb-4">
          We are travelers and technologists. We work across time zones, hemispheres, cultures and languages. We’re used to breaking things down and building them back up again, until they’re even better. We know travel can be hard, but we also know that it’s worth it, every time. And because we believe travel is a force for good, we take our roles seriously. We’re here to build great products, and facilitate connections between travelers and our partners that truly bring good into the world.
          </p>
          
          
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="flex-1 bg-cover bg-center text-white py-12 px-4 md:px-8"
  style={{
    backgroundImage: "url('/image2.png')",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>
        <div className="bg-gray-900 bg-opacity-5 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">We're listening! Contact us with feedback or suggestions</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-semibold">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-semibold">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-orange-600 hover:bg-orange-900 text-white px-4 py-2 rounded-md w-full">Send Message</button>
          </form>
          {submitting && <p className="text-orange-700 mt-2">Thank you for your patience!</p>}
          {submitError && <p className="text-orange-500 mt-2">{submitError}</p>}
          {submitSuccess && <p className="text-orange-700 mt-2">We will reconnect with you shortly. Thank you</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
