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

  // 5. Copy to Clipboard functionality with button state animation
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
        } catch (err) {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        showToast(`Copied "${textToCopy}" to clipboard!`);

        // Button visual feedback
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
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
      badge: "EPQ (A Level) · Grade A",
      title: "An Investigation into Existing and Potential Economic Impacts of Internet Restrictions",
      author: "Alexandru Mihalcea-Calinescu",
      pdfUrl: "docs/EPQ_Internet_Restrictions.pdf",
      sections: [
        {
          heading: "Core Research Questions & Scope",
          text: "This paper evaluates intentional government-sanctioned internet shutdowns across Russia, Sudan, Iran, Bangladesh, India, and China by addressing three key variables: the extent of the restriction (population and industries affected), the nature and motivation (warfare, political suppression, protectionism), and the severity (full blackouts vs. 2G throttling vs. selective service bans)."
        },
        {
          heading: "Key Empirical Case Studies",
          text: "• Bangladesh (July 2024): The 5-day blackout caused $1.2B in economic losses. Crucially, the biggest casualty was the non-digital garment export sector, proving that physical manufacturing and supply chains suffer immense damage. In addition, e-commerce and f-commerce lost $5M/day, call centers lost $3M/day risking international client outsourcing, and banks incurred interest penalties on delayed settlements.<br><br>• Iran (2022–2023): A 17-month social media ban and intermittent blackouts cost $1.6B ($1.5M/hour). Digital payment volume through gateways like Zibal and Zarin Pal dropped 55–60%. The Instagram ban alone closed over 500,000 small businesses, impacting 1M people directly and 8M indirectly, sparking structural unemployment.<br><br>• India (Kashmir 2019–2021): A 500-day 4G shutdown throttled speeds to 2G, rendering data virtually useless. The Travel Association of Kashmir reported severe destruction to the tourism economy, and local online delivery platforms (KartFood, Kashmiri Box) folded. Crucially, NREGA workers (100M rural households, 58% women) could not receive wages or work because government attendance required online geotagged photos twice a day. Residents had to board trains to Banihal just for 5 minutes of connectivity to submit official documents and tender bids.<br><br>• Sudan (Feb 2024): The Rapid Support Forces (RSF) and Sudanese Armed Forces (SAF) seized ISPs during the civil war, cutting off 4.8 million people for 212 hours. Paralyzed e-wallets and wire transfers in a cash-starved economy, inflicting irreversible setbacks on the growing tertiary/services sector.<br><br>• Russia: Disconnection tests for sovereign 'RuNet' seeking physical network separation. Evaluates domestic substitution (e.g. VK) vs. lack of competition, innovation stagnation, and an estimated $12.14B in 30-day blackout damages under the COST model.<br><br>• China: The Great Firewall operates as a porous protectionist filter that fostered domestic champions (Alibaba, Tencent, Baidu) and forced Apple into a $1B domestic investment, but imposes huge government overhead (2 million thought-police monitors), startup ambiguity, and risk of scientific brain drain due to blocked global research platforms."
        },
        {
          heading: "Evaluation of the NetBlocks / Brookings COST Tool",
          text: "The paper analyzes the NetBlocks / Brookings Cost of Shutdown Tool (COST). While effective for estimating digital economy disruption, the model has significant blind spots: it severely underestimates losses in developing economies because it fails to capture indirect hits to non-digital sectors like agriculture, garment manufacturing, transport logistics, and contractual labor wages that must be paid regardless of outages."
        }
      ]
    },
    dyslexia: {
      badge: "HPQ · Grade A · Unity3D & C#",
      title: ".XIA: To What Extent Can Playing an Educational Game Help People Struggling with Dyslexia?",
      author: "Alexandru Mihalcea-Calinescu (with Tudor Bunescu & Andrei Ghigea)",
      pdfUrl: "https://alex20137.github.io/portfolio/docs/HPQ_Dyslexia_Educational_Game.pdf",
      buildsUrl: "https://alex20137.github.io/portfolio/docs/Builds.zip",
      videoUrl: "https://alex20137.github.io/portfolio/docs/XIA_Gameplay_Demo.mp4",
      sections: [
        {
          heading: "Problem & Educational Premise",
          text: "Traditional literacy and spelling drills often induce boredom and reading avoidance in children with dyslexia. The project was designed to explore how an intuitive, lightweight educational game can maintain high engagement and support spelling recall through low-stress interactive mechanics."
        },
        {
          heading: "Game Mechanics & Learning Payload",
          text: "Built in Unity3D using compiled C#. The game adapts Flappy Bird flight controls (using spacebar or touch controls to navigate between obstacles). Checkpoints deliver a learning payload: the algorithm pulls a word from an array of 496 common 5-letter words, splices the word into individual scrambled letter tiles, and prompts the child to drag and drop the tiles into the correct sequence. The algorithm validates the spelling before allowing the player to advance. High score tracking is saved on Game Over screens to motivate self-improvement."
        },
        {
          heading: "Dyslexia-Focused UI & Cognitive Design",
          text: "• Color Ergonomics: Warm yellow-to-orange background gradient and yellow icon frames were chosen based on ACM SIGACCESS 2017 research by Luz Rello & Jeffrey Bigham ('Good Background Colors for Readers'), helping dyslexic readers perceive text more easily while mitigating blue-light circadian disruption.<br><br>• Visual Contrast: A bright blue bird sprite provides high visual contrast against the warm scene.<br><br>• Letter Tiles: Scrabble-style letter tiles with drag-and-drop mechanics reduce technical supervision and cognitive overhead.<br><br>• Calming Audio: Uses a low-volume royalty-free instrumental soundtrack (classical pop) to calm players and enhance concentration, paired with gentle parallax background scrolling.<br><br>• Performance: Written in compiled C# in Unity3D for smooth framerates on lower-spec hardware."
        }
      ]
    },
    focusaid: {
      badge: "BAINSA Hackathon 2026 · AI & Next.js",
      title: "FocusAid: Real-Time In-Browser AI Learning Accessibility Platform",
      author: "Alexandru Mihalcea-Calinescu & Hackathon Team",
      githubUrl: "https://github.com/AurelianVIII/BAINSA-Hackathon-2026",
      sections: [
        {
          heading: "Problem & Accessibility Mission",
          text: "Students with attention difficulties, auditory processing challenges, or cognitive fatigue often fall behind during live or recorded lectures. FocusAid acts as an intelligent accessibility bridge by identifying moments when a student is distracted or confused and providing frictionless catch-up tools."
        },
        {
          heading: "Privacy-Preserving Edge AI & Face Tracking",
          text: "Educational environments demand zero surveillance risk. FocusAid uses Google MediaPipe (tasks-vision) to run facial landmark and gaze orientation tracking entirely client-side. No webcam video feeds or biometric vectors ever leave the student's browser. Attention dips generate non-punitive timeline recovery markers."
        },
        {
          heading: "WebGPU Local LLMs & 'Catch Me Up' Engine",
          text: "Integrates on-device LLM inference via WebGPU using <code>@mlc-ai/web-llm</code>. When students tap 'Catch Me Up', the local model reads timestamped caption transcript embeddings to produce concise, third-person summaries of missed concepts, freeing students from taking exhaustive notes while listening."
        },
        {
          heading: "Full-Stack Implementation & Repository",
          text: "Engineered with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS with atomic components, attention timeline scoring algorithms, and robust edge-case guards.<br><br>Inspect the complete open-source implementation and codebase directly on GitHub: <a href='https://github.com/AurelianVIII/BAINSA-Hackathon-2026' target='_blank' rel='noopener noreferrer' style='color: var(--accent-secondary); text-decoration: underline;'>github.com/AurelianVIII/BAINSA-Hackathon-2026</a>."
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

        let actionButtonsHTML = '';
        if (data.pdfUrl) {
          actionButtonsHTML += `
            <a href="${data.pdfUrl}" target="_blank" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Read Full Essay (PDF)</span>
            </a>`;
        }
        if (data.githubUrl) {
          actionButtonsHTML += `
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <span>View Repository on GitHub</span>
            </a>`;
        }
        if (data.buildsUrl) {
          actionButtonsHTML += `
            <a href="${data.buildsUrl}" download class="btn btn-outline" style="padding: 8px 16px; font-size: 0.85rem;">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Download Builds.zip (Mac &amp; Win)</span>
            </a>`;
        }

        let attachmentsHTML = `
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
            ${actionButtonsHTML}
          </div>
          ${data.videoUrl ? `
          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 8px; color: var(--accent-secondary);">Gameplay Demo Video</h4>
            <video controls playsinline preload="metadata" style="width: 100%; max-height: 420px; border-radius: 12px; border: 1px solid var(--border-color); background: #000;">
              <source src="${data.videoUrl}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>` : ''}
        `;

        modalContent.innerHTML = `
          <span class="modal-header-badge">${data.badge}</span>
          <h3 class="modal-article-title">${data.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">By <strong>${data.author}</strong></p>
          ${attachmentsHTML}
          ${sectionsHTML}
        `;

        researchModal.classList.add('open');
        researchModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  const closeModal = () => {
    if (researchModal) {
      const video = researchModal.querySelector('video');
      if (video) video.pause();
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

  // 10. Reading Progress Indicator
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const progress = (window.pageYOffset / scrollTotal) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // 11. Floating Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 12. Interactive Mouse Spotlight on Cards
  const interactiveCards = document.querySelectorAll('.card, .metric-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 13. Metric Stat Count-Up Animation
  const metricsSection = document.querySelector('.metrics-grid');
  if (metricsSection && 'IntersectionObserver' in window) {
    let animated = false;
    const animateCounter = () => {
      const metricValues = document.querySelectorAll('.metric-value');
      metricValues.forEach(valEl => {
        const text = valEl.textContent.trim();
        const match = text.match(/^(\d+)(.*)$/);
        if (match && parseInt(match[1], 10) >= 100) {
          const targetNum = parseInt(match[1], 10);
          const suffix = match[2] || '';
          const duration = 1200;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.floor(easeOut * targetNum);
            valEl.textContent = `${currentNum}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              valEl.textContent = `${targetNum}${suffix}`;
            }
          };
          requestAnimationFrame(updateCounter);
        }
      });
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounter();
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(metricsSection);
  }

  // 14. Subtle Scroll Reveal Animations
  if ('IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll('.section-header, .timeline-item, .research-card, .edu-card, .activity-card, .pillar-card, .skills-column, .contact-card');
    revealTargets.forEach(el => el.classList.add('reveal-item'));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  // 15. Custom Interactive Cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
        isVisible = true;
      }

      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      isVisible = false;
    });

    window.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
      isVisible = true;
    });

    // Smooth lerp loop for the outer cursor ring
    const renderCursor = () => {
      if (isVisible) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Interactive element hover state
    const interactiveSelectors = 'a, button, input, textarea, .card, .chip, .metric-card, .filter-btn, .lang-card, [role="button"]';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });
  }
});
