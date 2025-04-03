import React from "react";

const PrivacyPolicy = () => {
  return (
    // <section className="container mx-auto px-4 py-8">
    //   <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    //   <p className="mb-4">
    //     Your privacy is important to us. At <strong>[Your E-commerce Company]</strong>,
    //     we are committed to protecting your personal information. This Privacy Policy outlines
    //     how we collect, use, disclose, and safeguard your data when you visit our website and use our services.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
    //   <p className="mb-4">
    //     We collect personal information that you voluntarily provide to us when you:
    //   </p>
    //   <ul className="list-disc list-inside mb-4">
    //     <li>Create an account or register on our website.</li>
    //     <li>Place an order, subscribe to our newsletter, or contact customer support.</li>
    //     <li>Participate in promotions or surveys.</li>
    //   </ul>
    //   <p className="mb-4">
    //     The types of information we collect may include your name, email address, phone number,
    //     shipping address, billing information, and payment details.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
    //   <ul className="list-disc list-inside mb-4">
    //     <li>To process and fulfill your orders and manage your account.</li>
    //     <li>To send you order updates, promotional communications, and newsletters.</li>
    //     <li>To improve our website, products, and services through data analysis.</li>
    //     <li>To maintain the security and integrity of our systems and prevent fraud.</li>
    //   </ul>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Cookies and Tracking Technologies</h2>
    //   <p className="mb-4">
    //     We use cookies and similar tracking technologies to enhance your browsing experience,
    //     analyze site traffic, and tailor our marketing efforts. You can control cookie settings
    //     through your browser preferences; however, please note that disabling cookies may affect
    //     your experience on our site.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Sharing Your Information</h2>
    //   <p className="mb-4">
    //     We do not sell or rent your personal data. We may share your information with trusted
    //     third-party service providers who help us operate our website, process payments, and
    //     deliver our services. These partners are obligated to keep your information confidential.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Payment Information</h2>
    //   <p className="mb-4">
    //     Payment information is processed securely through our third-party payment processors.
    //     We do not store your credit card details on our servers. For more details, please refer
    //     to the privacy policies of our payment partners.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
    //   <p className="mb-4">
    //     We implement industry-standard security measures to protect your personal information
    //     against unauthorized access, alteration, disclosure, or destruction. While we strive
    //     to protect your data, no method of transmission over the internet or electronic storage
    //     is 100% secure.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
    //   <p className="mb-4">
    //     You have the right to access, correct, or delete your personal information at any time.
    //     If you would like to exercise these rights or have any questions about your personal data,
    //     please contact our customer support.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
    //   <p className="mb-4">
    //     We may update this Privacy Policy from time to time. Any changes will be posted on this
    //     page, and the revised policy will be effective immediately upon posting. We encourage you
    //     to review this policy periodically.
    //   </p>

    //   <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
    //   <p className="mb-4">
    //     If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
    //     <a
    //       href="mailto:support@yourecommerce.com"
    //       className="text-blue-600 hover:underline"
    //     >
    //       support@yourecommerce.com
    //     </a>
    //     .
    //   </p>
    //   <p>
    //     Thank you for trusting <strong>[Your E-commerce Company]</strong> with your personal information.
    //   </p>
    // </section>
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
    <nav className="lg:w-1/4 lg:sticky lg:top-28 h-fit">
        <ul className="space-y-2 lg:block hidden">
            <li><a href="#introduction" className="block p-3 rounded-sm hover:bg-gray-100 transition-colors">Introduction</a></li>
            <li><a href="#collection" className="block p-3 rounded-sm hover:bg-gray-100 transition-colors">Information Collection</a></li>
            <li><a href="#usage" className="block p-3 rounded-sm hover:bg-gray-100 transition-colors">Information Usage</a></li>
            <li><a href="#sharing" className="block p-3 rounded-sm hover:bg-gray-100 transition-colors">Information Sharing</a></li>
            <li><a href="#security" className="block p-3 rounded-sm hover:bg-gray-100 transition-colors">Security Measures</a></li>
        </ul>
    </nav>

    <main className="lg:w-3/4 space-y-12">
        <section id="introduction" className="space-y-4">
            <h2 className="text-2xl font-heading">Introduction</h2>
            <p className="text-body leading-relaxed">We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
        </section>

        <section id="collection" className="space-y-4">
            <h2 className="text-2xl font-heading">Information Collection</h2>
            <p className="text-body leading-relaxed">We collect several different types of information for various purposes to provide and improve our service to you. The types of data we may collect include:</p>
            <ul className="list-disc list-inside space-y-2 text-body">
                <li>Personal identification information</li>
                <li>Contact information</li>
                <li>Usage data</li>
                <li>Technical data</li>
            </ul>
        </section>

        <section id="usage" className="space-y-4">
            <h2 className="text-2xl font-heading">Information Usage</h2>
            <p className="text-body leading-relaxed">We use the collected data for various purposes including:</p>
            <ul className="list-disc list-inside space-y-2 text-body">
                <li>Providing and maintaining our service</li>
                <li>Notifying you about changes to our service</li>
                <li>Providing customer support</li>
                <li>Monitoring the usage of our service</li>
            </ul>
        </section>

        <section id="sharing" className="space-y-4">
            <h2 className="text-2xl font-heading">Information Sharing</h2>
            <p className="text-body leading-relaxed">We may share your personal information in the following situations:</p>
            <ul className="list-disc list-inside space-y-2 text-body">
                <li>With service providers</li>
                <li>For business transfers</li>
                <li>With your consent</li>
                <li>With law enforcement</li>
            </ul>
        </section>

        <section id="security" className="space-y-4">
            <h2 className="text-2xl font-heading">Security Measures</h2>
            <p className="text-body leading-relaxed">The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
        </section>
    </main>
</div>
  );
};

export default PrivacyPolicy;
