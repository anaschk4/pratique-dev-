class MailProvider {
  async sendEmail({ to, subject, text }) {
    throw new Error("sendEmail() doit être implémenté");
  }
}

class SendGridMailProvider extends MailProvider {
  constructor(sendgridLib) {
    super();
    this.sendgrid = sendgridLib;
  }

  async sendEmail({ to, subject, text }) {
    return this.sendgrid.send({ to, subject, text });
  }
}

class FakeMailProvider extends MailProvider {
  constructor() {
    super();
    this.sentEmails = [];
  }

  async sendEmail(email) {
    this.sentEmails.push(email);
    console.log("[fake] Email stocké, rien envoyé");
  }
}

class EmailService {
  constructor(mailProvider) {
    this.mailProvider = mailProvider;
  }

  async sendWelcomeEmail(user) {
    const subject = "Bienvenue sur notre plateforme";
    const text = `Bonjour ${user.firstName},

Merci pour votre inscription.

À bientôt !`;

    return this.mailProvider.sendEmail({
      to: user.email,
      subject,
      text,
    });
  }
}

const sendgrid = {
  async send({ to, subject, text }) {
    console.log("[sendgrid] Email envoyé à", to, subject);
  },
};

const mailProvider = new SendGridMailProvider(sendgrid);
const emailService = new EmailService(mailProvider);

emailService.sendWelcomeEmail({
  firstName: "Kenan",
  email: "kenan@example.com",
});
