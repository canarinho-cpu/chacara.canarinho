import{CONFIG as Ea}from"./config.js";import{sb as y,state as p,$ as f,$$ as q,view as T,go as E,toast as S,fail as j,errMsg as xa,api as Q,busy as F,confirmDialog as W,loadConfig as La,publicUrl as D,marcaUrl as ne,avatarUrl as Ca,updateAccountButton as V,loadPerfil as ca,isGoogleUser as Ma,screenShow as oe,screenCached as z,screenUpdate as ea,screenForget as J,screenClearAll as re,screenPrefetch as la,novaRota as ie,showVitrine as Sa,aoSairDaTela as ce,fetchVitrine as ta,perfilGuardado as le,loadFeriados as de,atualizarChamados as sa}from"./core.js";import{estadia as pe,nomeFeriado as ue,temPrecoEspecial as me}from"./precos.js";import{esc as l,fmtMoney as R,fmtDate as G,addDays as K,daysBetween as Ta,todayISO as da,MESES as he,STATUS as Aa,normalizePhone as pa,maskPhone as na,EMAIL_RE as Pa,initials as ua}from"./util.js";import{resizeAvatar as Da,resizeReceipt as ve,extOf as Ia}from"./images.js";import{enablePush as qa,disablePush as fe,pushActive as Na,pushSupport as ge,syncPush as Ra}from"./push.js";import{renderChat as be,clearChatCache as ma,fetchConversas as $e,prepararAtendendo as we}from"./chat.js";import{renderAdmin as ye,ADMIN_SECOES as _e}from"./admin.js";import{temAlfinete as ha,rotas as Oa,montarMapas as ke}from"./map.js";const L={home:'<svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',cal:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M4 5.5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/></svg>',photo:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg>',user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',insta:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',google:'<svg viewBox="0 0 48 48" class="g"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',people:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5c2.5 0 4.5 1.5 5.5 4.5"/></svg>',clip:'<svg viewBox="0 0 24 24"><path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 7"/></svg>',send:'<svg viewBox="0 0 24 24"><path d="M4 12 20 4l-6 16-3-7z"/></svg>',menu:'<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',pin:'<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>'};function Y(a="",e="",t=""){const n=p.config?.icone_versao,o=`${e?` width="${e}"`:""}${t?` height="${t}"`:""}`;return n>0?`<img src="${l(ne(n,"icon-512.png"))}" alt=""${o} class="${a} logo-custom">`:`<img src="icons/logo.svg" alt=""${o} class="${a}">`}const Ee=()=>{const a=p.config?.ilustracao_versao;return a>0?D("marca",`ilustracao/v${a}.png`):"icons/passaro.svg"},xe=()=>{const a=Number(p.config?.ilustracao_tamanho);return a>=50&&a<=200?a/100:1},Fa=(a="",e="",t="")=>{const n=xe();return e&&(e=Math.round(e*n)),t&&(t=Math.round(t*n)),`<img src="${l(Ee())}" alt="" class="ilustracao ${a}"${e?` width="${e}"`:""}${t?` height="${t}"`:""}>`},Le=new Set(["","cabana","galeria","menu","entrar","cadastro","termos","privacidade","nova-senha"]),Ha=a=>/^#\/(chat|admin\/conversas)\/?$/.test(a),ja=a=>/^#\/(chat|admin\/conversas)\/[^/]+/.test(a);let Ba=location.hash;const Ce=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function Me(a,e){const t=Ha(a)&&ja(e)?"frente":ja(a)&&Ha(e)?"volta":"";if(!t||Ce())return;const n=T(),o=n.getBoundingClientRect(),s=n.cloneNode(!0);s.removeAttribute("id"),s.querySelectorAll("[id]").forEach(h=>h.removeAttribute("id")),s.style.cssText=`position:absolute;top:${o.top}px;left:${o.left}px;width:${o.width}px;margin:0`;const r=document.createElement("div");r.className=`tela-sai ${t}`,r.setAttribute("aria-hidden","true"),r.inert=!0,r.append(s),document.body.append(r);const d=[...n.querySelectorAll("*")].map((h,b)=>[b,h.scrollTop]).filter(([,h])=>h>0);if(d.length){const h=s.querySelectorAll("*");d.forEach(([b,_])=>h[b]&&(h[b].scrollTop=_))}const v=()=>r.remove();r.addEventListener("animationend",v,{once:!0}),setTimeout(v,600);const i=()=>{const h=n.firstElementChild;if(!h)return!1;h.classList.add("tela-entra",t);const b=()=>h.classList.remove("tela-entra",t);return h.addEventListener("animationend",b,{once:!0}),setTimeout(b,600),!0},m=new MutationObserver(()=>i()&&m.disconnect());m.observe(n,{childList:!0}),setTimeout(()=>m.disconnect(),1500)}async function X(){const[a,...e]=location.hash.replace(/^#\/?/,"").split("/");Me(Ba,location.hash),Ba=location.hash,ie(),window.scrollTo(0,0),Te(a);try{if(p.config||await La(),p.user&&!p.perfil&&!["completar","termos","privacidade","nova-senha"].includes(a))return E("#/completar");if(!p.user&&!Le.has(a))return sessionStorage.setItem("depois-de-entrar",location.hash),E("#/entrar");switch(a){case"":return await Ae();case"cabana":return await Ne(e[0],e[1]==="datas");case"reservas":return await je();case"chat":return await be(e[0]);case"galeria":return await Oe();case"menu":return await Qa();case"perfil":return await $a();case"entrar":return Je();case"cadastro":return Ze();case"completar":return at();case"nova-senha":return et();case"termos":case"privacidade":return await tt(a);case"admin":return!p.admin||!e[0]?E("#/menu"):await ye(e[0],e.slice(1));default:return E("#/")}}catch(t){T().innerHTML=`<div class="empty"><p>${l(xa(t))}</p><button class="btn" id="retry">Tentar de novo</button></div>`,f("#retry").addEventListener("click",()=>location.reload())}}const Se=[["","Início",L.home],["reservas","Reservas",L.cal],["chat","Chat",L.chat],["galeria","Galeria",L.photo],["menu","Menu",L.menu]];function Te(a){const e=document.getElementById("tabbar");e.childElementCount||(e.innerHTML=Se.map(([n,o,s])=>`<a href="#/${n}" data-tab="${n}">${n==="chat"?`<span class="tab-ico">${s}<b class="tab-n" id="tab-chat-n" hidden></b></span>`:s}<span>${o}</span></a>`).join("")),sa();const t=a==="cabana"?location.hash.endsWith("/datas")?"reservas":"":["perfil","admin","termos","privacidade"].includes(a)?"menu":a;q("a",e).forEach(n=>n.classList.toggle("on",n.dataset.tab===t)),e.hidden=["entrar","cadastro","completar","nova-senha"].includes(a)}function va(a,e){return e.filter(t=>t.cabana_id===a.id).sort((t,n)=>(n.principal===!0)-(t.principal===!0)||t.ordem-n.ordem)}const oa=(a,e)=>va(a,e)[0]||null;function yt(a,e){const t=oa(a,e);return t?D("fotos",t.mini_path):null}async function Ae(){await Sa(Pe)}function Pe({cabanas:a,fotos:e}){const t=p.config,n=a.filter(s=>s.ativa),o=[...a.filter(s=>s.ativa).map(s=>({f:oa(s,e),c:s})).filter(s=>s.f),...e.filter(s=>s.no_carrossel&&!s.cabana_id).map(s=>({f:s,c:null}))];T().innerHTML=`
    ${o.length?`<section class="carousel" aria-roledescription="carrossel">
      <div class="track">${o.map(({f:s,c:r},d)=>{const v=`<img src="${l(D("fotos",s.path))}" alt="${l(r?.nome||s.legenda||"Foto da chácara")}" ${d?'loading="lazy"':""}>`,i=r?`<figcaption><strong>${l(r.nome)}</strong><span>${R(r.preco_diaria_centavos)} a diária · ver dias livres ›</span></figcaption>`:s.legenda?`<figcaption>${l(s.legenda)}</figcaption>`:"";return r?`<a class="slide" href="#/cabana/${r.id}">${v}${i}</a>`:`<figure class="slide">${v}${i}</figure>`}).join("")}</div>
      ${o.length>1?`<div class="dots">${o.map((s,r)=>`<button aria-label="Foto ${r+1}" data-i="${r}"></button>`).join("")}</div>`:""}
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
        ${n.length?`<div class="cabin-list">${n.map(s=>{const r=oa(s,e),d=va(s,e).length;return`<a class="cabin-card" href="#/cabana/${s.id}">
            <div class="cc-img">
              ${r?`<img src="${l(D("fotos",r.path))}" alt="${l(s.nome)}" loading="lazy">`:Y("ph")}
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
    </div>`,o.length>1&&Va(f(".carousel")),ke(T()),f("#ver-cabanas").addEventListener("click",s=>{s.preventDefault(),f("#cabanas").scrollIntoView({behavior:"smooth",block:"start"})}),De(n)}async function De(a){const e=da(),t=K(e,89),n=(r,d)=>{const v=document.querySelector(`[data-livre="${r}"]`);v&&(v.classList.remove("on","off"),d===null?(v.textContent="Sem datas nos próximos 90 dias",v.classList.add("off")):(v.textContent=d===e?"● Livre hoje":d===K(e,1)?"● Livre amanhã":`● Livre a partir de ${G(d).slice(0,5)}`,v.classList.add("on")))},o=z("livres")||{};for(const r of a)(o[r.id]===null||o[r.id]>=e)&&n(r.id,o[r.id]);const s={};await Promise.all(a.map(async r=>{try{const{data:d,error:v}=await y.rpc("disponibilidade",{p_cabana:r.id,p_de:e,p_ate:t});if(v)throw v;s[r.id]=d.find(i=>i.situacao==="livre")?.dia??null,n(r.id,s[r.id])}catch{r.id in o||document.querySelector(`[data-livre="${r.id}"]`)?.remove()}})),ea("livres",{...o,...s})}function Va(a){const e=f(".track",a),t=q(".dots button",a),n=f(".car-n",a),o=q(".slide",e).length;let s=0,r=!1;const d=()=>{t.forEach((m,h)=>m.classList.toggle("on",h===s)),n&&(n.textContent=`${s+1} / ${o}`)},v=(m,h=!0)=>{s=(m+o)%o,e.scrollTo({left:s*e.clientWidth,behavior:h?"smooth":"auto"}),d()};t.forEach(m=>m.addEventListener("click",()=>v(+m.dataset.i))),e.addEventListener("scroll",()=>{const m=Math.round(e.scrollLeft/e.clientWidth);m!==s&&m>=0&&m<o&&(s=m,d())},{passive:!0}),e.addEventListener("pointerdown",()=>r=!0),e.addEventListener("pointerup",()=>setTimeout(()=>r=!1,4e3)),v(0,!1);const i=setInterval(()=>{if(!a.isConnected)return clearInterval(i);!r&&!document.hidden&&v(s+1)},4500)}function Ie(a){if(!me(a))return"";const e=a.preco_fim_semana_centavos??a.preco_diaria_centavos,t=a.preco_feriado_centavos??e;return`<div class="precos-cab">
    <span><small>Segunda a quinta</small><b>${R(a.preco_diaria_centavos)}</b></span>
    <span><small>Sexta a domingo</small><b>${R(e)}</b></span>
    <span><small>Feriados</small><b>${R(t)}</b></span>
  </div>`}function qe(a,e,t,n){const{total:o,grupos:s}=pe(a,e,t,n),r=(v,i)=>i.n?`<div class="row between small muted"><span>${i.n} × ${v}</span><span>${R(i.valor)}</span></div>`:"";return(s.fim_semana.n||s.feriado.n?r("diária normal",s.normal)+r("sexta a domingo",s.fim_semana)+r(`feriado${s.feriado.nomes.length?` (${l(s.feriado.nomes.join(", "))})`:""}`,s.feriado):"")+`<div class="row between total"><span>Total</span><strong>${R(o)}</strong></div>`}async function Ne(a,e=!1){const t=p.cabanas&&p.fotos?{cabanas:p.cabanas,fotos:p.fotos}:z("vitrine"),{cabanas:n,fotos:o}=t||await ta();t&&ta().then(g=>ea("vitrine",g)).catch(()=>{});const s=n.find(g=>g.id===a&&g.ativa);if(!s)return E("#/");const r=p.config,d=va(s,o),v=da(),i={checkin:null,checkout:null,month:v.slice(0,7),days:new Map};let m=p.feriados||[];de().then(g=>{m=g,b.isConnected&&(u(),w())}).catch(()=>{}),T().innerHTML=`
    ${d.length?`<button type="button" class="cab-hero" data-i="0" aria-label="Ver fotos da ${l(s.nome)}">
        <img src="${l(D("fotos",d[0].path))}" alt="${l(d[0].legenda||s.nome)}">
        ${d.length>1?`<span class="cab-count">📷 ${d.length} fotos</span>`:""}</button>`:""}
    <section class="pad">
      <a href="#/" class="back">‹ Voltar</a>
      <h1 class="title">${l(s.nome)}</h1>
      <p class="muted">${L.people} até ${s.capacidade} pessoas · <strong>${R(s.preco_diaria_centavos)}</strong> a diária</p>
      ${Ie(s)}
      ${s.descricao?`<p class="pre">${l(s.descricao)}</p>`:""}
      <p class="muted small">Entrada a partir das ${l(r.checkin_hora)} · saída até as ${l(r.checkout_hora)}</p>
    </section>
    ${d.length>1?`<section class="pad">
      <h2 class="section-title">Fotos da ${l(s.nome)}</h2>
      <div class="grid">${d.map((g,k)=>`<button type="button" class="thumb" data-i="${k}"><img src="${l(D("fotos",g.mini_path))}" alt="${l(g.legenda||s.nome)}" loading="lazy"></button>`).join("")}</div>
    </section>`:""}
    <section class="pad">
      <h2 class="section-title" id="escolha-datas">Escolha as datas</h2>
      <p class="muted small" id="cal-hint">Toque no dia da entrada e depois no dia da saída.</p>
      <div class="calendar" id="cal"></div>
      <div class="legend small"><span class="lg livre"></span>Livre <span class="lg reservado"></span>Reservado <span class="lg fechado"></span>Indisponível <span class="lg-fer"></span>Feriado</div>
      <div class="booking card" id="booking" hidden></div>
    </section>`;const h=d.map(g=>({src:D("fotos",g.path),cap:g.legenda}));q(".cab-hero, .grid .thumb").forEach(g=>g.addEventListener("click",()=>fa(h,+g.dataset.i)));const b=f("#cal"),_=g=>`disp:${s.id}:${g}`,B=g=>g.forEach(k=>i.days.set(k.dia,k.dia<v?"passado":k.situacao));async function N(g){const k=`${g}-01`,x=K(K(k,32).slice(0,7)+"-01",-1),{data:M,error:O}=await y.rpc("disponibilidade",{p_cabana:s.id,p_de:k,p_ate:x});if(O)throw O;ea(_(g),M),B(M)}function c(g,k){N(g).then(()=>{JSON.stringify(z(_(g)))!==k&&i.month===g&&b.isConnected&&(u(),w())}).catch(()=>{})}async function u(){if(![...i.days.keys()].some(A=>A.startsWith(i.month))){const A=z(_(i.month));if(A)B(A),c(i.month,JSON.stringify(A));else{b.innerHTML='<div class="loading">Carregando…</div>';try{await N(i.month)}catch(I){b.innerHTML=`<p class="muted">${l(xa(I))}</p>`;return}}}const[g,k]=i.month.split("-").map(Number),x=`${i.month}-01`,M=new Date(x+"T12:00:00Z").getUTCDay(),O=new Date(Date.UTC(g,k,0)).getUTCDate(),U=i.month>v.slice(0,7);let H="";for(let A=0;A<M;A++)H+="<span></span>";for(let A=1;A<=O;A++){const I=`${i.month}-${String(A).padStart(2,"0")}`,_a=i.days.get(I)||"passado",ae=i.checkin&&i.checkout&&I>=i.checkin&&I<i.checkout,ee=I===i.checkout,te=I===i.checkin,ka=i.checkin&&!i.checkout&&I>i.checkin&&$(i.checkin,I),se=_a==="livre"||ka,ia=ue(I,m);H+=`<button type="button" class="day ${_a} ${ae?"in":""} ${te?"start":""} ${ee?"end":""} ${ka?"can-out":""} ${ia?"feriado":""}" data-d="${I}" ${ia?`title="${l(ia)}"`:""} ${se?"":"disabled"}>${A}</button>`}b.innerHTML=`
      <div class="cal-head">
        <button type="button" class="icon-btn" data-nav="-1" ${U?"":"disabled"} aria-label="Mês anterior">‹</button>
        <strong>${he[k-1]} de ${g}</strong>
        <button type="button" class="icon-btn" data-nav="1" aria-label="Próximo mês">›</button>
      </div>
      <div class="cal-grid dow">${["D","S","T","Q","Q","S","S"].map(A=>`<span>${A}</span>`).join("")}</div>
      <div class="cal-grid">${H}</div>`}function $(g,k){for(let x=g;x<k;x=K(x,1))if(i.days.get(x)!=="livre")return!1;return!0}function w(){const g=f("#booking"),k=f("#cal-hint");if(!i.checkin){g.hidden=!0,k.textContent="Toque no dia da entrada e depois no dia da saída.";return}if(!i.checkout){g.hidden=!0,k.textContent=`Entrada: ${G(i.checkin)}. Agora toque no dia da saída.`;return}const x=Ta(i.checkin,i.checkout);k.textContent=`${G(i.checkin)} → ${G(i.checkout)}`;const M=x<r.min_diarias,O=x>r.max_diarias;g.hidden=!1,g.innerHTML=`
      <div class="row between"><span>Entrada</span><strong>${G(i.checkin)} · ${l(r.checkin_hora)}</strong></div>
      <div class="row between"><span>Saída</span><strong>${G(i.checkout)} · ${l(r.checkout_hora)}</strong></div>
      <div class="row between"><span>Diárias</span><strong>${x}</strong></div>
      <label class="field row between"><span>Pessoas</span>
        <select id="hospedes">${Array.from({length:s.capacidade},(U,H)=>`<option ${H+1===Math.min(2,s.capacidade)?"selected":""}>${H+1}</option>`).join("")}</select></label>
      ${qe(s,i.checkin,i.checkout,m)}
      ${M?`<p class="warn small">O mínimo é de ${r.min_diarias} diária(s).</p>`:""}
      ${O?`<p class="warn small">O máximo é de ${r.max_diarias} diárias.</p>`:""}
      ${p.admin?'<a class="btn block" href="#/admin/reservas">Reservar pelo painel da equipe</a>':`<button class="btn block" id="reservar" ${M||O?"disabled":""}>${p.user?"Reservar e pagar com Pix":"Entrar para reservar"}</button>`}
      <p class="muted small center">O valor é conferido pela chácara no momento da reserva.</p>`,f("#reservar")?.addEventListener("click",U=>C(U.currentTarget))}async function C(g){if(!p.user)return sessionStorage.setItem("depois-de-entrar",location.hash),E("#/entrar");await F(g,async()=>{g.textContent="Reservando…";const{data:k,error:x}=await y.rpc("criar_reserva",{p_cabana:s.id,p_checkin:i.checkin,p_checkout:i.checkout,p_hospedes:Number(f("#hospedes").value),p_origem:"app"});if(x)throw J(_(i.month)),i.days.clear(),x;S(`Reserva ${k.codigo} criada! Agora é só pagar com Pix.`,"ok"),J("reservas"),J(_(i.month)),J("livres");const{conversa_id:M}=await Q("chat-ia",{acao:"reserva_criada",reserva_id:k.id});E(`#/chat/${M}`)}),i.days.size||u()}b.addEventListener("click",g=>{const k=g.target.closest("[data-nav]");if(k){const[O,U]=i.month.split("-").map(Number),H=new Date(Date.UTC(O,U-1+Number(k.dataset.nav),1));return i.month=H.toISOString().slice(0,7),u()}const x=g.target.closest(".day");if(!x||x.disabled)return;const M=x.dataset.d;if(!i.checkin||i.checkout||M<=i.checkin){if(i.days.get(M)!=="livre")return;i.checkin=M,i.checkout=null}else $(i.checkin,M)?i.checkout=M:(i.checkin=i.days.get(M)==="livre"?M:null,i.checkout=null);u(),w()});const aa=u();e&&requestAnimationFrame(()=>{const g=f("#escolha-datas");g&&window.scrollTo({top:g.getBoundingClientRect().top+window.scrollY-70,behavior:"smooth"})}),await aa}async function Re(){const a=p.cabanas&&p.fotos?{cabanas:p.cabanas,fotos:p.fotos}:z("vitrine")||await ta(),e=a.cabanas.filter(n=>n.ativa);if(!e.length)return S("Nenhuma cabana disponível no momento.");const t=document.createElement("dialog");t.className="sheet",t.innerHTML=`
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-head"><h3>Escolha a cabana</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
    <p class="muted small sheet-sub">Depois você escolhe as datas no calendário.</p>
    <div class="sheet-list">${e.map(n=>{const o=oa(n,a.fotos);return`<button type="button" class="sheet-cab" data-id="${l(n.id)}">
        <span class="sc-img">${o?`<img src="${l(D("fotos",o.mini_path))}" alt="">`:Y("ph")}</span>
        <span class="sc-txt"><strong>${l(n.nome)}</strong>
          <span class="muted small">${L.people} até ${n.capacidade} pessoas</span>
          <span class="sc-preco"><b>${R(n.preco_diaria_centavos)}</b> <span class="muted small">/ diária</span></span></span>
        <span class="chev">›</span>
      </button>`}).join("")}</div>`,document.body.appendChild(t),t.addEventListener("close",()=>t.remove()),t.addEventListener("click",n=>{if(n.target===t||n.target.closest("[data-fechar]"))return t.close();const o=n.target.closest(".sheet-cab");o&&(t.close(),E(`#/cabana/${o.dataset.id}/datas`))}),t.showModal()}async function Oe(){await Sa(Fe)}function Fe({fotos:a,cabanas:e}){const t=a.filter(m=>m.na_galeria),n=e.filter(m=>t.some(h=>h.cabana_id===m.id)),o=p.config;let s="";const r=t.map(m=>({src:D("fotos",m.path),cap:m.legenda})),d=t.length>12;T().innerHTML=`
    <section class="pad">
      <h1 class="title">Galeria</h1>
      ${t.length?`<section class="carousel gal-car" aria-roledescription="carrossel" aria-label="Fotos da chácara">
        <div class="track">${t.map((m,h)=>`<button type="button" class="slide" data-car="${h}" aria-label="Ampliar foto ${h+1}">
          <img src="${l(D("fotos",m.path))}" alt="${l(m.legenda||"Foto da chácara")}" ${h?'loading="lazy"':""} draggable="false">
          ${m.legenda?`<span class="gal-cap">${l(m.legenda)}</span>`:""}</button>`).join("")}</div>
        ${t.length>1?d?'<span class="car-n" aria-live="off"></span>':`<div class="dots">${t.map((m,h)=>`<button aria-label="Foto ${h+1}" data-i="${h}"></button>`).join("")}</div>`:""}
      </section>`:""}
      ${n.length?`<div class="chips"><button class="chip on" data-f="">Todas</button>${n.map(m=>`<button class="chip" data-f="${m.id}">${l(m.nome)}</button>`).join("")}</div>`:""}
      <div class="grid" id="grid"></div>
      ${o.instagram_url?`<a class="insta-card" href="${l(o.instagram_url)}" target="_blank" rel="noopener noreferrer">${L.insta}<span><strong>Quer ver mais fotos e vídeos?</strong><br>Siga a chácara no Instagram</span></a>`:""}
    </section>`;const v=()=>{const m=t.filter(h=>!s||h.cabana_id===s);f("#grid").innerHTML=m.length?m.map((h,b)=>`<button class="thumb" data-i="${b}"><img src="${l(D("fotos",h.mini_path))}" alt="${l(h.legenda||"Foto")}" loading="lazy"></button>`).join(""):'<p class="muted">Nenhuma foto ainda.</p>',q(".thumb").forEach(h=>h.addEventListener("click",()=>fa(m.map(b=>({src:D("fotos",b.path),cap:b.legenda})),+h.dataset.i)))},i=f(".gal-car");i&&(q("[data-car]",i).forEach(m=>m.addEventListener("click",()=>fa(r,+m.dataset.car))),t.length>1&&Va(i)),q(".chip").forEach(m=>m.addEventListener("click",()=>{s=m.dataset.f,q(".chip").forEach(h=>h.classList.toggle("on",h===m)),v()})),v()}function fa(a,e=0){const t=a.map(c=>typeof c=="string"?{src:c}:c),n=t.length;let o=Math.min(Math.max(0,e),n-1);const s=document.createElement("dialog");s.className="lightbox",s.innerHTML=`
    <div class="lb-track">${t.map(c=>`<figure class="lb-slide"><img alt="${l(c.cap||"")}" draggable="false" decoding="async"></figure>`).join("")}</div>
    <div class="lb-top"><span class="lb-count"></span><button class="lb-close" aria-label="Fechar">✕</button></div>
    <p class="lb-cap"></p>
    ${n>1?'<button class="lb-prev" aria-label="Foto anterior">‹</button><button class="lb-next" aria-label="Próxima foto">›</button>':""}`,document.body.appendChild(s);const r=f(".lb-track",s),d=q(".lb-slide img",s),v=()=>s.clientWidth||window.innerWidth,i=c=>{c>=0&&c<n&&!d[c].src&&(d[c].src=t[c].src)},m=(c=0,u=!0)=>{r.style.transition=u?"transform .28s cubic-bezier(.2,.8,.2,1)":"none",r.style.transform=`translate3d(${-o*v()+c}px,0,0)`},h=(c=!0)=>{[o-1,o,o+1].forEach(i),m(0,c),f(".lb-count",s).textContent=n>1?`${o+1} / ${n}`:"",f(".lb-cap",s).textContent=t[o].cap||"",n>1&&(f(".lb-prev",s).disabled=o===0,f(".lb-next",s).disabled=o===n-1)},b=c=>{o=Math.min(Math.max(0,o+c),n-1),h()};let _=null;r.addEventListener("pointerdown",c=>{c.button>0||(_={x:c.clientX,y:c.clientY,t:Date.now(),eixo:null,id:c.pointerId},r.setPointerCapture(c.pointerId))}),r.addEventListener("pointermove",c=>{if(!_||c.pointerId!==_.id)return;const u=c.clientX-_.x,$=c.clientY-_.y;if(!_.eixo&&Math.hypot(u,$)>8&&(_.eixo=Math.abs(u)>Math.abs($)?"x":"y"),_.eixo==="x"){const w=o===0&&u>0||o===n-1&&u<0;m(w?u/3:u,!1)}else _.eixo==="y"&&$>0&&(r.style.transition="none",r.style.transform=`translate3d(${-o*v()}px,${$}px,0)`,s.style.setProperty("--lb-fundo",String(Math.max(.3,1-$/500))))});const B=c=>{if(!_||c.pointerId!==_.id)return;const u=c.clientX-_.x,$=c.clientY-_.y,w=Date.now()-_.t<250,C=_.eixo;if(_=null,s.style.removeProperty("--lb-fundo"),C==="x"&&(Math.abs(u)>v()*.18||w&&Math.abs(u)>30))return b(u<0?1:-1);if(C==="y"&&($>120||w&&$>60))return s.close();h()};r.addEventListener("pointerup",B),r.addEventListener("pointercancel",B),f(".lb-close",s).onclick=()=>s.close(),f(".lb-prev",s)?.addEventListener("click",()=>b(-1)),f(".lb-next",s)?.addEventListener("click",()=>b(1)),s.addEventListener("keydown",c=>{c.key==="ArrowLeft"&&b(-1),c.key==="ArrowRight"&&b(1)});const N=()=>h(!1);window.addEventListener("resize",N),s.addEventListener("close",()=>{window.removeEventListener("resize",N),s.remove()}),s.showModal(),h(!1)}const He=(a,e)=>{const t='<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';return a.startsWith("#")?`<a class="fab" href="${a}" aria-label="${l(e)}" title="${l(e)}">${t}</a>`:`<button type="button" class="fab" id="${a}" aria-label="${l(e)}" title="${l(e)}">${t}</button>`};function _t(a){const e=Aa[a]||{label:a,tone:""};return`<span class="badge ${e.tone}">${l(e.label)}</span>`}async function za(){const{data:a,error:e}=await y.from("reservas").select("id,codigo,cabana_id,checkin,checkout,diarias,hospedes,valor_centavos,status,expira_em,motivo,comprovante_tentativas,cabanas(nome)").eq("user_id",p.user.id).order("checkin",{ascending:!1}).limit(100);if(e)throw e;return a}async function je(){await oe("reservas",za,ga)}let Ua="proximas";const Be=["dom.","seg.","ter.","qua.","qui.","sex.","sáb."],Ve=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];function Wa(a){const e=new Date(a+"T12:00:00Z");return{dia:String(e.getUTCDate()).padStart(2,"0"),mes:Ve[e.getUTCMonth()],sem:Be[e.getUTCDay()]}}function Ga(a){const e=Date.parse(a)-Date.now();if(e<=0)return null;const t=Math.floor(e/36e5),n=Math.floor(e%36e5/6e4);return t?`${t} h ${n} min`:n?`${n} min`:"menos de 1 min"}function ze(a,e){const t=p.config,n=(r,d)=>`${r.replace(/-/g,"")}T${d.replace(":","")}00`,o=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Chacara Canarinho//Reservas//PT","BEGIN:VEVENT",`UID:${a.id}@chacara-canarinho`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").slice(0,15)}Z`,`DTSTART:${n(a.checkin,t.checkin_hora)}`,`DTEND:${n(a.checkout,t.checkout_hora)}`,`SUMMARY:${t.nome_app} · ${e}`.replace(/[,;]/g," "),`DESCRIPTION:Reserva ${a.codigo} · ${a.hospedes} pessoa(s)`.replace(/[,;]/g," "),t.endereco?`LOCATION:${t.endereco.split("·")[0].trim().replace(/[,;]/g," ")}`:"","END:VEVENT","END:VCALENDAR"].filter(Boolean),s=document.createElement("a");s.href=URL.createObjectURL(new Blob([o.join(`\r
`)],{type:"text/calendar"})),s.download=`reserva-${a.codigo}.ics`,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),2e3)}const Ya=["aguardando_pagamento","em_analise","confirmada"],Ue={aguardando_pagamento:"⏳",em_analise:"🔎",confirmada:"✅",cancelada:"✕",recusada:"!",expirada:"⌛"};function ga(a){const e=p.fotos||z("vitrine")?.fotos||[],t=p.cabanas||z("vitrine")?.cabanas||[],n=c=>c.cabanas?.nome||t.find(u=>u.id===c.cabana_id)?.nome||"Cabana",o=c=>{const u=e.filter($=>$.cabana_id===c.cabana_id).sort(($,w)=>(w.principal===!0)-($.principal===!0)||$.ordem-w.ordem)[0];return u?D("fotos",u.mini_path):null},s=p.config,r=da(),d=a.filter(c=>c.checkout>=r&&Ya.includes(c.status)).sort((c,u)=>c.checkin.localeCompare(u.checkin)),v=a.filter(c=>!d.includes(c)),i=Ua==="anteriores"&&v.length?"anteriores":d.length||!v.length?"proximas":"anteriores",m=i==="proximas"?d:v,h=c=>{const u=c.status==="confirmada"?3:c.status==="em_analise"?2:1;return`<ol class="res-steps">${["Reservada","Pagamento","Confirmada"].map(($,w)=>`<li class="${w<u?"ok":""} ${w===u?"now":""}"><span>${w<u?"✓":w+1}</span>${$}</li>`).join("")}</ol>`},b=c=>{if(c.status==="aguardando_pagamento"){const u=c.expira_em?Ga(c.expira_em):null;return`${h(c)}
        <div class="res-next warn-box">
          <strong>Falta pagar para garantir as datas</strong>
          ${u?`<span>Você tem <b data-expira="${l(c.expira_em)}">${u}</b> para pagar com Pix.</span>`:"<span>O prazo de pagamento terminou; as datas podem ser liberadas.</span>"}
          ${c.motivo&&c.comprovante_tentativas?`<span class="small">${l(c.motivo)}</span>`:""}
        </div>
        <div class="res-actions">
          <button class="btn" data-act="pix">💠 Pagar com Pix</button>
          <label class="btn ghost">${L.clip} Enviar comprovante<input type="file" accept="image/*" data-act="comprovante" hidden></label>
        </div>
        <button class="link danger small res-cancel" data-act="cancelar">Cancelar reserva</button>`}if(c.status==="em_analise")return`${h(c)}
        <div class="res-next info-box"><strong>Comprovante recebido 👍</strong>
          <span>Estamos conferindo o pagamento. Você recebe a confirmação por e-mail e no celular.</span></div>
        <div class="res-actions"><button class="btn ghost" data-act="chat">💬 Falar com o atendente</button></div>`;if(c.status==="confirmada"){const u=Ta(r,c.checkin),$=u>1?`Faltam <b>${u} dias</b> para a sua hospedagem`:u===1?"É <b>amanhã</b>! Prepare as malas 🧳":c.checkin===r?"É <b>hoje</b>! Estamos esperando você 🌿":"Aproveite a sua estadia 🌿",w=ha(s)||s.endereco?Oa(s).google:"";return`<div class="res-next ok-box"><strong>Reserva confirmada</strong><span>${$}.</span></div>
        <div class="res-actions three">
          ${w?`<a class="btn ghost" href="${l(w)}" target="_blank" rel="noopener noreferrer">${L.pin} Como chegar</a>`:""}
          <button class="btn ghost" data-act="agenda">${L.cal} Agenda</button>
          <button class="btn ghost" data-act="chat">${L.chat} Atendente</button>
        </div>`}return`${c.motivo?`<p class="res-motivo">${l(c.motivo)}</p>`:""}
      <div class="res-actions"><a class="btn ghost" href="#/cabana/${l(c.cabana_id)}">Reservar de novo</a></div>`},_=c=>{const u=o(c),$=Wa(c.checkin),w=Wa(c.checkout),C=Aa[c.status]||{label:c.status,tone:""},aa=d.includes(c);return`<article class="res-card ${aa?"":"past"}" data-id="${c.id}">
      <div class="res-head">
        <div class="res-img">${u?`<img src="${l(u)}" alt="" loading="lazy">`:Y("ph")}</div>
        <div class="res-title">
          <span class="res-status ${C.tone}">${Ue[c.status]||""} ${l(C.label)}</span>
          <h3>${l(n(c))}</h3>
          <span class="res-code">Reserva <b>${l(c.codigo)}</b></span>
        </div>
      </div>
      <div class="res-dates">
        <div class="rd"><small>Entrada</small><strong>${$.dia} ${$.mes}</strong><span>${$.sem} · ${l(s.checkin_hora)}</span></div>
        <div class="rd-mid"><span>${c.diarias} ${c.diarias===1?"noite":"noites"}</span></div>
        <div class="rd"><small>Saída</small><strong>${w.dia} ${w.mes}</strong><span>${w.sem} · ${l(s.checkout_hora)}</span></div>
      </div>
      <div class="res-info"><span>${L.people} ${c.hospedes} ${c.hospedes===1?"pessoa":"pessoas"}</span><strong>${R(c.valor_centavos)}</strong></div>
      ${aa?b(c):Ya.includes(c.status)?"":b(c)}
    </article>`};T().innerHTML=`
    <section class="res-page">
      <header class="page-head"><h1>Minhas reservas</h1></header>
      ${a.length?`<div class="segmented res-tabs">
          <button data-aba="proximas" class="${i==="proximas"?"on":""}">Próximas${d.length?` <span class="seg-n">${d.length}</span>`:""}</button>
          <button data-aba="anteriores" class="${i==="anteriores"?"on":""}">Anteriores${v.length?` <span class="seg-n">${v.length}</span>`:""}</button>
        </div>`:""}
      <div class="res-list">
        ${m.length?m.map(_).join(""):`<div class="empty-chat">
          ${Fa("vazio-ilus",132,132)}
          <h2>${i==="proximas"?"Nenhuma reserva por enquanto":"Nenhuma reserva anterior"}</h2>
          <p class="muted">Escolha uma cabana, veja os dias livres e reserve em poucos toques.</p>
          <p class="small muted">Toque no <b>+</b> para fazer uma reserva.</p></div>`}
      </div>
      ${He("nova-reserva","Nova reserva")}
    </section>`;const B=setInterval(()=>{q("[data-expira]").forEach(c=>{const u=Ga(c.dataset.expira);c.textContent=u||"prazo encerrado"})},3e4);ce(()=>clearInterval(B));const N=T().firstElementChild;f("#nova-reserva",N)?.addEventListener("click",()=>Re().catch(j)),q("[data-aba]",N).forEach(c=>c.addEventListener("click",()=>{Ua=c.dataset.aba,ga(a)})),N.addEventListener("click",async c=>{const u=c.target.closest("button[data-act]");if(!u)return;const $=u.closest(".res-card").dataset.id,w=a.find(C=>C.id===$);if(u.dataset.act==="agenda")return ze(w,n(w));if((u.dataset.act==="pix"||u.dataset.act==="chat")&&await F(u,async()=>{const{conversa_id:C}=await Q("chat-ia",{acao:"reserva_criada",reserva_id:$});E(`#/chat/${C}`)}),u.dataset.act==="cancelar"){if(!await W("Cancelar a reserva?","As datas ficam livres para outras pessoas.","Cancelar reserva",!0))return;await F(u,async()=>{const{error:C}=await y.rpc("cancelar_minha_reserva",{p_id:$});if(C)throw C;S("Reserva cancelada."),Object.assign(w,{status:"cancelada",motivo:"Cancelada pelo cliente."}),ea("reservas",a),ga(a)})}}),N.addEventListener("change",async c=>{const u=c.target.closest('input[data-act="comprovante"]');if(!u?.files[0])return;const $=u.closest(".res-card").dataset.id,w=u.closest("label");w.classList.add("busy");try{const C=await We($,u.files[0]);E(`#/chat/${C.conversa_id}`)}catch(C){j(C)}finally{w.classList.remove("busy"),u.value=""}})}async function We(a,e,t){S("Enviando e conferindo o comprovante…");const n=await ve(e),o=`${p.user.id}/${a}/${crypto.randomUUID()}.${Ia(n)}`,{error:s}=await y.storage.from("comprovantes").upload(o,n,{contentType:n.type,upsert:!1});if(s)throw s;const r=await Q("chat-ia",{acao:"comprovante",reserva_id:a,path:o,conversa_id:t});return J("reservas"),r.resultado==="confirmada"?S("Pagamento conferido! Reserva confirmada ✅","ok"):r.resultado==="em_analise"&&S("Comprovante enviado para conferência.","ok"),r}function Ge(a={},e={}){const t=n=>l(a[n]??e[n]??"");return`
    <label class="field"><span>Nome completo *</span><input name="nome" required minlength="2" maxlength="80" autocomplete="name" value="${t("nome")}"></label>
    <label class="field"><span>Celular (WhatsApp) *</span><input name="telefone" required inputmode="tel" autocomplete="tel" placeholder="(61) 99999-9999" value="${l(a.telefone?na(a.telefone):e.telefone||"")}"></label>
    <label class="field"><span>Cidade / região onde mora <em class="muted">(opcional)</em></span><input name="regiao" maxlength="80" autocomplete="address-level2" placeholder="Ex.: Brasília - DF" value="${t("regiao")}"></label>
    <fieldset class="field"><legend>Quero receber novidades e promoções</legend>
      <label class="check"><input type="checkbox" name="receber_email" ${a.receber_email??e.receber_email?"checked":""}> Por e-mail</label>
      <label class="check"><input type="checkbox" name="receber_push" ${a.receber_push??e.receber_push?"checked":""}> Por notificação no celular</label>
    </fieldset>`}function Ye(a){const e=a.elements.telefone;e.addEventListener("input",()=>e.value=na(e.value))}async function ba(a,e){const t=a.elements,n=pa(t.telefone.value);if(!n)throw new Error("Informe um celular válido com DDD.");const{data:o,error:s}=await y.rpc("salvar_perfil",{p_nome:t.nome.value.trim(),p_telefone:n,p_regiao:t.regiao.value.trim(),p_receber_email:t.receber_email.checked,p_receber_push:t.receber_push.checked,p_aceite:e});if(s)throw s;return p.perfil=o,t.receber_push.checked&&!await Na()&&await qa(y,Ea.VAPID_PUBLIC_KEY).catch(()=>"erro")==="ios-instalar"&&S("No iPhone, instale o app na tela de início para receber notificações."),V(),o}async function $a(){const a=p.perfil,e=(()=>{try{return localStorage.getItem("tema")||"auto"}catch{return"auto"}})();if(T().innerHTML=`
    <section class="pad narrow">
      <div class="profile-head">
        <div class="avatar-edit">
          <span class="avatar xl" id="me-avatar">${l(ua(a.nome))}</span>
          <label class="avatar-btn" aria-label="Trocar a foto">${L.camera}<input type="file" accept="image/*" id="foto" hidden></label>
        </div>
        <h1 class="title">${l(a.nome)}</h1>
        <p class="muted small">${l(p.user.email||"")}</p>
        ${a.foto_path?'<button class="link small" id="tirar-foto">Remover foto</button>':""}
      </div>
      <form id="perfil" class="stack">
        ${Ge(a)}
        <button class="btn block">Salvar</button>
      </form>
      <div class="stack gap-top center">
        <a href="#/menu" class="back">‹ Voltar ao menu</a>
        <button class="link danger small" id="excluir">Excluir minha conta</button>
      </div>
    </section>`,a.foto_path){const n=await Ca(a.foto_path);n&&(f("#me-avatar").innerHTML=`<img src="${l(n)}" alt="">`)}const t=f("#perfil");Ye(t),t.addEventListener("submit",async n=>{n.preventDefault(),await F(t.querySelector("button"),async()=>{await ba(t,!1),S("Dados salvos.","ok")})}),f("#foto").addEventListener("change",async n=>{const o=n.target.files[0];if(!o)return;const s=f(".avatar-edit");s.classList.add("busy");try{await Ja(await Da(o)),S("Foto atualizada.","ok"),$a()}catch(r){j(r)}finally{s.classList.remove("busy")}}),f("#tirar-foto")?.addEventListener("click",async()=>{if(!await W("Remover a foto?","","Remover",!0))return;const n=p.perfil.foto_path,{error:o}=await y.rpc("definir_foto",{p_path:null});if(o)return j(o);await y.storage.from("avatares").remove([n]),p.perfil.foto_path=null,V(),$a()}),f("#excluir").addEventListener("click",async()=>{if(await W("Excluir sua conta?","Seu perfil e sua foto serão apagados. Você perde o acesso às conversas, que ficam guardadas pela chácara por 5 anos. O registro das hospedagens já feitas é mantido, como explica a Política de Privacidade.","Excluir para sempre",!0))try{await Q("excluir-conta",{confirmar:!0}),ma(),await y.auth.signOut(),S("Conta excluída."),E("#/")}catch(n){j(n)}})}let Z=null;const P=(a,e,t,n='<span class="chev">›</span>',o="")=>`<${a?`a href="${a}"`:'button type="button"'} class="li" ${o}><span class="li-ico">${e}</span><span class="grow">${t}</span>${n}</${a?"a":"button"}>`;function Qe(){try{return localStorage.getItem("tema")||"auto"}catch{return"auto"}}async function Qa(){const a=p.perfil,e=p.config,t=Qe(),n={auto:"Automático",claro:"Claro",escuro:"Escuro"}[t],o=matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0;T().innerHTML=`
    <section class="pad menu-page">
      <section class="profile-card">
        ${p.user?`
          <div class="row gap pc-in">
            <span class="avatar lg" id="menu-avatar">${l(ua(a?.nome||p.user.email))}</span>
            <div class="grow pc-txt"><h2>${l(a?.nome||"")}</h2><div class="pc-mail">${l(p.user.email||"")}</div>
            ${p.admin?'<span class="pc-chip">👑 Administrador</span>':""}</div>
          </div>
          <a class="btn sm pc-btn" href="#/perfil">Editar perfil</a>`:`<div class="pc-in"><div class="pc-emoji">🏡</div><h2>Bem-vindo(a) à ${l(e.nome_app)}</h2>
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
        ${_e.map(([r,d,v])=>P(`#/admin/${r}`,d,v,r==="reservas"?'<span id="m-validar"><span class="chev">›</span></span>':r==="conversas"?'<span id="m-chamados"><span class="chev">›</span></span>':'<span class="chev">›</span>')).join("")}
      </nav>
      <div class="list-title">Testar avisos <span class="muted">(chegam só para você)</span></div><nav class="list" id="testes">
        ${P("","✉️",`Enviar e-mail de teste<br><span class="muted small">${l(p.user.email||"")}</span>`,'<span class="chev">›</span>','data-teste="email"')}
        ${P("","🔔",'Enviar notificação de teste<br><span class="muted small">Para os seus celulares com notificação ligada</span>','<span class="chev">›</span>','data-teste="push"')}
        ${P("","✅",'Simular reserva confirmada<br><span class="muted small">O e-mail e a notificação que o cliente recebe</span>','<span class="chev">›</span>','data-teste="confirmacao"')}
      </nav>`:""}

      <div class="list-title">App</div><nav class="list">
        ${P("#/galeria","🖼️","Galeria de fotos")}
        ${e.instagram_url?P(e.instagram_url,"📸","Instagram da chácara",'<span class="chev">↗</span>','target="_blank" rel="noopener noreferrer"'):""}
        ${o?"":P("","📲","Instalar o app no celular",'<span class="chev">›</span>','id="instalar"')}
        ${P("","🌗","Tema",`<span class="muted small">${n}</span>`,'id="tema"')}
        ${P("#/privacidade","🔒","Política de privacidade")}
        ${P("#/termos","📄","Termos de uso")}
        ${p.user?P("","🚪","Sair da conta","",'id="sair"'):""}
      </nav>
      <p class="center small muted gap-top">${l(e.nome_app)}${e.endereco?` · ${l(e.endereco)}`:""}</p>
    </section>`,a?.foto_path&&Ca(a.foto_path).then(r=>{const d=f("#menu-avatar");r&&d&&(d.innerHTML=`<img src="${l(r)}" alt="">`)}),p.admin&&(y.from("conversas").select("id",{count:"exact",head:!0}).eq("atendimento","chamou").then(({count:r,error:d})=>{const v=f("#m-chamados");!d&&v&&r&&(v.innerHTML=`<span class="count">🙋 ${r}</span>`)}),y.from("reservas").select("id",{count:"exact",head:!0}).or("status.eq.em_analise,and(status.eq.confirmada,validada.eq.false)").then(({count:r})=>{const d=f("#m-validar");d&&r&&(d.innerHTML=`<span class="count">${r}</span>`)}));const s=f("#notif");if(s){const r=ge();r!=="ok"?(s.disabled=!0,f("#push-hint").textContent=r==="ios-instalar"?"No iPhone, instale o app na tela de início primeiro":"Este navegador não recebe notificações"):(Na().then(d=>s.checked=d).catch(()=>{}),s.addEventListener("change",async()=>{s.disabled=!0;try{if(s.checked){const d=await qa(y,Ea.VAPID_PUBLIC_KEY);d!=="ativo"?(s.checked=!1,S(d==="negado"?"Notificações bloqueadas nas configurações do navegador.":"Não foi possível ativar neste celular.","bad")):S("Notificações ativadas.","ok")}else await fe(y),S("Notificações desativadas neste celular.")}catch(d){s.checked=!s.checked,j(d)}finally{s.disabled=!1}}))}f("#testes")?.addEventListener("click",async r=>{const d=r.target.closest("[data-teste]");if(!d||d.disabled)return;const v=d.dataset.teste;d.disabled=!0,d.classList.add("testando");try{const i=await Q("admin-reserva",{acao:"testar",tipo:v}),m="Este celular ainda não está com as notificações ligadas. Ligue em Menu › Notificações no celular e teste de novo.";let h,b;v==="email"?(h=i.email_enviado?"✉️ E-mail enviado":"✉️ O e-mail não foi enviado",b=i.email_enviado?`Enviado para ${i.para}${i.remetente?`, de ${i.remetente}`:""}. Confira a caixa de entrada (e o spam, na primeira vez).`:i.email_configurado?"O Gmail recusou o envio. Confira se a senha de app (GMAIL_APP_PASSWORD) está certa e se a verificação em duas etapas continua ligada na conta.":"O envio de e-mail não está configurado no servidor: confira GMAIL_USER (variável) e GMAIL_APP_PASSWORD (segredo) no GitHub e publique as funções."):v==="push"?(h=i.push_enviados?"🔔 Notificação enviada":"🔔 A notificação não foi enviada",b=i.push_enviados?`Enviada para ${i.push_enviados} aparelho(s). Ela aparece em alguns segundos (com o app fechado ou em segundo plano).`:i.push_configurado?i.aparelhos?"O serviço de notificação recusou o envio. Desligue e ligue as notificações no Menu e teste de novo.":m:"As notificações não estão configuradas no servidor: confira VAPID_PRIVATE_KEY (segredo) e VAPID_PUBLIC_KEY (variável) no GitHub e publique as funções."):(h="✅ Reserva de exemplo simulada",b=[i.email_configurado?`E-mail "Reserva confirmada" enviado para ${i.para}.`:"E-mail não enviado: o envio não está configurado no servidor.",i.push_configurado&&i.aparelhos?`Notificação enviada para ${i.aparelhos} aparelho(s).`:i.push_configurado?m:"Notificação não enviada: não está configurada no servidor.","Nada foi gravado: é só uma simulação (código TESTE1)."].join(`

`)),W(h,b,"Entendi")}catch(i){j(i)}finally{d.disabled=!1,d.classList.remove("testando")}}),f("#tema").addEventListener("click",()=>{Ka({auto:"claro",claro:"escuro",escuro:"auto"}[t]),Qa()}),f("#instalar")?.addEventListener("click",async()=>{if(Z){Z.prompt(),await Z.userChoice.catch(()=>{}),Z=null;return}const r=/iphone|ipad|ipod/i.test(navigator.userAgent);W("Instalar o app",r?'No Safari, toque em Compartilhar (quadrado com a seta) e depois em "Adicionar à Tela de Início".':'No menu do navegador (⋮), toque em "Instalar app" ou "Adicionar à tela inicial".',"Entendi")}),f("#sair")?.addEventListener("click",async()=>{await W("Sair da conta?","Você continua vendo as cabanas, mas sem reservas e conversas.","Sair")&&(ma(),await y.auth.signOut(),E("#/"))})}async function Ja(a){const e=`${p.user.id}/${crypto.randomUUID()}.${Ia(a)}`,{error:t}=await y.storage.from("avatares").upload(e,a,{contentType:a.type});if(t)throw t;const{error:n}=await y.rpc("definir_foto",{p_path:e});if(n)throw n;const o=p.perfil.foto_path;o&&y.storage.from("avatares").remove([o]),p.perfil.foto_path=e,V()}let wa=!1;async function ra(){const a=p.user,e=a?.user_metadata||{},t=e.avatar_url||e.picture;if(!(wa||!p.perfil||p.perfil.foto_path||e.foto_google||!Ma(a))&&!(!t||!t.startsWith("https://lh3.googleusercontent.com/"))){wa=!0;try{const n=await fetch(t.replace(/=s\d+(-c)?$/,"=s800-c"));if(!n.ok)return;const o=await n.blob();if(!o.type.startsWith("image/"))return;await Ja(await Da(o)),await y.auth.updateUser({data:{foto_google:!0}}).catch(()=>{})}catch{}finally{wa=!1}}}function Ka(a){const e=document.documentElement;try{a==="auto"?localStorage.removeItem("tema"):localStorage.setItem("tema",a)}catch{}a==="auto"?e.removeAttribute("data-theme"):e.setAttribute("data-theme",a==="escuro"?"dark":"light")}const ya=()=>location.origin+location.pathname;function Je(){if(p.user)return E("#/");T().innerHTML=`
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
    </section>`,f("#google").addEventListener("click",async a=>{await F(a.currentTarget,async()=>{const{error:e}=await y.auth.signInWithOAuth({provider:"google",options:{redirectTo:ya()}});if(e)throw e})}),f("#login").addEventListener("submit",async a=>{a.preventDefault();const e=a.target.elements;await F(a.target.querySelector("button"),async()=>{const{error:t}=await y.auth.signInWithPassword({email:e.email.value.trim(),password:e.senha.value});if(t)throw new Error(/invalid/i.test(t.message)?"E-mail ou senha incorretos.":/confirm/i.test(t.message)?"Confirme o seu e-mail pelo link que enviamos.":t.message)})}),f("#esqueci").addEventListener("click",async()=>{const a=f("#login").elements.email.value.trim();if(!Pa.test(a))return S("Escreva o seu e-mail no campo acima.");const{error:e}=await y.auth.resetPasswordForEmail(a,{redirectTo:ya()+"#/nova-senha"});if(e)return j(e);S("Enviamos um link para criar uma nova senha.","ok")})}const Ke='<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';function Xa(a={},{comConta:e=!1}={}){const t=n=>l(a[n]??"");return`
    <label class="cad-field"><span>Nome completo</span>
      <input name="nome" required minlength="2" maxlength="80" autocomplete="name" placeholder="Como você se chama?" value="${t("nome")}"></label>
    ${e?`
    <label class="cad-field"><span>E-mail</span>
      <input name="email" type="email" required autocomplete="email" inputmode="email" placeholder="seu@email.com"></label>
    <label class="cad-field"><span>Senha</span>
      <div class="cad-input"><input name="senha" type="password" required minlength="8" autocomplete="new-password" placeholder="Mínimo 8 caracteres">
      <button type="button" class="cad-olho" aria-label="Mostrar a senha" title="Mostrar a senha">${Ke}</button></div></label>`:""}
    <label class="cad-field"><span>Celular (WhatsApp)</span>
      <div class="cad-input cad-tel"><span class="cad-ddi">🇧🇷 +55</span>
        <input name="telefone" required inputmode="tel" autocomplete="tel-national" placeholder="(61) 99999-9999" value="${l(a.telefone||"")}">
        <span class="cad-ok" aria-hidden="true">✓</span></div>
      <small class="cad-help">Para a chácara falar com você sobre as reservas. Não enviamos propaganda por aqui.</small></label>
    <label class="cad-field"><span>Cidade onde mora <em>(opcional)</em></span>
      <input name="regiao" maxlength="80" autocomplete="address-level2" placeholder="Ex.: Brasília - DF" value="${t("regiao")}"></label>
    <div class="cad-box">
      <strong>Quer receber novidades e promoções?</strong>
      <label class="cad-switch"><span>✉️ Por e-mail</span><span class="switch"><input type="checkbox" name="receber_email" ${a.receber_email?"checked":""}><i></i></span></label>
      <label class="cad-switch"><span>🔔 Por notificação no celular</span><span class="switch"><input type="checkbox" name="receber_push" ${a.receber_push?"checked":""}><i></i></span></label>
    </div>
    <label class="cad-termos">
      <input type="checkbox" name="aceite" required>
      <span class="cad-check" aria-hidden="true"></span>
      <span>Li e aceito os <a href="#" data-doc="termos">Termos de uso</a> e a <a href="#" data-doc="privacidade">Política de privacidade</a>.</span>
    </label>`}function Za(a){const e=a.elements,t=a.querySelector("button.cad-enviar"),n=a.querySelector(".cad-falta"),o=e.telefone,s=()=>{const r=!!pa(o.value);o.closest(".cad-tel").classList.toggle("valido",r);const d=[];e.nome.value.trim().length<2&&d.push("o seu nome"),e.email&&!Pa.test(e.email.value.trim())&&d.push("o e-mail"),e.senha&&e.senha.value.length<8&&d.push("uma senha de 8 caracteres"),r||d.push("o celular com DDD"),e.aceite.checked||d.push("aceitar os termos"),t.disabled=d.length>0,n.textContent=d.length?`Falta: ${d.join(", ")}.`:""};o.value&&(o.value=na(o.value)),o.addEventListener("input",()=>o.value=na(o.value)),a.addEventListener("input",s),a.addEventListener("change",s),a.querySelector(".cad-olho")?.addEventListener("click",r=>{const d=e.senha;d.type=d.type==="password"?"text":"password",r.currentTarget.classList.toggle("on",d.type==="text")}),a.querySelectorAll("[data-doc]").forEach(r=>r.addEventListener("click",d=>{d.preventDefault(),Xe(r.dataset.doc)})),s()}async function Xe(a){const e=document.createElement("dialog");e.className="sheet doc-sheet",e.innerHTML='<div class="sheet-handle"></div><div class="sheet-head"><span></span><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div><div class="doc"><p class="muted">Carregando…</p></div><button type="button" class="btn block" data-fechar>Fechar</button>',document.body.appendChild(e),e.addEventListener("close",()=>e.remove()),e.addEventListener("click",t=>(t.target===e||t.target.closest("[data-fechar]"))&&e.close()),e.showModal();try{const t=await fetch(`${a}.html`),n=new DOMParser().parseFromString(await t.text(),"text/html").querySelector("main");n.querySelectorAll("script, iframe, object").forEach(o=>o.remove()),n.querySelectorAll('a[href="./"]').forEach(o=>o.closest("p")?.remove()),n.querySelectorAll('a[href$=".html"]').forEach(o=>o.removeAttribute("href")),e.querySelector(".doc").innerHTML=n.innerHTML}catch{e.querySelector(".doc").innerHTML='<p class="warn">Não foi possível abrir agora. Confira a internet.</p>'}}function Ze(){if(p.user)return E("#/");T().innerHTML=`
    <section class="cad">
      <a href="#/entrar" class="back cad-voltar">‹ Voltar</a>
      <header class="cad-hero">
        ${Y("cad-logo",64,64)}
        <h1>Criar sua conta</h1>
        <p>Leva menos de um minuto. Depois é só escolher a cabana e as datas.</p>
      </header>
      <form id="cad" class="cad-form" novalidate>
        ${Xa({},{comConta:!0})}
        <button class="btn lg block cad-enviar" disabled>Criar conta</button>
        <p class="cad-falta small muted center"></p>
      </form>
    </section>`;const a=f("#cad");Za(a),a.addEventListener("submit",async e=>{e.preventDefault();const t=a.elements;await F(a.querySelector(".cad-enviar"),async()=>{if(!pa(t.telefone.value))throw new Error("Informe um celular válido com DDD.");const n={nome:t.nome.value.trim(),telefone:t.telefone.value,regiao:t.regiao.value.trim(),receber_email:t.receber_email.checked,receber_push:t.receber_push.checked},{data:o,error:s}=await y.auth.signUp({email:t.email.value.trim(),password:t.senha.value,options:{emailRedirectTo:ya(),data:{full_name:n.nome}}});if(s)throw new Error(/registered|already/i.test(s.message)?"Este e-mail já tem conta. Volte e toque em Entrar.":s.message);try{localStorage.setItem("cadastro-pendente",JSON.stringify(n))}catch{}o.session?(p.user=o.user,await ba(a,!0),localStorage.removeItem("cadastro-pendente"),S("Conta criada! Bem-vindo(a) 🎉","ok"),E("#/")):T().innerHTML=`<section class="cad"><header class="cad-hero">
          <div class="cad-emoji">📬</div>
          <h1>Confirme o seu e-mail</h1>
          <p>Enviamos um link para <strong>${l(t.email.value.trim())}</strong>. Abra o link para ativar a conta (confira também o spam).</p>
          <a class="btn lg" href="#/entrar">Voltar para entrar</a></header></section>`})})}function at(){if(!p.user)return E("#/entrar");if(p.perfil)return E("#/");let a={};try{a=JSON.parse(localStorage.getItem("cadastro-pendente")||"{}")}catch{}const e=p.user.user_metadata||{};a.nome||=e.full_name||e.name||"";const t=String(a.nome||"").split(" ")[0],n=Ma(p.user);T().innerHTML=`
    <section class="cad">
      <header class="cad-hero">
        <span class="avatar cad-avatar">${l(ua(a.nome||p.user.email))}</span>
        <h1>${t?`Olá, ${l(t)}! 👋`:"Bem-vindo(a)! 👋"}</h1>
        <p>Falta só um passo para concluir o seu cadastro.</p>
        <ol class="cad-passos" aria-label="Etapas do cadastro">
          <li class="ok"><span>✓</span>${n?"Conta Google":"Conta criada"}</li>
          <li class="agora"><span>2</span>Seus dados</li>
        </ol>
        <p class="cad-email small">${l(p.user.email||"")}</p>
      </header>
      <form id="comp" class="cad-form" novalidate>
        ${Xa(a)}
        <button class="btn lg block cad-enviar" disabled>Concluir cadastro</button>
        <p class="cad-falta small muted center"></p>
      </form>
      <p class="center"><button class="link small" id="sair">Entrar com outra conta</button></p>
    </section>`;const o=f("#comp");Za(o),o.addEventListener("submit",async s=>{s.preventDefault(),await F(o.querySelector(".cad-enviar"),async()=>{await ba(o,!0);try{localStorage.removeItem("cadastro-pendente")}catch{}ra(),S("Cadastro concluído. Bem-vindo(a) 🎉","ok"),E(sessionStorage.getItem("depois-de-entrar")||"#/"),sessionStorage.removeItem("depois-de-entrar")})}),f("#sair").addEventListener("click",()=>y.auth.signOut().then(()=>E("#/entrar")))}function et(){T().innerHTML=`
    <section class="pad narrow auth">
      <h1 class="title">Nova senha</h1>
      <form id="ns" class="stack">
        <label class="field"><span>Nova senha (mínimo 8 caracteres)</span><input name="senha" type="password" minlength="8" required autocomplete="new-password"></label>
        <button class="btn block">Salvar senha</button>
      </form>
    </section>`,f("#ns").addEventListener("submit",async a=>{a.preventDefault(),await F(a.target.querySelector("button"),async()=>{const{error:e}=await y.auth.updateUser({password:a.target.elements.senha.value});if(e)throw e;S("Senha alterada.","ok"),E("#/")})})}async function tt(a){const e=await fetch(`${a}.html`),n=new DOMParser().parseFromString(await e.text(),"text/html").querySelector("main");n.querySelectorAll("script, iframe, object").forEach(o=>o.remove()),n.querySelectorAll('a[href="./"]').forEach(o=>o.closest("p")?.remove()),n.querySelectorAll('a[href$=".html"]').forEach(o=>o.setAttribute("href","#/"+o.getAttribute("href").replace(".html",""))),T().innerHTML=`<section class="pad narrow doc"><a href="#/menu" class="back">‹ Menu</a>${n.innerHTML}</section>`}async function st(a){const e=p.user?.id;if(p.user=a?.user??null,p.user?.id!==e){if(p.perfil=null,p.user||(ma(),re()),await ca().catch(()=>{}),V(),p.user&&p.perfil){ra(),Ra(y).catch(()=>{});const t=sessionStorage.getItem("depois-de-entrar");if(t&&location.hash.startsWith("#/entrar"))return sessionStorage.removeItem("depois-de-entrar"),E(t)}if(p.user&&location.hash.startsWith("#/entrar"))return E("#/");X()}}async function nt(){if("serviceWorker"in navigator){const e=!!navigator.serviceWorker.controller;let t=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{!e||t||(t=!0,location.reload())}),navigator.serviceWorker.register("sw.js").then(n=>n.update()).catch(()=>{})}window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Z=e}),document.getElementById("theme-btn").addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-theme")==="dark"||!document.documentElement.hasAttribute("data-theme")&&matchMedia("(prefers-color-scheme: dark)").matches;Ka(e?"claro":"escuro")});const[,{data:a}]=await Promise.all([La().catch(()=>{}),y.auth.getSession()]);p.user=a.session?.user??null,p.user&&le()?(V(),ca().then(()=>{V(),p.user&&!p.perfil&&X(),p.perfil&&ra()}).catch(()=>{})):(await ca().catch(()=>{}),V(),p.user&&p.perfil&&ra()),p.user&&Ra(y).catch(()=>{}),y.auth.onAuthStateChange((e,t)=>{if(e==="PASSWORD_RECOVERY")return E("#/nova-senha");setTimeout(()=>st(t),0)}),window.addEventListener("hashchange",X),navigator.serviceWorker?.addEventListener("message",e=>{e.data?.type==="push"&&location.hash.startsWith("#/reservas")&&X(),e.data?.type==="push"&&sa()}),document.addEventListener("visibilitychange",()=>!document.hidden&&sa()),setInterval(()=>!document.hidden&&sa(),6e4),X(),setTimeout(ot,1500)}function ot(){la("vitrine",ta),!(!p.user||!p.perfil)&&(la("reservas",za),la("conversas",$e),we())}nt();export{L as ICON,Re as escolherCabana,He as fab,za as fetchReservas,oa as fotoPrincipal,va as fotosDaCabana,Fa as ilustracaoApp,xe as ilustracaoEscala,Ee as ilustracaoUrl,Y as logoApp,fa as openLightbox,We as sendReceipt,Ka as setTheme,_t as statusBadge};
