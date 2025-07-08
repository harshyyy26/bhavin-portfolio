// Typing animation and logic for hero section
function initHeroSection() {
  const heroTyping = document.getElementById('hero-typing');
  const heroSubTyping = document.getElementById('hero-subtyping');
  const heroCursor = document.getElementById('hero-cursor');
  const heroSubCursor = document.getElementById('hero-subcursor');
  const heroRotating = document.getElementById('hero-rotating');
  const scrollDown = document.getElementById('scroll-down');

  const heroLines = [
    'Hello, I\'m Bhavin Lalit Joshi',
    'Aspiring Java Developer | Problem Solver | Code Enthusiast'
  ];
  const funnyLines = [
    'Real devs don\'t write bugs — they ship unexpected features.',
    'NullPointerException: the horror story Java tells its kids at night.'
  ];

  function typeLine(element, text, cursor, cb) {
    let i = 0;
    cursor.classList.remove('hide-cursor');
    function type() {
      if (i <= text.length) {
        // For the first hero line, bold the name
        if (element.id === 'hero-typing') {
          const name = 'Bhavin Lalit Joshi';
          const idx = text.indexOf(name);
          if (idx !== -1 && i > idx) {
            const before = text.slice(0, idx);
            const namePart = text.slice(idx, Math.min(i, idx + name.length));
            const after = text.slice(idx + name.length, i);
            element.innerHTML = `${before}<strong>${namePart}</strong>${after}`;
          } else {
            element.textContent = text.slice(0, i);
          }
        } else {
          element.textContent = text.slice(0, i);
        }
        i++;
        setTimeout(type, 38);
      } else {
        cursor.classList.add('hide-cursor');
        if (cb) setTimeout(cb, 400);
      }
    }
    type();
  }

  function typeSkillsPrompt() {
    const skillsTyping = document.getElementById('skills-typing');
    const skillsCursor = document.getElementById('skills-cursor');
    const skillsListEl = document.getElementById('skills-list');
    const skillsPrompt = 'skills --list';
    const skillsList = `Languages: Java, JavaScript, SQL\nBackend: Spring Boot, JDBC\nFrontend: HTML, CSS, React\nDatabase: MongoDB, Firebase\nLearning: Angular, PostgreSQL`;
    if (!skillsTyping || !skillsCursor || !skillsListEl) return;
    let i = 0;
    skillsCursor.classList.remove('hide-cursor');
    function type() {
      if (i <= skillsPrompt.length) {
        skillsTyping.textContent = skillsPrompt.slice(0, i);
        i++;
        setTimeout(type, 38);
      } else {
        skillsCursor.classList.add('hide-cursor');
        setTimeout(() => {
          skillsListEl.textContent = skillsList;
          skillsListEl.classList.add('typed-in');
        }, 400);
      }
    }
    type();
  }

  function startHeroTyping() {
    typeLine(heroTyping, heroLines[0], heroCursor, () => {
      typeLine(heroSubTyping, heroLines[1], heroSubCursor, () => {
        setTimeout(typeSkillsPrompt, 700);
      });
    });
  }

  function startRotatingLines() {
    if (!heroRotating) return;
    let currentFunny = 0;
    heroRotating.textContent = funnyLines[0];
    setInterval(() => {
      currentFunny = (currentFunny + 1) % funnyLines.length;
      heroRotating.classList.remove('typed-in');
      setTimeout(() => {
        heroRotating.textContent = funnyLines[currentFunny];
        heroRotating.classList.add('typed-in');
      }, 200);
    }, 5000);
  }

  if (heroTyping && heroSubTyping && heroCursor && heroSubCursor) {
    startHeroTyping();
    startRotatingLines();
  }
  if (scrollDown) {
    scrollDown.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Fun Terminal Section Logic
function initFunTerminal() {
  const funTerminalInput = document.getElementById('fun-terminal-input');
  const funTerminalOutput = document.getElementById('fun-terminal-output');

  const funJokes = [
    'Real devs don\'t write bugs — they ship unexpected features.',
    'NullPointerException: the horror story Java tells its kids at night.',
    'Why do Java developers wear glasses? Because they don\'t C#.',
    'To understand recursion, you must first understand recursion.'
  ];
  const funMotivates = [
    'Keep calm and code on! 🚀',
    'Every great developer you know started as a beginner.',
    'Debugging: Being the detective in a crime movie where you are also the murderer.'
  ];
  const funQuotes = [
    'Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson',
    'First, solve the problem. Then, write the code. — John Johnson',
    'Talk is cheap. Show me the code. — Linus Torvalds',
    'Simplicity is the soul of efficiency. — Austin Freeman'
  ];
  const funAbout =
    'Bhavin Lalit Joshi — Aspiring Java Developer, code enthusiast, and terminal UI enjoyer.';

  let guessGameActive = false;
  let guessGameNumber = null;
  let guessGameTries = 0;

  function startGuessGame() {
    guessGameActive = true;
    guessGameNumber = Math.floor(Math.random() * 100) + 1;
    guessGameTries = 0;
    funTerminalTypeOutput('guess', 'I\'m thinking of a number between 1 and 100. Try to guess it!\n(Type a number, or type exit to quit.)');
  }

  function processGuessGame(input) {
    if (input === 'exit') {
      guessGameActive = false;
      funTerminalTypeOutput('exit', 'Exited the guessing game.');
      return;
    }
    const num = parseInt(input, 10);
    if (isNaN(num)) {
      funTerminalTypeOutput(input, 'Please enter a valid number between 1 and 100, or type exit to quit.');
      return;
    }
    guessGameTries++;
    if (num < guessGameNumber) {
      funTerminalTypeOutput(input, 'Too low!');
    } else if (num > guessGameNumber) {
      funTerminalTypeOutput(input, 'Too high!');
    } else {
      funTerminalTypeOutput(input, `Correct! You guessed it in ${guessGameTries} tries. Type guess to play again or any other command.`);
      guessGameActive = false;
    }
  }

  function triggerResumeDownload() {
    const resumeUrl = 'assets/Bhavin_Resume.pdf';
    fetch(resumeUrl, { method: 'HEAD' })
      .then(resp => {
        if (resp.ok) {
          const a = document.createElement('a');
          a.href = resumeUrl;
          a.download = 'Bhavin_Resume.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          funTerminalTypeOutput('resume', 'Resume file not found. Please try again later.');
        }
      })
      .catch(() => {
        funTerminalTypeOutput('resume', 'Resume file not found. Please try again later.');
      });
  }

  const funHelp =
    `Available commands:\n- joke\n- 404\n- motivate\n- quote\n- about\n- guess\n- resume\n- help\n- clear`;

  function funTerminalRespond(cmd) {
    let response = '';
    if (cmd === 'resume') {
      response = 'Downloading resume...';
    } else if (cmd === 'joke') {
      response = funJokes[Math.floor(Math.random() * funJokes.length)];
    } else if (cmd === '404') {
      response = 'ERROR 404: Page not found\n> Try turning it off and on again';
    } else if (cmd === 'motivate') {
      response = funMotivates[Math.floor(Math.random() * funMotivates.length)];
    } else if (cmd === 'quote') {
      response = funQuotes[Math.floor(Math.random() * funQuotes.length)];
    } else if (cmd === 'about') {
      response = funAbout;
    } else if (cmd === 'help') {
      response = funHelp;
    } else if (cmd === 'clear') {
      response = '';
    } else if (cmd.trim() === '') {
      response = '';
    } else {
      response = `Command not found: ${cmd}\nType 'help' for a list of commands.`;
    }
    return response;
  }

  function funTerminalTypeOutput(cmd, output, cb) {
    let i = 0;
    let full = `<span class='prompt'>&gt; </span>${cmd}\n<span class='prompt'>&gt; </span>`;
    funTerminalOutput.innerHTML = `<span class='prompt'>&gt; </span>${cmd}\n<span class='prompt'>&gt; </span><span id='fun-term-typed'></span><span class='fun-terminal-cursor'>█</span>`;
    const typed = document.getElementById('fun-term-typed');
    const cursor = funTerminalOutput.querySelector('.fun-terminal-cursor');
    function type() {
      if (typed && i <= output.length) {
        typed.textContent = output.slice(0, i);
        i++;
        setTimeout(type, 18);
      } else {
        if (cursor) cursor.style.display = 'inline-block';
        if (cb) cb();
      }
    }
    type();
  }

  if (funTerminalInput && funTerminalOutput) {
    funTerminalInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const cmd = funTerminalInput.value.trim();
        if (!cmd) return;
        if (guessGameActive) {
          processGuessGame(cmd);
          funTerminalInput.value = '';
          return;
        }
        if (cmd === 'clear') {
          funTerminalOutput.innerHTML = '';
          funTerminalInput.value = '';
          return;
        }
        if (cmd === 'guess') {
          startGuessGame();
          funTerminalInput.value = '';
          return;
        }
        if (cmd === 'resume') {
          funTerminalTypeOutput(cmd, funTerminalRespond(cmd));
          triggerResumeDownload();
          funTerminalInput.value = '';
          return;
        }
        const resp = funTerminalRespond(cmd);
        funTerminalTypeOutput(cmd, resp);
        funTerminalInput.value = '';
      }
    });
  }
}

// Export initializers for use in main.js
window.initHeroSection = initHeroSection;
window.initFunTerminal = initFunTerminal; 