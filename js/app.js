import{CONFIG as Ea}from"./config.js";import{sb as w,state as p,$ as h,$$ as q,view as A,go as E,toast as S,fail as j,errMsg as xa,api as Q,busy as F,confirmDialog as W,loadConfig as La,publicUrl as D,marcaUrl as ee,avatarUrl as Ca,updateAccountButton as V,loadPerfil as ca,isGoogleUser as Ma,screenShow as te,screenCached as z,screenUpdate as ea,screenForget as J,screenClearAll as se,screenPrefetch as la,novaRota as ne,showVitrine as Sa,aoSairDaTela as oe,fetchVitrine as ta,perfilGuardado as re,loadFeriados as ie,atualizarChamados as sa}from"./core.js";import{estadia as ce,nomeFeriado as le,temPrecoEspecial as de}from"./precos.js";import{esc as l,fmtMoney as R,fmtDate as G,addDays as K,daysBetween as Ta,todayISO as da,MESES as pe,STATUS as Aa,normalizePhone as pa,maskPhone as na,EMAIL_RE as Pa,initials as ua}from"./util.js";import{resizeAvatar as Da,resizeReceipt as ue,extOf as Ia}from"./images.js";import{enablePush as qa,disablePush as me,pushActive as Na,pushSupport as he,syncPush as Ra}from"./push.js";import{renderChat as ve,clearChatCache as ma,fetchConversas as fe,prepararAtendendo as ge}from"./chat.js";import{renderAdmin as be,ADMIN_SECOES as $e}from"./admin.js";import{temAlfinete as ha,rotas as Oa,montarMapas as we}from"./map.js";const L={home:'<svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',cal:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M4 5.5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/></svg>',photo:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg>',user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',insta:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',google:'<svg viewBox="0 0 48 48" class="g"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',people:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5c2.5 0 4.5 1.5 5.5 4.5"/></svg>',clip:'<svg viewBox="0 0 24 24"><path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 7"/></svg>',send:'<svg viewBox="0 0 24 24"><path d="M4 12 20 4l-6 16-3-7z"/></svg>',menu:'<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',pin:'<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>'};function Y(e="",a="",t=""){const n=p.config?.icone_versao,o=`${a?` width="${a}"`:""}${t?` height="${t}"`:""}`;return n>0?`<img src="${l(ee(n,"icon-512.png"))}" alt=""${o} class="${e} logo-custom">`:`<img src="icons/logo.svg" alt=""${o} class="${e}">`}const ye=()=>{const e=p.config?.ilustracao_versao;return e>0?D("marca",`ilustracao/v${e}.png`):"icons/passaro.svg"},_e=()=>{const e=Number(p.config?.ilustracao_tamanho);return e>=50&&e<=200?e/100:1},Fa=(e="",a="",t="")=>{const n=_e();return a&&(a=Math.round(a*n)),t&&(t=Math.round(t*n)),`<img src="${l(ye())}" alt="" class="ilustracao ${e}"${a?` width="${a}"`:""}${t?` height="${t}"`:""}>`},ke=new Set(["","cabana","galeria","menu","entrar","cadastro","termos","privacidade","nova-senha"]);async function X(){const[e,...a]=location.hash.replace(/^#\/?/,"").split("/");ne(),window.scrollTo(0,0),xe(e);try{if(p.config||await La(),p.user&&!p.perfil&&!["completar","termos","privacidade","nova-senha"].includes(e))return E("#/completar");if(!p.user&&!ke.has(e))return sessionStorage.setItem("depois-de-entrar",location.hash),E("#/entrar");switch(e){case"":return await Le();case"cabana":return await Ae(a[0],a[1]==="datas");case"reservas":return await Ne();case"chat":return await ve(a[0]);case"galeria":return await De();case"menu":return await Wa();case"perfil":return await $a();case"entrar":return Ue();case"cadastro":return Ye();case"completar":return Qe();case"nova-senha":return Je();case"termos":case"privacidade":return await Ke(e);case"admin":return!p.admin||!a[0]?E("#/menu"):await be(a[0],a.slice(1));default:return E("#/")}}catch(t){A().innerHTML=`<div class="empty"><p>${l(xa(t))}</p><button class="btn" id="retry">Tentar de novo</button></div>`,h("#retry").addEventListener("click",()=>location.reload())}}const Ee=[["","Início",L.home],["reservas","Reservas",L.cal],["chat","Chat",L.chat],["galeria","Galeria",L.photo],["menu","Menu",L.menu]];function xe(e){const a=document.getElementById("tabbar");a.childElementCount||(a.innerHTML=Ee.map(([n,o,s])=>`<a href="#/${n}" data-tab="${n}">${n==="chat"?`<span class="tab-ico">${s}<b class="tab-n" id="tab-chat-n" hidden></b></span>`:s}<span>${o}</span></a>`).join("")),sa();const t=e==="cabana"?location.hash.endsWith("/datas")?"reservas":"":["perfil","admin","termos","privacidade"].includes(e)?"menu":e;q("a",a).forEach(n=>n.classList.toggle("on",n.dataset.tab===t)),a.hidden=["entrar","cadastro","completar","nova-senha"].includes(e)}function va(e,a){return a.filter(t=>t.cabana_id===e.id).sort((t,n)=>(n.principal===!0)-(t.principal===!0)||t.ordem-n.ordem)}const oa=(e,a)=>va(e,a)[0]||null;function ft(e,a){const t=oa(e,a);return t?D("fotos",t.mini_path):null}async function Le(){await Sa(Ce)}function Ce({cabanas:e,fotos:a}){const t=p.config,n=e.filter(s=>s.ativa),o=[...e.filter(s=>s.ativa).map(s=>({f:oa(s,a),c:s})).filter(s=>s.f),...a.filter(s=>s.no_carrossel&&!s.cabana_id).map(s=>({f:s,c:null}))];A().innerHTML=`
    ${o.length?`<section class="carousel" aria-roledescription="carrossel">
      <div class="track">${o.map(({f:s,c:i},d)=>{const f=`<img src="${l(D("fotos",s.path))}" alt="${l(i?.nome||s.legenda||"Foto da chácara")}" ${d?'loading="lazy"':""}>`,c=i?`<figcaption><strong>${l(i.nome)}</strong><span>${R(i.preco_diaria_centavos)} a diária · ver dias livres ›</span></figcaption>`:s.legenda?`<figcaption>${l(s.legenda)}</figcaption>`:"";return i?`<a class="slide" href="#/cabana/${i.id}">${f}${c}</a>`:`<figure class="slide">${f}${c}</figure>`}).join("")}</div>
      ${o.length>1?`<div class="dots">${o.map((s,i)=>`<button aria-label="Foto ${i+1}" data-i="${i}"></button>`).join("")}</div>`:""}
    </section>`:`<section class="hero-empty">${Y("",96,96)}</section>`}

    <div class="home">
      <section class="welcome">
        <p class="eyebrow">Hospedagem em meio à natureza</p>
        <h1>${l(t.nome_app)}</h1>
        <p class="welcome-txt">${l(t.boas_vindas)}</p>
        ${t.endereco?`<p class="welcome-loc">${L.pin} ${l(t.endereco)}</p>`:""}
        <div class="welcome-cta">
          <a class="btn lg" href="#cabanas" id="ver-cabanas">${L.cal} Ver datas disponíveis</a>
          <a class="btn lg ghost" href="#/chat">${L.chat} Falar com o atendente</a>
        </div>
      </section>

      <section class="perks" aria-label="Vantagens">
        <div class="perk"><span>📅</span><strong>Reserva online</strong><small>24 horas por dia</small></div>
        <div class="perk"><span>💠</span><strong>Pagamento por Pix</strong><small>Rápido e seguro</small></div>
        <div class="perk"><span>✅</span><strong>Confirmação</strong><small>Por e-mail e no celular</small></div>
      </section>

      <section class="home-sec" id="cabanas">
        <div class="sec-head"><div><p class="eyebrow">Acomodações</p><h2>Escolha a sua cabana</h2></div>
          ${n.length?`<span class="sec-count">${n.length} ${n.length===1?"opção":"opções"}</span>`:""}</div>
        ${n.length?`<div class="cabin-list">${n.map(s=>{const i=oa(s,a),d=va(s,a).length;return`<a class="cabin-card" href="#/cabana/${s.id}">
            <div class="cc-img">
              ${i?`<img src="${l(D("fotos",i.path))}" alt="${l(s.nome)}" loading="lazy">`:Y("ph")}
              <span class="cc-tag" data-livre="${s.id}">Consultando datas…</span>
              ${d>1?`<span class="cc-fotos">📷 ${d}</span>`:""}
            </div>
            <div class="cc-body">
              <div class="cc-top"><h3>${l(s.nome)}</h3><span class="cc-cap">${L.people} até ${s.capacidade}</span></div>
              ${s.descricao?`<p class="cc-desc">${l(s.descricao)}</p>`:""}
              <div class="cc-foot"><p class="cc-price"><strong>${R(s.preco_diaria_centavos)}</strong> <span>/ diária</span></p>
                <span class="cc-go">Ver datas ›</span></div>
            </div></a>`}).join("")}</div>`:'<div class="empty-card">As cabanas aparecem aqui assim que forem cadastradas.</div>'}
      </section>

      <section class="home-sec">
        <div class="sec-head"><div><p class="eyebrow">Simples assim</p><h2>Como reservar</h2></div></div>
        <ol class="steps">
          <li><span class="step-n">1</span><div><strong>Escolha a cabana e as datas</strong><p>Veja no calendário os dias livres, ou peça ao atendente no chat.</p></div></li>
          <li><span class="step-n">2</span><div><strong>Pague com Pix</strong><p>O QR Code aparece na hora. As datas ficam guardadas para você.</p></div></li>
          <li><span class="step-n">3</span><div><strong>Envie o comprovante</strong><p>Conferimos e você recebe a confirmação por e-mail e no celular.</p></div></li>
        </ol>
      </section>

      <section class="home-sec info-grid">
        <a class="info-card chat-card" href="#/chat">
          <span class="ic-ico">💬</span>
          <div><strong>Ficou com alguma dúvida?</strong><p>Nosso atendente responde na hora, tira dúvidas e faz a sua reserva.</p></div>
          <span class="ic-go">›</span>
        </a>
        ${ha(t)||t.endereco?(()=>{const s=Oa(t);return`<div class="info-card como-chegar">
            ${ha(t)?`<a class="place-map" data-lat="${t.lat}" data-lng="${t.lng}" href="${l(s.google)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir a rota no Google Maps"></a>`:""}
            <div class="cc-row"><span class="ic-ico">📍</span>
              <div><strong>Como chegar</strong>${t.endereco?`<p>${l(t.endereco)}</p>`:""}</div></div>
            <div class="cc-rotas">
              <a class="btn sm" href="${l(s.google)}" target="_blank" rel="noopener noreferrer">Google Maps</a>
              <a class="btn sm ghost" href="${l(s.waze)}" target="_blank" rel="noopener noreferrer">Waze</a>
            </div>
          </div>`})():""}
        ${t.instagram_url?`<a class="info-card insta" href="${l(t.instagram_url)}" target="_blank" rel="noopener noreferrer">
          <span class="ic-ico">${L.insta}</span>
          <div><strong>@${l(t.instagram_url.replace(/\/+$/,"").split("/").pop())}</strong><p>Mais fotos e vídeos no Instagram</p></div>
          <span class="ic-go">↗</span>
        </a>`:""}
      </section>

      <footer class="home-foot">
        ${Fa("home-foot-ilus",96,96)}
        <strong>${l(t.nome_app)}</strong>
        <nav><a href="#/galeria">Galeria</a><a href="#/termos">Termos de uso</a><a href="#/privacidade">Privacidade</a></nav>
      </footer>
    </div>`,o.length>1&&Ha(h(".carousel")),we(A()),h("#ver-cabanas").addEventListener("click",s=>{s.preventDefault(),h("#cabanas").scrollIntoView({behavior:"smooth",block:"start"})}),Me(n)}async function Me(e){const a=da(),t=K(a,89),n=(i,d)=>{const f=document.querySelector(`[data-livre="${i}"]`);f&&(f.classList.remove("on","off"),d===null?(f.textContent="Sem datas nos próximos 90 dias",f.classList.add("off")):(f.textContent=d===a?"● Livre hoje":d===K(a,1)?"● Livre amanhã":`● Livre a partir de ${G(d).slice(0,5)}`,f.classList.add("on")))},o=z("livres")||{};for(const i of e)(o[i.id]===null||o[i.id]>=a)&&n(i.id,o[i.id]);const s={};await Promise.all(e.map(async i=>{try{const{data:d,error:f}=await w.rpc("disponibilidade",{p_cabana:i.id,p_de:a,p_ate:t});if(f)throw f;s[i.id]=d.find(c=>c.situacao==="livre")?.dia??null,n(i.id,s[i.id])}catch{i.id in o||document.querySelector(`[data-livre="${i.id}"]`)?.remove()}})),ea("livres",{...o,...s})}function Ha(e){const a=h(".track",e),t=q(".dots button",e),n=h(".car-n",e),o=q(".slide",a).length;let s=0,i=!1;const d=()=>{t.forEach((m,g)=>m.classList.toggle("on",g===s)),n&&(n.textContent=`${s+1} / ${o}`)},f=(m,g=!0)=>{s=(m+o)%o,a.scrollTo({left:s*a.clientWidth,behavior:g?"smooth":"auto"}),d()};t.forEach(m=>m.addEventListener("click",()=>f(+m.dataset.i))),a.addEventListener("scroll",()=>{const m=Math.round(a.scrollLeft/a.clientWidth);m!==s&&m>=0&&m<o&&(s=m,d())},{passive:!0}),a.addEventListener("pointerdown",()=>i=!0),a.addEventListener("pointerup",()=>setTimeout(()=>i=!1,4e3)),f(0,!1);const c=setInterval(()=>{if(!e.isConnected)return clearInterval(c);!i&&!document.hidden&&f(s+1)},4500)}function Se(e){if(!de(e))return"";const a=e.preco_fim_semana_centavos??e.preco_diaria_centavos,t=e.preco_feriado_centavos??a;return`<div class="precos-cab">
    <span><small>Segunda a quinta</small><b>${R(e.preco_diaria_centavos)}</b></span>
    <span><small>Sexta a domingo</small><b>${R(a)}</b></span>
    <span><small>Feriados</small><b>${R(t)}</b></span>
  </div>`}function Te(e,a,t,n){const{total:o,grupos:s}=ce(e,a,t,n),i=(f,c)=>c.n?`<div class="row between small muted"><span>${c.n} × ${f}</span><span>${R(c.valor)}</span></div>`:"";return(s.fim_semana.n||s.feriado.n?i("diária normal",s.normal)+i("sexta a domingo",s.fim_semana)+i(`feriado${s.feriado.nomes.length?` (${l(s.feriado.nomes.join(", "))})`:""}`,s.feriado):"")+`<div class="row between total"><span>Total</span><strong>${R(o)}</strong></div>`}async function Ae(e,a=!1){const t=p.cabanas&&p.fotos?{cabanas:p.cabanas,fotos:p.fotos}:z("vitrine"),{cabanas:n,fotos:o}=t||await ta();t&&ta().then(v=>ea("vitrine",v)).catch(()=>{});const s=n.find(v=>v.id===e&&v.ativa);if(!s)return E("#/");const i=p.config,d=va(s,o),f=da(),c={checkin:null,checkout:null,month:f.slice(0,7),days:new Map};let m=p.feriados||[];ie().then(v=>{m=v,y.isConnected&&(u(),$())}).catch(()=>{}),A().innerHTML=`
    ${d.length?`<button type="button" class="cab-hero" data-i="0" aria-label="Ver fotos da ${l(s.nome)}">
        <img src="${l(D("fotos",d[0].path))}" alt="${l(d[0].legenda||s.nome)}">
        ${d.length>1?`<span class="cab-count">📷 ${d.length} fotos</span>`:""}</button>`:""}
    <section class="pad">
      <a href="#/" class="back">‹ Voltar</a>
      <h1 class="title">${l(s.nome)}</h1>
      <p class="muted">${L.people} até ${s.capacidade} pessoas · <strong>${R(s.preco_diaria_centavos)}</strong> a diária</p>
      ${Se(s)}
      ${s.descricao?`<p class="pre">${l(s.descricao)}</p>`:""}
      <p class="muted small">Entrada a partir das ${l(i.checkin_hora)} · saída até as ${l(i.checkout_hora)}</p>
    </section>
    ${d.length>1?`<section class="pad">
      <h2 class="section-title">Fotos da ${l(s.nome)}</h2>
      <div class="grid">${d.map((v,_)=>`<button type="button" class="thumb" data-i="${_}"><img src="${l(D("fotos",v.mini_path))}" alt="${l(v.legenda||s.nome)}" loading="lazy"></button>`).join("")}</div>
    </section>`:""}
    <section class="pad">
      <h2 class="section-title" id="escolha-datas">Escolha as datas</h2>
      <p class="muted small" id="cal-hint">Toque no dia da entrada e depois no dia da saída.</p>
      <div class="calendar" id="cal"></div>
      <div class="legend small"><span class="lg livre"></span>Livre <span class="lg reservado"></span>Reservado <span class="lg fechado"></span>Indisponível <span class="lg-fer"></span>Feriado</div>
      <div class="booking card" id="booking" hidden></div>
    </section>`;const g=d.map(v=>({src:D("fotos",v.path),cap:v.legenda}));q(".cab-hero, .grid .thumb").forEach(v=>v.addEventListener("click",()=>fa(g,+v.dataset.i)));const y=h("#cal"),k=v=>`disp:${s.id}:${v}`,B=v=>v.forEach(_=>c.days.set(_.dia,_.dia<f?"passado":_.situacao));async function N(v){const _=`${v}-01`,x=K(K(_,32).slice(0,7)+"-01",-1),{data:M,error:O}=await w.rpc("disponibilidade",{p_cabana:s.id,p_de:_,p_ate:x});if(O)throw O;ea(k(v),M),B(M)}function r(v,_){N(v).then(()=>{JSON.stringify(z(k(v)))!==_&&c.month===v&&y.isConnected&&(u(),$())}).catch(()=>{})}async function u(){if(![...c.days.keys()].some(T=>T.startsWith(c.month))){const T=z(k(c.month));if(T)B(T),r(c.month,JSON.stringify(T));else{y.innerHTML='<div class="loading">Carregando…</div>';try{await N(c.month)}catch(I){y.innerHTML=`<p class="muted">${l(xa(I))}</p>`;return}}}const[v,_]=c.month.split("-").map(Number),x=`${c.month}-01`,M=new Date(x+"T12:00:00Z").getUTCDay(),O=new Date(Date.UTC(v,_,0)).getUTCDate(),U=c.month>f.slice(0,7);let H="";for(let T=0;T<M;T++)H+="<span></span>";for(let T=1;T<=O;T++){const I=`${c.month}-${String(T).padStart(2,"0")}`,_a=c.days.get(I)||"passado",Ka=c.checkin&&c.checkout&&I>=c.checkin&&I<c.checkout,Xa=I===c.checkout,Za=I===c.checkin,ka=c.checkin&&!c.checkout&&I>c.checkin&&b(c.checkin,I),ae=_a==="livre"||ka,ia=le(I,m);H+=`<button type="button" class="day ${_a} ${Ka?"in":""} ${Za?"start":""} ${Xa?"end":""} ${ka?"can-out":""} ${ia?"feriado":""}" data-d="${I}" ${ia?`title="${l(ia)}"`:""} ${ae?"":"disabled"}>${T}</button>`}y.innerHTML=`
      <div class="cal-head">
        <button type="button" class="icon-btn" data-nav="-1" ${U?"":"disabled"} aria-label="Mês anterior">‹</button>
        <strong>${pe[_-1]} de ${v}</strong>
        <button type="button" class="icon-btn" data-nav="1" aria-label="Próximo mês">›</button>
      </div>
      <div class="cal-grid dow">${["D","S","T","Q","Q","S","S"].map(T=>`<span>${T}</span>`).join("")}</div>
      <div class="cal-grid">${H}</div>`}function b(v,_){for(let x=v;x<_;x=K(x,1))if(c.days.get(x)!=="livre")return!1;return!0}function $(){const v=h("#booking"),_=h("#cal-hint");if(!c.checkin){v.hidden=!0,_.textContent="Toque no dia da entrada e depois no dia da saída.";return}if(!c.checkout){v.hidden=!0,_.textContent=`Entrada: ${G(c.checkin)}. Agora toque no dia da saída.`;return}const x=Ta(c.checkin,c.checkout);_.textContent=`${G(c.checkin)} → ${G(c.checkout)}`;const M=x<i.min_diarias,O=x>i.max_diarias;v.hidden=!1,v.innerHTML=`
      <div class="row between"><span>Entrada</span><strong>${G(c.checkin)} · ${l(i.checkin_hora)}</strong></div>
      <div class="row between"><span>Saída</span><strong>${G(c.checkout)} · ${l(i.checkout_hora)}</strong></div>
      <div class="row between"><span>Diárias</span><strong>${x}</strong></div>
      <label class="field row between"><span>Pessoas</span>
        <select id="hospedes">${Array.from({length:s.capacidade},(U,H)=>`<option ${H+1===Math.min(2,s.capacidade)?"selected":""}>${H+1}</option>`).join("")}</select></label>
      ${Te(s,c.checkin,c.checkout,m)}
      ${M?`<p class="warn small">O mínimo é de ${i.min_diarias} diária(s).</p>`:""}
      ${O?`<p class="warn small">O máximo é de ${i.max_diarias} diárias.</p>`:""}
      ${p.admin?'<a class="btn block" href="#/admin/reservas">Reservar pelo painel da equipe</a>':`<button class="btn block" id="reservar" ${M||O?"disabled":""}>${p.user?"Reservar e pagar com Pix":"Entrar para reservar"}</button>`}
      <p class="muted small center">O valor é conferido pela chácara no momento da reserva.</p>`,h("#reservar")?.addEventListener("click",U=>C(U.currentTarget))}async function C(v){if(!p.user)return sessionStorage.setItem("depois-de-entrar",location.hash),E("#/entrar");await F(v,async()=>{v.textContent="Reservando…";const{data:_,error:x}=await w.rpc("criar_reserva",{p_cabana:s.id,p_checkin:c.checkin,p_checkout:c.checkout,p_hospedes:Number(h("#hospedes").value),p_origem:"app"});if(x)throw J(k(c.month)),c.days.clear(),x;S(`Reserva ${_.codigo} criada! Agora é só pagar com Pix.`,"ok"),J("reservas"),J(k(c.month)),J("livres");const{conversa_id:M}=await Q("chat-ia",{acao:"reserva_criada",reserva_id:_.id});E(`#/chat/${M}`)}),c.days.size||u()}y.addEventListener("click",v=>{const _=v.target.closest("[data-nav]");if(_){const[O,U]=c.month.split("-").map(Number),H=new Date(Date.UTC(O,U-1+Number(_.dataset.nav),1));return c.month=H.toISOString().slice(0,7),u()}const x=v.target.closest(".day");if(!x||x.disabled)return;const M=x.dataset.d;if(!c.checkin||c.checkout||M<=c.checkin){if(c.days.get(M)!=="livre")return;c.checkin=M,c.checkout=null}else b(c.checkin,M)?c.checkout=M:(c.checkin=c.days.get(M)==="livre"?M:null,c.checkout=null);u(),$()});const aa=u();a&&requestAnimationFrame(()=>{const v=h("#escolha-datas");v&&window.scrollTo({top:v.getBoundingClientRect().top+window.scrollY-70,behavior:"smooth"})}),await aa}async function Pe(){const e=p.cabanas&&p.fotos?{cabanas:p.cabanas,fotos:p.fotos}:z("vitrine")||await ta(),a=e.cabanas.filter(n=>n.ativa);if(!a.length)return S("Nenhuma cabana disponível no momento.");const t=document.createElement("dialog");t.className="sheet",t.innerHTML=`
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-head"><h3>Escolha a cabana</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
    <p class="muted small sheet-sub">Depois você escolhe as datas no calendário.</p>
    <div class="sheet-list">${a.map(n=>{const o=oa(n,e.fotos);return`<button type="button" class="sheet-cab" data-id="${l(n.id)}">
        <span class="sc-img">${o?`<img src="${l(D("fotos",o.mini_path))}" alt="">`:Y("ph")}</span>
        <span class="sc-txt"><strong>${l(n.nome)}</strong>
          <span class="muted small">${L.people} até ${n.capacidade} pessoas</span>
          <span class="sc-preco"><b>${R(n.preco_diaria_centavos)}</b> <span class="muted small">/ diária</span></span></span>
        <span class="chev">›</span>
      </button>`}).join("")}</div>`,document.body.appendChild(t),t.addEventListener("close",()=>t.remove()),t.addEventListener("click",n=>{if(n.target===t||n.target.closest("[data-fechar]"))return t.close();const o=n.target.closest(".sheet-cab");o&&(t.close(),E(`#/cabana/${o.dataset.id}/datas`))}),t.showModal()}async function De(){await Sa(Ie)}function Ie({fotos:e,cabanas:a}){const t=e.filter(m=>m.na_galeria),n=a.filter(m=>t.some(g=>g.cabana_id===m.id)),o=p.config;let s="";const i=t.map(m=>({src:D("fotos",m.path),cap:m.legenda})),d=t.length>12;A().innerHTML=`
    <section class="pad">
      <h1 class="title">Galeria</h1>
      ${t.length?`<section class="carousel gal-car" aria-roledescription="carrossel" aria-label="Fotos da chácara">
        <div class="track">${t.map((m,g)=>`<button type="button" class="slide" data-car="${g}" aria-label="Ampliar foto ${g+1}">
          <img src="${l(D("fotos",m.path))}" alt="${l(m.legenda||"Foto da chácara")}" ${g?'loading="lazy"':""} draggable="false">
          ${m.legenda?`<span class="gal-cap">${l(m.legenda)}</span>`:""}</button>`).join("")}</div>
        ${t.length>1?d?'<span class="car-n" aria-live="off"></span>':`<div class="dots">${t.map((m,g)=>`<button aria-label="Foto ${g+1}" data-i="${g}"></button>`).join("")}</div>`:""}
      </section>`:""}
      ${n.length?`<div class="chips"><button class="chip on" data-f="">Todas</button>${n.map(m=>`<button class="chip" data-f="${m.id}">${l(m.nome)}</button>`).join("")}</div>`:""}
      <div class="grid" id="grid"></div>
      ${o.instagram_url?`<a class="insta-card" href="${l(o.instagram_url)}" target="_blank" rel="noopener noreferrer">${L.insta}<span><strong>Quer ver mais fotos e vídeos?</strong><br>Siga a chácara no Instagram</span></a>`:""}
    </section>`;const f=()=>{const m=t.filter(g=>!s||g.cabana_id===s);h("#grid").innerHTML=m.length?m.map((g,y)=>`<button class="thumb" data-i="${y}"><img src="${l(D("fotos",g.mini_path))}" alt="${l(g.legenda||"Foto")}" loading="lazy"></button>`).join(""):'<p class="muted">Nenhuma foto ainda.</p>',q(".thumb").forEach(g=>g.addEventListener("click",()=>fa(m.map(y=>({src:D("fotos",y.path),cap:y.legenda})),+g.dataset.i)))},c=h(".gal-car");c&&(q("[data-car]",c).forEach(m=>m.addEventListener("click",()=>fa(i,+m.dataset.car))),t.length>1&&Ha(c)),q(".chip").forEach(m=>m.addEventListener("click",()=>{s=m.dataset.f,q(".chip").forEach(g=>g.classList.toggle("on",g===m)),f()})),f()}function fa(e,a=0){const t=e.map(r=>typeof r=="string"?{src:r}:r),n=t.length;let o=Math.min(Math.max(0,a),n-1);const s=document.createElement("dialog");s.className="lightbox",s.innerHTML=`
    <div class="lb-track">${t.map(r=>`<figure class="lb-slide"><img alt="${l(r.cap||"")}" draggable="false" decoding="async"></figure>`).join("")}</div>
    <div class="lb-top"><span class="lb-count"></span><button class="lb-close" aria-label="Fechar">✕</button></div>
    <p class="lb-cap"></p>
    ${n>1?'<button class="lb-prev" aria-label="Foto anterior">‹</button><button class="lb-next" aria-label="Próxima foto">›</button>':""}`,document.body.appendChild(s);const i=h(".lb-track",s),d=q(".lb-slide img",s),f=()=>s.clientWidth||window.innerWidth,c=r=>{r>=0&&r<n&&!d[r].src&&(d[r].src=t[r].src)},m=(r=0,u=!0)=>{i.style.transition=u?"transform .28s cubic-bezier(.2,.8,.2,1)":"none",i.style.transform=`translate3d(${-o*f()+r}px,0,0)`},g=(r=!0)=>{[o-1,o,o+1].forEach(c),m(0,r),h(".lb-count",s).textContent=n>1?`${o+1} / ${n}`:"",h(".lb-cap",s).textContent=t[o].cap||"",n>1&&(h(".lb-prev",s).disabled=o===0,h(".lb-next",s).disabled=o===n-1)},y=r=>{o=Math.min(Math.max(0,o+r),n-1),g()};let k=null;i.addEventListener("pointerdown",r=>{r.button>0||(k={x:r.clientX,y:r.clientY,t:Date.now(),eixo:null,id:r.pointerId},i.setPointerCapture(r.pointerId))}),i.addEventListener("pointermove",r=>{if(!k||r.pointerId!==k.id)return;const u=r.clientX-k.x,b=r.clientY-k.y;if(!k.eixo&&Math.hypot(u,b)>8&&(k.eixo=Math.abs(u)>Math.abs(b)?"x":"y"),k.eixo==="x"){const $=o===0&&u>0||o===n-1&&u<0;m($?u/3:u,!1)}else k.eixo==="y"&&b>0&&(i.style.transition="none",i.style.transform=`translate3d(${-o*f()}px,${b}px,0)`,s.style.setProperty("--lb-fundo",String(Math.max(.3,1-b/500))))});const B=r=>{if(!k||r.pointerId!==k.id)return;const u=r.clientX-k.x,b=r.clientY-k.y,$=Date.now()-k.t<250,C=k.eixo;if(k=null,s.style.removeProperty("--lb-fundo"),C==="x"&&(Math.abs(u)>f()*.18||$&&Math.abs(u)>30))return y(u<0?1:-1);if(C==="y"&&(b>120||$&&b>60))return s.close();g()};i.addEventListener("pointerup",B),i.addEventListener("pointercancel",B),h(".lb-close",s).onclick=()=>s.close(),h(".lb-prev",s)?.addEventListener("click",()=>y(-1)),h(".lb-next",s)?.addEventListener("click",()=>y(1)),s.addEventListener("keydown",r=>{r.key==="ArrowLeft"&&y(-1),r.key==="ArrowRight"&&y(1)});const N=()=>g(!1);window.addEventListener("resize",N),s.addEventListener("close",()=>{window.removeEventListener("resize",N),s.remove()}),s.showModal(),g(!1)}const qe=(e,a)=>{const t='<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';return e.startsWith("#")?`<a class="fab" href="${e}" aria-label="${l(a)}" title="${l(a)}">${t}</a>`:`<button type="button" class="fab" id="${e}" aria-label="${l(a)}" title="${l(a)}">${t}</button>`};function gt(e){const a=Aa[e]||{label:e,tone:""};return`<span class="badge ${a.tone}">${l(a.label)}</span>`}async function ja(){const{data:e,error:a}=await w.from("reservas").select("id,codigo,cabana_id,checkin,checkout,diarias,hospedes,valor_centavos,status,expira_em,motivo,comprovante_tentativas,cabanas(nome)").eq("user_id",p.user.id).order("checkin",{ascending:!1}).limit(100);if(a)throw a;return e}async function Ne(){await te("reservas",ja,ga)}let Ba="proximas";const Re=["dom.","seg.","ter.","qua.","qui.","sex.","sáb."],Oe=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];function Va(e){const a=new Date(e+"T12:00:00Z");return{dia:String(a.getUTCDate()).padStart(2,"0"),mes:Oe[a.getUTCMonth()],sem:Re[a.getUTCDay()]}}function za(e){const a=Date.parse(e)-Date.now();if(a<=0)return null;const t=Math.floor(a/36e5),n=Math.floor(a%36e5/6e4);return t?`${t} h ${n} min`:n?`${n} min`:"menos de 1 min"}function Fe(e,a){const t=p.config,n=(i,d)=>`${i.replace(/-/g,"")}T${d.replace(":","")}00`,o=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Chacara Canarinho//Reservas//PT","BEGIN:VEVENT",`UID:${e.id}@chacara-canarinho`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").slice(0,15)}Z`,`DTSTART:${n(e.checkin,t.checkin_hora)}`,`DTEND:${n(e.checkout,t.checkout_hora)}`,`SUMMARY:${t.nome_app} · ${a}`.replace(/[,;]/g," "),`DESCRIPTION:Reserva ${e.codigo} · ${e.hospedes} pessoa(s)`.replace(/[,;]/g," "),t.endereco?`LOCATION:${t.endereco.split("·")[0].trim().replace(/[,;]/g," ")}`:"","END:VEVENT","END:VCALENDAR"].filter(Boolean),s=document.createElement("a");s.href=URL.createObjectURL(new Blob([o.join(`\r
`)],{type:"text/calendar"})),s.download=`reserva-${e.codigo}.ics`,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),2e3)}const Ua=["aguardando_pagamento","em_analise","confirmada"],He={aguardando_pagamento:"⏳",em_analise:"🔎",confirmada:"✅",cancelada:"✕",recusada:"!",expirada:"⌛"};function ga(e){const a=p.fotos||z("vitrine")?.fotos||[],t=p.cabanas||z("vitrine")?.cabanas||[],n=r=>r.cabanas?.nome||t.find(u=>u.id===r.cabana_id)?.nome||"Cabana",o=r=>{const u=a.filter(b=>b.cabana_id===r.cabana_id).sort((b,$)=>($.principal===!0)-(b.principal===!0)||b.ordem-$.ordem)[0];return u?D("fotos",u.mini_path):null},s=p.config,i=da(),d=e.filter(r=>r.checkout>=i&&Ua.includes(r.status)).sort((r,u)=>r.checkin.localeCompare(u.checkin)),f=e.filter(r=>!d.includes(r)),c=Ba==="anteriores"&&f.length?"anteriores":d.length||!f.length?"proximas":"anteriores",m=c==="proximas"?d:f,g=r=>{const u=r.status==="confirmada"?3:r.status==="em_analise"?2:1;return`<ol class="res-steps">${["Reservada","Pagamento","Confirmada"].map((b,$)=>`<li class="${$<u?"ok":""} ${$===u?"now":""}"><span>${$<u?"✓":$+1}</span>${b}</li>`).join("")}</ol>`},y=r=>{if(r.status==="aguardando_pagamento"){const u=r.expira_em?za(r.expira_em):null;return`${g(r)}
        <div class="res-next warn-box">
          <strong>Falta pagar para garantir as datas</strong>
          ${u?`<span>Você tem <b data-expira="${l(r.expira_em)}">${u}</b> para pagar com Pix.</span>`:"<span>O prazo de pagamento terminou; as datas podem ser liberadas.</span>"}
          ${r.motivo&&r.comprovante_tentativas?`<span class="small">${l(r.motivo)}</span>`:""}
        </div>
        <div class="res-actions">
          <button class="btn" data-act="pix">💠 Pagar com Pix</button>
          <label class="btn ghost">${L.clip} Enviar comprovante<input type="file" accept="image/*" data-act="comprovante" hidden></label>
        </div>
        <button class="link danger small res-cancel" data-act="cancelar">Cancelar reserva</button>`}if(r.status==="em_analise")return`${g(r)}
        <div class="res-next info-box"><strong>Comprovante recebido 👍</strong>
          <span>Estamos conferindo o pagamento. Você recebe a confirmação por e-mail e no celular.</span></div>
        <div class="res-actions"><button class="btn ghost" data-act="chat">💬 Falar com o atendente</button></div>`;if(r.status==="confirmada"){const u=Ta(i,r.checkin),b=u>1?`Faltam <b>${u} dias</b> para a sua hospedagem`:u===1?"É <b>amanhã</b>! Prepare as malas 🧳":r.checkin===i?"É <b>hoje</b>! Estamos esperando você 🌿":"Aproveite a sua estadia 🌿",$=ha(s)||s.endereco?Oa(s).google:"";return`<div class="res-next ok-box"><strong>Reserva confirmada</strong><span>${b}.</span></div>
        <div class="res-actions three">
          ${$?`<a class="btn ghost" href="${l($)}" target="_blank" rel="noopener noreferrer">${L.pin} Como chegar</a>`:""}
          <button class="btn ghost" data-act="agenda">${L.cal} Agenda</button>
          <button class="btn ghost" data-act="chat">${L.chat} Atendente</button>
        </div>`}return`${r.motivo?`<p class="res-motivo">${l(r.motivo)}</p>`:""}
      <div class="res-actions"><a class="btn ghost" href="#/cabana/${l(r.cabana_id)}">Reservar de novo</a></div>`},k=r=>{const u=o(r),b=Va(r.checkin),$=Va(r.checkout),C=Aa[r.status]||{label:r.status,tone:""},aa=d.includes(r);return`<article class="res-card ${aa?"":"past"}" data-id="${r.id}">
      <div class="res-head">
        <div class="res-img">${u?`<img src="${l(u)}" alt="" loading="lazy">`:Y("ph")}</div>
        <div class="res-title">
          <span class="res-status ${C.tone}">${He[r.status]||""} ${l(C.label)}</span>
          <h3>${l(n(r))}</h3>
          <span class="res-code">Reserva <b>${l(r.codigo)}</b></span>
        </div>
      </div>
      <div class="res-dates">
        <div class="rd"><small>Entrada</small><strong>${b.dia} ${b.mes}</strong><span>${b.sem} · ${l(s.checkin_hora)}</span></div>
        <div class="rd-mid"><span>${r.diarias} ${r.diarias===1?"noite":"noites"}</span></div>
        <div class="rd"><small>Saída</small><strong>${$.dia} ${$.mes}</strong><span>${$.sem} · ${l(s.checkout_hora)}</span></div>
      </div>
      <div class="res-info"><span>${L.people} ${r.hospedes} ${r.hospedes===1?"pessoa":"pessoas"}</span><strong>${R(r.valor_centavos)}</strong></div>
      ${aa?y(r):Ua.includes(r.status)?"":y(r)}
    </article>`};A().innerHTML=`
    <section class="res-page">
      <header class="page-head"><h1>Minhas reservas</h1></header>
      ${e.length?`<div class="segmented res-tabs">
          <button data-aba="proximas" class="${c==="proximas"?"on":""}">Próximas${d.length?` <span class="seg-n">${d.length}</span>`:""}</button>
          <button data-aba="anteriores" class="${c==="anteriores"?"on":""}">Anteriores${f.length?` <span class="seg-n">${f.length}</span>`:""}</button>
        </div>`:""}
      <div class="res-list">
        ${m.length?m.map(k).join(""):`<div class="empty-chat">
          ${Fa("vazio-ilus",132,132)}
          <h2>${c==="proximas"?"Nenhuma reserva por enquanto":"Nenhuma reserva anterior"}</h2>
          <p class="muted">Escolha uma cabana, veja os dias livres e reserve em poucos toques.</p>
          <p class="small muted">Toque no <b>+</b> para fazer uma reserva.</p></div>`}
      </div>
      ${qe("nova-reserva","Nova reserva")}
    </section>`;const B=setInterval(()=>{q("[data-expira]").forEach(r=>{const u=za(r.dataset.expira);r.textContent=u||"prazo encerrado"})},3e4);oe(()=>clearInterval(B));const N=A().firstElementChild;h("#nova-reserva",N)?.addEventListener("click",()=>Pe().catch(j)),q("[data-aba]",N).forEach(r=>r.addEventListener("click",()=>{Ba=r.dataset.aba,ga(e)})),N.addEventListener("click",async r=>{const u=r.target.closest("button[data-act]");if(!u)return;const b=u.closest(".res-card").dataset.id,$=e.find(C=>C.id===b);if(u.dataset.act==="agenda")return Fe($,n($));if((u.dataset.act==="pix"||u.dataset.act==="chat")&&await F(u,async()=>{const{conversa_id:C}=await Q("chat-ia",{acao:"reserva_criada",reserva_id:b});E(`#/chat/${C}`)}),u.dataset.act==="cancelar"){if(!await W("Cancelar a reserva?","As datas ficam livres para outras pessoas.","Cancelar reserva",!0))return;await F(u,async()=>{const{error:C}=await w.rpc("cancelar_minha_reserva",{p_id:b});if(C)throw C;S("Reserva cancelada."),Object.assign($,{status:"cancelada",motivo:"Cancelada pelo cliente."}),ea("reservas",e),ga(e)})}}),N.addEventListener("change",async r=>{const u=r.target.closest('input[data-act="comprovante"]');if(!u?.files[0])return;const b=u.closest(".res-card").dataset.id,$=u.closest("label");$.classList.add("busy");try{const C=await je(b,u.files[0]);E(`#/chat/${C.conversa_id}`)}catch(C){j(C)}finally{$.classList.remove("busy"),u.value=""}})}async function je(e,a,t){S("Enviando e conferindo o comprovante…");const n=await ue(a),o=`${p.user.id}/${e}/${crypto.randomUUID()}.${Ia(n)}`,{error:s}=await w.storage.from("comprovantes").upload(o,n,{contentType:n.type,upsert:!1});if(s)throw s;const i=await Q("chat-ia",{acao:"comprovante",reserva_id:e,path:o,conversa_id:t});return J("reservas"),i.resultado==="confirmada"?S("Pagamento conferido! Reserva confirmada ✅","ok"):i.resultado==="em_analise"&&S("Comprovante enviado para conferência.","ok"),i}function Be(e={},a={}){const t=n=>l(e[n]??a[n]??"");return`
    <label class="field"><span>Nome completo *</span><input name="nome" required minlength="2" maxlength="80" autocomplete="name" value="${t("nome")}"></label>
    <label class="field"><span>Celular (WhatsApp) *</span><input name="telefone" required inputmode="tel" autocomplete="tel" placeholder="(61) 99999-9999" value="${l(e.telefone?na(e.telefone):a.telefone||"")}"></label>
    <label class="field"><span>Cidade / região onde mora <em class="muted">(opcional)</em></span><input name="regiao" maxlength="80" autocomplete="address-level2" placeholder="Ex.: Brasília - DF" value="${t("regiao")}"></label>
    <fieldset class="field"><legend>Quero receber novidades e promoções</legend>
      <label class="check"><input type="checkbox" name="receber_email" ${e.receber_email??a.receber_email?"checked":""}> Por e-mail</label>
      <label class="check"><input type="checkbox" name="receber_push" ${e.receber_push??a.receber_push?"checked":""}> Por notificação no celular</label>
    </fieldset>`}function Ve(e){const a=e.elements.telefone;a.addEventListener("input",()=>a.value=na(a.value))}async function ba(e,a){const t=e.elements,n=pa(t.telefone.value);if(!n)throw new Error("Informe um celular válido com DDD.");const{data:o,error:s}=await w.rpc("salvar_perfil",{p_nome:t.nome.value.trim(),p_telefone:n,p_regiao:t.regiao.value.trim(),p_receber_email:t.receber_email.checked,p_receber_push:t.receber_push.checked,p_aceite:a});if(s)throw s;return p.perfil=o,t.receber_push.checked&&!await Na()&&await qa(w,Ea.VAPID_PUBLIC_KEY).catch(()=>"erro")==="ios-instalar"&&S("No iPhone, instale o app na tela de início para receber notificações."),V(),o}async function $a(){const e=p.perfil,a=(()=>{try{return localStorage.getItem("tema")||"auto"}catch{return"auto"}})();if(A().innerHTML=`
    <section class="pad narrow">
      <div class="profile-head">
        <div class="avatar-edit">
          <span class="avatar xl" id="me-avatar">${l(ua(e.nome))}</span>
          <label class="avatar-btn" aria-label="Trocar a foto">${L.camera}<input type="file" accept="image/*" id="foto" hidden></label>
        </div>
        <h1 class="title">${l(e.nome)}</h1>
        <p class="muted small">${l(p.user.email||"")}</p>
        ${e.foto_path?'<button class="link small" id="tirar-foto">Remover foto</button>':""}
      </div>
      <form id="perfil" class="stack">
        ${Be(e)}
        <button class="btn block">Salvar</button>
      </form>
      <div class="stack gap-top center">
        <a href="#/menu" class="back">‹ Voltar ao menu</a>
        <button class="link danger small" id="excluir">Excluir minha conta</button>
      </div>
    </section>`,e.foto_path){const n=await Ca(e.foto_path);n&&(h("#me-avatar").innerHTML=`<img src="${l(n)}" alt="">`)}const t=h("#perfil");Ve(t),t.addEventListener("submit",async n=>{n.preventDefault(),await F(t.querySelector("button"),async()=>{await ba(t,!1),S("Dados salvos.","ok")})}),h("#foto").addEventListener("change",async n=>{const o=n.target.files[0];if(!o)return;const s=h(".avatar-edit");s.classList.add("busy");try{await Ga(await Da(o)),S("Foto atualizada.","ok"),$a()}catch(i){j(i)}finally{s.classList.remove("busy")}}),h("#tirar-foto")?.addEventListener("click",async()=>{if(!await W("Remover a foto?","","Remover",!0))return;const n=p.perfil.foto_path,{error:o}=await w.rpc("definir_foto",{p_path:null});if(o)return j(o);await w.storage.from("avatares").remove([n]),p.perfil.foto_path=null,V(),$a()}),h("#excluir").addEventListener("click",async()=>{if(await W("Excluir sua conta?","Seu perfil e sua foto serão apagados. Você perde o acesso às conversas, que ficam guardadas pela chácara por 5 anos. O registro das hospedagens já feitas é mantido, como explica a Política de Privacidade.","Excluir para sempre",!0))try{await Q("excluir-conta",{confirmar:!0}),ma(),await w.auth.signOut(),S("Conta excluída."),E("#/")}catch(n){j(n)}})}let Z=null;const P=(e,a,t,n='<span class="chev">›</span>',o="")=>`<${e?`a href="${e}"`:'button type="button"'} class="li" ${o}><span class="li-ico">${a}</span><span class="grow">${t}</span>${n}</${e?"a":"button"}>`;function ze(){try{return localStorage.getItem("tema")||"auto"}catch{return"auto"}}async function Wa(){const e=p.perfil,a=p.config,t=ze(),n={auto:"Automático",claro:"Claro",escuro:"Escuro"}[t],o=matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0;A().innerHTML=`
    <section class="pad menu-page">
      <section class="profile-card">
        ${p.user?`
          <div class="row gap pc-in">
            <span class="avatar lg" id="menu-avatar">${l(ua(e?.nome||p.user.email))}</span>
            <div class="grow pc-txt"><h2>${l(e?.nome||"")}</h2><div class="pc-mail">${l(p.user.email||"")}</div>
            ${p.admin?'<span class="pc-chip">👑 Administrador</span>':""}</div>
          </div>
          <a class="btn sm pc-btn" href="#/perfil">Editar perfil</a>`:`<div class="pc-in"><div class="pc-emoji">🏡</div><h2>Bem-vindo(a) à ${l(a.nome_app)}</h2>
          <p class="pc-mail">Entre para reservar, conversar com o atendente e acompanhar suas reservas.</p>
          <a class="btn sm pc-btn" href="#/entrar">Entrar ou criar conta</a></div>`}
      </section>

      ${p.user?`<div class="list-title">Minha conta</div><nav class="list">
        ${P("#/perfil","👤","Meu perfil")}
        ${P("#/reservas","📅","Minhas reservas")}
        ${P("#/chat","💬","Conversas com o atendente")}
        <div class="li"><span class="li-ico">🔔</span><span class="grow">Notificações no celular<br><span class="muted small" id="push-hint">Confirmação das reservas na hora</span></span>
          <label class="switch"><input type="checkbox" id="notif" aria-label="Notificações no celular"><i></i></label></div>
      </nav>`:""}

      ${p.admin?`<div class="list-title">Administração</div><nav class="list">
        ${$e.map(([i,d,f])=>P(`#/admin/${i}`,d,f,i==="reservas"?'<span id="m-validar"><span class="chev">›</span></span>':i==="conversas"?'<span id="m-chamados"><span class="chev">›</span></span>':'<span class="chev">›</span>')).join("")}
      </nav>
      <div class="list-title">Testar avisos <span class="muted">(chegam só para você)</span></div><nav class="list" id="testes">
        ${P("","✉️",`Enviar e-mail de teste<br><span class="muted small">${l(p.user.email||"")}</span>`,'<span class="chev">›</span>','data-teste="email"')}
        ${P("","🔔",'Enviar notificação de teste<br><span class="muted small">Para os seus celulares com notificação ligada</span>','<span class="chev">›</span>','data-teste="push"')}
        ${P("","✅",'Simular reserva confirmada<br><span class="muted small">O e-mail e a notificação que o cliente recebe</span>','<span class="chev">›</span>','data-teste="confirmacao"')}
      </nav>`:""}

      <div class="list-title">App</div><nav class="list">
        ${P("#/galeria","🖼️","Galeria de fotos")}
        ${a.instagram_url?P(a.instagram_url,"📸","Instagram da chácara",'<span class="chev">↗</span>','target="_blank" rel="noopener noreferrer"'):""}
        ${o?"":P("","📲","Instalar o app no celular",'<span class="chev">›</span>','id="instalar"')}
        ${P("","🌗","Tema",`<span class="muted small">${n}</span>`,'id="tema"')}
        ${P("#/privacidade","🔒","Política de privacidade")}
        ${P("#/termos","📄","Termos de uso")}
        ${p.user?P("","🚪","Sair da conta","",'id="sair"'):""}
      </nav>
      <p class="center small muted gap-top">${l(a.nome_app)}${a.endereco?` · ${l(a.endereco)}`:""}</p>
    </section>`,e?.foto_path&&Ca(e.foto_path).then(i=>{const d=h("#menu-avatar");i&&d&&(d.innerHTML=`<img src="${l(i)}" alt="">`)}),p.admin&&(w.from("conversas").select("id",{count:"exact",head:!0}).eq("atendimento","chamou").then(({count:i,error:d})=>{const f=h("#m-chamados");!d&&f&&i&&(f.innerHTML=`<span class="count">🙋 ${i}</span>`)}),w.from("reservas").select("id",{count:"exact",head:!0}).or("status.eq.em_analise,and(status.eq.confirmada,validada.eq.false)").then(({count:i})=>{const d=h("#m-validar");d&&i&&(d.innerHTML=`<span class="count">${i}</span>`)}));const s=h("#notif");if(s){const i=he();i!=="ok"?(s.disabled=!0,h("#push-hint").textContent=i==="ios-instalar"?"No iPhone, instale o app na tela de início primeiro":"Este navegador não recebe notificações"):(Na().then(d=>s.checked=d).catch(()=>{}),s.addEventListener("change",async()=>{s.disabled=!0;try{if(s.checked){const d=await qa(w,Ea.VAPID_PUBLIC_KEY);d!=="ativo"?(s.checked=!1,S(d==="negado"?"Notificações bloqueadas nas configurações do navegador.":"Não foi possível ativar neste celular.","bad")):S("Notificações ativadas.","ok")}else await me(w),S("Notificações desativadas neste celular.")}catch(d){s.checked=!s.checked,j(d)}finally{s.disabled=!1}}))}h("#testes")?.addEventListener("click",async i=>{const d=i.target.closest("[data-teste]");if(!d||d.disabled)return;const f=d.dataset.teste;d.disabled=!0,d.classList.add("testando");try{const c=await Q("admin-reserva",{acao:"testar",tipo:f}),m="Este celular ainda não está com as notificações ligadas. Ligue em Menu › Notificações no celular e teste de novo.";let g,y;f==="email"?(g=c.email_enviado?"✉️ E-mail enviado":"✉️ O e-mail não foi enviado",y=c.email_enviado?`Enviado para ${c.para}${c.remetente?`, de ${c.remetente}`:""}. Confira a caixa de entrada (e o spam, na primeira vez).`:c.email_configurado?"O Gmail recusou o envio. Confira se a senha de app (GMAIL_APP_PASSWORD) está certa e se a verificação em duas etapas continua ligada na conta.":"O envio de e-mail não está configurado no servidor: confira GMAIL_USER (variável) e GMAIL_APP_PASSWORD (segredo) no GitHub e publique as funções."):f==="push"?(g=c.push_enviados?"🔔 Notificação enviada":"🔔 A notificação não foi enviada",y=c.push_enviados?`Enviada para ${c.push_enviados} aparelho(s). Ela aparece em alguns segundos (com o app fechado ou em segundo plano).`:c.push_configurado?c.aparelhos?"O serviço de notificação recusou o envio. Desligue e ligue as notificações no Menu e teste de novo.":m:"As notificações não estão configuradas no servidor: confira VAPID_PRIVATE_KEY (segredo) e VAPID_PUBLIC_KEY (variável) no GitHub e publique as funções."):(g="✅ Reserva de exemplo simulada",y=[c.email_configurado?`E-mail "Reserva confirmada" enviado para ${c.para}.`:"E-mail não enviado: o envio não está configurado no servidor.",c.push_configurado&&c.aparelhos?`Notificação enviada para ${c.aparelhos} aparelho(s).`:c.push_configurado?m:"Notificação não enviada: não está configurada no servidor.","Nada foi gravado: é só uma simulação (código TESTE1)."].join(`

`)),W(g,y,"Entendi")}catch(c){j(c)}finally{d.disabled=!1,d.classList.remove("testando")}}),h("#tema").addEventListener("click",()=>{Ya({auto:"claro",claro:"escuro",escuro:"auto"}[t]),Wa()}),h("#instalar")?.addEventListener("click",async()=>{if(Z){Z.prompt(),await Z.userChoice.catch(()=>{}),Z=null;return}const i=/iphone|ipad|ipod/i.test(navigator.userAgent);W("Instalar o app",i?'No Safari, toque em Compartilhar (quadrado com a seta) e depois em "Adicionar à Tela de Início".':'No menu do navegador (⋮), toque em "Instalar app" ou "Adicionar à tela inicial".',"Entendi")}),h("#sair")?.addEventListener("click",async()=>{await W("Sair da conta?","Você continua vendo as cabanas, mas sem reservas e conversas.","Sair")&&(ma(),await w.auth.signOut(),E("#/"))})}async function Ga(e){const a=`${p.user.id}/${crypto.randomUUID()}.${Ia(e)}`,{error:t}=await w.storage.from("avatares").upload(a,e,{contentType:e.type});if(t)throw t;const{error:n}=await w.rpc("definir_foto",{p_path:a});if(n)throw n;const o=p.perfil.foto_path;o&&w.storage.from("avatares").remove([o]),p.perfil.foto_path=a,V()}let wa=!1;async function ra(){const e=p.user,a=e?.user_metadata||{},t=a.avatar_url||a.picture;if(!(wa||!p.perfil||p.perfil.foto_path||a.foto_google||!Ma(e))&&!(!t||!t.startsWith("https://lh3.googleusercontent.com/"))){wa=!0;try{const n=await fetch(t.replace(/=s\d+(-c)?$/,"=s800-c"));if(!n.ok)return;const o=await n.blob();if(!o.type.startsWith("image/"))return;await Ga(await Da(o)),await w.auth.updateUser({data:{foto_google:!0}}).catch(()=>{})}catch{}finally{wa=!1}}}function Ya(e){const a=document.documentElement;try{e==="auto"?localStorage.removeItem("tema"):localStorage.setItem("tema",e)}catch{}e==="auto"?a.removeAttribute("data-theme"):a.setAttribute("data-theme",e==="escuro"?"dark":"light")}const ya=()=>location.origin+location.pathname;function Ue(){if(p.user)return E("#/");A().innerHTML=`
    <section class="pad narrow auth">
      ${Y("auth-logo",84,84)}
      <h1 class="title center">Entrar</h1>
      <button class="btn google block" id="google">${L.google} Entrar com o Google</button>
      <p class="muted small center">Seu cadastro é criado na hora, já com a sua foto do Google.</p>
      <div class="divider"><span>ou com e-mail e senha</span></div>
      <form id="login" class="stack">
        <label class="field"><span>E-mail</span><input name="email" type="email" required autocomplete="email"></label>
        <label class="field"><span>Senha</span><input name="senha" type="password" required minlength="8" autocomplete="current-password"></label>
        <button class="btn block">Entrar</button>
      </form>
      <div class="row between small gap-top"><a href="#/cadastro">Não tenho conta Google: criar cadastro</a><button class="link" id="esqueci">Esqueci a senha</button></div>
      <p class="muted small center gap-top">Ao entrar você concorda com os <a href="#/termos">Termos de uso</a> e a <a href="#/privacidade">Política de privacidade</a>.</p>
    </section>`,h("#google").addEventListener("click",async e=>{await F(e.currentTarget,async()=>{const{error:a}=await w.auth.signInWithOAuth({provider:"google",options:{redirectTo:ya()}});if(a)throw a})}),h("#login").addEventListener("submit",async e=>{e.preventDefault();const a=e.target.elements;await F(e.target.querySelector("button"),async()=>{const{error:t}=await w.auth.signInWithPassword({email:a.email.value.trim(),password:a.senha.value});if(t)throw new Error(/invalid/i.test(t.message)?"E-mail ou senha incorretos.":/confirm/i.test(t.message)?"Confirme o seu e-mail pelo link que enviamos.":t.message)})}),h("#esqueci").addEventListener("click",async()=>{const e=h("#login").elements.email.value.trim();if(!Pa.test(e))return S("Escreva o seu e-mail no campo acima.");const{error:a}=await w.auth.resetPasswordForEmail(e,{redirectTo:ya()+"#/nova-senha"});if(a)return j(a);S("Enviamos um link para criar uma nova senha.","ok")})}const We='<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';function Qa(e={},{comConta:a=!1}={}){const t=n=>l(e[n]??"");return`
    <label class="cad-field"><span>Nome completo</span>
      <input name="nome" required minlength="2" maxlength="80" autocomplete="name" placeholder="Como você se chama?" value="${t("nome")}"></label>
    ${a?`
    <label class="cad-field"><span>E-mail</span>
      <input name="email" type="email" required autocomplete="email" inputmode="email" placeholder="seu@email.com"></label>
    <label class="cad-field"><span>Senha</span>
      <div class="cad-input"><input name="senha" type="password" required minlength="8" autocomplete="new-password" placeholder="Mínimo 8 caracteres">
      <button type="button" class="cad-olho" aria-label="Mostrar a senha" title="Mostrar a senha">${We}</button></div></label>`:""}
    <label class="cad-field"><span>Celular (WhatsApp)</span>
      <div class="cad-input cad-tel"><span class="cad-ddi">🇧🇷 +55</span>
        <input name="telefone" required inputmode="tel" autocomplete="tel-national" placeholder="(61) 99999-9999" value="${l(e.telefone||"")}">
        <span class="cad-ok" aria-hidden="true">✓</span></div>
      <small class="cad-help">Para a chácara falar com você sobre as reservas. Não enviamos propaganda por aqui.</small></label>
    <label class="cad-field"><span>Cidade onde mora <em>(opcional)</em></span>
      <input name="regiao" maxlength="80" autocomplete="address-level2" placeholder="Ex.: Brasília - DF" value="${t("regiao")}"></label>
    <div class="cad-box">
      <strong>Quer receber novidades e promoções?</strong>
      <label class="cad-switch"><span>✉️ Por e-mail</span><span class="switch"><input type="checkbox" name="receber_email" ${e.receber_email?"checked":""}><i></i></span></label>
      <label class="cad-switch"><span>🔔 Por notificação no celular</span><span class="switch"><input type="checkbox" name="receber_push" ${e.receber_push?"checked":""}><i></i></span></label>
    </div>
    <label class="cad-termos">
      <input type="checkbox" name="aceite" required>
      <span class="cad-check" aria-hidden="true"></span>
      <span>Li e aceito os <a href="#" data-doc="termos">Termos de uso</a> e a <a href="#" data-doc="privacidade">Política de privacidade</a>.</span>
    </label>`}function Ja(e){const a=e.elements,t=e.querySelector("button.cad-enviar"),n=e.querySelector(".cad-falta"),o=a.telefone,s=()=>{const i=!!pa(o.value);o.closest(".cad-tel").classList.toggle("valido",i);const d=[];a.nome.value.trim().length<2&&d.push("o seu nome"),a.email&&!Pa.test(a.email.value.trim())&&d.push("o e-mail"),a.senha&&a.senha.value.length<8&&d.push("uma senha de 8 caracteres"),i||d.push("o celular com DDD"),a.aceite.checked||d.push("aceitar os termos"),t.disabled=d.length>0,n.textContent=d.length?`Falta: ${d.join(", ")}.`:""};o.value&&(o.value=na(o.value)),o.addEventListener("input",()=>o.value=na(o.value)),e.addEventListener("input",s),e.addEventListener("change",s),e.querySelector(".cad-olho")?.addEventListener("click",i=>{const d=a.senha;d.type=d.type==="password"?"text":"password",i.currentTarget.classList.toggle("on",d.type==="text")}),e.querySelectorAll("[data-doc]").forEach(i=>i.addEventListener("click",d=>{d.preventDefault(),Ge(i.dataset.doc)})),s()}async function Ge(e){const a=document.createElement("dialog");a.className="sheet doc-sheet",a.innerHTML='<div class="sheet-handle"></div><div class="sheet-head"><span></span><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div><div class="doc"><p class="muted">Carregando…</p></div><button type="button" class="btn block" data-fechar>Fechar</button>',document.body.appendChild(a),a.addEventListener("close",()=>a.remove()),a.addEventListener("click",t=>(t.target===a||t.target.closest("[data-fechar]"))&&a.close()),a.showModal();try{const t=await fetch(`${e}.html`),n=new DOMParser().parseFromString(await t.text(),"text/html").querySelector("main");n.querySelectorAll("script, iframe, object").forEach(o=>o.remove()),n.querySelectorAll('a[href="./"]').forEach(o=>o.closest("p")?.remove()),n.querySelectorAll('a[href$=".html"]').forEach(o=>o.removeAttribute("href")),a.querySelector(".doc").innerHTML=n.innerHTML}catch{a.querySelector(".doc").innerHTML='<p class="warn">Não foi possível abrir agora. Confira a internet.</p>'}}function Ye(){if(p.user)return E("#/");A().innerHTML=`
    <section class="cad">
      <a href="#/entrar" class="back cad-voltar">‹ Voltar</a>
      <header class="cad-hero">
        ${Y("cad-logo",64,64)}
        <h1>Criar sua conta</h1>
        <p>Leva menos de um minuto. Depois é só escolher a cabana e as datas.</p>
      </header>
      <form id="cad" class="cad-form" novalidate>
        ${Qa({},{comConta:!0})}
        <button class="btn lg block cad-enviar" disabled>Criar conta</button>
        <p class="cad-falta small muted center"></p>
      </form>
    </section>`;const e=h("#cad");Ja(e),e.addEventListener("submit",async a=>{a.preventDefault();const t=e.elements;await F(e.querySelector(".cad-enviar"),async()=>{if(!pa(t.telefone.value))throw new Error("Informe um celular válido com DDD.");const n={nome:t.nome.value.trim(),telefone:t.telefone.value,regiao:t.regiao.value.trim(),receber_email:t.receber_email.checked,receber_push:t.receber_push.checked},{data:o,error:s}=await w.auth.signUp({email:t.email.value.trim(),password:t.senha.value,options:{emailRedirectTo:ya(),data:{full_name:n.nome}}});if(s)throw new Error(/registered|already/i.test(s.message)?"Este e-mail já tem conta. Volte e toque em Entrar.":s.message);try{localStorage.setItem("cadastro-pendente",JSON.stringify(n))}catch{}o.session?(p.user=o.user,await ba(e,!0),localStorage.removeItem("cadastro-pendente"),S("Conta criada! Bem-vindo(a) 🎉","ok"),E("#/")):A().innerHTML=`<section class="cad"><header class="cad-hero">
          <div class="cad-emoji">📬</div>
          <h1>Confirme o seu e-mail</h1>
          <p>Enviamos um link para <strong>${l(t.email.value.trim())}</strong>. Abra o link para ativar a conta (confira também o spam).</p>
          <a class="btn lg" href="#/entrar">Voltar para entrar</a></header></section>`})})}function Qe(){if(!p.user)return E("#/entrar");if(p.perfil)return E("#/");let e={};try{e=JSON.parse(localStorage.getItem("cadastro-pendente")||"{}")}catch{}const a=p.user.user_metadata||{};e.nome||=a.full_name||a.name||"";const t=String(e.nome||"").split(" ")[0],n=Ma(p.user);A().innerHTML=`
    <section class="cad">
      <header class="cad-hero">
        <span class="avatar cad-avatar">${l(ua(e.nome||p.user.email))}</span>
        <h1>${t?`Olá, ${l(t)}! 👋`:"Bem-vindo(a)! 👋"}</h1>
        <p>Falta só um passo para concluir o seu cadastro.</p>
        <ol class="cad-passos" aria-label="Etapas do cadastro">
          <li class="ok"><span>✓</span>${n?"Conta Google":"Conta criada"}</li>
          <li class="agora"><span>2</span>Seus dados</li>
        </ol>
        <p class="cad-email small">${l(p.user.email||"")}</p>
      </header>
      <form id="comp" class="cad-form" novalidate>
        ${Qa(e)}
        <button class="btn lg block cad-enviar" disabled>Concluir cadastro</button>
        <p class="cad-falta small muted center"></p>
      </form>
      <p class="center"><button class="link small" id="sair">Entrar com outra conta</button></p>
    </section>`;const o=h("#comp");Ja(o),o.addEventListener("submit",async s=>{s.preventDefault(),await F(o.querySelector(".cad-enviar"),async()=>{await ba(o,!0);try{localStorage.removeItem("cadastro-pendente")}catch{}ra(),S("Cadastro concluído. Bem-vindo(a) 🎉","ok"),E(sessionStorage.getItem("depois-de-entrar")||"#/"),sessionStorage.removeItem("depois-de-entrar")})}),h("#sair").addEventListener("click",()=>w.auth.signOut().then(()=>E("#/entrar")))}function Je(){A().innerHTML=`
    <section class="pad narrow auth">
      <h1 class="title">Nova senha</h1>
      <form id="ns" class="stack">
        <label class="field"><span>Nova senha (mínimo 8 caracteres)</span><input name="senha" type="password" minlength="8" required autocomplete="new-password"></label>
        <button class="btn block">Salvar senha</button>
      </form>
    </section>`,h("#ns").addEventListener("submit",async e=>{e.preventDefault(),await F(e.target.querySelector("button"),async()=>{const{error:a}=await w.auth.updateUser({password:e.target.elements.senha.value});if(a)throw a;S("Senha alterada.","ok"),E("#/")})})}async function Ke(e){const a=await fetch(`${e}.html`),n=new DOMParser().parseFromString(await a.text(),"text/html").querySelector("main");n.querySelectorAll("script, iframe, object").forEach(o=>o.remove()),n.querySelectorAll('a[href="./"]').forEach(o=>o.closest("p")?.remove()),n.querySelectorAll('a[href$=".html"]').forEach(o=>o.setAttribute("href","#/"+o.getAttribute("href").replace(".html",""))),A().innerHTML=`<section class="pad narrow doc"><a href="#/menu" class="back">‹ Menu</a>${n.innerHTML}</section>`}async function Xe(e){const a=p.user?.id;if(p.user=e?.user??null,p.user?.id!==a){if(p.perfil=null,p.user||(ma(),se()),await ca().catch(()=>{}),V(),p.user&&p.perfil){ra(),Ra(w).catch(()=>{});const t=sessionStorage.getItem("depois-de-entrar");if(t&&location.hash.startsWith("#/entrar"))return sessionStorage.removeItem("depois-de-entrar"),E(t)}if(p.user&&location.hash.startsWith("#/entrar"))return E("#/");X()}}async function Ze(){if("serviceWorker"in navigator){const a=!!navigator.serviceWorker.controller;let t=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{!a||t||(t=!0,location.reload())}),navigator.serviceWorker.register("sw.js").then(n=>n.update()).catch(()=>{})}window.addEventListener("beforeinstallprompt",a=>{a.preventDefault(),Z=a}),document.getElementById("theme-btn").addEventListener("click",()=>{const a=document.documentElement.getAttribute("data-theme")==="dark"||!document.documentElement.hasAttribute("data-theme")&&matchMedia("(prefers-color-scheme: dark)").matches;Ya(a?"claro":"escuro")});const[,{data:e}]=await Promise.all([La().catch(()=>{}),w.auth.getSession()]);p.user=e.session?.user??null,p.user&&re()?(V(),ca().then(()=>{V(),p.user&&!p.perfil&&X(),p.perfil&&ra()}).catch(()=>{})):(await ca().catch(()=>{}),V(),p.user&&p.perfil&&ra()),p.user&&Ra(w).catch(()=>{}),w.auth.onAuthStateChange((a,t)=>{if(a==="PASSWORD_RECOVERY")return E("#/nova-senha");setTimeout(()=>Xe(t),0)}),window.addEventListener("hashchange",X),navigator.serviceWorker?.addEventListener("message",a=>{a.data?.type==="push"&&location.hash.startsWith("#/reservas")&&X(),a.data?.type==="push"&&sa()}),document.addEventListener("visibilitychange",()=>!document.hidden&&sa()),setInterval(()=>!document.hidden&&sa(),6e4),X(),setTimeout(at,1500)}function at(){la("vitrine",ta),!(!p.user||!p.perfil)&&(la("reservas",ja),la("conversas",fe),ge())}Ze();export{L as ICON,Pe as escolherCabana,qe as fab,ja as fetchReservas,oa as fotoPrincipal,va as fotosDaCabana,Fa as ilustracaoApp,_e as ilustracaoEscala,ye as ilustracaoUrl,Y as logoApp,fa as openLightbox,je as sendReceipt,Ya as setTheme,gt as statusBadge};
