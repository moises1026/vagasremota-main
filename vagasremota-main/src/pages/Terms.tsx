export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Vagas Remota, you agree to be bound by these
              Terms of Service. If you do not agree with any part of these terms,
              please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to accept responsibility for all
              activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Job Postings</h2>
            <p className="text-muted-foreground">
              Companies posting jobs must provide accurate and truthful
              information. We reserve the right to remove any job posting that
              violates our policies or contains false information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Applications</h2>
            <p className="text-muted-foreground">
              Candidates must provide accurate information in their applications
              and profiles. We reserve the right to remove any application that
              contains false information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Subscription Plans</h2>
            <p className="text-muted-foreground">
              Subscription fees are billed in advance on a monthly or annual
              basis. You can cancel your subscription at any time, but no refunds
              will be issued for partial months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on Vagas Remota, including text, graphics, logos, and
              software, is the property of Vagas Remota and is protected by
              copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Vagas Remota is not liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes via email or through the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these terms, please contact us at{" "}
              <a
                href="mailto:legal@vagasremota.com"
                className="text-primary hover:underline"
              >
                legal@vagasremota.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>Last updated: February 15, 2024</p>
        </div>
      </div>
    </div>
  )
} 