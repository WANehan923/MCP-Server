import nodemailer from 'nodemailer';
import { z } from 'zod';

const EmailSchema = z.object({
  recipient: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
});

export type EmailRequest = z.infer<typeof EmailSchema>;

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure email transporter
    // For production, you'll want to use environment variables
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD || 'your-app-password'
      }
    });
  }

  public async sendEmail(emailData: EmailRequest): Promise<{ success: boolean; message: string; messageId?: string }> {
    try {
      // Validate input
      const validatedData = EmailSchema.parse(emailData);
      
      // Verify transporter
      await this.transporter.verify();
      
      // Send email
      const info = await this.transporter.sendMail({
        from: `"Nehan's CV Server" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
        to: validatedData.recipient,
        subject: validatedData.subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
              Message from Nehan's CV Server
            </h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              ${validatedData.body.replace(/\n/g, '<br>')}
            </div>
            <div style="color: #7f8c8d; font-size: 12px; margin-top: 20px; border-top: 1px solid #ecf0f1; padding-top: 10px;">
              <p>This email was sent via Nehan Chandira's CV MCP Server</p>
              <p>Contact: nehanchandira619@gmail.com | GitHub: https://github.com/WANehan923</p>
            </div>
          </div>
        `,
        text: validatedData.body // Plain text fallback
      });

      return {
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: `Validation error: ${error.errors.map(e => e.message).join(', ')}`
        };
      }
      
      return {
        success: false,
        message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  public async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      await this.transporter.verify();
      return {
        success: true,
        message: 'Email service connection successful'
      };
    } catch (error) {
      return {
        success: false,
        message: `Email service connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  public getEmailServiceInfo(): object {
    return {
      service: 'Gmail',
      configured: !!(process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD),
      sender: process.env.EMAIL_USER || 'Not configured',
      instructions: {
        setup: [
          '1. Enable 2-factor authentication on your Gmail account',
          '2. Generate an app password for this application',
          '3. Set environment variables: EMAIL_USER and EMAIL_APP_PASSWORD',
          '4. For other email services, update the service configuration'
        ],
        environmentVariables: {
          EMAIL_USER: 'Your email address (e.g., your-email@gmail.com)',
          EMAIL_APP_PASSWORD: 'Your email app password (not your regular password)'
        }
      }
    };
  }
}