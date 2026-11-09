import{sb as y,state as j,$ as v,$$ as ma,view as Va,go as ka,toast as E,fail as O,api as ta,busy as N,confirmDialog as G,promptDialog as Ua,loadConfig as Y,loadCabanas as aa,loadFotos as pa,publicUrl as Q,avatarUrl as Ga,applyBrand as Ba,screenCached as ua,screenUpdate as ia,screenForget as z,screenForgetPrefix as xa,marcaUrl as Qa,loadFeriados as Ja}from"./core.js";import{esc as p,fmtMoney as R,fmtDate as V,fmtDateTime as J,parseMoney as na,normalizeHex as qa,inkOn as Wa,instagramUrl as Za,csv as va,todayISO as I,addDays as B,STATUS as ra,ORIGENS as Ea,fmtPhone as W,initials as La,MESES as fa,daysBetween as la}from"./util.js";import{resizeForGallery as Ka,makeIconSet as Xa,extOf as Ca,resizeLogo as ba,analisarLogo as Ya,abrirLogo as ae}from"./images.js";import{PIX_TYPES as ee,normalizePixKey as oe}from"./pix.js";import{statusBadge as se,openLightbox as Sa,fab as Aa,ICON as te}from"./app.js";import{feriadoNacional as Ta,estadia as ie}from"./precos.js";import{renderConversasAdmin as ne,renderConversaAdmin as re}from"./admin-conversas.js";import{marcarNoMapa as le}from"./map.js";const ce=[["reservas","✅","Reservas: conferir e validar"],["conversas","💬","Conversas dos clientes"],["calendario","🗓️","Calendário e dias disponíveis"],["cabanas","🏡","Cabanas e fotos das cabanas"],["fotos","🖼️","Fotos do carrossel e da galeria"],["clientes","👥","Clientes"],["relatorios","📊","Relatórios"],["historico","📚","Histórico de hóspedes"],["ia","🤖","Informações do chat (IA)"],["pix","💠","Pix e conferência do comprovante"],["aparencia","🎨","Aparência: cores e ícone"],["novidades","📣","Enviar novidades"],["ajuda","❓","Ajuda: como tudo funciona"]];async function Ue(s,e=[]){const i=ce.find(([o])=>o===s);if(!i)return ka("#/menu");if(s==="conversas"&&e[0])return re(e[0]);Va().innerHTML=`
    <section class="admin">
      <header class="admin-head pad"><a href="#/menu" class="back">‹ Menu</a><h1 class="title">${i[1]} ${p(i[2])}</h1></header>
      <div class="pad" id="admin-body"><div class="loading">Carregando…</div></div>
    </section>`;const l=v("#admin-body"),a={reservas:fe,conversas:ne,calendario:za,cabanas:da,fotos:qe,clientes:Ee,relatorios:Le,historico:Ce,ia:Se,pix:Oa,aparencia:Pe,novidades:Fa,ajuda:Ne}[s];if(!a)return ka("#/admin");await a(l)}async function U(s,e,i,l){const a=ua(e);let o=!1;const t=()=>o=!0;s.addEventListener("input",t),a!==void 0&&l(a);let r;try{r=await i()}catch(d){if(a===void 0)throw d;return}ia(e,r),s.isConnected&&(a===void 0||!o&&JSON.stringify(r)!==JSON.stringify(a))&&(s.removeEventListener("input",t),l(r))}const ha=(s,e,i="text/csv;charset=utf-8")=>{const l=document.createElement("a");l.href=URL.createObjectURL(new Blob([e],{type:i})),l.download=s,l.click(),setTimeout(()=>URL.revokeObjectURL(l.href),2e3)},Pa=s=>s?`https://wa.me/${encodeURIComponent(s)}`:"",Ma=[["validar","🔎","Para conferir"],["proximas","🗓️","Próximas"],["aguardando_pagamento","⏳","Aguardando Pix"],["confirmada","✅","Confirmadas"],["todas","📋","Todas"],["cancelada","🚫","Canceladas"],["recusada","❌","Não confirmadas"],["expirada","⌛","Prazo encerrado"]],de=["dom.","seg.","ter.","qua.","qui.","sex.","sáb."],me=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Na=s=>{const e=new Date(s+"T12:00:00Z");return{dia:String(e.getUTCDate()).padStart(2,"0"),mes:me[e.getUTCMonth()],sem:de[e.getUTCDay()]}},pe='<svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1.2-1.1 2 .9c-.2 1.2-1.2 1.9-2.4 1.7-3-.6-5.5-3-6-6-.2-1.2.5-2.2 1.7-2.4l.9 2z"/></svg>';function ue(s){if(!["aguardando_pagamento","em_analise","confirmada"].includes(s.status))return"";const e=I();if(s.checkout<=e)return'<span class="ar-quando passado">Já saiu</span>';if(s.checkin<=e)return'<span class="ar-quando agora">🏡 Hospedado agora</span>';const i=la(e,s.checkin);return`<span class="ar-quando">${i===1?"Entra amanhã":`Entra em ${i} dias`}</span>`}function ve(s){if(s.status!=="aguardando_pagamento"||!s.expira_em)return"";const e=Math.round((Date.parse(s.expira_em)-Date.now())/6e4);return e<=0?'<p class="ar-aviso warn">⏳ O prazo do Pix acabou; a reserva vai expirar sozinha.</p>':`<p class="ar-aviso warn">⏳ Esperando o Pix do cliente · prazo de <b>${e<60?`${e} min`:e<1440?`${Math.floor(e/60)} h ${e%60?`${e%60} min`:""}`:`${Math.floor(e/1440)} dia(s)`}</b></p>`}async function fe(s){const e=j.cabanas||ua("vitrine")?.cabanas||await aa(),i=c=>e.find($=>$.id===c)?.nome||"—";let l=sessionStorage.getItem("adm-filtro")||"validar";Ma.some(([c])=>c===l)||(l="validar"),s.innerHTML=`
    <div class="ar-busca"><span aria-hidden="true">🔍</span><input id="f-busca" type="search" placeholder="Buscar por nome, código ou celular" autocomplete="off"><button type="button" id="limpar" aria-label="Limpar busca" hidden>✕</button></div>
    <div class="ar-filtros" role="tablist">${Ma.map(([c,$,x])=>`<button type="button" role="tab" data-f="${c}" class="${c===l?"on":""}">${$} ${x}<b class="ar-n" data-n="${c}"></b></button>`).join("")}</div>
    <div class="ar-bulk" id="bulk" hidden></div>
    <div id="lista" class="ar-lista"></div>
    ${Aa("nova","Nova reserva")}`;const a=v("#f-busca"),o=sessionStorage.getItem("adm-busca");o&&(sessionStorage.removeItem("adm-busca"),a.value=o,l="todas");const t=()=>{s.querySelectorAll("[data-f]").forEach(c=>c.classList.toggle("on",c.dataset.f===l)),s.querySelector("[data-f].on")?.scrollIntoView({block:"nearest",inline:"center"})};t(),v("#limpar").hidden=!a.value;const r=async()=>{const{data:c}=await y.from("reservas").select("status,validada,checkout").in("status",["aguardando_pagamento","em_analise","confirmada"]).limit(2e3);if(!c||!s.isConnected)return;const $=I(),x={validar:c.filter(q=>q.status==="em_analise"||q.status==="confirmada"&&!q.validada).length,proximas:c.filter(q=>q.checkout>=$).length,aguardando_pagamento:c.filter(q=>q.status==="aguardando_pagamento").length};s.querySelectorAll("[data-n]").forEach(q=>{const w=x[q.dataset.n];q.textContent=w||"",q.classList.toggle("alerta",q.dataset.n==="validar"&&w>0)})};let d=[];const n=c=>l==="validar"?c.status==="em_analise"||c.status==="confirmada"&&!c.validada:l==="proximas"?["aguardando_pagamento","em_analise","confirmada"].includes(c.status)&&c.checkout>=I():l==="todas"||c.status===l,u=c=>{const $=new Map(c.map(x=>[x.id,x]));d=d.map(x=>$.get(x.id)||x).filter(n),xa("adm-reservas:"),ia(`adm-reservas:${l}:${a.value.trim()}`,d),b(d),r()},f={validar:["🎉","Tudo conferido!","Nenhum comprovante esperando e nenhuma reserva para validar."],proximas:["🌿","Nenhuma hospedagem pela frente","As próximas reservas aparecem aqui."]},b=c=>{d=c;const $=v("#lista");if(!$)return;const x=c.filter(_=>_.status==="confirmada"&&!_.validada),q=v("#bulk");if(q.hidden=x.length<2,q.innerHTML=`<span><b>${x.length} confirmadas</b> esperando a sua validação</span><button type="button" class="btn sm" id="validar-todas">Validar todas</button>`,$.dataset.ids=JSON.stringify(x.map(_=>_.id)),!c.length){const[_,C,T]=a.value.trim()?["🔍","Nada encontrado",'Confira o nome, o código ou o celular, ou procure em "Todas".']:f[l]||["📭","Nenhuma reserva aqui","Escolha outro filtro acima."];$.innerHTML=`<div class="ar-vazio"><span>${_}</span><h3>${C}</h3><p class="muted small">${T}</p></div>`;return}let w="";$.innerHTML=c.map(_=>{const C=_.checkin.slice(0,7),T=C!==w?`<h3 class="ar-mes">${fa[Number(C.slice(5))-1]} de ${C.slice(0,4)}</h3>`:"";return w=C,T+m(_)}).join("")},g=async()=>{const c=v("#lista"),$=a.value.trim(),x=l,q=`adm-reservas:${x}:${$}`,w=ua(q);w?b(w):c.innerHTML='<div class="ar-esqueleto"><i></i><i></i></div>';let _=y.from("reservas").select("*").order("checkin",{ascending:x==="proximas"||x==="validar"}).limit(200);x==="validar"?_=_.or("status.eq.em_analise,and(status.eq.confirmada,validada.eq.false)"):x==="proximas"?_=_.in("status",["aguardando_pagamento","em_analise","confirmada"]).gte("checkout",I()):x!=="todas"&&(_=_.eq("status",x));const C=$.replace(/[,()%]/g,"");C&&(_=_.or(`nome_cliente.ilike.%${C}%,codigo.ilike.%${C}%,telefone_cliente.ilike.%${C.replace(/\D/g,"")||C}%`));const{data:T,error:D}=await _;if(D)return w?void 0:O(D);if(!c.isConnected||a.value.trim()!==$||l!==x)return ia(q,T);JSON.stringify(T)!==JSON.stringify(w)&&b(T),ia(q,T)},k=c=>c.resultado==="aprovado"?["ok","✅ Aprovado pela IA"]:c.resultado==="nao_e_comprovante"?["bad","❌ Não parece um comprovante"]:["warn","⚠️ A IA pediu para conferir"],m=c=>{const $=c.analise_ia,x=ra[c.status]||{label:c.status,tone:""},q=Na(c.checkin),w=Na(c.checkout),_=c.telefone_cliente,C=["aguardando_pagamento","em_analise"].includes(c.status),T=C&&c.status==="em_analise"?["confirmar","✅ Confirmar pagamento"]:c.status==="confirmada"&&!c.validada?["validar","☑️ Validar reserva"]:C?["confirmar","✅ Confirmar pagamento"]:null,D=[c.comprovante_path?["ver","Comprovante",""]:null,c.status==="em_analise"?["pedir_novo","Pedir outro",""]:null,C?["recusar","Recusar","danger"]:null,c.status==="confirmada"?["cancelar","Cancelar","danger"]:null].filter(Boolean),[S,P]=$?.verificacoes?k($):[];return`<article class="res-card adm-res t-${x.tone}" data-id="${c.id}">
      <div class="ar-head">
        <span class="ar-av">${p(La(c.nome_cliente))}</span>
        <div class="ar-tit"><h3>${p(c.nome_cliente)}</h3><span class="res-code" title="Feita em ${p(J(c.criado_em))}">#${p(c.codigo)} · ${c.origem==="chat"?"💬 chat":c.origem==="admin"?"👤 equipe":"📱 app"} · ${new Date(c.criado_em).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}</span></div>
        <span class="res-status ${x.tone}">${p(x.label)}</span>
      </div>
      <div class="ar-cab"><span>🏡 <b>${p(i(c.cabana_id))}</b></span>${ue(c)}</div>
      <div class="res-dates">
        <div class="rd"><small>Entrada</small><strong>${q.dia} ${q.mes}</strong><span>${q.sem}</span></div>
        <div class="rd-mid"><span>${c.diarias} ${c.diarias===1?"noite":"noites"}</span></div>
        <div class="rd"><small>Saída</small><strong>${w.dia} ${w.mes}</strong><span>${w.sem}</span></div>
      </div>
      <div class="res-info"><span>${te.people} ${c.hospedes} ${c.hospedes===1?"pessoa":"pessoas"}</span><strong>${R(c.valor_centavos)}</strong></div>
      ${_||c.email_cliente?`<div class="ar-contato">
        ${_?`<a class="ar-ct whats" href="${Pa(_)}" target="_blank" rel="noopener noreferrer">${pe}<span>${p(W(_))}</span></a>`:""}
        ${c.email_cliente?`<a class="ar-ct" href="mailto:${p(c.email_cliente)}">✉️<span>${p(c.email_cliente)}</span></a>`:""}
        ${c.regiao_cliente?`<span class="ar-ct sem">📍<span>${p(c.regiao_cliente)}</span></span>`:""}
      </div>`:""}
      ${ve(c)}
      ${c.status==="em_analise"?'<p class="ar-aviso info">🧾 O cliente enviou o comprovante. Confira no extrato do banco antes de confirmar.</p>':""}
      ${c.status==="confirmada"?c.validada?`<p class="ar-aviso ok">☑️ Validada em ${J(c.validada_em)}</p>`:'<p class="ar-aviso warn">👀 Confirmada, esperando a sua validação (confira o Pix no extrato).</p>':""}
      ${c.motivo?`<p class="res-motivo">💬 ${p(c.motivo)}</p>`:""}
      ${$?.verificacoes?`<details class="ar-ia ${S}"><summary><span>${P}</span><small>ver detalhes</small></summary>
        <ul>${$.verificacoes.map(A=>`<li class="${A.ok?"ok":"bad"}"><i>${A.ok?"✓":"✗"}</i><span><b>${p(A.regra)}</b><small>${p(A.detalhe)}</small></span></li>`).join("")}</ul>
        ${$.extraido?.pagador_nome?`<p class="small">Pagador: <b>${p($.extraido.pagador_nome)}</b>${$.extraido.destinatario_instituicao?` · ${p($.extraido.destinatario_instituicao)}`:""}</p>`:""}
        ${$.extraido?.observacoes?`<p class="small muted">Obs.: ${p($.extraido.observacoes)}</p>`:""}</details>`:""}
      ${T||D.length?`<div class="ar-acoes">
        ${T?`<button class="btn block" data-a="${T[0]}">${T[1]}</button>`:""}
        ${D.length?`<div class="ar-sec">${D.map(([A,L,M])=>`<button class="btn sm ghost ${M}" data-a="${A}">${L}</button>`).join("")}</div>`:""}
      </div>`:""}
    </article>`};s.querySelectorAll("[data-f]").forEach(c=>c.addEventListener("click",()=>{l!==c.dataset.f&&(l=c.dataset.f,sessionStorage.setItem("adm-filtro",l),t(),g())}));let h;a.addEventListener("input",()=>{v("#limpar").hidden=!a.value,clearTimeout(h),h=setTimeout(g,350)}),v("#limpar").addEventListener("click",()=>{a.value="",v("#limpar").hidden=!0,g(),a.focus()}),v("#nova").addEventListener("click",()=>be(e,()=>{xa("adm-reservas:"),g(),r()})),v("#bulk").addEventListener("click",async c=>{const $=c.target.closest("#validar-todas");if(!$)return;const x=JSON.parse(v("#lista").dataset.ids||"[]");!x.length||!await G(`Validar ${x.length} reserva(s)?`,"Confirme que conferiu os pagamentos no extrato do banco.","Validar todas")||await N($,async()=>{const q=[];for(const w of x)q.push((await ta("admin-reserva",{acao:"validar",reserva_id:w})).reserva);E("Reservas validadas.","ok"),u(q)})}),v("#lista").addEventListener("click",async c=>{const $=c.target.closest("[data-a]");if(!$)return;const x=$.closest(".adm-res").dataset.id,q=$.dataset.a;if(q==="ver"){await N($,async()=>{const{data:_}=await y.from("reservas").select("comprovante_path").eq("id",x).single(),{data:C,error:T}=await y.storage.from("comprovantes").createSignedUrl(_.comprovante_path,600);if(T)throw T;Sa([C.signedUrl])});return}let w;if(["recusar","cancelar","pedir_novo"].includes(q)){if(w=await Ua({recusar:"Recusar a reserva",cancelar:"Cancelar a reserva",pedir_novo:"Pedir outro comprovante"}[q],"Motivo (o cliente recebe esta mensagem)","","Enviar"),w===null)return}else if(q==="confirmar"&&!await G("Confirmar o pagamento?","O cliente recebe a confirmação por e-mail e notificação.","Confirmar"))return;await N($,async()=>{const{reserva:_}=await ta("admin-reserva",{acao:q,reserva_id:x,motivo:w});E({confirmar:"Pagamento confirmado. O cliente foi avisado.",validar:"Reserva validada.",recusar:"Reserva recusada.",cancelar:"Reserva cancelada.",pedir_novo:"Pedido enviado ao cliente."}[q]||"Pronto.","ok"),u([_])})}),g(),r()}function be(s,e){const i=s.filter(n=>n.ativa),l=document.createElement("dialog");l.className="dialog cab-form",l.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head"><button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button><h3>Nova reserva</h3><span></span></header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Hospedagem</h4>
        <div class="pills">${i.map((n,u)=>`<label class="pill"><input type="radio" name="cabana_id" value="${n.id}" ${u===0?"checked":""}><span>${p(n.nome)}</span></label>`).join("")}</div>
        <div class="datas-2">
          <label class="field"><span>Entrada</span><input type="date" name="checkin" required min="${I()}"></label>
          <label class="field"><span>Saída</span><input type="date" name="checkout" required min="${I()}"></label>
        </div>
        <div class="regra-linha"><span><b>Pessoas</b><small id="nr-cap"></small></span>${oa("hospedes",2,1,50,"")}</div>
      </section>
      <section class="cf-card">
        <h4><span class="cf-ico">💰</span> Valor</h4>
        <p class="nr-calc" id="nr-calc">Escolha as datas para ver o valor.</p>
        <label class="cf-preco"><span>Outro valor</span><small>Opcional: deixe em branco para usar o calculado</small>
          <div class="cf-money"><i>R$</i><input name="valor" inputmode="decimal" placeholder="Calculado"></div></label>
        <label class="cf-switch"><span><b>Pagamento já recebido</b><small>Ligado: já entra confirmada. Desligado: as datas ficam guardadas pelo prazo do Pix e depois são liberadas sozinhas.</small></span><input type="checkbox" name="confirmada" checked><i></i></label>
      </section>
      <section class="cf-card">
        <h4><span class="cf-ico">👤</span> Cliente</h4>
        <label class="field"><span>Nome</span><input name="nome" required minlength="2" maxlength="80" autocomplete="off"></label>
        <label class="field"><span>Celular</span><input name="telefone" inputmode="tel" placeholder="(61) 99999-9999"></label>
        <label class="field"><span>E-mail <small class="muted">(recebe a confirmação)</small></span><input name="email" type="email"></label>
        <label class="field"><span>Observações</span><input name="obs" maxlength="500" placeholder="Ex.: pagou em dinheiro"></label>
      </section>
    </div>
    <footer class="cf-foot"><button class="btn block">Criar reserva</button></footer>
  </form>`,document.body.appendChild(l);const a=v("form",l),o=a.elements;v("[data-close]",l).onclick=()=>l.close();let t=j.feriados||[];Ja().then(n=>{t=n,d()}).catch(()=>{});const r=()=>i.find(n=>n.id===o.cabana_id.value),d=()=>{const n=r(),u=v("#nr-calc",l);if(n&&(v("#nr-cap",l).textContent=`até ${n.capacidade} nesta cabana`),o.checkin.value&&(!o.checkout.value||o.checkout.value<=o.checkin.value)&&(o.checkout.value=B(o.checkin.value,1)),o.checkin.value&&(o.checkout.min=B(o.checkin.value,1)),!n||!o.checkin.value||!o.checkout.value)return;const{total:f,grupos:b}=ie(n,o.checkin.value,o.checkout.value,t),g=la(o.checkin.value,o.checkout.value),k=[b.normal.n&&`${b.normal.n} normal`,b.fim_semana.n&&`${b.fim_semana.n} sex a dom`,b.feriado.n&&`${b.feriado.n} feriado`].filter(Boolean);u.innerHTML=`<span>${g} ${g===1?"diária":"diárias"}${k.length>1||b.fim_semana.n||b.feriado.n?` <small>(${k.join(" · ")})</small>`:""}</span><b>${R(f)}</b>`};a.addEventListener("change",d),l.querySelectorAll(".stp [data-d]").forEach(n=>n.addEventListener("click",()=>{const u=n.closest(".stp"),f=v("input",u);f.value=Math.min(r()?.capacidade||50,Math.max(1,(Number(f.value)||0)+Number(n.dataset.d)))})),d(),a.addEventListener("submit",async n=>{n.preventDefault();const u=(b,g)=>{b?.focus(),E(g,"bad")};if(!o.cabana_id.value)return u(null,"Escolha a cabana.");if(!o.checkin.value||!o.checkout.value||o.checkout.value<=o.checkin.value)return u(o.checkin,"Confira as datas de entrada e saída.");if(o.nome.value.trim().length<2)return u(o.nome,"Escreva o nome do cliente.");const f=o.valor.value.trim()?na(o.valor.value):void 0;if(f===null)return u(o.valor,"Valor inválido.");await N(a.querySelector(".cf-foot .btn"),async()=>{await ta("admin-reserva",{acao:"criar",cabana_id:o.cabana_id.value,checkin:o.checkin.value,checkout:o.checkout.value,hospedes:Number(o.hospedes.value),nome:o.nome.value,telefone:o.telefone.value,email:o.email.value,valor_centavos:f,confirmada:o.confirmada.checked,motivo:o.obs.value}),E("Reserva criada.","ok"),l.close(),e()})}),l.addEventListener("close",()=>l.remove()),l.showModal()}const he=[["ocupacao","🗓️","Ocupação"],["periodos","🔒","Abrir e fechar"],["feriados","🎉","Feriados"],["regras","⚙️","Regras"]];let ga="ocupacao",$a=null;const ca=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],_a=s=>new Date(s+"T12:00:00Z").getUTCDay(),ea=s=>fa[Number(s.slice(5,7))-1].slice(0,3);function wa(s,e){const i=Number(s.slice(8)),l=Number(e.slice(8));return s===e?`${i} de ${ea(s)}.`:s.slice(0,7)===e.slice(0,7)?`${i} a ${l} de ${ea(e)}.`:`${i} de ${ea(s)}. a ${l} de ${ea(e)}.`}const oa=(s,e,i,l,a)=>`<div class="stp" data-min="${i}" data-max="${l}">
  <button type="button" data-d="-1" aria-label="Menos">−</button>
  <input type="number" name="${s}" min="${i}" max="${l}" value="${e}" inputmode="numeric">
  <button type="button" data-d="1" aria-label="Mais">+</button><small>${a}</small></div>`;async function za(s){await U(s,"adm-calendario",async()=>{const[e,i,{data:l,error:a},o]=await Promise.all([Y(!0),aa(!0),y.from("calendario").select("*").gte("fim",I()).order("inicio"),y.from("feriados").select("data,nome").gte("data",I()).order("data")]);if(a)throw a;return{cfg:e,cabs:i,periodos:l,feriados:o.error?null:o.data}},e=>{s.innerHTML=`
      <div class="cal-abas" role="tablist">${he.map(([a,o,t])=>`<button type="button" role="tab" data-aba="${a}" class="${a===ga?"on":""}"><span>${o}</span>${t}</button>`).join("")}</div>
      <div id="cal-pane"></div>`;const i=v("#cal-pane",s),l=a=>{ga=a,s.querySelectorAll("[data-aba]").forEach(o=>o.classList.toggle("on",o.dataset.aba===a)),{ocupacao:ge,periodos:_e,feriados:we,regras:ye}[a](i,e,()=>za(s))};s.querySelectorAll("[data-aba]").forEach(a=>a.addEventListener("click",()=>l(a.dataset.aba))),l(ga)})}const Z=s=>{z("adm-calendario"),s()};function ge(s,{cabs:e,feriados:i},l){const a=e.filter(o=>o.ativa);if(!a.length){s.innerHTML='<div class="card center"><p class="muted">Cadastre uma cabana em <a href="#/admin/cabanas">Cabanas</a> para ver a ocupação.</p></div>';return}s.innerHTML='<div id="mapa"><div class="loading">Carregando…</div></div>',Ia(v("#mapa",s),a,i||[],$a||I().slice(0,7),l)}async function Ia(s,e,i,l,a){$a=l;const[o,t]=l.split("-").map(Number),r=`${l}-01`,d=new Date(Date.UTC(o,t,0)).getUTCDate(),n=`${l}-${String(d).padStart(2,"0")}`,u=I(),[{data:f},b]=await Promise.all([y.from("reservas").select("id,cabana_id,checkin,checkout,status,nome_cliente,codigo,hospedes").in("status",["aguardando_pagamento","em_analise","confirmada"]).lte("checkin",n).gt("checkout",r),Promise.all(e.map(S=>y.rpc("disponibilidade",{p_cabana:S.id,p_de:r,p_ate:n}).then(P=>P.data||[])))]);if(!s.isConnected||$a!==l)return;const g=Array.from({length:d},(S,P)=>`${l}-${String(P+1).padStart(2,"0")}`),k=e.map((S,P)=>g.map(A=>{const L=(f||[]).find(M=>M.cabana_id===S.id&&A>=M.checkin&&A<M.checkout);return{d:A,r:L,sit:L?L.status:b[P].find(M=>M.dia===A)?.situacao||"passado"}})),m=k.flat(),h=m.filter(S=>S.r).length,c=m.filter(S=>S.sit==="livre").length,$=m.filter(S=>S.sit==="fechado").length,x=h+c,q=x?Math.round(h/x*100):0,w=new Date(Date.UTC(o,t-2,1)).toISOString().slice(0,7),_=new Date(Date.UTC(o,t,1)).toISOString().slice(0,7),C=S=>$e(S,i);s.innerHTML=`
    <div class="occ-head">
      <button type="button" class="icon-btn" data-m="${w}" aria-label="Mês anterior">‹</button>
      <div class="occ-mes"><strong>${fa[t-1]} de ${o}</strong>${l!==u.slice(0,7)?`<button type="button" class="link-btn" data-m="${u.slice(0,7)}">voltar para hoje</button>`:""}</div>
      <button type="button" class="icon-btn" data-m="${_}" aria-label="Próximo mês">›</button>
    </div>
    <div class="occ-kpis">
      <div class="occ-kpi destaque"><b>${q}%</b><small>ocupação</small><i style="--p:${q}%"></i></div>
      <div class="occ-kpi"><b>${h}</b><small>noites reservadas</small></div>
      <div class="occ-kpi"><b>${c}</b><small>noites livres</small></div>
      <div class="occ-kpi"><b>${$}</b><small>fechadas</small></div>
    </div>
    <div class="occ-card">
      <div class="occ-wrap"><table class="occ">
        <thead><tr><th class="occ-nome"></th>${g.map(S=>{const P=_a(S);return`<th class="${P===0||P===6?"fds":""} ${S===u?"hoje":""} ${C(S)?"fer":""}" title="${p(C(S)||"")}"><small>${ca[P][0]}</small>${Number(S.slice(8))}</th>`}).join("")}</tr></thead>
        <tbody>${e.map((S,P)=>`<tr><th class="occ-nome">${p(S.nome)}</th>${k[P].map((A,L)=>{const M=A.r&&(A.d===A.r.checkin||L===0),H=A.r&&(B(A.d,1)===A.r.checkout||L===d-1);return`<td><button type="button" class="occ-c occ-${A.sit} ${M?"ini":""} ${H?"fim":""} ${A.d===u?"hoje":""}" data-c="${P}" data-i="${L}" aria-label="${p(S.nome)} ${V(A.d)}"></button></td>`}).join("")}</tr>`).join("")}</tbody></table></div>
      <div class="occ-legenda small">
        <span><i class="occ-confirmada"></i>Confirmada</span><span><i class="occ-aguardando_pagamento"></i>Aguardando Pix</span>
        <span><i class="occ-em_analise"></i>Em análise</span><span><i class="occ-livre"></i>Livre</span><span><i class="occ-fechado"></i>Fechado</span>
      </div>
    </div>
    <div id="occ-info" class="occ-info"><p class="small muted">👆 Toque num dia para ver a reserva ou para abrir e fechar a data.</p></div>`,s.querySelectorAll("[data-m]").forEach(S=>S.addEventListener("click",()=>{s.querySelector(".occ-card")?.classList.add("carregando"),Ia(s,e,i,S.dataset.m,a)}));const T=v("#occ-info",s);s.querySelector(".occ").addEventListener("click",S=>{const P=S.target.closest(".occ-c");if(!P)return;s.querySelectorAll(".occ-c.sel").forEach(H=>H.classList.remove("sel")),P.classList.add("sel");const A=e[Number(P.dataset.c)],L=k[Number(P.dataset.c)][Number(P.dataset.i)],M=`<div class="occ-info-tit"><b>${p(A.nome)}</b><span>${ca[_a(L.d)]}, ${V(L.d)}${C(L.d)?` · 🎉 ${p(C(L.d))}`:""}</span></div>`;if(L.r)T.innerHTML=`${M}<div class="occ-info-res">${se(L.r.status)}
        <p><b>${p(L.r.nome_cliente)}</b> · ${L.r.hospedes} pessoa(s)</p>
        <p class="small muted">Reserva ${p(L.r.codigo)} · ${wa(L.r.checkin,B(L.r.checkout,-1))} (saída ${V(L.r.checkout)})</p>
        <a class="btn sm ghost" href="#/admin/reservas">Ver em Reservas ›</a></div>`;else if(L.sit==="livre"||L.sit==="fechado"){const H=L.sit==="livre";T.innerHTML=`${M}<p class="occ-info-sit ${L.sit}">${H?"🟢 Livre para reservar":"⚪ Fechado para reservas"}</p>
        <button type="button" class="btn sm ${H?"ghost danger":""}" id="occ-acao">${H?"🔒 Fechar este dia":"🔓 Abrir este dia"}</button>`,v("#occ-acao",T).addEventListener("click",sa=>N(sa.currentTarget,async()=>{const{error:X}=await y.from("calendario").insert({cabana_id:A.id,tipo:H?"fechado":"aberto",inicio:L.d,fim:L.d,motivo:null});if(X)throw X;E(H?"Dia fechado.":"Dia aberto.","ok"),Z(a)}))}else T.innerHTML=`${M}<p class="small muted">${L.d<u?"Data que já passou.":"Fora do prazo de reservas (veja em Regras)."}</p>`;T.scrollIntoView({block:"nearest",behavior:"smooth"})});const D=s.querySelector("thead th.hoje");D&&(s.querySelector(".occ-wrap").scrollLeft=Math.max(0,D.offsetLeft-140))}const $e=(s,e)=>e.find(i=>i.data===s)?.nome||Ta(s);function _e(s,{cabs:e,periodos:i},l){const a=n=>n?e.find(u=>u.id===n)?.nome||"—":"Todas as cabanas",o=I();s.innerHTML=`
    <form id="periodo" class="cal-card stack">
      <h3>Novo período</h3>
      <div class="tipo-escolha" role="radiogroup">
        <label><input type="radio" name="tipo" value="fechado" checked><span><b>🔒 Fechar</b><small>Ninguém reserva nesses dias</small></span></label>
        <label><input type="radio" name="tipo" value="aberto"><span><b>🔓 Abrir</b><small>Libera dias que estavam fechados</small></span></label>
      </div>
      <div class="field"><span>Cabana</span>
        <div class="pills">${[["","Todas"],...e.map(n=>[n.id,n.nome])].map(([n,u],f)=>`<label class="pill"><input type="radio" name="cab" value="${n}" ${f===0?"checked":""}><span>${p(u)}</span></label>`).join("")}</div></div>
      <div class="datas-2">
        <label class="field"><span>De</span><input type="date" name="ini" required min="${o}"></label>
        <label class="field"><span>Até (inclusive)</span><input type="date" name="fim" required min="${o}"></label>
      </div>
      <p class="per-resumo small" id="per-resumo"></p>
      <label class="field"><span>Motivo <small class="muted">(opcional)</small></span><input name="motivo" maxlength="120" placeholder="Ex.: manutenção"></label>
      <div class="pills sm">${["Manutenção","Evento particular","Férias","Reforma"].map(n=>`<button type="button" class="pill-btn" data-mot="${n}">${n}</button>`).join("")}</div>
      <button class="btn block">Salvar período</button>
    </form>
    <h3 class="cal-sub">Programados <span class="seg-n">${(i||[]).length}</span></h3>
    <div class="per-lista">${(i||[]).map(n=>{const u=la(n.inicio,n.fim)+1;return`<article class="per-item ${n.tipo}" data-id="${n.id}">
        <span class="per-ico">${n.tipo==="aberto"?"🔓":"🔒"}</span>
        <div class="grow"><b>${wa(n.inicio,n.fim)}</b> <span class="small muted">· ${u} dia${u>1?"s":""}</span>
          <p class="small muted">${n.tipo==="aberto"?"Aberto":"Fechado"} · ${p(a(n.cabana_id))}${n.motivo?" · "+p(n.motivo):""}</p></div>
        <button type="button" class="icon-btn danger" data-del aria-label="Remover período" title="Remover">🗑️</button></article>`}).join("")||'<div class="cal-vazio"><span>📅</span><p class="muted small">Nenhum período programado. Todos os dias seguem as Regras.</p></div>'}</div>`;const t=v("#periodo",s),r=t.elements,d=()=>{const n=r.ini.value,u=r.fim.value,f=v("#per-resumo",s);if(n&&(!u||u<n)&&(r.fim.value=n),!r.ini.value||!r.fim.value)return f.textContent="";const b=la(r.ini.value,r.fim.value)+1,g=r.tipo.value==="fechado"?"Fecha":"Abre",k=r.cab.value?e.find(m=>m.id===r.cab.value)?.nome:"todas as cabanas";f.innerHTML=`${g} <b>${wa(r.ini.value,r.fim.value)}</b> (${b} dia${b>1?"s":""}) para <b>${p(k)}</b>.`};t.addEventListener("change",d),s.querySelectorAll("[data-mot]").forEach(n=>n.addEventListener("click",()=>{r.motivo.value=n.dataset.mot})),t.addEventListener("submit",async n=>{if(n.preventDefault(),r.fim.value<r.ini.value)return E("A data final precisa ser depois da inicial.","bad");await N(t.querySelector(".btn.block"),async()=>{const{error:u}=await y.from("calendario").insert({cabana_id:r.cab.value||null,tipo:r.tipo.value,inicio:r.ini.value,fim:r.fim.value,motivo:r.motivo.value.trim()||null});if(u)throw u;E("Período salvo.","ok"),Z(l)})}),s.querySelectorAll("[data-del]").forEach(n=>n.addEventListener("click",async()=>{await G("Remover o período?","Os dias voltam a seguir as Regras do calendário.","Remover",!0)&&await N(n,async()=>{const{error:u}=await y.from("calendario").delete().eq("id",n.closest("[data-id]").dataset.id);if(u)throw u;E("Período removido.","ok"),Z(l)})}))}function we(s,{feriados:e},i){const l=[];for(let o=I(),t=0;t<366;t++,o=B(o,1)){const r=Ta(o);r&&l.push({data:o,nome:r})}const a=(o,t)=>`<div class="fer-item" ${t?`data-fer="${o.data}"`:""}>
    <span class="fer-data"><b>${Number(o.data.slice(8))}</b><small>${ea(o.data)}</small></span>
    <span class="grow"><b>${p(o.nome)}</b><small class="muted">${ca[_a(o.data)]} · ${o.data.slice(0,4)}</small></span>
    ${t?'<button type="button" class="icon-btn danger" data-del-fer aria-label="Remover feriado" title="Remover">🗑️</button>':""}</div>`;s.innerHTML=`
    <div class="cal-card">
      <p class="small muted">Nos feriados vale o <b>valor de feriado</b> de cada cabana (em <a href="#/admin/cabanas">Cabanas</a> › Editar). Os nacionais entram sozinhos; cadastre aqui os da cidade.</p>
      ${e===null?'<p class="warn small">Rode o arquivo supabase/007_precos_fim_semana.sql no Supabase para cadastrar feriados.</p>':`
      <form id="feriado" class="fer-form">
        <label class="field"><span>Data</span><input type="date" name="data" required min="${I()}"></label>
        <label class="field grow"><span>Nome</span><input name="nome" required minlength="2" maxlength="60" placeholder="Ex.: Aniversário da cidade"></label>
        <button class="btn">Adicionar</button>
      </form>`}
    </div>
    ${e===null?"":`<h3 class="cal-sub">Da cidade <span class="seg-n">${e.length}</span></h3>
    <div class="fer-lista">${e.map(o=>a(o,!0)).join("")||'<div class="cal-vazio"><span>🎉</span><p class="muted small">Nenhum feriado da cidade cadastrado.</p></div>'}</div>`}
    <details class="fer-nac"><summary>🇧🇷 Nacionais, entram sozinhos <span class="seg-n">${l.length}</span></summary>
      <div class="fer-lista nac">${l.map(o=>a(o,!1)).join("")}</div></details>`,v("#feriado",s)?.addEventListener("submit",async o=>{o.preventDefault();const t=o.currentTarget.elements;await N(o.currentTarget.querySelector("button"),async()=>{const{error:r}=await y.from("feriados").insert({data:t.data.value,nome:t.nome.value.trim()});if(r)throw new Error(/duplicate|unique/i.test(r.message)?"Essa data já está cadastrada.":r.message);j.feriados=null,E("Feriado adicionado.","ok"),Z(i)})}),s.querySelectorAll("[data-del-fer]").forEach(o=>o.addEventListener("click",async()=>{await G("Remover o feriado?","Essa data volta a ser cobrada como um dia comum.","Remover",!0)&&await N(o,async()=>{const{error:t}=await y.from("feriados").delete().eq("data",o.closest("[data-fer]").dataset.fer);if(t)throw t;j.feriados=null,Z(i)})}))}function ye(s,{cfg:e},i){s.innerHTML=`
    <form id="regras" class="stack">
      <section class="cal-card stack">
        <h3>Como o calendário funciona</h3>
        <div class="tipo-escolha col" role="radiogroup">
          <label><input type="radio" name="modo" value="aberto" ${e.modo_calendario!=="fechado"?"checked":""}><span><b>✅ Sempre aberto</b><small>Todos os dias da semana marcados abaixo ficam livres. Você fecha só as exceções em "Abrir e fechar".</small></span></label>
          <label><input type="radio" name="modo" value="fechado" ${e.modo_calendario==="fechado"?"checked":""}><span><b>🔐 Só quando eu abrir</b><small>Tudo fica fechado; só os períodos que você abrir podem ser reservados.</small></span></label>
        </div>
        <div class="field" id="dows"><span>Dias da semana em que a diária pode começar</span>
          <div class="dow-pills">${ca.map((t,r)=>`<label><input type="checkbox" name="dow" value="${r}" ${e.dias_semana.includes(r)?"checked":""}><span>${t}</span></label>`).join("")}</div></div>
      </section>
      <section class="cal-card stack">
        <h3>Estadia</h3>
        <div class="regra-linha"><span><b>Mínimo</b><small>de diárias por reserva</small></span>${oa("min",e.min_diarias,1,30,"")}</div>
        <div class="regra-linha"><span><b>Máximo</b><small>de diárias por reserva</small></span>${oa("max",e.max_diarias,1,90,"")}</div>
        <div class="regra-linha"><span><b>Antecedência</b><small>dias à frente que podem ser reservados</small></span>${oa("ante",e.antecedencia_max_dias,7,730,"")}</div>
      </section>
      <section class="cal-card stack">
        <h3>Horários</h3>
        <div class="datas-2">
          <label class="field"><span>🔑 Entrada a partir de</span><input type="time" name="cin" value="${p(e.checkin_hora)}"></label>
          <label class="field"><span>👋 Saída até</span><input type="time" name="cout" value="${p(e.checkout_hora)}"></label>
        </div>
      </section>
      <button class="btn block">Salvar regras</button>
    </form>`;const l=v("#regras",s),a=l.elements,o=()=>v("#dows",s).classList.toggle("apagado",a.modo.value==="fechado");l.addEventListener("change",o),o(),s.querySelectorAll(".stp [data-d]").forEach(t=>t.addEventListener("click",()=>{const r=t.closest(".stp"),d=v("input",r);d.value=Math.min(Number(r.dataset.max),Math.max(Number(r.dataset.min),(Number(d.value)||0)+Number(t.dataset.d)))})),l.addEventListener("submit",async t=>{t.preventDefault();const r=Number(a.min.value),d=Number(a.max.value),n=Number(a.ante.value);if(!(r>=1&&r<=30)||!(d>=1&&d<=90)||!(n>=7&&n<=730))return E("Confira os números da estadia.","bad");if(d<r)return E("O máximo precisa ser maior ou igual ao mínimo.","bad");const u=ma('input[name="dow"]:checked',l).map(f=>Number(f.value));if(a.modo.value==="aberto"&&!u.length)return E("Marque pelo menos um dia da semana.","bad");await N(l.querySelector(".btn.block"),async()=>{const{error:f}=await y.from("configuracoes").update({modo_calendario:a.modo.value,dias_semana:u,min_diarias:r,max_diarias:d,antecedencia_max_dias:n,checkin_hora:a.cin.value,checkout_hora:a.cout.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(f)throw f;await Y(!0),E("Regras salvas.","ok"),Z(i)})})}async function ja(s,e,i=()=>{}){const l=[];let a=0;for(const o of s){i(`Reduzindo e enviando ${++a} de ${s.length}…`);const{big:t,mini:r}=await Ka(o),d=crypto.randomUUID(),n=`fotos/${d}.${Ca(t)}`,u=`fotos/${d}-mini.${Ca(r)}`,f=await y.storage.from("fotos").upload(n,t,{contentType:t.type});if(f.error)throw f.error;const b=await y.storage.from("fotos").upload(u,r,{contentType:r.type});if(b.error)throw b.error;const{data:g,error:k}=await y.from("fotos").insert({path:n,mini_path:u,...e}).select("*").single();if(k)throw k;l.push(g)}return i(""),j.fotos=null,z("adm-cabanas"),z("adm-fotos"),l}async function K(s){const{error:e}=await y.rpc("definir_foto_principal",{p_foto:s});if(e)throw/definir_foto_principal|function/i.test(e.message)?new Error("Rode o arquivo supabase/003_foto_principal.sql no Supabase para usar a foto principal."):e;j.fotos=null,z("adm-cabanas"),z("adm-fotos")}async function da(s){await U(s,"adm-cabanas",async()=>{const[e,i]=await Promise.all([aa(!0),pa(!0)]);return{cabs:e,todas:i}},({cabs:e,todas:i})=>{const l=a=>{const o=i.filter(t=>t.cabana_id===a.id).sort((t,r)=>(r.principal===!0)-(t.principal===!0)||t.ordem-r.ordem)[0];return o?`<img src="${p(Q("fotos",o.mini_path))}" alt="">`:'<span class="cab-sem-foto">Sem foto</span>'};s.innerHTML=`
    ${Aa("add","Nova cabana")}
    <div class="list-cards cab-lista">${e.map(a=>`<article class="card cab-adm" data-id="${a.id}">
      <div class="cab-adm-capa">${l(a)}</div>
      <div class="grow">
        <div class="row between"><h3>${p(a.nome)}</h3>${a.ativa?'<span class="badge ok">Ativa</span>':'<span class="badge muted">Desativada</span>'}</div>
        <p class="small">Até ${a.capacidade} pessoas · ${R(a.preco_diaria_centavos)} a diária</p>
        ${[a.preco_fim_semana_centavos!=null?`Sex a dom ${R(a.preco_fim_semana_centavos)}`:"",a.preco_feriado_centavos!=null?`Feriado ${R(a.preco_feriado_centavos)}`:""].filter(Boolean).map(o=>`<span class="badge">${o}</span>`).join(" ")}
        <p class="small muted">📷 ${i.filter(o=>o.cabana_id===a.id).length} foto(s)</p>
        <button class="btn sm ghost" data-edit>Editar dados e fotos</button>
      </div></article>`).join("")||'<p class="muted">Toque no + para cadastrar a primeira cabana.</p>'}</div>`,v("#add").addEventListener("click",()=>ya(null,s)),s.querySelectorAll("[data-edit]").forEach(a=>a.addEventListener("click",()=>ya(e.find(o=>o.id===a.closest("[data-id]").dataset.id),s)))})}function ya(s,e){const i=document.createElement("dialog");i.className="dialog cab-form";const l=f=>f==null?"":(f/100).toFixed(2).replace(".",","),a=s?.capacidade??2,o=s?.descricao||"";i.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head">
      <button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button>
      <h3>${s?"Editar cabana":"Nova cabana"}</h3>
      <span></span>
    </header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Sobre a cabana</h4>
        <label class="field"><span>Nome</span><input name="nome" required minlength="2" maxlength="60" value="${p(s?.nome)}" placeholder="Ex.: Cabana do Lago" autocomplete="off"></label>
        <label class="field"><span>Descrição</span><textarea name="descricao" rows="4" maxlength="2000" placeholder="O que tem, camas, vista, comodidades…">${p(o)}</textarea>
          <small class="cf-count"><b>${o.length}</b>/2000</small></label>
        <div class="field"><span>Capacidade</span>
          <div class="cf-stepper">
            <button type="button" data-step="-1" aria-label="Menos uma pessoa">−</button>
            <output><b>${a}</b> ${a===1?"pessoa":"pessoas"}</output>
            <button type="button" data-step="1" aria-label="Mais uma pessoa">+</button>
            <input type="hidden" name="capacidade" value="${a}">
          </div></div>
      </section>

      <section class="cf-card">
        <h4><span class="cf-ico">💰</span> Valores da diária</h4>
        <p class="small muted">Vale o valor do dia em que cada diária começa. Deixe em branco para cobrar o valor normal.</p>
        <div class="cf-precos">
          <label class="cf-preco"><span>Segunda a quinta</span><small>Valor normal</small>
            <div class="cf-money"><i>R$</i><input name="preco" required inputmode="decimal" placeholder="0,00" value="${l(s?.preco_diaria_centavos)}"></div></label>
          <label class="cf-preco"><span>Sexta a domingo</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fds" inputmode="decimal" placeholder="Igual ao normal" value="${l(s?.preco_fim_semana_centavos)}"></div></label>
          <label class="cf-preco"><span>Feriados</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fer" inputmode="decimal" placeholder="Igual a sex a dom" value="${l(s?.preco_feriado_centavos)}"></div></label>
        </div>
        <p class="cf-sim small" id="cf-sim"></p>
        <p class="small muted">Feriados nacionais entram sozinhos (inclusive Carnaval e Corpus Christi). Os da cidade você cadastra em <a href="#/admin/calendario">Calendário</a>. Um feriado usa o valor de feriado; em branco, o de sexta a domingo.</p>
      </section>

      <section class="cf-card">
        <h4><span class="cf-ico">👁️</span> Exibição</h4>
        <label class="cf-switch"><span><b>Ativa</b><small>Aparece para os clientes e pode ser reservada</small></span>
          <input type="checkbox" name="ativa" ${s?.ativa!==!1?"checked":""}><i></i></label>
        <label class="field cf-ordem"><span>Posição na lista</span><input type="number" name="ordem" value="${s?.ordem??0}"><small class="muted">As de número menor aparecem primeiro.</small></label>
      </section>

      ${s?`<section class="cf-card cab-fotos">
        <h4><span class="cf-ico">📷</span> Fotos da cabana</h4>
        <p class="small muted">A foto com ⭐ é a <strong>principal</strong>: aparece no carrossel do início e como capa da cabana. As outras ficam na página da cabana.</p>
        <div class="cab-fotos-grid" id="cab-fotos"><div class="loading">Carregando…</div></div>
        <label class="btn ghost sm">📷 Adicionar fotos<input type="file" accept="image/*" multiple hidden id="cab-up"></label>
        <p class="small muted" id="cab-prog"></p>
      </section>
      <button type="button" class="cf-del" data-del>🗑️ Excluir cabana</button>`:'<p class="small muted center">Depois de salvar, você já adiciona as fotos da cabana.</p>'}
    </div>
    <footer class="cf-foot"><button class="btn block">${s?"Salvar alterações":"Salvar e adicionar fotos"}</button></footer>
  </form>`,document.body.appendChild(i);const t=v("form",i),r=t.elements;v("[data-close]",i).onclick=()=>i.close(),s&&ke(s,i),r.descricao.addEventListener("input",()=>v(".cf-count b",i).textContent=r.descricao.value.length);const d=v(".cf-stepper output",i);i.querySelectorAll("[data-step]").forEach(f=>f.addEventListener("click",()=>{const b=Math.min(50,Math.max(1,Number(r.capacidade.value)+Number(f.dataset.step)));r.capacidade.value=b,d.innerHTML=`<b>${b}</b> ${b===1?"pessoa":"pessoas"}`}));const n=f=>f.trim()?na(f)??void 0:null,u=()=>{const f=na(r.preco.value),b=v("#cf-sim",i);if(f===null)return b.textContent="";const g=n(r.preco_fds.value),k=n(r.preco_fer.value),m=g??f;b.innerHTML=`<b>Exemplo:</b> quinta a sábado (2 diárias) = ${R(f)} + ${R(m)} = <b>${R(f+m)}</b>`+(k!=null?` · uma diária de feriado = <b>${R(k)}</b>`:"")};["preco","preco_fds","preco_fer"].forEach(f=>r[f].addEventListener("input",u)),u(),t.addEventListener("submit",async f=>{f.preventDefault();const b=(c,$)=>{c.focus(),E($,"bad")};if(r.nome.value.trim().length<2)return b(r.nome,"Escreva o nome da cabana.");const g=na(r.preco.value);if(g===null)return b(r.preco,"Valor da diária inválido.");const k=n(r.preco_fds.value);if(k===void 0)return b(r.preco_fds,"Valor de sexta a domingo inválido.");const m=n(r.preco_fer.value);if(m===void 0)return b(r.preco_fer,"Valor de feriado inválido.");const h={nome:r.nome.value.trim(),descricao:r.descricao.value.trim()||null,capacidade:Number(r.capacidade.value),preco_diaria_centavos:g,ordem:Number(r.ordem.value)||0,ativa:r.ativa.checked};(k!==null||s?.preco_fim_semana_centavos!=null)&&(h.preco_fim_semana_centavos=k),(m!==null||s?.preco_feriado_centavos!=null)&&(h.preco_feriado_centavos=m),await N(t.querySelector(".cf-foot .btn"),async()=>{const{data:c,error:$}=s?await y.from("cabanas").update(h).eq("id",s.id).select("*").single():await y.from("cabanas").insert(h).select("*").single();if($)throw/preco_fim_semana|preco_feriado/.test($.message)?new Error("Rode o arquivo supabase/007_precos_fim_semana.sql no Supabase para usar os valores de fim de semana e feriado."):$;j.cabanas=null,z("vitrine"),i.close(),z("adm-cabanas"),da(e),s?E("Cabana salva.","ok"):(E("Cabana criada! Agora adicione as fotos.","ok"),ya(c,e))})}),v("[data-del]",i)?.addEventListener("click",async()=>{if(!await G("Excluir a cabana?","Cabanas com reservas não podem ser excluídas: nesse caso, desative.","Excluir",!0))return;const{error:f}=await y.from("cabanas").delete().eq("id",s.id);if(f)return E(/foreign|violates/i.test(f.message)?'Esta cabana tem reservas. Desligue "Ativa" em vez de excluir.':f.message,"bad");i.close(),z("adm-cabanas"),da(e)}),i.addEventListener("close",()=>{i.remove(),s&&da(e)}),i.showModal()}async function ke(s,e){const i=v("#cab-fotos",e),l=async()=>{const o=(await pa(!0)).filter(t=>t.cabana_id===s.id).sort((t,r)=>(r.principal===!0)-(t.principal===!0)||t.ordem-r.ordem);return i.innerHTML=o.length?o.map(t=>`<div class="cab-foto ${t.principal?"principal":""}" data-id="${t.id}">
          <img src="${p(Q("fotos",t.mini_path))}" alt="">
          <button type="button" class="cf-star" data-star title="${t.principal?"Foto principal":"Tornar principal"}" aria-label="Tornar principal">${t.principal?"⭐":"☆"}</button>
          <button type="button" class="cf-del" data-del-foto title="Apagar" aria-label="Apagar foto">✕</button>
        </div>`).join(""):'<p class="small muted">Nenhuma foto ainda.</p>',o};let a=await l();i.addEventListener("click",async o=>{const t=o.target.closest(".cab-foto");if(!t)return;const r=a.find(d=>d.id===t.dataset.id);if(o.target.closest("[data-star]")&&!r.principal)try{await K(r.id),E("Foto principal escolhida.","ok"),a=await l()}catch(d){O(d)}if(o.target.closest("[data-del-foto]")){if(!await G("Apagar esta foto?","","Apagar",!0))return;const{error:d}=await y.from("fotos").delete().eq("id",r.id);if(d)return O(d);await y.storage.from("fotos").remove([r.path,r.mini_path]),j.fotos=null,z("adm-cabanas"),z("adm-fotos"),a=await l(),r.principal&&a[0]&&await K(a[0].id).catch(()=>{}),a=await l()}}),v("#cab-up",e).addEventListener("change",async o=>{const t=[...o.target.files];if(o.target.value="",!t.length)return;const r=o.target.closest("label");r.classList.add("busy");try{const d=!a.some(u=>u.principal),n=await ja(t,{cabana_id:s.id,na_galeria:!0,no_carrossel:!1,ordem:a.length},u=>v("#cab-prog",e).textContent=u);d&&n[0]&&await K(n[0].id).catch(()=>{}),E(`${n.length} foto(s) adicionada(s).`,"ok"),a=await l()}catch(d){O(d)}finally{r.classList.remove("busy")}})}let F="todas";const xe=(s,e)=>e.filter(i=>i.cabana_id===s.id).sort((i,l)=>(l.principal===!0)-(i.principal===!0)||i.ordem-l.ordem)[0];async function qe(s){let e=[],i=[];const l=()=>{j.fotos=null,z("adm-cabanas"),z("adm-fotos"),z("vitrine")},a=d=>d?i.find(n=>n.id===d)?.nome||"Cabana":"Geral",o=()=>{const n=[...i.filter(m=>m.ativa).map(m=>xe(m,e)).filter(Boolean),...e.filter(m=>m.no_carrossel&&!m.cabana_id)],u=[["todas","📸 Todas",e.length],["carrossel","🎠 Carrossel",n.length],["galeria","🖼️ Galeria",e.filter(m=>m.na_galeria).length],["gerais","🏞️ Gerais",e.filter(m=>!m.cabana_id).length],...i.map(m=>[m.id,`🏡 ${m.nome}`,e.filter(h=>h.cabana_id===m.id).length])];u.some(([m])=>m===F)||(F="todas");const f=new Set(n.map(m=>m.id)),b=e.filter(m=>F==="todas"?!0:F==="carrossel"?f.has(m.id):F==="galeria"?m.na_galeria:F==="gerais"?!m.cabana_id:m.cabana_id===F);F==="carrossel"&&b.sort((m,h)=>n.indexOf(m)-n.indexOf(h)),s.innerHTML=`
      <section class="fa-car">
        <div class="fa-car-head"><h3>🎠 Carrossel do Início</h3><span class="seg-n">${n.length}</span></div>
        ${n.length?`<div class="fa-car-strip">${n.map((m,h)=>`<button type="button" class="fa-car-item" data-edit="${m.id}">
            <img src="${p(Q("fotos",m.mini_path))}" alt="" loading="lazy"><b>${h+1}</b><small>${p(a(m.cabana_id))}</small></button>`).join("")}</div>`:'<p class="small muted">Nenhuma foto no carrossel ainda.</p>'}
        <p class="small muted fa-car-dica">Entram a foto <b>⭐ principal</b> de cada cabana e as fotos gerais com <b>🎠</b> ligado.</p>
      </section>
      <label class="fa-drop" id="drop">
        <input type="file" id="fa-files" accept="image/*" multiple hidden>
        <span class="fa-drop-ico">📷</span><b>Adicionar fotos</b>
        <small>Toque para escolher (pode ser várias). Elas são reduzidas no aparelho antes de enviar.</small>
      </label>
      <div class="ar-filtros fa-filtros" role="tablist">${u.map(([m,h,c])=>`<button type="button" data-f="${m}" class="${m===F?"on":""}">${p(h)}<b class="ar-n">${c||""}</b></button>`).join("")}</div>
      ${b.length?`<div class="fa-grid">${b.map(m=>{const h=f.has(m.id);return`<article class="fa-tile ${!h&&!m.na_galeria?"oculta":""}" data-id="${m.id}">
          <button type="button" class="fa-img" data-edit="${m.id}" aria-label="Editar foto">
            <img src="${p(Q("fotos",m.mini_path))}" alt="${p(m.legenda||"")}" loading="lazy">
            ${m.principal?'<span class="fa-tag">⭐ Principal</span>':""}
            ${!h&&!m.na_galeria?'<span class="fa-tag escondida">Escondida</span>':""}
          </button>
          <div class="fa-rodape">
            <span class="fa-info"><b>${p(a(m.cabana_id))}</b><small>${p(m.legenda||"Sem legenda")}</small></span>
            <span class="fa-quick">
              ${m.cabana_id?`<button type="button" data-star class="${m.principal?"on":""}" title="${m.principal?"Foto principal da cabana":"Tornar a foto principal"}" aria-label="Foto principal">⭐</button>`:`<button type="button" data-t="no_carrossel" class="${m.no_carrossel?"on":""}" title="Carrossel do Início" aria-label="Carrossel do Início">🎠</button>`}
              <button type="button" data-t="na_galeria" class="${m.na_galeria?"on":""}" title="Galeria" aria-label="Galeria">🖼️</button>
            </span>
          </div>
        </article>`}).join("")}</div>`:'<div class="ar-vazio"><span>🖼️</span><h3>Nenhuma foto aqui</h3><p class="muted small">Toque em "Adicionar fotos" para enviar.</p></div>'}`,s.querySelectorAll("[data-f]").forEach(m=>m.addEventListener("click",()=>{F=m.dataset.f,o(),s.querySelector(".fa-filtros .on")?.scrollIntoView({block:"nearest",inline:"center"})})),s.querySelectorAll("[data-edit]").forEach(m=>m.addEventListener("click",()=>r(e.find(h=>h.id===m.dataset.edit))));const g=v("#fa-files",s);g.addEventListener("change",()=>{g.files.length&&t([...g.files]),g.value=""});const k=v("#drop",s);k.addEventListener("dragover",m=>{m.preventDefault(),k.classList.add("sobre")}),k.addEventListener("dragleave",()=>k.classList.remove("sobre")),k.addEventListener("drop",m=>{m.preventDefault(),k.classList.remove("sobre");const h=[...m.dataTransfer.files].filter(c=>c.type.startsWith("image/"));h.length&&t(h)}),s.querySelectorAll(".fa-quick button").forEach(m=>m.addEventListener("click",async()=>{const h=e.find(c=>c.id===m.closest("[data-id]").dataset.id);await N(m,async()=>{if(m.hasAttribute("data-star")){if(h.principal)return E("Esta já é a foto principal. Escolha outra foto da cabana para trocar.");await K(h.id),e.forEach(c=>{c.cabana_id===h.cabana_id&&(c.principal=c.id===h.id)}),E(`Foto principal da ${a(h.cabana_id)} trocada.`,"ok")}else{const c=m.dataset.t,{error:$}=await y.from("fotos").update({[c]:!h[c]}).eq("id",h.id);if($)throw $;h[c]=!h[c],E(c==="no_carrossel"?h[c]?"Foi para o carrossel.":"Saiu do carrossel.":h[c]?"Aparece na galeria.":"Saiu da galeria.","ok")}l(),o()})}))},t=d=>{const n=d.map(h=>URL.createObjectURL(h)),u=document.createElement("dialog");u.className="sheet";const f=i.some(h=>h.id===F)?F:"";u.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Enviar ${d.length} ${d.length===1?"foto":"fotos"}</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <div class="fa-prev">${n.map(h=>`<img src="${h}" alt="">`).join("")}</div>
      <form class="stack" id="fa-up">
        <div class="field"><span>De onde são as fotos?</span>
          <div class="pills">${[["","🏞️ Geral"],...i.map(h=>[h.id,`🏡 ${h.nome}`])].map(([h,c])=>`<label class="pill"><input type="radio" name="cab" value="${h}" ${h===f?"checked":""}><span>${p(c)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="sw-car"><span><b>🎠 Carrossel do Início</b><small>Só para fotos gerais (das cabanas vai a ⭐ principal)</small></span><input type="checkbox" name="car" checked><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" checked><i></i></label>
        <div class="fa-prog" hidden><i></i><span></span></div>
        <button class="btn block">Enviar ${d.length===1?"foto":"fotos"}</button>
      </form>`,document.body.appendChild(u);const b=v("#fa-up",u),g=b.elements,k=()=>{v("#sw-car",u).hidden=!!g.cab.value};b.addEventListener("change",k),k();let m=!1;u.addEventListener("cancel",h=>m&&h.preventDefault()),u.addEventListener("click",h=>{!m&&(h.target===u||h.target.closest("[data-fechar]"))&&u.close()}),u.addEventListener("close",()=>{n.forEach(h=>URL.revokeObjectURL(h)),u.remove()}),b.addEventListener("submit",async h=>{h.preventDefault();const c=v(".fa-prog",u);m=!0,c.hidden=!1;try{await N(b.querySelector(".btn"),async()=>{const $=g.cab.value||null,x=$&&!e.some(_=>_.cabana_id===$&&_.principal);let q=0;const w=await ja(d,{cabana_id:$,no_carrossel:!$&&g.car.checked,na_galeria:g.gal.checked},_=>{_&&q++,v("span",c).textContent=_||"Pronto!",v("i",c).style.width=`${Math.round((_?q-1:d.length)/d.length*100)}%`});x&&w[0]&&(await K(w[0].id).catch(()=>{}),w[0].principal=!0),e=[...w,...e],l(),E(`${w.length} ${w.length===1?"foto enviada":"fotos enviadas"}.`,"ok"),m=!1,u.close(),o()})}finally{m=!1}}),u.showModal()},r=d=>{if(!d)return;const n=document.createElement("dialog");n.className="sheet",n.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Editar foto</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <button type="button" class="fa-grande" data-zoom><img src="${p(Q("fotos",d.path))}" alt=""><span>🔍 Ver grande</span></button>
      <form class="stack" id="fa-ed">
        <label class="field"><span>Legenda</span><input name="legenda" maxlength="200" value="${p(d.legenda)}" placeholder="Ex.: Vista da varanda ao pôr do sol"></label>
        <div class="field"><span>De onde é a foto?</span>
          <div class="pills">${[["","🏞️ Geral"],...i.map(g=>[g.id,`🏡 ${g.nome}`])].map(([g,k])=>`<label class="pill"><input type="radio" name="cab" value="${g}" ${(d.cabana_id||"")===g?"checked":""}><span>${p(k)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="ed-car"><span><b>🎠 Carrossel do Início</b><small>Foto geral no carrossel</small></span><input type="checkbox" name="car" ${d.no_carrossel?"checked":""}><i></i></label>
        <label class="cf-switch" id="ed-pri"><span><b>⭐ Foto principal da cabana</b><small>Capa da cabana e foto dela no carrossel</small></span><input type="checkbox" name="pri" ${d.principal?"checked":""}><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" ${d.na_galeria?"checked":""}><i></i></label>
        <div class="regra-linha"><span><b>Posição</b><small>Menor aparece primeiro</small></span>${oa("ordem",d.ordem,-999,999,"")}</div>
        <button class="btn block">Salvar</button>
        <button type="button" class="cf-del" data-apagar>🗑️ Apagar foto</button>
      </form>`,document.body.appendChild(n);const u=v("#fa-ed",n),f=u.elements,b=()=>{v("#ed-car",n).hidden=!!f.cab.value,v("#ed-pri",n).hidden=!f.cab.value};u.addEventListener("change",b),b(),n.querySelectorAll(".stp [data-d]").forEach(g=>g.addEventListener("click",()=>{const k=v("input",g.closest(".stp"));k.value=Math.min(999,Math.max(-999,(Number(k.value)||0)+Number(g.dataset.d)))})),n.addEventListener("click",g=>{(g.target===n||g.target.closest("[data-fechar]"))&&n.close()}),n.addEventListener("close",()=>n.remove()),v("[data-zoom]",n).addEventListener("click",()=>Sa([Q("fotos",d.path)])),u.addEventListener("submit",async g=>{g.preventDefault(),await N(u.querySelector(".btn.block"),async()=>{const k=f.cab.value||null,m={legenda:f.legenda.value.trim()||null,cabana_id:k,na_galeria:f.gal.checked,no_carrossel:!k&&f.car.checked,ordem:Number(f.ordem.value)||0},{error:h}=await y.from("fotos").update(m).eq("id",d.id);if(h)throw h;Object.assign(d,m,k!==(e.find(c=>c.id===d.id)?.cabana_id??null)?{principal:!1}:{}),k&&f.pri.checked&&!d.principal&&(await K(d.id),e.forEach(c=>{c.cabana_id===k&&(c.principal=c.id===d.id)})),k||(d.principal=!1),e.sort((c,$)=>c.ordem-$.ordem),l(),E("Foto salva.","ok"),n.close(),o()})}),v("[data-apagar]",n).addEventListener("click",async()=>{if(!await G("Apagar esta foto?","Ela sai do app para todos. Não dá para desfazer.","Apagar",!0))return;const{error:g}=await y.from("fotos").delete().eq("id",d.id);if(g)return O(g);await y.storage.from("fotos").remove([d.path,d.mini_path]),e=e.filter(k=>k.id!==d.id),l(),E("Foto apagada.","ok"),n.close(),o()}),n.showModal()};await U(s,"adm-fotos",async()=>{const[d,n]=await Promise.all([pa(!0),aa(!0)]);return{lista:d,cabs:n}},d=>{e=d.lista.map(n=>({...n})),i=d.cabs,o()})}async function Ee(s){await U(s,"adm-clientes",async()=>{const{data:e,error:i}=await y.from("perfis").select("*").order("nome").limit(2e3);if(i)throw i;return e},e=>{s.innerHTML=`
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, região"><button class="btn sm ghost" id="csv">Baixar planilha</button></div>
    <p class="small muted gap-top">${e.length} cliente(s) · ${e.filter(a=>a.receber_email).length} querem novidades por e-mail · ${e.filter(a=>a.receber_push).length} por notificação</p>
    <div id="lista" class="list-cards"></div>`;const i=()=>{const a=v("#busca").value.trim().toLowerCase(),o=e.filter(t=>!a||[t.nome,t.telefone,t.regiao,t.email].some(r=>String(r??"").toLowerCase().includes(a)));v("#lista").innerHTML=o.slice(0,300).map(t=>`<article class="card row gap">
      <span class="avatar" ${t.foto_path?`data-avatar-path="${p(t.foto_path)}"`:""}>${p(La(t.nome))}</span>
      <span><strong>${p(t.nome)}</strong><br><span class="small"><a href="${Pa(t.telefone)}" target="_blank" rel="noopener noreferrer">${p(W(t.telefone))}</a> · ${p(t.email||"")}${t.regiao?" · "+p(t.regiao):""}</span>
      <br><span class="small muted">Desde ${V(t.criado_em)}${t.receber_email?" · ✉️ novidades":""}${t.receber_push?" · 🔔 novidades":""}</span></span></article>`).join(""),l()},l=async()=>{for(const a of ma("#lista [data-avatar-path]")){const o=await Ga(a.dataset.avatarPath);o&&a.isConnected&&(a.innerHTML=`<img src="${p(o)}" alt="">`)}};v("#busca").addEventListener("input",i),v("#csv").addEventListener("click",()=>ha("clientes.csv",va([["Nome","E-mail","Celular","Região","Novidades por e-mail","Novidades por notificação","Cadastro"],...e.map(a=>[a.nome,a.email,W(a.telefone),a.regiao,a.receber_email?"sim":"não",a.receber_push?"sim":"não",V(a.criado_em)])]))),i()})}async function Le(s){const e=I();s.innerHTML=`
    <form id="per" class="row wrap gap">
      <label class="field"><span>De</span><input type="date" name="de" value="${e.slice(0,7)}-01"></label>
      <label class="field"><span>Até</span><input type="date" name="ate" value="${B(B(e.slice(0,7)+"-01",32).slice(0,7)+"-01",-1)}"></label>
      <button class="btn sm">Ver</button>
    </form>
    <div class="row wrap gap"><button class="chip" data-p="mes">Este mês</button><button class="chip" data-p="ano">Este ano</button><button class="chip" data-p="12">Últimos 12 meses</button></div>
    <div id="rel" class="gap-top"></div>`;const i=v("#per"),l=async()=>{const a=i.elements.de.value,o=i.elements.ate.value,{data:t,error:r}=await y.rpc("relatorio_reservas",{p_de:a,p_ate:o});if(r)return O(r);const d=t.por_situacao||{};v("#rel").innerHTML=`
      <div class="kpis">
        <div class="kpi"><span>Receita confirmada</span><strong>${R(t.receita_centavos)}</strong></div>
        <div class="kpi"><span>Reservas confirmadas</span><strong>${d.confirmada||0}</strong></div>
        <div class="kpi"><span>Diárias vendidas</span><strong>${t.diarias}</strong></div>
        <div class="kpi"><span>Hóspedes</span><strong>${t.hospedes}</strong></div>
        <div class="kpi"><span>Faltam validar</span><strong>${t.nao_validadas}</strong></div>
        <div class="kpi"><span>Todas as reservas</span><strong>${t.total}</strong></div>
      </div>
      <h3 class="section-title">Por cabana</h3>
      <div class="table-wrap"><table class="table"><thead><tr><th>Cabana</th><th>Reservas</th><th>Noites</th><th>Ocupação</th><th>Receita</th></tr></thead>
      <tbody>${t.por_cabana.map(n=>`<tr><td>${p(n.cabana)}</td><td>${n.reservas}</td><td>${n.noites_ocupadas}</td><td><span class="bar"><i style="width:${Math.min(100,Number(n.ocupacao)||0)}%"></i></span> ${n.ocupacao}%</td><td>${R(n.receita_centavos)}</td></tr>`).join("")}</tbody></table></div>
      <h3 class="section-title">Por mês (entrada)</h3>
      <table class="table"><thead><tr><th>Mês</th><th>Reservas</th><th>Receita</th></tr></thead>
      <tbody>${t.por_mes.map(n=>`<tr><td>${p(n.mes.split("-").reverse().join("/"))}</td><td>${n.reservas}</td><td>${R(n.receita_centavos)}</td></tr>`).join("")||'<tr><td colspan="3" class="muted">Sem dados</td></tr>'}</tbody></table>
      <div class="row wrap gap">
        <div class="grow"><h3 class="section-title">Situação</h3><table class="table"><tbody>${Object.entries(d).map(([n,u])=>`<tr><td>${p(ra[n]?.label||n)}</td><td>${u}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Origem</h3><table class="table"><tbody>${Object.entries(t.por_origem||{}).map(([n,u])=>`<tr><td>${p(Ea[n]||n)}</td><td>${u}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Região dos hóspedes</h3><table class="table"><tbody>${t.por_regiao.map(n=>`<tr><td>${p(n.regiao)}</td><td>${n.reservas}</td></tr>`).join("")}</tbody></table></div>
      </div>
      <button class="btn ghost" id="csv">Baixar planilha das reservas do período</button>`,v("#csv").addEventListener("click",async()=>{const n=await aa(),{data:u,error:f}=await y.from("reservas").select("*").lte("checkin",o).gt("checkout",a).order("checkin").limit(5e3);if(f)return O(f);ha(`reservas-${a}-a-${o}.csv`,va([["Código","Cabana","Cliente","Celular","E-mail","Região","Entrada","Saída","Diárias","Pessoas","Valor","Situação","Validada","Origem","Criada em"],...u.map(b=>[b.codigo,n.find(g=>g.id===b.cabana_id)?.nome,b.nome_cliente,W(b.telefone_cliente),b.email_cliente,b.regiao_cliente,V(b.checkin),V(b.checkout),b.diarias,b.hospedes,(b.valor_centavos/100).toFixed(2).replace(".",","),ra[b.status]?.label,b.validada?"sim":"não",Ea[b.origem],J(b.criado_em)])]))})};i.addEventListener("submit",a=>{a.preventDefault(),l()}),s.querySelectorAll("[data-p]").forEach(a=>a.addEventListener("click",()=>{const o=a.dataset.p;o==="mes"&&(i.elements.de.value=e.slice(0,7)+"-01"),o==="ano"&&(i.elements.de.value=e.slice(0,4)+"-01-01"),o==="12"&&(i.elements.de.value=B(e,-365)),i.elements.ate.value=o==="ano"?e.slice(0,4)+"-12-31":o==="12"?e:i.elements.ate.value,l()})),l()}async function Ce(s){await U(s,"adm-historico",async()=>{const{data:e,error:i}=await y.from("historico_hospedes").select("*").order("checkin",{ascending:!1}).limit(1e4);if(i)throw i;return e},e=>{const i=I();s.innerHTML=`
    <p class="small muted">Registro permanente de todas as hospedagens confirmadas. Ele não é apagado por nada: nem pela limpeza das conversas, nem pela exclusão da conta do cliente.</p>
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, cabana"><button class="btn sm ghost" id="csv">Baixar planilha completa</button></div>
    <p class="small gap-top">${e.length} hospedagem(ns) · ${new Set(e.map(a=>a.telefone||a.email||a.nome)).size} cliente(s)</p>
    <div class="table-wrap"><table class="table" id="tab"></table></div>`;const l=()=>{const a=v("#busca").value.trim().toLowerCase(),o=e.filter(t=>!a||[t.nome,t.telefone,t.email,t.cabana,t.regiao,t.codigo].some(r=>String(r??"").toLowerCase().includes(a)));v("#tab").innerHTML=`<thead><tr><th>Entrada</th><th>Saída</th><th>Hóspede</th><th>Contato</th><th>Cabana</th><th>Pessoas</th><th>Valor</th><th>Situação</th></tr></thead>
      <tbody>${o.slice(0,500).map(t=>`<tr><td>${V(t.checkin)}</td><td>${V(t.checkout)}</td><td>${p(t.nome)}${t.regiao?`<br><span class="muted small">${p(t.regiao)}</span>`:""}</td>
      <td class="small">${p(W(t.telefone))}<br>${p(t.email||"")}</td><td>${p(t.cabana)}</td><td>${t.hospedes}</td><td>${R(t.valor_centavos)}</td>
      <td>${t.situacao==="confirmada"?t.checkout<=i?'<span class="badge ok">Hospedou</span>':'<span class="badge info">Futura</span>':`<span class="badge muted">${p(ra[t.situacao]?.label||t.situacao)}</span>`}</td></tr>`).join("")}</tbody>`};v("#busca").addEventListener("input",l),v("#csv").addEventListener("click",()=>ha("historico-de-hospedes.csv",va([["Código","Entrada","Saída","Diárias","Hóspede","Celular","E-mail","Região","Cabana","Pessoas","Valor","Situação","Confirmada em"],...e.map(a=>[a.codigo,V(a.checkin),V(a.checkout),a.diarias,a.nome,W(a.telefone),a.email,a.regiao,a.cabana,a.hospedes,(a.valor_centavos/100).toFixed(2).replace(".",","),a.situacao,J(a.confirmada_em)])]))),l()})}async function Ra(){const{data:s,error:e}=await y.from("configuracoes_privadas").select("*").eq("id",1).single();if(e)throw e;return s}async function Se(s){await U(s,"adm-privadas",Ra,e=>{s.innerHTML=`
    <form id="f" class="stack">
      <p class="small muted">Escreva tudo o que o atendente virtual (IA do Google) deve saber para responder aos clientes: regras da casa, o que está incluso, como chegar, animais, crianças, cancelamento, horários, valores extras… As cabanas, preços, disponibilidade e horários de entrada e saída já são enviados automaticamente.</p>
      <label class="field"><span>Informações para a IA</span><textarea name="prompt" rows="16" maxlength="12000">${p(e.prompt_ia)}</textarea></label>
      <p class="small muted"><span id="cont"></span> / 12000 caracteres</p>
      <button class="btn">Salvar</button>
    </form>
    <form id="horario" class="cal-card stack gap-top">
      <h3>🙋 Quando o cliente chama a equipe</h3>
      <p class="small muted">No chat, o cliente toca em 🙋 (ou pede à IA) para falar com uma pessoa. Todos os administradores recebem notificação e e-mail; se ninguém responder em 15 minutos, chega um lembrete. Enquanto a equipe atende, a IA fica pausada; ela volta quando você toca em "Encerrar" ou depois de 24 h sem mensagens.</p>
      <label class="cf-switch"><span><b>A equipe atende a qualquer hora</b><small>Desligue para definir um horário: fora dele o cliente é avisado e a notificação chega quando a equipe começar.</small></span><input type="checkbox" name="sempre" ${j.config?.equipe_inicio&&j.config?.equipe_fim?"":"checked"}><i></i></label>
      <div class="datas-2" id="horas">
        <label class="field"><span>Das</span><input type="time" name="ini" value="${p((j.config?.equipe_inicio||"08:00").slice(0,5))}"></label>
        <label class="field"><span>Até</span><input type="time" name="fim" value="${p((j.config?.equipe_fim||"20:00").slice(0,5))}"></label>
      </div>
      <button class="btn">Salvar horário</button>
    </form>`;const i=v("#horario"),l=()=>v("#horas").hidden=i.elements.sempre.checked;i.elements.sempre.addEventListener("change",l),l(),i.addEventListener("submit",async t=>{t.preventDefault();const r=i.elements;if(!r.sempre.checked&&(!r.ini.value||!r.fim.value||r.ini.value===r.fim.value))return E("Confira o horário da equipe.","bad");await N(i.querySelector(".btn"),async()=>{const{error:d}=await y.from("configuracoes").update({equipe_inicio:r.sempre.checked?null:r.ini.value,equipe_fim:r.sempre.checked?null:r.fim.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(d)throw new Error(/equipe_/.test(d.message)?"Rode o arquivo supabase/008_chamar_equipe.sql no Supabase para usar o horário da equipe.":d.message);await Y(!0),E("Horário salvo.","ok")})});const a=v("#f"),o=()=>v("#cont").textContent=a.elements.prompt.value.length;a.elements.prompt.addEventListener("input",o),o(),a.addEventListener("submit",async t=>{t.preventDefault(),await N(a.querySelector("button"),async()=>{const{error:r}=await y.from("configuracoes_privadas").update({prompt_ia:a.elements.prompt.value.trim(),atualizado_em:new Date().toISOString()}).eq("id",1);if(r)throw r;z("adm-privadas"),E("Informações salvas.","ok")})})})}function Da({titulo:s,texto:e,qr:i,segredo:l,verificar:a}){return new Promise(o=>{const t=document.createElement("dialog");t.className="dialog",t.innerHTML=`<form><h3>${p(s)}</h3><p>${p(e)}</p>
      ${i?`<img class="mfa-qr" src="${p(i)}" alt="QR Code para o aplicativo de códigos" width="200" height="200">`:""}
      ${l?`<p class="small muted">Ou digite no aplicativo: <code class="mfa-segredo">${p(l)}</code></p>`:""}
      <label class="field"><span>Código de 6 dígitos</span><input name="c" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required></label>
      <p class="warn small" data-erro hidden></p>
      <div class="row end"><button type="button" class="btn ghost" data-voltar>Voltar</button><button class="btn">Confirmar</button></div></form>`,document.body.appendChild(t);let r=!1;const d=t.querySelector("form");t.querySelector("[data-voltar]").onclick=()=>t.close(),d.addEventListener("submit",async n=>{n.preventDefault();const u=t.querySelector("[data-erro]");u.hidden=!0;try{await a(d.elements.c.value),r=!0,t.close()}catch(f){const b=f?.code==="mfa_verification_failed"||/invalid totp/i.test(f?.message||"");u.textContent=`${b?"Código incorreto ou vencido. Confira no aplicativo e tente de novo.":"Não foi possível confirmar o código."} (${f?.code||f?.status||"erro"}: ${f?.message||f})`,u.hidden=!1}}),t.addEventListener("close",()=>{o(r),t.remove()}),t.showModal()})}async function Ae(){const{data:s,error:e}=await y.auth.mfa.getAuthenticatorAssuranceLevel();if(e)throw e;if(s.currentLevel==="aal2")return!0;const{data:i,error:l}=await y.auth.mfa.listFactors();if(l)throw l;const a=async(n,u)=>{const{error:f}=await y.auth.mfa.challengeAndVerify({factorId:n,code:u});if(f)throw f},o=i.totp.find(n=>n.status==="verified");if(o)return Da({titulo:"🔒 Código de duas etapas",texto:"Abra o aplicativo de códigos e digite o número desta conta.",verificar:n=>a(o.id,n)});for(const n of i.all.filter(u=>u.status!=="verified"))await y.auth.mfa.unenroll({factorId:n.id}).catch(()=>{});const{data:t,error:r}=await y.auth.mfa.enroll({factorType:"totp",friendlyName:"Chácara Canarinho"});if(r)throw r;const d=await Da({titulo:"🔒 Ativar a verificação em duas etapas",texto:"Para proteger a chave Pix, leia este QR Code com um aplicativo de códigos (Google Authenticator, por exemplo) e digite o número que aparecer.",qr:t.totp.qr_code,segredo:t.totp.secret,verificar:n=>a(t.id,n)});return d||await y.auth.mfa.unenroll({factorId:t.id}).catch(()=>{}),d}async function Te(s){const{data:e,error:i}=await y.from("alteracoes_pix").select("em,email,chave_antes,chave_depois").order("id",{ascending:!1}).limit(10);if(i||!e?.length||!s.isConnected)return;const l=a=>p(a||"(vazia)");s.innerHTML=`<h3>Alterações do Pix</h3><ul class="small">${e.map(a=>`<li>${p(J(a.em))} · ${p(a.email||"acesso direto ao banco")}: ${a.chave_antes===a.chave_depois?"outros dados do Pix":`chave ${l(a.chave_antes)} → ${l(a.chave_depois)}`}</li>`).join("")}</ul>`}async function Oa(s){await U(s,"adm-privadas",Ra,e=>{s.innerHTML=`
    <form id="f" class="stack">
      <p class="card small">${e.pix_chave&&e.pix_nome?"✅ <strong>Pix ativo.</strong> Quando o cliente reserva (pelo chat ou pela página da cabana), o QR Code e o Pix copia e cola aparecem no chat, e ele pode pedir o Pix de novo a qualquer momento.":"⚠️ <strong>Pix ainda não está ativo.</strong> Preencha a chave e o nome do recebedor e salve: o Pix passa a aparecer no chat sozinho."}</p>
      <div class="row gap wrap">
        <label class="field"><span>Tipo de chave</span><select name="tipo">${Object.entries(ee).map(([l,a])=>`<option value="${l}" ${e.pix_tipo===l?"selected":""}>${a}</option>`).join("")}</select></label>
        <label class="field grow"><span>Chave Pix</span><input name="chave" maxlength="77" value="${p(e.pix_chave)}"></label>
      </div>
      <div class="row gap wrap">
        <label class="field grow"><span>Nome do recebedor (como aparece no banco)</span><input name="nome" maxlength="25" value="${p(e.pix_nome)}"></label>
        <label class="field"><span>Cidade</span><input name="cidade" maxlength="15" value="${p(e.pix_cidade)}"></label>
      </div>
      <label class="field"><span>Prazo para pagar (horas) — depois disso as datas são liberadas</span><input type="number" name="prazo" min="1" max="168" value="${e.prazo_pagamento_horas}"></label>
      <label class="check"><input type="checkbox" name="auto" ${e.confirmacao_automatica?"checked":""}> Confirmar sozinho quando o comprovante passar em todas as conferências da IA</label>
      <p class="small muted">A IA lê o comprovante e o app confere: valor exato, recebedor (chave ou nome), data depois da reserva, ID da transação válido e nunca usado, imagem nunca usada, sinais de montagem e qualidade da leitura. Se qualquer item falhar, a reserva fica "em análise" para você. Mesmo as confirmadas sozinhas aparecem em Reservas › "Para conferir": confira no extrato do banco e toque em Validar.</p>
      <p class="small muted">Todos os administradores recebem um e-mail (no e-mail da própria conta) e uma notificação no celular quando uma reserva é confirmada ou chega um comprovante para conferir. Para a notificação, cada um precisa ligar "Notificações no celular" no Menu.</p>
      <label class="field"><span>E-mail extra para receber esses avisos (opcional)</span><input type="email" name="email" value="${p(e.email_admin)}" placeholder="ex.: reservas@chacara.com"></label>
      <p class="small muted">🔒 Para alterar a chave, o recebedor, a confirmação automática ou o e-mail de avisos, o app pede o código de duas etapas. Todos os administradores são avisados de cada alteração.</p>
      <button class="btn">Salvar</button>
    </form>
    <div id="pix-hist" class="gap-top"></div>`,Te(v("#pix-hist"));const i=v("#f");i.addEventListener("submit",async l=>{l.preventDefault();const a=i.elements,o=a.chave.value.trim()?oe(a.tipo.value,a.chave.value):null;if(a.chave.value.trim()&&!o)return E("Chave Pix inválida para o tipo escolhido.","bad");if(o&&!a.nome.value.trim())return E("Informe também o nome do recebedor, como aparece no banco.","bad");const t=o!==(e.pix_chave??null)||a.tipo.value!==e.pix_tipo||(a.nome.value.trim()||null)!==(e.pix_nome??null)||a.auto.checked!==e.confirmacao_automatica||(a.email.value.trim()||null)!==(e.email_admin??null);await N(i.querySelector("button"),async()=>{if(t&&!await Ae())return;const{error:r}=await y.from("configuracoes_privadas").update({pix_ativo:!!(o&&a.nome.value.trim()),pix_tipo:a.tipo.value,pix_chave:o,pix_nome:a.nome.value.trim()||null,pix_cidade:a.cidade.value.trim()||null,prazo_pagamento_horas:Number(a.prazo.value),confirmacao_automatica:a.auto.checked,email_admin:a.email.value.trim()||null,atualizado_em:new Date().toISOString()}).eq("id",1);if(r)throw r;E(o?"Pix salvo e ativo no chat.":"Pix salvo.","ok"),z("adm-privadas"),Oa(s)})})})}async function Pe(s){await U(s,"adm-aparencia",()=>Y(!0),e=>{s.innerHTML=`
    <form id="f" class="stack">
      <label class="field"><span>Nome do app</span><input name="nome" required minlength="2" maxlength="40" value="${p(e.nome_app)}"></label>
      <div class="row gap wrap">
        <label class="field"><span>Cor do aplicativo</span><input type="color" name="cor" value="${p(e.cor_principal)}"></label>
        <label class="field"><span>Cor de fundo do ícone</span><input type="color" name="fundo" value="${p(e.cor_icone_fundo)}"></label>
      </div>
      <div class="icon-edit-row">
        <label class="icon-edit" title="Trocar a logo do ícone">
          <img id="prev" width="104" height="104" alt="Ícone do app">
          <span class="icon-edit-btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg></span>
          <input type="file" name="logo" accept="image/png,image/webp,image/jpeg,image/svg+xml" hidden aria-label="Trocar a logo do ícone">
        </label>
        <div class="small muted">
          <strong class="icon-edit-t">Ícone do app</strong>
          Toque no ícone para trocar a logo (PNG com fundo transparente fica melhor). A cor de fundo é a escolhida acima.
          <br>No celular, o ícone do app instalado muda na próxima publicação do site (em até 3 horas).
          <br><button type="button" class="link small" id="logo-padrao" ${e.icone_versao>0?"":"hidden"}>Voltar ao desenho padrão</button>
        </div>
      </div>
      <div class="icon-zoom card">
        <label class="field"><span>Tamanho da logo no ícone do celular: <b id="zoom-v"></b></span>
          <input type="range" name="zoom" min="70" max="135" step="5" aria-label="Tamanho da logo no ícone"></label>
        <div class="icon-shapes">
          <figure><img id="pv-circ" alt=""><figcaption>Android<br>(círculo)</figcaption></figure>
          <figure><img id="pv-arred" alt=""><figcaption>Android<br>(arredondado)</figcaption></figure>
          <figure><img id="pv-ios" alt=""><figcaption>iPhone</figcaption></figure>
        </div>
        <p class="small muted">É assim que o ícone aparece no celular depois de instalado. Aumente para a logo ficar maior; se o texto da borda começar a ser cortado no círculo, diminua um pouco.</p>
      </div>
      <div class="icon-edit-row">
        <label class="icon-edit ilus-edit" title="Trocar a ilustração das telas">
          <img id="ilus-prev" width="104" height="104" alt="Ilustração das telas">
          <span class="icon-edit-btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg></span>
          <input type="file" name="ilus" accept="image/png,image/webp,image/jpeg,image/svg+xml" hidden aria-label="Trocar a ilustração das telas">
        </label>
        <div class="small muted">
          <strong class="icon-edit-t">Ilustração das telas</strong>
          Aparece no rodapé do Início e no meio das telas Reservas e Chat quando estão vazias. Toque na imagem para trocar (PNG com fundo transparente fica melhor).
          <br><button type="button" class="link small" id="ilus-padrao">Voltar ao passarinho padrão</button>
        </div>
      </div>
      <label class="field"><span>Texto de boas-vindas</span><textarea name="boas" rows="3" maxlength="600">${p(e.boas_vindas)}</textarea></label>
      <label class="field"><span>Endereço (aparece no rodapé e no e-mail de confirmação)</span><input name="end" maxlength="200" value="${p(e.endereco)}"></label>
      <div class="pin-field card">
        <span class="pin-status" id="pin-status"></span>
        <p class="small muted">Com o alfinete, o "Como chegar" do Início mostra o mapa e a rota leva até o ponto exato (Google Maps e Waze).</p>
        <button class="btn sm" type="button" id="pin-btn">📍 Marcar no mapa</button>
      </div>
      <label class="field"><span>Instagram (@perfil ou endereço)</span><input name="insta" maxlength="80" value="${p(e.instagram_url)}" placeholder="@chacaracanarinho"></label>
      <button class="btn">Salvar aparência</button>
    </form>`;const i=v("#f");let l=null,a=e.lat!=null&&e.lng!=null?{lat:e.lat,lng:e.lng}:null,o=!1;const t=()=>{v("#pin-status").innerHTML=a?'<b class="ok-text">📍 Local marcado no mapa</b>':"<b>Sem alfinete no mapa</b>",v("#pin-btn").textContent=a?"📍 Mudar no mapa":"📍 Marcar no mapa"};t();let r=null,d=!(e.ilustracao_versao>0),n=!1;const u=v("#ilus-prev"),f=()=>{r?u.src=URL.createObjectURL(r):u.src=d?"icons/passaro.svg":Q("marca",`ilustracao/v${e.ilustracao_versao}.png`),v("#ilus-padrao").hidden=d&&!r};f(),i.elements.ilus.addEventListener("change",async()=>{const w=i.elements.ilus.files[0];if(i.elements.ilus.value="",!!w)try{r=await ba(w),r.size>480*1024&&(r=await ba(r,360)),d=!1,n=!0,f(),E("Ilustração escolhida. Toque em Salvar aparência.")}catch(_){O(_)}}),v("#ilus-padrao").addEventListener("click",()=>{r=null,d=!0,n=!0,f(),E("Volta ao passarinho padrão ao salvar.")}),v("#pin-btn").addEventListener("click",async()=>{const w=await le({...a||{},endereco:i.elements.end.value});w!==void 0&&(a=w,o=!0,t(),E(w?"Ponto marcado. Toque em Salvar aparência.":"Alfinete removido. Toque em Salvar aparência."))});let b=null,g=!1;const k=e.icone_versao>0?fetch(Qa(e.icone_versao,"logo.png")).then(w=>w.ok?w.blob():null).catch(()=>null):Promise.resolve(null),m=()=>{try{return Number(localStorage.getItem("icone-zoom"))||100}catch{return 100}};let h=!1;i.elements.zoom.value=m();const c=()=>v("#zoom-v").textContent=`${i.elements.zoom.value}%`;c();const $=[],x=async()=>{l=await Xa(b||"icons/logo.svg",i.elements.fundo.value,Number(i.elements.zoom.value)/100),$.splice(0).forEach(_=>URL.revokeObjectURL(_));const w=_=>{const C=URL.createObjectURL(l[_]);return $.push(C),C};v("#prev").src=w("icon-192.png"),v("#pv-circ").src=v("#pv-arred").src=w("icon-maskable-512.png"),v("#pv-ios").src=w("apple-touch-icon.png")};i.elements.fundo.addEventListener("input",()=>x().catch(O));let q;i.elements.zoom.addEventListener("input",()=>{h=!0,c(),clearTimeout(q),q=setTimeout(()=>x().catch(O),180)}),i.elements.logo.addEventListener("change",async()=>{const w=i.elements.logo.files[0];if(w)try{b=await ba(w),g=!0;const{selo:_,cor:C}=Ya(await ae(b));_&&C&&(i.elements.fundo.value=C),await x(),v("#logo-padrao").hidden=!1,E(_&&C?"Logo ajustada para ocupar o ícone, com o fundo na cor do selo. Toque em Salvar aparência.":"Logo escolhida. Toque em Salvar aparência para aplicar.")}catch(_){O(_)}finally{i.elements.logo.value=""}}),v("#logo-padrao").addEventListener("click",()=>{b=null,g=!0,v("#logo-padrao").hidden=!0,x().catch(O)}),k.then(w=>(w&&!g&&(b=w),x())).catch(()=>{}),i.elements.cor.addEventListener("input",()=>{document.documentElement.style.setProperty("--brand",i.elements.cor.value),document.documentElement.style.setProperty("--brand-ink",Wa(i.elements.cor.value))}),x().catch(()=>{}),i.addEventListener("submit",async w=>{w.preventDefault();const _=i.elements,C=Za(_.insta.value);if(C===null)return E("Instagram inválido. Use @perfil ou o endereço do perfil.","bad");const T=qa(_.cor.value),D=qa(_.fundo.value);await N(i.querySelector("button"),async()=>{const S=D!==e.cor_icone_fundo||g||h||e.icone_versao===0,P=S?Math.floor(Date.now()/1e3):e.icone_versao;if(S){await k,await x();const M={...l,...b?{"logo.png":b}:{}};for(const[H,sa]of Object.entries(M)){if(sa.size>500*1024)throw new Error("A logo gerou um ícone pesado demais. Use uma imagem mais simples (PNG com fundo transparente).");const{error:X}=await y.storage.from("marca").upload(`v${P}/${H}`,sa,{contentType:"image/png",cacheControl:"31536000"});if(X)throw X}}let A=e.ilustracao_versao??0;if(n){if(d)A=0;else if(r){A=Math.floor(Date.now()/1e3);const{error:M}=await y.storage.from("marca").upload(`ilustracao/v${A}.png`,r,{contentType:"image/png",cacheControl:"31536000"});if(M)throw M}}const{error:L}=await y.from("configuracoes").update({nome_app:_.nome.value.trim(),cor_principal:T,cor_icone_fundo:D,boas_vindas:_.boas.value.trim(),endereco:_.end.value.trim()||null,instagram_url:C||null,icone_versao:P,atualizado_em:new Date().toISOString(),...o?{lat:a?.lat??null,lng:a?.lng??null}:{},...n?{ilustracao_versao:A}:{}}).eq("id",1);if(L)throw/ilustracao/i.test(L.message)?new Error("Para salvar a ilustração, rode o arquivo supabase/006_ilustracao.sql no Supabase."):/lat|lng|column/i.test(L.message)?new Error("Para salvar o local no mapa, rode o arquivo supabase/005_mapa.sql no Supabase."):L;o=!1,n&&e.ilustracao_versao>0&&A!==e.ilustracao_versao&&y.storage.from("marca").remove([`ilustracao/v${e.ilustracao_versao}.png`]).catch(()=>{}),n=!1,S&&e.icone_versao>0&&y.storage.from("marca").remove(["icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","logo.png"].map(M=>`v${e.icone_versao}/${M}`)).catch(()=>{}),g=!1,h=!1;try{localStorage.setItem("icone-zoom",String(i.elements.zoom.value))}catch{}await Y(!0),Ba(),z("adm-aparencia"),z("adm-calendario"),E("Aparência salva.","ok")})})})}async function Fa(s){await U(s,"adm-novidades",async()=>{const[{count:e},{count:i},{data:l}]=await Promise.all([y.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_email",!0),y.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_push",!0),y.from("novidades").select("*").order("criado_em",{ascending:!1}).limit(30)]);return{ce:e,cp:i,envios:l}},({ce:e,cp:i,envios:l})=>{s.innerHTML=`
    <form id="f" class="stack card">
      <p class="small muted">Só recebem os clientes que pediram: ${e??0} por e-mail e ${i??0} por notificação.</p>
      <label class="field"><span>Título</span><input name="titulo" required minlength="2" maxlength="80"></label>
      <label class="field"><span>Mensagem</span><textarea name="texto" rows="5" required minlength="2" maxlength="2000"></textarea></label>
      <label class="check"><input type="checkbox" name="email" checked> Enviar por e-mail</label>
      <label class="check"><input type="checkbox" name="push" checked> Enviar por notificação</label>
      <button class="btn">Enviar novidade</button>
    </form>
    <h3 class="section-title">Enviadas</h3>
    ${(l||[]).map(o=>`<article class="card"><strong>${p(o.titulo)}</strong> <span class="muted small">${J(o.criado_em)}</span><p class="small pre">${p(o.texto)}</p><p class="small muted">✉️ ${o.enviados_email} · 🔔 ${o.enviados_push}</p></article>`).join("")||'<p class="muted small">Nenhuma ainda.</p>'}`;const a=v("#f");a.addEventListener("submit",async o=>{o.preventDefault();const t=a.elements;await G("Enviar a novidade?","Ela vai para todos os clientes que pediram.","Enviar")&&await N(a.querySelector("button"),async()=>{const r=await ta("enviar-novidade",{titulo:t.titulo.value.trim(),texto:t.texto.value.trim(),email:t.email.checked,push:t.push.checked});E(`Enviada: ${r.enviados_email} e-mail(s) e ${r.enviados_push} notificação(ões).`,"ok"),z("adm-novidades"),Fa(s)})})})}const Me=[["🧭","Visão geral",`
    <p>O app tem duas partes:</p>
    <ul>
      <li><b>Clientes</b>: veem as cabanas e os dias livres, reservam (pela página da cabana ou pelo chat), pagam com Pix, enviam o comprovante e recebem a confirmação por e-mail e no celular.</li>
      <li><b>Administradores</b>: tudo o que está em <b>Menu › Administração</b>. Só aparece para quem é administrador; as permissões são conferidas no banco de dados, não no aparelho.</li>
    </ul>
    <p>Abas de baixo: <b>Início</b> (carrossel, cabanas, como chegar), <b>Reservas</b>, <b>Chat</b>, <b>Galeria</b> e <b>Menu</b>.</p>
    <p>O app se atualiza sozinho: quando sai uma versão nova, ele recarrega uma vez ao abrir.</p>`],["📅","Como o cliente reserva",`
    <ol>
      <li><b>Escolhe a cabana</b>: no Início, no carrossel ou no <b>+</b> da tela Reservas.</li>
      <li><b>Escolhe as datas</b> no calendário: toque no dia da entrada e depois no da saída. Verde = livre, vermelho = reservado, cinza = indisponível.</li>
      <li>Toca em <b>Reservar e pagar com Pix</b>: a reserva é criada como <b>Aguardando pagamento</b> e as datas ficam guardadas pelo prazo definido em <a href="#/admin/pix">Pix</a>. O chat abre com o QR Code e o Pix copia e cola.</li>
      <li><b>Paga e envia a foto do comprovante</b> (botão de clipe 📎 no chat, ou em Reservas).</li>
      <li>A IA lê o comprovante e o sistema confere (veja "Pix e comprovante"). Tudo certo → <b>Confirmada</b>. Algo estranho → <b>Comprovante em análise</b>, para você decidir.</li>
    </ol>
    <p>Também dá para reservar <b>conversando no chat</b>: o atendente consulta as datas, mostra o resumo e só cria a reserva depois que o cliente confirma.</p>
    <p>Se o prazo de pagamento acabar sem comprovante, a reserva vira <b>Prazo encerrado</b> sozinha e as datas voltam a ficar livres.</p>`],["✅","Reservas: conferir e validar",`
    <p>Em <a href="#/admin/reservas">Reservas: conferir e validar</a> você acompanha tudo. O filtro <b>Para conferir</b> (com o número em vermelho) mostra o que precisa da sua atenção; os outros chips do topo mostram próximas, aguardando Pix, confirmadas e todas. A busca acha por nome, código ou celular.</p>
    <ul>
      <li><b>Confirmar pagamento</b>: para reservas aguardando pagamento ou em análise. O cliente é avisado.</li>
      <li><b>Validar</b>: depois de conferir o Pix no extrato do banco. Toda reserva confirmada (inclusive pela IA) fica como "aguardando sua validação" até você validar. Há o botão <b>Validar todas</b> para as confirmadas da lista.</li>
      <li><b>Pedir novo comprovante</b>: quando a imagem não serve; o cliente ganha mais 24 horas.</li>
      <li><b>Recusar</b> ou <b>Cancelar</b>: pedem o motivo, que vai para o cliente.</li>
      <li><b>Ver comprovante</b> e a <b>Análise da IA</b> (cada conferência com ✓ ou ✗).</li>
      <li><b>Botão + (canto de baixo)</b>: reserva feita por você (telefone, WhatsApp, balcão). O valor é calculado sozinho (com sexta a domingo e feriados) e pode ser trocado. Pode já entrar como paga; se não entrar, as datas ficam guardadas pelo prazo do Pix e depois são liberadas sozinhas.</li>
    </ul>
    <p>O banco impede duas reservas da mesma cabana na mesma noite, mesmo que duas pessoas reservem ao mesmo tempo.</p>`],["💠","Pix e comprovante",`
    <p>Em <a href="#/admin/pix">Pix e conferência do comprovante</a>: chave, tipo, <b>nome do recebedor exatamente como o banco mostra</b>, cidade, prazo para pagar e a confirmação automática.</p>
    <p>Com a chave e o nome preenchidos, o Pix aparece no chat sozinho. O valor sai do banco (diária × noites), nunca do aparelho.</p>
    <p><b>Como o comprovante é conferido</b>: a IA do Google só lê a imagem; regras fixas decidem. Precisa passar em tudo:</p>
    <ul>
      <li>é um comprovante Pix concluído;</li>
      <li>valor igual ao da reserva;</li>
      <li>recebedor = a sua chave ou o seu nome;</li>
      <li>data depois da reserva e não no futuro;</li>
      <li>ID da transação válido e nunca usado em outra reserva;</li>
      <li>a mesma imagem nunca enviada antes;</li>
      <li>sem sinais de montagem e com leitura confiável.</li>
    </ul>
    <p>Se qualquer item falhar, fica <b>em análise</b> para você. Se a imagem não for um comprovante, o cliente é avisado para mandar outra (até 5 tentativas).</p>
    <p><b>Importante</b>: nenhuma IA garante que um comprovante é verdadeiro. Por isso existe o <b>Validar</b>: confira no extrato.</p>`],["🔔","Notificações e e-mails",`
    <p>Os avisos chegam de duas formas:</p>
    <ul>
      <li><b>Notificação no celular</b>: só chega para quem ligou <b>Menu › Notificações no celular</b> naquele aparelho. No <b>iPhone</b>, só funciona com o app instalado na Tela de Início (Safari › Compartilhar › Adicionar à Tela de Início). Cada celular precisa ligar a sua.</li>
      <li><b>E-mail</b>: sai do Gmail configurado no servidor (canarinho.chac@gmail.com), para o e-mail da conta da pessoa. Na primeira vez pode cair no spam.</li>
    </ul>
    <table class="table ajuda-tab">
      <thead><tr><th>Quando</th><th>Cliente recebe</th><th>Administradores recebem</th></tr></thead>
      <tbody>
        <tr><td>Reserva criada</td><td>O Pix no chat</td><td>—</td></tr>
        <tr><td>IA confirmou o comprovante</td><td>🔔 + ✉️ "Reserva confirmada"</td><td>🔔 + ✉️ "Reserva confirmada" (confirmada pela IA)</td></tr>
        <tr><td>Comprovante foi para análise</td><td>🔔 + ✉️ "Comprovante recebido"</td><td>🔔 + ✉️ "Comprovante para conferir" (com o que não passou)</td></tr>
        <tr><td>Imagem não é comprovante</td><td>Mensagem no chat</td><td>—</td></tr>
        <tr><td>Você confirma o pagamento</td><td>🔔 + ✉️ "Reserva confirmada"</td><td>🔔 + ✉️ todos, dizendo quem confirmou</td></tr>
        <tr><td>Reserva manual já paga</td><td>✉️ (se informou o e-mail)</td><td>🔔 + ✉️ todos</td></tr>
        <tr><td>Você recusa ou cancela</td><td>🔔 + ✉️ com o motivo</td><td>—</td></tr>
        <tr><td>Você pede novo comprovante</td><td>🔔</td><td>—</td></tr>
        <tr><td>Você responde no chat</td><td>🔔 com a mensagem</td><td>—</td></tr>
        <tr><td>Prazo de pagamento vence</td><td>— (as datas voltam a ficar livres)</td><td>—</td></tr>
        <tr><td>Você envia uma Novidade</td><td>🔔 e/ou ✉️, só quem pediu</td><td>—</td></tr>
      </tbody>
    </table>
    <p>O e-mail de confirmação traz a cabana, as datas e horários, o valor, o endereço e o link "Como chegar".</p>
    <p>Os avisos aos administradores vão para <b>todos</b> os administradores (no e-mail da conta de cada um) e também para o <b>e-mail extra</b> de <a href="#/admin/pix">Pix</a>, se preenchido.</p>
    <p><b>Para testar</b>: no Menu, grupo <b>Testar avisos</b>: e-mail, notificação e a simulação de uma reserva confirmada. Chegam só para você e explicam o motivo se algo falhar.</p>
    <p><b>Não chegou?</b> Confira se as notificações estão ligadas no Menu (e liberadas nas configurações do celular), se o app está instalado (iPhone) e se o e-mail não foi para o spam. Para ver a notificação, deixe o app em segundo plano.</p>`],["💬","Chat com a IA e conversas dos clientes",`
    <p>O <b>atendente virtual</b> (IA do Google) responde dúvidas, mostra os dias livres, faz reservas e envia o Pix. Ele já sabe as cabanas, preços, horários, dias livres dos próximos 60 dias, o endereço e a rota.</p>
    <p>Em <a href="#/admin/ia">Informações do chat (IA)</a> você escreve o resto: regras da casa, o que está incluso, animais, crianças, cancelamento… Quanto mais completo, melhor ele responde.</p>
    <p>Em <a href="#/admin/conversas">Conversas dos clientes</a> você lê todas as conversas e pode <b>responder como equipe</b>. O cliente recebe uma notificação e vê a mensagem com o selo "equipe". A IA passa a seguir o que você combinou.</p>
    <p>O ponto colorido indica que a última mensagem é do cliente. O ícone 📅 abre as reservas dele e o ícone verde, o WhatsApp.</p>
    <p>O cliente pode <b>arquivar</b> conversas (arrastando para a esquerda); arquivadas são apagadas depois de 30 dias.</p>
    <p><b>🙋 Falar com a equipe:</b> o cliente toca em 🙋 no topo da conversa (ou pede à IA "quero falar com uma pessoa"). Todos os administradores recebem <b>notificação e e-mail</b>; se ninguém responder em 15 minutos, chega um <b>lembrete</b>. A conversa aparece no topo de Conversas dos clientes, em "Chamando a equipe", e o Menu mostra 🙋 com o número de chamados.</p>
    <p>Toque em <b>Assumir</b> (ou simplesmente responda): o cliente vê quem está atendendo e a IA fica pausada. Toque em <b>Encerrar</b> para a IA voltar; ela também volta sozinha depois de 24 h sem mensagens. O horário da equipe (opcional) fica em <a href="#/admin/ia">Informações do chat (IA)</a>: fora dele o cliente é avisado e a notificação chega quando a equipe começar.</p>
    <p>Se o chat ficar lento ou parar, o Google pode ter trocado os modelos de IA: rode <b>Actions › Testar velocidade da IA</b> no GitHub.</p>`],["🏡","Cabanas, fotos e galeria",`
    <p>Em <a href="#/admin/cabanas">Cabanas e fotos das cabanas</a>: toque no <b>+</b> (canto de baixo) para criar quantas cabanas quiser (nome, descrição, capacidade, valores e posição na lista). Desligue <b>Ativa</b> para esconder; cabanas com reservas não podem ser excluídas.</p>
    <p><b>Valores:</b> cada cabana tem o valor normal (segunda a quinta) e, se quiser, um valor para <b>sexta, sábado e domingo</b> e outro para <b>feriados</b>. Vale o dia em que cada diária começa: de quinta a sábado são uma diária normal (quinta) e uma de fim de semana (sexta). Um feriado usa o valor de feriado; em branco, o de sexta a domingo. Sexta a domingo em branco = valor normal. O total é calculado pelo banco, e o cliente vê o detalhe antes de reservar.</p>
    <p><b>Feriados:</b> os nacionais (inclusive Carnaval, Sexta-feira Santa e Corpus Christi) entram sozinhos. Os da cidade você cadastra em <a href="#/admin/calendario">Calendário</a> › Feriados.</p>
    <p>Dentro de cada cabana, em <b>Fotos da cabana</b>: adicione várias fotos de uma vez. A foto com <b>⭐</b> é a principal: aparece no <b>carrossel do Início</b> e como capa. As outras ficam na página da cabana.</p>
    <p>Em <a href="#/admin/fotos">Fotos do carrossel e da galeria</a> ficam as fotos gerais (piscina, área comum, drone…), marcando se vão para o carrossel e/ou para a galeria.</p>
    <p>Todas as fotos são reduzidas no próprio celular antes do envio.</p>`],["🗓️","Calendário e dias disponíveis",`
    <p>Em <a href="#/admin/calendario">Calendário e dias disponíveis</a>:</p>
    <ul>
      <li><b>Ocupação</b>: o mês de cada cabana, com a porcentagem de ocupação. Toque num dia para ver a reserva (cliente, código, situação) ou para <b>fechar/abrir aquele dia</b> na hora.</li>
      <li><b>Abrir e fechar</b>: fecha ou abre um período para uma cabana ou todas (manutenção, eventos, férias). A lista mostra o que está programado; a lixeira remove.</li>
      <li><b>Feriados</b>: cadastre os da cidade. Os nacionais entram sozinhos. Nos feriados vale o valor de feriado de cada cabana.</li>
      <li><b>Regras</b>: sempre aberto (menos as exceções) ou só quando você abrir; dias da semana; mínimo e máximo de diárias; antecedência; horários de entrada e saída.</li>
    </ul>`],["🎨","Aparência, ícone e mapa",`
    <p>Em <a href="#/admin/aparencia">Aparência: cores e ícone</a>:</p>
    <ul>
      <li><b>Nome do app</b>, <b>cor do aplicativo</b> e <b>cor de fundo do ícone</b>.</li>
      <li><b>Logo do ícone</b>: toque no ícone para trocar. Logos em formato de selo ocupam o ícone e o fundo pega a cor do selo sozinho. Ajuste o <b>tamanho da logo</b> vendo a prévia do Android e do iPhone.</li>
      <li><b>Ilustração das telas</b>: o desenho do rodapé do Início e do meio das telas Reservas e Chat (quando estão vazias). Padrão: um passarinho amarelo. Toque na imagem para trocar; "Voltar ao passarinho padrão" desfaz.</li>
      <li><b>Texto de boas-vindas</b>, <b>endereço</b> e <b>Instagram</b>.</li>
      <li><b>📍 Marcar no mapa</b>: o local exato da chácara, usado no "Como chegar", nas rotas do Google Maps e do Waze, no e-mail e no chat.</li>
    </ul>
    <p>No app, a troca aparece na hora. O <b>ícone do app instalado</b> só muda na próxima publicação do site (até 3 horas), e os celulares guardam o ícone de quando foi instalado: remova e instale de novo para ver o novo.</p>`],["👥","Clientes, relatórios e histórico",`
    <ul>
      <li><a href="#/admin/clientes">Clientes</a>: cadastro (nome, celular, e-mail, região), quem quer novidades, busca e planilha.</li>
      <li><a href="#/admin/relatorios">Relatórios</a>: receita, reservas, diárias, ocupação por cabana, por mês, origem e região, em qualquer período, com planilha.</li>
      <li><a href="#/admin/historico">Histórico de hóspedes</a>: registro <b>permanente</b> de todas as hospedagens confirmadas. Não é apagado por nada (nem pela limpeza do chat, nem se o cliente excluir a conta).</li>
    </ul>`],["📣","Novidades",`
    <p>Em <a href="#/admin/novidades">Enviar novidades</a>: um título e uma mensagem, por e-mail e/ou notificação. Só recebem os clientes que marcaram "Quero receber novidades" no cadastro (a tela mostra quantos). Fica o registro do que foi enviado.</p>`],["🔒","Segurança e privacidade",`
    <ul>
      <li>Cada cliente vê só os próprios dados. As regras ficam no banco: esconder um botão no app nunca libera nada.</li>
      <li>As chaves (IA, Gmail, notificações) ficam só no servidor, nunca no app.</li>
      <li>Fotos de perfil e comprovantes ficam em pastas privadas.</li>
      <li>Conversas arquivadas são apagadas em 30 dias. O cliente pode excluir a conta (Perfil); o histórico de hospedagens continua, como explica a Política de Privacidade.</li>
      <li><b>Novo administrador</b>: a pessoa entra no app uma vez e você roda no SQL Editor do Supabase:<br><code>insert into public.admins (user_id) select id from auth.users where email = 'email@dela.com';</code></li>
    </ul>`]];async function Ne(s){s.innerHTML=`
    <input type="search" id="ajuda-busca" placeholder="Buscar na ajuda (ex.: notificação, Pix, ícone)">
    <div class="ajuda gap-top">${Me.map(([i,l,a],o)=>`
      <details class="ajuda-item" ${o===0?"open":""}>
        <summary><span class="li-ico">${i}</span><b>${p(l)}</b></summary>
        <div class="ajuda-txt">${a}</div>
      </details>`).join("")}</div>
    <p class="small muted center gap-top">Esta ajuda aparece só para administradores.</p>`;const e=ma(".ajuda-item",s);v("#ajuda-busca",s).addEventListener("input",i=>{const l=Ha(i.target.value);for(const a of e){const o=!l||Ha(a.textContent).includes(l);a.hidden=!o,l&&(a.open=o)}})}const Ha=s=>String(s??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();export{ce as ADMIN_SECOES,Ue as renderAdmin};
