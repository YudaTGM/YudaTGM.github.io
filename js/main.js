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
const I18N={
id:{nTentang:'Tentang',nKonten:'Konten',nPengalaman:'Pengalaman',nSertifikat:'Sertifikat',nGaleri:'Galeri',nKontak:'Kontak',
h1:'Halo,<br>Saya Mekhi Wira Yuda.',heroP:'Fresh graduate Administrasi Publik, sekaligus content creator dengan skill editing video dan desain.',btnGal:'Lihat Galeri',hint:'Gulir ke bawah ↓',
aboutH:'Tentang Saya',aboutP:'Lulusan baru dengan gelar Sarjana Administrasi Publik dari Sekolah Tinggi Ilmu Administrasi Satya Negara Palembang. Mampu menggunakan Microsoft Office, memiliki kemampuan bahasa Inggris tingkat dasar, mampu bekerja mandiri maupun kolaboratif dalam tim, serta siap beradaptasi dengan lingkungan kerja yang dinamis. Di luar itu, saya content creator amatir yang membuat dan mengedit vlog sendiri.',
skA:'Administrasi & Perkantoran',skC:'Kreatif & Konten',sTeam:'Kerja mandiri & tim',sOrg:'Organisasi & kepanitiaan',sEng:'Bahasa Inggris (dasar)',sDoc:'Dokumentasi foto & video',
contentH:'Konten Kreatif',contentP:'Video dan vlog yang saya edit sendiri.',procH:'Proses Editing',
expH:'Pengalaman & Pendidikan',e1t:'Ketua Divisi Dokumentasi, BEM STIA Satya Negara',e1s:'Organisasi',e2t:'Ketua Pelaksana PKKMB 2025',e2s:'Perkenalan kampus ke mahasiswa baru, STIA Satya Negara',e3t:'S1 Administrasi Publik',e1d:'Juni 2024 – Juli 2026',e1p:'Memimpin dan mengoordinasikan tim dokumentasi dalam peliputan program kerja dan acara BEM, serta mengelola dan mengarsipkan aset visual (foto dan video) organisasi.',e2d:'Desember 2025',e2p:'Memimpin kepanitiaan mahasiswa dalam merencanakan dan melaksanakan orientasi mahasiswa baru, berkoordinasi dengan pihak kampus, mengawasi seluruh divisi (acara, keamanan, dokumentasi), menangani masalah di lapangan, dan menyusun laporan pertanggungjawaban.',achH:'Pencapaian',a1t:'Delegasi Lomba Fotografi PEKSIMIDA Tingkat Provinsi Sumatera Selatan',a1d:'2026',a1p:'Terpilih sebagai perwakilan resmi STIA Satya Negara untuk berkompetisi di Pekan Seni Mahasiswa Daerah (PEKSIMIDA) 2026 bidang fotografi tingkat provinsi.',e3d:'2022 – 2026',e3g:'IPK 3.63',e4s:'Jurusan IPA',e4d:'2018 – 2022',
certH:'Sertifikat',all:'Semua',detail:'Lihat Detail',verify:'Verifikasi',zoom:'Zoom',role:'Fresh Graduate · Administrasi Publik',orgH:'Pengalaman Organisasi',eduH:'Pendidikan',galH:'Galeri',kontakH:'Kontak',back:'← Kembali ke semua album',
photos:'foto',noPhotos:'Belum ada foto.',noPhotos0:'Belum ada foto',noAlbum:'Belum ada album.',galFail:'Galeri akan tampil setelah website di-deploy di GitHub Pages (repo harus public).',toLight:'☀️ Terang',toDark:'🌙 Gelap'},
en:{nTentang:'About',nKonten:'Content',nPengalaman:'Experience',nSertifikat:'Certificates',nGaleri:'Gallery',nKontak:'Contact',
h1:'Hello,<br>I\'m Mekhi Wira Yuda.',heroP:'Public Administration fresh graduate and content creator with video editing and design skills.',btnGal:'View Gallery',hint:'Scroll down ↓',
aboutH:'About Me',aboutP:'Fresh graduate with a Bachelor\'s degree in Public Administration from Sekolah Tinggi Ilmu Administrasi (STIA) Satya Negara Palembang. Proficient in Microsoft Office, with basic English skills, able to work both independently and collaboratively in a team, and ready to adapt to a dynamic work environment. Outside of that, I\'m an amateur content creator who makes and edits my own vlogs.',
skA:'Administration & Office',skC:'Creative & Content',sTeam:'Independent & team work',sOrg:'Organization & event committees',sEng:'English (basic)',sDoc:'Photo & video documentation',
contentH:'Creative Content',contentP:'Videos and vlogs that I edit myself.',procH:'Editing Process',
expH:'Experience & Education',e1t:'Head of Documentation Division, BEM STIA Satya Negara',e1s:'Organization',e2t:'Event Chair, PKKMB 2025',e2s:'Campus orientation for new students, STIA Satya Negara',e3t:'Bachelor of Public Administration',e1d:'Jun 2024 – Jul 2026',e1p:'Led and coordinated the documentation team covering BEM programs and events, and managed and archived the organization\'s visual assets (photos and videos).',e2d:'December 2025',e2p:'Led the student committee in planning and running the new student orientation, coordinated with the campus, supervised all divisions (events, security, documentation), handled issues on site, and prepared the accountability report.',achH:'Achievements',a1t:'Delegate, Photography Competition, PEKSIMIDA South Sumatra Province Level',a1d:'2026',a1p:'Selected as the official representative of STIA Satya Negara to compete in the 2026 Regional Student Art Week (PEKSIMIDA), photography category, at the provincial level.',e3d:'2022 – 2026',e3g:'GPA 3.63',e4s:'Science Track',e4d:'2018 – 2022',
certH:'Certificates',all:'All',detail:'View Details',verify:'Verify',zoom:'Zoom',role:'Fresh Graduate · Public Administration',orgH:'Organizational Experience',eduH:'Education',galH:'Gallery',kontakH:'Contact',back:'← Back to all albums',
photos:'photos',noPhotos:'No photos yet.',noPhotos0:'No photos yet',noAlbum:'No albums yet.',galFail:'The gallery will appear once the site is deployed on GitHub Pages (the repo must be public).',toLight:'☀️ Light',toDark:'🌙 Dark'}};
const FOLDERS={'foto-personal':{id:'Foto Personal',en:'Personal Photos'},'dokumentasi-bem-stia-satya-negara':{id:'Dokumentasi BEM STIA Satya Negara',en:'BEM STIA Satya Negara Documentation'},'pkkmb-ketua-panitia':{id:'PKKMB (Ketua Panitia)',en:'PKKMB (Committee Chair)'},'jalan-jalan':{id:'Jalan-Jalan',en:'Travel'},'administrasi-perkantoran':{id:'Administrasi & Perkantoran',en:'Administration & Office'},'kreatif-desain':{id:'Kreatif & Desain',en:'Creative & Design'},'organisasi-kegiatan':{id:'Organisasi & Kegiatan',en:'Organizations & Events'}};
let lang='id';try{lang=localStorage.getItem('lang')==='en'?'en':'id';}catch(e){}
const t=k=>I18N[lang][k]||I18N.id[k]||k;
const folderName=s=>FOLDERS[s]?FOLDERS[s][lang]:pretty(s);
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(e=>{e.innerHTML=t(e.dataset.i18n);});
  document.querySelectorAll('[data-folder]').forEach(e=>{e.textContent=folderName(e.dataset.folder);});
  document.querySelectorAll('[data-count]').forEach(e=>{e.textContent=e.dataset.count+' '+t('photos');});
  const l=$('lg');if(l)l.textContent=lang==='id'?'🌐 EN':'🌐 ID';
  if(typeof paint==='function')paint();
  if(typeof renderCerts==='function'&&CERTS.length)renderCerts();
}
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
    if(im.length){$('procwrap').style.display='';$('proc').innerHTML=im.map(f=>`<figure><img data-zoom loading="lazy" src="${f.download_url}" alt="${pretty(f.name.replace(/\.\w+$/,''))}"><figcaption>${pretty(f.name.replace(/\.\w+$/,''))}</figcaption></figure>`).join('');}
  }catch(e){}
}
loadMedia();
(function(){
  const track=$('track'),n=track.children.length-1;let i=0;
  track.addEventListener('transitionend',()=>{if(i>=n){track.style.transition='none';i=0;track.style.transform='translateX(0)';}});
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(()=>{i++;track.style.transition='transform .9s ease';track.style.transform='translateX(-'+i*100+'%)';},5000);
  const hero=$('hero'),fades=[...document.querySelectorAll('section')],cl=x=>Math.max(0,Math.min(1,x)),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function onScroll(){
    const vh=innerHeight,o=cl(1-scrollY/(vh*.3)),atEnd=scrollY+vh>=document.documentElement.scrollHeight-4;
    hero.style.opacity=o;hero.style.pointerEvents=o<.3?'none':'auto';hero.style.visibility=o===0?'hidden':'visible';
    fades.forEach(el=>{
      if(!el.offsetHeight)return;
      if(reduce){el.style.opacity=1;return;}
      const r=el.getBoundingClientRect(),st=el.id==='tentang'?.7:.9;
      const fi=atEnd?1:cl((vh*st-r.top)/(vh*.3)),fo=cl((r.bottom-vh*.08)/(vh*.25)),f=Math.min(fi,fo);
      el.style.opacity=f;el.style.pointerEvents=f<.3?'none':'auto';
    });
  }
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
  if(window.ResizeObserver)new ResizeObserver(onScroll).observe(document.body);
  onScroll();
})();
function setupRows(){
  document.querySelectorAll('.rowwrap').forEach(w=>{
    const r=w.querySelector('.row'),p=w.querySelector('.prev'),n=w.querySelector('.next');
    const upd=()=>{p.style.visibility=r.scrollLeft>8?'visible':'hidden';n.style.visibility=r.scrollLeft+r.clientWidth<r.scrollWidth-8?'visible':'hidden';};
    p.onclick=()=>r.scrollBy({left:-(r.children[0].offsetWidth+14),behavior:'smooth'});
    n.onclick=()=>r.scrollBy({left:r.children[0].offsetWidth+14,behavior:'smooth'});
    let down=false,sx=0,sl=0,moved=0;
    r.querySelectorAll('img').forEach(i=>{i.draggable=false;});
    r.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;moved=0;sx=e.clientX;sl=r.scrollLeft;r.classList.add('drag');});
    addEventListener('pointermove',e=>{if(!down)return;const d=e.clientX-sx;moved=Math.max(moved,Math.abs(d));r.scrollLeft=sl-d;});
    addEventListener('pointerup',()=>{if(!down)return;down=false;r.classList.remove('drag');});
    r.addEventListener('click',e=>{if(moved>6){e.stopPropagation();e.preventDefault();}moved=0;},true);
    const fx=()=>{const rc=r.getBoundingClientRect(),cx=rc.left+rc.width/2;[...r.children].forEach(el=>{const b=el.getBoundingClientRect(),k=Math.min(Math.abs(b.left+b.width/2-cx)/(rc.width/2),1);el.style.opacity=(1-k*.7).toFixed(2);el.style.transform='scale('+(1-k*.08).toFixed(3)+')';});};
    const both=()=>{upd();fx();};
    r.addEventListener('scroll',both,{passive:true});addEventListener('resize',both);both();
  });
}
var CERTS=[],certTab='all';
const CATS={'administrasi-perkantoran':{i:'🏢',c:'#3b82f6'},'kreatif-desain':{i:'🎨',c:'#f59e0b'},'organisasi-kegiatan':{i:'🤝',c:'#ef4444'}};
const catOf=s=>CATS[s]||{i:'📁',c:'#8b8b95'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmtDate=d=>{const x=new Date(d);return isNaN(x)?d:x.toLocaleDateString(lang==='en'?'en-GB':'id-ID',{day:'numeric',month:'long',year:'numeric'});};
function renderCerts(){
  if(!CERTS.length)return;
  const cats=[...new Set(CERTS.map(c=>c.cat).filter(Boolean))];
  if(certTab!=='all'&&!cats.includes(certTab))certTab='all';
  const tabs=[['all','📂 '+t('all'),CERTS.length]].concat(cats.map(k=>[k,catOf(k).i+' '+folderName(k),CERTS.filter(c=>c.cat===k).length]));
  let list=certTab==='all'?CERTS.slice():CERTS.filter(c=>c.cat===certTab);
  const feat=certTab==='all'?(CERTS.find(c=>c.featured&&c.type==='img')||CERTS.find(c=>c.type==='img')):null;
  if(feat)list=list.filter(c=>c!==feat);
  const S=[4,2,3,3,2,4,2,2,2];
  const when=c=>c.date?esc(fmtDate(c.date)):'';
  const badge=c=>c.cat?`<span class="cbadge">${esc(folderName(c.cat))}</span>`:'';
  const card=(c,i)=>`<article class="cc" style="--c:${catOf(c.cat).c};--n:${i};grid-column:span ${S[i%S.length]}">`+
    (c.type==='img'?`<div class="cimg"><img data-zoom loading="lazy" src="${esc(c.url)}" alt="${esc(c.title)}"><span class="zoom">🔍 ${t('zoom')}</span></div>`:`<a class="cimg" href="${esc(c.url)}" target="_blank" rel="noopener">📄 PDF</a>`)+
    `<div class="cbody">${badge(c)}<h4>${esc(c.title)}</h4><p>${esc(c.issuer)}${c.issuer&&c.date?' · ':''}${when(c)}</p></div></article>`;
  const fh=feat?`<article class="cc feat" style="--c:${catOf(feat.cat).c}"><div class="fimg"><img data-zoom src="${esc(feat.url)}" alt="${esc(feat.title)}"></div><div class="finfo">${badge(feat)}<h3>${esc(feat.title)}</h3>${feat.issuer?`<p class="by">${esc(feat.issuer)}</p>`:''}${feat.date?`<p class="dt">${when(feat)}</p>`:''}<div class="cbtn"><button type="button" class="pill" data-open="${esc(feat.url)}">${t('detail')} 📄</button>${feat.verify?`<a class="pill" href="${esc(feat.verify)}" target="_blank" rel="noopener">${t('verify')} 🔗</a>`:''}</div></div></article>`:'';
  const box=$('certs');
  box.innerHTML=`<div class="ctabs">${tabs.map(([k,l,n])=>`<button type="button" class="ctab${k===certTab?' on':''}" data-tab="${esc(k)}">${esc(l)} <i>${n}</i></button>`).join('')}</div><div class="bento">${fh}${list.map(card).join('')}</div>`;
  $('sertifikat').style.setProperty('--glow',certTab==='all'?'#3b82f6':catOf(certTab).c);
  box.querySelectorAll('.cc').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px');}));
  box.querySelectorAll('.ctab').forEach(b=>{b.onclick=()=>{certTab=b.dataset.tab;renderCerts();};});
  box.querySelectorAll('[data-open]').forEach(b=>{b.onclick=()=>{$('lb').firstElementChild.src=b.dataset.open;$('lb').style.display='flex';};});
}
async function loadCerts(){
  try{
    let meta={};
    try{const r=await fetch('sertifikat/data.json');if(r.ok)meta=await r.json();}catch(e){}
    const root=await list('sertifikat'),g=[{cat:'',files:root.filter(f=>f.type==='file')}];
    for(const d of root.filter(x=>x.type==='dir'))g.push({cat:d.name,files:(await list('sertifikat/'+d.name)).filter(f=>f.type==='file')});
    CERTS=[];
    g.forEach(x=>x.files.forEach(f=>{
      const img=isImg(f.name),pdf=/\.pdf$/i.test(f.name);if(!img&&!pdf)return;
      const m=meta[f.name]||meta[f.name.toLowerCase()]||{};
      CERTS.push({type:img?'img':'pdf',url:f.download_url,cat:x.cat,title:m.title||pretty(f.name.replace(/\.\w+$/,'')),issuer:m.issuer||'',date:m.date||'',verify:/^https?:\/\//i.test(m.verify||'')?m.verify:'',featured:!!m.featured,dv:Date.parse(m.date)||0});
    }));
    CERTS.sort((a,b)=>b.dv-a.dv);
    if(CERTS.length){$('sertifikat').style.display='';renderCerts();}
  }catch(e){}
}
loadCerts();
const bg=$('burger'),lk=$('links');
bg.onclick=()=>{const o=lk.classList.toggle('open');bg.textContent=o?'✕':'☰';bg.setAttribute('aria-expanded',o);};
lk.addEventListener('click',e=>{if(e.target.tagName==='A'){lk.classList.remove('open');bg.textContent='☰';bg.setAttribute('aria-expanded','false');}});
const tg=$('tg'),root=document.documentElement;
const paint=()=>{tg.textContent=root.dataset.theme==='dark'?t('toLight'):t('toDark');};
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
      el.innerHTML=(a.imgs[0]?`<img loading="lazy" src="${a.imgs[0].download_url}" alt="">`:'<div class="empty" data-i18n="noPhotos0">Belum ada foto</div>')+
        `<div><h3 data-folder="${a.name}">${pretty(a.name)}</h3><p data-count="${a.imgs.length}">${a.imgs.length} foto</p></div>`;
      el.onclick=()=>openAlbum(a);
      $('albums').appendChild(el);
    });
    if(!albums.length)$('gmsg').dataset.i18n='noAlbum';applyLang();
  }catch(e){
    $('gmsg').dataset.i18n='galFail';applyLang();
  }
}
function openAlbum(a){
  $('albums').style.display='none';$('back').style.display='inline-block';
  $('photos').innerHTML=a.imgs.map(f=>`<img data-zoom loading="lazy" src="${f.download_url}" alt="${pretty(a.name)}">`).join('')||'<p data-i18n="noPhotos">Belum ada foto.</p>';applyLang();
  location.hash='galeri';
}
$('back').onclick=()=>{$('photos').innerHTML='';$('albums').style.display='';$('back').style.display='none';};
document.addEventListener('click',e=>{const t=e.target.closest('[data-zoom]');if(t){$('lb').firstElementChild.src=t.src;$('lb').style.display='flex';}});
$('lb').onclick=()=>{$('lb').style.display='none';};
loadAlbums();
$('lg').onclick=()=>{lang=lang==='id'?'en':'id';try{localStorage.setItem('lang',lang)}catch(e){}applyLang();};
applyLang();
addEventListener('keydown',e=>{if(e.key==='Escape')$('lb').style.display='none';});
(function(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window))return;
  const sel=['#tentang h2','.pfwrap','.abt > p','#skills h3','#skills .tags span','#pengalaman h2','#pengalaman h3','#pengalaman .tl > div','#sertifikat h2','#editing h2','#galeri h2','#kontak h2','#kontak .btn'];
  const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('in',e.isIntersecting)),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  sel.forEach(q=>document.querySelectorAll(q).forEach((el,i)=>{el.classList.add('rv');el.style.setProperty('--d',Math.min(i,8)*70+'ms');io.observe(el);}));
})();
