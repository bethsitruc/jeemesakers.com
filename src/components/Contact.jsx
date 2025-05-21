import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_c5m4kt6',
      'template_ki6hgki',
      form.current,
      '8TgJToP4JlPgIlFpK'
    ).then(
      (result) => {
        alert("Message sent!");
      },
      (error) => {
        alert("Failed to send message.");
      }
    );
  };

  return (
    <section className="contact-page">
      <h1>Contact</h1>
        <form ref={form} onSubmit={sendEmail} className="contact-form tile">
        <p className="contact-message">
          Thanks for stopping by! If you’ve read a missive, explored the site, or just want to say hello,
          feel free to send a note using the form below. Whether you’re a friend, family member, or a curious reader,
          I’d love to hear from you.
        </p>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>
    </section>
  );
}

export default Contact;