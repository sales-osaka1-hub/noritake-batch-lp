(function(){
  function to(id){var el=document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth',block:'start'});}
  [].forEach.call(document.querySelectorAll('.js-cta'),function(b){b.addEventListener('click',function(){to('cta');});});
  [].forEach.call(document.querySelectorAll('.js-sub'),function(b){b.addEventListener('click',function(){to('cta');});});
  /* video: one button toggles play / pause */
  var v=document.getElementById('vid'), p=document.getElementById('player'), btn=document.getElementById('playbtn'),
      ico=document.getElementById('ico'), prog=document.getElementById('prog'), tm=document.getElementById('tm');
  var PLAY='M7 4.5v15l12-7.5z', PAUSE='M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z';
  function fmt(s){s=Math.max(0,Math.floor(s||0)); return Math.floor(s/60)+':'+('0'+s%60).slice(-2);}
  function sync(){var on=!v.paused&&!v.ended; p.classList.toggle('on',on); ico.setAttribute('d',on?PAUSE:PLAY);
    btn.setAttribute('aria-label',on?'紹介動画を一時停止':'紹介動画を再生');}
  function toggle(){ if(v.paused||v.ended){var r=v.play(); if(r&&r.catch) r.catch(function(){sync();});} else v.pause(); }
  if(v&&btn){
    btn.addEventListener('click',toggle);
    ['play','pause','ended'].forEach(function(e){v.addEventListener(e,sync);});
    v.addEventListener('timeupdate',function(){ if(v.duration){prog.style.width=(v.currentTime/v.duration*100)+'%'; tm.textContent=fmt(v.currentTime)+' / '+fmt(v.duration);} });
    v.addEventListener('ended',function(){v.currentTime=0; prog.style.width='0';});
  }
  /* phone bar */
  var bar=document.getElementById('bar'), hero=document.querySelector('.hero'), cta=document.getElementById('cta');
  if(!bar||!hero||!('IntersectionObserver' in window)){ if(bar) bar.classList.add('on'); return; }
  var h=true,c=false; function upd(){bar.classList.toggle('on',!h&&!c);}
  new IntersectionObserver(function(e){h=e[0].isIntersecting; upd();},{rootMargin:'0px 0px -35% 0px'}).observe(hero);
  new IntersectionObserver(function(e){c=e[0].isIntersecting; upd();}).observe(cta);
})();
