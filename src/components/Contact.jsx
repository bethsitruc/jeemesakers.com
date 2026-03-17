import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const COOLDOWN_MS = 30 * 1000;

// Contact component renders a contact form and handles email sending via EmailJS
function Contact() {
  const form = useRef();
  const cooldownTimer = useRef(null);
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => () => {
    if (cooldownTimer.current) {
      clearTimeout(cooldownTimer.current);
    }
  }, []);

  const startCooldown = () => {
    if (cooldownTimer.current) {
      clearTimeout(cooldownTimer.current);
    }

    setIsCooldown(true);
    cooldownTimer.current = setTimeout(() => {
      setIsCooldown(false);
      cooldownTimer.current = null;
    }, COOLDOWN_MS);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (isCooldown) {
      setStatus('error');
      setStatusMessage('Please wait a few seconds before sending another message.');
      return;
    }

    const honeypot = form.current?.elements?.company?.value?.trim();

    if (honeypot) {
      form.current.reset();
      setStatus('success');
      setStatusMessage('Message sent.');
      startCooldown();
      return;
    }

    setStatus('sending');
    setStatusMessage('Sending your message...');

    try {
      await emailjs.sendForm(
        'service_c5m4kt6',
        'template_ki6hgki',
        form.current,
        '8TgJToP4JlPgIlFpK'
      );
      form.current.reset();
      setStatus('success');
      setStatusMessage('Message sent.');
      startCooldown();
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <section className="contact-page">
      <h1>Contact</h1>
      {/* Contact form for user input */}
      <form ref={form} onSubmit={sendEmail} className="contact-form tile">
        <p className="contact-message">
          Thanks for stopping by! If you’ve read a missive, explored the site, or just want to say hello,
          feel free to send a note using the form below. Whether you’re a friend, family member, or a curious reader,
          I’d love to hear from you.
        </p>
        <p className={`contact-status contact-status--${status}`} aria-live="polite">
          {statusMessage}
        </p>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label className="contact-honeypot" aria-hidden="true">
          Company
          <input type="text" name="company" tabIndex="-1" autoComplete="off" />
        </label>
        <label>
          Message
          <textarea name="message" rows="5" required></textarea>
        </label>
        <button type="submit" disabled={status === 'sending' || isCooldown}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}

export default Contact;
