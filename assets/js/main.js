(()=>{
  const nav=document.getElementById('siteNav');
  const btn=document.getElementById('menuBtn');
  btn?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow=open?'hidden':'';
  });
  document.querySelectorAll('.nav-list a').forEach(a=>a.addEventListener('click',()=>{
    nav?.classList.remove('open');
    btn?.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
  }));
  if(nav?.classList.contains('home-nav')){
    const set=()=>nav.classList.toggle('scrolled',window.scrollY>40);
    set();
    window.addEventListener('scroll',set,{passive:true});
  }
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  const slides=[...document.querySelectorAll('.slide')];
  const btns=[...document.querySelectorAll('.slide-btn')];
  if(slides.length&&btns.length){
    let current=0,timer;
    const show=i=>{
      slides[current].classList.remove('active');btns[current].classList.remove('active');
      current=i;slides[current].classList.add('active');btns[current].classList.add('active');
      clearTimeout(timer);timer=setTimeout(()=>show((current+1)%slides.length),6000);
    };
    btns.forEach((b,i)=>b.addEventListener('click',()=>show(i)));
    show(0);
  }
})();
