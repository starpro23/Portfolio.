import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (emailInput: string) => {
    if (!emailInput) {
      setEmailError('Email address is required.');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(emailInput)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError) {
      validateEmail(newEmail);
    }
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email) && message) {
      // Form submission logic would go here
      setIsSubmitted(true);
    } else if (!message) {
        alert("Please enter a message before submitting.");
    }
  };

  if (isSubmitted) {
    return (
      <section id="contacts" className="py-20 md:py-32 bg-slate-200 dark:bg-black text-slate-900 dark:text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">Your message has been sent. I'll get back to you shortly.</p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
              setMessage('');
            }}
            className="px-8 py-3 bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
          >
            Send Another Message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="contacts" className="py-20 md:py-32 bg-slate-200 dark:bg-black text-slate-900 dark:text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Send me an Email</h2>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col items-center gap-6" noValidate>
          <div className="w-full">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              required
              className={`w-full px-4 py-3 bg-white dark:bg-gray-800 text-slate-900 dark:text-white border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out focus:scale-105 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-red-500'}`}
              aria-invalid={!!emailError}
              aria-describedby="email-error"
            />
            {emailError && <p id="email-error" className="text-red-500 text-sm mt-2">{emailError}</p>}
          </div>
          <div className="w-full">
            <textarea
              placeholder="Enter Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-slate-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out focus:scale-105 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800 dark:disabled:hover:bg-slate-200 disabled:hover:scale-100 hover:shadow-lg hover:shadow-red-500/50"
            disabled={!email || !message || !!emailError}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;