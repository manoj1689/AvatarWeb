'use client'
import React from 'react';
import { motion } from 'framer-motion';

const PrivacyAndSecurity = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
          Privacy & Security
        </h1>
        
        {/* GDPR Compliance Section */}
        <motion.section 
          className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            GDPR Compliance
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The General Data Protection Regulation (GDPR) sets guidelines for the collection and processing of personal information from individuals who live in the European Union (EU). We are committed to protecting your data privacy and ensuring that your personal information is handled in accordance with GDPR requirements.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Under GDPR, you have the right to access your personal data, rectify inaccuracies, request the deletion of your data, restrict or object to its processing, and obtain a copy of your data in a structured, machine-readable format. If you wish to exercise any of these rights, please contact us at <a href="mailto:info@smartgrader.in" className="text-blue-600 underline">info@smartgrader.in</a>.
          </p>
        </motion.section>

        {/* Collection of Personal Information */}
        <motion.section 
          className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Collection of Personal Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We collect personal information from you when you use our services. This may include information such as your name, email address, phone number, payment details, and any other information you choose to provide. We also collect technical data, including IP addresses, browser types, and usage data, to improve our services and ensure their security.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We may use cookies and similar tracking technologies to collect information about your interactions with our website, such as pages viewed and links clicked. This information helps us understand your preferences and enhance your experience on our site.
          </p>
        </motion.section>

        {/* Use of Personal Information */}
        <motion.section 
          className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
            Use of Personal Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use the personal information we collect to provide, maintain, and improve our services. This includes processing transactions, personalizing your experience, communicating with you, and ensuring the security of our platform. We may also use your information to send you promotional content or marketing communications, but only if you have given us your consent to do so.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We may share your personal information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you. These third parties are required to keep your information confidential and secure, and they may not use it for any other purpose.
          </p>
        </motion.section>

        {/* Individual Rights */}
        <motion.section 
          className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            Individual Rights
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to know what personal information we hold about you and how it is being used. You also have the right to request that we correct any inaccuracies in your data or delete your information entirely. Additionally, you can request that we restrict the processing of your data or object to its processing altogether.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            To exercise any of these rights, please contact our Data Protection Officer (DPO) at <a href="mailto:info@smartgrader.in" className="text-blue-600 underline">info@smartgrader.in</a>. We will respond to your request within the timeframe required by law.
          </p>
        </motion.section>

        {/* CCPA Compliance */}
        <motion.section 
          className="mb-8 p-6 bg-purple-50 border border-purple-200 rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            CCPA Compliance
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The California Consumer Privacy Act (CCPA) provides California residents with specific rights regarding their personal information. These include the right to know what personal data is being collected, the right to request deletion of their data, and the right to opt-out of the sale of their personal information.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We do not sell your personal information to third parties. If you are a California resident and would like to exercise your rights under CCPA, please contact us at <a href="mailto:info@smartgrader.in" className="text-blue-600 underline">info@smartgrader.in</a>.
          </p>
        </motion.section>

        {/* Data Retention */}
        <motion.section 
          className="mb-8 p-6 bg-teal-50 border border-teal-200 rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">
            Data Retention
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Once your data is no longer needed, we will securely delete or anonymize it.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            If you wish to request the deletion of your data, please contact us at <a href="mailto:info@smartgrader.in" className="text-blue-600 underline">info@smartgrader.in</a>. We will process your request in accordance with applicable laws.
          </p>
        </motion.section>

        {/* Policy */}
        <motion.section 
          className="p-6 bg-indigo-50 border border-indigo-200 rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our policies are designed to ensure transparency and accountability in the way we handle your personal information. We regularly review and update our policies to reflect changes in regulations, technologies, and business practices. For the latest updates, please refer to this page periodically.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            If you have any questions or need further clarification about our policies, feel free to contact us at <a href="mailto:info@smartgrader.in" className="text-blue-600 underline">info@smartgrader.in</a>.
          </p>
        </motion.section>

        {/* Contact Information */}
        <motion.section 
          className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns about our privacy and security practices, please reach out to us:
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Email: <a href="mailto:info@smartgrader.in" className="text-blue-600 underline">info@smartgrader.in</a>
          </p>
          <p className="text-gray-700 leading-relaxed mt-1">
          Address:Flat No: 3302, Tower 5, Hero Homes, sector 104, Dwarka Expressway, Gurugram.122001
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;




