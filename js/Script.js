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
function goSlide(n){
  slides[slideIdx].classList.remove('active');
  dots[slideIdx].classList.remove('active');
  slideIdx=n;
  slides[slideIdx].classList.add('active');
  dots[slideIdx].classList.add('active');
}
function nextSlide(){goSlide((slideIdx+1)%slides.length)}
let slideTimer=setInterval(nextSlide,4500);
dots.forEach((d,i)=>d.addEventListener('click',()=>{clearInterval(slideTimer);goSlide(i);slideTimer=setInterval(nextSlide,4500)}));

// Hero entrance
window.addEventListener('DOMContentLoaded',()=>{
  const hc=document.getElementById('hcontent');
  hc.style.cssText='opacity:0;transform:translateY(36px)';
  setTimeout(()=>{
    hc.style.cssText='opacity:1;transform:translateY(0);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)';
  },100);
});

// Mobile nav
function toggleNav(){document.getElementById('mobilenav').classList.toggle('open')}
function closeNav(){document.getElementById('mobilenav').classList.remove('open')}
document.addEventListener('click',e=>{
  const mn=document.getElementById('mobilenav');
  const hb=document.getElementById('hbtn');
  if(!mn.contains(e.target)&&e.target!==hb)mn.classList.remove('open');
});