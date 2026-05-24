// Navigation scroll behavior
const header = document.getElementById('site-header');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile nav toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Data deletion form
const deletionForm = document.getElementById('deletion-form');
if (deletionForm) {
  deletionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('del-name').value.trim();
    const email   = document.getElementById('del-email').value.trim();
    const product = document.getElementById('del-product').value;
    const reason  = document.getElementById('del-reason').value;
    const details = document.getElementById('del-details').value.trim();

    const body = `DATA DELETION REQUEST\n${'─'.repeat(40)}\nName: ${name}\nAccount Email: ${email}\nProduct: ${product}\nReason: ${reason}${details ? `\n\nAdditional Details:\n${details}` : ''}\n\n${'─'.repeat(40)}\nSubmitted via vtechs.com.jm/data-deletion.html`;
    window.location.href = `mailto:info@vtechs.com.jm?subject=${encodeURIComponent(`Data Deletion Request — ${product} — ${name}`)}&body=${encodeURIComponent(body)}`;

    deletionForm.hidden = true;
    document.getElementById('deletion-success').hidden = false;
  });
}

// Contact form — opens mailto with form data
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value || 'General Inquiry';
    const message = form.message.value.trim();

    const body = `Name: ${name}\nEmail: ${email}\nService Interest: ${subject}\n\nMessage:\n${message}`;
    window.location.href = `mailto:info@vtechs.com.jm?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;

    contactForm.hidden = true;
    document.getElementById('form-success').hidden = false;
  });
}
