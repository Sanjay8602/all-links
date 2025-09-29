import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to
            <span className="text-indigo-600"> LinkHub Pro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate platform to create and share your links in one stunning, customizable page. 
            Perfect for creators, businesses, and professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors font-semibold text-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/demo"
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors font-semibold text-lg"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for professional link sharing
            </h2>
            <p className="text-lg text-gray-600">
              Powerful, beautiful, and incredibly easy to use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fully Customizable</h3>
              <p className="text-gray-600">
                Choose colors, themes, and layouts that perfectly match your brand
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Ready</h3>
              <p className="text-gray-600">
                Looks perfect on all devices, from phone to desktop
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">
                Lightning-fast loading times with 99.9% uptime
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to elevate your online presence?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who trust LinkHub Pro
          </p>
          <Link
            to="/auth"
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg"
          >
            Create Your Profile Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
