import React from 'react';

const Contact = () => {
  return (
    <section className="bg-[linear-gradient(180deg,_#fde1ff,_#e1ffea22_60%)] w-full py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Info and Map */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">We'd Love to Hear From You</h2>
          <p className="text-gray-700 mb-4">
            At <span className="font-semibold text-pink-600">Chama Clothes</span>, we’re committed to providing excellent customer service. If you have any questions, feedback, or suggestions, don’t hesitate to reach out.
          </p>
          <p className="text-gray-700 mb-6">Feel free to send us a message using the form, or drop by our location!</p>

          <iframe
            title="store-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.04018911184!2d79.78616486632636!3d6.92707883265065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25940d5b2ea6d%3A0xa4d4867b1fd4d5d0!2sColombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            className="rounded shadow-md"
          ></iframe>
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Drop Us A Line</h2>
          <p className="text-gray-700 mb-6">
            We're happy to answer any questions or provide help with your order. Just send us a message!
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email<span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Message<span className="text-red-500">*</span></label>
              <textarea
                required
                className="w-full border border-gray-300 px-4 py-2 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-4 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
