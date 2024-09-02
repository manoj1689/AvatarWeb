import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 text-gray-900 p-8 md:p-16 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-6"><strong>Last Updated:</strong> September 2, 2024</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">1. Introduction</h2>
        <p className="mb-6">
          Welcome to SmartGrader! Your privacy is important to us. This Privacy Policy explains how we collect, use, 
          and protect your personal information when you visit our website, use our services, or interact with us in any way.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">2. Information We Collect</h2>
        <p className="mb-4">We may collect and process the following types of personal information:</p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li><strong>Personal Details:</strong> Name, email address, phone number, job title, and company/educational institution.</li>
          <li><strong>Account Information:</strong> Login credentials, user preferences, and usage data.</li>
          <li><strong>Assessment Data:</strong> Responses, scores, and feedback from mock interviews and assessments.</li>
          <li><strong>Technical Information:</strong> IP address, browser type, operating system, and device information.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your experience, analyze site traffic, and personalize content.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">3. How We Use Your Information</h2>
        <p className="mb-4">Your personal information is used to:</p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Provide and improve our services.</li>
          <li>Process your account registration and manage your user account.</li>
          <li>Deliver personalized feedback and track your progress.</li>
          <li>Communicate with you regarding updates, promotions, and support.</li>
          <li>Analyze user activity to improve the SmartGrader platform.</li>
          <li>Ensure the security of our services.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">4. Data Sharing and Disclosure</h2>
        <p className="mb-4">We do not share your personal information with third parties except in the following cases:</p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li><strong>Service Providers:</strong> We may share your data with trusted service providers who assist us in operating our website, conducting our business, or providing services to you.</li>
          <li><strong>Legal Obligations:</strong> We may disclose your information if required by law or in response to legal requests.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">5. Your Rights</h2>
        <p className="mb-4">Under GDPR, CPRA, and other applicable laws, you have the right to:</p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Access the personal information we hold about you.</li>
          <li>Request the correction of inaccurate or incomplete information.</li>
          <li>Request the deletion of your data.</li>
          <li>Object to the processing of your data or request restrictions.</li>
          <li>Request the transfer of your data to another service provider.</li>
          <li>Withdraw your consent at any time, where we rely on your consent to process your information.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">6. Data Security</h2>
        <p className="mb-6">
          We implement appropriate technical and organizational measures to protect your data against unauthorized access, 
          alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is completely secure.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">7. Cookies and Tracking Technologies</h2>
        <p className="mb-6">
          We use cookies and similar tracking technologies to enhance your experience on our platform, analyze usage, and personalize content.
          You can manage your cookie preferences through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">8. Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. 
          We will notify you of any significant changes through our website or via email.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">9. Contact Us</h2>
        <p className="mb-6">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
        <p>Email: <a href="mailto:info@smartgrader.in" className="text-blue-500 hover:underline">info@smartgrader.in</a></p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

