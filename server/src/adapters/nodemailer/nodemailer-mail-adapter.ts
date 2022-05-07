import nodemailer from 'nodemailer';
import { MailAdapter, SendEmailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ea4f4500a0994e',
    pass: '6693f33b3a0070',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendEmailData) {
    const feedback = await transport.sendMail({
      from: 'Equipe Feedget<oi@feedget.com>',
      to: 'Felipe Ribeiro <email@email.com>',
      subject,
      html: body,
    });
  }
}
