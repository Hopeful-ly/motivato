"use client";
import { useState } from "react";

export default function TermsAndConditions() {
  const [clickedTimes, setClickedTimes] = useState(0);
  return (
    <div className="select-none">
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            setClickedTimes((prev) => (prev > 10 ? 100 : prev + 1));
          }}
        >
          I was
          <span
            className="overflow-visible inline-block"
            style={{
              opacity: clickedTimes * 0.05,
              width: Math.min(20, clickedTimes * 2),
            }}
          >
            &apos;nt
          </span>{" "}
          joking
        </div>
      </div>
      <div style={{ opacity: clickedTimes * 0.01 }}>
        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-10">
            Terms of Service & Privacy Policy
          </h1>

          <section className="mb-10">
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Terms of Service
            </h2>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              1. Acceptance of Terms
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              By accessing or using Motivato, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do
              not use our service.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              2. Description of Service
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Motivato is a platform designed to help improve users&apos; mood
              through motivational content, including but not limited to
              motivational quotes, poems, and speeches tailored to users&apos;
              emotional states.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              3. User Accounts
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              To access certain features of our service, you must create an
              account using Google or Discord authentication. You are
              responsible for maintaining the confidentiality of your account
              information and for all activities that occur under your account.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              4. User Content
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              You retain ownership of any content you submit to our service. By
              submitting content, you grant us a worldwide, non-exclusive,
              royalty-free license to use, reproduce, modify, and display such
              content in connection with providing and improving our service.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              5. Prohibited Conduct
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              You agree not to use our service for any unlawful purpose or in
              any way that could damage, disable, or impair the service.
              Prohibited activities include but are not limited to: harassment,
              impersonation, and distribution of malware.
            </p>

            <blockquote className="mt-6 border-l-2 pl-6 italic">
              &quot;Motivato is designed to uplift and inspire. Any use of our
              platform that undermines this mission or harms others will not be
              tolerated.&quot;
            </blockquote>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              6. Termination
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We reserve the right to terminate or suspend your account and
              access to our service at our sole discretion, without notice, for
              conduct that we believe violates these Terms of Service or is
              harmful to other users, us, or third parties.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              7. Disclaimer of Warranties
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Our service is provided &quot;as is&quot; without warranties of
              any kind, either express or implied. We do not warrant that the
              service will be uninterrupted or error-free.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              8. Limitation of Liability
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              In no event shall Motivato be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of or inability to use the service.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              9. Changes to Terms
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We reserve the right to modify these Terms of Service at any time.
              We will provide notice of significant changes by posting the new
              Terms on our website. Your continued use of the service after such
              changes constitutes your acceptance of the new Terms.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              10. Governing Law
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which Motivato operates, without
              regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
              Privacy Policy
            </h2>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              1. Information We Collect
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We collect the following types of information:
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>
                Account information: When you sign up using Google or Discord,
                we collect information such as your name, email address, and
                profile picture.
              </li>
              <li>
                User-provided content: Information you provide when using our
                service, including your mood states and preferences.
              </li>
              <li>
                Usage data: Information about how you interact with our service,
                including the features you use and the time spent on the
                platform.
              </li>
            </ul>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              2. How We Use Your Information
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We use the collected information for the following purposes:
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>To provide and maintain our service</li>
              <li>
                To personalize your experience and deliver tailored motivational
                content
              </li>
              <li>
                To improve our service based on user feedback and usage patterns
              </li>
              <li>
                To communicate with you about service updates or respond to
                inquiries
              </li>
              <li>To ensure the security of our service and prevent abuse</li>
            </ul>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              3. Data Storage and Security
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We store your information in secure databases and implement
              appropriate technical and organizational measures to protect your
              data against unauthorized access, alteration, or destruction.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              4. Data Sharing and Disclosure
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We do not sell your personal information to third parties. We may
              share your information in the following circumstances:
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>
                With service providers who assist us in operating our platform
              </li>
              <li>When required by law or to protect our rights</li>
              <li>
                In the event of a merger, acquisition, or sale of assets, in
                which case the privacy policy would continue to apply to your
                information
              </li>
            </ul>

            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Data Category
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Retention Period
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Account Information
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Until account deletion
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Authentication & Personalization
                    </td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Mood Data
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      24 months
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Content Personalization
                    </td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Usage Data
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      12 months
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Service Improvement
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              5. Your Rights
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>
                The right to access the personal information we hold about you
              </li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>
                The right to restrict or object to processing of your
                information
              </li>
              <li>The right to data portability</li>
            </ul>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              To exercise these rights, please contact us using the information
              provided below.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              6. Cookies and Tracking Technologies
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We use cookies and similar tracking technologies to enhance your
              experience on our platform. You can control cookie settings
              through your browser preferences.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              7. Children&apos;s Privacy
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Our service is not intended for individuals under the age of 13.
              We do not knowingly collect personal information from children
              under 13. If we become aware that we have collected personal
              information from a child under 13, we will take steps to delete
              such information.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              8. Changes to Privacy Policy
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last Updated&quot; date.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              9. Contact Us
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at:
              <br />
              Email:{" "}
              <a
                href="mailto:privacy@everythin.ir"
                className="font-medium text-primary underline underline-offset-4"
              >
                privacy@everythin.ir
              </a>
            </p>

            <p className="text-sm text-gray-600 mt-8 text-center">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
