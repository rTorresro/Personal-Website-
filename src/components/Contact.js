function Contact() {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <form
        action="https://formspree.io/f/xvzppbqj"
        method="POST"
        className="contact-form"
      >
        <div className="contact-container">
          <div className="contact-title">
            <h3>
              Shoot me an email! My inbox is always open for any conversation.
            </h3>
            <hr />
          </div>

          <label className="contact-label" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your name"
            className="contact-input"
            required
          />

          <label className="contact-label" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Your email"
            className="contact-input"
            required
          />

          <label className="contact-label" htmlFor="contact-subject">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            placeholder="What is this about?"
            className="contact-input"
            required
          />

          <label className="contact-label" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Your message"
            className="contact-input contact-textarea"
            required
          ></textarea>

          <button type="submit" className="contact-button">
            Send
          </button>
          <div id="form-status" className="form-status"></div>
        </div>
      </form>
    </section>
  );
}
