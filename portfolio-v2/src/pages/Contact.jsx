import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import "./Contact.css";

const FORMSPREE = "https://formspree.io/f/xvzppbqj";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="page-section page-contact">
      <h2 className="contact-heading">contact</h2>
      <p className="contact-sub">My inbox is always open.</p>

      {status === "success" ? (
        <div className="contact-feedback contact-success">
          Message sent — I'll get back to you soon.
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <Reveal className="contact-row" delay={0}>
            <label className="contact-label" htmlFor="c-name">Name</label>
            <input
              id="c-name"
              name="name"
              type="text"
              className="contact-input"
              placeholder="Your name"
              required
            />
          </Reveal>

          <Reveal className="contact-row" delay={100}>
            <label className="contact-label" htmlFor="c-email">Email</label>
            <input
              id="c-email"
              name="email"
              type="email"
              className="contact-input"
              placeholder="you@example.com"
              required
            />
          </Reveal>

          <Reveal className="contact-row" delay={200}>
            <label className="contact-label" htmlFor="c-subject">Subject</label>
            <input
              id="c-subject"
              name="subject"
              type="text"
              className="contact-input"
              placeholder="What's this about?"
            />
          </Reveal>

          <Reveal className="contact-row" delay={300}>
            <label className="contact-label" htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              name="message"
              className="contact-input contact-textarea"
              placeholder="Your message..."
              rows="6"
              required
            />
          </Reveal>

          {status === "error" && (
            <div className="contact-feedback contact-error">
              Something went wrong — try again or email me directly.
            </div>
          )}

          <Reveal as="button"
            type="submit"
            className="contact-submit"
            disabled={status === "loading"}
            delay={400}
          >
            {status === "loading" ? "sending..." : "send message"}
          </Reveal>
        </form>
      )}
    </section>
  );
}
