import{sb as k,state as j,$ as p,$$ as U,view as Xa,go as La,toast as L,fail as O,api as sa,busy as M,confirmDialog as G,promptDialog as Ka,loadConfig as X,loadCabanas as ta,loadFotos as ua,publicUrl as J,avatarUrl as Ya,applyBrand as ae,screenCached as va,screenUpdate as na,screenForget as z,screenForgetPrefix as Aa,marcaUrl as ee,loadFeriados as oe}from"./core.js";import{esc as v,filtrarClientes as se,fmtMoney as R,fmtDate as V,fmtDateTime as K,parseMoney as ra,normalizeHex as Sa,inkOn as te,instagramUrl as ie,csv as ba,todayISO as F,addDays as Y,STATUS as la,ORIGENS as Ta,fmtPhone as W,initials as Pa,MESES as fa,daysBetween as ca}from"./util.js";import{resizeForGallery as ne,makeIconSet as re,extOf as Ma,resizeLogo as ha,analisarLogo as le,abrirLogo as ce}from"./images.js";import{PIX_TYPES as ga,normalizePixKey as $a}from"./pix.js";import{statusBadge as de,openLightbox as Na,fab as Ia,ICON as me}from"./app.js";import{feriadoNacional as za,nomeFeriado as ja,estadia as pe}from"./precos.js";import{calendarioDatas as ue,calendarioPeriodo as ve}from"./calendario-datas.js";import{renderConversasAdmin as be,renderConversaAdmin as fe}from"./admin-conversas.js";import{marcarNoMapa as he}from"./map.js";const ge=[["reservas","✅","Reservas: conferir e validar"],["conversas","💬","Conversas dos clientes"],["calendario","🗓️","Calendário e dias disponíveis"],["cabanas","🏡","Cabanas e fotos das cabanas"],["fotos","🖼️","Fotos do carrossel e da galeria"],["clientes","👥","Clientes"],["relatorios","📊","Relatórios"],["historico","📚","Histórico de hóspedes"],["ia","🤖","Chat: IA ou chatbot"],["pix","💠","Pix e conferência do comprovante"],["aparencia","🎨","Aparência: cores e ícone"],["novidades","📣","Enviar novidades"],["ajuda","❓","Ajuda: como tudo funciona"]];async function oo(o,e=[]){const r=ge.find(([s])=>s===o);if(!r)return La("#/menu");if(o==="conversas"&&e[0])return fe(e[0]);Xa().innerHTML=`
    <section class="admin">
      <header class="admin-head pad"><a href="#/menu" class="back">‹ Menu</a><h1 class="title">${r[1]} ${v(r[2])}</h1></header>
      <div class="pad" id="admin-body"><div class="loading">Carregando…</div></div>
    </section>`;const c=p("#admin-body"),a={reservas:ke,conversas:be,calendario:Fa,cabanas:ma,fotos:Ne,clientes:Ie,relatorios:ze,historico:je,ia:Re,pix:Qa,aparencia:Ve,novidades:Ja,ajuda:Ge}[o];if(!a)return La("#/admin");await a(c)}async function B(o,e,r,c){const a=va(e);let s=!1;const t=()=>s=!0;o.addEventListener("input",t),a!==void 0&&c(a);let d;try{d=await r()}catch(m){if(a===void 0)throw m;return}na(e,d),o.isConnected&&(a===void 0||!s&&JSON.stringify(d)!==JSON.stringify(a))&&(o.removeEventListener("input",t),c(d))}const _a=(o,e,r="text/csv;charset=utf-8")=>{const c=document.createElement("a");c.href=URL.createObjectURL(new Blob([e],{type:r})),c.download=o,c.click(),setTimeout(()=>URL.revokeObjectURL(c.href),2e3)},Ra=o=>o?`https://wa.me/${encodeURIComponent(o)}`:"",Da=[["validar","🔎","Para conferir"],["proximas","🗓️","Próximas"],["aguardando_pagamento","⏳","Aguardando Pix"],["confirmada","✅","Confirmadas"],["todas","📋","Todas"],["cancelada","🚫","Canceladas"],["recusada","❌","Não confirmadas"],["expirada","⌛","Prazo encerrado"]],$e=["dom.","seg.","ter.","qua.","qui.","sex.","sáb."],_e=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Oa=o=>{const e=new Date(o+"T12:00:00Z");return{dia:String(e.getUTCDate()).padStart(2,"0"),mes:_e[e.getUTCMonth()],sem:$e[e.getUTCDay()]}},we='<svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1.2-1.1 2 .9c-.2 1.2-1.2 1.9-2.4 1.7-3-.6-5.5-3-6-6-.2-1.2.5-2.2 1.7-2.4l.9 2z"/></svg>';function xe(o){if(!["aguardando_pagamento","em_analise","confirmada"].includes(o.status))return"";const e=F();if(o.checkout<=e)return'<span class="ar-quando passado">Já saiu</span>';if(o.checkin<=e)return'<span class="ar-quando agora">🏡 Hospedado agora</span>';const r=ca(e,o.checkin);return`<span class="ar-quando">${r===1?"Entra amanhã":`Entra em ${r} dias`}</span>`}function ye(o){if(o.status!=="aguardando_pagamento"||!o.expira_em)return"";const e=Math.round((Date.parse(o.expira_em)-Date.now())/6e4);return e<=0?'<p class="ar-aviso warn">⏳ O prazo do Pix acabou; a reserva vai expirar sozinha.</p>':`<p class="ar-aviso warn">⏳ Esperando o Pix do cliente · prazo de <b>${e<60?`${e} min`:e<1440?`${Math.floor(e/60)} h ${e%60?`${e%60} min`:""}`:`${Math.floor(e/1440)} dia(s)`}</b></p>`}async function ke(o){const e=j.cabanas||va("vitrine")?.cabanas||await ta(),r=i=>e.find(l=>l.id===i)?.nome||"—";let c=sessionStorage.getItem("adm-filtro")||"validar";Da.some(([i])=>i===c)||(c="validar"),o.innerHTML=`
    <div class="ar-busca"><span aria-hidden="true">🔍</span><input id="f-busca" type="search" placeholder="Buscar por nome, código ou celular" autocomplete="off"><button type="button" id="limpar" aria-label="Limpar busca" hidden>✕</button></div>
    <div class="ar-filtros" role="tablist">${Da.map(([i,l,f])=>`<button type="button" role="tab" data-f="${i}" class="${i===c?"on":""}">${l} ${f}<b class="ar-n" data-n="${i}"></b></button>`).join("")}</div>
    <div class="ar-bulk" id="bulk" hidden></div>
    <div id="lista" class="ar-lista"></div>
    ${Ia("nova","Nova reserva")}`;const a=p("#f-busca"),s=sessionStorage.getItem("adm-busca");s&&(sessionStorage.removeItem("adm-busca"),a.value=s,c="todas");const t=()=>{o.querySelectorAll("[data-f]").forEach(i=>i.classList.toggle("on",i.dataset.f===c)),o.querySelector("[data-f].on")?.scrollIntoView({block:"nearest",inline:"center"})};t(),p("#limpar").hidden=!a.value;const d=async()=>{const{data:i}=await k.from("reservas").select("status,validada,checkout").in("status",["aguardando_pagamento","em_analise","confirmada"]).limit(2e3);if(!i||!o.isConnected)return;const l=F(),f={validar:i.filter(g=>g.status==="em_analise"||g.status==="confirmada"&&!g.validada).length,proximas:i.filter(g=>g.checkout>=l).length,aguardando_pagamento:i.filter(g=>g.status==="aguardando_pagamento").length};o.querySelectorAll("[data-n]").forEach(g=>{const x=f[g.dataset.n];g.textContent=x||"",g.classList.toggle("alerta",g.dataset.n==="validar"&&x>0)})};let m=[];const n=i=>c==="validar"?i.status==="em_analise"||i.status==="confirmada"&&!i.validada:c==="proximas"?["aguardando_pagamento","em_analise","confirmada"].includes(i.status)&&i.checkout>=F():c==="todas"||i.status===c,b=i=>{const l=new Map(i.map(f=>[f.id,f]));m=m.map(f=>l.get(f.id)||f).filter(n),Aa("adm-reservas:"),na(`adm-reservas:${c}:${a.value.trim()}`,m),w(m),d()},h={validar:["🎉","Tudo conferido!","Nenhum comprovante esperando e nenhuma reserva para validar."],proximas:["🌿","Nenhuma hospedagem pela frente","As próximas reservas aparecem aqui."]},w=i=>{m=i;const l=p("#lista");if(!l)return;const f=i.filter(q=>q.status==="confirmada"&&!q.validada),g=p("#bulk");if(g.hidden=f.length<2,g.innerHTML=`<span><b>${f.length} confirmadas</b> esperando a sua validação</span><button type="button" class="btn sm" id="validar-todas">Validar todas</button>`,l.dataset.ids=JSON.stringify(f.map(q=>q.id)),!i.length){const[q,E,C]=a.value.trim()?["🔍","Nada encontrado",'Confira o nome, o código ou o celular, ou procure em "Todas".']:h[c]||["📭","Nenhuma reserva aqui","Escolha outro filtro acima."];l.innerHTML=`<div class="ar-vazio"><span>${q}</span><h3>${E}</h3><p class="muted small">${C}</p></div>`;return}let x="";l.innerHTML=i.map(q=>{const E=q.checkin.slice(0,7),C=E!==x?`<h3 class="ar-mes">${fa[Number(E.slice(5))-1]} de ${E.slice(0,4)}</h3>`:"";return x=E,C+u(q)}).join("")},_=async()=>{const i=p("#lista"),l=a.value.trim(),f=c,g=`adm-reservas:${f}:${l}`,x=va(g);x?w(x):i.innerHTML='<div class="ar-esqueleto"><i></i><i></i></div>';let q=k.from("reservas").select("*").order("checkin",{ascending:f==="proximas"||f==="validar"}).limit(200);f==="validar"?q=q.or("status.eq.em_analise,and(status.eq.confirmada,validada.eq.false)"):f==="proximas"?q=q.in("status",["aguardando_pagamento","em_analise","confirmada"]).gte("checkout",F()):f!=="todas"&&(q=q.eq("status",f));const E=l.replace(/[,()%]/g,"");E&&(q=q.or(`nome_cliente.ilike.%${E}%,codigo.ilike.%${E}%,telefone_cliente.ilike.%${E.replace(/\D/g,"")||E}%`));const{data:C,error:N}=await q;if(N)return x?void 0:O(N);if(!i.isConnected||a.value.trim()!==l||c!==f)return na(g,C);JSON.stringify(C)!==JSON.stringify(x)&&w(C),na(g,C)},y=i=>i.resultado==="aprovado"?["ok","✅ Aprovado pela IA"]:i.resultado==="nao_e_comprovante"?["bad","❌ Não parece um comprovante"]:["warn","⚠️ A IA pediu para conferir"],u=i=>{const l=i.analise_ia,f=la[i.status]||{label:i.status,tone:""},g=Oa(i.checkin),x=Oa(i.checkout),q=i.telefone_cliente,E=["aguardando_pagamento","em_analise"].includes(i.status),C=E&&i.status==="em_analise"?["confirmar","✅ Confirmar pagamento"]:i.status==="confirmada"&&!i.validada?["validar","☑️ Validar reserva"]:E?["confirmar","✅ Confirmar pagamento"]:null,N=[i.comprovante_path?["ver","Comprovante",""]:null,i.status==="em_analise"?["pedir_novo","Pedir outro",""]:null,E?["recusar","Recusar","danger"]:null,i.status==="confirmada"?["cancelar","Cancelar","danger"]:null].filter(Boolean),[S,P]=l?.verificacoes?y(l):[];return`<article class="res-card adm-res t-${f.tone}" data-id="${i.id}">
      <div class="ar-head">
        <span class="ar-av">${v(Pa(i.nome_cliente))}</span>
        <div class="ar-tit"><h3>${v(i.nome_cliente)}</h3><span class="res-code" title="Feita em ${v(K(i.criado_em))}">#${v(i.codigo)} · ${i.origem==="chat"?"💬 chat":i.origem==="admin"?"👤 equipe":"📱 app"} · ${new Date(i.criado_em).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}</span></div>
        <span class="res-status ${f.tone}">${v(f.label)}</span>
      </div>
      <div class="ar-cab"><span>🏡 <b>${v(r(i.cabana_id))}</b></span>${xe(i)}</div>
      <div class="res-dates">
        <div class="rd"><small>Entrada</small><strong>${g.dia} ${g.mes}</strong><span>${g.sem}</span></div>
        <div class="rd-mid"><span>${i.diarias} ${i.diarias===1?"noite":"noites"}</span></div>
        <div class="rd"><small>Saída</small><strong>${x.dia} ${x.mes}</strong><span>${x.sem}</span></div>
      </div>
      <div class="res-info"><span>${me.people} ${i.hospedes} ${i.hospedes===1?"pessoa":"pessoas"}</span><strong>${R(i.valor_centavos)}</strong></div>
      ${q||i.email_cliente?`<div class="ar-contato">
        ${q?`<a class="ar-ct whats" href="${Ra(q)}" target="_blank" rel="noopener noreferrer">${we}<span>${v(W(q))}</span></a>`:""}
        ${i.email_cliente?`<a class="ar-ct" href="mailto:${v(i.email_cliente)}">✉️<span>${v(i.email_cliente)}</span></a>`:""}
        ${i.regiao_cliente?`<span class="ar-ct sem">📍<span>${v(i.regiao_cliente)}</span></span>`:""}
      </div>`:""}
      ${ye(i)}
      ${i.status==="em_analise"?'<p class="ar-aviso info">🧾 O cliente enviou o comprovante. Confira no extrato do banco antes de confirmar.</p>':""}
      ${i.status==="confirmada"?i.validada?`<p class="ar-aviso ok">☑️ Validada em ${K(i.validada_em)}</p>`:'<p class="ar-aviso warn">👀 Confirmada, esperando a sua validação (confira o Pix no extrato).</p>':""}
      ${i.motivo?`<p class="res-motivo">💬 ${v(i.motivo)}</p>`:""}
      ${l?.verificacoes?`<details class="ar-ia ${S}"><summary><span>${P}</span><small>ver detalhes</small></summary>
        <ul>${l.verificacoes.map(T=>`<li class="${T.ok?"ok":"bad"}"><i>${T.ok?"✓":"✗"}</i><span><b>${v(T.regra)}</b><small>${v(T.detalhe)}</small></span></li>`).join("")}</ul>
        ${l.extraido?.pagador_nome?`<p class="small">Pagador: <b>${v(l.extraido.pagador_nome)}</b>${l.extraido.destinatario_instituicao?` · ${v(l.extraido.destinatario_instituicao)}`:""}</p>`:""}
        ${l.extraido?.observacoes?`<p class="small muted">Obs.: ${v(l.extraido.observacoes)}</p>`:""}</details>`:""}
      ${C||N.length?`<div class="ar-acoes">
        ${C?`<button class="btn block" data-a="${C[0]}">${C[1]}</button>`:""}
        ${N.length?`<div class="ar-sec">${N.map(([T,A,I])=>`<button class="btn sm ghost ${I}" data-a="${T}">${A}</button>`).join("")}</div>`:""}
      </div>`:""}
    </article>`};o.querySelectorAll("[data-f]").forEach(i=>i.addEventListener("click",()=>{c!==i.dataset.f&&(c=i.dataset.f,sessionStorage.setItem("adm-filtro",c),t(),_())}));let $;a.addEventListener("input",()=>{p("#limpar").hidden=!a.value,clearTimeout($),$=setTimeout(_,350)}),p("#limpar").addEventListener("click",()=>{a.value="",p("#limpar").hidden=!0,_(),a.focus()}),p("#nova").addEventListener("click",()=>Ee(e,()=>{Aa("adm-reservas:"),_(),d()})),p("#bulk").addEventListener("click",async i=>{const l=i.target.closest("#validar-todas");if(!l)return;const f=JSON.parse(p("#lista").dataset.ids||"[]");!f.length||!await G(`Validar ${f.length} reserva(s)?`,"Confirme que conferiu os pagamentos no extrato do banco.","Validar todas")||await M(l,async()=>{const g=[];for(const x of f)g.push((await sa("admin-reserva",{acao:"validar",reserva_id:x})).reserva);L("Reservas validadas.","ok"),b(g)})}),p("#lista").addEventListener("click",async i=>{const l=i.target.closest("[data-a]");if(!l)return;const f=l.closest(".adm-res").dataset.id,g=l.dataset.a;if(g==="ver"){await M(l,async()=>{const{data:q}=await k.from("reservas").select("comprovante_path").eq("id",f).single(),{data:E,error:C}=await k.storage.from("comprovantes").createSignedUrl(q.comprovante_path,600);if(C)throw C;Na([E.signedUrl])});return}let x;if(["recusar","cancelar","pedir_novo"].includes(g)){if(x=await Ka({recusar:"Recusar a reserva",cancelar:"Cancelar a reserva",pedir_novo:"Pedir outro comprovante"}[g],"Motivo (o cliente recebe esta mensagem)","","Enviar"),x===null)return}else if(g==="confirmar"&&!await G("Confirmar o pagamento?","O cliente recebe a confirmação por e-mail e notificação.","Confirmar"))return;await M(l,async()=>{const{reserva:q}=await sa("admin-reserva",{acao:g,reserva_id:f,motivo:x});L({confirmar:"Pagamento confirmado. O cliente foi avisado.",validar:"Reserva validada.",recusar:"Reserva recusada.",cancelar:"Reserva cancelada.",pedir_novo:"Pedido enviado ao cliente."}[g]||"Pronto.","ok"),b([q])})}),_(),d()}function Ee(o,e){const r=o.filter(l=>l.ativa),c=document.createElement("dialog");c.className="dialog cab-form",c.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head"><button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button><h3>Nova reserva</h3><span></span></header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Hospedagem</h4>
        <div class="pills">${r.map((l,f)=>`<label class="pill"><input type="radio" name="cabana_id" value="${l.id}" ${f===0?"checked":""}><span>${v(l.nome)}</span></label>`).join("")}</div>
        <input type="hidden" name="checkin"><input type="hidden" name="checkout">
        <p class="muted small" id="nr-dica"></p>
        <div class="calendar" id="nr-cal"></div>
        <div class="legend small"><span class="lg livre"></span>Livre <span class="lg reservado"></span>Reservado <span class="lg fechado"></span>Fechado para clientes <span class="lg-fer"></span>Feriado</div>
        <div class="regra-linha"><span><b>Pessoas</b><small id="nr-cap"></small></span>${aa("hospedes",2,1,50,"")}</div>
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
  </form>`,document.body.appendChild(c);const a=p("form",c),s=a.elements;p("[data-close]",c).onclick=()=>c.close();let t=j.feriados||[];oe().then(l=>{t=l,m(),n.desenhar()}).catch(()=>{});const d=()=>r.find(l=>l.id===s.cabana_id.value),m=()=>{const l=d(),f=p("#nr-calc",c);if(l&&(p("#nr-cap",c).textContent=`até ${l.capacidade} nesta cabana`),!l||!s.checkin.value||!s.checkout.value){f.textContent="Escolha as datas para ver o valor.";return}const{total:g,grupos:x}=pe(l,s.checkin.value,s.checkout.value,t),q=ca(s.checkin.value,s.checkout.value),E=[x.normal.n&&`${x.normal.n} normal`,x.fim_semana.n&&`${x.fim_semana.n} sex a dom`,x.feriado.n&&`${x.feriado.n} feriado`].filter(Boolean);f.innerHTML=`<span>${q} ${q===1?"diária":"diárias"}${E.length>1||x.fim_semana.n||x.feriado.n?` <small>(${E.join(" · ")})</small>`:""}</span><b>${R(g)}</b>`},n=ue(p("#nr-cal",c),p("#nr-dica",c),{cabana:s.cabana_id.value,carregar:async(l,f,g)=>{const{data:x,error:q}=await k.rpc("disponibilidade",{p_cabana:l,p_de:f,p_ate:g});if(q)throw q;return x},nomeFeriado:l=>ja(l,t),aoMudar:l=>{s.checkin.value=l.checkin,s.checkout.value=l.checkout,m()}});c.querySelectorAll("[name=cabana_id]").forEach(l=>l.addEventListener("change",()=>n.trocarCabana(s.cabana_id.value))),a.addEventListener("change",m),c.querySelectorAll(".stp [data-d]").forEach(l=>l.addEventListener("click",()=>{const f=l.closest(".stp"),g=p("input",f);g.value=Math.min(d()?.capacidade||50,Math.max(1,(Number(g.value)||0)+Number(l.dataset.d)))})),m();let b=null,h=!1,w=null;const _=p("#nr-busca",c),y=p("#nr-lista",c),u=l=>v([W(l.telefone),l.email].filter(Boolean).join(" · ")),$=()=>{if(h){y.innerHTML='<p class="muted small">Não foi possível carregar os clientes. Feche e abra de novo.</p>';return}if(!b){y.innerHTML='<p class="muted small">Carregando clientes…</p>';return}y.innerHTML=se(b,_.value).map(l=>`<button type="button" class="nr-item" data-id="${v(l.id)}"><b>${v(l.nome)}</b><small>${u(l)}</small></button>`).join("")||'<p class="muted small">Nenhum cliente encontrado. Se for a primeira vez dele, escolha Novo cliente.</p>'},i=l=>{w=l,p("#nr-procura",c).hidden=!!l;const f=p("#nr-escolhido",c);f.hidden=!l,f.innerHTML=l?`<span><b>${v(l.nome)}</b><small>${u(l)}</small></span><button type="button" class="btn sm ghost" data-trocar>Trocar</button>`:"",l||_.focus()};y.addEventListener("click",l=>{const f=l.target.closest("[data-id]")?.dataset.id;f&&i(b.find(g=>g.id===f))}),p("#nr-escolhido",c).addEventListener("click",l=>{l.target.closest("[data-trocar]")&&i(null)}),_.addEventListener("input",$),_.addEventListener("keydown",l=>{l.key==="Enter"&&l.preventDefault()}),c.querySelectorAll("[name=tipo_cliente]").forEach(l=>l.addEventListener("change",()=>{const f=s.tipo_cliente.value==="cadastrado";p("#nr-cadastrado",c).hidden=!f,p("#nr-novo",c).hidden=f})),$(),Promise.all([k.from("perfis").select("id,nome,telefone,email").order("nome").limit(2e3),k.from("admins").select("user_id")]).then(([l,f])=>{if(l.error||f.error)throw l.error||f.error;const g=new Set(f.data.map(x=>x.user_id));b=l.data.filter(x=>!g.has(x.id))}).catch(()=>{h=!0}).finally($),a.addEventListener("submit",async l=>{l.preventDefault();const f=(E,C)=>{E?.focus(),L(C,"bad")};if(!s.cabana_id.value)return f(null,"Escolha a cabana.");if(!s.checkin.value||!s.checkout.value||s.checkout.value<=s.checkin.value)return f(null,"Escolha a entrada e a saída no calendário.");const g=s.tipo_cliente.value==="cadastrado";if(g&&!w)return f(_,"Escolha o cliente cadastrado.");if(!g&&s.nome.value.trim().length<2)return f(s.nome,"Escreva o nome do cliente.");if(!g&&s.email.value.trim()&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email.value.trim()))return f(s.email,"Confira o e-mail do cliente.");const x=Number(s.hospedes.value);if(!Number.isInteger(x)||x<1)return f(s.hospedes,"Confira o número de pessoas.");if(x>d().capacidade)return f(s.hospedes,`Esta cabana recebe até ${d().capacidade} pessoas.`);const q=s.valor.value.trim()?ra(s.valor.value):void 0;if(q===null)return f(s.valor,"Valor inválido.");await M(a.querySelector(".cf-foot .btn"),async()=>{await sa("admin-reserva",{acao:"criar",cabana_id:s.cabana_id.value,checkin:s.checkin.value,checkout:s.checkout.value,hospedes:Number(s.hospedes.value),...g?{cliente_id:w.id}:{nome:s.nome.value,telefone:s.telefone.value,email:s.email.value},valor_centavos:q,confirmada:s.confirmada.checked,motivo:s.obs.value}),L("Reserva criada.","ok"),c.close(),e()})}),c.addEventListener("close",()=>c.remove()),c.showModal()}const qe=[["ocupacao","🗓️","Ocupação"],["periodos","🔒","Abrir e fechar"],["feriados","🎉","Feriados"],["regras","⚙️","Regras"]];let wa="ocupacao",xa=null;const da=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],ya=o=>new Date(o+"T12:00:00Z").getUTCDay(),ia=o=>fa[Number(o.slice(5,7))-1].slice(0,3);function ka(o,e){const r=Number(o.slice(8)),c=Number(e.slice(8));return o===e?`${r} de ${ia(o)}.`:o.slice(0,7)===e.slice(0,7)?`${r} a ${c} de ${ia(e)}.`:`${r} de ${ia(o)}. a ${c} de ${ia(e)}.`}const aa=(o,e,r,c,a)=>`<div class="stp" data-min="${r}" data-max="${c}">
  <button type="button" data-d="-1" aria-label="Menos">−</button>
  <input type="number" name="${o}" min="${r}" max="${c}" value="${e}" inputmode="numeric">
  <button type="button" data-d="1" aria-label="Mais">+</button><small>${a}</small></div>`;async function Fa(o){await B(o,"adm-calendario",async()=>{const[e,r,{data:c,error:a},s]=await Promise.all([X(!0),ta(!0),k.from("calendario").select("*").gte("fim",F()).order("inicio"),k.from("feriados").select("data,nome").gte("data",F()).order("data")]);if(a)throw a;return{cfg:e,cabs:r,periodos:c,feriados:s.error?null:s.data}},e=>{o.innerHTML=`
      <div class="cal-abas" role="tablist">${qe.map(([a,s,t])=>`<button type="button" role="tab" data-aba="${a}" class="${a===wa?"on":""}"><span>${s}</span>${t}</button>`).join("")}</div>
      <div id="cal-pane"></div>`;const r=p("#cal-pane",o),c=a=>{wa=a,o.querySelectorAll("[data-aba]").forEach(s=>s.classList.toggle("on",s.dataset.aba===a)),{ocupacao:Ce,periodos:Ae,feriados:Se,regras:Te}[a](r,e,()=>Fa(o))};o.querySelectorAll("[data-aba]").forEach(a=>a.addEventListener("click",()=>c(a.dataset.aba))),c(wa)})}const ea=o=>{z("adm-calendario"),o()};function Ce(o,{cabs:e,feriados:r},c){const a=e.filter(s=>s.ativa);if(!a.length){o.innerHTML='<div class="card center"><p class="muted">Cadastre uma cabana em <a href="#/admin/cabanas">Cabanas</a> para ver a ocupação.</p></div>';return}o.innerHTML='<div id="mapa"><div class="loading">Carregando…</div></div>',Ha(p("#mapa",o),a,r||[],xa||F().slice(0,7),c)}async function Ha(o,e,r,c,a){xa=c;const[s,t]=c.split("-").map(Number),d=`${c}-01`,m=new Date(Date.UTC(s,t,0)).getUTCDate(),n=`${c}-${String(m).padStart(2,"0")}`,b=F(),[{data:h},w]=await Promise.all([k.from("reservas").select("id,cabana_id,checkin,checkout,status,nome_cliente,codigo,hospedes").in("status",["aguardando_pagamento","em_analise","confirmada"]).lte("checkin",n).gt("checkout",d),Promise.all(e.map(S=>k.rpc("disponibilidade",{p_cabana:S.id,p_de:d,p_ate:n}).then(P=>P.data||[])))]);if(!o.isConnected||xa!==c)return;const _=Array.from({length:m},(S,P)=>`${c}-${String(P+1).padStart(2,"0")}`),y=e.map((S,P)=>_.map(T=>{const A=(h||[]).find(I=>I.cabana_id===S.id&&T>=I.checkin&&T<I.checkout);return{d:T,r:A,sit:A?A.status:w[P].find(I=>I.dia===T)?.situacao||"passado"}})),u=y.flat(),$=u.filter(S=>S.r).length,i=u.filter(S=>S.sit==="livre").length,l=u.filter(S=>S.sit==="fechado").length,f=$+i,g=f?Math.round($/f*100):0,x=new Date(Date.UTC(s,t-2,1)).toISOString().slice(0,7),q=new Date(Date.UTC(s,t,1)).toISOString().slice(0,7),E=S=>Le(S,r);o.innerHTML=`
    <div class="occ-head">
      <button type="button" class="icon-btn" data-m="${x}" aria-label="Mês anterior">‹</button>
      <div class="occ-mes"><strong>${fa[t-1]} de ${s}</strong>${c!==b.slice(0,7)?`<button type="button" class="link-btn" data-m="${b.slice(0,7)}">voltar para hoje</button>`:""}</div>
      <button type="button" class="icon-btn" data-m="${q}" aria-label="Próximo mês">›</button>
    </div>
    <div class="occ-kpis">
      <div class="occ-kpi destaque"><b>${g}%</b><small>ocupação</small><i style="--p:${g}%"></i></div>
      <div class="occ-kpi"><b>${$}</b><small>noites reservadas</small></div>
      <div class="occ-kpi"><b>${i}</b><small>noites livres</small></div>
      <div class="occ-kpi"><b>${l}</b><small>fechadas</small></div>
    </div>
    <div class="occ-card">
      <div class="occ-wrap"><table class="occ">
        <thead><tr><th class="occ-nome"></th>${_.map(S=>{const P=ya(S);return`<th class="${P===0||P===6?"fds":""} ${S===b?"hoje":""} ${E(S)?"fer":""}" title="${v(E(S)||"")}"><small>${da[P][0]}</small>${Number(S.slice(8))}</th>`}).join("")}</tr></thead>
        <tbody>${e.map((S,P)=>`<tr><th class="occ-nome">${v(S.nome)}</th>${y[P].map((T,A)=>{const I=T.r&&(T.d===T.r.checkin||A===0),D=T.r&&(Y(T.d,1)===T.r.checkout||A===m-1);return`<td><button type="button" class="occ-c occ-${T.sit} ${I?"ini":""} ${D?"fim":""} ${T.d===b?"hoje":""}" data-c="${P}" data-i="${A}" aria-label="${v(S.nome)} ${V(T.d)}"></button></td>`}).join("")}</tr>`).join("")}</tbody></table></div>
      <div class="occ-legenda small">
        <span><i class="occ-confirmada"></i>Confirmada</span><span><i class="occ-aguardando_pagamento"></i>Aguardando Pix</span>
        <span><i class="occ-em_analise"></i>Em análise</span><span><i class="occ-livre"></i>Livre</span><span><i class="occ-fechado"></i>Fechado</span>
      </div>
    </div>
    <div id="occ-info" class="occ-info"><p class="small muted">👆 Toque num dia para ver a reserva ou para abrir e fechar a data.</p></div>`,o.querySelectorAll("[data-m]").forEach(S=>S.addEventListener("click",()=>{o.querySelector(".occ-card")?.classList.add("carregando"),Ha(o,e,r,S.dataset.m,a)}));const C=p("#occ-info",o);o.querySelector(".occ").addEventListener("click",S=>{const P=S.target.closest(".occ-c");if(!P)return;o.querySelectorAll(".occ-c.sel").forEach(D=>D.classList.remove("sel")),P.classList.add("sel");const T=e[Number(P.dataset.c)],A=y[Number(P.dataset.c)][Number(P.dataset.i)],I=`<div class="occ-info-tit"><b>${v(T.nome)}</b><span>${da[ya(A.d)]}, ${V(A.d)}${E(A.d)?` · 🎉 ${v(E(A.d))}`:""}</span></div>`;if(A.r)C.innerHTML=`${I}<div class="occ-info-res">${de(A.r.status)}
        <p><b>${v(A.r.nome_cliente)}</b> · ${A.r.hospedes} pessoa(s)</p>
        <p class="small muted">Reserva ${v(A.r.codigo)} · ${ka(A.r.checkin,Y(A.r.checkout,-1))} (saída ${V(A.r.checkout)})</p>
        <a class="btn sm ghost" href="#/admin/reservas">Ver em Reservas ›</a></div>`;else if(A.sit==="livre"||A.sit==="fechado"){const D=A.sit==="livre";C.innerHTML=`${I}<p class="occ-info-sit ${A.sit}">${D?"🟢 Livre para reservar":"⚪ Fechado para reservas"}</p>
        <button type="button" class="btn sm ${D?"ghost danger":""}" id="occ-acao">${D?"🔒 Fechar este dia":"🔓 Abrir este dia"}</button>`,p("#occ-acao",C).addEventListener("click",pa=>M(pa.currentTarget,async()=>{const{error:Q}=await k.from("calendario").insert({cabana_id:T.id,tipo:D?"fechado":"aberto",inicio:A.d,fim:A.d,motivo:null});if(Q)throw Q;L(D?"Dia fechado.":"Dia aberto.","ok"),ea(a)}))}else C.innerHTML=`${I}<p class="small muted">${A.d<b?"Data que já passou.":"Fora do prazo de reservas (veja em Regras)."}</p>`;C.scrollIntoView({block:"nearest",behavior:"smooth"})});const N=o.querySelector("thead th.hoje");N&&(o.querySelector(".occ-wrap").scrollLeft=Math.max(0,N.offsetLeft-140))}const Le=(o,e)=>e.find(r=>r.data===o)?.nome||za(o);function Ae(o,{cabs:e,periodos:r,feriados:c},a){const s=n=>n?e.find(b=>b.id===n)?.nome||"—":"Todas as cabanas";o.innerHTML=`
    <form id="periodo" class="cal-card stack">
      <h3>Novo período</h3>
      <div class="tipo-escolha" role="radiogroup">
        <label><input type="radio" name="tipo" value="fechado" checked><span><b>🔒 Fechar</b><small>Ninguém reserva nesses dias</small></span></label>
        <label><input type="radio" name="tipo" value="aberto"><span><b>🔓 Abrir</b><small>Libera dias que estavam fechados</small></span></label>
      </div>
      <div class="field"><span>Cabana</span>
        <div class="pills">${[["","Todas"],...e.map(n=>[n.id,n.nome])].map(([n,b],h)=>`<label class="pill"><input type="radio" name="cab" value="${n}" ${h===0?"checked":""}><span>${v(b)}</span></label>`).join("")}</div></div>
      <div class="field"><span>Dias</span>
        <p class="muted small" id="per-dica"></p>
        <div class="calendar" id="per-cal"></div>
        <input type="hidden" name="ini"><input type="hidden" name="fim">
      </div>
      <p class="per-resumo small" id="per-resumo"></p>
      <label class="field"><span>Motivo <small class="muted">(opcional)</small></span><input name="motivo" maxlength="120" placeholder="Ex.: manutenção"></label>
      <div class="pills sm">${["Manutenção","Evento particular","Férias","Reforma"].map(n=>`<button type="button" class="pill-btn" data-mot="${n}">${n}</button>`).join("")}</div>
      <button class="btn block">Salvar período</button>
    </form>
    <h3 class="cal-sub">Programados <span class="seg-n">${(r||[]).length}</span></h3>
    <div class="per-lista">${(r||[]).map(n=>{const b=ca(n.inicio,n.fim)+1;return`<article class="per-item ${n.tipo}" data-id="${n.id}">
        <span class="per-ico">${n.tipo==="aberto"?"🔓":"🔒"}</span>
        <div class="grow"><b>${ka(n.inicio,n.fim)}</b> <span class="small muted">· ${b} dia${b>1?"s":""}</span>
          <p class="small muted">${n.tipo==="aberto"?"Aberto":"Fechado"} · ${v(s(n.cabana_id))}${n.motivo?" · "+v(n.motivo):""}</p></div>
        <button type="button" class="icon-btn danger" data-del aria-label="Remover período" title="Remover">🗑️</button></article>`}).join("")||'<div class="cal-vazio"><span>📅</span><p class="muted small">Nenhum período programado. Todos os dias seguem as Regras.</p></div>'}</div>`;const t=p("#periodo",o),d=t.elements;ve(p("#per-cal",o),p("#per-dica",o),{nomeFeriado:n=>ja(n,c||[]),aoMudar:n=>{d.ini.value=n.ini,d.fim.value=n.fim,m(),t.dispatchEvent(new Event("input",{bubbles:!0}))}});const m=()=>{const n=p("#per-resumo",o);if(!d.ini.value||!d.fim.value)return n.textContent="";const b=ca(d.ini.value,d.fim.value)+1,h=d.tipo.value==="fechado"?"Fecha":"Abre",w=d.cab.value?e.find(_=>_.id===d.cab.value)?.nome:"todas as cabanas";n.innerHTML=`${h} <b>${ka(d.ini.value,d.fim.value)}</b> (${b} dia${b>1?"s":""}) para <b>${v(w)}</b>.`};t.addEventListener("change",m),o.querySelectorAll("[data-mot]").forEach(n=>n.addEventListener("click",()=>{d.motivo.value=n.dataset.mot})),t.addEventListener("submit",async n=>{if(n.preventDefault(),!d.ini.value)return L("Toque no calendário no primeiro e no último dia.","bad");if(!d.fim.value)return L("Toque no último dia (para um dia só, toque de novo no mesmo dia).","bad");await M(t.querySelector(".btn.block"),async()=>{const{error:b}=await k.from("calendario").insert({cabana_id:d.cab.value||null,tipo:d.tipo.value,inicio:d.ini.value,fim:d.fim.value,motivo:d.motivo.value.trim()||null});if(b)throw b;L("Período salvo.","ok"),ea(a)})}),o.querySelectorAll("[data-del]").forEach(n=>n.addEventListener("click",async()=>{await G("Remover o período?","Os dias voltam a seguir as Regras do calendário.","Remover",!0)&&await M(n,async()=>{const{error:b}=await k.from("calendario").delete().eq("id",n.closest("[data-id]").dataset.id);if(b)throw b;L("Período removido.","ok"),ea(a)})}))}function Se(o,{feriados:e},r){const c=[];for(let s=F(),t=0;t<366;t++,s=Y(s,1)){const d=za(s);d&&c.push({data:s,nome:d})}const a=(s,t)=>`<div class="fer-item" ${t?`data-fer="${s.data}"`:""}>
    <span class="fer-data"><b>${Number(s.data.slice(8))}</b><small>${ia(s.data)}</small></span>
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
    <details class="fer-nac"><summary>🇧🇷 Nacionais, entram sozinhos <span class="seg-n">${c.length}</span></summary>
      <div class="fer-lista nac">${c.map(s=>a(s,!1)).join("")}</div></details>`,p("#feriado",o)?.addEventListener("submit",async s=>{s.preventDefault();const t=s.currentTarget.elements;await M(s.currentTarget.querySelector("button"),async()=>{const{error:d}=await k.from("feriados").insert({data:t.data.value,nome:t.nome.value.trim()});if(d)throw new Error(/duplicate|unique/i.test(d.message)?"Essa data já está cadastrada.":d.message);j.feriados=null,L("Feriado adicionado.","ok"),ea(r)})}),o.querySelectorAll("[data-del-fer]").forEach(s=>s.addEventListener("click",async()=>{await G("Remover o feriado?","Essa data volta a ser cobrada como um dia comum.","Remover",!0)&&await M(s,async()=>{const{error:t}=await k.from("feriados").delete().eq("data",s.closest("[data-fer]").dataset.fer);if(t)throw t;j.feriados=null,ea(r)})}))}function Te(o,{cfg:e},r){o.innerHTML=`
    <form id="regras" class="stack">
      <section class="cal-card stack">
        <h3>Como o calendário funciona</h3>
        <div class="tipo-escolha col" role="radiogroup">
          <label><input type="radio" name="modo" value="aberto" ${e.modo_calendario!=="fechado"?"checked":""}><span><b>✅ Sempre aberto</b><small>Todos os dias da semana marcados abaixo ficam livres. Você fecha só as exceções em "Abrir e fechar".</small></span></label>
          <label><input type="radio" name="modo" value="fechado" ${e.modo_calendario==="fechado"?"checked":""}><span><b>🔐 Só quando eu abrir</b><small>Tudo fica fechado; só os períodos que você abrir podem ser reservados.</small></span></label>
        </div>
        <div class="field" id="dows"><span>Dias da semana em que a diária pode começar</span>
          <div class="dow-pills">${da.map((t,d)=>`<label><input type="checkbox" name="dow" value="${d}" ${e.dias_semana.includes(d)?"checked":""}><span>${t}</span></label>`).join("")}</div></div>
      </section>
      <section class="cal-card stack">
        <h3>Estadia</h3>
        <div class="regra-linha"><span><b>Mínimo</b><small>de diárias por reserva</small></span>${aa("min",e.min_diarias,1,30,"")}</div>
        <div class="regra-linha"><span><b>Máximo</b><small>de diárias por reserva</small></span>${aa("max",e.max_diarias,1,90,"")}</div>
        <div class="regra-linha"><span><b>Antecedência</b><small>dias à frente que podem ser reservados</small></span>${aa("ante",e.antecedencia_max_dias,7,730,"")}</div>
      </section>
      <section class="cal-card stack">
        <h3>Horários</h3>
        <div class="datas-2">
          <label class="field"><span>🔑 Entrada a partir de</span><input type="time" name="cin" value="${v(e.checkin_hora)}"></label>
          <label class="field"><span>👋 Saída até</span><input type="time" name="cout" value="${v(e.checkout_hora)}"></label>
        </div>
      </section>
      <button class="btn block">Salvar regras</button>
    </form>`;const c=p("#regras",o),a=c.elements,s=()=>p("#dows",o).classList.toggle("apagado",a.modo.value==="fechado");c.addEventListener("change",s),s(),o.querySelectorAll(".stp [data-d]").forEach(t=>t.addEventListener("click",()=>{const d=t.closest(".stp"),m=p("input",d);m.value=Math.min(Number(d.dataset.max),Math.max(Number(d.dataset.min),(Number(m.value)||0)+Number(t.dataset.d)))})),c.addEventListener("submit",async t=>{t.preventDefault();const d=Number(a.min.value),m=Number(a.max.value),n=Number(a.ante.value);if(!(d>=1&&d<=30)||!(m>=1&&m<=90)||!(n>=7&&n<=730))return L("Confira os números da estadia.","bad");if(m<d)return L("O máximo precisa ser maior ou igual ao mínimo.","bad");const b=U('input[name="dow"]:checked',c).map(h=>Number(h.value));if(a.modo.value==="aberto"&&!b.length)return L("Marque pelo menos um dia da semana.","bad");await M(c.querySelector(".btn.block"),async()=>{const{error:h}=await k.from("configuracoes").update({modo_calendario:a.modo.value,dias_semana:b,min_diarias:d,max_diarias:m,antecedencia_max_dias:n,checkin_hora:a.cin.value,checkout_hora:a.cout.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(h)throw h;await X(!0),L("Regras salvas.","ok"),ea(r)})})}async function Va(o,e,r=()=>{}){const c=[];let a=0;for(const s of o){r(`Reduzindo e enviando ${++a} de ${o.length}…`);const{big:t,mini:d}=await ne(s),m=crypto.randomUUID(),n=`fotos/${m}.${Ma(t)}`,b=`fotos/${m}-mini.${Ma(d)}`,h=await k.storage.from("fotos").upload(n,t,{contentType:t.type});if(h.error)throw h.error;const w=await k.storage.from("fotos").upload(b,d,{contentType:d.type});if(w.error)throw w.error;const{data:_,error:y}=await k.from("fotos").insert({path:n,mini_path:b,...e}).select("*").single();if(y)throw y;c.push(_)}return r(""),j.fotos=null,z("adm-cabanas"),z("adm-fotos"),c}async function oa(o){const{error:e}=await k.rpc("definir_foto_principal",{p_foto:o});if(e)throw/definir_foto_principal|function/i.test(e.message)?new Error("Rode o arquivo supabase/003_foto_principal.sql no Supabase para usar a foto principal."):e;j.fotos=null,z("adm-cabanas"),z("adm-fotos")}async function ma(o){await B(o,"adm-cabanas",async()=>{const[e,r]=await Promise.all([ta(!0),ua(!0)]);return{cabs:e,todas:r}},({cabs:e,todas:r})=>{const c=a=>{const s=r.filter(t=>t.cabana_id===a.id).sort((t,d)=>(d.principal===!0)-(t.principal===!0)||t.ordem-d.ordem)[0];return s?`<img src="${v(J("fotos",s.mini_path))}" alt="">`:'<span class="cab-sem-foto">Sem foto</span>'};o.innerHTML=`
    ${Ia("add","Nova cabana")}
    <div class="list-cards cab-lista">${e.map(a=>`<article class="card cab-adm" data-id="${a.id}">
      <div class="cab-adm-capa">${c(a)}</div>
      <div class="grow">
        <div class="row between"><h3>${v(a.nome)}</h3>${a.ativa?'<span class="badge ok">Ativa</span>':'<span class="badge muted">Desativada</span>'}</div>
        <p class="small">Até ${a.capacidade} pessoas · ${R(a.preco_diaria_centavos)} a diária</p>
        ${[a.preco_fim_semana_centavos!=null?`Sex a dom ${R(a.preco_fim_semana_centavos)}`:"",a.preco_feriado_centavos!=null?`Feriado ${R(a.preco_feriado_centavos)}`:""].filter(Boolean).map(s=>`<span class="badge">${s}</span>`).join(" ")}
        <p class="small muted">📷 ${r.filter(s=>s.cabana_id===a.id).length} foto(s)</p>
        <button class="btn sm ghost" data-edit>Editar dados e fotos</button>
      </div></article>`).join("")||'<p class="muted">Toque no + para cadastrar a primeira cabana.</p>'}</div>`,p("#add").addEventListener("click",()=>Ea(null,o)),o.querySelectorAll("[data-edit]").forEach(a=>a.addEventListener("click",()=>Ea(e.find(s=>s.id===a.closest("[data-id]").dataset.id),o)))})}function Ea(o,e){const r=document.createElement("dialog");r.className="dialog cab-form";const c=h=>h==null?"":(h/100).toFixed(2).replace(".",","),a=o?.capacidade??2,s=o?.descricao||"";r.innerHTML=`<form class="cf" novalidate>
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
            <div class="cf-money"><i>R$</i><input name="preco" required inputmode="decimal" placeholder="0,00" value="${c(o?.preco_diaria_centavos)}"></div></label>
          <label class="cf-preco"><span>Sexta a domingo</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fds" inputmode="decimal" placeholder="Igual ao normal" value="${c(o?.preco_fim_semana_centavos)}"></div></label>
          <label class="cf-preco"><span>Feriados</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fer" inputmode="decimal" placeholder="Igual a sex a dom" value="${c(o?.preco_feriado_centavos)}"></div></label>
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
  </form>`,document.body.appendChild(r);const t=p("form",r),d=t.elements;p("[data-close]",r).onclick=()=>r.close(),o&&Pe(o,r),d.descricao.addEventListener("input",()=>p(".cf-count b",r).textContent=d.descricao.value.length);const m=p(".cf-stepper output",r);r.querySelectorAll("[data-step]").forEach(h=>h.addEventListener("click",()=>{const w=Math.min(50,Math.max(1,Number(d.capacidade.value)+Number(h.dataset.step)));d.capacidade.value=w,m.innerHTML=`<b>${w}</b> ${w===1?"pessoa":"pessoas"}`}));const n=h=>h.trim()?ra(h)??void 0:null,b=()=>{const h=ra(d.preco.value),w=p("#cf-sim",r);if(h===null)return w.textContent="";const _=n(d.preco_fds.value),y=n(d.preco_fer.value),u=_??h;w.innerHTML=`<b>Exemplo:</b> quinta a sábado (2 diárias) = ${R(h)} + ${R(u)} = <b>${R(h+u)}</b>`+(y!=null?` · uma diária de feriado = <b>${R(y)}</b>`:"")};["preco","preco_fds","preco_fer"].forEach(h=>d[h].addEventListener("input",b)),b(),t.addEventListener("submit",async h=>{h.preventDefault();const w=(i,l)=>{i.focus(),L(l,"bad")};if(d.nome.value.trim().length<2)return w(d.nome,"Escreva o nome da cabana.");const _=ra(d.preco.value);if(_===null)return w(d.preco,"Valor da diária inválido.");const y=n(d.preco_fds.value);if(y===void 0)return w(d.preco_fds,"Valor de sexta a domingo inválido.");const u=n(d.preco_fer.value);if(u===void 0)return w(d.preco_fer,"Valor de feriado inválido.");const $={nome:d.nome.value.trim(),descricao:d.descricao.value.trim()||null,capacidade:Number(d.capacidade.value),preco_diaria_centavos:_,ordem:Number(d.ordem.value)||0,ativa:d.ativa.checked};(y!==null||o?.preco_fim_semana_centavos!=null)&&($.preco_fim_semana_centavos=y),(u!==null||o?.preco_feriado_centavos!=null)&&($.preco_feriado_centavos=u),await M(t.querySelector(".cf-foot .btn"),async()=>{const{data:i,error:l}=o?await k.from("cabanas").update($).eq("id",o.id).select("*").single():await k.from("cabanas").insert($).select("*").single();if(l)throw/preco_fim_semana|preco_feriado/.test(l.message)?new Error("Rode o arquivo supabase/007_precos_fim_semana.sql no Supabase para usar os valores de fim de semana e feriado."):l;j.cabanas=null,z("vitrine"),r.close(),z("adm-cabanas"),ma(e),o?L("Cabana salva.","ok"):(L("Cabana criada! Agora adicione as fotos.","ok"),Ea(i,e))})}),p("[data-del]",r)?.addEventListener("click",async()=>{if(!await G("Excluir a cabana?","Cabanas com reservas não podem ser excluídas: nesse caso, desative.","Excluir",!0))return;const{error:h}=await k.from("cabanas").delete().eq("id",o.id);if(h)return L(/foreign|violates/i.test(h.message)?'Esta cabana tem reservas. Desligue "Ativa" em vez de excluir.':h.message,"bad");r.close(),z("adm-cabanas"),ma(e)}),r.addEventListener("close",()=>{r.remove(),o&&ma(e)}),r.showModal()}async function Pe(o,e){const r=p("#cab-fotos",e),c=async()=>{const s=(await ua(!0)).filter(t=>t.cabana_id===o.id).sort((t,d)=>(d.principal===!0)-(t.principal===!0)||t.ordem-d.ordem);return r.innerHTML=s.length?s.map(t=>`<div class="cab-foto ${t.principal?"principal":""}" data-id="${t.id}">
          <img src="${v(J("fotos",t.mini_path))}" alt="">
          <button type="button" class="cf-star" data-star title="${t.principal?"Foto principal":"Tornar principal"}" aria-label="Tornar principal">${t.principal?"⭐":"☆"}</button>
          <button type="button" class="cf-del" data-del-foto title="Apagar" aria-label="Apagar foto">✕</button>
        </div>`).join(""):'<p class="small muted">Nenhuma foto ainda.</p>',s};let a=await c();r.addEventListener("click",async s=>{const t=s.target.closest(".cab-foto");if(!t)return;const d=a.find(m=>m.id===t.dataset.id);if(s.target.closest("[data-star]")&&!d.principal)try{await oa(d.id),L("Foto principal escolhida.","ok"),a=await c()}catch(m){O(m)}if(s.target.closest("[data-del-foto]")){if(!await G("Apagar esta foto?","","Apagar",!0))return;const{error:m}=await k.from("fotos").delete().eq("id",d.id);if(m)return O(m);await k.storage.from("fotos").remove([d.path,d.mini_path]),j.fotos=null,z("adm-cabanas"),z("adm-fotos"),a=await c(),d.principal&&a[0]&&await oa(a[0].id).catch(()=>{}),a=await c()}}),p("#cab-up",e).addEventListener("change",async s=>{const t=[...s.target.files];if(s.target.value="",!t.length)return;const d=s.target.closest("label");d.classList.add("busy");try{const m=!a.some(b=>b.principal),n=await Va(t,{cabana_id:o.id,na_galeria:!0,no_carrossel:!1,ordem:a.length},b=>p("#cab-prog",e).textContent=b);m&&n[0]&&await oa(n[0].id).catch(()=>{}),L(`${n.length} foto(s) adicionada(s).`,"ok"),a=await c()}catch(m){O(m)}finally{d.classList.remove("busy")}})}let H="todas";const Me=(o,e)=>e.filter(r=>r.cabana_id===o.id).sort((r,c)=>(c.principal===!0)-(r.principal===!0)||r.ordem-c.ordem)[0];async function Ne(o){let e=[],r=[];const c=()=>{j.fotos=null,z("adm-cabanas"),z("adm-fotos"),z("vitrine")},a=m=>m?r.find(n=>n.id===m)?.nome||"Cabana":"Geral",s=()=>{const n=[...r.filter(u=>u.ativa).map(u=>Me(u,e)).filter(Boolean),...e.filter(u=>u.no_carrossel&&!u.cabana_id)],b=[["todas","📸 Todas",e.length],["carrossel","🎠 Carrossel",n.length],["galeria","🖼️ Galeria",e.filter(u=>u.na_galeria).length],["gerais","🏞️ Gerais",e.filter(u=>!u.cabana_id).length],...r.map(u=>[u.id,`🏡 ${u.nome}`,e.filter($=>$.cabana_id===u.id).length])];b.some(([u])=>u===H)||(H="todas");const h=new Set(n.map(u=>u.id)),w=e.filter(u=>H==="todas"?!0:H==="carrossel"?h.has(u.id):H==="galeria"?u.na_galeria:H==="gerais"?!u.cabana_id:u.cabana_id===H);H==="carrossel"&&w.sort((u,$)=>n.indexOf(u)-n.indexOf($)),o.innerHTML=`
      <section class="fa-car">
        <div class="fa-car-head"><h3>🎠 Carrossel do Início</h3><span class="seg-n">${n.length}</span></div>
        ${n.length?`<div class="fa-car-strip">${n.map((u,$)=>`<button type="button" class="fa-car-item" data-edit="${u.id}">
            <img src="${v(J("fotos",u.mini_path))}" alt="" loading="lazy"><b>${$+1}</b><small>${v(a(u.cabana_id))}</small></button>`).join("")}</div>`:'<p class="small muted">Nenhuma foto no carrossel ainda.</p>'}
        <p class="small muted fa-car-dica">Entram a foto <b>⭐ principal</b> de cada cabana e as fotos gerais com <b>🎠</b> ligado.</p>
      </section>
      <label class="fa-drop" id="drop">
        <input type="file" id="fa-files" accept="image/*" multiple hidden>
        <span class="fa-drop-ico">📷</span><b>Adicionar fotos</b>
        <small>Toque para escolher (pode ser várias). Elas são reduzidas no aparelho antes de enviar.</small>
      </label>
      <div class="ar-filtros fa-filtros" role="tablist">${b.map(([u,$,i])=>`<button type="button" data-f="${u}" class="${u===H?"on":""}">${v($)}<b class="ar-n">${i||""}</b></button>`).join("")}</div>
      ${w.length?`<div class="fa-grid">${w.map(u=>{const $=h.has(u.id);return`<article class="fa-tile ${!$&&!u.na_galeria?"oculta":""}" data-id="${u.id}">
          <button type="button" class="fa-img" data-edit="${u.id}" aria-label="Editar foto">
            <img src="${v(J("fotos",u.mini_path))}" alt="${v(u.legenda||"")}" loading="lazy">
            ${u.principal?'<span class="fa-tag">⭐ Principal</span>':""}
            ${!$&&!u.na_galeria?'<span class="fa-tag escondida">Escondida</span>':""}
          </button>
          <div class="fa-rodape">
            <span class="fa-info"><b>${v(a(u.cabana_id))}</b><small>${v(u.legenda||"Sem legenda")}</small></span>
            <span class="fa-quick">
              ${u.cabana_id?`<button type="button" data-star class="${u.principal?"on":""}" title="${u.principal?"Foto principal da cabana":"Tornar a foto principal"}" aria-label="Foto principal">⭐</button>`:`<button type="button" data-t="no_carrossel" class="${u.no_carrossel?"on":""}" title="Carrossel do Início" aria-label="Carrossel do Início">🎠</button>`}
              <button type="button" data-t="na_galeria" class="${u.na_galeria?"on":""}" title="Galeria" aria-label="Galeria">🖼️</button>
            </span>
          </div>
        </article>`}).join("")}</div>`:'<div class="ar-vazio"><span>🖼️</span><h3>Nenhuma foto aqui</h3><p class="muted small">Toque em "Adicionar fotos" para enviar.</p></div>'}`,o.querySelectorAll("[data-f]").forEach(u=>u.addEventListener("click",()=>{H=u.dataset.f,s(),o.querySelector(".fa-filtros .on")?.scrollIntoView({block:"nearest",inline:"center"})})),o.querySelectorAll("[data-edit]").forEach(u=>u.addEventListener("click",()=>d(e.find($=>$.id===u.dataset.edit))));const _=p("#fa-files",o);_.addEventListener("change",()=>{_.files.length&&t([..._.files]),_.value=""});const y=p("#drop",o);y.addEventListener("dragover",u=>{u.preventDefault(),y.classList.add("sobre")}),y.addEventListener("dragleave",()=>y.classList.remove("sobre")),y.addEventListener("drop",u=>{u.preventDefault(),y.classList.remove("sobre");const $=[...u.dataTransfer.files].filter(i=>i.type.startsWith("image/"));$.length&&t($)}),o.querySelectorAll(".fa-quick button").forEach(u=>u.addEventListener("click",async()=>{const $=e.find(i=>i.id===u.closest("[data-id]").dataset.id);await M(u,async()=>{if(u.hasAttribute("data-star")){if($.principal)return L("Esta já é a foto principal. Escolha outra foto da cabana para trocar.");await oa($.id),e.forEach(i=>{i.cabana_id===$.cabana_id&&(i.principal=i.id===$.id)}),L(`Foto principal da ${a($.cabana_id)} trocada.`,"ok")}else{const i=u.dataset.t,{error:l}=await k.from("fotos").update({[i]:!$[i]}).eq("id",$.id);if(l)throw l;$[i]=!$[i],L(i==="no_carrossel"?$[i]?"Foi para o carrossel.":"Saiu do carrossel.":$[i]?"Aparece na galeria.":"Saiu da galeria.","ok")}c(),s()})}))},t=m=>{const n=m.map($=>URL.createObjectURL($)),b=document.createElement("dialog");b.className="sheet";const h=r.some($=>$.id===H)?H:"";b.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Enviar ${m.length} ${m.length===1?"foto":"fotos"}</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <div class="fa-prev">${n.map($=>`<img src="${$}" alt="">`).join("")}</div>
      <form class="stack" id="fa-up">
        <div class="field"><span>De onde são as fotos?</span>
          <div class="pills">${[["","🏞️ Geral"],...r.map($=>[$.id,`🏡 ${$.nome}`])].map(([$,i])=>`<label class="pill"><input type="radio" name="cab" value="${$}" ${$===h?"checked":""}><span>${v(i)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="sw-car"><span><b>🎠 Carrossel do Início</b><small>Só para fotos gerais (das cabanas vai a ⭐ principal)</small></span><input type="checkbox" name="car" checked><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" checked><i></i></label>
        <div class="fa-prog" hidden><i></i><span></span></div>
        <button class="btn block">Enviar ${m.length===1?"foto":"fotos"}</button>
      </form>`,document.body.appendChild(b);const w=p("#fa-up",b),_=w.elements,y=()=>{p("#sw-car",b).hidden=!!_.cab.value};w.addEventListener("change",y),y();let u=!1;b.addEventListener("cancel",$=>u&&$.preventDefault()),b.addEventListener("click",$=>{!u&&($.target===b||$.target.closest("[data-fechar]"))&&b.close()}),b.addEventListener("close",()=>{n.forEach($=>URL.revokeObjectURL($)),b.remove()}),w.addEventListener("submit",async $=>{$.preventDefault();const i=p(".fa-prog",b);u=!0,i.hidden=!1;try{await M(w.querySelector(".btn"),async()=>{const l=_.cab.value||null,f=l&&!e.some(q=>q.cabana_id===l&&q.principal);let g=0;const x=await Va(m,{cabana_id:l,no_carrossel:!l&&_.car.checked,na_galeria:_.gal.checked},q=>{q&&g++,p("span",i).textContent=q||"Pronto!",p("i",i).style.width=`${Math.round((q?g-1:m.length)/m.length*100)}%`});f&&x[0]&&(await oa(x[0].id).catch(()=>{}),x[0].principal=!0),e=[...x,...e],c(),L(`${x.length} ${x.length===1?"foto enviada":"fotos enviadas"}.`,"ok"),u=!1,b.close(),s()})}finally{u=!1}}),b.showModal()},d=m=>{if(!m)return;const n=document.createElement("dialog");n.className="sheet",n.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Editar foto</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <button type="button" class="fa-grande" data-zoom><img src="${v(J("fotos",m.path))}" alt=""><span>🔍 Ver grande</span></button>
      <form class="stack" id="fa-ed">
        <label class="field"><span>Legenda</span><input name="legenda" maxlength="200" value="${v(m.legenda)}" placeholder="Ex.: Vista da varanda ao pôr do sol"></label>
        <div class="field"><span>De onde é a foto?</span>
          <div class="pills">${[["","🏞️ Geral"],...r.map(_=>[_.id,`🏡 ${_.nome}`])].map(([_,y])=>`<label class="pill"><input type="radio" name="cab" value="${_}" ${(m.cabana_id||"")===_?"checked":""}><span>${v(y)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="ed-car"><span><b>🎠 Carrossel do Início</b><small>Foto geral no carrossel</small></span><input type="checkbox" name="car" ${m.no_carrossel?"checked":""}><i></i></label>
        <label class="cf-switch" id="ed-pri"><span><b>⭐ Foto principal da cabana</b><small>Capa da cabana e foto dela no carrossel</small></span><input type="checkbox" name="pri" ${m.principal?"checked":""}><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" ${m.na_galeria?"checked":""}><i></i></label>
        <div class="regra-linha"><span><b>Posição</b><small>Menor aparece primeiro</small></span>${aa("ordem",m.ordem,-999,999,"")}</div>
        <button class="btn block">Salvar</button>
        <button type="button" class="cf-del" data-apagar>🗑️ Apagar foto</button>
      </form>`,document.body.appendChild(n);const b=p("#fa-ed",n),h=b.elements,w=()=>{p("#ed-car",n).hidden=!!h.cab.value,p("#ed-pri",n).hidden=!h.cab.value};b.addEventListener("change",w),w(),n.querySelectorAll(".stp [data-d]").forEach(_=>_.addEventListener("click",()=>{const y=p("input",_.closest(".stp"));y.value=Math.min(999,Math.max(-999,(Number(y.value)||0)+Number(_.dataset.d)))})),n.addEventListener("click",_=>{(_.target===n||_.target.closest("[data-fechar]"))&&n.close()}),n.addEventListener("close",()=>n.remove()),p("[data-zoom]",n).addEventListener("click",()=>Na([J("fotos",m.path)])),b.addEventListener("submit",async _=>{_.preventDefault(),await M(b.querySelector(".btn.block"),async()=>{const y=h.cab.value||null,u={legenda:h.legenda.value.trim()||null,cabana_id:y,na_galeria:h.gal.checked,no_carrossel:!y&&h.car.checked,ordem:Number(h.ordem.value)||0},{error:$}=await k.from("fotos").update(u).eq("id",m.id);if($)throw $;Object.assign(m,u,y!==(e.find(i=>i.id===m.id)?.cabana_id??null)?{principal:!1}:{}),y&&h.pri.checked&&!m.principal&&(await oa(m.id),e.forEach(i=>{i.cabana_id===y&&(i.principal=i.id===m.id)})),y||(m.principal=!1),e.sort((i,l)=>i.ordem-l.ordem),c(),L("Foto salva.","ok"),n.close(),s()})}),p("[data-apagar]",n).addEventListener("click",async()=>{if(!await G("Apagar esta foto?","Ela sai do app para todos. Não dá para desfazer.","Apagar",!0))return;const{error:_}=await k.from("fotos").delete().eq("id",m.id);if(_)return O(_);await k.storage.from("fotos").remove([m.path,m.mini_path]),e=e.filter(y=>y.id!==m.id),c(),L("Foto apagada.","ok"),n.close(),s()}),n.showModal()};await B(o,"adm-fotos",async()=>{const[m,n]=await Promise.all([ua(!0),ta(!0)]);return{lista:m,cabs:n}},m=>{e=m.lista.map(n=>({...n})),r=m.cabs,s()})}async function Ie(o){await B(o,"adm-clientes",async()=>{const{data:e,error:r}=await k.from("perfis").select("*").order("nome").limit(2e3);if(r)throw r;return e},e=>{o.innerHTML=`
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, região"><button class="btn sm ghost" id="csv">Baixar planilha</button></div>
    <p class="small muted gap-top">${e.length} cliente(s) · ${e.filter(a=>a.receber_email).length} querem novidades por e-mail · ${e.filter(a=>a.receber_push).length} por notificação</p>
    <div id="lista" class="list-cards"></div>`;const r=()=>{const a=p("#busca").value.trim().toLowerCase(),s=e.filter(t=>!a||[t.nome,t.telefone,t.regiao,t.email].some(d=>String(d??"").toLowerCase().includes(a)));p("#lista").innerHTML=s.slice(0,300).map(t=>`<article class="card row gap">
      <span class="avatar" ${t.foto_path?`data-avatar-path="${v(t.foto_path)}"`:""}>${v(Pa(t.nome))}</span>
      <span><strong>${v(t.nome)}</strong><br><span class="small"><a href="${Ra(t.telefone)}" target="_blank" rel="noopener noreferrer">${v(W(t.telefone))}</a> · ${v(t.email||"")}${t.regiao?" · "+v(t.regiao):""}</span>
      <br><span class="small muted">Desde ${V(t.criado_em)}${t.receber_email?" · ✉️ novidades":""}${t.receber_push?" · 🔔 novidades":""}</span></span></article>`).join(""),c()},c=async()=>{for(const a of U("#lista [data-avatar-path]")){const s=await Ya(a.dataset.avatarPath);s&&a.isConnected&&(a.innerHTML=`<img src="${v(s)}" alt="">`)}};p("#busca").addEventListener("input",r),p("#csv").addEventListener("click",()=>_a("clientes.csv",ba([["Nome","E-mail","Celular","Região","Novidades por e-mail","Novidades por notificação","Cadastro"],...e.map(a=>[a.nome,a.email,W(a.telefone),a.regiao,a.receber_email?"sim":"não",a.receber_push?"sim":"não",V(a.criado_em)])]))),r()})}async function ze(o){const e=F();o.innerHTML=`
    <form id="per" class="row wrap gap">
      <label class="field"><span>De</span><input type="date" name="de" value="${e.slice(0,7)}-01"></label>
      <label class="field"><span>Até</span><input type="date" name="ate" value="${Y(Y(e.slice(0,7)+"-01",32).slice(0,7)+"-01",-1)}"></label>
      <button class="btn sm">Ver</button>
    </form>
    <div class="row wrap gap"><button class="chip" data-p="mes">Este mês</button><button class="chip" data-p="ano">Este ano</button><button class="chip" data-p="12">Últimos 12 meses</button></div>
    <div id="rel" class="gap-top"></div>`;const r=p("#per"),c=async()=>{const a=r.elements.de.value,s=r.elements.ate.value,{data:t,error:d}=await k.rpc("relatorio_reservas",{p_de:a,p_ate:s});if(d)return O(d);const m=t.por_situacao||{};p("#rel").innerHTML=`
      <div class="kpis">
        <div class="kpi"><span>Receita confirmada</span><strong>${R(t.receita_centavos)}</strong></div>
        <div class="kpi"><span>Reservas confirmadas</span><strong>${m.confirmada||0}</strong></div>
        <div class="kpi"><span>Diárias vendidas</span><strong>${t.diarias}</strong></div>
        <div class="kpi"><span>Hóspedes</span><strong>${t.hospedes}</strong></div>
        <div class="kpi"><span>Faltam validar</span><strong>${t.nao_validadas}</strong></div>
        <div class="kpi"><span>Todas as reservas</span><strong>${t.total}</strong></div>
      </div>
      <h3 class="section-title">Por cabana</h3>
      <div class="table-wrap"><table class="table"><thead><tr><th>Cabana</th><th>Reservas</th><th>Noites</th><th>Ocupação</th><th>Receita</th></tr></thead>
      <tbody>${t.por_cabana.map(n=>`<tr><td>${v(n.cabana)}</td><td>${n.reservas}</td><td>${n.noites_ocupadas}</td><td><span class="bar"><i style="width:${Math.min(100,Number(n.ocupacao)||0)}%"></i></span> ${n.ocupacao}%</td><td>${R(n.receita_centavos)}</td></tr>`).join("")}</tbody></table></div>
      <h3 class="section-title">Por mês (entrada)</h3>
      <table class="table"><thead><tr><th>Mês</th><th>Reservas</th><th>Receita</th></tr></thead>
      <tbody>${t.por_mes.map(n=>`<tr><td>${v(n.mes.split("-").reverse().join("/"))}</td><td>${n.reservas}</td><td>${R(n.receita_centavos)}</td></tr>`).join("")||'<tr><td colspan="3" class="muted">Sem dados</td></tr>'}</tbody></table>
      <div class="row wrap gap">
        <div class="grow"><h3 class="section-title">Situação</h3><table class="table"><tbody>${Object.entries(m).map(([n,b])=>`<tr><td>${v(la[n]?.label||n)}</td><td>${b}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Origem</h3><table class="table"><tbody>${Object.entries(t.por_origem||{}).map(([n,b])=>`<tr><td>${v(Ta[n]||n)}</td><td>${b}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Região dos hóspedes</h3><table class="table"><tbody>${t.por_regiao.map(n=>`<tr><td>${v(n.regiao)}</td><td>${n.reservas}</td></tr>`).join("")}</tbody></table></div>
      </div>
      <button class="btn ghost" id="csv">Baixar planilha das reservas do período</button>`,p("#csv").addEventListener("click",async()=>{const n=await ta(),{data:b,error:h}=await k.from("reservas").select("*").lte("checkin",s).gt("checkout",a).order("checkin").limit(5e3);if(h)return O(h);_a(`reservas-${a}-a-${s}.csv`,ba([["Código","Cabana","Cliente","Celular","E-mail","Região","Entrada","Saída","Diárias","Pessoas","Valor","Situação","Validada","Origem","Criada em"],...b.map(w=>[w.codigo,n.find(_=>_.id===w.cabana_id)?.nome,w.nome_cliente,W(w.telefone_cliente),w.email_cliente,w.regiao_cliente,V(w.checkin),V(w.checkout),w.diarias,w.hospedes,(w.valor_centavos/100).toFixed(2).replace(".",","),la[w.status]?.label,w.validada?"sim":"não",Ta[w.origem],K(w.criado_em)])]))})};r.addEventListener("submit",a=>{a.preventDefault(),c()}),o.querySelectorAll("[data-p]").forEach(a=>a.addEventListener("click",()=>{const s=a.dataset.p;s==="mes"&&(r.elements.de.value=e.slice(0,7)+"-01"),s==="ano"&&(r.elements.de.value=e.slice(0,4)+"-01-01"),s==="12"&&(r.elements.de.value=Y(e,-365)),r.elements.ate.value=s==="ano"?e.slice(0,4)+"-12-31":s==="12"?e:r.elements.ate.value,c()})),c()}async function je(o){await B(o,"adm-historico",async()=>{const{data:e,error:r}=await k.from("historico_hospedes").select("*").order("checkin",{ascending:!1}).limit(1e4);if(r)throw r;return e},e=>{const r=F();o.innerHTML=`
    <p class="small muted">Registro permanente de todas as hospedagens confirmadas. Ele não é apagado por nada: nem pela limpeza das conversas, nem pela exclusão da conta do cliente.</p>
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, cabana"><button class="btn sm ghost" id="csv">Baixar planilha completa</button></div>
    <p class="small gap-top">${e.length} hospedagem(ns) · ${new Set(e.map(a=>a.telefone||a.email||a.nome)).size} cliente(s)</p>
    <div class="table-wrap"><table class="table" id="tab"></table></div>`;const c=()=>{const a=p("#busca").value.trim().toLowerCase(),s=e.filter(t=>!a||[t.nome,t.telefone,t.email,t.cabana,t.regiao,t.codigo].some(d=>String(d??"").toLowerCase().includes(a)));p("#tab").innerHTML=`<thead><tr><th>Entrada</th><th>Saída</th><th>Hóspede</th><th>Contato</th><th>Cabana</th><th>Pessoas</th><th>Valor</th><th>Situação</th></tr></thead>
      <tbody>${s.slice(0,500).map(t=>`<tr><td>${V(t.checkin)}</td><td>${V(t.checkout)}</td><td>${v(t.nome)}${t.regiao?`<br><span class="muted small">${v(t.regiao)}</span>`:""}</td>
      <td class="small">${v(W(t.telefone))}<br>${v(t.email||"")}</td><td>${v(t.cabana)}</td><td>${t.hospedes}</td><td>${R(t.valor_centavos)}</td>
      <td>${t.situacao==="confirmada"?t.checkout<=r?'<span class="badge ok">Hospedou</span>':'<span class="badge info">Futura</span>':`<span class="badge muted">${v(la[t.situacao]?.label||t.situacao)}</span>`}</td></tr>`).join("")}</tbody>`};p("#busca").addEventListener("input",c),p("#csv").addEventListener("click",()=>_a("historico-de-hospedes.csv",ba([["Código","Entrada","Saída","Diárias","Hóspede","Celular","E-mail","Região","Cabana","Pessoas","Valor","Situação","Confirmada em"],...e.map(a=>[a.codigo,V(a.checkin),V(a.checkout),a.diarias,a.nome,W(a.telefone),a.email,a.regiao,a.cabana,a.hospedes,(a.valor_centavos/100).toFixed(2).replace(".",","),a.situacao,K(a.confirmada_em)])]))),c()})}async function Ua(){const{data:o,error:e}=await k.from("configuracoes_privadas").select("*").eq("id",1).single();if(e)throw e;return o}async function Re(o){await B(o,"adm-privadas",Ua,e=>{const r=j.config?.modo_atendimento==="chatbot"?"chatbot":"ia";o.innerHTML=`
    <form id="modo" class="cal-card stack">
      <h3>💬 Quem responde o cliente no chat</h3>
      <div class="segmented" role="radiogroup">
        <button type="button" data-modo="ia" role="radio">🤖 IA do Google</button>
        <button type="button" data-modo="chatbot" role="radio">🧩 Chatbot</button>
      </div>
      <p class="small muted" id="modo-txt"></p>
    </form>
    <form id="f" class="stack">
      <h3>📝 Informações do chat</h3>
      <p class="small muted">Escreva tudo o que o atendente virtual deve saber para responder aos clientes: regras da casa, o que está incluso, como chegar, animais, crianças, cancelamento, horários, valores extras… As cabanas, preços, disponibilidade e horários de entrada e saída já são enviados automaticamente. A IA lê este texto a cada conversa; o chatbot usa as perguntas criadas a partir dele (logo abaixo).</p>
      <label class="field"><span>Informações para a IA</span><textarea name="prompt" rows="16" maxlength="12000">${v(e.prompt_ia)}</textarea></label>
      <p class="small muted"><span id="cont"></span> / 12000 caracteres</p>
      <button class="btn">Salvar</button>
    </form>
    <form id="bot" class="cal-card stack gap-top">
      <h3>🧩 Perguntas e respostas do chatbot</h3>
      <p class="small muted">O chatbot responde sozinho, sem IA, com os dados do app: dias livres, preços, como reservar, Pix, minhas reservas, como chegar, entrada e saída. Aqui ficam as outras dúvidas: o cliente toca na pergunta ou escreve uma das palavras-chave. Toque em ✨ para a IA montar a lista a partir das Informações do chat; depois confira, ajuste e salve.</p>
      <button type="button" class="btn ghost" id="gerar">✨ Criar com as Informações do chat</button>
      <div id="bot-lista" class="stack"></div>
      <div class="row wrap gap"><button type="button" class="btn ghost sm" id="bot-mais">+ Pergunta</button><span class="small muted" id="bot-cont"></span></div>
      <button class="btn" id="bot-salvar">Salvar perguntas do chatbot</button>
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
    </form>`;const c={ia:"A IA do Google conversa com o cliente, tira dúvidas com as Informações do chat, consulta as datas e faz a reserva pelo próprio chat.",chatbot:"O chatbot responde com botões e respostas prontas, sem IA: dias livres, preços, reserva pelo calendário, Pix, minhas reservas, como chegar e as perguntas abaixo. A conferência do comprovante do Pix continua com a IA."},a=()=>j.config?.modo_atendimento==="chatbot"?"chatbot":"ia",s=p("#modo"),t=i=>{U("[data-modo]",s).forEach(l=>{l.classList.toggle("on",l.dataset.modo===i),l.setAttribute("aria-checked",String(l.dataset.modo===i))}),p("#modo-txt").textContent=c[i]};t(r),s.addEventListener("click",async i=>{const l=i.target.closest("[data-modo]"),f=a();!l||l.dataset.modo===f||(t(l.dataset.modo),await M(l,async()=>{const{error:g}=await k.from("configuracoes").update({modo_atendimento:l.dataset.modo,atualizado_em:new Date().toISOString()}).eq("id",1);if(g)throw t(f),new Error(/modo_atendimento/.test(g.message)?"Rode o arquivo supabase/022_chatbot.sql no Supabase para usar o chatbot.":g.message);await X(!0),L(l.dataset.modo==="chatbot"?"Pronto: o chatbot responde os clientes.":"Pronto: a IA responde os clientes.","ok")}))});const d=60,m=p("#bot-lista"),n=(i={})=>`
    <div class="cal-card stack bot-item">
      <label class="field"><span>Pergunta (vira um botão)</span><input data-k="pergunta" maxlength="120" value="${v(i.pergunta||"")}" placeholder="Pode levar cachorro?"></label>
      <label class="field"><span>Palavras-chave, separadas por vírgula</span><input data-k="palavras" maxlength="400" value="${v((i.palavras||[]).join(", "))}" placeholder="cachorro, pet, animal, gato"></label>
      <label class="field"><span>Resposta</span><textarea data-k="resposta" rows="3" maxlength="1500" placeholder="Sim! Aceitamos pets de pequeno porte 🐶">${v(i.resposta||"")}</textarea></label>
      <div class="row end"><button type="button" class="btn ghost sm" data-tirar>Remover</button></div>
    </div>`,b=()=>{const i=U(".bot-item",m).length;p("#bot-cont").textContent=`${i} de ${d}`,p("#bot-mais").disabled=i>=d},h=i=>{m.innerHTML=i.length?i.map(n).join(""):'<p class="small muted center" data-vazio>Nenhuma pergunta ainda.</p>',b()},w=()=>U(".bot-item",m).map(i=>({pergunta:p('[data-k="pergunta"]',i).value.trim(),palavras:[...new Set(p('[data-k="palavras"]',i).value.split(",").map(l=>l.trim().toLowerCase()).filter(l=>l.length>=2))].slice(0,12),resposta:p('[data-k="resposta"]',i).value.trim()}));h(Array.isArray(e.chatbot_respostas)?e.chatbot_respostas:[]),p("#bot-mais").addEventListener("click",()=>{p("[data-vazio]",m)?.remove(),m.insertAdjacentHTML("beforeend",n()),b(),U(".bot-item",m).pop().querySelector("input").focus()}),m.addEventListener("click",i=>{const l=i.target.closest("[data-tirar]");l&&(l.closest(".bot-item").remove(),p(".bot-item",m)||h([]),b())}),p("#gerar").addEventListener("click",async i=>{const l=i.currentTarget;w().some(g=>g.pergunta||g.resposta)&&!await G("Criar com as Informações do chat","A lista abaixo será trocada pela que a IA montar. Nada muda para os clientes até você tocar em Salvar.","Criar")||await M(l,async()=>{const g=await sa("chat-ia",{acao:"gerar_chatbot"});h(g.perguntas||[]),L(`${(g.perguntas||[]).length} perguntas criadas. Confira e toque em Salvar.`,"ok")})}),p("#bot").addEventListener("submit",async i=>{i.preventDefault();const l=w(),f=l.findIndex(g=>!g.pergunta||!g.resposta);if(f>=0)return L(`Preencha a pergunta e a resposta do item ${f+1} (ou remova).`,"bad");await M(p("#bot-salvar"),async()=>{const{error:g}=await k.from("configuracoes_privadas").update({chatbot_respostas:l,atualizado_em:new Date().toISOString()}).eq("id",1);if(g)throw new Error(/chatbot_respostas/.test(g.message)?"Rode o arquivo supabase/022_chatbot.sql no Supabase para usar o chatbot.":g.message);z("adm-privadas"),L("Perguntas do chatbot salvas.","ok")})});const _=p("#horario"),y=()=>p("#horas").hidden=_.elements.sempre.checked;_.elements.sempre.addEventListener("change",y),y(),_.addEventListener("submit",async i=>{i.preventDefault();const l=_.elements;if(!l.sempre.checked&&(!l.ini.value||!l.fim.value||l.ini.value===l.fim.value))return L("Confira o horário da equipe.","bad");await M(_.querySelector(".btn"),async()=>{const{error:f}=await k.from("configuracoes").update({equipe_inicio:l.sempre.checked?null:l.ini.value,equipe_fim:l.sempre.checked?null:l.fim.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(f)throw new Error(/equipe_/.test(f.message)?"Rode o arquivo supabase/008_chamar_equipe.sql no Supabase para usar o horário da equipe.":f.message);await X(!0),L("Horário salvo.","ok")})});const u=p("#f"),$=()=>p("#cont").textContent=u.elements.prompt.value.length;u.elements.prompt.addEventListener("input",$),$(),u.addEventListener("submit",async i=>{i.preventDefault(),await M(u.querySelector("button"),async()=>{const{error:l}=await k.from("configuracoes_privadas").update({prompt_ia:u.elements.prompt.value.trim(),atualizado_em:new Date().toISOString()}).eq("id",1);if(l)throw l;z("adm-privadas"),L("Informações salvas.","ok")})})})}function Ga({titulo:o,texto:e,qr:r,segredo:c,verificar:a}){return new Promise(s=>{const t=document.createElement("dialog");t.className="dialog",t.innerHTML=`<form><h3>${v(o)}</h3><p>${v(e)}</p>
      ${r?`<img class="mfa-qr" src="${v(r)}" alt="QR Code para o aplicativo de códigos" width="200" height="200">`:""}
      ${c?`<p class="small muted">Ou digite no aplicativo: <code class="mfa-segredo">${v(c)}</code></p>`:""}
      <label class="field"><span>Código de 6 dígitos</span><input name="c" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required></label>
      <p class="warn small" data-erro hidden></p>
      <div class="row end"><button type="button" class="btn ghost" data-voltar>Voltar</button><button class="btn">Confirmar</button></div></form>`,document.body.appendChild(t);let d=!1;const m=t.querySelector("form");t.querySelector("[data-voltar]").onclick=()=>t.close(),m.addEventListener("submit",async n=>{n.preventDefault();const b=t.querySelector("[data-erro]");b.hidden=!0;try{await a(m.elements.c.value),d=!0,t.close()}catch(h){const w=h?.code==="mfa_verification_failed"||/invalid totp/i.test(h?.message||"");b.textContent=`${w?"Código incorreto ou vencido. Confira no aplicativo e tente de novo.":"Não foi possível confirmar o código."} (${h?.code||h?.status||"erro"}: ${h?.message||h})`,b.hidden=!1}}),t.addEventListener("close",()=>{s(d),t.remove()}),t.showModal()})}async function De(){const{data:o,error:e}=await k.auth.mfa.getAuthenticatorAssuranceLevel();if(e)throw e;if(o.currentLevel==="aal2")return!0;const{data:r,error:c}=await k.auth.mfa.listFactors();if(c)throw c;const a=async(n,b)=>{const{error:h}=await k.auth.mfa.challengeAndVerify({factorId:n,code:b});if(h)throw h},s=r.totp.find(n=>n.status==="verified");if(s)return Ga({titulo:"🔒 Código de duas etapas",texto:"Abra o aplicativo de códigos e digite o número desta conta.",verificar:n=>a(s.id,n)});for(const n of r.all.filter(b=>b.status!=="verified"))await k.auth.mfa.unenroll({factorId:n.id}).catch(()=>{});const{data:t,error:d}=await k.auth.mfa.enroll({factorType:"totp",friendlyName:"Chácara Canarinho"});if(d)throw d;const m=await Ga({titulo:"🔒 Ativar a verificação em duas etapas",texto:"Para proteger a chave Pix, leia este QR Code com um aplicativo de códigos (Google Authenticator, por exemplo) e digite o número que aparecer.",qr:t.totp.qr_code,segredo:t.totp.secret,verificar:n=>a(t.id,n)});return m||await k.auth.mfa.unenroll({factorId:t.id}).catch(()=>{}),m}async function Oe(o){const{data:e,error:r}=await k.from("alteracoes_pix").select("em,email,chave_antes,chave_depois").order("id",{ascending:!1}).limit(10);if(r||!e?.length||!o.isConnected)return;const c=a=>`<code>${v(a||"(vazia)")}</code>`;o.innerHTML=`<details class="pix-hist cal-card">
    <summary><span class="li-ico">🕘</span><b class="grow">Alterações do Pix</b><span class="seg-n">${e.length}</span></summary>
    <ol class="pix-linha">${e.map(a=>`<li>
      <small class="muted">${v(K(a.em))} · ${v(a.email||"acesso direto ao banco")}</small>
      <span>${a.chave_antes===a.chave_depois?"Outros dados do Pix":`Chave ${c(a.chave_antes)} → ${c(a.chave_depois)}`}</span></li>`).join("")}</ol>
  </details>`}const Ba={celular:{ph:"(11) 91234-5678",modo:"tel"},cpf:{ph:"Só os números do CPF ou do CNPJ",modo:"numeric"},email:{ph:"pix@exemplo.com",modo:"email"},aleatoria:{ph:"Ex.: 123e4567-e89b-12d3-a456-426614174000",modo:"text"}},Fe=[["💰","Valor exato"],["👤","Recebedor certo"],["📅","Data certa"],["🔢","ID da transação"],["🖼️","Imagem inédita"],["🕵️","Sem montagem"],["🔍","Leitura nítida"]],He=o=>o%24===0?`${o/24} ${o===24?"dia":"dias"}`:`${o} ${o===1?"hora":"horas"}`;async function Qa(o){await B(o,"adm-privadas",Ua,e=>{const r=!!(e.pix_chave&&e.pix_nome);o.innerHTML=`
    <form id="f" class="stack pix-tela">
      <section class="pix-status ${r?"on":"off"}">
        <span class="pix-status-ico" aria-hidden="true">${r?"✅":"⚠️"}</span>
        <div class="grow">
          <b>${r?"Pix ativo":"Pix ainda não está ativo"}</b>
          <p>${r?"Quando o cliente reserva (pelo chat ou pela página da cabana), o QR Code e o Pix copia e cola aparecem no chat.":"Preencha a chave e o nome do recebedor e salve: o Pix passa a aparecer no chat sozinho."}</p>
          ${r?`<p class="pix-status-chave"><span>${v(ga[e.pix_tipo]||"Chave")}</span> <code>${v(e.pix_chave)}</code> · ${v(e.pix_nome)}</p>`:""}
        </div>
      </section>

      <section class="cal-card stack">
        <h3>💠 Dados do Pix</h3>
        <div class="field"><span>Tipo de chave</span>
          <div class="pills">${Object.entries(ga).map(([d,m])=>`<label class="pill"><input type="radio" name="tipo" value="${d}" ${(e.pix_tipo||"celular")===d?"checked":""}><span>${m}</span></label>`).join("")}</div></div>
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
        <div class="regra-linha"><span><b>Horas para pagar</b><small id="prazo-txt"></small></span>${aa("prazo",e.prazo_pagamento_horas,1,168,"")}</div>
      </section>

      <section class="cal-card stack">
        <h3>🤖 Conferência do comprovante</h3>
        <p class="small muted">A IA lê o comprovante e o app confere cada item. O ID da transação e a imagem não podem ter sido usados em outra reserva.</p>
        <ul class="pix-confere">${Fe.map(([d,m])=>`<li><span aria-hidden="true">${d}</span>${m}</li>`).join("")}</ul>
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
    <div id="pix-hist" class="gap-top"></div>`,Oe(p("#pix-hist"));const c=p("#f"),a=c.elements,s=()=>(a.chave.value.trim()?$a(a.tipo.value,a.chave.value):null)!==(e.pix_chave||null)||a.tipo.value!==(e.pix_tipo||"celular")||(a.nome.value.trim()||null)!==(e.pix_nome||null)||a.auto.checked!==!!e.confirmacao_automatica||(a.email.value.trim()||null)!==(e.email_admin||null),t=()=>{const d=Ba[a.tipo.value]||Ba.celular;a.chave.placeholder=d.ph,a.chave.inputMode=d.modo;const m=p("#pix-valida"),n=a.chave.value.trim(),b=n&&$a(a.tipo.value,n);m.className=`pix-valida ${n?b?"ok":"bad":""}`,m.textContent=n?b?`✓ Chave válida${b!==n?`: ${b}`:""}`:`Formato inválido para ${ga[a.tipo.value]}.`:"",U("[data-conta]",c).forEach(w=>{const _=a[w.dataset.conta];w.textContent=`${_.value.length}/${_.maxLength}`});const h=Number(a.prazo.value)||0;p("#prazo-txt").textContent=h?`${He(h)} · depois disso as datas voltam a ficar livres`:"",p("#pix-salvar").textContent=s()?"🔒 Salvar (pede o código)":"Salvar"};c.addEventListener("input",t),c.addEventListener("change",t),U(".stp [data-d]",c).forEach(d=>d.addEventListener("click",()=>{const m=d.closest(".stp"),n=p("input",m);n.value=Math.min(Number(m.dataset.max),Math.max(Number(m.dataset.min),(Number(n.value)||0)+Number(d.dataset.d))),t()})),t(),c.addEventListener("submit",async d=>{d.preventDefault();const m=a.chave.value.trim()?$a(a.tipo.value,a.chave.value):null;if(a.chave.value.trim()&&!m)return L("Chave Pix inválida para o tipo escolhido.","bad");if(m&&!a.nome.value.trim())return L("Informe também o nome do recebedor, como aparece no banco.","bad");const n=Number(a.prazo.value);if(!(n>=1&&n<=168))return L("O prazo para pagar vai de 1 a 168 horas.","bad");const b=s();await M(p("#pix-salvar"),async()=>{if(b&&!await De())return;const{error:h}=await k.from("configuracoes_privadas").update({pix_ativo:!!(m&&a.nome.value.trim()),pix_tipo:a.tipo.value,pix_chave:m,pix_nome:a.nome.value.trim()||null,pix_cidade:a.cidade.value.trim()||null,prazo_pagamento_horas:n,confirmacao_automatica:a.auto.checked,email_admin:a.email.value.trim()||null,atualizado_em:new Date().toISOString()}).eq("id",1);if(h)throw h;L(m?"Pix salvo e ativo no chat.":"Pix salvo.","ok"),z("adm-privadas"),Qa(o)})})})}async function Ve(o){await B(o,"adm-aparencia",()=>X(!0),e=>{o.innerHTML=`
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
    </form>`;const r=p("#f");let c=null,a=e.lat!=null&&e.lng!=null?{lat:e.lat,lng:e.lng}:null,s=!1;const t=()=>{p("#pin-status").innerHTML=a?'<b class="ok-text">📍 Local marcado no mapa</b>':"<b>Sem alfinete no mapa</b>",p("#pin-btn").textContent=a?"📍 Mudar no mapa":"📍 Marcar no mapa"};t();let d=null,m=!(e.ilustracao_versao>0),n=!1;const b=p("#ilus-prev"),h=()=>{d?b.src=URL.createObjectURL(d):b.src=m?"icons/passaro.svg":J("marca",`ilustracao/v${e.ilustracao_versao}.png`),p("#ilus-padrao").hidden=m&&!d,p("#ilus-tam-img").src=b.src},w=Number(e.ilustracao_tamanho)||100,_=()=>{const E=Number(r.elements.ilustam.value);p("#ilus-tam-v").textContent=`${E}%`;const C=Math.round(96*E/100);p("#ilus-tam-img").width=C,p("#ilus-tam-img").height=C};r.elements.ilustam.addEventListener("input",_),_(),h(),r.elements.ilus.addEventListener("change",async()=>{const E=r.elements.ilus.files[0];if(r.elements.ilus.value="",!!E)try{d=await ha(E),d.size>480*1024&&(d=await ha(d,360)),m=!1,n=!0,h(),L("Ilustração escolhida. Toque em Salvar aparência.")}catch(C){O(C)}}),p("#ilus-padrao").addEventListener("click",()=>{d=null,m=!0,n=!0,h(),L("Volta ao passarinho padrão ao salvar.")}),p("#pin-btn").addEventListener("click",async()=>{const E=await he({...a||{},endereco:r.elements.end.value});E!==void 0&&(a=E,s=!0,t(),L(E?"Ponto marcado. Toque em Salvar aparência.":"Alfinete removido. Toque em Salvar aparência."))});let y=null,u=!1;const $=e.icone_versao>0?fetch(ee(e.icone_versao,"logo.png")).then(E=>E.ok?E.blob():null).catch(()=>null):Promise.resolve(null),i=()=>{try{return Number(localStorage.getItem("icone-zoom"))||100}catch{return 100}};let l=!1;r.elements.zoom.value=i();const f=()=>p("#zoom-v").textContent=`${r.elements.zoom.value}%`;f();const g=[],x=async()=>{c=await re(y||"icons/logo.svg",r.elements.fundo.value,Number(r.elements.zoom.value)/100),g.splice(0).forEach(C=>URL.revokeObjectURL(C));const E=C=>{const N=URL.createObjectURL(c[C]);return g.push(N),N};p("#prev").src=E("icon-192.png"),p("#pv-circ").src=p("#pv-arred").src=E("icon-maskable-512.png"),p("#pv-ios").src=E("apple-touch-icon.png")};r.elements.fundo.addEventListener("input",()=>x().catch(O));let q;r.elements.zoom.addEventListener("input",()=>{l=!0,f(),clearTimeout(q),q=setTimeout(()=>x().catch(O),180)}),r.elements.logo.addEventListener("change",async()=>{const E=r.elements.logo.files[0];if(E)try{y=await ha(E),u=!0;const{selo:C,cor:N}=le(await ce(y));C&&N&&(r.elements.fundo.value=N),await x(),p("#logo-padrao").hidden=!1,L(C&&N?"Logo ajustada para ocupar o ícone, com o fundo na cor do selo. Toque em Salvar aparência.":"Logo escolhida. Toque em Salvar aparência para aplicar.")}catch(C){O(C)}finally{r.elements.logo.value=""}}),p("#logo-padrao").addEventListener("click",()=>{y=null,u=!0,p("#logo-padrao").hidden=!0,x().catch(O)}),$.then(E=>(E&&!u&&(y=E),x())).catch(()=>{}),r.elements.cor.addEventListener("input",()=>{document.documentElement.style.setProperty("--brand",r.elements.cor.value),document.documentElement.style.setProperty("--brand-ink",te(r.elements.cor.value))}),x().catch(()=>{}),r.addEventListener("submit",async E=>{E.preventDefault();const C=r.elements,N=ie(C.insta.value);if(N===null)return L("Instagram inválido. Use @perfil ou o endereço do perfil.","bad");const S=Sa(C.cor.value),P=Sa(C.fundo.value);await M(r.querySelector("button"),async()=>{const T=P!==e.cor_icone_fundo||u||l||e.icone_versao===0,A=T?Math.floor(Date.now()/1e3):e.icone_versao;if(T){await $,await x();const Z={...c,...y?{"logo.png":y}:{}};for(const[Za,qa]of Object.entries(Z)){if(qa.size>500*1024)throw new Error("A logo gerou um ícone pesado demais. Use uma imagem mais simples (PNG com fundo transparente).");const{error:Ca}=await k.storage.from("marca").upload(`v${A}/${Za}`,qa,{contentType:"image/png",cacheControl:"31536000"});if(Ca)throw Ca}}let I=e.ilustracao_versao??0;if(n){if(m)I=0;else if(d){I=Math.floor(Date.now()/1e3);const{error:Z}=await k.storage.from("marca").upload(`ilustracao/v${I}.png`,d,{contentType:"image/png",cacheControl:"31536000"});if(Z)throw Z}}const D=Math.min(200,Math.max(50,Math.round(Number(C.ilustam.value)/10)*10||100)),pa=D!==w,{error:Q}=await k.from("configuracoes").update({nome_app:C.nome.value.trim(),cor_principal:S,cor_icone_fundo:P,boas_vindas:C.boas.value.trim(),endereco:C.end.value.trim()||null,instagram_url:N||null,icone_versao:A,atualizado_em:new Date().toISOString(),...s?{lat:a?.lat??null,lng:a?.lng??null}:{},...n?{ilustracao_versao:I}:{},...pa?{ilustracao_tamanho:D}:{}}).eq("id",1);if(Q)throw/ilustracao_tamanho/i.test(Q.message)?new Error("Para salvar o tamanho da ilustração, rode o arquivo supabase/019_tamanho_ilustracao.sql no Supabase."):/ilustracao/i.test(Q.message)?new Error("Para salvar a ilustração, rode o arquivo supabase/006_ilustracao.sql no Supabase."):/lat|lng|column/i.test(Q.message)?new Error("Para salvar o local no mapa, rode o arquivo supabase/005_mapa.sql no Supabase."):Q;s=!1,n&&e.ilustracao_versao>0&&I!==e.ilustracao_versao&&k.storage.from("marca").remove([`ilustracao/v${e.ilustracao_versao}.png`]).catch(()=>{}),n=!1,T&&e.icone_versao>0&&k.storage.from("marca").remove(["icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","logo.png"].map(Z=>`v${e.icone_versao}/${Z}`)).catch(()=>{}),u=!1,l=!1;try{localStorage.setItem("icone-zoom",String(r.elements.zoom.value))}catch{}await X(!0),ae(),z("adm-aparencia"),z("adm-calendario"),L("Aparência salva.","ok")})})})}async function Ja(o){await B(o,"adm-novidades",async()=>{const[{count:e},{count:r},{data:c}]=await Promise.all([k.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_email",!0),k.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_push",!0),k.from("novidades").select("*").order("criado_em",{ascending:!1}).limit(30)]);return{ce:e,cp:r,envios:c}},({ce:e,cp:r,envios:c})=>{o.innerHTML=`
    <form id="f" class="stack card">
      <p class="small muted">Só recebem os clientes que pediram: ${e??0} por e-mail e ${r??0} por notificação.</p>
      <label class="field"><span>Título</span><input name="titulo" required minlength="2" maxlength="80"></label>
      <label class="field"><span>Mensagem</span><textarea name="texto" rows="5" required minlength="2" maxlength="2000"></textarea></label>
      <label class="check"><input type="checkbox" name="email" checked> Enviar por e-mail</label>
      <label class="check"><input type="checkbox" name="push" checked> Enviar por notificação</label>
      <button class="btn">Enviar novidade</button>
    </form>
    <h3 class="section-title">Enviadas</h3>
    ${(c||[]).map(s=>`<article class="card"><strong>${v(s.titulo)}</strong> <span class="muted small">${K(s.criado_em)}</span><p class="small pre">${v(s.texto)}</p><p class="small muted">✉️ ${s.enviados_email} · 🔔 ${s.enviados_push}</p></article>`).join("")||'<p class="muted small">Nenhuma ainda.</p>'}`;const a=p("#f");a.addEventListener("submit",async s=>{s.preventDefault();const t=a.elements;await G("Enviar a novidade?","Ela vai para todos os clientes que pediram.","Enviar")&&await M(a.querySelector("button"),async()=>{const d=await sa("enviar-novidade",{titulo:t.titulo.value.trim(),texto:t.texto.value.trim(),email:t.email.checked,push:t.push.checked});L(`Enviada: ${d.enviados_email} e-mail(s) e ${d.enviados_push} notificação(ões).`,"ok"),z("adm-novidades"),Ja(o)})})})}const Ue=[["🧭","Visão geral",`
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
    <p>Em <a href="#/admin/ia">Chat: IA ou chatbot</a> você escreve o resto: regras da casa, o que está incluso, animais, crianças, cancelamento… Quanto mais completo, melhor ele responde.</p>
    <p>Em <a href="#/admin/ia">Chat: IA ou chatbot</a> você escolhe quem responde: a <b>IA do Google</b> ou o <b>chatbot</b>, que responde com botões e respostas prontas, sem IA (dias livres, preços, reserva pelo calendário, Pix, minhas reservas, como chegar e as perguntas que você cadastrar). Toque em ✨ para a IA montar as perguntas do chatbot com as Informações do chat; confira e salve.</p>
    <p>Em <a href="#/admin/conversas">Conversas dos clientes</a> você lê todas as conversas e pode <b>responder como equipe</b>. O cliente recebe uma notificação e vê a mensagem com o selo "equipe". A IA passa a seguir o que você combinou.</p>
    <p>O ponto colorido indica que a última mensagem é do cliente. O ícone 📅 abre as reservas dele e o ícone verde, o WhatsApp.</p>
    <p>O cliente pode <b>arquivar</b> conversas (arrastando para a esquerda). Depois de 30 dias a conversa arquivada some para o cliente, mas continua aqui para a equipe.</p>
    <p>A equipe pode <b>excluir</b> uma conversa arrastando-a para a esquerda em Conversas dos clientes. Abre uma janela para confirmar ou cancelar; confirmada, a conversa e as mensagens são apagadas de vez, também para o cliente.</p>
    <p><b>🙋 Falar com a equipe:</b> o cliente toca em 🙋 no topo da conversa (ou pede à IA "quero falar com uma pessoa"). Todos os administradores recebem <b>notificação e e-mail</b>; se ninguém responder em 15 minutos, chega um <b>lembrete</b>. A conversa aparece no topo de Conversas dos clientes, em "Chamando a equipe", e o Menu mostra 🙋 com o número de chamados.</p>
    <p>Toque em <b>Assumir</b> (ou simplesmente responda): o cliente vê quem está atendendo e a IA fica pausada. Toque em <b>Encerrar</b> para a IA voltar; ela também volta sozinha depois de 24 h sem mensagens. O horário da equipe (opcional) fica em <a href="#/admin/ia">Chat: IA ou chatbot</a>: fora dele o cliente é avisado e a notificação chega quando a equipe começar.</p>
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
    <div class="ajuda gap-top">${Ue.map(([r,c,a],s)=>`
      <details class="ajuda-item" ${s===0?"open":""}>
        <summary><span class="li-ico">${r}</span><b>${v(c)}</b></summary>
        <div class="ajuda-txt">${a}</div>
      </details>`).join("")}</div>
    <p class="small muted center gap-top">Esta ajuda aparece só para administradores.</p>`;const e=U(".ajuda-item",o);p("#ajuda-busca",o).addEventListener("input",r=>{const c=Wa(r.target.value);for(const a of e){const s=!c||Wa(a.textContent).includes(c);a.hidden=!s,c&&(a.open=s)}})}const Wa=o=>String(o??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();export{ge as ADMIN_SECOES,oo as renderAdmin};
