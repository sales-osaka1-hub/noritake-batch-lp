(function(){
  /* video: one button toggles play / pause; chapters seek */
  var v=document.getElementById('vid'), p=document.getElementById('player'), btn=document.getElementById('playbtn'),
      ico=document.getElementById('ico'), prog=document.getElementById('prog');
  var PLAY='M7 4.5v15l12-7.5z', PAUSE='M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z';
  var chaps=[].slice.call(document.querySelectorAll('.chap button'));
  function sync(){var on=!v.paused&&!v.ended; p.classList.toggle('on',on); ico.setAttribute('d',on?PAUSE:PLAY);
    btn.setAttribute('aria-label',on?'紹介動画を一時停止':'紹介動画を再生');}
  function play(){var r=v.play(); if(r&&r.catch) r.catch(function(){sync();});}
  if(v&&btn){
    btn.addEventListener('click',function(){ if(v.paused||v.ended) play(); else v.pause(); });
    ['play','pause','ended'].forEach(function(e){v.addEventListener(e,sync);});
    v.addEventListener('timeupdate',function(){
      if(v.duration) prog.style.width=(v.currentTime/v.duration*100)+'%';
      var cur=null; chaps.forEach(function(b){ if(v.currentTime+0.05>=parseFloat(b.dataset.t)) cur=b; });
      chaps.forEach(function(b){ b.setAttribute('aria-current', b===cur && v.currentTime>0 ? 'true':'false'); });
    });
    v.addEventListener('ended',function(){v.currentTime=0; prog.style.width='0';});
    chaps.forEach(function(b){ b.addEventListener('click',function(){ v.currentTime=parseFloat(b.dataset.t); play(); }); });
  }
  var tz=document.getElementById('teaser');
  if(tz&&v){ tz.addEventListener('click',function(){ setTimeout(play,450); }); }
  /* ratio ledger: production quantity example */
  [].forEach.call(document.querySelectorAll('.tabs button'),function(t,i,all){
    t.addEventListener('click',function(){
      [].forEach.call(all,function(x){x.classList.toggle('on',x===t);});
      var q=parseFloat(t.dataset.q);
      [].forEach.call(document.querySelectorAll('#res dd'),function(d){ d.textContent=(q*parseFloat(d.dataset.r)/100)+' kg'; });
    });
  });
  /* disabled CTA placeholder */
  [].forEach.call(document.querySelectorAll('a[aria-disabled="true"]'),function(a){a.addEventListener('click',function(e){e.preventDefault();});});
  /* phone bar: after first view, hidden at contact */
  var bar=document.getElementById('bar'), fv=document.querySelector('.hero'), cta=document.getElementById('cta');
  if(!bar||!fv||!('IntersectionObserver' in window)){ if(bar) bar.classList.add('on'); return; }
  var h=true,c=false; function upd(){bar.classList.toggle('on',!h&&!c);}
  new IntersectionObserver(function(e){h=e[0].isIntersecting; upd();},{rootMargin:'0px 0px -35% 0px'}).observe(fv);
  new IntersectionObserver(function(e){c=e[0].isIntersecting; upd();}).observe(cta);
})();
