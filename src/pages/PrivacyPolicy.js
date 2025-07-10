import React from "react";

const PrivacyPolicy = () => (
  <main className="max-w-2xl mx-auto py-20 px-6 text-gray-900 bg-white rounded-lg shadow-xl mt-16">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="mb-4">Effective Date: July 9, 2025</p>
    <p className="mb-4">At AskAiva, your privacy is our top priority. This Privacy Policy describes how we collect, use, and protect your information when you use our email assistant services.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Email addresses and basic profile information for account setup</li>
      <li>Email content (subject, body, attachments) for processing and delivery</li>
      <li>Usage data (device, browser, access times, interactions)</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Information</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>To send, receive, and organize your email as requested</li>
      <li>To improve our AI assistant’s performance and personalize your experience</li>
      <li>To communicate important updates and service information</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Security</h2>
    <p className="mb-4">We use industry-standard encryption and security practices to protect your data, both in transit and at rest. Access to your data is strictly limited to authorized personnel and systems.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">4. Sharing & Disclosure</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>We do <span className="font-bold">not</span> sell or share your personal information with third parties for marketing.</li>
      <li>We may share data with trusted subprocessors for essential service delivery (e.g., email infrastructure providers), under strict confidentiality agreements.</li>
      <li>We may disclose information if required by law or to protect our rights and users.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Choices</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>You may request deletion of your data or account at any time by contacting support@askaiva.com.</li>
      <li>You may opt out of non-essential communications.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">6. Changes to This Policy</h2>
    <p className="mb-4">We may update this Privacy Policy to reflect changes in our practices. We will notify you of significant changes via email or in-app notification.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">7. Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, contact us at <a href="mailto:support@askaiva.com" className="text-blue-600 underline">support@askaiva.com</a>.</p>
  </main>
);

export default PrivacyPolicy;
