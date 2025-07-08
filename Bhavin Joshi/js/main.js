// main.js - reserved for future main logic 

function loadSection(id, file, cb) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (cb) cb();
    });
}

function animateSection(id) {
  const section = document.getElementById(id);
  if (section) {
    const fade = section.querySelector('.fade-in');
    if (fade) fade.classList.add('fade-in');
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  if (!form || !feedback || !nameInput || !emailInput || !messageInput) return;

  function setError(input) {
    input.classList.remove('input-success');
    input.classList.add('input-error');
  }
  function setSuccess(input) {
    input.classList.remove('input-error');
    input.classList.add('input-success');
  }
  function clearStatus(input) {
    input.classList.remove('input-error');
    input.classList.remove('input-success');
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    feedback.textContent = '';
    feedback.className = '';
    let valid = true;
    clearStatus(nameInput); clearStatus(emailInput); clearStatus(messageInput);
    if (!name) { setError(nameInput); valid = false; }
    else { setSuccess(nameInput); }
    if (!email) { setError(emailInput); valid = false; }
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setError(emailInput); valid = false; }
    else { setSuccess(emailInput); }
    if (!message) { setError(messageInput); valid = false; }
    else { setSuccess(messageInput); }
    if (!valid) {
      feedback.textContent = 'Please fill in all fields with valid information.';
      feedback.className = 'error-message';
      return;
    }
    feedback.textContent = 'Thank you! Your message has been sent.';
    feedback.className = 'success-message';
    form.reset();
    clearStatus(nameInput); clearStatus(emailInput); clearStatus(messageInput);
  });

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      clearStatus(input);
      feedback.textContent = '';
      feedback.className = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadSection('hero', 'sections/hero.html', () => {
    if (window.initHeroSection) window.initHeroSection();
    animateSection('hero');
  });
  loadSection('about', 'sections/about.html', () => animateSection('about'));
  loadSection('skills', 'sections/skills.html', () => animateSection('skills'));
  loadSection('projects', 'sections/projects.html', () => animateSection('projects'));
  loadSection('experience', 'sections/experience.html', () => animateSection('experience'));
  loadSection('fun-terminal', 'sections/fun-terminal.html', () => {
    if (window.initFunTerminal) window.initFunTerminal();
    animateSection('fun-terminal');
  });
  loadSection('contact', 'sections/contact.html', () => {
    animateSection('contact');
    initContactForm();
  });
}); 