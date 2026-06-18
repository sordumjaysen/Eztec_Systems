// Immediate theme initialization
(function() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
})();

// Scroll reveal
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:0.1});
document.querySelectorAll('.reveal,.stag').forEach(el=>obs.observe(el));

// Navbar scroll effect
const nb=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  if(window.scrollY>60){nb.classList.add('scrolled')}
  else{nb.classList.remove('scrolled')}
});

// Slideshow
let slideIdx=0;
const slides=document.querySelectorAll('.hslide');
const dots=document.querySelectorAll('.hdot');
const hcaption=document.getElementById('hslide-caption');
const slideCaptions=[
  "Connected platforms, unified growth",
  "AI-powered market intelligence",
  "Digitizing local retail & daily trade",
  "Engineered for West African nuances",
  "Connecting verified regional talent"
];
function goSlide(n){
  slides[slideIdx].classList.remove('active');
  dots[slideIdx].classList.remove('active');
  slideIdx=n;
  slides[slideIdx].classList.add('active');
  dots[slideIdx].classList.add('active');
  if(hcaption && slideCaptions[n]){
    hcaption.textContent=slideCaptions[n];
  }
}
function nextSlide(){goSlide((slideIdx+1)%slides.length)}
let slideTimer=setInterval(nextSlide,4500);
dots.forEach((d,i)=>d.addEventListener('click',()=>{clearInterval(slideTimer);goSlide(i);slideTimer=setInterval(nextSlide,4500)}));

// Hero entrance & text rotator
window.addEventListener('DOMContentLoaded',()=>{
  const hc=document.getElementById('hcontent');
  if(hc) {
    hc.style.cssText='opacity:0;transform:translateY(36px)';
    setTimeout(()=>{
      hc.style.cssText='opacity:1;transform:translateY(0);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)';
    },100);
  }

  // Dynamic text rotator
  const rotateEl=document.getElementById('rotator-text');
  if(rotateEl){
    const words=["In West Africa.","In Business.","In Real Estate.","In Digital Talent."];
    let idx=0;
    
    setInterval(()=>{
      // Slide out current word
      rotateEl.classList.add('swap-out');
      
      setTimeout(()=>{
        // Change text content and prepare to slide in
        idx=(idx+1)%words.length;
        rotateEl.textContent=words[idx];
        rotateEl.classList.remove('swap-out');
        rotateEl.classList.add('swap-in');
        
        // Force reflow
        rotateEl.offsetHeight;
        
        // Slide in new word
        rotateEl.classList.remove('swap-in');
      },500); // matches the 0.5s CSS transition
    },4000); // changes every 4 seconds
  }

  // Community Section Slideshow (Mobile Viewports <= 640px)
  const commImgs = document.querySelectorAll('.people-imgs .ppl-img');
  if (commImgs.length > 0) {
    let commIdx = 0;
    setInterval(() => {
      if (window.innerWidth <= 640) {
        commImgs[commIdx].classList.remove('active');
        commIdx = (commIdx + 1) % commImgs.length;
        commImgs[commIdx].classList.add('active');
      }
    }, 3500); // cycle every 3.5 seconds
  }
});

// Mobile nav
function toggleNav(){
  const mn=document.getElementById('mobilenav');
  mn.classList.toggle('open');
  if(mn.classList.contains('open')){
    document.body.style.overflow='hidden';
  } else {
    document.body.style.overflow='';
  }
}
function closeNav(){
  document.getElementById('mobilenav').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('click',e=>{
  const mn=document.getElementById('mobilenav');
  const hb=document.getElementById('hbtn');
  if(mn && hb && !mn.contains(e.target)&&e.target!==hb&&mn.classList.contains('open')){
    mn.classList.remove('open');
    document.body.style.overflow='';
  }
});

// ── Contact Modal Logic ──
function openContactModal(subjectText) {
  const modal = document.getElementById('contact-modal');
  const subjectInput = document.getElementById('form-subject');
  const subjectHidden = document.getElementById('form-subject-hidden');
  
  if (subjectText) {
    subjectInput.value = subjectText;
    subjectHidden.value = subjectText;
  } else {
    subjectInput.value = 'General Inquiry';
    subjectHidden.value = 'General Inquiry';
  }
  
  // Reset form states
  document.getElementById('contact-form').style.display = 'block';
  document.querySelector('.modal-success-state').style.display = 'none';
  document.getElementById('contact-form').reset();
  
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  // Bind click handlers to contact links
  document.body.addEventListener('click', e => {
    const target = e.target.closest('a');
    if (!target) return;
    
    const href = target.getAttribute('href');
    if (!href) return;
    
    if (href.startsWith('mailto:hello@eztecsystems.com') || href === '#contact' || href === 'index.html#contact' || target.classList.contains('navcta')) {
      e.preventDefault();
      
      let subject = '';
      if (href.includes('subject=')) {
        const match = href.match(/subject=([^&]+)/);
        if (match) {
          subject = decodeURIComponent(match[1]);
        }
      }
      
      if (subject === 'Nigeria Operations') subject = 'Nigeria Operations Enquiry';
      if (subject === 'Benin Operations') subject = 'Benin Operations Enquiry';
      if (subject === 'Partnership Inquiry') subject = 'Partnerships Enquiry';
      
      openContactModal(subject);
    }
  });

  const modal = document.getElementById('contact-modal');
  if (modal) {
    document.getElementById('close-modal').addEventListener('click', closeContactModal);
    document.getElementById('success-close-btn').addEventListener('click', closeContactModal);
    
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeContactModal();
      }
    });
    
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeContactModal();
      }
    });
    
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const spinner = submitBtn.querySelector('.spinner');
    const btnText = submitBtn.querySelector('span');
    const successState = document.querySelector('.modal-success-state');
    
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      document.getElementById('form-subject-hidden').value = document.getElementById('form-subject').value;
      
      submitBtn.disabled = true;
      spinner.style.display = 'block';
      btnText.textContent = 'Sending...';
      
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      
      fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          form.style.display = 'none';
          successState.style.display = 'block';
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Oops! There was a problem sending your message. Please try emailing hello@eztecsystems.com directly.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        spinner.style.display = 'none';
        btnText.textContent = 'Send Message';
      });
    });
  }
});

// ── Products Stack Slideshow Logic ──
let stackIndices = [0, 1, 2, 3];
let isAnimating = false;
let autoPlayTimer = null;
const autoPlayDelay = 6000; // 6 seconds auto transition

function rotateStackNext() {
  if (isAnimating) return;
  isAnimating = true;
  
  resetAutoPlay();
  
  const cards = document.querySelectorAll('.pstack-card');
  const activeCardIdx = stackIndices[0];
  const activeCard = cards[activeCardIdx];
  
  // Slide out the top card
  activeCard.classList.add('slide-out');
  
  setTimeout(() => {
    // Reorder indices: take index 0 and push it to the end
    const top = stackIndices.shift();
    stackIndices.push(top);
    
    // Reapply classes
    cards.forEach((card, idx) => {
      const position = stackIndices.indexOf(idx);
      card.classList.remove('layer-0', 'layer-1', 'layer-2', 'layer-3');
      card.classList.add(`layer-${position}`);
    });
    
    // Reset the slide-out class so it settles back in at the bottom
    activeCard.classList.remove('slide-out');
    
    updateStackTabs();
    
    isAnimating = false;
    startAutoPlay();
  }, 600);
}

function rotateStackPrev() {
  if (isAnimating) return;
  isAnimating = true;
  
  resetAutoPlay();
  
  const cards = document.querySelectorAll('.pstack-card');
  
  // Shift indices backwards
  const bottom = stackIndices.pop();
  stackIndices.unshift(bottom);
  
  const incomingCard = cards[bottom];
  
  // Disable transition momentarily to position off-screen
  incomingCard.style.transition = 'none';
  incomingCard.classList.remove('layer-0', 'layer-1', 'layer-2', 'layer-3');
  incomingCard.style.transform = 'translate(-120%, -40px) scale(0.95) rotate(-8deg)';
  incomingCard.style.opacity = '0';
  
  // Force layout reflow
  incomingCard.offsetHeight;
  
  // Re-enable transition
  incomingCard.style.transition = '';
  
  cards.forEach((card, idx) => {
    const position = stackIndices.indexOf(idx);
    card.classList.remove('layer-0', 'layer-1', 'layer-2', 'layer-3');
    card.classList.add(`layer-${position}`);
    if (idx === bottom) {
      incomingCard.style.transform = '';
      incomingCard.style.opacity = '';
    }
  });
  
  updateStackTabs();
  
  setTimeout(() => {
    isAnimating = false;
    startAutoPlay();
  }, 600);
}

function goToStackSlide(targetIdx) {
  if (isAnimating) return;
  
  const steps = stackIndices.indexOf(targetIdx);
  if (steps === 0) return;
  
  resetAutoPlay();
  isAnimating = true;
  
  const cards = document.querySelectorAll('.pstack-card');
  
  for (let i = 0; i < steps; i++) {
    const top = stackIndices.shift();
    stackIndices.push(top);
  }
  
  cards.forEach((card, idx) => {
    const position = stackIndices.indexOf(idx);
    card.classList.remove('layer-0', 'layer-1', 'layer-2', 'layer-3');
    card.classList.add(`layer-${position}`);
  });
  
  updateStackTabs();
  
  setTimeout(() => {
    isAnimating = false;
    startAutoPlay();
  }, 300);
}

function updateStackTabs() {
  const tabs = document.querySelectorAll('.pstack-tab');
  if (tabs.length === 0) return;
  const currentActiveIdx = stackIndices[0];
  
  tabs.forEach((tab, idx) => {
    tab.classList.toggle('active', idx === currentActiveIdx);
  });

  // Smoothly scroll active tab into view on mobile
  const activeTab = tabs[currentActiveIdx];
  if (activeTab && window.innerWidth <= 900) {
    const sidebar = document.querySelector('.pstack-sidebar');
    if (sidebar) {
      // Calculate scroll offset to center the tab
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      const sidebarWidth = sidebar.offsetWidth;
      sidebar.scrollTo({
        left: tabLeft - (sidebarWidth / 2) + (tabWidth / 2),
        behavior: 'smooth'
      });
    }
  }
  
  // Reset all progress bars
  const progressBars = document.querySelectorAll('.ptab-progress');
  progressBars.forEach(bar => {
    bar.style.transition = 'none';
    bar.style.width = '0%';
  });
  
  // Start progress bar animation for active tab
  setTimeout(() => {
    const activeBar = document.querySelector('.pstack-tab.active .ptab-progress');
    if (activeBar) {
      activeBar.style.transition = 'width 6000ms linear';
      activeBar.style.width = '100%';
    }
  }, 50);
}

function startAutoPlay() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(rotateStackNext, autoPlayDelay);
}

function resetAutoPlay() {
  clearInterval(autoPlayTimer);
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.pstack-container');
  if (container) {
    // Click on top card rotates stack
    container.addEventListener('click', e => {
      const card = e.target.closest('.pstack-card');
      if (card && card.classList.contains('layer-0') && !e.target.closest('a') && !e.target.closest('button')) {
        rotateStackNext();
      }
    });
    
    // Bind navigation buttons
    const nextBtn = document.querySelector('.pstack-btn.next');
    const prevBtn = document.querySelector('.pstack-btn.prev');
    if (nextBtn) nextBtn.addEventListener('click', rotateStackNext);
    if (prevBtn) prevBtn.addEventListener('click', rotateStackPrev);
    
    // Bind sidebar tabs
    const tabs = document.querySelectorAll('.pstack-tab');
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        goToStackSlide(index);
      });
    });
    
    // Initial active states and progress bar setup
    updateStackTabs();
    
    // Initialize auto play
    startAutoPlay();
  }
});

// ── Theme Toggle Event Listeners ──
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    // Sync current theme state to the toggle button icon
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    themeBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    
    themeBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', activeTheme);
      themeBtn.textContent = activeTheme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('theme', activeTheme);
    });
  }
});

// ── Careers Headline text rotator ──
document.addEventListener('DOMContentLoaded', () => {
  const rotator = document.getElementById('rotator');
  const words = document.querySelectorAll('.rotate-text span');
  if (rotator && words.length > 0) {
    let current = 0;
    setInterval(() => {
      current++;
      rotator.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      rotator.style.transform = `translateY(-${current * 1.05}em)`;
      
      if (current === words.length - 1) {
        setTimeout(() => {
          rotator.style.transition = 'none';
          current = 0;
          rotator.style.transform = 'translateY(0)';
        }, 600); // matches the 0.6s transition
      }
    }, 2200);
  }
});

// ── Careers Hero entrance animations ──
document.addEventListener('DOMContentLoaded', () => {
  const hl = document.getElementById('hero-left');
  const hr = document.getElementById('hero-right');
  if (hl || hr) {
    setTimeout(() => {
      if (hl) hl.classList.add('in');
      setTimeout(() => {
        if (hr) hr.classList.add('in');
      }, 200);
    }, 100);
  }
});