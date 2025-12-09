import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your 2FA Security Code",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                     line-height: 1.6;
                     color: #1f2937;
                     background-color: #f9fafb;
                     margin: 0;
                     padding: 20px;">
          <div style="max-width: 600px;
                      margin: 0 auto;
                      background-color: white;
                      border-radius: 12px;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      overflow: hidden;">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 40px 20px;
                        text-align: center;">
              <div style="width: 60px;
                          height: 60px;
                          background-color: rgba(255, 255, 255, 0.2);
                          border-radius: 50%;
                          margin: 0 auto 20px;
                          display: flex;
                          align-items: center;
                          justify-content: center;">
                <span style="font-size: 32px;">🔐</span>
              </div>
              <h1 style="color: white;
                         margin: 0;
                         font-size: 28px;
                         font-weight: 600;">
                Two-Factor Authentication
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px;
                        color: #4b5563;
                        margin: 0 0 30px;">
                Hello! We received a request to access your account. Please use the verification code below:
              </p>

              <!-- 2FA Code Box -->
              <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                          border: 3px dashed #9ca3af;
                          border-radius: 12px;
                          padding: 30px;
                          text-align: center;
                          margin: 30px 0;">
                <p style="font-size: 14px;
                          color: #6b7280;
                          margin: 0 0 15px;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          font-weight: 600;">
                  Your Verification Code
                </p>
                <div style="font-size: 42px;
                            font-weight: 700;
                            color: #1f2937;
                            letter-spacing: 8px;
                            font-family: 'Courier New', monospace;
                            background-color: white;
                            padding: 20px;
                            border-radius: 8px;
                            display: inline-block;">
                  ${token}
                </div>
              </div>

              <!-- Info Box -->
              <div style="background-color: #fef3c7;
                          border-left: 4px solid #f59e0b;
                          padding: 16px 20px;
                          border-radius: 6px;
                          margin: 30px 0;">
                <p style="margin: 0;
                          font-size: 14px;
                          color: #92400e;">
                  <strong>⏱️ Important:</strong> This code will expire in 1 Hour for security reasons.
                </p>
              </div>

              <!-- Security Tips -->
              <div style="background-color: #f9fafb;
                          padding: 20px;
                          border-radius: 8px;
                          margin: 30px 0;">
                <p style="font-size: 14px;
                          color: #4b5563;
                          margin: 0 0 12px;
                          font-weight: 600;">
                  🛡️ Security Tips:
                </p>
                <ul style="font-size: 13px;
                           color: #6b7280;
                           margin: 0;
                           padding-left: 20px;">
                  <li style="margin-bottom: 8px;">Never share this code with anyone</li>
                  <li style="margin-bottom: 8px;">We will never ask for this code via phone or email</li>
                  <li>If you didn't request this code, please secure your account immediately</li>
                </ul>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb;
                        padding: 30px;
                        text-align: center;
                        border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af;
                        font-size: 12px;
                        margin: 0 0 10px;">
                If you didn't request this code, please ignore this email or contact our support team.
              </p>
              <p style="color: #d1d5db;
                        font-size: 11px;
                        margin: 0;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </p>
            </div>
          </div>

          <!-- Spacer for mobile -->
          <div style="height: 20px;"></div>
        </body>
      </html>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                     line-height: 1.6;
                     color: #1f2937;
                     background-color: #f9fafb;
                     margin: 0;
                     padding: 20px;">
          <div style="max-width: 600px;
                      margin: 0 auto;
                      background-color: white;
                      border-radius: 12px;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      overflow: hidden;">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
                        padding: 40px 20px;
                        text-align: center;">
              <div style="width: 60px;
                          height: 60px;
                          background-color: rgba(255, 255, 255, 0.2);
                          border-radius: 50%;
                          margin: 0 auto 20px;
                          display: flex;
                          align-items: center;
                          justify-content: center;">
                <span style="font-size: 32px;">🔑</span>
              </div>
              <h1 style="color: white;
                         margin: 0;
                         font-size: 28px;
                         font-weight: 600;">
                Password Reset Request
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px;
                        color: #4b5563;
                        margin: 0 0 30px;">
                We received a request to reset your password. Click the button below to create a new password for your account.
              </p>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${resetLink}"
                   style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
                          color: white;
                          padding: 16px 40px;
                          text-decoration: none;
                          border-radius: 8px;
                          display: inline-block;
                          font-weight: 600;
                          font-size: 16px;
                          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
                          transition: all 0.3s;">
                  Reset My Password
                </a>
              </div>

              <!-- Alternative Link -->
              <div style="background-color: #f9fafb;
                          padding: 20px;
                          border-radius: 8px;
                          margin: 30px 0;">
                <p style="color: #6b7280;
                          font-size: 13px;
                          margin: 0 0 10px;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="color: #3b82f6;
                          font-size: 12px;
                          word-break: break-all;
                          margin: 0;
                          font-family: monospace;">
                  ${resetLink}
                </p>
              </div>

              <!-- Warning Box -->
              <div style="background-color: #fee2e2;
                          border-left: 4px solid #ef4444;
                          padding: 16px 20px;
                          border-radius: 6px;
                          margin: 30px 0;">
                <p style="margin: 0;
                          font-size: 14px;
                          color: #991b1b;">
                  <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour. If you didn't request this reset, please contact our support team immediately.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb;
                        padding: 30px;
                        text-align: center;
                        border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af;
                        font-size: 12px;
                        margin: 0 0 10px;">
                If you didn't request a password reset, you can safely ignore this email.
              </p>
              <p style="color: #d1d5db;
                        font-size: 11px;
                        margin: 0;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                       line-height: 1.6;
                       color: #1f2937;
                       background-color: #f9fafb;
                       margin: 0;
                       padding: 20px;">
            <div style="max-width: 600px;
                        margin: 0 auto;
                        background-color: white;
                        border-radius: 12px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        overflow: hidden;">

              <!-- Header -->
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                          padding: 40px 20px;
                          text-align: center;">
                <div style="width: 60px;
                            height: 60px;
                            background-color: rgba(255, 255, 255, 0.2);
                            border-radius: 50%;
                            margin: 0 auto 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;">
                  <span style="font-size: 32px;">✉️</span>
                </div>
                <h1 style="color: white;
                           margin: 0;
                           font-size: 28px;
                           font-weight: 600;">
                  Welcome! Verify Your Email
                </h1>
              </div>

              <!-- Content -->
              <div style="padding: 40px 30px;">
                <p style="font-size: 18px;
                          color: #1f2937;
                          margin: 0 0 20px;
                          font-weight: 600;">
                  🎉 Thank you for signing up!
                </p>
                <p style="font-size: 16px;
                          color: #4b5563;
                          margin: 0 0 30px;">
                  We're excited to have you on board. To get started, please verify your email address by clicking the button below.
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${confirmLink}"
                     style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                            color: white;
                            padding: 16px 40px;
                            text-decoration: none;
                            border-radius: 8px;
                            display: inline-block;
                            font-weight: 600;
                            font-size: 16px;
                            box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                    Verify Email Address
                  </a>
                </div>

                <!-- Alternative Link -->
                <div style="background-color: #f9fafb;
                            padding: 20px;
                            border-radius: 8px;
                            margin: 30px 0;">
                  <p style="color: #6b7280;
                            font-size: 13px;
                            margin: 0 0 10px;">
                    If the button doesn't work, copy and paste this link into your browser:
                  </p>
                  <p style="color: #10b981;
                            font-size: 12px;
                            word-break: break-all;
                            margin: 0;
                            font-family: monospace;">
                    ${confirmLink}
                  </p>
                </div>

                <!-- Info Box -->
                <div style="background-color: #dbeafe;
                            border-left: 4px solid #3b82f6;
                            padding: 16px 20px;
                            border-radius: 6px;
                            margin: 30px 0;">
                  <p style="margin: 0;
                            font-size: 14px;
                            color: #1e40af;">
                    <strong>ℹ️ Note:</strong> Once verified, you'll have full access to all features of your account.
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #f9fafb;
                          padding: 30px;
                          text-align: center;
                          border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af;
                          font-size: 12px;
                          margin: 0 0 10px;">
                  If you didn't create an account, you can safely ignore this email.
                </p>
                <p style="color: #d1d5db;
                          font-size: 11px;
                          margin: 0;">
                  © ${new Date().getFullYear()} Your Company. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error };
  }
};
