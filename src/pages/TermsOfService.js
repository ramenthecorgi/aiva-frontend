import React from "react";

const TermsOfService = () => (
  <main className="max-w-2xl mx-auto py-20 px-6 text-gray-900 bg-white rounded-lg shadow-xl mt-16">
    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
    <p className="mb-4">Effective Date: July 9, 2025</p>
    <p className="mb-4">Welcome to AskAiva! These Terms of Service ("Terms") govern your use of our email assistant services. By using AskAiva, you agree to these Terms.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">1. Use of Service</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>You must be at least 18 years old and provide accurate registration information, including valid sender identity and domain ownership details as required by email service providers such as Mailgun and Postmark.</li>
      <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
      <li>You agree not to misuse the service (e.g., sending spam, violating laws, or interfering with other users). You must comply with all anti-spam, sender verification, and lawful use requirements of Mailgun, Postmark, and other email infrastructure providers.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">2. Email Content & Delivery</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Our service processes, sends, and receives email on your behalf as instructed by you. This includes verifying your sender identity, domain, and compliance with provider requirements (e.g., Mailgun, Postmark).</li>
      <li>You retain ownership of your email content. We claim no rights except those required to provide the service and to comply with anti-spam and lawful use requirements.</li>
      <li>You grant us permission to process your email and sender information for the purpose of delivering, organizing, improving the service, and cooperating with Mailgun, Postmark, and other providers for compliance and verification.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">3. Service Availability</h2>
    <p className="mb-4">We strive for 99.9% uptime but do not guarantee uninterrupted service. We may suspend or terminate your access for violations or maintenance.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">4. Limitation of Liability</h2>
    <p className="mb-4">AskAiva is provided "as is" without warranties. We are not liable for damages arising from use, loss of data, or service interruptions.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">5. Changes to Terms</h2>
    <p className="mb-4">We may update these Terms from time to time. Continued use of the service constitutes acceptance of the revised Terms.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact</h2>
    <p>If you have questions about these Terms, contact us at <a href="mailto:support@askaiva.com" className="text-blue-600 underline">support@askaiva.com</a>.</p>
  </main>
);

export default TermsOfService;
