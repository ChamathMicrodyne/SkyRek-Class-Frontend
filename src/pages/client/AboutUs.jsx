import React from 'react';

const AboutUs = () => {
  return (
    <section className=" w-full bg-gradient-to-b from-pink-100 to-white py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          <span className="font-semibold text-pink-600">Chama Clothes</span> is a modern clothing brand crafted to bring you stylish, high-quality outfits that blend comfort and confidence. 
          We believe fashion should be expressive, effortless, and accessible — and we’re here to make that happen.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          From casual fits to standout styles, our collections are designed to fit every mood and moment. Shop online with ease and enjoy flexible payment options including credit/debit cards, 
          bank transfers, and cash on delivery (COD). We deliver straight to your doorstep, fast and reliable.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Prefer to shop in person? Visit our flagship store and browse in a relaxed, welcoming space.
        </p>

        <div className="bg-white shadow-md rounded-lg p-6 text-left mt-8 space-y-3">
          <h3 className="text-xl font-semibold text-gray-800">Visit Us</h3>
          <p className="text-gray-700">
            📍 <strong>Location:</strong>{' '}
            <a
              href="#"
              className="text-pink-600 hover:underline"
              rel="noopener noreferrer"
            >
              No.17, Colombo 03
            </a>
          </p>
          <p className="text-gray-700">
            🕒 <strong>Opening Hours:</strong> Everyday 9:30 AM – 8:00 PM
          </p>
          <p className="text-gray-500 text-sm">
            *Closed dates will be announced on our Facebook page.
          </p>
        </div>

        <p className="text-gray-800 text-lg mt-10">
          We’re here to inspire your style — one outfit at a time.
        </p>
        <p className="text-pink-600 font-semibold text-xl mt-2">Chama Clothes — wear your vibe.</p>
      </div>
    </section>
  );
};

export default AboutUs;
