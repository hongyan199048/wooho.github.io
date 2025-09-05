(function(){
  const $ = (id)=>document.getElementById(id);

  const params = new URLSearchParams(location.search);
  const dataUrl = params.get('data') || 'assets/story.json';

  const bookState = {
    meta: { title: '电子书', author: '' },
    pages: [],
    pageIndex: -1,
    speech: null
  };

  const elements = {
    title: $('sbTitle'),
    cover: $('cover'),
    content: $('content'),
    coverImage: $('coverImage'),
    bookTitle: $('bookTitle'),
    bookAuthor: $('bookAuthor'),
    toc: $('toc'),
    prev: $('prevBtn'),
    next: $('nextBtn'),
    indicator: $('pageIndicator'),
    btnToc: $('btnToc'),
    btnAudio: $('btnAudio')
  };

  async function loadData(){
    const res = await fetch(dataUrl);
    if(!res.ok) throw new Error('无法加载故事数据: '+res.status);
    const json = await res.json();
    bookState.meta.title = json.title || '电子书';
    bookState.meta.author = json.author || '';
    elements.title.textContent = bookState.meta.title;
    elements.bookTitle.textContent = bookState.meta.title;
    elements.bookAuthor.textContent = bookState.meta.author ? `创建者：${bookState.meta.author}` : '';
    if(json.coverImage){ elements.coverImage.src = json.coverImage; } else { elements.coverImage.remove(); }
    bookState.pages = Array.isArray(json.pages) ? json.pages : [];
    renderToc();
    goTo(0, true);
  }

  function renderToc(){
    const toc = elements.toc;
    toc.innerHTML = '<h3>目录</h3>';
    const ul = document.createElement('ul');
    bookState.pages.forEach((p, i)=>{
      const li = document.createElement('li');
      li.textContent = p.title || `第 ${i+1} 页`;
      li.addEventListener('click', ()=>goTo(i));
      ul.appendChild(li);
    });
    toc.appendChild(ul);
  }

  function goTo(index, showCoverIfZero){
    const total = bookState.pages.length;
    if(index < 0 || index >= total){ return; }
    bookState.pageIndex = index;

    const showCover = showCoverIfZero && index === 0;
    elements.cover.hidden = !showCover;
    elements.content.hidden = showCover;

    if(!showCover){
      const page = bookState.pages[index];
      elements.content.innerHTML = renderPageHtml(page);
    }

    elements.prev.disabled = index <= 0;
    elements.next.disabled = index >= total-1;
    elements.indicator.textContent = `${index+1} / ${total}`;

    // 更新目录高亮
    const lis = elements.toc.querySelectorAll('li');
    lis.forEach((li, i)=>li.classList.toggle('active', i===index));
  }

  function renderPageHtml(page){
    const title = page.title ? `<h2>${escapeHtml(page.title)}</h2>` : '';
    const image = page.image ? `<img src="${escapeAttr(page.image)}" alt="">` : '';
    const text = page.content ? `<p>${toParagraphs(page.content)}</p>` : '';
    return `${title}${image}${text}`;
  }

  function toParagraphs(str){
    return escapeHtml(str).replace(/\n\n+/g,'</p><p>').replace(/\n/g,'<br>');
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, (c)=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  }
  function escapeAttr(s){ return String(s).replace(/"/g,'&quot;'); }

  // 事件绑定
  elements.prev.addEventListener('click', ()=>goTo(bookState.pageIndex-1));
  elements.next.addEventListener('click', ()=>goTo(bookState.pageIndex+1));
  document.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowLeft') goTo(bookState.pageIndex-1);
    if(e.key==='ArrowRight') goTo(bookState.pageIndex+1);
  });
  elements.btnToc.addEventListener('click', ()=>{
    const toc = document.querySelector('.sb-toc');
    toc.style.display = toc.style.display === 'none' ? '' : 'none';
  });

  // 朗读功能
  elements.btnAudio.addEventListener('click', ()=>{
    const utteranceText = elements.content.hidden ? `${bookState.meta.title}。${bookState.meta.author?('作者：'+bookState.meta.author):''}` : elements.content.textContent;
    if(!window.speechSynthesis) return alert('当前浏览器不支持语音合成');
    if(bookState.speech){ window.speechSynthesis.cancel(); bookState.speech = null; return; }
    const u = new SpeechSynthesisUtterance(utteranceText);
    u.lang = 'zh-CN';
    u.rate = 0.95; u.pitch = 1; u.volume = 1;
    u.onend = ()=>{ bookState.speech = null; };
    bookState.speech = u;
    window.speechSynthesis.speak(u);
  });

  loadData().catch(err=>{
    console.error(err);
    elements.content.hidden = false;
    elements.cover.hidden = true;
    elements.content.innerHTML = `<p style="color:#f99">加载失败：${escapeHtml(err.message)}</p>`;
  });
})();


