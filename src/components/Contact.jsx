import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

// Contact component renders a contact form and handles email sending via EmailJS
function Contact() {
  const form = useRef(); // Reference to the form element

  // Function to handle form submission and send email using EmailJS
  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send the form data using EmailJS service and template IDs
    emailjs.sendForm(
      'service_c5m4kt6',        // EmailJS service ID
      'template_ki6hgki',       // EmailJS template ID
      form.current,             // Reference to the form DOM node
      '8TgJToP4JlPgIlFpK'       // EmailJS public key
    ).then(
      (result) => {
        alert("Message sent!"); // Show success message
      },
      (error) => {
        alert("Failed to send message."); // Show error message
      }
    );
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
        {/* Name input */}
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        {/* Email input */}
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        {/* Message textarea */}
        <label>
          Message
          <textarea name="message" rows="5" required></textarea>
        </label>
        {/* Submit button */}
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;