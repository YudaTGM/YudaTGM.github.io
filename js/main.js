document.getElementById('yr').textContent=new Date().getFullYear();

/* ===== GALERI OTOMATIS =====
   Setiap subfolder di /gallery jadi satu album. Cukup upload foto ke folder itu,
   atau buat folder baru, lalu website langsung menampilkannya.
   Owner & repo terdeteksi otomatis dari URL github.io. Isi manual kalau pakai domain sendiri. */
const OWNER = '', REPO = '';
const owner = OWNER || location.hostname.split('.')[0];
const repo = REPO || (location.pathname.split('/')[1] || location.hostname.split('.')[0] + '.github.io');
const api = p => `https://api.github.com/repos/${owner}/${repo}/contents/${p}`;
const isImg = n => /\.(jpe?g|png|webp|gif|avif)$/i.test(n);
const pretty = s => s.replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
const $ = id => document.getElementById(id);
const IG_REELS = []; // isi kode reel Instagram, contoh: ['C1abcDEfgh2']
const isVid = n => /\.(mp4|webm|mov)$/i.test(n);
async function loadMedia(){
  const v=$('vids');
  try{
    (await list('assets/video')).filter(f=>f.type==='file'&&isVid(f.name)).forEach(f=>{
      v.insertAdjacentHTML('beforeend',`<video controls preload="metadata" src="${f.download_url}"></video>`);
    });
  }catch(e){v.insertAdjacentHTML('beforeend','<video controls preload="metadata" src="assets/video/porto1editing.mp4"></video>');}
  IG_REELS.forEach(c=>v.insertAdjacentHTML('beforeend',`<iframe class="ig" height="560" src="https://www.instagram.com/reel/${c}/embed" allowfullscreen loading="lazy"></iframe>`));
  try{
    const im=(await list('assets/proses-editing')).filter(f=>f.type==='file'&&isImg(f.name));
    if(im.length){$('procwrap').style.display='';$('proc').innerHTML=im.map(f=>`<img data-zoom loading="lazy" src="${f.download_url}" alt="Proses editing">`).join('');}
  }catch(e){}
}
loadMedia();
(function(){
  const track=$('track'),n=track.children.length-1;let i=0;
  track.addEventListener('transitionend',()=>{if(i>=n){track.style.transition='none';i=0;track.style.transform='translateX(0)';}});
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(()=>{i++;track.style.transition='transform .9s ease';track.style.transform='translateX(-'+i*100+'%)';},5000);
  const hero=$('hero'),fades=[...document.querySelectorAll('.fade')],cl=x=>Math.max(0,Math.min(1,x));
  function onScroll(){
    const vh=innerHeight,o=cl(1-scrollY/(vh*.7));
    hero.style.opacity=o;hero.style.pointerEvents=o<.3?'none':'auto';hero.style.visibility=o===0?'hidden':'visible';
    fades.forEach(el=>{const f=cl((vh*.95-el.getBoundingClientRect().top)/(vh*.35));el.style.opacity=f;el.style.pointerEvents=f<.3?'none':'auto';});
  }
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
})();
async function loadCerts(){
  try{
    const root=await list('sertifikat'),g=[{name:'',files:root.filter(f=>f.type==='file')}];
    for(const d of root.filter(x=>x.type==='dir'))g.push({name:d.name,files:(await list('sertifikat/'+d.name)).filter(f=>f.type==='file')});
    const nm=f=>pretty(f.name.replace(/\.\w+$/,'')),
      card=f=>isImg(f.name)?`<img data-zoom loading="lazy" src="${f.download_url}" alt="${nm(f)}">`:/\.pdf$/i.test(f.name)?`<a class="card pdfc" href="${f.download_url}" target="_blank" rel="noopener">📄 ${nm(f)}</a>`:'';
    const html=g.filter(x=>x.files.some(f=>card(f))).map(x=>(x.name?`<h3 class="sub">${pretty(x.name)}</h3>`:'')+`<div class="grid cgrid">${x.files.map(card).join('')}</div>`).join('');
    if(html){$('certs').innerHTML=html;$('sertifikat').style.display='';}
  }catch(e){}
}
loadCerts();
const bg=$('burger'),lk=$('links');
bg.onclick=()=>{const o=lk.classList.toggle('open');bg.textContent=o?'✕':'☰';bg.setAttribute('aria-expanded',o);};
lk.addEventListener('click',e=>{if(e.target.tagName==='A'){lk.classList.remove('open');bg.textContent='☰';bg.setAttribute('aria-expanded','false');}});
const tg=$('tg'),root=document.documentElement;
const paint=()=>{tg.textContent=root.dataset.theme==='dark'?'☀️ Terang':'🌙 Gelap';};
tg.onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}paint();};
paint();

async function list(p){const r=await fetch(api(p));if(!r.ok)throw new Error(r.status);return r.json();}

async function loadAlbums(){
  try{
    const dirs=(await list('gallery')).filter(x=>x.type==='dir');
    const albums=await Promise.all(dirs.map(async d=>({name:d.name,imgs:(await list('gallery/'+d.name)).filter(f=>f.type==='file'&&isImg(f.name))})));
    $('albums').innerHTML='';
    albums.forEach(a=>{
      const el=document.createElement('div');el.className='card album';
      el.innerHTML=(a.imgs[0]?`<img loading="lazy" src="${a.imgs[0].download_url}" alt="">`:'<div class="empty">Belum ada foto</div>')+
        `<div><h3>${pretty(a.name)}</h3><p>${a.imgs.length} foto</p></div>`;
      el.onclick=()=>openAlbum(a);
      $('albums').appendChild(el);
    });
    if(!albums.length)$('gmsg').textContent='Belum ada album.';
  }catch(e){
    $('gmsg').textContent='Galeri akan tampil setelah website di-deploy di GitHub Pages (repo harus public).';
  }
}
function openAlbum(a){
  $('albums').style.display='none';$('back').style.display='inline-block';
  $('photos').innerHTML=a.imgs.map(f=>`<img data-zoom loading="lazy" src="${f.download_url}" alt="${pretty(a.name)}">`).join('')||'<p>Belum ada foto.</p>';
  location.hash='galeri';
}
$('back').onclick=()=>{$('photos').innerHTML='';$('albums').style.display='';$('back').style.display='none';};
document.addEventListener('click',e=>{const t=e.target.closest('[data-zoom]');if(t){$('lb').firstElementChild.src=t.src;$('lb').style.display='grid';}});
$('lb').onclick=()=>{$('lb').style.display='none';};
loadAlbums();
