import sgMail from '@sendgrid/mail'
import prisma from './prisma'

interface EmailOptions {
  to: string
  subject: string
  html: string
  template: string
}

class EmailService {
  constructor() {
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        console.log('SendGrid not configured. Email would be sent:', options)
        return false
      }

      await sgMail.send({
        to: options.to,
        from: {
          email: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
          name: process.env.SENDGRID_FROM_NAME || 'IEC JKUAT',
        },
        subject: options.subject,
        html: options.html,
      })

      // Log successful email
      await prisma.emailLog.create({
        data: {
          to: options.to,
          subject: options.subject,
          template: options.template,
          status: 'sent',
        },
      })

      return true
    } catch (error: any) {
      console.error('Error sending email:', error)

      // Log failed email
      await prisma.emailLog.create({
        data: {
          to: options.to,
          subject: options.subject,
          template: options.template,
          status: 'failed',
          error: error.message,
        },
      })

      return false
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Welcome to IEC JKUAT!',
      template: 'welcome',
      html: this.getWelcomeTemplate(name),
    })
  }

  async sendPaymentReceipt(
    email: string,
    name: string,
    amount: number,
    receiptNumber: string,
    date: Date
  ): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `Payment Receipt - ${receiptNumber}`,
      template: 'payment_receipt',
      html: this.getPaymentReceiptTemplate(name, amount, receiptNumber, date),
    })
  }

  async sendPaymentFailed(email: string, name: string, reason: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Payment Failed - ICE Membership',
      template: 'payment_failed',
      html: this.getPaymentFailedTemplate(name, reason),
    })
  }

  async sendRenewalReminder(
    email: string,
    name: string,
    expiryDate: Date,
    renewalLink: string
  ): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Membership Renewal Reminder - IEC JKUAT',
      template: 'renewal_reminder',
      html: this.getRenewalReminderTemplate(name, expiryDate, renewalLink),
    })
  }

  async sendMembershipExpired(email: string, name: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Membership Expired - IEC JKUAT',
      template: 'membership_expired',
      html: this.getMembershipExpiredTemplate(name),
    })
  }

  async sendEmailVerification(email: string, token: string): Promise<boolean> {
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`
    return this.sendEmail({
      to: email,
      subject: 'Verify your email - ICE JKUAT',
      template: 'email_verification',
      html: this.getEmailVerificationTemplate(verificationLink),
    })
  }

  // Email Templates
  private getWelcomeTemplate(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Welcome to ICE JKUAT</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; text-align: center;">Welcome to ICE JKUAT!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi ${name},</p>
          <p>Thank you for joining the Innovation and Entrepreneurship Club at JKUAT!</p>
          <p>We're excited to have you as part of our community. To activate your membership, please complete your payment of <strong>500 KES</strong>.</p>
          <p>Once your payment is confirmed, you'll get access to:</p>
          <ul>
            <li>Exclusive workshops and events</li>
            <li>Networking opportunities with entrepreneurs</li>
            <li>Mentorship programs</li>
            <li>Resources and tools for innovation</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
          </div>
          <p>If you have any questions, feel free to reach out to us at iecjkuat@gmail.com</p>
          <p>Best regards,<br>The ICE JKUAT Team</p>
        </div>
      </body>
      </html>
    `
  }

  private getPaymentReceiptTemplate(
    name: string,
    amount: number,
    receiptNumber: string,
    date: Date
  ): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Receipt</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; text-align: center;">Payment Successful!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi ${name},</p>
          <p>Your payment has been successfully received. Your membership is now active!</p>
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #667eea;">Payment Details</h3>
            <table style="width: 100%;">
              <tr>
                <td><strong>Amount:</strong></td>
                <td>KES ${amount.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Receipt Number:</strong></td>
                <td>${receiptNumber}</td>
              </tr>
              <tr>
                <td><strong>Date:</strong></td>
                <td>${date.toLocaleDateString()}</td>
              </tr>
            </table>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">View Membership</a>
          </div>
          <p>Thank you for your support!</p>
          <p>Best regards,<br>The ICE JKUAT Team</p>
        </div>
      </body>
      </html>
    `
  }

  private getPaymentFailedTemplate(name: string, reason: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Failed</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; text-align: center;">Payment Failed</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi ${name},</p>
          <p>Unfortunately, your payment could not be processed.</p>
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Reason:</strong> ${reason}</p>
          </div>
          <p>Please try again or contact us if you need assistance.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Try Again</a>
          </div>
          <p>If you continue experiencing issues, please contact us at iecjkuat@gmail.com</p>
          <p>Best regards,<br>The ICE JKUAT Team</p>
        </div>
      </body>
      </html>
    `
  }

  private getRenewalReminderTemplate(name: string, expiryDate: Date, renewalLink: string): string {
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Membership Renewal Reminder</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; text-align: center;">Time to Renew!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi ${name},</p>
          <p>Your ICE JKUAT membership will expire in <strong>${daysUntilExpiry} days</strong> (${expiryDate.toLocaleDateString()}).</p>
          <div style="background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Special Renewal Rate:</strong> Only 250 KES (instead of 500 KES)</p>
          </div>
          <p>Don't miss out on continued access to our exclusive events, workshops, and networking opportunities!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${renewalLink}" style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px;">Renew Now for 250 KES</a>
          </div>
          <p>We look forward to continuing this journey with you!</p>
          <p>Best regards,<br>The ICE JKUAT Team</p>
        </div>
      </body>
      </html>
    `
  }

  private getMembershipExpiredTemplate(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Membership Expired</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; text-align: center;">Membership Expired</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi ${name},</p>
          <p>Your ICE JKUAT membership has expired.</p>
          <p>We hope you enjoyed being part of our community! To continue accessing exclusive benefits, please renew your membership.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Renew Membership</a>
          </div>
          <p>Thank you for your support!</p>
          <p>Best regards,<br>The ICE JKUAT Team</p>
        </div>
      </body>
      </html>
    `
  }

  private getEmailVerificationTemplate(verificationLink: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Verify Your Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; text-align: center;">Verify Your Email</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hello,</p>
          <p>Thank you for registering with ICE JKUAT. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
          </div>
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The ICE JKUAT Team</p>
        </div>
      </body>
      </html>
    `
  }
}

export const emailService = new EmailService()
