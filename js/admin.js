import{sb as k,state as j,$ as p,$$ as ea,view as Xa,go as La,toast as L,fail as O,api as ia,busy as z,confirmDialog as B,promptDialog as Ka,loadConfig as oa,loadCabanas as sa,loadFotos as ua,publicUrl as Q,avatarUrl as Ya,applyBrand as ae,screenCached as va,screenUpdate as na,screenForget as I,screenForgetPrefix as Sa,marcaUrl as ee,loadFeriados as oe}from"./core.js";import{esc as v,filtrarClientes as se,fmtMoney as R,fmtDate as V,fmtDateTime as Z,parseMoney as ra,normalizeHex as Aa,inkOn as te,instagramUrl as ie,csv as fa,todayISO as F,addDays as X,STATUS as la,ORIGENS as Ta,fmtPhone as J,initials as Ma,MESES as ba,daysBetween as ca}from"./util.js";import{resizeForGallery as ne,makeIconSet as re,extOf as Pa,resizeLogo as ha,analisarLogo as le,abrirLogo as ce}from"./images.js";import{PIX_TYPES as ga,normalizePixKey as $a}from"./pix.js";import{statusBadge as de,openLightbox as Na,fab as za,ICON as me}from"./app.js";import{feriadoNacional as Ia,nomeFeriado as ja,estadia as pe}from"./precos.js";import{calendarioDatas as ue,calendarioPeriodo as ve}from"./calendario-datas.js";import{renderConversasAdmin as fe,renderConversaAdmin as be}from"./admin-conversas.js";import{marcarNoMapa as he}from"./map.js";const ge=[["reservas","✅","Reservas: conferir e validar"],["conversas","💬","Conversas dos clientes"],["calendario","🗓️","Calendário e dias disponíveis"],["cabanas","🏡","Cabanas e fotos das cabanas"],["fotos","🖼️","Fotos do carrossel e da galeria"],["clientes","👥","Clientes"],["relatorios","📊","Relatórios"],["historico","📚","Histórico de hóspedes"],["ia","🤖","Informações do chat (IA)"],["pix","💠","Pix e conferência do comprovante"],["aparencia","🎨","Aparência: cores e ícone"],["novidades","📣","Enviar novidades"],["ajuda","❓","Ajuda: como tudo funciona"]];async function oo(o,e=[]){const i=ge.find(([s])=>s===o);if(!i)return La("#/menu");if(o==="conversas"&&e[0])return be(e[0]);Xa().innerHTML=`
    <section class="admin">
      <header class="admin-head pad"><a href="#/menu" class="back">‹ Menu</a><h1 class="title">${i[1]} ${v(i[2])}</h1></header>
      <div class="pad" id="admin-body"><div class="loading">Carregando…</div></div>
    </section>`;const l=p("#admin-body"),a={reservas:ke,conversas:fe,calendario:Fa,cabanas:ma,fotos:Ne,clientes:ze,relatorios:Ie,historico:je,ia:Re,pix:Qa,aparencia:Ve,novidades:Ja,ajuda:Ge}[o];if(!a)return La("#/admin");await a(l)}async function U(o,e,i,l){const a=va(e);let s=!1;const t=()=>s=!0;o.addEventListener("input",t),a!==void 0&&l(a);let n;try{n=await i()}catch(d){if(a===void 0)throw d;return}na(e,n),o.isConnected&&(a===void 0||!s&&JSON.stringify(n)!==JSON.stringify(a))&&(o.removeEventListener("input",t),l(n))}const _a=(o,e,i="text/csv;charset=utf-8")=>{const l=document.createElement("a");l.href=URL.createObjectURL(new Blob([e],{type:i})),l.download=o,l.click(),setTimeout(()=>URL.revokeObjectURL(l.href),2e3)},Ra=o=>o?`https://wa.me/${encodeURIComponent(o)}`:"",Da=[["validar","🔎","Para conferir"],["proximas","🗓️","Próximas"],["aguardando_pagamento","⏳","Aguardando Pix"],["confirmada","✅","Confirmadas"],["todas","📋","Todas"],["cancelada","🚫","Canceladas"],["recusada","❌","Não confirmadas"],["expirada","⌛","Prazo encerrado"]],$e=["dom.","seg.","ter.","qua.","qui.","sex.","sáb."],_e=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Oa=o=>{const e=new Date(o+"T12:00:00Z");return{dia:String(e.getUTCDate()).padStart(2,"0"),mes:_e[e.getUTCMonth()],sem:$e[e.getUTCDay()]}},we='<svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1.2-1.1 2 .9c-.2 1.2-1.2 1.9-2.4 1.7-3-.6-5.5-3-6-6-.2-1.2.5-2.2 1.7-2.4l.9 2z"/></svg>';function xe(o){if(!["aguardando_pagamento","em_analise","confirmada"].includes(o.status))return"";const e=F();if(o.checkout<=e)return'<span class="ar-quando passado">Já saiu</span>';if(o.checkin<=e)return'<span class="ar-quando agora">🏡 Hospedado agora</span>';const i=ca(e,o.checkin);return`<span class="ar-quando">${i===1?"Entra amanhã":`Entra em ${i} dias`}</span>`}function ye(o){if(o.status!=="aguardando_pagamento"||!o.expira_em)return"";const e=Math.round((Date.parse(o.expira_em)-Date.now())/6e4);return e<=0?'<p class="ar-aviso warn">⏳ O prazo do Pix acabou; a reserva vai expirar sozinha.</p>':`<p class="ar-aviso warn">⏳ Esperando o Pix do cliente · prazo de <b>${e<60?`${e} min`:e<1440?`${Math.floor(e/60)} h ${e%60?`${e%60} min`:""}`:`${Math.floor(e/1440)} dia(s)`}</b></p>`}async function ke(o){const e=j.cabanas||va("vitrine")?.cabanas||await sa(),i=c=>e.find(m=>m.id===c)?.nome||"—";let l=sessionStorage.getItem("adm-filtro")||"validar";Da.some(([c])=>c===l)||(l="validar"),o.innerHTML=`
    <div class="ar-busca"><span aria-hidden="true">🔍</span><input id="f-busca" type="search" placeholder="Buscar por nome, código ou celular" autocomplete="off"><button type="button" id="limpar" aria-label="Limpar busca" hidden>✕</button></div>
    <div class="ar-filtros" role="tablist">${Da.map(([c,m,h])=>`<button type="button" role="tab" data-f="${c}" class="${c===l?"on":""}">${m} ${h}<b class="ar-n" data-n="${c}"></b></button>`).join("")}</div>
    <div class="ar-bulk" id="bulk" hidden></div>
    <div id="lista" class="ar-lista"></div>
    ${za("nova","Nova reserva")}`;const a=p("#f-busca"),s=sessionStorage.getItem("adm-busca");s&&(sessionStorage.removeItem("adm-busca"),a.value=s,l="todas");const t=()=>{o.querySelectorAll("[data-f]").forEach(c=>c.classList.toggle("on",c.dataset.f===l)),o.querySelector("[data-f].on")?.scrollIntoView({block:"nearest",inline:"center"})};t(),p("#limpar").hidden=!a.value;const n=async()=>{const{data:c}=await k.from("reservas").select("status,validada,checkout").in("status",["aguardando_pagamento","em_analise","confirmada"]).limit(2e3);if(!c||!o.isConnected)return;const m=F(),h={validar:c.filter(w=>w.status==="em_analise"||w.status==="confirmada"&&!w.validada).length,proximas:c.filter(w=>w.checkout>=m).length,aguardando_pagamento:c.filter(w=>w.status==="aguardando_pagamento").length};o.querySelectorAll("[data-n]").forEach(w=>{const x=h[w.dataset.n];w.textContent=x||"",w.classList.toggle("alerta",w.dataset.n==="validar"&&x>0)})};let d=[];const r=c=>l==="validar"?c.status==="em_analise"||c.status==="confirmada"&&!c.validada:l==="proximas"?["aguardando_pagamento","em_analise","confirmada"].includes(c.status)&&c.checkout>=F():l==="todas"||c.status===l,f=c=>{const m=new Map(c.map(h=>[h.id,h]));d=d.map(h=>m.get(h.id)||h).filter(r),Sa("adm-reservas:"),na(`adm-reservas:${l}:${a.value.trim()}`,d),$(d),n()},b={validar:["🎉","Tudo conferido!","Nenhum comprovante esperando e nenhuma reserva para validar."],proximas:["🌿","Nenhuma hospedagem pela frente","As próximas reservas aparecem aqui."]},$=c=>{d=c;const m=p("#lista");if(!m)return;const h=c.filter(q=>q.status==="confirmada"&&!q.validada),w=p("#bulk");if(w.hidden=h.length<2,w.innerHTML=`<span><b>${h.length} confirmadas</b> esperando a sua validação</span><button type="button" class="btn sm" id="validar-todas">Validar todas</button>`,m.dataset.ids=JSON.stringify(h.map(q=>q.id)),!c.length){const[q,y,C]=a.value.trim()?["🔍","Nada encontrado",'Confira o nome, o código ou o celular, ou procure em "Todas".']:b[l]||["📭","Nenhuma reserva aqui","Escolha outro filtro acima."];m.innerHTML=`<div class="ar-vazio"><span>${q}</span><h3>${y}</h3><p class="muted small">${C}</p></div>`;return}let x="";m.innerHTML=c.map(q=>{const y=q.checkin.slice(0,7),C=y!==x?`<h3 class="ar-mes">${ba[Number(y.slice(5))-1]} de ${y.slice(0,4)}</h3>`:"";return x=y,C+u(q)}).join("")},_=async()=>{const c=p("#lista"),m=a.value.trim(),h=l,w=`adm-reservas:${h}:${m}`,x=va(w);x?$(x):c.innerHTML='<div class="ar-esqueleto"><i></i><i></i></div>';let q=k.from("reservas").select("*").order("checkin",{ascending:h==="proximas"||h==="validar"}).limit(200);h==="validar"?q=q.or("status.eq.em_analise,and(status.eq.confirmada,validada.eq.false)"):h==="proximas"?q=q.in("status",["aguardando_pagamento","em_analise","confirmada"]).gte("checkout",F()):h!=="todas"&&(q=q.eq("status",h));const y=m.replace(/[,()%]/g,"");y&&(q=q.or(`nome_cliente.ilike.%${y}%,codigo.ilike.%${y}%,telefone_cliente.ilike.%${y.replace(/\D/g,"")||y}%`));const{data:C,error:P}=await q;if(P)return x?void 0:O(P);if(!c.isConnected||a.value.trim()!==m||l!==h)return na(w,C);JSON.stringify(C)!==JSON.stringify(x)&&$(C),na(w,C)},E=c=>c.resultado==="aprovado"?["ok","✅ Aprovado pela IA"]:c.resultado==="nao_e_comprovante"?["bad","❌ Não parece um comprovante"]:["warn","⚠️ A IA pediu para conferir"],u=c=>{const m=c.analise_ia,h=la[c.status]||{label:c.status,tone:""},w=Oa(c.checkin),x=Oa(c.checkout),q=c.telefone_cliente,y=["aguardando_pagamento","em_analise"].includes(c.status),C=y&&c.status==="em_analise"?["confirmar","✅ Confirmar pagamento"]:c.status==="confirmada"&&!c.validada?["validar","☑️ Validar reserva"]:y?["confirmar","✅ Confirmar pagamento"]:null,P=[c.comprovante_path?["ver","Comprovante",""]:null,c.status==="em_analise"?["pedir_novo","Pedir outro",""]:null,y?["recusar","Recusar","danger"]:null,c.status==="confirmada"?["cancelar","Cancelar","danger"]:null].filter(Boolean),[A,M]=m?.verificacoes?E(m):[];return`<article class="res-card adm-res t-${h.tone}" data-id="${c.id}">
      <div class="ar-head">
        <span class="ar-av">${v(Ma(c.nome_cliente))}</span>
        <div class="ar-tit"><h3>${v(c.nome_cliente)}</h3><span class="res-code" title="Feita em ${v(Z(c.criado_em))}">#${v(c.codigo)} · ${c.origem==="chat"?"💬 chat":c.origem==="admin"?"👤 equipe":"📱 app"} · ${new Date(c.criado_em).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}</span></div>
        <span class="res-status ${h.tone}">${v(h.label)}</span>
      </div>
      <div class="ar-cab"><span>🏡 <b>${v(i(c.cabana_id))}</b></span>${xe(c)}</div>
      <div class="res-dates">
        <div class="rd"><small>Entrada</small><strong>${w.dia} ${w.mes}</strong><span>${w.sem}</span></div>
        <div class="rd-mid"><span>${c.diarias} ${c.diarias===1?"noite":"noites"}</span></div>
        <div class="rd"><small>Saída</small><strong>${x.dia} ${x.mes}</strong><span>${x.sem}</span></div>
      </div>
      <div class="res-info"><span>${me.people} ${c.hospedes} ${c.hospedes===1?"pessoa":"pessoas"}</span><strong>${R(c.valor_centavos)}</strong></div>
      ${q||c.email_cliente?`<div class="ar-contato">
        ${q?`<a class="ar-ct whats" href="${Ra(q)}" target="_blank" rel="noopener noreferrer">${we}<span>${v(J(q))}</span></a>`:""}
        ${c.email_cliente?`<a class="ar-ct" href="mailto:${v(c.email_cliente)}">✉️<span>${v(c.email_cliente)}</span></a>`:""}
        ${c.regiao_cliente?`<span class="ar-ct sem">📍<span>${v(c.regiao_cliente)}</span></span>`:""}
      </div>`:""}
      ${ye(c)}
      ${c.status==="em_analise"?'<p class="ar-aviso info">🧾 O cliente enviou o comprovante. Confira no extrato do banco antes de confirmar.</p>':""}
      ${c.status==="confirmada"?c.validada?`<p class="ar-aviso ok">☑️ Validada em ${Z(c.validada_em)}</p>`:'<p class="ar-aviso warn">👀 Confirmada, esperando a sua validação (confira o Pix no extrato).</p>':""}
      ${c.motivo?`<p class="res-motivo">💬 ${v(c.motivo)}</p>`:""}
      ${m?.verificacoes?`<details class="ar-ia ${A}"><summary><span>${M}</span><small>ver detalhes</small></summary>
        <ul>${m.verificacoes.map(T=>`<li class="${T.ok?"ok":"bad"}"><i>${T.ok?"✓":"✗"}</i><span><b>${v(T.regra)}</b><small>${v(T.detalhe)}</small></span></li>`).join("")}</ul>
        ${m.extraido?.pagador_nome?`<p class="small">Pagador: <b>${v(m.extraido.pagador_nome)}</b>${m.extraido.destinatario_instituicao?` · ${v(m.extraido.destinatario_instituicao)}`:""}</p>`:""}
        ${m.extraido?.observacoes?`<p class="small muted">Obs.: ${v(m.extraido.observacoes)}</p>`:""}</details>`:""}
      ${C||P.length?`<div class="ar-acoes">
        ${C?`<button class="btn block" data-a="${C[0]}">${C[1]}</button>`:""}
        ${P.length?`<div class="ar-sec">${P.map(([T,S,N])=>`<button class="btn sm ghost ${N}" data-a="${T}">${S}</button>`).join("")}</div>`:""}
      </div>`:""}
    </article>`};o.querySelectorAll("[data-f]").forEach(c=>c.addEventListener("click",()=>{l!==c.dataset.f&&(l=c.dataset.f,sessionStorage.setItem("adm-filtro",l),t(),_())}));let g;a.addEventListener("input",()=>{p("#limpar").hidden=!a.value,clearTimeout(g),g=setTimeout(_,350)}),p("#limpar").addEventListener("click",()=>{a.value="",p("#limpar").hidden=!0,_(),a.focus()}),p("#nova").addEventListener("click",()=>Ee(e,()=>{Sa("adm-reservas:"),_(),n()})),p("#bulk").addEventListener("click",async c=>{const m=c.target.closest("#validar-todas");if(!m)return;const h=JSON.parse(p("#lista").dataset.ids||"[]");!h.length||!await B(`Validar ${h.length} reserva(s)?`,"Confirme que conferiu os pagamentos no extrato do banco.","Validar todas")||await z(m,async()=>{const w=[];for(const x of h)w.push((await ia("admin-reserva",{acao:"validar",reserva_id:x})).reserva);L("Reservas validadas.","ok"),f(w)})}),p("#lista").addEventListener("click",async c=>{const m=c.target.closest("[data-a]");if(!m)return;const h=m.closest(".adm-res").dataset.id,w=m.dataset.a;if(w==="ver"){await z(m,async()=>{const{data:q}=await k.from("reservas").select("comprovante_path").eq("id",h).single(),{data:y,error:C}=await k.storage.from("comprovantes").createSignedUrl(q.comprovante_path,600);if(C)throw C;Na([y.signedUrl])});return}let x;if(["recusar","cancelar","pedir_novo"].includes(w)){if(x=await Ka({recusar:"Recusar a reserva",cancelar:"Cancelar a reserva",pedir_novo:"Pedir outro comprovante"}[w],"Motivo (o cliente recebe esta mensagem)","","Enviar"),x===null)return}else if(w==="confirmar"&&!await B("Confirmar o pagamento?","O cliente recebe a confirmação por e-mail e notificação.","Confirmar"))return;await z(m,async()=>{const{reserva:q}=await ia("admin-reserva",{acao:w,reserva_id:h,motivo:x});L({confirmar:"Pagamento confirmado. O cliente foi avisado.",validar:"Reserva validada.",recusar:"Reserva recusada.",cancelar:"Reserva cancelada.",pedir_novo:"Pedido enviado ao cliente."}[w]||"Pronto.","ok"),f([q])})}),_(),n()}function Ee(o,e){const i=o.filter(m=>m.ativa),l=document.createElement("dialog");l.className="dialog cab-form",l.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head"><button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button><h3>Nova reserva</h3><span></span></header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Hospedagem</h4>
        <div class="pills">${i.map((m,h)=>`<label class="pill"><input type="radio" name="cabana_id" value="${m.id}" ${h===0?"checked":""}><span>${v(m.nome)}</span></label>`).join("")}</div>
        <input type="hidden" name="checkin"><input type="hidden" name="checkout">
        <p class="muted small" id="nr-dica"></p>
        <div class="calendar" id="nr-cal"></div>
        <div class="legend small"><span class="lg livre"></span>Livre <span class="lg reservado"></span>Reservado <span class="lg fechado"></span>Fechado para clientes <span class="lg-fer"></span>Feriado</div>
        <div class="regra-linha"><span><b>Pessoas</b><small id="nr-cap"></small></span>${K("hospedes",2,1,50,"")}</div>
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
        <div class="pills">
          <label class="pill"><input type="radio" name="tipo_cliente" value="cadastrado" checked><span>Já cadastrado</span></label>
          <label class="pill"><input type="radio" name="tipo_cliente" value="novo"><span>Novo cliente</span></label>
        </div>
        <div class="nr-cli" id="nr-cadastrado">
          <div class="nr-cli" id="nr-procura">
            <label class="field"><span>Buscar cliente</span><input type="search" id="nr-busca" placeholder="Nome, celular ou e-mail" autocomplete="off"></label>
            <div class="nr-lista" id="nr-lista"></div>
          </div>
          <div class="nr-sel" id="nr-escolhido" hidden></div>
        </div>
        <div class="nr-cli" id="nr-novo" hidden>
          <label class="field"><span>Nome</span><input name="nome" required minlength="2" maxlength="80" autocomplete="off"></label>
          <label class="field"><span>Celular</span><input name="telefone" inputmode="tel" placeholder="(61) 99999-9999"></label>
          <label class="field"><span>E-mail <small class="muted">(recebe a confirmação)</small></span><input name="email" type="email"></label>
        </div>
        <label class="field"><span>Observações</span><input name="obs" maxlength="500" placeholder="Ex.: pagou em dinheiro"></label>
      </section>
    </div>
    <footer class="cf-foot"><button class="btn block">Criar reserva</button></footer>
  </form>`,document.body.appendChild(l);const a=p("form",l),s=a.elements;p("[data-close]",l).onclick=()=>l.close();let t=j.feriados||[];oe().then(m=>{t=m,d(),r.desenhar()}).catch(()=>{});const n=()=>i.find(m=>m.id===s.cabana_id.value),d=()=>{const m=n(),h=p("#nr-calc",l);if(m&&(p("#nr-cap",l).textContent=`até ${m.capacidade} nesta cabana`),!m||!s.checkin.value||!s.checkout.value){h.textContent="Escolha as datas para ver o valor.";return}const{total:w,grupos:x}=pe(m,s.checkin.value,s.checkout.value,t),q=ca(s.checkin.value,s.checkout.value),y=[x.normal.n&&`${x.normal.n} normal`,x.fim_semana.n&&`${x.fim_semana.n} sex a dom`,x.feriado.n&&`${x.feriado.n} feriado`].filter(Boolean);h.innerHTML=`<span>${q} ${q===1?"diária":"diárias"}${y.length>1||x.fim_semana.n||x.feriado.n?` <small>(${y.join(" · ")})</small>`:""}</span><b>${R(w)}</b>`},r=ue(p("#nr-cal",l),p("#nr-dica",l),{cabana:s.cabana_id.value,carregar:async(m,h,w)=>{const{data:x,error:q}=await k.rpc("disponibilidade",{p_cabana:m,p_de:h,p_ate:w});if(q)throw q;return x},nomeFeriado:m=>ja(m,t),aoMudar:m=>{s.checkin.value=m.checkin,s.checkout.value=m.checkout,d()}});l.querySelectorAll("[name=cabana_id]").forEach(m=>m.addEventListener("change",()=>r.trocarCabana(s.cabana_id.value))),a.addEventListener("change",d),l.querySelectorAll(".stp [data-d]").forEach(m=>m.addEventListener("click",()=>{const h=m.closest(".stp"),w=p("input",h);w.value=Math.min(n()?.capacidade||50,Math.max(1,(Number(w.value)||0)+Number(m.dataset.d)))})),d();let f=null,b=!1,$=null;const _=p("#nr-busca",l),E=p("#nr-lista",l),u=m=>v([J(m.telefone),m.email].filter(Boolean).join(" · ")),g=()=>{if(b){E.innerHTML='<p class="muted small">Não foi possível carregar os clientes. Feche e abra de novo.</p>';return}if(!f){E.innerHTML='<p class="muted small">Carregando clientes…</p>';return}E.innerHTML=se(f,_.value).map(m=>`<button type="button" class="nr-item" data-id="${v(m.id)}"><b>${v(m.nome)}</b><small>${u(m)}</small></button>`).join("")||'<p class="muted small">Nenhum cliente encontrado. Se for a primeira vez dele, escolha Novo cliente.</p>'},c=m=>{$=m,p("#nr-procura",l).hidden=!!m;const h=p("#nr-escolhido",l);h.hidden=!m,h.innerHTML=m?`<span><b>${v(m.nome)}</b><small>${u(m)}</small></span><button type="button" class="btn sm ghost" data-trocar>Trocar</button>`:"",m||_.focus()};E.addEventListener("click",m=>{const h=m.target.closest("[data-id]")?.dataset.id;h&&c(f.find(w=>w.id===h))}),p("#nr-escolhido",l).addEventListener("click",m=>{m.target.closest("[data-trocar]")&&c(null)}),_.addEventListener("input",g),_.addEventListener("keydown",m=>{m.key==="Enter"&&m.preventDefault()}),l.querySelectorAll("[name=tipo_cliente]").forEach(m=>m.addEventListener("change",()=>{const h=s.tipo_cliente.value==="cadastrado";p("#nr-cadastrado",l).hidden=!h,p("#nr-novo",l).hidden=h})),g(),Promise.all([k.from("perfis").select("id,nome,telefone,email").order("nome").limit(2e3),k.from("admins").select("user_id")]).then(([m,h])=>{if(m.error||h.error)throw m.error||h.error;const w=new Set(h.data.map(x=>x.user_id));f=m.data.filter(x=>!w.has(x.id))}).catch(()=>{b=!0}).finally(g),a.addEventListener("submit",async m=>{m.preventDefault();const h=(y,C)=>{y?.focus(),L(C,"bad")};if(!s.cabana_id.value)return h(null,"Escolha a cabana.");if(!s.checkin.value||!s.checkout.value||s.checkout.value<=s.checkin.value)return h(null,"Escolha a entrada e a saída no calendário.");const w=s.tipo_cliente.value==="cadastrado";if(w&&!$)return h(_,"Escolha o cliente cadastrado.");if(!w&&s.nome.value.trim().length<2)return h(s.nome,"Escreva o nome do cliente.");if(!w&&s.email.value.trim()&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email.value.trim()))return h(s.email,"Confira o e-mail do cliente.");const x=Number(s.hospedes.value);if(!Number.isInteger(x)||x<1)return h(s.hospedes,"Confira o número de pessoas.");if(x>n().capacidade)return h(s.hospedes,`Esta cabana recebe até ${n().capacidade} pessoas.`);const q=s.valor.value.trim()?ra(s.valor.value):void 0;if(q===null)return h(s.valor,"Valor inválido.");await z(a.querySelector(".cf-foot .btn"),async()=>{await ia("admin-reserva",{acao:"criar",cabana_id:s.cabana_id.value,checkin:s.checkin.value,checkout:s.checkout.value,hospedes:Number(s.hospedes.value),...w?{cliente_id:$.id}:{nome:s.nome.value,telefone:s.telefone.value,email:s.email.value},valor_centavos:q,confirmada:s.confirmada.checked,motivo:s.obs.value}),L("Reserva criada.","ok"),l.close(),e()})}),l.addEventListener("close",()=>l.remove()),l.showModal()}const qe=[["ocupacao","🗓️","Ocupação"],["periodos","🔒","Abrir e fechar"],["feriados","🎉","Feriados"],["regras","⚙️","Regras"]];let wa="ocupacao",xa=null;const da=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],ya=o=>new Date(o+"T12:00:00Z").getUTCDay(),ta=o=>ba[Number(o.slice(5,7))-1].slice(0,3);function ka(o,e){const i=Number(o.slice(8)),l=Number(e.slice(8));return o===e?`${i} de ${ta(o)}.`:o.slice(0,7)===e.slice(0,7)?`${i} a ${l} de ${ta(e)}.`:`${i} de ${ta(o)}. a ${l} de ${ta(e)}.`}const K=(o,e,i,l,a)=>`<div class="stp" data-min="${i}" data-max="${l}">
  <button type="button" data-d="-1" aria-label="Menos">−</button>
  <input type="number" name="${o}" min="${i}" max="${l}" value="${e}" inputmode="numeric">
  <button type="button" data-d="1" aria-label="Mais">+</button><small>${a}</small></div>`;async function Fa(o){await U(o,"adm-calendario",async()=>{const[e,i,{data:l,error:a},s]=await Promise.all([oa(!0),sa(!0),k.from("calendario").select("*").gte("fim",F()).order("inicio"),k.from("feriados").select("data,nome").gte("data",F()).order("data")]);if(a)throw a;return{cfg:e,cabs:i,periodos:l,feriados:s.error?null:s.data}},e=>{o.innerHTML=`
      <div class="cal-abas" role="tablist">${qe.map(([a,s,t])=>`<button type="button" role="tab" data-aba="${a}" class="${a===wa?"on":""}"><span>${s}</span>${t}</button>`).join("")}</div>
      <div id="cal-pane"></div>`;const i=p("#cal-pane",o),l=a=>{wa=a,o.querySelectorAll("[data-aba]").forEach(s=>s.classList.toggle("on",s.dataset.aba===a)),{ocupacao:Ce,periodos:Se,feriados:Ae,regras:Te}[a](i,e,()=>Fa(o))};o.querySelectorAll("[data-aba]").forEach(a=>a.addEventListener("click",()=>l(a.dataset.aba))),l(wa)})}const Y=o=>{I("adm-calendario"),o()};function Ce(o,{cabs:e,feriados:i},l){const a=e.filter(s=>s.ativa);if(!a.length){o.innerHTML='<div class="card center"><p class="muted">Cadastre uma cabana em <a href="#/admin/cabanas">Cabanas</a> para ver a ocupação.</p></div>';return}o.innerHTML='<div id="mapa"><div class="loading">Carregando…</div></div>',Ha(p("#mapa",o),a,i||[],xa||F().slice(0,7),l)}async function Ha(o,e,i,l,a){xa=l;const[s,t]=l.split("-").map(Number),n=`${l}-01`,d=new Date(Date.UTC(s,t,0)).getUTCDate(),r=`${l}-${String(d).padStart(2,"0")}`,f=F(),[{data:b},$]=await Promise.all([k.from("reservas").select("id,cabana_id,checkin,checkout,status,nome_cliente,codigo,hospedes").in("status",["aguardando_pagamento","em_analise","confirmada"]).lte("checkin",r).gt("checkout",n),Promise.all(e.map(A=>k.rpc("disponibilidade",{p_cabana:A.id,p_de:n,p_ate:r}).then(M=>M.data||[])))]);if(!o.isConnected||xa!==l)return;const _=Array.from({length:d},(A,M)=>`${l}-${String(M+1).padStart(2,"0")}`),E=e.map((A,M)=>_.map(T=>{const S=(b||[]).find(N=>N.cabana_id===A.id&&T>=N.checkin&&T<N.checkout);return{d:T,r:S,sit:S?S.status:$[M].find(N=>N.dia===T)?.situacao||"passado"}})),u=E.flat(),g=u.filter(A=>A.r).length,c=u.filter(A=>A.sit==="livre").length,m=u.filter(A=>A.sit==="fechado").length,h=g+c,w=h?Math.round(g/h*100):0,x=new Date(Date.UTC(s,t-2,1)).toISOString().slice(0,7),q=new Date(Date.UTC(s,t,1)).toISOString().slice(0,7),y=A=>Le(A,i);o.innerHTML=`
    <div class="occ-head">
      <button type="button" class="icon-btn" data-m="${x}" aria-label="Mês anterior">‹</button>
      <div class="occ-mes"><strong>${ba[t-1]} de ${s}</strong>${l!==f.slice(0,7)?`<button type="button" class="link-btn" data-m="${f.slice(0,7)}">voltar para hoje</button>`:""}</div>
      <button type="button" class="icon-btn" data-m="${q}" aria-label="Próximo mês">›</button>
    </div>
    <div class="occ-kpis">
      <div class="occ-kpi destaque"><b>${w}%</b><small>ocupação</small><i style="--p:${w}%"></i></div>
      <div class="occ-kpi"><b>${g}</b><small>noites reservadas</small></div>
      <div class="occ-kpi"><b>${c}</b><small>noites livres</small></div>
      <div class="occ-kpi"><b>${m}</b><small>fechadas</small></div>
    </div>
    <div class="occ-card">
      <div class="occ-wrap"><table class="occ">
        <thead><tr><th class="occ-nome"></th>${_.map(A=>{const M=ya(A);return`<th class="${M===0||M===6?"fds":""} ${A===f?"hoje":""} ${y(A)?"fer":""}" title="${v(y(A)||"")}"><small>${da[M][0]}</small>${Number(A.slice(8))}</th>`}).join("")}</tr></thead>
        <tbody>${e.map((A,M)=>`<tr><th class="occ-nome">${v(A.nome)}</th>${E[M].map((T,S)=>{const N=T.r&&(T.d===T.r.checkin||S===0),D=T.r&&(X(T.d,1)===T.r.checkout||S===d-1);return`<td><button type="button" class="occ-c occ-${T.sit} ${N?"ini":""} ${D?"fim":""} ${T.d===f?"hoje":""}" data-c="${M}" data-i="${S}" aria-label="${v(A.nome)} ${V(T.d)}"></button></td>`}).join("")}</tr>`).join("")}</tbody></table></div>
      <div class="occ-legenda small">
        <span><i class="occ-confirmada"></i>Confirmada</span><span><i class="occ-aguardando_pagamento"></i>Aguardando Pix</span>
        <span><i class="occ-em_analise"></i>Em análise</span><span><i class="occ-livre"></i>Livre</span><span><i class="occ-fechado"></i>Fechado</span>
      </div>
    </div>
    <div id="occ-info" class="occ-info"><p class="small muted">👆 Toque num dia para ver a reserva ou para abrir e fechar a data.</p></div>`,o.querySelectorAll("[data-m]").forEach(A=>A.addEventListener("click",()=>{o.querySelector(".occ-card")?.classList.add("carregando"),Ha(o,e,i,A.dataset.m,a)}));const C=p("#occ-info",o);o.querySelector(".occ").addEventListener("click",A=>{const M=A.target.closest(".occ-c");if(!M)return;o.querySelectorAll(".occ-c.sel").forEach(D=>D.classList.remove("sel")),M.classList.add("sel");const T=e[Number(M.dataset.c)],S=E[Number(M.dataset.c)][Number(M.dataset.i)],N=`<div class="occ-info-tit"><b>${v(T.nome)}</b><span>${da[ya(S.d)]}, ${V(S.d)}${y(S.d)?` · 🎉 ${v(y(S.d))}`:""}</span></div>`;if(S.r)C.innerHTML=`${N}<div class="occ-info-res">${de(S.r.status)}
        <p><b>${v(S.r.nome_cliente)}</b> · ${S.r.hospedes} pessoa(s)</p>
        <p class="small muted">Reserva ${v(S.r.codigo)} · ${ka(S.r.checkin,X(S.r.checkout,-1))} (saída ${V(S.r.checkout)})</p>
        <a class="btn sm ghost" href="#/admin/reservas">Ver em Reservas ›</a></div>`;else if(S.sit==="livre"||S.sit==="fechado"){const D=S.sit==="livre";C.innerHTML=`${N}<p class="occ-info-sit ${S.sit}">${D?"🟢 Livre para reservar":"⚪ Fechado para reservas"}</p>
        <button type="button" class="btn sm ${D?"ghost danger":""}" id="occ-acao">${D?"🔒 Fechar este dia":"🔓 Abrir este dia"}</button>`,p("#occ-acao",C).addEventListener("click",pa=>z(pa.currentTarget,async()=>{const{error:G}=await k.from("calendario").insert({cabana_id:T.id,tipo:D?"fechado":"aberto",inicio:S.d,fim:S.d,motivo:null});if(G)throw G;L(D?"Dia fechado.":"Dia aberto.","ok"),Y(a)}))}else C.innerHTML=`${N}<p class="small muted">${S.d<f?"Data que já passou.":"Fora do prazo de reservas (veja em Regras)."}</p>`;C.scrollIntoView({block:"nearest",behavior:"smooth"})});const P=o.querySelector("thead th.hoje");P&&(o.querySelector(".occ-wrap").scrollLeft=Math.max(0,P.offsetLeft-140))}const Le=(o,e)=>e.find(i=>i.data===o)?.nome||Ia(o);function Se(o,{cabs:e,periodos:i,feriados:l},a){const s=r=>r?e.find(f=>f.id===r)?.nome||"—":"Todas as cabanas";o.innerHTML=`
    <form id="periodo" class="cal-card stack">
      <h3>Novo período</h3>
      <div class="tipo-escolha" role="radiogroup">
        <label><input type="radio" name="tipo" value="fechado" checked><span><b>🔒 Fechar</b><small>Ninguém reserva nesses dias</small></span></label>
        <label><input type="radio" name="tipo" value="aberto"><span><b>🔓 Abrir</b><small>Libera dias que estavam fechados</small></span></label>
      </div>
      <div class="field"><span>Cabana</span>
        <div class="pills">${[["","Todas"],...e.map(r=>[r.id,r.nome])].map(([r,f],b)=>`<label class="pill"><input type="radio" name="cab" value="${r}" ${b===0?"checked":""}><span>${v(f)}</span></label>`).join("")}</div></div>
      <div class="field"><span>Dias</span>
        <p class="muted small" id="per-dica"></p>
        <div class="calendar" id="per-cal"></div>
        <input type="hidden" name="ini"><input type="hidden" name="fim">
      </div>
      <p class="per-resumo small" id="per-resumo"></p>
      <label class="field"><span>Motivo <small class="muted">(opcional)</small></span><input name="motivo" maxlength="120" placeholder="Ex.: manutenção"></label>
      <div class="pills sm">${["Manutenção","Evento particular","Férias","Reforma"].map(r=>`<button type="button" class="pill-btn" data-mot="${r}">${r}</button>`).join("")}</div>
      <button class="btn block">Salvar período</button>
    </form>
    <h3 class="cal-sub">Programados <span class="seg-n">${(i||[]).length}</span></h3>
    <div class="per-lista">${(i||[]).map(r=>{const f=ca(r.inicio,r.fim)+1;return`<article class="per-item ${r.tipo}" data-id="${r.id}">
        <span class="per-ico">${r.tipo==="aberto"?"🔓":"🔒"}</span>
        <div class="grow"><b>${ka(r.inicio,r.fim)}</b> <span class="small muted">· ${f} dia${f>1?"s":""}</span>
          <p class="small muted">${r.tipo==="aberto"?"Aberto":"Fechado"} · ${v(s(r.cabana_id))}${r.motivo?" · "+v(r.motivo):""}</p></div>
        <button type="button" class="icon-btn danger" data-del aria-label="Remover período" title="Remover">🗑️</button></article>`}).join("")||'<div class="cal-vazio"><span>📅</span><p class="muted small">Nenhum período programado. Todos os dias seguem as Regras.</p></div>'}</div>`;const t=p("#periodo",o),n=t.elements;ve(p("#per-cal",o),p("#per-dica",o),{nomeFeriado:r=>ja(r,l||[]),aoMudar:r=>{n.ini.value=r.ini,n.fim.value=r.fim,d(),t.dispatchEvent(new Event("input",{bubbles:!0}))}});const d=()=>{const r=p("#per-resumo",o);if(!n.ini.value||!n.fim.value)return r.textContent="";const f=ca(n.ini.value,n.fim.value)+1,b=n.tipo.value==="fechado"?"Fecha":"Abre",$=n.cab.value?e.find(_=>_.id===n.cab.value)?.nome:"todas as cabanas";r.innerHTML=`${b} <b>${ka(n.ini.value,n.fim.value)}</b> (${f} dia${f>1?"s":""}) para <b>${v($)}</b>.`};t.addEventListener("change",d),o.querySelectorAll("[data-mot]").forEach(r=>r.addEventListener("click",()=>{n.motivo.value=r.dataset.mot})),t.addEventListener("submit",async r=>{if(r.preventDefault(),!n.ini.value)return L("Toque no calendário no primeiro e no último dia.","bad");if(!n.fim.value)return L("Toque no último dia (para um dia só, toque de novo no mesmo dia).","bad");await z(t.querySelector(".btn.block"),async()=>{const{error:f}=await k.from("calendario").insert({cabana_id:n.cab.value||null,tipo:n.tipo.value,inicio:n.ini.value,fim:n.fim.value,motivo:n.motivo.value.trim()||null});if(f)throw f;L("Período salvo.","ok"),Y(a)})}),o.querySelectorAll("[data-del]").forEach(r=>r.addEventListener("click",async()=>{await B("Remover o período?","Os dias voltam a seguir as Regras do calendário.","Remover",!0)&&await z(r,async()=>{const{error:f}=await k.from("calendario").delete().eq("id",r.closest("[data-id]").dataset.id);if(f)throw f;L("Período removido.","ok"),Y(a)})}))}function Ae(o,{feriados:e},i){const l=[];for(let s=F(),t=0;t<366;t++,s=X(s,1)){const n=Ia(s);n&&l.push({data:s,nome:n})}const a=(s,t)=>`<div class="fer-item" ${t?`data-fer="${s.data}"`:""}>
    <span class="fer-data"><b>${Number(s.data.slice(8))}</b><small>${ta(s.data)}</small></span>
    <span class="grow"><b>${v(s.nome)}</b><small class="muted">${da[ya(s.data)]} · ${s.data.slice(0,4)}</small></span>
    ${t?'<button type="button" class="icon-btn danger" data-del-fer aria-label="Remover feriado" title="Remover">🗑️</button>':""}</div>`;o.innerHTML=`
    <div class="cal-card">
      <p class="small muted">Nos feriados vale o <b>valor de feriado</b> de cada cabana (em <a href="#/admin/cabanas">Cabanas</a> › Editar). Os nacionais entram sozinhos; cadastre aqui os da cidade.</p>
      ${e===null?'<p class="warn small">Rode o arquivo supabase/007_precos_fim_semana.sql no Supabase para cadastrar feriados.</p>':`
      <form id="feriado" class="fer-form">
        <label class="field"><span>Data</span><input type="date" name="data" required min="${F()}"></label>
        <label class="field grow"><span>Nome</span><input name="nome" required minlength="2" maxlength="60" placeholder="Ex.: Aniversário da cidade"></label>
        <button class="btn">Adicionar</button>
      </form>`}
    </div>
    ${e===null?"":`<h3 class="cal-sub">Da cidade <span class="seg-n">${e.length}</span></h3>
    <div class="fer-lista">${e.map(s=>a(s,!0)).join("")||'<div class="cal-vazio"><span>🎉</span><p class="muted small">Nenhum feriado da cidade cadastrado.</p></div>'}</div>`}
    <details class="fer-nac"><summary>🇧🇷 Nacionais, entram sozinhos <span class="seg-n">${l.length}</span></summary>
      <div class="fer-lista nac">${l.map(s=>a(s,!1)).join("")}</div></details>`,p("#feriado",o)?.addEventListener("submit",async s=>{s.preventDefault();const t=s.currentTarget.elements;await z(s.currentTarget.querySelector("button"),async()=>{const{error:n}=await k.from("feriados").insert({data:t.data.value,nome:t.nome.value.trim()});if(n)throw new Error(/duplicate|unique/i.test(n.message)?"Essa data já está cadastrada.":n.message);j.feriados=null,L("Feriado adicionado.","ok"),Y(i)})}),o.querySelectorAll("[data-del-fer]").forEach(s=>s.addEventListener("click",async()=>{await B("Remover o feriado?","Essa data volta a ser cobrada como um dia comum.","Remover",!0)&&await z(s,async()=>{const{error:t}=await k.from("feriados").delete().eq("data",s.closest("[data-fer]").dataset.fer);if(t)throw t;j.feriados=null,Y(i)})}))}function Te(o,{cfg:e},i){o.innerHTML=`
    <form id="regras" class="stack">
      <section class="cal-card stack">
        <h3>Como o calendário funciona</h3>
        <div class="tipo-escolha col" role="radiogroup">
          <label><input type="radio" name="modo" value="aberto" ${e.modo_calendario!=="fechado"?"checked":""}><span><b>✅ Sempre aberto</b><small>Todos os dias da semana marcados abaixo ficam livres. Você fecha só as exceções em "Abrir e fechar".</small></span></label>
          <label><input type="radio" name="modo" value="fechado" ${e.modo_calendario==="fechado"?"checked":""}><span><b>🔐 Só quando eu abrir</b><small>Tudo fica fechado; só os períodos que você abrir podem ser reservados.</small></span></label>
        </div>
        <div class="field" id="dows"><span>Dias da semana em que a diária pode começar</span>
          <div class="dow-pills">${da.map((t,n)=>`<label><input type="checkbox" name="dow" value="${n}" ${e.dias_semana.includes(n)?"checked":""}><span>${t}</span></label>`).join("")}</div></div>
      </section>
      <section class="cal-card stack">
        <h3>Estadia</h3>
        <div class="regra-linha"><span><b>Mínimo</b><small>de diárias por reserva</small></span>${K("min",e.min_diarias,1,30,"")}</div>
        <div class="regra-linha"><span><b>Máximo</b><small>de diárias por reserva</small></span>${K("max",e.max_diarias,1,90,"")}</div>
        <div class="regra-linha"><span><b>Antecedência</b><small>dias à frente que podem ser reservados</small></span>${K("ante",e.antecedencia_max_dias,7,730,"")}</div>
      </section>
      <section class="cal-card stack">
        <h3>Horários</h3>
        <div class="datas-2">
          <label class="field"><span>🔑 Entrada a partir de</span><input type="time" name="cin" value="${v(e.checkin_hora)}"></label>
          <label class="field"><span>👋 Saída até</span><input type="time" name="cout" value="${v(e.checkout_hora)}"></label>
        </div>
      </section>
      <button class="btn block">Salvar regras</button>
    </form>`;const l=p("#regras",o),a=l.elements,s=()=>p("#dows",o).classList.toggle("apagado",a.modo.value==="fechado");l.addEventListener("change",s),s(),o.querySelectorAll(".stp [data-d]").forEach(t=>t.addEventListener("click",()=>{const n=t.closest(".stp"),d=p("input",n);d.value=Math.min(Number(n.dataset.max),Math.max(Number(n.dataset.min),(Number(d.value)||0)+Number(t.dataset.d)))})),l.addEventListener("submit",async t=>{t.preventDefault();const n=Number(a.min.value),d=Number(a.max.value),r=Number(a.ante.value);if(!(n>=1&&n<=30)||!(d>=1&&d<=90)||!(r>=7&&r<=730))return L("Confira os números da estadia.","bad");if(d<n)return L("O máximo precisa ser maior ou igual ao mínimo.","bad");const f=ea('input[name="dow"]:checked',l).map(b=>Number(b.value));if(a.modo.value==="aberto"&&!f.length)return L("Marque pelo menos um dia da semana.","bad");await z(l.querySelector(".btn.block"),async()=>{const{error:b}=await k.from("configuracoes").update({modo_calendario:a.modo.value,dias_semana:f,min_diarias:n,max_diarias:d,antecedencia_max_dias:r,checkin_hora:a.cin.value,checkout_hora:a.cout.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(b)throw b;await oa(!0),L("Regras salvas.","ok"),Y(i)})})}async function Va(o,e,i=()=>{}){const l=[];let a=0;for(const s of o){i(`Reduzindo e enviando ${++a} de ${o.length}…`);const{big:t,mini:n}=await ne(s),d=crypto.randomUUID(),r=`fotos/${d}.${Pa(t)}`,f=`fotos/${d}-mini.${Pa(n)}`,b=await k.storage.from("fotos").upload(r,t,{contentType:t.type});if(b.error)throw b.error;const $=await k.storage.from("fotos").upload(f,n,{contentType:n.type});if($.error)throw $.error;const{data:_,error:E}=await k.from("fotos").insert({path:r,mini_path:f,...e}).select("*").single();if(E)throw E;l.push(_)}return i(""),j.fotos=null,I("adm-cabanas"),I("adm-fotos"),l}async function aa(o){const{error:e}=await k.rpc("definir_foto_principal",{p_foto:o});if(e)throw/definir_foto_principal|function/i.test(e.message)?new Error("Rode o arquivo supabase/003_foto_principal.sql no Supabase para usar a foto principal."):e;j.fotos=null,I("adm-cabanas"),I("adm-fotos")}async function ma(o){await U(o,"adm-cabanas",async()=>{const[e,i]=await Promise.all([sa(!0),ua(!0)]);return{cabs:e,todas:i}},({cabs:e,todas:i})=>{const l=a=>{const s=i.filter(t=>t.cabana_id===a.id).sort((t,n)=>(n.principal===!0)-(t.principal===!0)||t.ordem-n.ordem)[0];return s?`<img src="${v(Q("fotos",s.mini_path))}" alt="">`:'<span class="cab-sem-foto">Sem foto</span>'};o.innerHTML=`
    ${za("add","Nova cabana")}
    <div class="list-cards cab-lista">${e.map(a=>`<article class="card cab-adm" data-id="${a.id}">
      <div class="cab-adm-capa">${l(a)}</div>
      <div class="grow">
        <div class="row between"><h3>${v(a.nome)}</h3>${a.ativa?'<span class="badge ok">Ativa</span>':'<span class="badge muted">Desativada</span>'}</div>
        <p class="small">Até ${a.capacidade} pessoas · ${R(a.preco_diaria_centavos)} a diária</p>
        ${[a.preco_fim_semana_centavos!=null?`Sex a dom ${R(a.preco_fim_semana_centavos)}`:"",a.preco_feriado_centavos!=null?`Feriado ${R(a.preco_feriado_centavos)}`:""].filter(Boolean).map(s=>`<span class="badge">${s}</span>`).join(" ")}
        <p class="small muted">📷 ${i.filter(s=>s.cabana_id===a.id).length} foto(s)</p>
        <button class="btn sm ghost" data-edit>Editar dados e fotos</button>
      </div></article>`).join("")||'<p class="muted">Toque no + para cadastrar a primeira cabana.</p>'}</div>`,p("#add").addEventListener("click",()=>Ea(null,o)),o.querySelectorAll("[data-edit]").forEach(a=>a.addEventListener("click",()=>Ea(e.find(s=>s.id===a.closest("[data-id]").dataset.id),o)))})}function Ea(o,e){const i=document.createElement("dialog");i.className="dialog cab-form";const l=b=>b==null?"":(b/100).toFixed(2).replace(".",","),a=o?.capacidade??2,s=o?.descricao||"";i.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head">
      <button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button>
      <h3>${o?"Editar cabana":"Nova cabana"}</h3>
      <span></span>
    </header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Sobre a cabana</h4>
        <label class="field"><span>Nome</span><input name="nome" required minlength="2" maxlength="60" value="${v(o?.nome)}" placeholder="Ex.: Cabana do Lago" autocomplete="off"></label>
        <label class="field"><span>Descrição</span><textarea name="descricao" rows="4" maxlength="2000" placeholder="O que tem, camas, vista, comodidades…">${v(s)}</textarea>
          <small class="cf-count"><b>${s.length}</b>/2000</small></label>
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
            <div class="cf-money"><i>R$</i><input name="preco" required inputmode="decimal" placeholder="0,00" value="${l(o?.preco_diaria_centavos)}"></div></label>
          <label class="cf-preco"><span>Sexta a domingo</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fds" inputmode="decimal" placeholder="Igual ao normal" value="${l(o?.preco_fim_semana_centavos)}"></div></label>
          <label class="cf-preco"><span>Feriados</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fer" inputmode="decimal" placeholder="Igual a sex a dom" value="${l(o?.preco_feriado_centavos)}"></div></label>
        </div>
        <p class="cf-sim small" id="cf-sim"></p>
        <p class="small muted">Feriados nacionais entram sozinhos (inclusive Carnaval e Corpus Christi). Os da cidade você cadastra em <a href="#/admin/calendario">Calendário</a>. Um feriado usa o valor de feriado; em branco, o de sexta a domingo.</p>
      </section>

      <section class="cf-card">
        <h4><span class="cf-ico">👁️</span> Exibição</h4>
        <label class="cf-switch"><span><b>Ativa</b><small>Aparece para os clientes e pode ser reservada</small></span>
          <input type="checkbox" name="ativa" ${o?.ativa!==!1?"checked":""}><i></i></label>
        <label class="field cf-ordem"><span>Posição na lista</span><input type="number" name="ordem" value="${o?.ordem??0}"><small class="muted">As de número menor aparecem primeiro.</small></label>
      </section>

      ${o?`<section class="cf-card cab-fotos">
        <h4><span class="cf-ico">📷</span> Fotos da cabana</h4>
        <p class="small muted">A foto com ⭐ é a <strong>principal</strong>: aparece no carrossel do início e como capa da cabana. As outras ficam na página da cabana.</p>
        <div class="cab-fotos-grid" id="cab-fotos"><div class="loading">Carregando…</div></div>
        <label class="btn ghost sm">📷 Adicionar fotos<input type="file" accept="image/*" multiple hidden id="cab-up"></label>
        <p class="small muted" id="cab-prog"></p>
      </section>
      <button type="button" class="cf-del" data-del>🗑️ Excluir cabana</button>`:'<p class="small muted center">Depois de salvar, você já adiciona as fotos da cabana.</p>'}
    </div>
    <footer class="cf-foot"><button class="btn block">${o?"Salvar alterações":"Salvar e adicionar fotos"}</button></footer>
  </form>`,document.body.appendChild(i);const t=p("form",i),n=t.elements;p("[data-close]",i).onclick=()=>i.close(),o&&Me(o,i),n.descricao.addEventListener("input",()=>p(".cf-count b",i).textContent=n.descricao.value.length);const d=p(".cf-stepper output",i);i.querySelectorAll("[data-step]").forEach(b=>b.addEventListener("click",()=>{const $=Math.min(50,Math.max(1,Number(n.capacidade.value)+Number(b.dataset.step)));n.capacidade.value=$,d.innerHTML=`<b>${$}</b> ${$===1?"pessoa":"pessoas"}`}));const r=b=>b.trim()?ra(b)??void 0:null,f=()=>{const b=ra(n.preco.value),$=p("#cf-sim",i);if(b===null)return $.textContent="";const _=r(n.preco_fds.value),E=r(n.preco_fer.value),u=_??b;$.innerHTML=`<b>Exemplo:</b> quinta a sábado (2 diárias) = ${R(b)} + ${R(u)} = <b>${R(b+u)}</b>`+(E!=null?` · uma diária de feriado = <b>${R(E)}</b>`:"")};["preco","preco_fds","preco_fer"].forEach(b=>n[b].addEventListener("input",f)),f(),t.addEventListener("submit",async b=>{b.preventDefault();const $=(c,m)=>{c.focus(),L(m,"bad")};if(n.nome.value.trim().length<2)return $(n.nome,"Escreva o nome da cabana.");const _=ra(n.preco.value);if(_===null)return $(n.preco,"Valor da diária inválido.");const E=r(n.preco_fds.value);if(E===void 0)return $(n.preco_fds,"Valor de sexta a domingo inválido.");const u=r(n.preco_fer.value);if(u===void 0)return $(n.preco_fer,"Valor de feriado inválido.");const g={nome:n.nome.value.trim(),descricao:n.descricao.value.trim()||null,capacidade:Number(n.capacidade.value),preco_diaria_centavos:_,ordem:Number(n.ordem.value)||0,ativa:n.ativa.checked};(E!==null||o?.preco_fim_semana_centavos!=null)&&(g.preco_fim_semana_centavos=E),(u!==null||o?.preco_feriado_centavos!=null)&&(g.preco_feriado_centavos=u),await z(t.querySelector(".cf-foot .btn"),async()=>{const{data:c,error:m}=o?await k.from("cabanas").update(g).eq("id",o.id).select("*").single():await k.from("cabanas").insert(g).select("*").single();if(m)throw/preco_fim_semana|preco_feriado/.test(m.message)?new Error("Rode o arquivo supabase/007_precos_fim_semana.sql no Supabase para usar os valores de fim de semana e feriado."):m;j.cabanas=null,I("vitrine"),i.close(),I("adm-cabanas"),ma(e),o?L("Cabana salva.","ok"):(L("Cabana criada! Agora adicione as fotos.","ok"),Ea(c,e))})}),p("[data-del]",i)?.addEventListener("click",async()=>{if(!await B("Excluir a cabana?","Cabanas com reservas não podem ser excluídas: nesse caso, desative.","Excluir",!0))return;const{error:b}=await k.from("cabanas").delete().eq("id",o.id);if(b)return L(/foreign|violates/i.test(b.message)?'Esta cabana tem reservas. Desligue "Ativa" em vez de excluir.':b.message,"bad");i.close(),I("adm-cabanas"),ma(e)}),i.addEventListener("close",()=>{i.remove(),o&&ma(e)}),i.showModal()}async function Me(o,e){const i=p("#cab-fotos",e),l=async()=>{const s=(await ua(!0)).filter(t=>t.cabana_id===o.id).sort((t,n)=>(n.principal===!0)-(t.principal===!0)||t.ordem-n.ordem);return i.innerHTML=s.length?s.map(t=>`<div class="cab-foto ${t.principal?"principal":""}" data-id="${t.id}">
          <img src="${v(Q("fotos",t.mini_path))}" alt="">
          <button type="button" class="cf-star" data-star title="${t.principal?"Foto principal":"Tornar principal"}" aria-label="Tornar principal">${t.principal?"⭐":"☆"}</button>
          <button type="button" class="cf-del" data-del-foto title="Apagar" aria-label="Apagar foto">✕</button>
        </div>`).join(""):'<p class="small muted">Nenhuma foto ainda.</p>',s};let a=await l();i.addEventListener("click",async s=>{const t=s.target.closest(".cab-foto");if(!t)return;const n=a.find(d=>d.id===t.dataset.id);if(s.target.closest("[data-star]")&&!n.principal)try{await aa(n.id),L("Foto principal escolhida.","ok"),a=await l()}catch(d){O(d)}if(s.target.closest("[data-del-foto]")){if(!await B("Apagar esta foto?","","Apagar",!0))return;const{error:d}=await k.from("fotos").delete().eq("id",n.id);if(d)return O(d);await k.storage.from("fotos").remove([n.path,n.mini_path]),j.fotos=null,I("adm-cabanas"),I("adm-fotos"),a=await l(),n.principal&&a[0]&&await aa(a[0].id).catch(()=>{}),a=await l()}}),p("#cab-up",e).addEventListener("change",async s=>{const t=[...s.target.files];if(s.target.value="",!t.length)return;const n=s.target.closest("label");n.classList.add("busy");try{const d=!a.some(f=>f.principal),r=await Va(t,{cabana_id:o.id,na_galeria:!0,no_carrossel:!1,ordem:a.length},f=>p("#cab-prog",e).textContent=f);d&&r[0]&&await aa(r[0].id).catch(()=>{}),L(`${r.length} foto(s) adicionada(s).`,"ok"),a=await l()}catch(d){O(d)}finally{n.classList.remove("busy")}})}let H="todas";const Pe=(o,e)=>e.filter(i=>i.cabana_id===o.id).sort((i,l)=>(l.principal===!0)-(i.principal===!0)||i.ordem-l.ordem)[0];async function Ne(o){let e=[],i=[];const l=()=>{j.fotos=null,I("adm-cabanas"),I("adm-fotos"),I("vitrine")},a=d=>d?i.find(r=>r.id===d)?.nome||"Cabana":"Geral",s=()=>{const r=[...i.filter(u=>u.ativa).map(u=>Pe(u,e)).filter(Boolean),...e.filter(u=>u.no_carrossel&&!u.cabana_id)],f=[["todas","📸 Todas",e.length],["carrossel","🎠 Carrossel",r.length],["galeria","🖼️ Galeria",e.filter(u=>u.na_galeria).length],["gerais","🏞️ Gerais",e.filter(u=>!u.cabana_id).length],...i.map(u=>[u.id,`🏡 ${u.nome}`,e.filter(g=>g.cabana_id===u.id).length])];f.some(([u])=>u===H)||(H="todas");const b=new Set(r.map(u=>u.id)),$=e.filter(u=>H==="todas"?!0:H==="carrossel"?b.has(u.id):H==="galeria"?u.na_galeria:H==="gerais"?!u.cabana_id:u.cabana_id===H);H==="carrossel"&&$.sort((u,g)=>r.indexOf(u)-r.indexOf(g)),o.innerHTML=`
      <section class="fa-car">
        <div class="fa-car-head"><h3>🎠 Carrossel do Início</h3><span class="seg-n">${r.length}</span></div>
        ${r.length?`<div class="fa-car-strip">${r.map((u,g)=>`<button type="button" class="fa-car-item" data-edit="${u.id}">
            <img src="${v(Q("fotos",u.mini_path))}" alt="" loading="lazy"><b>${g+1}</b><small>${v(a(u.cabana_id))}</small></button>`).join("")}</div>`:'<p class="small muted">Nenhuma foto no carrossel ainda.</p>'}
        <p class="small muted fa-car-dica">Entram a foto <b>⭐ principal</b> de cada cabana e as fotos gerais com <b>🎠</b> ligado.</p>
      </section>
      <label class="fa-drop" id="drop">
        <input type="file" id="fa-files" accept="image/*" multiple hidden>
        <span class="fa-drop-ico">📷</span><b>Adicionar fotos</b>
        <small>Toque para escolher (pode ser várias). Elas são reduzidas no aparelho antes de enviar.</small>
      </label>
      <div class="ar-filtros fa-filtros" role="tablist">${f.map(([u,g,c])=>`<button type="button" data-f="${u}" class="${u===H?"on":""}">${v(g)}<b class="ar-n">${c||""}</b></button>`).join("")}</div>
      ${$.length?`<div class="fa-grid">${$.map(u=>{const g=b.has(u.id);return`<article class="fa-tile ${!g&&!u.na_galeria?"oculta":""}" data-id="${u.id}">
          <button type="button" class="fa-img" data-edit="${u.id}" aria-label="Editar foto">
            <img src="${v(Q("fotos",u.mini_path))}" alt="${v(u.legenda||"")}" loading="lazy">
            ${u.principal?'<span class="fa-tag">⭐ Principal</span>':""}
            ${!g&&!u.na_galeria?'<span class="fa-tag escondida">Escondida</span>':""}
          </button>
          <div class="fa-rodape">
            <span class="fa-info"><b>${v(a(u.cabana_id))}</b><small>${v(u.legenda||"Sem legenda")}</small></span>
            <span class="fa-quick">
              ${u.cabana_id?`<button type="button" data-star class="${u.principal?"on":""}" title="${u.principal?"Foto principal da cabana":"Tornar a foto principal"}" aria-label="Foto principal">⭐</button>`:`<button type="button" data-t="no_carrossel" class="${u.no_carrossel?"on":""}" title="Carrossel do Início" aria-label="Carrossel do Início">🎠</button>`}
              <button type="button" data-t="na_galeria" class="${u.na_galeria?"on":""}" title="Galeria" aria-label="Galeria">🖼️</button>
            </span>
          </div>
        </article>`}).join("")}</div>`:'<div class="ar-vazio"><span>🖼️</span><h3>Nenhuma foto aqui</h3><p class="muted small">Toque em "Adicionar fotos" para enviar.</p></div>'}`,o.querySelectorAll("[data-f]").forEach(u=>u.addEventListener("click",()=>{H=u.dataset.f,s(),o.querySelector(".fa-filtros .on")?.scrollIntoView({block:"nearest",inline:"center"})})),o.querySelectorAll("[data-edit]").forEach(u=>u.addEventListener("click",()=>n(e.find(g=>g.id===u.dataset.edit))));const _=p("#fa-files",o);_.addEventListener("change",()=>{_.files.length&&t([..._.files]),_.value=""});const E=p("#drop",o);E.addEventListener("dragover",u=>{u.preventDefault(),E.classList.add("sobre")}),E.addEventListener("dragleave",()=>E.classList.remove("sobre")),E.addEventListener("drop",u=>{u.preventDefault(),E.classList.remove("sobre");const g=[...u.dataTransfer.files].filter(c=>c.type.startsWith("image/"));g.length&&t(g)}),o.querySelectorAll(".fa-quick button").forEach(u=>u.addEventListener("click",async()=>{const g=e.find(c=>c.id===u.closest("[data-id]").dataset.id);await z(u,async()=>{if(u.hasAttribute("data-star")){if(g.principal)return L("Esta já é a foto principal. Escolha outra foto da cabana para trocar.");await aa(g.id),e.forEach(c=>{c.cabana_id===g.cabana_id&&(c.principal=c.id===g.id)}),L(`Foto principal da ${a(g.cabana_id)} trocada.`,"ok")}else{const c=u.dataset.t,{error:m}=await k.from("fotos").update({[c]:!g[c]}).eq("id",g.id);if(m)throw m;g[c]=!g[c],L(c==="no_carrossel"?g[c]?"Foi para o carrossel.":"Saiu do carrossel.":g[c]?"Aparece na galeria.":"Saiu da galeria.","ok")}l(),s()})}))},t=d=>{const r=d.map(g=>URL.createObjectURL(g)),f=document.createElement("dialog");f.className="sheet";const b=i.some(g=>g.id===H)?H:"";f.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Enviar ${d.length} ${d.length===1?"foto":"fotos"}</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <div class="fa-prev">${r.map(g=>`<img src="${g}" alt="">`).join("")}</div>
      <form class="stack" id="fa-up">
        <div class="field"><span>De onde são as fotos?</span>
          <div class="pills">${[["","🏞️ Geral"],...i.map(g=>[g.id,`🏡 ${g.nome}`])].map(([g,c])=>`<label class="pill"><input type="radio" name="cab" value="${g}" ${g===b?"checked":""}><span>${v(c)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="sw-car"><span><b>🎠 Carrossel do Início</b><small>Só para fotos gerais (das cabanas vai a ⭐ principal)</small></span><input type="checkbox" name="car" checked><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" checked><i></i></label>
        <div class="fa-prog" hidden><i></i><span></span></div>
        <button class="btn block">Enviar ${d.length===1?"foto":"fotos"}</button>
      </form>`,document.body.appendChild(f);const $=p("#fa-up",f),_=$.elements,E=()=>{p("#sw-car",f).hidden=!!_.cab.value};$.addEventListener("change",E),E();let u=!1;f.addEventListener("cancel",g=>u&&g.preventDefault()),f.addEventListener("click",g=>{!u&&(g.target===f||g.target.closest("[data-fechar]"))&&f.close()}),f.addEventListener("close",()=>{r.forEach(g=>URL.revokeObjectURL(g)),f.remove()}),$.addEventListener("submit",async g=>{g.preventDefault();const c=p(".fa-prog",f);u=!0,c.hidden=!1;try{await z($.querySelector(".btn"),async()=>{const m=_.cab.value||null,h=m&&!e.some(q=>q.cabana_id===m&&q.principal);let w=0;const x=await Va(d,{cabana_id:m,no_carrossel:!m&&_.car.checked,na_galeria:_.gal.checked},q=>{q&&w++,p("span",c).textContent=q||"Pronto!",p("i",c).style.width=`${Math.round((q?w-1:d.length)/d.length*100)}%`});h&&x[0]&&(await aa(x[0].id).catch(()=>{}),x[0].principal=!0),e=[...x,...e],l(),L(`${x.length} ${x.length===1?"foto enviada":"fotos enviadas"}.`,"ok"),u=!1,f.close(),s()})}finally{u=!1}}),f.showModal()},n=d=>{if(!d)return;const r=document.createElement("dialog");r.className="sheet",r.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Editar foto</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <button type="button" class="fa-grande" data-zoom><img src="${v(Q("fotos",d.path))}" alt=""><span>🔍 Ver grande</span></button>
      <form class="stack" id="fa-ed">
        <label class="field"><span>Legenda</span><input name="legenda" maxlength="200" value="${v(d.legenda)}" placeholder="Ex.: Vista da varanda ao pôr do sol"></label>
        <div class="field"><span>De onde é a foto?</span>
          <div class="pills">${[["","🏞️ Geral"],...i.map(_=>[_.id,`🏡 ${_.nome}`])].map(([_,E])=>`<label class="pill"><input type="radio" name="cab" value="${_}" ${(d.cabana_id||"")===_?"checked":""}><span>${v(E)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="ed-car"><span><b>🎠 Carrossel do Início</b><small>Foto geral no carrossel</small></span><input type="checkbox" name="car" ${d.no_carrossel?"checked":""}><i></i></label>
        <label class="cf-switch" id="ed-pri"><span><b>⭐ Foto principal da cabana</b><small>Capa da cabana e foto dela no carrossel</small></span><input type="checkbox" name="pri" ${d.principal?"checked":""}><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" ${d.na_galeria?"checked":""}><i></i></label>
        <div class="regra-linha"><span><b>Posição</b><small>Menor aparece primeiro</small></span>${K("ordem",d.ordem,-999,999,"")}</div>
        <button class="btn block">Salvar</button>
        <button type="button" class="cf-del" data-apagar>🗑️ Apagar foto</button>
      </form>`,document.body.appendChild(r);const f=p("#fa-ed",r),b=f.elements,$=()=>{p("#ed-car",r).hidden=!!b.cab.value,p("#ed-pri",r).hidden=!b.cab.value};f.addEventListener("change",$),$(),r.querySelectorAll(".stp [data-d]").forEach(_=>_.addEventListener("click",()=>{const E=p("input",_.closest(".stp"));E.value=Math.min(999,Math.max(-999,(Number(E.value)||0)+Number(_.dataset.d)))})),r.addEventListener("click",_=>{(_.target===r||_.target.closest("[data-fechar]"))&&r.close()}),r.addEventListener("close",()=>r.remove()),p("[data-zoom]",r).addEventListener("click",()=>Na([Q("fotos",d.path)])),f.addEventListener("submit",async _=>{_.preventDefault(),await z(f.querySelector(".btn.block"),async()=>{const E=b.cab.value||null,u={legenda:b.legenda.value.trim()||null,cabana_id:E,na_galeria:b.gal.checked,no_carrossel:!E&&b.car.checked,ordem:Number(b.ordem.value)||0},{error:g}=await k.from("fotos").update(u).eq("id",d.id);if(g)throw g;Object.assign(d,u,E!==(e.find(c=>c.id===d.id)?.cabana_id??null)?{principal:!1}:{}),E&&b.pri.checked&&!d.principal&&(await aa(d.id),e.forEach(c=>{c.cabana_id===E&&(c.principal=c.id===d.id)})),E||(d.principal=!1),e.sort((c,m)=>c.ordem-m.ordem),l(),L("Foto salva.","ok"),r.close(),s()})}),p("[data-apagar]",r).addEventListener("click",async()=>{if(!await B("Apagar esta foto?","Ela sai do app para todos. Não dá para desfazer.","Apagar",!0))return;const{error:_}=await k.from("fotos").delete().eq("id",d.id);if(_)return O(_);await k.storage.from("fotos").remove([d.path,d.mini_path]),e=e.filter(E=>E.id!==d.id),l(),L("Foto apagada.","ok"),r.close(),s()}),r.showModal()};await U(o,"adm-fotos",async()=>{const[d,r]=await Promise.all([ua(!0),sa(!0)]);return{lista:d,cabs:r}},d=>{e=d.lista.map(r=>({...r})),i=d.cabs,s()})}async function ze(o){await U(o,"adm-clientes",async()=>{const{data:e,error:i}=await k.from("perfis").select("*").order("nome").limit(2e3);if(i)throw i;return e},e=>{o.innerHTML=`
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, região"><button class="btn sm ghost" id="csv">Baixar planilha</button></div>
    <p class="small muted gap-top">${e.length} cliente(s) · ${e.filter(a=>a.receber_email).length} querem novidades por e-mail · ${e.filter(a=>a.receber_push).length} por notificação</p>
    <div id="lista" class="list-cards"></div>`;const i=()=>{const a=p("#busca").value.trim().toLowerCase(),s=e.filter(t=>!a||[t.nome,t.telefone,t.regiao,t.email].some(n=>String(n??"").toLowerCase().includes(a)));p("#lista").innerHTML=s.slice(0,300).map(t=>`<article class="card row gap">
      <span class="avatar" ${t.foto_path?`data-avatar-path="${v(t.foto_path)}"`:""}>${v(Ma(t.nome))}</span>
      <span><strong>${v(t.nome)}</strong><br><span class="small"><a href="${Ra(t.telefone)}" target="_blank" rel="noopener noreferrer">${v(J(t.telefone))}</a> · ${v(t.email||"")}${t.regiao?" · "+v(t.regiao):""}</span>
      <br><span class="small muted">Desde ${V(t.criado_em)}${t.receber_email?" · ✉️ novidades":""}${t.receber_push?" · 🔔 novidades":""}</span></span></article>`).join(""),l()},l=async()=>{for(const a of ea("#lista [data-avatar-path]")){const s=await Ya(a.dataset.avatarPath);s&&a.isConnected&&(a.innerHTML=`<img src="${v(s)}" alt="">`)}};p("#busca").addEventListener("input",i),p("#csv").addEventListener("click",()=>_a("clientes.csv",fa([["Nome","E-mail","Celular","Região","Novidades por e-mail","Novidades por notificação","Cadastro"],...e.map(a=>[a.nome,a.email,J(a.telefone),a.regiao,a.receber_email?"sim":"não",a.receber_push?"sim":"não",V(a.criado_em)])]))),i()})}async function Ie(o){const e=F();o.innerHTML=`
    <form id="per" class="row wrap gap">
      <label class="field"><span>De</span><input type="date" name="de" value="${e.slice(0,7)}-01"></label>
      <label class="field"><span>Até</span><input type="date" name="ate" value="${X(X(e.slice(0,7)+"-01",32).slice(0,7)+"-01",-1)}"></label>
      <button class="btn sm">Ver</button>
    </form>
    <div class="row wrap gap"><button class="chip" data-p="mes">Este mês</button><button class="chip" data-p="ano">Este ano</button><button class="chip" data-p="12">Últimos 12 meses</button></div>
    <div id="rel" class="gap-top"></div>`;const i=p("#per"),l=async()=>{const a=i.elements.de.value,s=i.elements.ate.value,{data:t,error:n}=await k.rpc("relatorio_reservas",{p_de:a,p_ate:s});if(n)return O(n);const d=t.por_situacao||{};p("#rel").innerHTML=`
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
      <tbody>${t.por_cabana.map(r=>`<tr><td>${v(r.cabana)}</td><td>${r.reservas}</td><td>${r.noites_ocupadas}</td><td><span class="bar"><i style="width:${Math.min(100,Number(r.ocupacao)||0)}%"></i></span> ${r.ocupacao}%</td><td>${R(r.receita_centavos)}</td></tr>`).join("")}</tbody></table></div>
      <h3 class="section-title">Por mês (entrada)</h3>
      <table class="table"><thead><tr><th>Mês</th><th>Reservas</th><th>Receita</th></tr></thead>
      <tbody>${t.por_mes.map(r=>`<tr><td>${v(r.mes.split("-").reverse().join("/"))}</td><td>${r.reservas}</td><td>${R(r.receita_centavos)}</td></tr>`).join("")||'<tr><td colspan="3" class="muted">Sem dados</td></tr>'}</tbody></table>
      <div class="row wrap gap">
        <div class="grow"><h3 class="section-title">Situação</h3><table class="table"><tbody>${Object.entries(d).map(([r,f])=>`<tr><td>${v(la[r]?.label||r)}</td><td>${f}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Origem</h3><table class="table"><tbody>${Object.entries(t.por_origem||{}).map(([r,f])=>`<tr><td>${v(Ta[r]||r)}</td><td>${f}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Região dos hóspedes</h3><table class="table"><tbody>${t.por_regiao.map(r=>`<tr><td>${v(r.regiao)}</td><td>${r.reservas}</td></tr>`).join("")}</tbody></table></div>
      </div>
      <button class="btn ghost" id="csv">Baixar planilha das reservas do período</button>`,p("#csv").addEventListener("click",async()=>{const r=await sa(),{data:f,error:b}=await k.from("reservas").select("*").lte("checkin",s).gt("checkout",a).order("checkin").limit(5e3);if(b)return O(b);_a(`reservas-${a}-a-${s}.csv`,fa([["Código","Cabana","Cliente","Celular","E-mail","Região","Entrada","Saída","Diárias","Pessoas","Valor","Situação","Validada","Origem","Criada em"],...f.map($=>[$.codigo,r.find(_=>_.id===$.cabana_id)?.nome,$.nome_cliente,J($.telefone_cliente),$.email_cliente,$.regiao_cliente,V($.checkin),V($.checkout),$.diarias,$.hospedes,($.valor_centavos/100).toFixed(2).replace(".",","),la[$.status]?.label,$.validada?"sim":"não",Ta[$.origem],Z($.criado_em)])]))})};i.addEventListener("submit",a=>{a.preventDefault(),l()}),o.querySelectorAll("[data-p]").forEach(a=>a.addEventListener("click",()=>{const s=a.dataset.p;s==="mes"&&(i.elements.de.value=e.slice(0,7)+"-01"),s==="ano"&&(i.elements.de.value=e.slice(0,4)+"-01-01"),s==="12"&&(i.elements.de.value=X(e,-365)),i.elements.ate.value=s==="ano"?e.slice(0,4)+"-12-31":s==="12"?e:i.elements.ate.value,l()})),l()}async function je(o){await U(o,"adm-historico",async()=>{const{data:e,error:i}=await k.from("historico_hospedes").select("*").order("checkin",{ascending:!1}).limit(1e4);if(i)throw i;return e},e=>{const i=F();o.innerHTML=`
    <p class="small muted">Registro permanente de todas as hospedagens confirmadas. Ele não é apagado por nada: nem pela limpeza das conversas, nem pela exclusão da conta do cliente.</p>
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, cabana"><button class="btn sm ghost" id="csv">Baixar planilha completa</button></div>
    <p class="small gap-top">${e.length} hospedagem(ns) · ${new Set(e.map(a=>a.telefone||a.email||a.nome)).size} cliente(s)</p>
    <div class="table-wrap"><table class="table" id="tab"></table></div>`;const l=()=>{const a=p("#busca").value.trim().toLowerCase(),s=e.filter(t=>!a||[t.nome,t.telefone,t.email,t.cabana,t.regiao,t.codigo].some(n=>String(n??"").toLowerCase().includes(a)));p("#tab").innerHTML=`<thead><tr><th>Entrada</th><th>Saída</th><th>Hóspede</th><th>Contato</th><th>Cabana</th><th>Pessoas</th><th>Valor</th><th>Situação</th></tr></thead>
      <tbody>${s.slice(0,500).map(t=>`<tr><td>${V(t.checkin)}</td><td>${V(t.checkout)}</td><td>${v(t.nome)}${t.regiao?`<br><span class="muted small">${v(t.regiao)}</span>`:""}</td>
      <td class="small">${v(J(t.telefone))}<br>${v(t.email||"")}</td><td>${v(t.cabana)}</td><td>${t.hospedes}</td><td>${R(t.valor_centavos)}</td>
      <td>${t.situacao==="confirmada"?t.checkout<=i?'<span class="badge ok">Hospedou</span>':'<span class="badge info">Futura</span>':`<span class="badge muted">${v(la[t.situacao]?.label||t.situacao)}</span>`}</td></tr>`).join("")}</tbody>`};p("#busca").addEventListener("input",l),p("#csv").addEventListener("click",()=>_a("historico-de-hospedes.csv",fa([["Código","Entrada","Saída","Diárias","Hóspede","Celular","E-mail","Região","Cabana","Pessoas","Valor","Situação","Confirmada em"],...e.map(a=>[a.codigo,V(a.checkin),V(a.checkout),a.diarias,a.nome,J(a.telefone),a.email,a.regiao,a.cabana,a.hospedes,(a.valor_centavos/100).toFixed(2).replace(".",","),a.situacao,Z(a.confirmada_em)])]))),l()})}async function Ua(){const{data:o,error:e}=await k.from("configuracoes_privadas").select("*").eq("id",1).single();if(e)throw e;return o}async function Re(o){await U(o,"adm-privadas",Ua,e=>{o.innerHTML=`
    <form id="f" class="stack">
      <p class="small muted">Escreva tudo o que o atendente virtual (IA do Google) deve saber para responder aos clientes: regras da casa, o que está incluso, como chegar, animais, crianças, cancelamento, horários, valores extras… As cabanas, preços, disponibilidade e horários de entrada e saída já são enviados automaticamente.</p>
      <label class="field"><span>Informações para a IA</span><textarea name="prompt" rows="16" maxlength="12000">${v(e.prompt_ia)}</textarea></label>
      <p class="small muted"><span id="cont"></span> / 12000 caracteres</p>
      <button class="btn">Salvar</button>
    </form>
    <form id="horario" class="cal-card stack gap-top">
      <h3>🙋 Quando o cliente chama a equipe</h3>
      <p class="small muted">No chat, o cliente toca em 🙋 (ou pede à IA) para falar com uma pessoa. Todos os administradores recebem notificação e e-mail; se ninguém responder em 15 minutos, chega um lembrete. Enquanto a equipe atende, a IA fica pausada; ela volta quando você toca em "Encerrar" ou depois de 24 h sem mensagens.</p>
      <label class="cf-switch"><span><b>A equipe atende a qualquer hora</b><small>Desligue para definir um horário: fora dele o cliente é avisado e a notificação chega quando a equipe começar.</small></span><input type="checkbox" name="sempre" ${j.config?.equipe_inicio&&j.config?.equipe_fim?"":"checked"}><i></i></label>
      <div class="datas-2" id="horas">
        <label class="field"><span>Das</span><input type="time" name="ini" value="${v((j.config?.equipe_inicio||"08:00").slice(0,5))}"></label>
        <label class="field"><span>Até</span><input type="time" name="fim" value="${v((j.config?.equipe_fim||"20:00").slice(0,5))}"></label>
      </div>
      <button class="btn">Salvar horário</button>
    </form>`;const i=p("#horario"),l=()=>p("#horas").hidden=i.elements.sempre.checked;i.elements.sempre.addEventListener("change",l),l(),i.addEventListener("submit",async t=>{t.preventDefault();const n=i.elements;if(!n.sempre.checked&&(!n.ini.value||!n.fim.value||n.ini.value===n.fim.value))return L("Confira o horário da equipe.","bad");await z(i.querySelector(".btn"),async()=>{const{error:d}=await k.from("configuracoes").update({equipe_inicio:n.sempre.checked?null:n.ini.value,equipe_fim:n.sempre.checked?null:n.fim.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(d)throw new Error(/equipe_/.test(d.message)?"Rode o arquivo supabase/008_chamar_equipe.sql no Supabase para usar o horário da equipe.":d.message);await oa(!0),L("Horário salvo.","ok")})});const a=p("#f"),s=()=>p("#cont").textContent=a.elements.prompt.value.length;a.elements.prompt.addEventListener("input",s),s(),a.addEventListener("submit",async t=>{t.preventDefault(),await z(a.querySelector("button"),async()=>{const{error:n}=await k.from("configuracoes_privadas").update({prompt_ia:a.elements.prompt.value.trim(),atualizado_em:new Date().toISOString()}).eq("id",1);if(n)throw n;I("adm-privadas"),L("Informações salvas.","ok")})})})}function Ga({titulo:o,texto:e,qr:i,segredo:l,verificar:a}){return new Promise(s=>{const t=document.createElement("dialog");t.className="dialog",t.innerHTML=`<form><h3>${v(o)}</h3><p>${v(e)}</p>
      ${i?`<img class="mfa-qr" src="${v(i)}" alt="QR Code para o aplicativo de códigos" width="200" height="200">`:""}
      ${l?`<p class="small muted">Ou digite no aplicativo: <code class="mfa-segredo">${v(l)}</code></p>`:""}
      <label class="field"><span>Código de 6 dígitos</span><input name="c" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required></label>
      <p class="warn small" data-erro hidden></p>
      <div class="row end"><button type="button" class="btn ghost" data-voltar>Voltar</button><button class="btn">Confirmar</button></div></form>`,document.body.appendChild(t);let n=!1;const d=t.querySelector("form");t.querySelector("[data-voltar]").onclick=()=>t.close(),d.addEventListener("submit",async r=>{r.preventDefault();const f=t.querySelector("[data-erro]");f.hidden=!0;try{await a(d.elements.c.value),n=!0,t.close()}catch(b){const $=b?.code==="mfa_verification_failed"||/invalid totp/i.test(b?.message||"");f.textContent=`${$?"Código incorreto ou vencido. Confira no aplicativo e tente de novo.":"Não foi possível confirmar o código."} (${b?.code||b?.status||"erro"}: ${b?.message||b})`,f.hidden=!1}}),t.addEventListener("close",()=>{s(n),t.remove()}),t.showModal()})}async function De(){const{data:o,error:e}=await k.auth.mfa.getAuthenticatorAssuranceLevel();if(e)throw e;if(o.currentLevel==="aal2")return!0;const{data:i,error:l}=await k.auth.mfa.listFactors();if(l)throw l;const a=async(r,f)=>{const{error:b}=await k.auth.mfa.challengeAndVerify({factorId:r,code:f});if(b)throw b},s=i.totp.find(r=>r.status==="verified");if(s)return Ga({titulo:"🔒 Código de duas etapas",texto:"Abra o aplicativo de códigos e digite o número desta conta.",verificar:r=>a(s.id,r)});for(const r of i.all.filter(f=>f.status!=="verified"))await k.auth.mfa.unenroll({factorId:r.id}).catch(()=>{});const{data:t,error:n}=await k.auth.mfa.enroll({factorType:"totp",friendlyName:"Chácara Canarinho"});if(n)throw n;const d=await Ga({titulo:"🔒 Ativar a verificação em duas etapas",texto:"Para proteger a chave Pix, leia este QR Code com um aplicativo de códigos (Google Authenticator, por exemplo) e digite o número que aparecer.",qr:t.totp.qr_code,segredo:t.totp.secret,verificar:r=>a(t.id,r)});return d||await k.auth.mfa.unenroll({factorId:t.id}).catch(()=>{}),d}async function Oe(o){const{data:e,error:i}=await k.from("alteracoes_pix").select("em,email,chave_antes,chave_depois").order("id",{ascending:!1}).limit(10);if(i||!e?.length||!o.isConnected)return;const l=a=>`<code>${v(a||"(vazia)")}</code>`;o.innerHTML=`<details class="pix-hist cal-card">
    <summary><span class="li-ico">🕘</span><b class="grow">Alterações do Pix</b><span class="seg-n">${e.length}</span></summary>
    <ol class="pix-linha">${e.map(a=>`<li>
      <small class="muted">${v(Z(a.em))} · ${v(a.email||"acesso direto ao banco")}</small>
      <span>${a.chave_antes===a.chave_depois?"Outros dados do Pix":`Chave ${l(a.chave_antes)} → ${l(a.chave_depois)}`}</span></li>`).join("")}</ol>
  </details>`}const Ba={celular:{ph:"(11) 91234-5678",modo:"tel"},cpf:{ph:"Só os números do CPF ou do CNPJ",modo:"numeric"},email:{ph:"pix@exemplo.com",modo:"email"},aleatoria:{ph:"Ex.: 123e4567-e89b-12d3-a456-426614174000",modo:"text"}},Fe=[["💰","Valor exato"],["👤","Recebedor certo"],["📅","Data certa"],["🔢","ID da transação"],["🖼️","Imagem inédita"],["🕵️","Sem montagem"],["🔍","Leitura nítida"]],He=o=>o%24===0?`${o/24} ${o===24?"dia":"dias"}`:`${o} ${o===1?"hora":"horas"}`;async function Qa(o){await U(o,"adm-privadas",Ua,e=>{const i=!!(e.pix_chave&&e.pix_nome);o.innerHTML=`
    <form id="f" class="stack pix-tela">
      <section class="pix-status ${i?"on":"off"}">
        <span class="pix-status-ico" aria-hidden="true">${i?"✅":"⚠️"}</span>
        <div class="grow">
          <b>${i?"Pix ativo":"Pix ainda não está ativo"}</b>
          <p>${i?"Quando o cliente reserva (pelo chat ou pela página da cabana), o QR Code e o Pix copia e cola aparecem no chat.":"Preencha a chave e o nome do recebedor e salve: o Pix passa a aparecer no chat sozinho."}</p>
          ${i?`<p class="pix-status-chave"><span>${v(ga[e.pix_tipo]||"Chave")}</span> <code>${v(e.pix_chave)}</code> · ${v(e.pix_nome)}</p>`:""}
        </div>
      </section>

      <section class="cal-card stack">
        <h3>💠 Dados do Pix</h3>
        <div class="field"><span>Tipo de chave</span>
          <div class="pills">${Object.entries(ga).map(([n,d])=>`<label class="pill"><input type="radio" name="tipo" value="${n}" ${(e.pix_tipo||"celular")===n?"checked":""}><span>${d}</span></label>`).join("")}</div></div>
        <label class="field"><span>Chave Pix</span>
          <input name="chave" maxlength="77" value="${v(e.pix_chave)}" autocomplete="off" spellcheck="false">
          <small class="pix-valida" id="pix-valida" aria-live="polite"></small></label>
        <label class="field"><span>Nome do recebedor <small class="muted">(como aparece no banco)</small></span>
          <input name="nome" maxlength="25" value="${v(e.pix_nome)}" autocomplete="off">
          <small class="muted pix-conta" data-conta="nome"></small></label>
        <label class="field"><span>Cidade</span>
          <input name="cidade" maxlength="15" value="${v(e.pix_cidade)}" autocomplete="off">
          <small class="muted pix-conta" data-conta="cidade"></small></label>
      </section>

      <section class="cal-card stack">
        <h3>⏱️ Prazo para pagar</h3>
        <div class="regra-linha"><span><b>Horas para pagar</b><small id="prazo-txt"></small></span>${K("prazo",e.prazo_pagamento_horas,1,168,"")}</div>
      </section>

      <section class="cal-card stack">
        <h3>🤖 Conferência do comprovante</h3>
        <p class="small muted">A IA lê o comprovante e o app confere cada item. O ID da transação e a imagem não podem ter sido usados em outra reserva.</p>
        <ul class="pix-confere">${Fe.map(([n,d])=>`<li><span aria-hidden="true">${n}</span>${d}</li>`).join("")}</ul>
        <label class="cad-switch pix-auto"><span><b>Confirmar sozinho</b><small>quando o comprovante passar em todas as conferências</small></span>
          <span class="switch"><input type="checkbox" name="auto" ${e.confirmacao_automatica?"checked":""}><i></i></span></label>
        <p class="small muted">Se algum item falhar, a reserva fica <b>em análise</b> para você. Mesmo as confirmadas sozinhas aparecem em Reservas › "Para conferir": confira no extrato do banco e toque em <b>Validar</b>.</p>
      </section>

      <section class="cal-card stack">
        <h3>🔔 Avisos</h3>
        <p class="small muted">Todos os administradores recebem e-mail e notificação no celular quando uma reserva é confirmada ou chega um comprovante. Para a notificação, cada um liga "Notificações no celular" no Menu.</p>
        <label class="field"><span>E-mail extra <small class="muted">(opcional)</small></span><input type="email" name="email" value="${v(e.email_admin)}" placeholder="ex.: reservas@chacara.com"></label>
      </section>

      <p class="pix-seguranca small"><span aria-hidden="true">🔒</span> Alterar a chave, o recebedor, a confirmação automática ou o e-mail de avisos pede o código de duas etapas, e todos os administradores são avisados.</p>
      <button class="btn block" id="pix-salvar">Salvar</button>
    </form>
    <div id="pix-hist" class="gap-top"></div>`,Oe(p("#pix-hist"));const l=p("#f"),a=l.elements,s=()=>(a.chave.value.trim()?$a(a.tipo.value,a.chave.value):null)!==(e.pix_chave||null)||a.tipo.value!==(e.pix_tipo||"celular")||(a.nome.value.trim()||null)!==(e.pix_nome||null)||a.auto.checked!==!!e.confirmacao_automatica||(a.email.value.trim()||null)!==(e.email_admin||null),t=()=>{const n=Ba[a.tipo.value]||Ba.celular;a.chave.placeholder=n.ph,a.chave.inputMode=n.modo;const d=p("#pix-valida"),r=a.chave.value.trim(),f=r&&$a(a.tipo.value,r);d.className=`pix-valida ${r?f?"ok":"bad":""}`,d.textContent=r?f?`✓ Chave válida${f!==r?`: ${f}`:""}`:`Formato inválido para ${ga[a.tipo.value]}.`:"",ea("[data-conta]",l).forEach($=>{const _=a[$.dataset.conta];$.textContent=`${_.value.length}/${_.maxLength}`});const b=Number(a.prazo.value)||0;p("#prazo-txt").textContent=b?`${He(b)} · depois disso as datas voltam a ficar livres`:"",p("#pix-salvar").textContent=s()?"🔒 Salvar (pede o código)":"Salvar"};l.addEventListener("input",t),l.addEventListener("change",t),ea(".stp [data-d]",l).forEach(n=>n.addEventListener("click",()=>{const d=n.closest(".stp"),r=p("input",d);r.value=Math.min(Number(d.dataset.max),Math.max(Number(d.dataset.min),(Number(r.value)||0)+Number(n.dataset.d))),t()})),t(),l.addEventListener("submit",async n=>{n.preventDefault();const d=a.chave.value.trim()?$a(a.tipo.value,a.chave.value):null;if(a.chave.value.trim()&&!d)return L("Chave Pix inválida para o tipo escolhido.","bad");if(d&&!a.nome.value.trim())return L("Informe também o nome do recebedor, como aparece no banco.","bad");const r=Number(a.prazo.value);if(!(r>=1&&r<=168))return L("O prazo para pagar vai de 1 a 168 horas.","bad");const f=s();await z(p("#pix-salvar"),async()=>{if(f&&!await De())return;const{error:b}=await k.from("configuracoes_privadas").update({pix_ativo:!!(d&&a.nome.value.trim()),pix_tipo:a.tipo.value,pix_chave:d,pix_nome:a.nome.value.trim()||null,pix_cidade:a.cidade.value.trim()||null,prazo_pagamento_horas:r,confirmacao_automatica:a.auto.checked,email_admin:a.email.value.trim()||null,atualizado_em:new Date().toISOString()}).eq("id",1);if(b)throw b;L(d?"Pix salvo e ativo no chat.":"Pix salvo.","ok"),I("adm-privadas"),Qa(o)})})})}async function Ve(o){await U(o,"adm-aparencia",()=>oa(!0),e=>{o.innerHTML=`
    <form id="f" class="stack">
      <label class="field"><span>Nome do app</span><input name="nome" required minlength="2" maxlength="40" value="${v(e.nome_app)}"></label>
      <div class="row gap wrap">
        <label class="field"><span>Cor do aplicativo</span><input type="color" name="cor" value="${v(e.cor_principal)}"></label>
        <label class="field"><span>Cor de fundo do ícone</span><input type="color" name="fundo" value="${v(e.cor_icone_fundo)}"></label>
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
      <div class="icon-zoom card">
        <label class="field"><span>Tamanho da ilustração nas telas: <b id="ilus-tam-v"></b></span>
          <input type="range" name="ilustam" min="50" max="200" step="10" value="${Number(e.ilustracao_tamanho)||100}" aria-label="Tamanho da ilustração nas telas"></label>
        <div class="ilus-tam-prev"><img id="ilus-tam-img" class="ilustracao" alt="" width="96" height="96"></div>
        <p class="small muted">Arraste para a direita para aumentar e para a esquerda para diminuir. A prévia mostra o tamanho no rodapé do Início; em Reservas e Chat o desenho fica um pouco maior.</p>
      </div>
      <label class="field"><span>Texto de boas-vindas</span><textarea name="boas" rows="3" maxlength="600">${v(e.boas_vindas)}</textarea></label>
      <label class="field"><span>Endereço (aparece no rodapé e no e-mail de confirmação)</span><input name="end" maxlength="200" value="${v(e.endereco)}"></label>
      <div class="pin-field card">
        <span class="pin-status" id="pin-status"></span>
        <p class="small muted">Com o alfinete, o "Como chegar" do Início mostra o mapa e a rota leva até o ponto exato (Google Maps e Waze).</p>
        <button class="btn sm" type="button" id="pin-btn">📍 Marcar no mapa</button>
      </div>
      <label class="field"><span>Instagram (@perfil ou endereço)</span><input name="insta" maxlength="80" value="${v(e.instagram_url)}" placeholder="@chacaracanarinho"></label>
      <button class="btn">Salvar aparência</button>
    </form>`;const i=p("#f");let l=null,a=e.lat!=null&&e.lng!=null?{lat:e.lat,lng:e.lng}:null,s=!1;const t=()=>{p("#pin-status").innerHTML=a?'<b class="ok-text">📍 Local marcado no mapa</b>':"<b>Sem alfinete no mapa</b>",p("#pin-btn").textContent=a?"📍 Mudar no mapa":"📍 Marcar no mapa"};t();let n=null,d=!(e.ilustracao_versao>0),r=!1;const f=p("#ilus-prev"),b=()=>{n?f.src=URL.createObjectURL(n):f.src=d?"icons/passaro.svg":Q("marca",`ilustracao/v${e.ilustracao_versao}.png`),p("#ilus-padrao").hidden=d&&!n,p("#ilus-tam-img").src=f.src},$=Number(e.ilustracao_tamanho)||100,_=()=>{const y=Number(i.elements.ilustam.value);p("#ilus-tam-v").textContent=`${y}%`;const C=Math.round(96*y/100);p("#ilus-tam-img").width=C,p("#ilus-tam-img").height=C};i.elements.ilustam.addEventListener("input",_),_(),b(),i.elements.ilus.addEventListener("change",async()=>{const y=i.elements.ilus.files[0];if(i.elements.ilus.value="",!!y)try{n=await ha(y),n.size>480*1024&&(n=await ha(n,360)),d=!1,r=!0,b(),L("Ilustração escolhida. Toque em Salvar aparência.")}catch(C){O(C)}}),p("#ilus-padrao").addEventListener("click",()=>{n=null,d=!0,r=!0,b(),L("Volta ao passarinho padrão ao salvar.")}),p("#pin-btn").addEventListener("click",async()=>{const y=await he({...a||{},endereco:i.elements.end.value});y!==void 0&&(a=y,s=!0,t(),L(y?"Ponto marcado. Toque em Salvar aparência.":"Alfinete removido. Toque em Salvar aparência."))});let E=null,u=!1;const g=e.icone_versao>0?fetch(ee(e.icone_versao,"logo.png")).then(y=>y.ok?y.blob():null).catch(()=>null):Promise.resolve(null),c=()=>{try{return Number(localStorage.getItem("icone-zoom"))||100}catch{return 100}};let m=!1;i.elements.zoom.value=c();const h=()=>p("#zoom-v").textContent=`${i.elements.zoom.value}%`;h();const w=[],x=async()=>{l=await re(E||"icons/logo.svg",i.elements.fundo.value,Number(i.elements.zoom.value)/100),w.splice(0).forEach(C=>URL.revokeObjectURL(C));const y=C=>{const P=URL.createObjectURL(l[C]);return w.push(P),P};p("#prev").src=y("icon-192.png"),p("#pv-circ").src=p("#pv-arred").src=y("icon-maskable-512.png"),p("#pv-ios").src=y("apple-touch-icon.png")};i.elements.fundo.addEventListener("input",()=>x().catch(O));let q;i.elements.zoom.addEventListener("input",()=>{m=!0,h(),clearTimeout(q),q=setTimeout(()=>x().catch(O),180)}),i.elements.logo.addEventListener("change",async()=>{const y=i.elements.logo.files[0];if(y)try{E=await ha(y),u=!0;const{selo:C,cor:P}=le(await ce(E));C&&P&&(i.elements.fundo.value=P),await x(),p("#logo-padrao").hidden=!1,L(C&&P?"Logo ajustada para ocupar o ícone, com o fundo na cor do selo. Toque em Salvar aparência.":"Logo escolhida. Toque em Salvar aparência para aplicar.")}catch(C){O(C)}finally{i.elements.logo.value=""}}),p("#logo-padrao").addEventListener("click",()=>{E=null,u=!0,p("#logo-padrao").hidden=!0,x().catch(O)}),g.then(y=>(y&&!u&&(E=y),x())).catch(()=>{}),i.elements.cor.addEventListener("input",()=>{document.documentElement.style.setProperty("--brand",i.elements.cor.value),document.documentElement.style.setProperty("--brand-ink",te(i.elements.cor.value))}),x().catch(()=>{}),i.addEventListener("submit",async y=>{y.preventDefault();const C=i.elements,P=ie(C.insta.value);if(P===null)return L("Instagram inválido. Use @perfil ou o endereço do perfil.","bad");const A=Aa(C.cor.value),M=Aa(C.fundo.value);await z(i.querySelector("button"),async()=>{const T=M!==e.cor_icone_fundo||u||m||e.icone_versao===0,S=T?Math.floor(Date.now()/1e3):e.icone_versao;if(T){await g,await x();const W={...l,...E?{"logo.png":E}:{}};for(const[Za,qa]of Object.entries(W)){if(qa.size>500*1024)throw new Error("A logo gerou um ícone pesado demais. Use uma imagem mais simples (PNG com fundo transparente).");const{error:Ca}=await k.storage.from("marca").upload(`v${S}/${Za}`,qa,{contentType:"image/png",cacheControl:"31536000"});if(Ca)throw Ca}}let N=e.ilustracao_versao??0;if(r){if(d)N=0;else if(n){N=Math.floor(Date.now()/1e3);const{error:W}=await k.storage.from("marca").upload(`ilustracao/v${N}.png`,n,{contentType:"image/png",cacheControl:"31536000"});if(W)throw W}}const D=Math.min(200,Math.max(50,Math.round(Number(C.ilustam.value)/10)*10||100)),pa=D!==$,{error:G}=await k.from("configuracoes").update({nome_app:C.nome.value.trim(),cor_principal:A,cor_icone_fundo:M,boas_vindas:C.boas.value.trim(),endereco:C.end.value.trim()||null,instagram_url:P||null,icone_versao:S,atualizado_em:new Date().toISOString(),...s?{lat:a?.lat??null,lng:a?.lng??null}:{},...r?{ilustracao_versao:N}:{},...pa?{ilustracao_tamanho:D}:{}}).eq("id",1);if(G)throw/ilustracao_tamanho/i.test(G.message)?new Error("Para salvar o tamanho da ilustração, rode o arquivo supabase/019_tamanho_ilustracao.sql no Supabase."):/ilustracao/i.test(G.message)?new Error("Para salvar a ilustração, rode o arquivo supabase/006_ilustracao.sql no Supabase."):/lat|lng|column/i.test(G.message)?new Error("Para salvar o local no mapa, rode o arquivo supabase/005_mapa.sql no Supabase."):G;s=!1,r&&e.ilustracao_versao>0&&N!==e.ilustracao_versao&&k.storage.from("marca").remove([`ilustracao/v${e.ilustracao_versao}.png`]).catch(()=>{}),r=!1,T&&e.icone_versao>0&&k.storage.from("marca").remove(["icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","logo.png"].map(W=>`v${e.icone_versao}/${W}`)).catch(()=>{}),u=!1,m=!1;try{localStorage.setItem("icone-zoom",String(i.elements.zoom.value))}catch{}await oa(!0),ae(),I("adm-aparencia"),I("adm-calendario"),L("Aparência salva.","ok")})})})}async function Ja(o){await U(o,"adm-novidades",async()=>{const[{count:e},{count:i},{data:l}]=await Promise.all([k.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_email",!0),k.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_push",!0),k.from("novidades").select("*").order("criado_em",{ascending:!1}).limit(30)]);return{ce:e,cp:i,envios:l}},({ce:e,cp:i,envios:l})=>{o.innerHTML=`
    <form id="f" class="stack card">
      <p class="small muted">Só recebem os clientes que pediram: ${e??0} por e-mail e ${i??0} por notificação.</p>
      <label class="field"><span>Título</span><input name="titulo" required minlength="2" maxlength="80"></label>
      <label class="field"><span>Mensagem</span><textarea name="texto" rows="5" required minlength="2" maxlength="2000"></textarea></label>
      <label class="check"><input type="checkbox" name="email" checked> Enviar por e-mail</label>
      <label class="check"><input type="checkbox" name="push" checked> Enviar por notificação</label>
      <button class="btn">Enviar novidade</button>
    </form>
    <h3 class="section-title">Enviadas</h3>
    ${(l||[]).map(s=>`<article class="card"><strong>${v(s.titulo)}</strong> <span class="muted small">${Z(s.criado_em)}</span><p class="small pre">${v(s.texto)}</p><p class="small muted">✉️ ${s.enviados_email} · 🔔 ${s.enviados_push}</p></article>`).join("")||'<p class="muted small">Nenhuma ainda.</p>'}`;const a=p("#f");a.addEventListener("submit",async s=>{s.preventDefault();const t=a.elements;await B("Enviar a novidade?","Ela vai para todos os clientes que pediram.","Enviar")&&await z(a.querySelector("button"),async()=>{const n=await ia("enviar-novidade",{titulo:t.titulo.value.trim(),texto:t.texto.value.trim(),email:t.email.checked,push:t.push.checked});L(`Enviada: ${n.enviados_email} e-mail(s) e ${n.enviados_push} notificação(ões).`,"ok"),I("adm-novidades"),Ja(o)})})})}const Ue=[["🧭","Visão geral",`
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
    <p>O cliente pode <b>arquivar</b> conversas (arrastando para a esquerda). Depois de 30 dias a conversa arquivada some para o cliente, mas continua aqui para a equipe.</p>
    <p>A equipe pode <b>excluir</b> uma conversa arrastando-a para a esquerda em Conversas dos clientes. Abre uma janela para confirmar ou cancelar; confirmada, a conversa e as mensagens são apagadas de vez, também para o cliente.</p>
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
      <li><b>Abrir e fechar</b>: fecha ou abre um período para uma cabana ou todas (manutenção, eventos, férias). No calendário, toque no primeiro e no último dia (para um dia só, toque duas vezes no mesmo dia). A lista mostra o que está programado; a lixeira remove.</li>
      <li><b>Feriados</b>: cadastre os da cidade. Os nacionais entram sozinhos. Nos feriados vale o valor de feriado de cada cabana.</li>
      <li><b>Regras</b>: sempre aberto (menos as exceções) ou só quando você abrir; dias da semana; mínimo e máximo de diárias; antecedência; horários de entrada e saída.</li>
    </ul>`],["🎨","Aparência, ícone e mapa",`
    <p>Em <a href="#/admin/aparencia">Aparência: cores e ícone</a>:</p>
    <ul>
      <li><b>Nome do app</b>, <b>cor do aplicativo</b> e <b>cor de fundo do ícone</b>.</li>
      <li><b>Logo do ícone</b>: toque no ícone para trocar. Logos em formato de selo ocupam o ícone e o fundo pega a cor do selo sozinho. Ajuste o <b>tamanho da logo</b> vendo a prévia do Android e do iPhone.</li>
      <li><b>Ilustração das telas</b>: o desenho do rodapé do Início e do meio das telas Reservas e Chat (quando estão vazias). Padrão: um passarinho amarelo. Toque na imagem para trocar; "Voltar ao passarinho padrão" desfaz. A barra "Tamanho da ilustração" aumenta ou diminui o desenho (de 50% a 200%).</li>
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
      <li>Conversas arquivadas somem para o cliente em 30 dias e continuam com a equipe. O cliente pode excluir a conta (Perfil): as conversas dele ficam com a equipe por 5 anos, só para consulta, e depois são apagadas; o histórico de hospedagens continua, como explica a Política de Privacidade.</li>
      <li><b>Novo administrador</b>: a pessoa entra no app uma vez e você roda no SQL Editor do Supabase:<br><code>insert into public.admins (user_id) select id from auth.users where email = 'email@dela.com';</code></li>
    </ul>`]];async function Ge(o){o.innerHTML=`
    <input type="search" id="ajuda-busca" placeholder="Buscar na ajuda (ex.: notificação, Pix, ícone)">
    <div class="ajuda gap-top">${Ue.map(([i,l,a],s)=>`
      <details class="ajuda-item" ${s===0?"open":""}>
        <summary><span class="li-ico">${i}</span><b>${v(l)}</b></summary>
        <div class="ajuda-txt">${a}</div>
      </details>`).join("")}</div>
    <p class="small muted center gap-top">Esta ajuda aparece só para administradores.</p>`;const e=ea(".ajuda-item",o);p("#ajuda-busca",o).addEventListener("input",i=>{const l=Wa(i.target.value);for(const a of e){const s=!l||Wa(a.textContent).includes(l);a.hidden=!s,l&&(a.open=s)}})}const Wa=o=>String(o??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();export{ge as ADMIN_SECOES,oo as renderAdmin};
