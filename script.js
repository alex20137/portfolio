/**
 * Alexandru Mihalcea-Calinescu Portfolio
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('am_theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('am_theme', nextTheme);
      showToast(`Switched to ${nextTheme} mode`);
    });
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu when a nav-link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // 3. Print / Export CV
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 4. Experience Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      timelineItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // 5. Copy to Clipboard functionality
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          showToast(`Copied "${textToCopy}" to clipboard!`);
        } catch (err) {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }
      }
    });
  });

  // 6. Research Modal
  const researchModal = document.getElementById('researchModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const researchPapers = {
    internet: {
      badge: "Macroeconomics & Digital Policy",
      title: "An Investigation into Existing and Potential Economic Impacts of Internet Restrictions",
      author: "Alexandru Mihalcea-Calinescu",
      sections: [
        {
          heading: "Abstract & Context",
          text: "In an increasingly interconnected global economy, internet availability serves as essential capital infrastructure for international trade, commerce, and knowledge dissemination. This paper evaluates the quantitative and qualitative consequences of state-level network restrictions, shutdown events, and digital fragmentation on gross domestic product (GDP), entrepreneurial activity, and investor confidence."
        },
        {
          heading: "Key Methodological Findings",
          text: "Synthesizing cross-national economic disruption datasets with macroeconomic gravity trade models, the study highlights how recurring digital throttling increases search and transaction costs, stifles foreign direct investment (FDI), and disproportionately penalizes micro, small, and medium enterprises (MSMEs) dependent on global payment rails."
        },
        {
          heading: "Policy & Economic Takeaways",
          text: "The paper proposes that open internet infrastructure is not merely a social utility but a foundational macroeconomic asset. Policymakers face significant deadweight economic loss when implementing digital barriers, with long-term technological divergence outpacing short-term regulatory objectives."
        }
      ]
    },
    dyslexia: {
      badge: "Assistive Technology & Cognitive Science",
      title: "To What Extent Can Playing an Educational Game Help People Struggling with Dyslexia?",
      author: "Alexandru Mihalcea-Calinescu",
      sections: [
        {
          heading: "Abstract & Background",
          text: "Developmental dyslexia affects phonological processing, working memory, and lexical retrieval. This paper explores human-computer interaction (HCI) paradigms and gamified pedagogical mechanics designed to augment standard multisensory remedial programs for individuals experiencing dyslexia."
        },
        {
          heading: "Neurocognitive & Gameplay Analysis",
          text: "By examining targeted spatial-temporal game loops, adaptive typographic rendering (such as OpenDyslexic and specialized letter spacing), and real-time auditory feedback loops, the study assesses cognitive neuroplasticity gains across phoneme-grapheme mapping and visual tracking endurance."
        },
        {
          heading: "Results & Recommendations",
          text: "Results show that structured gamified intervention significantly mitigates reading avoidance behavior, reinforces cognitive stamina, and provides scalable non-stigmatizing tools for classroom and home educational environments."
        }
      ]
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const paperKey = btn.getAttribute('data-paper');
      const data = researchPapers[paperKey];

      if (data && modalContent && researchModal) {
        let sectionsHTML = data.sections.map(sec => `
          <div class="modal-section">
            <h4>${sec.heading}</h4>
            <p>${sec.text}</p>
          </div>
        `).join('');

        modalContent.innerHTML = `
          <span class="modal-header-badge">${data.badge}</span>
          <h3 class="modal-article-title">${data.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">By <strong>${data.author}</strong></p>
          ${sectionsHTML}
        `;

        researchModal.classList.add('open');
        researchModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  const closeModal = () => {
    if (researchModal) {
      researchModal.classList.remove('open');
      researchModal.setAttribute('aria-hidden', 'true');
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (researchModal) {
    researchModal.addEventListener('click', (e) => {
      if (e.target === researchModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && researchModal && researchModal.classList.contains('open')) {
      closeModal();
    }
  });

  // 7. Contact Form Simulation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const subject = document.getElementById('messageSubject').value;

      showToast(`Thank you, ${name}! Your inquiry "${subject}" has been drafted.`);
      contactForm.reset();
    });
  }

  // 8. Toast Helper
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 9. Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
});
