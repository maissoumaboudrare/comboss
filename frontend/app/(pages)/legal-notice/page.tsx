"use client";
import { Section } from "@/app/atoms/_components/commons/Section";

const LegalNotice = () => {
  return (
    <Section className="max-w-3xl mx-auto py-8 px-4 text-slate-200">
      <h1 className="text-3xl font-bold mb-6 text-primary">⚖️ Legal Mentions</h1>

      <h2 className="text-2xl font-semibold mb-4">🏢 Company Information:</h2>
      <p className="mb-2">
        <strong>Name and Address:</strong>
      </p>
      <p className="mb-4">
        Maïssoum Aboudrare
        <br />
        Les Pargo, 56130 Férel, France
      </p>

      <p className="mb-2">
        <strong>📧 Contact Information:</strong>
      </p>
      <p className="mb-4">
        Email: me@maissoum.dev
      </p>

      <h2 className="text-2xl font-semibold mb-4">🆔 Tax Identification Number:</h2>
      <p className="mb-4">RCS 888 8888 88 8888</p>

      <h2 className="text-2xl font-semibold mb-4">📰 Publication Director:</h2>
      <p className="mb-4">Aboudrare Maïssoum</p>

      <h2 className="text-2xl font-semibold mb-4">🖥️ Hosting Provider:</h2>
      <p className="mb-4">
        HOSTINGER INTERNATIONAL LTD.
        <br />
        61 Lordou Vironos Street, 6023 Larnaca, Cyprus
      </p>

      <h2 className="text-2xl font-semibold mb-4">📜 Intellectual Property:</h2>
      <p className="mb-4">
        All content on this site, including but not limited to text, graphics,
        logos, icons, and software, is the property of Maïssoum Aboudrare and is
        protected by international copyright laws. Unauthorized use,
        reproduction, or distribution of this content is strictly prohibited.
      </p>

      <h2 className="text-2xl font-semibold mb-4">⚠️ Terms of Use:</h2>
      <p className="mb-4">
        By using this application, users agree to comply with all applicable
        laws and regulations. Users are prohibited from using the site to engage
        in any illegal activities or to post or transmit content that is
        unlawful, harmful, or otherwise objectionable. We reserve the right to
        modify these terms at any time without prior notice.
      </p>

      <h2 className="text-2xl font-semibold mb-4">🔒 Data Protection:</h2>
      <p className="mb-4">
        We are committed to protecting your personal data in accordance with the
        GDPR and CNIL regulations. We collect and process personal data only for
        specified, explicit, and legitimate purposes. Your data will not be
        shared with third parties without your consent. You have the right to
        access, rectify, or delete your personal data at any time.
      </p>

      <p className="mb-4">
        For a detailed Privacy Policy, you can refer to well-documented examples
        like the one provided by the European Union’s General Data Protection
        Regulation (GDPR) guidelines or visit websites of reputable companies
        that provide comprehensive privacy policies. A good reference for
        privacy policies can be found on the website of tech giants like:
        <ul className="list-disc list-inside">
          <li> <a href="https://policies.google.com/privacy" className="underline">
          Google Privacy Policy
        </a></li>
          <li> <a href="https://www.apple.com/legal/privacy/en-ww/" className="underline">
          Apple Privacy Policy
        </a></li>
        </ul>
       These sources offer extensive information on data collection, usage, and
        user rights, which can serve as a valuable guide.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        🚫 Limitation of Liability:
      </h2>
      <p className="mb-4">
        Maïssoum Aboudrare shall not be liable for any direct, indirect,
        incidental, or consequential damages arising out of the use or inability
        to use this site or its content. This includes but is not limited to
        damages for errors, omissions, interruptions, defects, delays, or
        computer viruses.
      </p>

      <h2 className="text-2xl font-semibold mb-4">📜 Governing Law:</h2>
      <p className="mb-4">
        These terms and conditions are governed by and construed in accordance
        with the laws of France. Any disputes arising out of or in connection
        with these terms shall be subject to the exclusive jurisdiction of the
        courts of France.
      </p>
    </Section>
  );
};

export default LegalNotice;