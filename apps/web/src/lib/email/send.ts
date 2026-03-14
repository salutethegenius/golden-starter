import { Resend } from "resend";
import { formatCents } from "@/lib/types";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/types";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function fromEmail() {
  return process.env.EMAIL_FROM || "A.M.T Imports <onboarding@resend.dev>";
}

function adminEmail() {
  return process.env.ADMIN_EMAIL || "admin@amtimports.com";
}

export async function sendInvoiceEmail({
  to,
  customerName,
  invoiceNumber,
  amount,
  currency,
  payUrl,
}: {
  to: string;
  customerName: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  payUrl: string;
}) {
  await getResend().emails.send({
    from: fromEmail(),
    to,
    subject: `Invoice ${invoiceNumber} from A.M.T Imports`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #18181b; margin-bottom: 8px;">Invoice ${invoiceNumber}</h2>
        <p style="color: #71717a; font-size: 14px;">Hi ${customerName},</p>
        <p style="color: #71717a; font-size: 14px;">
          You have a new invoice from A.M.T Imports for <strong style="color: #18181b;">${formatCents(amount, currency)}</strong>.
        </p>
        <div style="margin: 32px 0;">
          <a href="${payUrl}" style="background: #2563eb; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
            View &amp; Pay Invoice
          </a>
        </div>
        <p style="color: #a1a1aa; font-size: 12px;">
          If you have questions about this invoice, please contact us at info@amtimports.com.
        </p>
        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
        <p style="color: #a1a1aa; font-size: 12px;">A.M.T Imports Courier Services</p>
      </div>
    `,
  });
}

export async function sendPaymentConfirmation({
  to,
  customerName,
  invoiceNumber,
  amount,
  currency,
}: {
  to: string;
  customerName: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
}) {
  await getResend().emails.send({
    from: fromEmail(),
    to,
    subject: `Payment Received - ${invoiceNumber}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #18181b; margin-bottom: 8px;">Payment Confirmed</h2>
        <p style="color: #71717a; font-size: 14px;">Hi ${customerName},</p>
        <p style="color: #71717a; font-size: 14px;">
          We've received your payment of <strong style="color: #18181b;">${formatCents(amount, currency)}</strong>
          for invoice <strong>${invoiceNumber}</strong>.
        </p>
        <p style="color: #71717a; font-size: 14px;">Thank you for your business!</p>
        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
        <p style="color: #a1a1aa; font-size: 12px;">A.M.T Imports Courier Services</p>
      </div>
    `,
  });
}

export async function sendPaymentReceived({
  invoiceNumber,
  customerName,
  amount,
  currency,
}: {
  invoiceNumber: string;
  customerName: string;
  amount: number;
  currency: string;
}) {
  await getResend().emails.send({
    from: fromEmail(),
    to: adminEmail(),
    subject: `Payment Received: ${invoiceNumber}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #18181b; margin-bottom: 8px;">Payment Received</h2>
        <p style="color: #71717a; font-size: 14px;">
          <strong>${customerName}</strong> has paid <strong style="color: #18181b;">${formatCents(amount, currency)}</strong>
          for invoice <strong>${invoiceNumber}</strong>.
        </p>
        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
        <p style="color: #a1a1aa; font-size: 12px;">A.M.T Imports Admin Notification</p>
      </div>
    `,
  });
}

export async function sendOrderStatusUpdate({
  to,
  customerName,
  orderDescription,
  status,
}: {
  to: string;
  customerName: string;
  orderDescription: string;
  status: OrderStatus;
}) {
  const statusLabel = ORDER_STATUS_LABELS[status];

  await getResend().emails.send({
    from: fromEmail(),
    to,
    subject: `Order Update: ${statusLabel}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #18181b; margin-bottom: 8px;">Order Status Update</h2>
        <p style="color: #71717a; font-size: 14px;">Hi ${customerName},</p>
        <p style="color: #71717a; font-size: 14px;">
          Your order <strong>"${orderDescription}"</strong> has been updated to:
        </p>
        <div style="margin: 24px 0; padding: 16px; background: #f4f4f5; border-radius: 8px; text-align: center;">
          <span style="font-size: 18px; font-weight: 700; color: #2563eb;">${statusLabel}</span>
        </div>
        <p style="color: #a1a1aa; font-size: 12px;">
          Log in to your portal for more details.
        </p>
        <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
        <p style="color: #a1a1aa; font-size: 12px;">A.M.T Imports Courier Services</p>
      </div>
    `,
  });
}
