import React, { useState, useContext } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';

const Contact = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to your backend API
      const response = await fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user?.uid || null,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Success toast using DaisyUI
        const toast = document.createElement('div');
        toast.className = 'toast toast-top toast-end';
        toast.innerHTML = `
          <div class="alert alert-success">
            <span>Message sent successfully! We'll get back to you soon.</span>
          </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);

        // Reset form
        setFormData({
          name: user?.displayName || '',
          email: user?.email || '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Error toast using DaisyUI
      const toast = document.createElement('div');
      toast.className = 'toast toast-top toast-end';
      toast.innerHTML = `
        <div class="alert alert-error">
          <span>Failed to send message. Please try again.</span>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero bg-primary text-primary-content py-16">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Contact Us</h1>
            <p className="py-6 text-lg">
              Have questions or need help? We're here to assist you in finding your perfect roommate.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <p className="text-base-content/70 mb-8 text-lg">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="btn btn-primary btn-circle">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-base-content/70">Online platform<br />Khulna, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="btn btn-primary btn-circle">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-base-content/70">01913336446</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="btn btn-primary btn-circle">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-base-content/70">support@findroommate.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="btn btn-primary btn-circle">
                  <FaClock size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-base-content/70">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Subject *</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="What is this about?"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="textarea textarea-bordered w-full"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-lg">How do I create a listing?</h3>
                <p className="text-base-content/70">Simply register for an account and click on "Add Listing" in your dashboard to create your roommate listing.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-lg">Is the platform free to use?</h3>
                <p className="text-base-content/70">Yes, basic features are completely free. Premium features are available for enhanced visibility.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-lg">How do I contact other users?</h3>
                <p className="text-base-content/70">You can message other users directly through our secure messaging system once you're logged in.</p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-lg">How do I report inappropriate content?</h3>
                <p className="text-base-content/70">Use the report button on any listing or contact us directly. We take all reports seriously.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;