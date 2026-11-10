import{CONFIG as ka}from"./config.js";import{sb as b,state as p,$ as v,$$ as O,view as A,go as y,toast as C,fail as j,errMsg as Ea,api as Q,busy as H,confirmDialog as W,loadConfig as xa,publicUrl as I,marcaUrl as ae,avatarUrl as La,updateAccountButton as V,loadPerfil as ca,isGoogleUser as Ca,screenShow as ee,screenCached as U,screenUpdate as ea,screenForget as J,screenClearAll as te,screenPrefetch as la,novaRota as se,showVitrine as Ma,aoSairDaTela as ne,fetchVitrine as ta,perfilGuardado as oe,loadFeriados as re,atualizarChamados as sa}from"./core.js";import{estadia as ie,nomeFeriado as ce,temPrecoEspecial as le}from"./precos.js";import{esc as d,fmtMoney as N,fmtDate as G,addDays as K,daysBetween as Sa,todayISO as da,MESES as de,STATUS as Ta,normalizePhone as pa,maskPhone as na,EMAIL_RE as Aa,initials as ua}from"./util.js";import{resizeAvatar as Pa,resizeReceipt as pe,extOf as Da}from"./images.js";import{enablePush as Ia,disablePush as ue,pushActive as qa,pushSupport as me,syncPush as Na}from"./push.js";import{renderChat as he,clearChatCache as ma,fetchConversas as ve,prepararAtendendo as fe}from"./chat.js";import{renderAdmin as ge,ADMIN_SECOES as be}from"./admin.js";import{temAlfinete as ha,rotas as Ra,montarMapas as $e}from"./map.js";const E={home:'<svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',cal:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M4 5.5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/></svg>',photo:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg>',user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',insta:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',google:'<svg viewBox="0 0 48 48" class="g"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',people:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5c2.5 0 4.5 1.5 5.5 4.5"/></svg>',clip:'<svg viewBox="0 0 24 24"><path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 7"/></svg>',send:'<svg viewBox="0 0 24 24"><path d="M4 12 20 4l-6 16-3-7z"/></svg>',menu:'<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',pin:'<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>'};function Y(e="",a="",t=""){const n=p.config?.icone_versao,o=`${a?` width="${a}"`:""}${t?` height="${t}"`:""}`;return n>0?`<img src="${d(ae(n,"icon-512.png"))}" alt=""${o} class="${e} logo-custom">`:`<img src="icons/logo.svg" alt=""${o} class="${e}">`}const we=()=>{const e=p.config?.ilustracao_versao;return e>0?I("marca",`ilustracao/v${e}.png`):"icons/passaro.svg"},ye=()=>{const e=Number(p.config?.ilustracao_tamanho);return e>=50&&e<=200?e/100:1},Oa=(e="",a="",t="")=>{const n=ye();return a&&(a=Math.round(a*n)),t&&(t=Math.round(t*n)),`<img src="${d(we())}" alt="" class="ilustracao ${e}"${a?` width="${a}"`:""}${t?` height="${t}"`:""}>`},_e=new Set(["","cabana","galeria","menu","entrar","cadastro","termos","privacidade","nova-senha"]);async function X(){const[e,...a]=location.hash.replace(/^#\/?/,"").split("/");se(),window.scrollTo(0,0),Ee(e);try{if(p.config||await xa(),p.user&&!p.perfil&&!["completar","termos","privacidade","nova-senha"].includes(e))return y("#/completar");if(!p.user&&!_e.has(e))return sessionStorage.setItem("depois-de-entrar",location.hash),y("#/entrar");switch(e){case"":return await xe();case"cabana":return await Ae(a[0],a[1]==="datas");case"reservas":return await Ne();case"chat":return await he(a[0]);case"galeria":return await De();case"menu":return await za();case"perfil":return await ba();case"entrar":return ze();case"cadastro":return Ye();case"completar":return Qe();case"nova-senha":return Je();case"termos":case"privacidade":return await Ke(e);case"admin":return!p.admin||!a[0]?y("#/menu"):await ge(a[0],a.slice(1));default:return y("#/")}}catch(t){A().innerHTML=`<div class="empty"><p>${d(Ea(t))}</p><button class="btn" id="retry">Tentar de novo</button></div>`,v("#retry").addEventListener("click",()=>location.reload())}}const ke=[["","Início",E.home],["reservas","Reservas",E.cal],["chat","Chat",E.chat],["galeria","Galeria",E.photo],["menu","Menu",E.menu]];function Ee(e){const a=document.getElementById("tabbar");a.childElementCount||(a.innerHTML=ke.map(([n,o,s])=>`<a href="#/${n}" data-tab="${n}">${n==="chat"?`<span class="tab-ico">${s}<b class="tab-n" id="tab-chat-n" hidden></b></span>`:s}<span>${o}</span></a>`).join("")),sa();const t=e==="cabana"?location.hash.endsWith("/datas")?"reservas":"":["perfil","admin","termos","privacidade"].includes(e)?"menu":e;O("a",a).forEach(n=>n.classList.toggle("on",n.dataset.tab===t)),a.hidden=["entrar","cadastro","completar","nova-senha"].includes(e)}function va(e,a){return a.filter(t=>t.cabana_id===e.id).sort((t,n)=>(n.principal===!0)-(t.principal===!0)||t.ordem-n.ordem)}const oa=(e,a)=>va(e,a)[0]||null;function ft(e,a){const t=oa(e,a);return t?I("fotos",t.mini_path):null}async function xe(){await Ma(Le)}function Le({cabanas:e,fotos:a}){const t=p.config,n=e.filter(s=>s.ativa),o=[...e.filter(s=>s.ativa).map(s=>({f:oa(s,a),c:s})).filter(s=>s.f),...a.filter(s=>s.no_carrossel&&!s.cabana_id).map(s=>({f:s,c:null}))];A().innerHTML=`
    ${o.length?`<section class="carousel" aria-roledescription="carrossel">
      <div class="track">${o.map(({f:s,c:i},l)=>{const u=`<img src="${d(I("fotos",s.path))}" alt="${d(i?.nome||s.legenda||"Foto da chácara")}" ${l?'loading="lazy"':""}>`,r=i?`<figcaption><strong>${d(i.nome)}</strong><span>${N(i.preco_diaria_centavos)} a diária · ver dias livres ›</span></figcaption>`:s.legenda?`<figcaption>${d(s.legenda)}</figcaption>`:"";return i?`<a class="slide" href="#/cabana/${i.id}">${u}${r}</a>`:`<figure class="slide">${u}${r}</figure>`}).join("")}</div>
      ${o.length>1?`<div class="dots">${o.map((s,i)=>`<button aria-label="Foto ${i+1}" data-i="${i}"></button>`).join("")}</div>`:""}
    </section>`:`<section class="hero-empty">${Y("",96,96)}</section>`}

    <div class="home">
      <section class="welcome">
        <p class="eyebrow">Hospedagem em meio à natureza</p>
        <h1>${d(t.nome_app)}</h1>
        <p class="welcome-txt">${d(t.boas_vindas)}</p>
        ${t.endereco?`<p class="welcome-loc">${E.pin} ${d(t.endereco)}</p>`:""}
        <div class="welcome-cta">
          <a class="btn lg" href="#cabanas" id="ver-cabanas">${E.cal} Ver datas disponíveis</a>
          <a class="btn lg ghost" href="#/chat">${E.chat} Falar com o atendente</a>
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
        ${n.length?`<div class="cabin-list">${n.map(s=>{const i=oa(s,a),l=va(s,a).length;return`<a class="cabin-card" href="#/cabana/${s.id}">
            <div class="cc-img">
              ${i?`<img src="${d(I("fotos",i.path))}" alt="${d(s.nome)}" loading="lazy">`:Y("ph")}
              <span class="cc-tag" data-livre="${s.id}">Consultando datas…</span>
              ${l>1?`<span class="cc-fotos">📷 ${l}</span>`:""}
            </div>
            <div class="cc-body">
              <div class="cc-top"><h3>${d(s.nome)}</h3><span class="cc-cap">${E.people} até ${s.capacidade}</span></div>
              ${s.descricao?`<p class="cc-desc">${d(s.descricao)}</p>`:""}
              <div class="cc-foot"><p class="cc-price"><strong>${N(s.preco_diaria_centavos)}</strong> <span>/ diária</span></p>
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
        ${ha(t)||t.endereco?(()=>{const s=Ra(t);return`<div class="info-card como-chegar">
            ${ha(t)?`<a class="place-map" data-lat="${t.lat}" data-lng="${t.lng}" href="${d(s.google)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir a rota no Google Maps"></a>`:""}
            <div class="cc-row"><span class="ic-ico">📍</span>
              <div><strong>Como chegar</strong>${t.endereco?`<p>${d(t.endereco)}</p>`:""}</div></div>
            <div class="cc-rotas">
              <a class="btn sm" href="${d(s.google)}" target="_blank" rel="noopener noreferrer">Google Maps</a>
              <a class="btn sm ghost" href="${d(s.waze)}" target="_blank" rel="noopener noreferrer">Waze</a>
            </div>
          </div>`})():""}
        ${t.instagram_url?`<a class="info-card insta" href="${d(t.instagram_url)}" target="_blank" rel="noopener noreferrer">
          <span class="ic-ico">${E.insta}</span>
          <div><strong>@${d(t.instagram_url.replace(/\/+$/,"").split("/").pop())}</strong><p>Mais fotos e vídeos no Instagram</p></div>
          <span class="ic-go">↗</span>
        </a>`:""}
      </section>

      <footer class="home-foot">
        ${Oa("home-foot-ilus",96,96)}
        <strong>${d(t.nome_app)}</strong>
        <nav><a href="#/galeria">Galeria</a><a href="#/termos">Termos de uso</a><a href="#/privacidade">Privacidade</a></nav>
      </footer>
    </div>`,o.length>1&&Me(v(".carousel")),$e(A()),v("#ver-cabanas").addEventListener("click",s=>{s.preventDefault(),v("#cabanas").scrollIntoView({behavior:"smooth",block:"start"})}),Ce(n)}async function Ce(e){const a=da(),t=K(a,89),n=(i,l)=>{const u=document.querySelector(`[data-livre="${i}"]`);u&&(u.classList.remove("on","off"),l===null?(u.textContent="Sem datas nos próximos 90 dias",u.classList.add("off")):(u.textContent=l===a?"● Livre hoje":l===K(a,1)?"● Livre amanhã":`● Livre a partir de ${G(l).slice(0,5)}`,u.classList.add("on")))},o=U("livres")||{};for(const i of e)(o[i.id]===null||o[i.id]>=a)&&n(i.id,o[i.id]);const s={};await Promise.all(e.map(async i=>{try{const{data:l,error:u}=await b.rpc("disponibilidade",{p_cabana:i.id,p_de:a,p_ate:t});if(u)throw u;s[i.id]=l.find(r=>r.situacao==="livre")?.dia??null,n(i.id,s[i.id])}catch{i.id in o||document.querySelector(`[data-livre="${i.id}"]`)?.remove()}})),ea("livres",{...o,...s})}function Me(e){const a=v(".track",e),t=O(".dots button",e),n=t.length;let o=0,s=!1;const i=(u,r=!0)=>{o=(u+n)%n,a.scrollTo({left:o*a.clientWidth,behavior:r?"smooth":"auto"}),t.forEach((M,S)=>M.classList.toggle("on",S===o))};t.forEach(u=>u.addEventListener("click",()=>i(+u.dataset.i))),a.addEventListener("scroll",()=>{const u=Math.round(a.scrollLeft/a.clientWidth);u!==o&&u>=0&&u<n&&(o=u,t.forEach((r,M)=>r.classList.toggle("on",M===o)))},{passive:!0}),a.addEventListener("pointerdown",()=>s=!0),a.addEventListener("pointerup",()=>setTimeout(()=>s=!1,4e3)),i(0,!1);const l=setInterval(()=>{if(!e.isConnected)return clearInterval(l);!s&&!document.hidden&&i(o+1)},4500)}function Se(e){if(!le(e))return"";const a=e.preco_fim_semana_centavos??e.preco_diaria_centavos,t=e.preco_feriado_centavos??a;return`<div class="precos-cab">
    <span><small>Segunda a quinta</small><b>${N(e.preco_diaria_centavos)}</b></span>
    <span><small>Sexta a domingo</small><b>${N(a)}</b></span>
    <span><small>Feriados</small><b>${N(t)}</b></span>
  </div>`}function Te(e,a,t,n){const{total:o,grupos:s}=ie(e,a,t,n),i=(u,r)=>r.n?`<div class="row between small muted"><span>${r.n} × ${u}</span><span>${N(r.valor)}</span></div>`:"";return(s.fim_semana.n||s.feriado.n?i("diária normal",s.normal)+i("sexta a domingo",s.fim_semana)+i(`feriado${s.feriado.nomes.length?` (${d(s.feriado.nomes.join(", "))})`:""}`,s.feriado):"")+`<div class="row between total"><span>Total</span><strong>${N(o)}</strong></div>`}async function Ae(e,a=!1){const t=p.cabanas&&p.fotos?{cabanas:p.cabanas,fotos:p.fotos}:U("vitrine"),{cabanas:n,fotos:o}=t||await ta();t&&ta().then(h=>ea("vitrine",h)).catch(()=>{});const s=n.find(h=>h.id===e&&h.ativa);if(!s)return y("#/");const i=p.config,l=va(s,o),u=da(),r={checkin:null,checkout:null,month:u.slice(0,7),days:new Map};let M=p.feriados||[];re().then(h=>{M=h,_.isConnected&&(m(),g())}).catch(()=>{}),A().innerHTML=`
    ${l.length?`<button type="button" class="cab-hero" data-i="0" aria-label="Ver fotos da ${d(s.nome)}">
        <img src="${d(I("fotos",l[0].path))}" alt="${d(l[0].legenda||s.nome)}">
        ${l.length>1?`<span class="cab-count">📷 ${l.length} fotos</span>`:""}</button>`:""}
    <section class="pad">
      <a href="#/" class="back">‹ Voltar</a>
      <h1 class="title">${d(s.nome)}</h1>
      <p class="muted">${E.people} até ${s.capacidade} pessoas · <strong>${N(s.preco_diaria_centavos)}</strong> a diária</p>
      ${Se(s)}
      ${s.descricao?`<p class="pre">${d(s.descricao)}</p>`:""}
      <p class="muted small">Entrada a partir das ${d(i.checkin_hora)} · saída até as ${d(i.checkout_hora)}</p>
    </section>
    ${l.length>1?`<section class="pad">
      <h2 class="section-title">Fotos da ${d(s.nome)}</h2>
      <div class="grid">${l.map((h,$)=>`<button type="button" class="thumb" data-i="${$}"><img src="${d(I("fotos",h.mini_path))}" alt="${d(h.legenda||s.nome)}" loading="lazy"></button>`).join("")}</div>
    </section>`:""}
    <section class="pad">
      <h2 class="section-title" id="escolha-datas">Escolha as datas</h2>
      <p class="muted small" id="cal-hint">Toque no dia da entrada e depois no dia da saída.</p>
      <div class="calendar" id="cal"></div>
      <div class="legend small"><span class="lg livre"></span>Livre <span class="lg reservado"></span>Reservado <span class="lg fechado"></span>Indisponível <span class="lg-fer"></span>Feriado</div>
      <div class="booking card" id="booking" hidden></div>
    </section>`;const S=l.map(h=>({src:I("fotos",h.path),cap:h.legenda}));O(".cab-hero, .grid .thumb").forEach(h=>h.addEventListener("click",()=>Ha(S,+h.dataset.i)));const _=v("#cal"),w=h=>`disp:${s.id}:${h}`,B=h=>h.forEach($=>r.days.set($.dia,$.dia<u?"passado":$.situacao));async function q(h){const $=`${h}-01`,k=K(K($,32).slice(0,7)+"-01",-1),{data:L,error:R}=await b.rpc("disponibilidade",{p_cabana:s.id,p_de:$,p_ate:k});if(R)throw R;ea(w(h),L),B(L)}function c(h,$){q(h).then(()=>{JSON.stringify(U(w(h)))!==$&&r.month===h&&_.isConnected&&(m(),g())}).catch(()=>{})}async function m(){if(![...r.days.keys()].some(T=>T.startsWith(r.month))){const T=U(w(r.month));if(T)B(T),c(r.month,JSON.stringify(T));else{_.innerHTML='<div class="loading">Carregando…</div>';try{await q(r.month)}catch(D){_.innerHTML=`<p class="muted">${d(Ea(D))}</p>`;return}}}const[h,$]=r.month.split("-").map(Number),k=`${r.month}-01`,L=new Date(k+"T12:00:00Z").getUTCDay(),R=new Date(Date.UTC(h,$,0)).getUTCDate(),z=r.month>u.slice(0,7);let F="";for(let T=0;T<L;T++)F+="<span></span>";for(let T=1;T<=R;T++){const D=`${r.month}-${String(T).padStart(2,"0")}`,ya=r.days.get(D)||"passado",Ja=r.checkin&&r.checkout&&D>=r.checkin&&D<r.checkout,Ka=D===r.checkout,Xa=D===r.checkin,_a=r.checkin&&!r.checkout&&D>r.checkin&&f(r.checkin,D),Za=ya==="livre"||_a,ia=ce(D,M);F+=`<button type="button" class="day ${ya} ${Ja?"in":""} ${Xa?"start":""} ${Ka?"end":""} ${_a?"can-out":""} ${ia?"feriado":""}" data-d="${D}" ${ia?`title="${d(ia)}"`:""} ${Za?"":"disabled"}>${T}</button>`}_.innerHTML=`
      <div class="cal-head">
        <button type="button" class="icon-btn" data-nav="-1" ${z?"":"disabled"} aria-label="Mês anterior">‹</button>
        <strong>${de[$-1]} de ${h}</strong>
        <button type="button" class="icon-btn" data-nav="1" aria-label="Próximo mês">›</button>
      </div>
      <div class="cal-grid dow">${["D","S","T","Q","Q","S","S"].map(T=>`<span>${T}</span>`).join("")}</div>
      <div class="cal-grid">${F}</div>`}function f(h,$){for(let k=h;k<$;k=K(k,1))if(r.days.get(k)!=="livre")return!1;return!0}function g(){const h=v("#booking"),$=v("#cal-hint");if(!r.checkin){h.hidden=!0,$.textContent="Toque no dia da entrada e depois no dia da saída.";return}if(!r.checkout){h.hidden=!0,$.textContent=`Entrada: ${G(r.checkin)}. Agora toque no dia da saída.`;return}const k=Sa(r.checkin,r.checkout);$.textContent=`${G(r.checkin)} → ${G(r.checkout)}`;const L=k<i.min_diarias,R=k>i.max_diarias;h.hidden=!1,h.innerHTML=`
      <div class="row between"><span>Entrada</span><strong>${G(r.checkin)} · ${d(i.checkin_hora)}</strong></div>
      <div class="row between"><span>Saída</span><strong>${G(r.checkout)} · ${d(i.checkout_hora)}</strong></div>
      <div class="row between"><span>Diárias</span><strong>${k}</strong></div>
      <label class="field row between"><span>Pessoas</span>
        <select id="hospedes">${Array.from({length:s.capacidade},(z,F)=>`<option ${F+1===Math.min(2,s.capacidade)?"selected":""}>${F+1}</option>`).join("")}</select></label>
      ${Te(s,r.checkin,r.checkout,M)}
      ${L?`<p class="warn small">O mínimo é de ${i.min_diarias} diária(s).</p>`:""}
      ${R?`<p class="warn small">O máximo é de ${i.max_diarias} diárias.</p>`:""}
      ${p.admin?'<a class="btn block" href="#/admin/reservas">Reservar pelo painel da equipe</a>':`<button class="btn block" id="reservar" ${L||R?"disabled":""}>${p.user?"Reservar e pagar com Pix":"Entrar para reservar"}</button>`}
      <p class="muted small center">O valor é conferido pela chácara no momento da reserva.</p>`,v("#reservar")?.addEventListener("click",z=>x(z.currentTarget))}async function x(h){if(!p.user)return sessionStorage.setItem("depois-de-entrar",location.hash),y("#/entrar");await H(h,async()=>{h.textContent="Reservando…";const{data:$,error:k}=await b.rpc("criar_reserva",{p_cabana:s.id,p_checkin:r.checkin,p_checkout:r.checkout,p_hospedes:Number(v("#hospedes").value),p_origem:"app"});if(k)throw J(w(r.month)),r.days.clear(),k;C(`Reserva ${$.codigo} criada! Agora é só pagar com Pix.`,"ok"),J("reservas"),J(w(r.month)),J("livres");const{conversa_id:L}=await Q("chat-ia",{acao:"reserva_criada",reserva_id:$.id});y(`#/chat/${L}`)}),r.days.size||m()}_.addEventListener("click",h=>{const $=h.target.closest("[data-nav]");if($){const[R,z]=r.month.split("-").map(Number),F=new Date(Date.UTC(R,z-1+Number($.dataset.nav),1));return r.month=F.toISOString().slice(0,7),m()}const k=h.target.closest(".day");if(!k||k.disabled)return;const L=k.dataset.d;if(!r.checkin||r.checkout||L<=r.checkin){if(r.days.get(L)!=="livre")return;r.checkin=L,r.checkout=null}else f(r.checkin,L)?r.checkout=L:(r.checkin=r.days.get(L)==="livre"?L:null,r.checkout=null);m(),g()});const aa=m();a&&requestAnimationFrame(()=>{const h=v("#escolha-datas");h&&window.scrollTo({top:h.getBoundingClientRect().top+window.scrollY-70,behavior:"smooth"})}),await aa}async function Pe(){const e=p.cabanas&&p.fotos?{cabanas:p.cabanas,fotos:p.fotos}:U("vitrine")||await ta(),a=e.cabanas.filter(n=>n.ativa);if(!a.length)return C("Nenhuma cabana disponível no momento.");const t=document.createElement("dialog");t.className="sheet",t.innerHTML=`
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-head"><h3>Escolha a cabana</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
    <p class="muted small sheet-sub">Depois você escolhe as datas no calendário.</p>
    <div class="sheet-list">${a.map(n=>{const o=oa(n,e.fotos);return`<button type="button" class="sheet-cab" data-id="${d(n.id)}">
        <span class="sc-img">${o?`<img src="${d(I("fotos",o.mini_path))}" alt="">`:Y("ph")}</span>
        <span class="sc-txt"><strong>${d(n.nome)}</strong>
          <span class="muted small">${E.people} até ${n.capacidade} pessoas</span>
          <span class="sc-preco"><b>${N(n.preco_diaria_centavos)}</b> <span class="muted small">/ diária</span></span></span>
        <span class="chev">›</span>
      </button>`}).join("")}</div>`,document.body.appendChild(t),t.addEventListener("close",()=>t.remove()),t.addEventListener("click",n=>{if(n.target===t||n.target.closest("[data-fechar]"))return t.close();const o=n.target.closest(".sheet-cab");o&&(t.close(),y(`#/cabana/${o.dataset.id}/datas`))}),t.showModal()}async function De(){await Ma(Ie)}function Ie({fotos:e,cabanas:a}){const t=e.filter(l=>l.na_galeria),n=a.filter(l=>t.some(u=>u.cabana_id===l.id)),o=p.config;let s="";A().innerHTML=`
    <section class="pad">
      <h1 class="title">Galeria</h1>
      ${n.length?`<div class="chips"><button class="chip on" data-f="">Todas</button>${n.map(l=>`<button class="chip" data-f="${l.id}">${d(l.nome)}</button>`).join("")}</div>`:""}
      <div class="grid" id="grid"></div>
      ${o.instagram_url?`<a class="insta-card" href="${d(o.instagram_url)}" target="_blank" rel="noopener noreferrer">${E.insta}<span><strong>Quer ver mais fotos e vídeos?</strong><br>Siga a chácara no Instagram</span></a>`:""}
    </section>`;const i=()=>{const l=t.filter(u=>!s||u.cabana_id===s);v("#grid").innerHTML=l.length?l.map((u,r)=>`<button class="thumb" data-i="${r}"><img src="${d(I("fotos",u.mini_path))}" alt="${d(u.legenda||"Foto")}" loading="lazy"></button>`).join(""):'<p class="muted">Nenhuma foto ainda.</p>',O(".thumb").forEach(u=>u.addEventListener("click",()=>Ha(l.map(r=>({src:I("fotos",r.path),cap:r.legenda})),+u.dataset.i)))};O(".chip").forEach(l=>l.addEventListener("click",()=>{s=l.dataset.f,O(".chip").forEach(u=>u.classList.toggle("on",u===l)),i()})),i()}function Ha(e,a=0){const t=e.map(c=>typeof c=="string"?{src:c}:c),n=t.length;let o=Math.min(Math.max(0,a),n-1);const s=document.createElement("dialog");s.className="lightbox",s.innerHTML=`
    <div class="lb-track">${t.map(c=>`<figure class="lb-slide"><img alt="${d(c.cap||"")}" draggable="false" decoding="async"></figure>`).join("")}</div>
    <div class="lb-top"><span class="lb-count"></span><button class="lb-close" aria-label="Fechar">✕</button></div>
    <p class="lb-cap"></p>
    ${n>1?'<button class="lb-prev" aria-label="Foto anterior">‹</button><button class="lb-next" aria-label="Próxima foto">›</button>':""}`,document.body.appendChild(s);const i=v(".lb-track",s),l=O(".lb-slide img",s),u=()=>s.clientWidth||window.innerWidth,r=c=>{c>=0&&c<n&&!l[c].src&&(l[c].src=t[c].src)},M=(c=0,m=!0)=>{i.style.transition=m?"transform .28s cubic-bezier(.2,.8,.2,1)":"none",i.style.transform=`translate3d(${-o*u()+c}px,0,0)`},S=(c=!0)=>{[o-1,o,o+1].forEach(r),M(0,c),v(".lb-count",s).textContent=n>1?`${o+1} / ${n}`:"",v(".lb-cap",s).textContent=t[o].cap||"",n>1&&(v(".lb-prev",s).disabled=o===0,v(".lb-next",s).disabled=o===n-1)},_=c=>{o=Math.min(Math.max(0,o+c),n-1),S()};let w=null;i.addEventListener("pointerdown",c=>{c.button>0||(w={x:c.clientX,y:c.clientY,t:Date.now(),eixo:null,id:c.pointerId},i.setPointerCapture(c.pointerId))}),i.addEventListener("pointermove",c=>{if(!w||c.pointerId!==w.id)return;const m=c.clientX-w.x,f=c.clientY-w.y;if(!w.eixo&&Math.hypot(m,f)>8&&(w.eixo=Math.abs(m)>Math.abs(f)?"x":"y"),w.eixo==="x"){const g=o===0&&m>0||o===n-1&&m<0;M(g?m/3:m,!1)}else w.eixo==="y"&&f>0&&(i.style.transition="none",i.style.transform=`translate3d(${-o*u()}px,${f}px,0)`,s.style.setProperty("--lb-fundo",String(Math.max(.3,1-f/500))))});const B=c=>{if(!w||c.pointerId!==w.id)return;const m=c.clientX-w.x,f=c.clientY-w.y,g=Date.now()-w.t<250,x=w.eixo;if(w=null,s.style.removeProperty("--lb-fundo"),x==="x"&&(Math.abs(m)>u()*.18||g&&Math.abs(m)>30))return _(m<0?1:-1);if(x==="y"&&(f>120||g&&f>60))return s.close();S()};i.addEventListener("pointerup",B),i.addEventListener("pointercancel",B),v(".lb-close",s).onclick=()=>s.close(),v(".lb-prev",s)?.addEventListener("click",()=>_(-1)),v(".lb-next",s)?.addEventListener("click",()=>_(1)),s.addEventListener("keydown",c=>{c.key==="ArrowLeft"&&_(-1),c.key==="ArrowRight"&&_(1)});const q=()=>S(!1);window.addEventListener("resize",q),s.addEventListener("close",()=>{window.removeEventListener("resize",q),s.remove()}),s.showModal(),S(!1)}const qe=(e,a)=>{const t='<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';return e.startsWith("#")?`<a class="fab" href="${e}" aria-label="${d(a)}" title="${d(a)}">${t}</a>`:`<button type="button" class="fab" id="${e}" aria-label="${d(a)}" title="${d(a)}">${t}</button>`};function gt(e){const a=Ta[e]||{label:e,tone:""};return`<span class="badge ${a.tone}">${d(a.label)}</span>`}async function Fa(){const{data:e,error:a}=await b.from("reservas").select("id,codigo,cabana_id,checkin,checkout,diarias,hospedes,valor_centavos,status,expira_em,motivo,comprovante_tentativas,cabanas(nome)").eq("user_id",p.user.id).order("checkin",{ascending:!1}).limit(100);if(a)throw a;return e}async function Ne(){await ee("reservas",Fa,fa)}let ja="proximas";const Re=["dom.","seg.","ter.","qua.","qui.","sex.","sáb."],Oe=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];function Ba(e){const a=new Date(e+"T12:00:00Z");return{dia:String(a.getUTCDate()).padStart(2,"0"),mes:Oe[a.getUTCMonth()],sem:Re[a.getUTCDay()]}}function Va(e){const a=Date.parse(e)-Date.now();if(a<=0)return null;const t=Math.floor(a/36e5),n=Math.floor(a%36e5/6e4);return t?`${t} h ${n} min`:n?`${n} min`:"menos de 1 min"}function He(e,a){const t=p.config,n=(i,l)=>`${i.replace(/-/g,"")}T${l.replace(":","")}00`,o=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Chacara Canarinho//Reservas//PT","BEGIN:VEVENT",`UID:${e.id}@chacara-canarinho`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").slice(0,15)}Z`,`DTSTART:${n(e.checkin,t.checkin_hora)}`,`DTEND:${n(e.checkout,t.checkout_hora)}`,`SUMMARY:${t.nome_app} · ${a}`.replace(/[,;]/g," "),`DESCRIPTION:Reserva ${e.codigo} · ${e.hospedes} pessoa(s)`.replace(/[,;]/g," "),t.endereco?`LOCATION:${t.endereco.split("·")[0].trim().replace(/[,;]/g," ")}`:"","END:VEVENT","END:VCALENDAR"].filter(Boolean),s=document.createElement("a");s.href=URL.createObjectURL(new Blob([o.join(`\r
`)],{type:"text/calendar"})),s.download=`reserva-${e.codigo}.ics`,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),2e3)}const Ua=["aguardando_pagamento","em_analise","confirmada"],Fe={aguardando_pagamento:"⏳",em_analise:"🔎",confirmada:"✅",cancelada:"✕",recusada:"!",expirada:"⌛"};function fa(e){const a=p.fotos||U("vitrine")?.fotos||[],t=p.cabanas||U("vitrine")?.cabanas||[],n=c=>c.cabanas?.nome||t.find(m=>m.id===c.cabana_id)?.nome||"Cabana",o=c=>{const m=a.filter(f=>f.cabana_id===c.cabana_id).sort((f,g)=>(g.principal===!0)-(f.principal===!0)||f.ordem-g.ordem)[0];return m?I("fotos",m.mini_path):null},s=p.config,i=da(),l=e.filter(c=>c.checkout>=i&&Ua.includes(c.status)).sort((c,m)=>c.checkin.localeCompare(m.checkin)),u=e.filter(c=>!l.includes(c)),r=ja==="anteriores"&&u.length?"anteriores":l.length||!u.length?"proximas":"anteriores",M=r==="proximas"?l:u,S=c=>{const m=c.status==="confirmada"?3:c.status==="em_analise"?2:1;return`<ol class="res-steps">${["Reservada","Pagamento","Confirmada"].map((f,g)=>`<li class="${g<m?"ok":""} ${g===m?"now":""}"><span>${g<m?"✓":g+1}</span>${f}</li>`).join("")}</ol>`},_=c=>{if(c.status==="aguardando_pagamento"){const m=c.expira_em?Va(c.expira_em):null;return`${S(c)}
        <div class="res-next warn-box">
          <strong>Falta pagar para garantir as datas</strong>
          ${m?`<span>Você tem <b data-expira="${d(c.expira_em)}">${m}</b> para pagar com Pix.</span>`:"<span>O prazo de pagamento terminou; as datas podem ser liberadas.</span>"}
          ${c.motivo&&c.comprovante_tentativas?`<span class="small">${d(c.motivo)}</span>`:""}
        </div>
        <div class="res-actions">
          <button class="btn" data-act="pix">💠 Pagar com Pix</button>
          <label class="btn ghost">${E.clip} Enviar comprovante<input type="file" accept="image/*" data-act="comprovante" hidden></label>
        </div>
        <button class="link danger small res-cancel" data-act="cancelar">Cancelar reserva</button>`}if(c.status==="em_analise")return`${S(c)}
        <div class="res-next info-box"><strong>Comprovante recebido 👍</strong>
          <span>Estamos conferindo o pagamento. Você recebe a confirmação por e-mail e no celular.</span></div>
        <div class="res-actions"><button class="btn ghost" data-act="chat">💬 Falar com o atendente</button></div>`;if(c.status==="confirmada"){const m=Sa(i,c.checkin),f=m>1?`Faltam <b>${m} dias</b> para a sua hospedagem`:m===1?"É <b>amanhã</b>! Prepare as malas 🧳":c.checkin===i?"É <b>hoje</b>! Estamos esperando você 🌿":"Aproveite a sua estadia 🌿",g=ha(s)||s.endereco?Ra(s).google:"";return`<div class="res-next ok-box"><strong>Reserva confirmada</strong><span>${f}.</span></div>
        <div class="res-actions three">
          ${g?`<a class="btn ghost" href="${d(g)}" target="_blank" rel="noopener noreferrer">${E.pin} Como chegar</a>`:""}
          <button class="btn ghost" data-act="agenda">${E.cal} Agenda</button>
          <button class="btn ghost" data-act="chat">${E.chat} Atendente</button>
        </div>`}return`${c.motivo?`<p class="res-motivo">${d(c.motivo)}</p>`:""}
      <div class="res-actions"><a class="btn ghost" href="#/cabana/${d(c.cabana_id)}">Reservar de novo</a></div>`},w=c=>{const m=o(c),f=Ba(c.checkin),g=Ba(c.checkout),x=Ta[c.status]||{label:c.status,tone:""},aa=l.includes(c);return`<article class="res-card ${aa?"":"past"}" data-id="${c.id}">
      <div class="res-head">
        <div class="res-img">${m?`<img src="${d(m)}" alt="" loading="lazy">`:Y("ph")}</div>
        <div class="res-title">
          <span class="res-status ${x.tone}">${Fe[c.status]||""} ${d(x.label)}</span>
          <h3>${d(n(c))}</h3>
          <span class="res-code">Reserva <b>${d(c.codigo)}</b></span>
        </div>
      </div>
      <div class="res-dates">
        <div class="rd"><small>Entrada</small><strong>${f.dia} ${f.mes}</strong><span>${f.sem} · ${d(s.checkin_hora)}</span></div>
        <div class="rd-mid"><span>${c.diarias} ${c.diarias===1?"noite":"noites"}</span></div>
        <div class="rd"><small>Saída</small><strong>${g.dia} ${g.mes}</strong><span>${g.sem} · ${d(s.checkout_hora)}</span></div>
      </div>
      <div class="res-info"><span>${E.people} ${c.hospedes} ${c.hospedes===1?"pessoa":"pessoas"}</span><strong>${N(c.valor_centavos)}</strong></div>
      ${aa?_(c):Ua.includes(c.status)?"":_(c)}
    </article>`};A().innerHTML=`
    <section class="res-page">
      <header class="page-head"><h1>Minhas reservas</h1></header>
      ${e.length?`<div class="segmented res-tabs">
          <button data-aba="proximas" class="${r==="proximas"?"on":""}">Próximas${l.length?` <span class="seg-n">${l.length}</span>`:""}</button>
          <button data-aba="anteriores" class="${r==="anteriores"?"on":""}">Anteriores${u.length?` <span class="seg-n">${u.length}</span>`:""}</button>
        </div>`:""}
      <div class="res-list">
        ${M.length?M.map(w).join(""):`<div class="empty-chat">
          ${Oa("vazio-ilus",132,132)}
          <h2>${r==="proximas"?"Nenhuma reserva por enquanto":"Nenhuma reserva anterior"}</h2>
          <p class="muted">Escolha uma cabana, veja os dias livres e reserve em poucos toques.</p>
          <p class="small muted">Toque no <b>+</b> para fazer uma reserva.</p></div>`}
      </div>
      ${qe("nova-reserva","Nova reserva")}
    </section>`;const B=setInterval(()=>{O("[data-expira]").forEach(c=>{const m=Va(c.dataset.expira);c.textContent=m||"prazo encerrado"})},3e4);ne(()=>clearInterval(B));const q=A().firstElementChild;v("#nova-reserva",q)?.addEventListener("click",()=>Pe().catch(j)),O("[data-aba]",q).forEach(c=>c.addEventListener("click",()=>{ja=c.dataset.aba,fa(e)})),q.addEventListener("click",async c=>{const m=c.target.closest("button[data-act]");if(!m)return;const f=m.closest(".res-card").dataset.id,g=e.find(x=>x.id===f);if(m.dataset.act==="agenda")return He(g,n(g));if((m.dataset.act==="pix"||m.dataset.act==="chat")&&await H(m,async()=>{const{conversa_id:x}=await Q("chat-ia",{acao:"reserva_criada",reserva_id:f});y(`#/chat/${x}`)}),m.dataset.act==="cancelar"){if(!await W("Cancelar a reserva?","As datas ficam livres para outras pessoas.","Cancelar reserva",!0))return;await H(m,async()=>{const{error:x}=await b.rpc("cancelar_minha_reserva",{p_id:f});if(x)throw x;C("Reserva cancelada."),Object.assign(g,{status:"cancelada",motivo:"Cancelada pelo cliente."}),ea("reservas",e),fa(e)})}}),q.addEventListener("change",async c=>{const m=c.target.closest('input[data-act="comprovante"]');if(!m?.files[0])return;const f=m.closest(".res-card").dataset.id,g=m.closest("label");g.classList.add("busy");try{const x=await je(f,m.files[0]);y(`#/chat/${x.conversa_id}`)}catch(x){j(x)}finally{g.classList.remove("busy"),m.value=""}})}async function je(e,a,t){C("Enviando e conferindo o comprovante…");const n=await pe(a),o=`${p.user.id}/${e}/${crypto.randomUUID()}.${Da(n)}`,{error:s}=await b.storage.from("comprovantes").upload(o,n,{contentType:n.type,upsert:!1});if(s)throw s;const i=await Q("chat-ia",{acao:"comprovante",reserva_id:e,path:o,conversa_id:t});return J("reservas"),i.resultado==="confirmada"?C("Pagamento conferido! Reserva confirmada ✅","ok"):i.resultado==="em_analise"&&C("Comprovante enviado para conferência.","ok"),i}function Be(e={},a={}){const t=n=>d(e[n]??a[n]??"");return`
    <label class="field"><span>Nome completo *</span><input name="nome" required minlength="2" maxlength="80" autocomplete="name" value="${t("nome")}"></label>
    <label class="field"><span>Celular (WhatsApp) *</span><input name="telefone" required inputmode="tel" autocomplete="tel" placeholder="(61) 99999-9999" value="${d(e.telefone?na(e.telefone):a.telefone||"")}"></label>
    <label class="field"><span>Cidade / região onde mora <em class="muted">(opcional)</em></span><input name="regiao" maxlength="80" autocomplete="address-level2" placeholder="Ex.: Brasília - DF" value="${t("regiao")}"></label>
    <fieldset class="field"><legend>Quero receber novidades e promoções</legend>
      <label class="check"><input type="checkbox" name="receber_email" ${e.receber_email??a.receber_email?"checked":""}> Por e-mail</label>
      <label class="check"><input type="checkbox" name="receber_push" ${e.receber_push??a.receber_push?"checked":""}> Por notificação no celular</label>
    </fieldset>`}function Ve(e){const a=e.elements.telefone;a.addEventListener("input",()=>a.value=na(a.value))}async function ga(e,a){const t=e.elements,n=pa(t.telefone.value);if(!n)throw new Error("Informe um celular válido com DDD.");const{data:o,error:s}=await b.rpc("salvar_perfil",{p_nome:t.nome.value.trim(),p_telefone:n,p_regiao:t.regiao.value.trim(),p_receber_email:t.receber_email.checked,p_receber_push:t.receber_push.checked,p_aceite:a});if(s)throw s;return p.perfil=o,t.receber_push.checked&&!await qa()&&await Ia(b,ka.VAPID_PUBLIC_KEY).catch(()=>"erro")==="ios-instalar"&&C("No iPhone, instale o app na tela de início para receber notificações."),V(),o}async function ba(){const e=p.perfil,a=(()=>{try{return localStorage.getItem("tema")||"auto"}catch{return"auto"}})();if(A().innerHTML=`
    <section class="pad narrow">
      <div class="profile-head">
        <div class="avatar-edit">
          <span class="avatar xl" id="me-avatar">${d(ua(e.nome))}</span>
          <label class="avatar-btn" aria-label="Trocar a foto">${E.camera}<input type="file" accept="image/*" id="foto" hidden></label>
        </div>
        <h1 class="title">${d(e.nome)}</h1>
        <p class="muted small">${d(p.user.email||"")}</p>
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
    </section>`,e.foto_path){const n=await La(e.foto_path);n&&(v("#me-avatar").innerHTML=`<img src="${d(n)}" alt="">`)}const t=v("#perfil");Ve(t),t.addEventListener("submit",async n=>{n.preventDefault(),await H(t.querySelector("button"),async()=>{await ga(t,!1),C("Dados salvos.","ok")})}),v("#foto").addEventListener("change",async n=>{const o=n.target.files[0];if(!o)return;const s=v(".avatar-edit");s.classList.add("busy");try{await Wa(await Pa(o)),C("Foto atualizada.","ok"),ba()}catch(i){j(i)}finally{s.classList.remove("busy")}}),v("#tirar-foto")?.addEventListener("click",async()=>{if(!await W("Remover a foto?","","Remover",!0))return;const n=p.perfil.foto_path,{error:o}=await b.rpc("definir_foto",{p_path:null});if(o)return j(o);await b.storage.from("avatares").remove([n]),p.perfil.foto_path=null,V(),ba()}),v("#excluir").addEventListener("click",async()=>{if(await W("Excluir sua conta?","Seu perfil e sua foto serão apagados. Você perde o acesso às conversas, que ficam guardadas pela chácara por 5 anos. O registro das hospedagens já feitas é mantido, como explica a Política de Privacidade.","Excluir para sempre",!0))try{await Q("excluir-conta",{confirmar:!0}),ma(),await b.auth.signOut(),C("Conta excluída."),y("#/")}catch(n){j(n)}})}let Z=null;const P=(e,a,t,n='<span class="chev">›</span>',o="")=>`<${e?`a href="${e}"`:'button type="button"'} class="li" ${o}><span class="li-ico">${a}</span><span class="grow">${t}</span>${n}</${e?"a":"button"}>`;function Ue(){try{return localStorage.getItem("tema")||"auto"}catch{return"auto"}}async function za(){const e=p.perfil,a=p.config,t=Ue(),n={auto:"Automático",claro:"Claro",escuro:"Escuro"}[t],o=matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0;A().innerHTML=`
    <section class="pad menu-page">
      <section class="profile-card">
        ${p.user?`
          <div class="row gap pc-in">
            <span class="avatar lg" id="menu-avatar">${d(ua(e?.nome||p.user.email))}</span>
            <div class="grow pc-txt"><h2>${d(e?.nome||"")}</h2><div class="pc-mail">${d(p.user.email||"")}</div>
            ${p.admin?'<span class="pc-chip">👑 Administrador</span>':""}</div>
          </div>
          <a class="btn sm pc-btn" href="#/perfil">Editar perfil</a>`:`<div class="pc-in"><div class="pc-emoji">🏡</div><h2>Bem-vindo(a) à ${d(a.nome_app)}</h2>
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
        ${be.map(([i,l,u])=>P(`#/admin/${i}`,l,u,i==="reservas"?'<span id="m-validar"><span class="chev">›</span></span>':i==="conversas"?'<span id="m-chamados"><span class="chev">›</span></span>':'<span class="chev">›</span>')).join("")}
      </nav>
      <div class="list-title">Testar avisos <span class="muted">(chegam só para você)</span></div><nav class="list" id="testes">
        ${P("","✉️",`Enviar e-mail de teste<br><span class="muted small">${d(p.user.email||"")}</span>`,'<span class="chev">›</span>','data-teste="email"')}
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
      <p class="center small muted gap-top">${d(a.nome_app)}${a.endereco?` · ${d(a.endereco)}`:""}</p>
    </section>`,e?.foto_path&&La(e.foto_path).then(i=>{const l=v("#menu-avatar");i&&l&&(l.innerHTML=`<img src="${d(i)}" alt="">`)}),p.admin&&(b.from("conversas").select("id",{count:"exact",head:!0}).eq("atendimento","chamou").then(({count:i,error:l})=>{const u=v("#m-chamados");!l&&u&&i&&(u.innerHTML=`<span class="count">🙋 ${i}</span>`)}),b.from("reservas").select("id",{count:"exact",head:!0}).or("status.eq.em_analise,and(status.eq.confirmada,validada.eq.false)").then(({count:i})=>{const l=v("#m-validar");l&&i&&(l.innerHTML=`<span class="count">${i}</span>`)}));const s=v("#notif");if(s){const i=me();i!=="ok"?(s.disabled=!0,v("#push-hint").textContent=i==="ios-instalar"?"No iPhone, instale o app na tela de início primeiro":"Este navegador não recebe notificações"):(qa().then(l=>s.checked=l).catch(()=>{}),s.addEventListener("change",async()=>{s.disabled=!0;try{if(s.checked){const l=await Ia(b,ka.VAPID_PUBLIC_KEY);l!=="ativo"?(s.checked=!1,C(l==="negado"?"Notificações bloqueadas nas configurações do navegador.":"Não foi possível ativar neste celular.","bad")):C("Notificações ativadas.","ok")}else await ue(b),C("Notificações desativadas neste celular.")}catch(l){s.checked=!s.checked,j(l)}finally{s.disabled=!1}}))}v("#testes")?.addEventListener("click",async i=>{const l=i.target.closest("[data-teste]");if(!l||l.disabled)return;const u=l.dataset.teste;l.disabled=!0,l.classList.add("testando");try{const r=await Q("admin-reserva",{acao:"testar",tipo:u}),M="Este celular ainda não está com as notificações ligadas. Ligue em Menu › Notificações no celular e teste de novo.";let S,_;u==="email"?(S=r.email_enviado?"✉️ E-mail enviado":"✉️ O e-mail não foi enviado",_=r.email_enviado?`Enviado para ${r.para}${r.remetente?`, de ${r.remetente}`:""}. Confira a caixa de entrada (e o spam, na primeira vez).`:r.email_configurado?"O Gmail recusou o envio. Confira se a senha de app (GMAIL_APP_PASSWORD) está certa e se a verificação em duas etapas continua ligada na conta.":"O envio de e-mail não está configurado no servidor: confira GMAIL_USER (variável) e GMAIL_APP_PASSWORD (segredo) no GitHub e publique as funções."):u==="push"?(S=r.push_enviados?"🔔 Notificação enviada":"🔔 A notificação não foi enviada",_=r.push_enviados?`Enviada para ${r.push_enviados} aparelho(s). Ela aparece em alguns segundos (com o app fechado ou em segundo plano).`:r.push_configurado?r.aparelhos?"O serviço de notificação recusou o envio. Desligue e ligue as notificações no Menu e teste de novo.":M:"As notificações não estão configuradas no servidor: confira VAPID_PRIVATE_KEY (segredo) e VAPID_PUBLIC_KEY (variável) no GitHub e publique as funções."):(S="✅ Reserva de exemplo simulada",_=[r.email_configurado?`E-mail "Reserva confirmada" enviado para ${r.para}.`:"E-mail não enviado: o envio não está configurado no servidor.",r.push_configurado&&r.aparelhos?`Notificação enviada para ${r.aparelhos} aparelho(s).`:r.push_configurado?M:"Notificação não enviada: não está configurada no servidor.","Nada foi gravado: é só uma simulação (código TESTE1)."].join(`

`)),W(S,_,"Entendi")}catch(r){j(r)}finally{l.disabled=!1,l.classList.remove("testando")}}),v("#tema").addEventListener("click",()=>{Ga({auto:"claro",claro:"escuro",escuro:"auto"}[t]),za()}),v("#instalar")?.addEventListener("click",async()=>{if(Z){Z.prompt(),await Z.userChoice.catch(()=>{}),Z=null;return}const i=/iphone|ipad|ipod/i.test(navigator.userAgent);W("Instalar o app",i?'No Safari, toque em Compartilhar (quadrado com a seta) e depois em "Adicionar à Tela de Início".':'No menu do navegador (⋮), toque em "Instalar app" ou "Adicionar à tela inicial".',"Entendi")}),v("#sair")?.addEventListener("click",async()=>{await W("Sair da conta?","Você continua vendo as cabanas, mas sem reservas e conversas.","Sair")&&(ma(),await b.auth.signOut(),y("#/"))})}async function Wa(e){const a=`${p.user.id}/${crypto.randomUUID()}.${Da(e)}`,{error:t}=await b.storage.from("avatares").upload(a,e,{contentType:e.type});if(t)throw t;const{error:n}=await b.rpc("definir_foto",{p_path:a});if(n)throw n;const o=p.perfil.foto_path;o&&b.storage.from("avatares").remove([o]),p.perfil.foto_path=a,V()}let $a=!1;async function ra(){const e=p.user,a=e?.user_metadata||{},t=a.avatar_url||a.picture;if(!($a||!p.perfil||p.perfil.foto_path||a.foto_google||!Ca(e))&&!(!t||!t.startsWith("https://lh3.googleusercontent.com/"))){$a=!0;try{const n=await fetch(t.replace(/=s\d+(-c)?$/,"=s800-c"));if(!n.ok)return;const o=await n.blob();if(!o.type.startsWith("image/"))return;await Wa(await Pa(o)),await b.auth.updateUser({data:{foto_google:!0}}).catch(()=>{})}catch{}finally{$a=!1}}}function Ga(e){const a=document.documentElement;try{e==="auto"?localStorage.removeItem("tema"):localStorage.setItem("tema",e)}catch{}e==="auto"?a.removeAttribute("data-theme"):a.setAttribute("data-theme",e==="escuro"?"dark":"light")}const wa=()=>location.origin+location.pathname;function ze(){if(p.user)return y("#/");A().innerHTML=`
    <section class="pad narrow auth">
      ${Y("auth-logo",84,84)}
      <h1 class="title center">Entrar</h1>
      <button class="btn google block" id="google">${E.google} Entrar com o Google</button>
      <p class="muted small center">Seu cadastro é criado na hora, já com a sua foto do Google.</p>
      <div class="divider"><span>ou com e-mail e senha</span></div>
      <form id="login" class="stack">
        <label class="field"><span>E-mail</span><input name="email" type="email" required autocomplete="email"></label>
        <label class="field"><span>Senha</span><input name="senha" type="password" required minlength="8" autocomplete="current-password"></label>
        <button class="btn block">Entrar</button>
      </form>
      <div class="row between small gap-top"><a href="#/cadastro">Não tenho conta Google: criar cadastro</a><button class="link" id="esqueci">Esqueci a senha</button></div>
      <p class="muted small center gap-top">Ao entrar você concorda com os <a href="#/termos">Termos de uso</a> e a <a href="#/privacidade">Política de privacidade</a>.</p>
    </section>`,v("#google").addEventListener("click",async e=>{await H(e.currentTarget,async()=>{const{error:a}=await b.auth.signInWithOAuth({provider:"google",options:{redirectTo:wa()}});if(a)throw a})}),v("#login").addEventListener("submit",async e=>{e.preventDefault();const a=e.target.elements;await H(e.target.querySelector("button"),async()=>{const{error:t}=await b.auth.signInWithPassword({email:a.email.value.trim(),password:a.senha.value});if(t)throw new Error(/invalid/i.test(t.message)?"E-mail ou senha incorretos.":/confirm/i.test(t.message)?"Confirme o seu e-mail pelo link que enviamos.":t.message)})}),v("#esqueci").addEventListener("click",async()=>{const e=v("#login").elements.email.value.trim();if(!Aa.test(e))return C("Escreva o seu e-mail no campo acima.");const{error:a}=await b.auth.resetPasswordForEmail(e,{redirectTo:wa()+"#/nova-senha"});if(a)return j(a);C("Enviamos um link para criar uma nova senha.","ok")})}const We='<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';function Ya(e={},{comConta:a=!1}={}){const t=n=>d(e[n]??"");return`
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
        <input name="telefone" required inputmode="tel" autocomplete="tel-national" placeholder="(61) 99999-9999" value="${d(e.telefone||"")}">
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
    </label>`}function Qa(e){const a=e.elements,t=e.querySelector("button.cad-enviar"),n=e.querySelector(".cad-falta"),o=a.telefone,s=()=>{const i=!!pa(o.value);o.closest(".cad-tel").classList.toggle("valido",i);const l=[];a.nome.value.trim().length<2&&l.push("o seu nome"),a.email&&!Aa.test(a.email.value.trim())&&l.push("o e-mail"),a.senha&&a.senha.value.length<8&&l.push("uma senha de 8 caracteres"),i||l.push("o celular com DDD"),a.aceite.checked||l.push("aceitar os termos"),t.disabled=l.length>0,n.textContent=l.length?`Falta: ${l.join(", ")}.`:""};o.value&&(o.value=na(o.value)),o.addEventListener("input",()=>o.value=na(o.value)),e.addEventListener("input",s),e.addEventListener("change",s),e.querySelector(".cad-olho")?.addEventListener("click",i=>{const l=a.senha;l.type=l.type==="password"?"text":"password",i.currentTarget.classList.toggle("on",l.type==="text")}),e.querySelectorAll("[data-doc]").forEach(i=>i.addEventListener("click",l=>{l.preventDefault(),Ge(i.dataset.doc)})),s()}async function Ge(e){const a=document.createElement("dialog");a.className="sheet doc-sheet",a.innerHTML='<div class="sheet-handle"></div><div class="sheet-head"><span></span><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div><div class="doc"><p class="muted">Carregando…</p></div><button type="button" class="btn block" data-fechar>Fechar</button>',document.body.appendChild(a),a.addEventListener("close",()=>a.remove()),a.addEventListener("click",t=>(t.target===a||t.target.closest("[data-fechar]"))&&a.close()),a.showModal();try{const t=await fetch(`${e}.html`),n=new DOMParser().parseFromString(await t.text(),"text/html").querySelector("main");n.querySelectorAll("script, iframe, object").forEach(o=>o.remove()),n.querySelectorAll('a[href="./"]').forEach(o=>o.closest("p")?.remove()),n.querySelectorAll('a[href$=".html"]').forEach(o=>o.removeAttribute("href")),a.querySelector(".doc").innerHTML=n.innerHTML}catch{a.querySelector(".doc").innerHTML='<p class="warn">Não foi possível abrir agora. Confira a internet.</p>'}}function Ye(){if(p.user)return y("#/");A().innerHTML=`
    <section class="cad">
      <a href="#/entrar" class="back cad-voltar">‹ Voltar</a>
      <header class="cad-hero">
        ${Y("cad-logo",64,64)}
        <h1>Criar sua conta</h1>
        <p>Leva menos de um minuto. Depois é só escolher a cabana e as datas.</p>
      </header>
      <form id="cad" class="cad-form" novalidate>
        ${Ya({},{comConta:!0})}
        <button class="btn lg block cad-enviar" disabled>Criar conta</button>
        <p class="cad-falta small muted center"></p>
      </form>
    </section>`;const e=v("#cad");Qa(e),e.addEventListener("submit",async a=>{a.preventDefault();const t=e.elements;await H(e.querySelector(".cad-enviar"),async()=>{if(!pa(t.telefone.value))throw new Error("Informe um celular válido com DDD.");const n={nome:t.nome.value.trim(),telefone:t.telefone.value,regiao:t.regiao.value.trim(),receber_email:t.receber_email.checked,receber_push:t.receber_push.checked},{data:o,error:s}=await b.auth.signUp({email:t.email.value.trim(),password:t.senha.value,options:{emailRedirectTo:wa(),data:{full_name:n.nome}}});if(s)throw new Error(/registered|already/i.test(s.message)?"Este e-mail já tem conta. Volte e toque em Entrar.":s.message);try{localStorage.setItem("cadastro-pendente",JSON.stringify(n))}catch{}o.session?(p.user=o.user,await ga(e,!0),localStorage.removeItem("cadastro-pendente"),C("Conta criada! Bem-vindo(a) 🎉","ok"),y("#/")):A().innerHTML=`<section class="cad"><header class="cad-hero">
          <div class="cad-emoji">📬</div>
          <h1>Confirme o seu e-mail</h1>
          <p>Enviamos um link para <strong>${d(t.email.value.trim())}</strong>. Abra o link para ativar a conta (confira também o spam).</p>
          <a class="btn lg" href="#/entrar">Voltar para entrar</a></header></section>`})})}function Qe(){if(!p.user)return y("#/entrar");if(p.perfil)return y("#/");let e={};try{e=JSON.parse(localStorage.getItem("cadastro-pendente")||"{}")}catch{}const a=p.user.user_metadata||{};e.nome||=a.full_name||a.name||"";const t=String(e.nome||"").split(" ")[0],n=Ca(p.user);A().innerHTML=`
    <section class="cad">
      <header class="cad-hero">
        <span class="avatar cad-avatar">${d(ua(e.nome||p.user.email))}</span>
        <h1>${t?`Olá, ${d(t)}! 👋`:"Bem-vindo(a)! 👋"}</h1>
        <p>Falta só um passo para concluir o seu cadastro.</p>
        <ol class="cad-passos" aria-label="Etapas do cadastro">
          <li class="ok"><span>✓</span>${n?"Conta Google":"Conta criada"}</li>
          <li class="agora"><span>2</span>Seus dados</li>
        </ol>
        <p class="cad-email small">${d(p.user.email||"")}</p>
      </header>
      <form id="comp" class="cad-form" novalidate>
        ${Ya(e)}
        <button class="btn lg block cad-enviar" disabled>Concluir cadastro</button>
        <p class="cad-falta small muted center"></p>
      </form>
      <p class="center"><button class="link small" id="sair">Entrar com outra conta</button></p>
    </section>`;const o=v("#comp");Qa(o),o.addEventListener("submit",async s=>{s.preventDefault(),await H(o.querySelector(".cad-enviar"),async()=>{await ga(o,!0);try{localStorage.removeItem("cadastro-pendente")}catch{}ra(),C("Cadastro concluído. Bem-vindo(a) 🎉","ok"),y(sessionStorage.getItem("depois-de-entrar")||"#/"),sessionStorage.removeItem("depois-de-entrar")})}),v("#sair").addEventListener("click",()=>b.auth.signOut().then(()=>y("#/entrar")))}function Je(){A().innerHTML=`
    <section class="pad narrow auth">
      <h1 class="title">Nova senha</h1>
      <form id="ns" class="stack">
        <label class="field"><span>Nova senha (mínimo 8 caracteres)</span><input name="senha" type="password" minlength="8" required autocomplete="new-password"></label>
        <button class="btn block">Salvar senha</button>
      </form>
    </section>`,v("#ns").addEventListener("submit",async e=>{e.preventDefault(),await H(e.target.querySelector("button"),async()=>{const{error:a}=await b.auth.updateUser({password:e.target.elements.senha.value});if(a)throw a;C("Senha alterada.","ok"),y("#/")})})}async function Ke(e){const a=await fetch(`${e}.html`),n=new DOMParser().parseFromString(await a.text(),"text/html").querySelector("main");n.querySelectorAll("script, iframe, object").forEach(o=>o.remove()),n.querySelectorAll('a[href="./"]').forEach(o=>o.closest("p")?.remove()),n.querySelectorAll('a[href$=".html"]').forEach(o=>o.setAttribute("href","#/"+o.getAttribute("href").replace(".html",""))),A().innerHTML=`<section class="pad narrow doc"><a href="#/menu" class="back">‹ Menu</a>${n.innerHTML}</section>`}async function Xe(e){const a=p.user?.id;if(p.user=e?.user??null,p.user?.id!==a){if(p.perfil=null,p.user||(ma(),te()),await ca().catch(()=>{}),V(),p.user&&p.perfil){ra(),Na(b).catch(()=>{});const t=sessionStorage.getItem("depois-de-entrar");if(t&&location.hash.startsWith("#/entrar"))return sessionStorage.removeItem("depois-de-entrar"),y(t)}if(p.user&&location.hash.startsWith("#/entrar"))return y("#/");X()}}async function Ze(){if("serviceWorker"in navigator){const a=!!navigator.serviceWorker.controller;let t=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{!a||t||(t=!0,location.reload())}),navigator.serviceWorker.register("sw.js").then(n=>n.update()).catch(()=>{})}window.addEventListener("beforeinstallprompt",a=>{a.preventDefault(),Z=a}),document.getElementById("theme-btn").addEventListener("click",()=>{const a=document.documentElement.getAttribute("data-theme")==="dark"||!document.documentElement.hasAttribute("data-theme")&&matchMedia("(prefers-color-scheme: dark)").matches;Ga(a?"claro":"escuro")});const[,{data:e}]=await Promise.all([xa().catch(()=>{}),b.auth.getSession()]);p.user=e.session?.user??null,p.user&&oe()?(V(),ca().then(()=>{V(),p.user&&!p.perfil&&X(),p.perfil&&ra()}).catch(()=>{})):(await ca().catch(()=>{}),V(),p.user&&p.perfil&&ra()),p.user&&Na(b).catch(()=>{}),b.auth.onAuthStateChange((a,t)=>{if(a==="PASSWORD_RECOVERY")return y("#/nova-senha");setTimeout(()=>Xe(t),0)}),window.addEventListener("hashchange",X),navigator.serviceWorker?.addEventListener("message",a=>{a.data?.type==="push"&&location.hash.startsWith("#/reservas")&&X(),a.data?.type==="push"&&sa()}),document.addEventListener("visibilitychange",()=>!document.hidden&&sa()),setInterval(()=>!document.hidden&&sa(),6e4),X(),setTimeout(at,1500)}function at(){la("vitrine",ta),!(!p.user||!p.perfil)&&(la("reservas",Fa),la("conversas",ve),fe())}Ze();export{E as ICON,Pe as escolherCabana,qe as fab,Fa as fetchReservas,oa as fotoPrincipal,va as fotosDaCabana,Oa as ilustracaoApp,ye as ilustracaoEscala,we as ilustracaoUrl,Y as logoApp,Ha as openLightbox,je as sendReceipt,Ga as setTheme,gt as statusBadge};
