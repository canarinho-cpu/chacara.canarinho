import{sb as q,state as j,$ as p,$$ as pa,view as Ja,go as Ea,toast as C,fail as O,api as ta,busy as z,confirmDialog as B,promptDialog as Wa,loadConfig as aa,loadCabanas as ea,loadFotos as ua,publicUrl as Q,avatarUrl as Za,applyBrand as Ka,screenCached as va,screenUpdate as ia,screenForget as I,screenForgetPrefix as La,marcaUrl as Xa,loadFeriados as Ya}from"./core.js";import{esc as v,filtrarClientes as ae,fmtMoney as R,fmtDate as V,fmtDateTime as Z,parseMoney as na,normalizeHex as Ca,inkOn as ee,instagramUrl as oe,csv as fa,todayISO as F,addDays as K,STATUS as ra,ORIGENS as Sa,fmtPhone as J,initials as Aa,MESES as ba,daysBetween as la}from"./util.js";import{resizeForGallery as se,makeIconSet as te,extOf as Ta,resizeLogo as ha,analisarLogo as ie,abrirLogo as ne}from"./images.js";import{PIX_TYPES as re,normalizePixKey as le}from"./pix.js";import{statusBadge as ce,openLightbox as Ma,fab as Pa,ICON as de}from"./app.js";import{feriadoNacional as Na,nomeFeriado as za,estadia as me}from"./precos.js";import{calendarioDatas as pe,calendarioPeriodo as ue}from"./calendario-datas.js";import{renderConversasAdmin as ve,renderConversaAdmin as fe}from"./admin-conversas.js";import{marcarNoMapa as be}from"./map.js";const he=[["reservas","✅","Reservas: conferir e validar"],["conversas","💬","Conversas dos clientes"],["calendario","🗓️","Calendário e dias disponíveis"],["cabanas","🏡","Cabanas e fotos das cabanas"],["fotos","🖼️","Fotos do carrossel e da galeria"],["clientes","👥","Clientes"],["relatorios","📊","Relatórios"],["historico","📚","Histórico de hóspedes"],["ia","🤖","Informações do chat (IA)"],["pix","💠","Pix e conferência do comprovante"],["aparencia","🎨","Aparência: cores e ícone"],["novidades","📣","Enviar novidades"],["ajuda","❓","Ajuda: como tudo funciona"]];async function Ye(o,e=[]){const i=he.find(([s])=>s===o);if(!i)return Ea("#/menu");if(o==="conversas"&&e[0])return fe(e[0]);Ja().innerHTML=`
    <section class="admin">
      <header class="admin-head pad"><a href="#/menu" class="back">‹ Menu</a><h1 class="title">${i[1]} ${v(i[2])}</h1></header>
      <div class="pad" id="admin-body"><div class="loading">Carregando…</div></div>
    </section>`;const n=p("#admin-body"),a={reservas:ke,conversas:ve,calendario:Da,cabanas:da,fotos:Pe,clientes:Ne,relatorios:ze,historico:Ie,ia:je,pix:Ua,aparencia:Oe,novidades:Ga,ajuda:He}[o];if(!a)return Ea("#/admin");await a(n)}async function U(o,e,i,n){const a=va(e);let s=!1;const t=()=>s=!0;o.addEventListener("input",t),a!==void 0&&n(a);let r;try{r=await i()}catch(m){if(a===void 0)throw m;return}ia(e,r),o.isConnected&&(a===void 0||!s&&JSON.stringify(r)!==JSON.stringify(a))&&(o.removeEventListener("input",t),n(r))}const ga=(o,e,i="text/csv;charset=utf-8")=>{const n=document.createElement("a");n.href=URL.createObjectURL(new Blob([e],{type:i})),n.download=o,n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),2e3)},Ia=o=>o?`https://wa.me/${encodeURIComponent(o)}`:"",ja=[["validar","🔎","Para conferir"],["proximas","🗓️","Próximas"],["aguardando_pagamento","⏳","Aguardando Pix"],["confirmada","✅","Confirmadas"],["todas","📋","Todas"],["cancelada","🚫","Canceladas"],["recusada","❌","Não confirmadas"],["expirada","⌛","Prazo encerrado"]],ge=["dom.","seg.","ter.","qua.","qui.","sex.","sáb."],$e=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Ra=o=>{const e=new Date(o+"T12:00:00Z");return{dia:String(e.getUTCDate()).padStart(2,"0"),mes:$e[e.getUTCMonth()],sem:ge[e.getUTCDay()]}},_e='<svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1.2-1.1 2 .9c-.2 1.2-1.2 1.9-2.4 1.7-3-.6-5.5-3-6-6-.2-1.2.5-2.2 1.7-2.4l.9 2z"/></svg>';function we(o){if(!["aguardando_pagamento","em_analise","confirmada"].includes(o.status))return"";const e=F();if(o.checkout<=e)return'<span class="ar-quando passado">Já saiu</span>';if(o.checkin<=e)return'<span class="ar-quando agora">🏡 Hospedado agora</span>';const i=la(e,o.checkin);return`<span class="ar-quando">${i===1?"Entra amanhã":`Entra em ${i} dias`}</span>`}function ye(o){if(o.status!=="aguardando_pagamento"||!o.expira_em)return"";const e=Math.round((Date.parse(o.expira_em)-Date.now())/6e4);return e<=0?'<p class="ar-aviso warn">⏳ O prazo do Pix acabou; a reserva vai expirar sozinha.</p>':`<p class="ar-aviso warn">⏳ Esperando o Pix do cliente · prazo de <b>${e<60?`${e} min`:e<1440?`${Math.floor(e/60)} h ${e%60?`${e%60} min`:""}`:`${Math.floor(e/1440)} dia(s)`}</b></p>`}async function ke(o){const e=j.cabanas||va("vitrine")?.cabanas||await ea(),i=c=>e.find(d=>d.id===c)?.nome||"—";let n=sessionStorage.getItem("adm-filtro")||"validar";ja.some(([c])=>c===n)||(n="validar"),o.innerHTML=`
    <div class="ar-busca"><span aria-hidden="true">🔍</span><input id="f-busca" type="search" placeholder="Buscar por nome, código ou celular" autocomplete="off"><button type="button" id="limpar" aria-label="Limpar busca" hidden>✕</button></div>
    <div class="ar-filtros" role="tablist">${ja.map(([c,d,b])=>`<button type="button" role="tab" data-f="${c}" class="${c===n?"on":""}">${d} ${b}<b class="ar-n" data-n="${c}"></b></button>`).join("")}</div>
    <div class="ar-bulk" id="bulk" hidden></div>
    <div id="lista" class="ar-lista"></div>
    ${Pa("nova","Nova reserva")}`;const a=p("#f-busca"),s=sessionStorage.getItem("adm-busca");s&&(sessionStorage.removeItem("adm-busca"),a.value=s,n="todas");const t=()=>{o.querySelectorAll("[data-f]").forEach(c=>c.classList.toggle("on",c.dataset.f===n)),o.querySelector("[data-f].on")?.scrollIntoView({block:"nearest",inline:"center"})};t(),p("#limpar").hidden=!a.value;const r=async()=>{const{data:c}=await q.from("reservas").select("status,validada,checkout").in("status",["aguardando_pagamento","em_analise","confirmada"]).limit(2e3);if(!c||!o.isConnected)return;const d=F(),b={validar:c.filter(_=>_.status==="em_analise"||_.status==="confirmada"&&!_.validada).length,proximas:c.filter(_=>_.checkout>=d).length,aguardando_pagamento:c.filter(_=>_.status==="aguardando_pagamento").length};o.querySelectorAll("[data-n]").forEach(_=>{const y=b[_.dataset.n];_.textContent=y||"",_.classList.toggle("alerta",_.dataset.n==="validar"&&y>0)})};let m=[];const l=c=>n==="validar"?c.status==="em_analise"||c.status==="confirmada"&&!c.validada:n==="proximas"?["aguardando_pagamento","em_analise","confirmada"].includes(c.status)&&c.checkout>=F():n==="todas"||c.status===n,f=c=>{const d=new Map(c.map(b=>[b.id,b]));m=m.map(b=>d.get(b.id)||b).filter(l),La("adm-reservas:"),ia(`adm-reservas:${n}:${a.value.trim()}`,m),$(m),r()},h={validar:["🎉","Tudo conferido!","Nenhum comprovante esperando e nenhuma reserva para validar."],proximas:["🌿","Nenhuma hospedagem pela frente","As próximas reservas aparecem aqui."]},$=c=>{m=c;const d=p("#lista");if(!d)return;const b=c.filter(E=>E.status==="confirmada"&&!E.validada),_=p("#bulk");if(_.hidden=b.length<2,_.innerHTML=`<span><b>${b.length} confirmadas</b> esperando a sua validação</span><button type="button" class="btn sm" id="validar-todas">Validar todas</button>`,d.dataset.ids=JSON.stringify(b.map(E=>E.id)),!c.length){const[E,k,L]=a.value.trim()?["🔍","Nada encontrado",'Confira o nome, o código ou o celular, ou procure em "Todas".']:h[n]||["📭","Nenhuma reserva aqui","Escolha outro filtro acima."];d.innerHTML=`<div class="ar-vazio"><span>${E}</span><h3>${k}</h3><p class="muted small">${L}</p></div>`;return}let y="";d.innerHTML=c.map(E=>{const k=E.checkin.slice(0,7),L=k!==y?`<h3 class="ar-mes">${ba[Number(k.slice(5))-1]} de ${k.slice(0,4)}</h3>`:"";return y=k,L+u(E)}).join("")},w=async()=>{const c=p("#lista"),d=a.value.trim(),b=n,_=`adm-reservas:${b}:${d}`,y=va(_);y?$(y):c.innerHTML='<div class="ar-esqueleto"><i></i><i></i></div>';let E=q.from("reservas").select("*").order("checkin",{ascending:b==="proximas"||b==="validar"}).limit(200);b==="validar"?E=E.or("status.eq.em_analise,and(status.eq.confirmada,validada.eq.false)"):b==="proximas"?E=E.in("status",["aguardando_pagamento","em_analise","confirmada"]).gte("checkout",F()):b!=="todas"&&(E=E.eq("status",b));const k=d.replace(/[,()%]/g,"");k&&(E=E.or(`nome_cliente.ilike.%${k}%,codigo.ilike.%${k}%,telefone_cliente.ilike.%${k.replace(/\D/g,"")||k}%`));const{data:L,error:P}=await E;if(P)return y?void 0:O(P);if(!c.isConnected||a.value.trim()!==d||n!==b)return ia(_,L);JSON.stringify(L)!==JSON.stringify(y)&&$(L),ia(_,L)},x=c=>c.resultado==="aprovado"?["ok","✅ Aprovado pela IA"]:c.resultado==="nao_e_comprovante"?["bad","❌ Não parece um comprovante"]:["warn","⚠️ A IA pediu para conferir"],u=c=>{const d=c.analise_ia,b=ra[c.status]||{label:c.status,tone:""},_=Ra(c.checkin),y=Ra(c.checkout),E=c.telefone_cliente,k=["aguardando_pagamento","em_analise"].includes(c.status),L=k&&c.status==="em_analise"?["confirmar","✅ Confirmar pagamento"]:c.status==="confirmada"&&!c.validada?["validar","☑️ Validar reserva"]:k?["confirmar","✅ Confirmar pagamento"]:null,P=[c.comprovante_path?["ver","Comprovante",""]:null,c.status==="em_analise"?["pedir_novo","Pedir outro",""]:null,k?["recusar","Recusar","danger"]:null,c.status==="confirmada"?["cancelar","Cancelar","danger"]:null].filter(Boolean),[A,M]=d?.verificacoes?x(d):[];return`<article class="res-card adm-res t-${b.tone}" data-id="${c.id}">
      <div class="ar-head">
        <span class="ar-av">${v(Aa(c.nome_cliente))}</span>
        <div class="ar-tit"><h3>${v(c.nome_cliente)}</h3><span class="res-code" title="Feita em ${v(Z(c.criado_em))}">#${v(c.codigo)} · ${c.origem==="chat"?"💬 chat":c.origem==="admin"?"👤 equipe":"📱 app"} · ${new Date(c.criado_em).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}</span></div>
        <span class="res-status ${b.tone}">${v(b.label)}</span>
      </div>
      <div class="ar-cab"><span>🏡 <b>${v(i(c.cabana_id))}</b></span>${we(c)}</div>
      <div class="res-dates">
        <div class="rd"><small>Entrada</small><strong>${_.dia} ${_.mes}</strong><span>${_.sem}</span></div>
        <div class="rd-mid"><span>${c.diarias} ${c.diarias===1?"noite":"noites"}</span></div>
        <div class="rd"><small>Saída</small><strong>${y.dia} ${y.mes}</strong><span>${y.sem}</span></div>
      </div>
      <div class="res-info"><span>${de.people} ${c.hospedes} ${c.hospedes===1?"pessoa":"pessoas"}</span><strong>${R(c.valor_centavos)}</strong></div>
      ${E||c.email_cliente?`<div class="ar-contato">
        ${E?`<a class="ar-ct whats" href="${Ia(E)}" target="_blank" rel="noopener noreferrer">${_e}<span>${v(J(E))}</span></a>`:""}
        ${c.email_cliente?`<a class="ar-ct" href="mailto:${v(c.email_cliente)}">✉️<span>${v(c.email_cliente)}</span></a>`:""}
        ${c.regiao_cliente?`<span class="ar-ct sem">📍<span>${v(c.regiao_cliente)}</span></span>`:""}
      </div>`:""}
      ${ye(c)}
      ${c.status==="em_analise"?'<p class="ar-aviso info">🧾 O cliente enviou o comprovante. Confira no extrato do banco antes de confirmar.</p>':""}
      ${c.status==="confirmada"?c.validada?`<p class="ar-aviso ok">☑️ Validada em ${Z(c.validada_em)}</p>`:'<p class="ar-aviso warn">👀 Confirmada, esperando a sua validação (confira o Pix no extrato).</p>':""}
      ${c.motivo?`<p class="res-motivo">💬 ${v(c.motivo)}</p>`:""}
      ${d?.verificacoes?`<details class="ar-ia ${A}"><summary><span>${M}</span><small>ver detalhes</small></summary>
        <ul>${d.verificacoes.map(T=>`<li class="${T.ok?"ok":"bad"}"><i>${T.ok?"✓":"✗"}</i><span><b>${v(T.regra)}</b><small>${v(T.detalhe)}</small></span></li>`).join("")}</ul>
        ${d.extraido?.pagador_nome?`<p class="small">Pagador: <b>${v(d.extraido.pagador_nome)}</b>${d.extraido.destinatario_instituicao?` · ${v(d.extraido.destinatario_instituicao)}`:""}</p>`:""}
        ${d.extraido?.observacoes?`<p class="small muted">Obs.: ${v(d.extraido.observacoes)}</p>`:""}</details>`:""}
      ${L||P.length?`<div class="ar-acoes">
        ${L?`<button class="btn block" data-a="${L[0]}">${L[1]}</button>`:""}
        ${P.length?`<div class="ar-sec">${P.map(([T,S,N])=>`<button class="btn sm ghost ${N}" data-a="${T}">${S}</button>`).join("")}</div>`:""}
      </div>`:""}
    </article>`};o.querySelectorAll("[data-f]").forEach(c=>c.addEventListener("click",()=>{n!==c.dataset.f&&(n=c.dataset.f,sessionStorage.setItem("adm-filtro",n),t(),w())}));let g;a.addEventListener("input",()=>{p("#limpar").hidden=!a.value,clearTimeout(g),g=setTimeout(w,350)}),p("#limpar").addEventListener("click",()=>{a.value="",p("#limpar").hidden=!0,w(),a.focus()}),p("#nova").addEventListener("click",()=>qe(e,()=>{La("adm-reservas:"),w(),r()})),p("#bulk").addEventListener("click",async c=>{const d=c.target.closest("#validar-todas");if(!d)return;const b=JSON.parse(p("#lista").dataset.ids||"[]");!b.length||!await B(`Validar ${b.length} reserva(s)?`,"Confirme que conferiu os pagamentos no extrato do banco.","Validar todas")||await z(d,async()=>{const _=[];for(const y of b)_.push((await ta("admin-reserva",{acao:"validar",reserva_id:y})).reserva);C("Reservas validadas.","ok"),f(_)})}),p("#lista").addEventListener("click",async c=>{const d=c.target.closest("[data-a]");if(!d)return;const b=d.closest(".adm-res").dataset.id,_=d.dataset.a;if(_==="ver"){await z(d,async()=>{const{data:E}=await q.from("reservas").select("comprovante_path").eq("id",b).single(),{data:k,error:L}=await q.storage.from("comprovantes").createSignedUrl(E.comprovante_path,600);if(L)throw L;Ma([k.signedUrl])});return}let y;if(["recusar","cancelar","pedir_novo"].includes(_)){if(y=await Wa({recusar:"Recusar a reserva",cancelar:"Cancelar a reserva",pedir_novo:"Pedir outro comprovante"}[_],"Motivo (o cliente recebe esta mensagem)","","Enviar"),y===null)return}else if(_==="confirmar"&&!await B("Confirmar o pagamento?","O cliente recebe a confirmação por e-mail e notificação.","Confirmar"))return;await z(d,async()=>{const{reserva:E}=await ta("admin-reserva",{acao:_,reserva_id:b,motivo:y});C({confirmar:"Pagamento confirmado. O cliente foi avisado.",validar:"Reserva validada.",recusar:"Reserva recusada.",cancelar:"Reserva cancelada.",pedir_novo:"Pedido enviado ao cliente."}[_]||"Pronto.","ok"),f([E])})}),w(),r()}function qe(o,e){const i=o.filter(d=>d.ativa),n=document.createElement("dialog");n.className="dialog cab-form",n.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head"><button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button><h3>Nova reserva</h3><span></span></header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Hospedagem</h4>
        <div class="pills">${i.map((d,b)=>`<label class="pill"><input type="radio" name="cabana_id" value="${d.id}" ${b===0?"checked":""}><span>${v(d.nome)}</span></label>`).join("")}</div>
        <input type="hidden" name="checkin"><input type="hidden" name="checkout">
        <p class="muted small" id="nr-dica"></p>
        <div class="calendar" id="nr-cal"></div>
        <div class="legend small"><span class="lg livre"></span>Livre <span class="lg reservado"></span>Reservado <span class="lg fechado"></span>Fechado para clientes <span class="lg-fer"></span>Feriado</div>
        <div class="regra-linha"><span><b>Pessoas</b><small id="nr-cap"></small></span>${sa("hospedes",2,1,50,"")}</div>
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
  </form>`,document.body.appendChild(n);const a=p("form",n),s=a.elements;p("[data-close]",n).onclick=()=>n.close();let t=j.feriados||[];Ya().then(d=>{t=d,m(),l.desenhar()}).catch(()=>{});const r=()=>i.find(d=>d.id===s.cabana_id.value),m=()=>{const d=r(),b=p("#nr-calc",n);if(d&&(p("#nr-cap",n).textContent=`até ${d.capacidade} nesta cabana`),!d||!s.checkin.value||!s.checkout.value){b.textContent="Escolha as datas para ver o valor.";return}const{total:_,grupos:y}=me(d,s.checkin.value,s.checkout.value,t),E=la(s.checkin.value,s.checkout.value),k=[y.normal.n&&`${y.normal.n} normal`,y.fim_semana.n&&`${y.fim_semana.n} sex a dom`,y.feriado.n&&`${y.feriado.n} feriado`].filter(Boolean);b.innerHTML=`<span>${E} ${E===1?"diária":"diárias"}${k.length>1||y.fim_semana.n||y.feriado.n?` <small>(${k.join(" · ")})</small>`:""}</span><b>${R(_)}</b>`},l=pe(p("#nr-cal",n),p("#nr-dica",n),{cabana:s.cabana_id.value,carregar:async(d,b,_)=>{const{data:y,error:E}=await q.rpc("disponibilidade",{p_cabana:d,p_de:b,p_ate:_});if(E)throw E;return y},nomeFeriado:d=>za(d,t),aoMudar:d=>{s.checkin.value=d.checkin,s.checkout.value=d.checkout,m()}});n.querySelectorAll("[name=cabana_id]").forEach(d=>d.addEventListener("change",()=>l.trocarCabana(s.cabana_id.value))),a.addEventListener("change",m),n.querySelectorAll(".stp [data-d]").forEach(d=>d.addEventListener("click",()=>{const b=d.closest(".stp"),_=p("input",b);_.value=Math.min(r()?.capacidade||50,Math.max(1,(Number(_.value)||0)+Number(d.dataset.d)))})),m();let f=null,h=!1,$=null;const w=p("#nr-busca",n),x=p("#nr-lista",n),u=d=>v([J(d.telefone),d.email].filter(Boolean).join(" · ")),g=()=>{if(h){x.innerHTML='<p class="muted small">Não foi possível carregar os clientes. Feche e abra de novo.</p>';return}if(!f){x.innerHTML='<p class="muted small">Carregando clientes…</p>';return}x.innerHTML=ae(f,w.value).map(d=>`<button type="button" class="nr-item" data-id="${v(d.id)}"><b>${v(d.nome)}</b><small>${u(d)}</small></button>`).join("")||'<p class="muted small">Nenhum cliente encontrado. Se for a primeira vez dele, escolha Novo cliente.</p>'},c=d=>{$=d,p("#nr-procura",n).hidden=!!d;const b=p("#nr-escolhido",n);b.hidden=!d,b.innerHTML=d?`<span><b>${v(d.nome)}</b><small>${u(d)}</small></span><button type="button" class="btn sm ghost" data-trocar>Trocar</button>`:"",d||w.focus()};x.addEventListener("click",d=>{const b=d.target.closest("[data-id]")?.dataset.id;b&&c(f.find(_=>_.id===b))}),p("#nr-escolhido",n).addEventListener("click",d=>{d.target.closest("[data-trocar]")&&c(null)}),w.addEventListener("input",g),w.addEventListener("keydown",d=>{d.key==="Enter"&&d.preventDefault()}),n.querySelectorAll("[name=tipo_cliente]").forEach(d=>d.addEventListener("change",()=>{const b=s.tipo_cliente.value==="cadastrado";p("#nr-cadastrado",n).hidden=!b,p("#nr-novo",n).hidden=b})),g(),Promise.all([q.from("perfis").select("id,nome,telefone,email").order("nome").limit(2e3),q.from("admins").select("user_id")]).then(([d,b])=>{if(d.error||b.error)throw d.error||b.error;const _=new Set(b.data.map(y=>y.user_id));f=d.data.filter(y=>!_.has(y.id))}).catch(()=>{h=!0}).finally(g),a.addEventListener("submit",async d=>{d.preventDefault();const b=(k,L)=>{k?.focus(),C(L,"bad")};if(!s.cabana_id.value)return b(null,"Escolha a cabana.");if(!s.checkin.value||!s.checkout.value||s.checkout.value<=s.checkin.value)return b(null,"Escolha a entrada e a saída no calendário.");const _=s.tipo_cliente.value==="cadastrado";if(_&&!$)return b(w,"Escolha o cliente cadastrado.");if(!_&&s.nome.value.trim().length<2)return b(s.nome,"Escreva o nome do cliente.");if(!_&&s.email.value.trim()&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email.value.trim()))return b(s.email,"Confira o e-mail do cliente.");const y=Number(s.hospedes.value);if(!Number.isInteger(y)||y<1)return b(s.hospedes,"Confira o número de pessoas.");if(y>r().capacidade)return b(s.hospedes,`Esta cabana recebe até ${r().capacidade} pessoas.`);const E=s.valor.value.trim()?na(s.valor.value):void 0;if(E===null)return b(s.valor,"Valor inválido.");await z(a.querySelector(".cf-foot .btn"),async()=>{await ta("admin-reserva",{acao:"criar",cabana_id:s.cabana_id.value,checkin:s.checkin.value,checkout:s.checkout.value,hospedes:Number(s.hospedes.value),..._?{cliente_id:$.id}:{nome:s.nome.value,telefone:s.telefone.value,email:s.email.value},valor_centavos:E,confirmada:s.confirmada.checked,motivo:s.obs.value}),C("Reserva criada.","ok"),n.close(),e()})}),n.addEventListener("close",()=>n.remove()),n.showModal()}const xe=[["ocupacao","🗓️","Ocupação"],["periodos","🔒","Abrir e fechar"],["feriados","🎉","Feriados"],["regras","⚙️","Regras"]];let $a="ocupacao",_a=null;const ca=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],wa=o=>new Date(o+"T12:00:00Z").getUTCDay(),oa=o=>ba[Number(o.slice(5,7))-1].slice(0,3);function ya(o,e){const i=Number(o.slice(8)),n=Number(e.slice(8));return o===e?`${i} de ${oa(o)}.`:o.slice(0,7)===e.slice(0,7)?`${i} a ${n} de ${oa(e)}.`:`${i} de ${oa(o)}. a ${n} de ${oa(e)}.`}const sa=(o,e,i,n,a)=>`<div class="stp" data-min="${i}" data-max="${n}">
  <button type="button" data-d="-1" aria-label="Menos">−</button>
  <input type="number" name="${o}" min="${i}" max="${n}" value="${e}" inputmode="numeric">
  <button type="button" data-d="1" aria-label="Mais">+</button><small>${a}</small></div>`;async function Da(o){await U(o,"adm-calendario",async()=>{const[e,i,{data:n,error:a},s]=await Promise.all([aa(!0),ea(!0),q.from("calendario").select("*").gte("fim",F()).order("inicio"),q.from("feriados").select("data,nome").gte("data",F()).order("data")]);if(a)throw a;return{cfg:e,cabs:i,periodos:n,feriados:s.error?null:s.data}},e=>{o.innerHTML=`
      <div class="cal-abas" role="tablist">${xe.map(([a,s,t])=>`<button type="button" role="tab" data-aba="${a}" class="${a===$a?"on":""}"><span>${s}</span>${t}</button>`).join("")}</div>
      <div id="cal-pane"></div>`;const i=p("#cal-pane",o),n=a=>{$a=a,o.querySelectorAll("[data-aba]").forEach(s=>s.classList.toggle("on",s.dataset.aba===a)),{ocupacao:Ee,periodos:Ce,feriados:Se,regras:Ae}[a](i,e,()=>Da(o))};o.querySelectorAll("[data-aba]").forEach(a=>a.addEventListener("click",()=>n(a.dataset.aba))),n($a)})}const X=o=>{I("adm-calendario"),o()};function Ee(o,{cabs:e,feriados:i},n){const a=e.filter(s=>s.ativa);if(!a.length){o.innerHTML='<div class="card center"><p class="muted">Cadastre uma cabana em <a href="#/admin/cabanas">Cabanas</a> para ver a ocupação.</p></div>';return}o.innerHTML='<div id="mapa"><div class="loading">Carregando…</div></div>',Oa(p("#mapa",o),a,i||[],_a||F().slice(0,7),n)}async function Oa(o,e,i,n,a){_a=n;const[s,t]=n.split("-").map(Number),r=`${n}-01`,m=new Date(Date.UTC(s,t,0)).getUTCDate(),l=`${n}-${String(m).padStart(2,"0")}`,f=F(),[{data:h},$]=await Promise.all([q.from("reservas").select("id,cabana_id,checkin,checkout,status,nome_cliente,codigo,hospedes").in("status",["aguardando_pagamento","em_analise","confirmada"]).lte("checkin",l).gt("checkout",r),Promise.all(e.map(A=>q.rpc("disponibilidade",{p_cabana:A.id,p_de:r,p_ate:l}).then(M=>M.data||[])))]);if(!o.isConnected||_a!==n)return;const w=Array.from({length:m},(A,M)=>`${n}-${String(M+1).padStart(2,"0")}`),x=e.map((A,M)=>w.map(T=>{const S=(h||[]).find(N=>N.cabana_id===A.id&&T>=N.checkin&&T<N.checkout);return{d:T,r:S,sit:S?S.status:$[M].find(N=>N.dia===T)?.situacao||"passado"}})),u=x.flat(),g=u.filter(A=>A.r).length,c=u.filter(A=>A.sit==="livre").length,d=u.filter(A=>A.sit==="fechado").length,b=g+c,_=b?Math.round(g/b*100):0,y=new Date(Date.UTC(s,t-2,1)).toISOString().slice(0,7),E=new Date(Date.UTC(s,t,1)).toISOString().slice(0,7),k=A=>Le(A,i);o.innerHTML=`
    <div class="occ-head">
      <button type="button" class="icon-btn" data-m="${y}" aria-label="Mês anterior">‹</button>
      <div class="occ-mes"><strong>${ba[t-1]} de ${s}</strong>${n!==f.slice(0,7)?`<button type="button" class="link-btn" data-m="${f.slice(0,7)}">voltar para hoje</button>`:""}</div>
      <button type="button" class="icon-btn" data-m="${E}" aria-label="Próximo mês">›</button>
    </div>
    <div class="occ-kpis">
      <div class="occ-kpi destaque"><b>${_}%</b><small>ocupação</small><i style="--p:${_}%"></i></div>
      <div class="occ-kpi"><b>${g}</b><small>noites reservadas</small></div>
      <div class="occ-kpi"><b>${c}</b><small>noites livres</small></div>
      <div class="occ-kpi"><b>${d}</b><small>fechadas</small></div>
    </div>
    <div class="occ-card">
      <div class="occ-wrap"><table class="occ">
        <thead><tr><th class="occ-nome"></th>${w.map(A=>{const M=wa(A);return`<th class="${M===0||M===6?"fds":""} ${A===f?"hoje":""} ${k(A)?"fer":""}" title="${v(k(A)||"")}"><small>${ca[M][0]}</small>${Number(A.slice(8))}</th>`}).join("")}</tr></thead>
        <tbody>${e.map((A,M)=>`<tr><th class="occ-nome">${v(A.nome)}</th>${x[M].map((T,S)=>{const N=T.r&&(T.d===T.r.checkin||S===0),D=T.r&&(K(T.d,1)===T.r.checkout||S===m-1);return`<td><button type="button" class="occ-c occ-${T.sit} ${N?"ini":""} ${D?"fim":""} ${T.d===f?"hoje":""}" data-c="${M}" data-i="${S}" aria-label="${v(A.nome)} ${V(T.d)}"></button></td>`}).join("")}</tr>`).join("")}</tbody></table></div>
      <div class="occ-legenda small">
        <span><i class="occ-confirmada"></i>Confirmada</span><span><i class="occ-aguardando_pagamento"></i>Aguardando Pix</span>
        <span><i class="occ-em_analise"></i>Em análise</span><span><i class="occ-livre"></i>Livre</span><span><i class="occ-fechado"></i>Fechado</span>
      </div>
    </div>
    <div id="occ-info" class="occ-info"><p class="small muted">👆 Toque num dia para ver a reserva ou para abrir e fechar a data.</p></div>`,o.querySelectorAll("[data-m]").forEach(A=>A.addEventListener("click",()=>{o.querySelector(".occ-card")?.classList.add("carregando"),Oa(o,e,i,A.dataset.m,a)}));const L=p("#occ-info",o);o.querySelector(".occ").addEventListener("click",A=>{const M=A.target.closest(".occ-c");if(!M)return;o.querySelectorAll(".occ-c.sel").forEach(D=>D.classList.remove("sel")),M.classList.add("sel");const T=e[Number(M.dataset.c)],S=x[Number(M.dataset.c)][Number(M.dataset.i)],N=`<div class="occ-info-tit"><b>${v(T.nome)}</b><span>${ca[wa(S.d)]}, ${V(S.d)}${k(S.d)?` · 🎉 ${v(k(S.d))}`:""}</span></div>`;if(S.r)L.innerHTML=`${N}<div class="occ-info-res">${ce(S.r.status)}
        <p><b>${v(S.r.nome_cliente)}</b> · ${S.r.hospedes} pessoa(s)</p>
        <p class="small muted">Reserva ${v(S.r.codigo)} · ${ya(S.r.checkin,K(S.r.checkout,-1))} (saída ${V(S.r.checkout)})</p>
        <a class="btn sm ghost" href="#/admin/reservas">Ver em Reservas ›</a></div>`;else if(S.sit==="livre"||S.sit==="fechado"){const D=S.sit==="livre";L.innerHTML=`${N}<p class="occ-info-sit ${S.sit}">${D?"🟢 Livre para reservar":"⚪ Fechado para reservas"}</p>
        <button type="button" class="btn sm ${D?"ghost danger":""}" id="occ-acao">${D?"🔒 Fechar este dia":"🔓 Abrir este dia"}</button>`,p("#occ-acao",L).addEventListener("click",ma=>z(ma.currentTarget,async()=>{const{error:G}=await q.from("calendario").insert({cabana_id:T.id,tipo:D?"fechado":"aberto",inicio:S.d,fim:S.d,motivo:null});if(G)throw G;C(D?"Dia fechado.":"Dia aberto.","ok"),X(a)}))}else L.innerHTML=`${N}<p class="small muted">${S.d<f?"Data que já passou.":"Fora do prazo de reservas (veja em Regras)."}</p>`;L.scrollIntoView({block:"nearest",behavior:"smooth"})});const P=o.querySelector("thead th.hoje");P&&(o.querySelector(".occ-wrap").scrollLeft=Math.max(0,P.offsetLeft-140))}const Le=(o,e)=>e.find(i=>i.data===o)?.nome||Na(o);function Ce(o,{cabs:e,periodos:i,feriados:n},a){const s=l=>l?e.find(f=>f.id===l)?.nome||"—":"Todas as cabanas";o.innerHTML=`
    <form id="periodo" class="cal-card stack">
      <h3>Novo período</h3>
      <div class="tipo-escolha" role="radiogroup">
        <label><input type="radio" name="tipo" value="fechado" checked><span><b>🔒 Fechar</b><small>Ninguém reserva nesses dias</small></span></label>
        <label><input type="radio" name="tipo" value="aberto"><span><b>🔓 Abrir</b><small>Libera dias que estavam fechados</small></span></label>
      </div>
      <div class="field"><span>Cabana</span>
        <div class="pills">${[["","Todas"],...e.map(l=>[l.id,l.nome])].map(([l,f],h)=>`<label class="pill"><input type="radio" name="cab" value="${l}" ${h===0?"checked":""}><span>${v(f)}</span></label>`).join("")}</div></div>
      <div class="field"><span>Dias</span>
        <p class="muted small" id="per-dica"></p>
        <div class="calendar" id="per-cal"></div>
        <input type="hidden" name="ini"><input type="hidden" name="fim">
      </div>
      <p class="per-resumo small" id="per-resumo"></p>
      <label class="field"><span>Motivo <small class="muted">(opcional)</small></span><input name="motivo" maxlength="120" placeholder="Ex.: manutenção"></label>
      <div class="pills sm">${["Manutenção","Evento particular","Férias","Reforma"].map(l=>`<button type="button" class="pill-btn" data-mot="${l}">${l}</button>`).join("")}</div>
      <button class="btn block">Salvar período</button>
    </form>
    <h3 class="cal-sub">Programados <span class="seg-n">${(i||[]).length}</span></h3>
    <div class="per-lista">${(i||[]).map(l=>{const f=la(l.inicio,l.fim)+1;return`<article class="per-item ${l.tipo}" data-id="${l.id}">
        <span class="per-ico">${l.tipo==="aberto"?"🔓":"🔒"}</span>
        <div class="grow"><b>${ya(l.inicio,l.fim)}</b> <span class="small muted">· ${f} dia${f>1?"s":""}</span>
          <p class="small muted">${l.tipo==="aberto"?"Aberto":"Fechado"} · ${v(s(l.cabana_id))}${l.motivo?" · "+v(l.motivo):""}</p></div>
        <button type="button" class="icon-btn danger" data-del aria-label="Remover período" title="Remover">🗑️</button></article>`}).join("")||'<div class="cal-vazio"><span>📅</span><p class="muted small">Nenhum período programado. Todos os dias seguem as Regras.</p></div>'}</div>`;const t=p("#periodo",o),r=t.elements;ue(p("#per-cal",o),p("#per-dica",o),{nomeFeriado:l=>za(l,n||[]),aoMudar:l=>{r.ini.value=l.ini,r.fim.value=l.fim,m(),t.dispatchEvent(new Event("input",{bubbles:!0}))}});const m=()=>{const l=p("#per-resumo",o);if(!r.ini.value||!r.fim.value)return l.textContent="";const f=la(r.ini.value,r.fim.value)+1,h=r.tipo.value==="fechado"?"Fecha":"Abre",$=r.cab.value?e.find(w=>w.id===r.cab.value)?.nome:"todas as cabanas";l.innerHTML=`${h} <b>${ya(r.ini.value,r.fim.value)}</b> (${f} dia${f>1?"s":""}) para <b>${v($)}</b>.`};t.addEventListener("change",m),o.querySelectorAll("[data-mot]").forEach(l=>l.addEventListener("click",()=>{r.motivo.value=l.dataset.mot})),t.addEventListener("submit",async l=>{if(l.preventDefault(),!r.ini.value)return C("Toque no calendário no primeiro e no último dia.","bad");if(!r.fim.value)return C("Toque no último dia (para um dia só, toque de novo no mesmo dia).","bad");await z(t.querySelector(".btn.block"),async()=>{const{error:f}=await q.from("calendario").insert({cabana_id:r.cab.value||null,tipo:r.tipo.value,inicio:r.ini.value,fim:r.fim.value,motivo:r.motivo.value.trim()||null});if(f)throw f;C("Período salvo.","ok"),X(a)})}),o.querySelectorAll("[data-del]").forEach(l=>l.addEventListener("click",async()=>{await B("Remover o período?","Os dias voltam a seguir as Regras do calendário.","Remover",!0)&&await z(l,async()=>{const{error:f}=await q.from("calendario").delete().eq("id",l.closest("[data-id]").dataset.id);if(f)throw f;C("Período removido.","ok"),X(a)})}))}function Se(o,{feriados:e},i){const n=[];for(let s=F(),t=0;t<366;t++,s=K(s,1)){const r=Na(s);r&&n.push({data:s,nome:r})}const a=(s,t)=>`<div class="fer-item" ${t?`data-fer="${s.data}"`:""}>
    <span class="fer-data"><b>${Number(s.data.slice(8))}</b><small>${oa(s.data)}</small></span>
    <span class="grow"><b>${v(s.nome)}</b><small class="muted">${ca[wa(s.data)]} · ${s.data.slice(0,4)}</small></span>
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
    <details class="fer-nac"><summary>🇧🇷 Nacionais, entram sozinhos <span class="seg-n">${n.length}</span></summary>
      <div class="fer-lista nac">${n.map(s=>a(s,!1)).join("")}</div></details>`,p("#feriado",o)?.addEventListener("submit",async s=>{s.preventDefault();const t=s.currentTarget.elements;await z(s.currentTarget.querySelector("button"),async()=>{const{error:r}=await q.from("feriados").insert({data:t.data.value,nome:t.nome.value.trim()});if(r)throw new Error(/duplicate|unique/i.test(r.message)?"Essa data já está cadastrada.":r.message);j.feriados=null,C("Feriado adicionado.","ok"),X(i)})}),o.querySelectorAll("[data-del-fer]").forEach(s=>s.addEventListener("click",async()=>{await B("Remover o feriado?","Essa data volta a ser cobrada como um dia comum.","Remover",!0)&&await z(s,async()=>{const{error:t}=await q.from("feriados").delete().eq("data",s.closest("[data-fer]").dataset.fer);if(t)throw t;j.feriados=null,X(i)})}))}function Ae(o,{cfg:e},i){o.innerHTML=`
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
        <div class="regra-linha"><span><b>Mínimo</b><small>de diárias por reserva</small></span>${sa("min",e.min_diarias,1,30,"")}</div>
        <div class="regra-linha"><span><b>Máximo</b><small>de diárias por reserva</small></span>${sa("max",e.max_diarias,1,90,"")}</div>
        <div class="regra-linha"><span><b>Antecedência</b><small>dias à frente que podem ser reservados</small></span>${sa("ante",e.antecedencia_max_dias,7,730,"")}</div>
      </section>
      <section class="cal-card stack">
        <h3>Horários</h3>
        <div class="datas-2">
          <label class="field"><span>🔑 Entrada a partir de</span><input type="time" name="cin" value="${v(e.checkin_hora)}"></label>
          <label class="field"><span>👋 Saída até</span><input type="time" name="cout" value="${v(e.checkout_hora)}"></label>
        </div>
      </section>
      <button class="btn block">Salvar regras</button>
    </form>`;const n=p("#regras",o),a=n.elements,s=()=>p("#dows",o).classList.toggle("apagado",a.modo.value==="fechado");n.addEventListener("change",s),s(),o.querySelectorAll(".stp [data-d]").forEach(t=>t.addEventListener("click",()=>{const r=t.closest(".stp"),m=p("input",r);m.value=Math.min(Number(r.dataset.max),Math.max(Number(r.dataset.min),(Number(m.value)||0)+Number(t.dataset.d)))})),n.addEventListener("submit",async t=>{t.preventDefault();const r=Number(a.min.value),m=Number(a.max.value),l=Number(a.ante.value);if(!(r>=1&&r<=30)||!(m>=1&&m<=90)||!(l>=7&&l<=730))return C("Confira os números da estadia.","bad");if(m<r)return C("O máximo precisa ser maior ou igual ao mínimo.","bad");const f=pa('input[name="dow"]:checked',n).map(h=>Number(h.value));if(a.modo.value==="aberto"&&!f.length)return C("Marque pelo menos um dia da semana.","bad");await z(n.querySelector(".btn.block"),async()=>{const{error:h}=await q.from("configuracoes").update({modo_calendario:a.modo.value,dias_semana:f,min_diarias:r,max_diarias:m,antecedencia_max_dias:l,checkin_hora:a.cin.value,checkout_hora:a.cout.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(h)throw h;await aa(!0),C("Regras salvas.","ok"),X(i)})})}async function Fa(o,e,i=()=>{}){const n=[];let a=0;for(const s of o){i(`Reduzindo e enviando ${++a} de ${o.length}…`);const{big:t,mini:r}=await se(s),m=crypto.randomUUID(),l=`fotos/${m}.${Ta(t)}`,f=`fotos/${m}-mini.${Ta(r)}`,h=await q.storage.from("fotos").upload(l,t,{contentType:t.type});if(h.error)throw h.error;const $=await q.storage.from("fotos").upload(f,r,{contentType:r.type});if($.error)throw $.error;const{data:w,error:x}=await q.from("fotos").insert({path:l,mini_path:f,...e}).select("*").single();if(x)throw x;n.push(w)}return i(""),j.fotos=null,I("adm-cabanas"),I("adm-fotos"),n}async function Y(o){const{error:e}=await q.rpc("definir_foto_principal",{p_foto:o});if(e)throw/definir_foto_principal|function/i.test(e.message)?new Error("Rode o arquivo supabase/003_foto_principal.sql no Supabase para usar a foto principal."):e;j.fotos=null,I("adm-cabanas"),I("adm-fotos")}async function da(o){await U(o,"adm-cabanas",async()=>{const[e,i]=await Promise.all([ea(!0),ua(!0)]);return{cabs:e,todas:i}},({cabs:e,todas:i})=>{const n=a=>{const s=i.filter(t=>t.cabana_id===a.id).sort((t,r)=>(r.principal===!0)-(t.principal===!0)||t.ordem-r.ordem)[0];return s?`<img src="${v(Q("fotos",s.mini_path))}" alt="">`:'<span class="cab-sem-foto">Sem foto</span>'};o.innerHTML=`
    ${Pa("add","Nova cabana")}
    <div class="list-cards cab-lista">${e.map(a=>`<article class="card cab-adm" data-id="${a.id}">
      <div class="cab-adm-capa">${n(a)}</div>
      <div class="grow">
        <div class="row between"><h3>${v(a.nome)}</h3>${a.ativa?'<span class="badge ok">Ativa</span>':'<span class="badge muted">Desativada</span>'}</div>
        <p class="small">Até ${a.capacidade} pessoas · ${R(a.preco_diaria_centavos)} a diária</p>
        ${[a.preco_fim_semana_centavos!=null?`Sex a dom ${R(a.preco_fim_semana_centavos)}`:"",a.preco_feriado_centavos!=null?`Feriado ${R(a.preco_feriado_centavos)}`:""].filter(Boolean).map(s=>`<span class="badge">${s}</span>`).join(" ")}
        <p class="small muted">📷 ${i.filter(s=>s.cabana_id===a.id).length} foto(s)</p>
        <button class="btn sm ghost" data-edit>Editar dados e fotos</button>
      </div></article>`).join("")||'<p class="muted">Toque no + para cadastrar a primeira cabana.</p>'}</div>`,p("#add").addEventListener("click",()=>ka(null,o)),o.querySelectorAll("[data-edit]").forEach(a=>a.addEventListener("click",()=>ka(e.find(s=>s.id===a.closest("[data-id]").dataset.id),o)))})}function ka(o,e){const i=document.createElement("dialog");i.className="dialog cab-form";const n=h=>h==null?"":(h/100).toFixed(2).replace(".",","),a=o?.capacidade??2,s=o?.descricao||"";i.innerHTML=`<form class="cf" novalidate>
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
            <div class="cf-money"><i>R$</i><input name="preco" required inputmode="decimal" placeholder="0,00" value="${n(o?.preco_diaria_centavos)}"></div></label>
          <label class="cf-preco"><span>Sexta a domingo</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fds" inputmode="decimal" placeholder="Igual ao normal" value="${n(o?.preco_fim_semana_centavos)}"></div></label>
          <label class="cf-preco"><span>Feriados</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fer" inputmode="decimal" placeholder="Igual a sex a dom" value="${n(o?.preco_feriado_centavos)}"></div></label>
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
  </form>`,document.body.appendChild(i);const t=p("form",i),r=t.elements;p("[data-close]",i).onclick=()=>i.close(),o&&Te(o,i),r.descricao.addEventListener("input",()=>p(".cf-count b",i).textContent=r.descricao.value.length);const m=p(".cf-stepper output",i);i.querySelectorAll("[data-step]").forEach(h=>h.addEventListener("click",()=>{const $=Math.min(50,Math.max(1,Number(r.capacidade.value)+Number(h.dataset.step)));r.capacidade.value=$,m.innerHTML=`<b>${$}</b> ${$===1?"pessoa":"pessoas"}`}));const l=h=>h.trim()?na(h)??void 0:null,f=()=>{const h=na(r.preco.value),$=p("#cf-sim",i);if(h===null)return $.textContent="";const w=l(r.preco_fds.value),x=l(r.preco_fer.value),u=w??h;$.innerHTML=`<b>Exemplo:</b> quinta a sábado (2 diárias) = ${R(h)} + ${R(u)} = <b>${R(h+u)}</b>`+(x!=null?` · uma diária de feriado = <b>${R(x)}</b>`:"")};["preco","preco_fds","preco_fer"].forEach(h=>r[h].addEventListener("input",f)),f(),t.addEventListener("submit",async h=>{h.preventDefault();const $=(c,d)=>{c.focus(),C(d,"bad")};if(r.nome.value.trim().length<2)return $(r.nome,"Escreva o nome da cabana.");const w=na(r.preco.value);if(w===null)return $(r.preco,"Valor da diária inválido.");const x=l(r.preco_fds.value);if(x===void 0)return $(r.preco_fds,"Valor de sexta a domingo inválido.");const u=l(r.preco_fer.value);if(u===void 0)return $(r.preco_fer,"Valor de feriado inválido.");const g={nome:r.nome.value.trim(),descricao:r.descricao.value.trim()||null,capacidade:Number(r.capacidade.value),preco_diaria_centavos:w,ordem:Number(r.ordem.value)||0,ativa:r.ativa.checked};(x!==null||o?.preco_fim_semana_centavos!=null)&&(g.preco_fim_semana_centavos=x),(u!==null||o?.preco_feriado_centavos!=null)&&(g.preco_feriado_centavos=u),await z(t.querySelector(".cf-foot .btn"),async()=>{const{data:c,error:d}=o?await q.from("cabanas").update(g).eq("id",o.id).select("*").single():await q.from("cabanas").insert(g).select("*").single();if(d)throw/preco_fim_semana|preco_feriado/.test(d.message)?new Error("Rode o arquivo supabase/007_precos_fim_semana.sql no Supabase para usar os valores de fim de semana e feriado."):d;j.cabanas=null,I("vitrine"),i.close(),I("adm-cabanas"),da(e),o?C("Cabana salva.","ok"):(C("Cabana criada! Agora adicione as fotos.","ok"),ka(c,e))})}),p("[data-del]",i)?.addEventListener("click",async()=>{if(!await B("Excluir a cabana?","Cabanas com reservas não podem ser excluídas: nesse caso, desative.","Excluir",!0))return;const{error:h}=await q.from("cabanas").delete().eq("id",o.id);if(h)return C(/foreign|violates/i.test(h.message)?'Esta cabana tem reservas. Desligue "Ativa" em vez de excluir.':h.message,"bad");i.close(),I("adm-cabanas"),da(e)}),i.addEventListener("close",()=>{i.remove(),o&&da(e)}),i.showModal()}async function Te(o,e){const i=p("#cab-fotos",e),n=async()=>{const s=(await ua(!0)).filter(t=>t.cabana_id===o.id).sort((t,r)=>(r.principal===!0)-(t.principal===!0)||t.ordem-r.ordem);return i.innerHTML=s.length?s.map(t=>`<div class="cab-foto ${t.principal?"principal":""}" data-id="${t.id}">
          <img src="${v(Q("fotos",t.mini_path))}" alt="">
          <button type="button" class="cf-star" data-star title="${t.principal?"Foto principal":"Tornar principal"}" aria-label="Tornar principal">${t.principal?"⭐":"☆"}</button>
          <button type="button" class="cf-del" data-del-foto title="Apagar" aria-label="Apagar foto">✕</button>
        </div>`).join(""):'<p class="small muted">Nenhuma foto ainda.</p>',s};let a=await n();i.addEventListener("click",async s=>{const t=s.target.closest(".cab-foto");if(!t)return;const r=a.find(m=>m.id===t.dataset.id);if(s.target.closest("[data-star]")&&!r.principal)try{await Y(r.id),C("Foto principal escolhida.","ok"),a=await n()}catch(m){O(m)}if(s.target.closest("[data-del-foto]")){if(!await B("Apagar esta foto?","","Apagar",!0))return;const{error:m}=await q.from("fotos").delete().eq("id",r.id);if(m)return O(m);await q.storage.from("fotos").remove([r.path,r.mini_path]),j.fotos=null,I("adm-cabanas"),I("adm-fotos"),a=await n(),r.principal&&a[0]&&await Y(a[0].id).catch(()=>{}),a=await n()}}),p("#cab-up",e).addEventListener("change",async s=>{const t=[...s.target.files];if(s.target.value="",!t.length)return;const r=s.target.closest("label");r.classList.add("busy");try{const m=!a.some(f=>f.principal),l=await Fa(t,{cabana_id:o.id,na_galeria:!0,no_carrossel:!1,ordem:a.length},f=>p("#cab-prog",e).textContent=f);m&&l[0]&&await Y(l[0].id).catch(()=>{}),C(`${l.length} foto(s) adicionada(s).`,"ok"),a=await n()}catch(m){O(m)}finally{r.classList.remove("busy")}})}let H="todas";const Me=(o,e)=>e.filter(i=>i.cabana_id===o.id).sort((i,n)=>(n.principal===!0)-(i.principal===!0)||i.ordem-n.ordem)[0];async function Pe(o){let e=[],i=[];const n=()=>{j.fotos=null,I("adm-cabanas"),I("adm-fotos"),I("vitrine")},a=m=>m?i.find(l=>l.id===m)?.nome||"Cabana":"Geral",s=()=>{const l=[...i.filter(u=>u.ativa).map(u=>Me(u,e)).filter(Boolean),...e.filter(u=>u.no_carrossel&&!u.cabana_id)],f=[["todas","📸 Todas",e.length],["carrossel","🎠 Carrossel",l.length],["galeria","🖼️ Galeria",e.filter(u=>u.na_galeria).length],["gerais","🏞️ Gerais",e.filter(u=>!u.cabana_id).length],...i.map(u=>[u.id,`🏡 ${u.nome}`,e.filter(g=>g.cabana_id===u.id).length])];f.some(([u])=>u===H)||(H="todas");const h=new Set(l.map(u=>u.id)),$=e.filter(u=>H==="todas"?!0:H==="carrossel"?h.has(u.id):H==="galeria"?u.na_galeria:H==="gerais"?!u.cabana_id:u.cabana_id===H);H==="carrossel"&&$.sort((u,g)=>l.indexOf(u)-l.indexOf(g)),o.innerHTML=`
      <section class="fa-car">
        <div class="fa-car-head"><h3>🎠 Carrossel do Início</h3><span class="seg-n">${l.length}</span></div>
        ${l.length?`<div class="fa-car-strip">${l.map((u,g)=>`<button type="button" class="fa-car-item" data-edit="${u.id}">
            <img src="${v(Q("fotos",u.mini_path))}" alt="" loading="lazy"><b>${g+1}</b><small>${v(a(u.cabana_id))}</small></button>`).join("")}</div>`:'<p class="small muted">Nenhuma foto no carrossel ainda.</p>'}
        <p class="small muted fa-car-dica">Entram a foto <b>⭐ principal</b> de cada cabana e as fotos gerais com <b>🎠</b> ligado.</p>
      </section>
      <label class="fa-drop" id="drop">
        <input type="file" id="fa-files" accept="image/*" multiple hidden>
        <span class="fa-drop-ico">📷</span><b>Adicionar fotos</b>
        <small>Toque para escolher (pode ser várias). Elas são reduzidas no aparelho antes de enviar.</small>
      </label>
      <div class="ar-filtros fa-filtros" role="tablist">${f.map(([u,g,c])=>`<button type="button" data-f="${u}" class="${u===H?"on":""}">${v(g)}<b class="ar-n">${c||""}</b></button>`).join("")}</div>
      ${$.length?`<div class="fa-grid">${$.map(u=>{const g=h.has(u.id);return`<article class="fa-tile ${!g&&!u.na_galeria?"oculta":""}" data-id="${u.id}">
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
        </article>`}).join("")}</div>`:'<div class="ar-vazio"><span>🖼️</span><h3>Nenhuma foto aqui</h3><p class="muted small">Toque em "Adicionar fotos" para enviar.</p></div>'}`,o.querySelectorAll("[data-f]").forEach(u=>u.addEventListener("click",()=>{H=u.dataset.f,s(),o.querySelector(".fa-filtros .on")?.scrollIntoView({block:"nearest",inline:"center"})})),o.querySelectorAll("[data-edit]").forEach(u=>u.addEventListener("click",()=>r(e.find(g=>g.id===u.dataset.edit))));const w=p("#fa-files",o);w.addEventListener("change",()=>{w.files.length&&t([...w.files]),w.value=""});const x=p("#drop",o);x.addEventListener("dragover",u=>{u.preventDefault(),x.classList.add("sobre")}),x.addEventListener("dragleave",()=>x.classList.remove("sobre")),x.addEventListener("drop",u=>{u.preventDefault(),x.classList.remove("sobre");const g=[...u.dataTransfer.files].filter(c=>c.type.startsWith("image/"));g.length&&t(g)}),o.querySelectorAll(".fa-quick button").forEach(u=>u.addEventListener("click",async()=>{const g=e.find(c=>c.id===u.closest("[data-id]").dataset.id);await z(u,async()=>{if(u.hasAttribute("data-star")){if(g.principal)return C("Esta já é a foto principal. Escolha outra foto da cabana para trocar.");await Y(g.id),e.forEach(c=>{c.cabana_id===g.cabana_id&&(c.principal=c.id===g.id)}),C(`Foto principal da ${a(g.cabana_id)} trocada.`,"ok")}else{const c=u.dataset.t,{error:d}=await q.from("fotos").update({[c]:!g[c]}).eq("id",g.id);if(d)throw d;g[c]=!g[c],C(c==="no_carrossel"?g[c]?"Foi para o carrossel.":"Saiu do carrossel.":g[c]?"Aparece na galeria.":"Saiu da galeria.","ok")}n(),s()})}))},t=m=>{const l=m.map(g=>URL.createObjectURL(g)),f=document.createElement("dialog");f.className="sheet";const h=i.some(g=>g.id===H)?H:"";f.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Enviar ${m.length} ${m.length===1?"foto":"fotos"}</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <div class="fa-prev">${l.map(g=>`<img src="${g}" alt="">`).join("")}</div>
      <form class="stack" id="fa-up">
        <div class="field"><span>De onde são as fotos?</span>
          <div class="pills">${[["","🏞️ Geral"],...i.map(g=>[g.id,`🏡 ${g.nome}`])].map(([g,c])=>`<label class="pill"><input type="radio" name="cab" value="${g}" ${g===h?"checked":""}><span>${v(c)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="sw-car"><span><b>🎠 Carrossel do Início</b><small>Só para fotos gerais (das cabanas vai a ⭐ principal)</small></span><input type="checkbox" name="car" checked><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" checked><i></i></label>
        <div class="fa-prog" hidden><i></i><span></span></div>
        <button class="btn block">Enviar ${m.length===1?"foto":"fotos"}</button>
      </form>`,document.body.appendChild(f);const $=p("#fa-up",f),w=$.elements,x=()=>{p("#sw-car",f).hidden=!!w.cab.value};$.addEventListener("change",x),x();let u=!1;f.addEventListener("cancel",g=>u&&g.preventDefault()),f.addEventListener("click",g=>{!u&&(g.target===f||g.target.closest("[data-fechar]"))&&f.close()}),f.addEventListener("close",()=>{l.forEach(g=>URL.revokeObjectURL(g)),f.remove()}),$.addEventListener("submit",async g=>{g.preventDefault();const c=p(".fa-prog",f);u=!0,c.hidden=!1;try{await z($.querySelector(".btn"),async()=>{const d=w.cab.value||null,b=d&&!e.some(E=>E.cabana_id===d&&E.principal);let _=0;const y=await Fa(m,{cabana_id:d,no_carrossel:!d&&w.car.checked,na_galeria:w.gal.checked},E=>{E&&_++,p("span",c).textContent=E||"Pronto!",p("i",c).style.width=`${Math.round((E?_-1:m.length)/m.length*100)}%`});b&&y[0]&&(await Y(y[0].id).catch(()=>{}),y[0].principal=!0),e=[...y,...e],n(),C(`${y.length} ${y.length===1?"foto enviada":"fotos enviadas"}.`,"ok"),u=!1,f.close(),s()})}finally{u=!1}}),f.showModal()},r=m=>{if(!m)return;const l=document.createElement("dialog");l.className="sheet",l.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Editar foto</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <button type="button" class="fa-grande" data-zoom><img src="${v(Q("fotos",m.path))}" alt=""><span>🔍 Ver grande</span></button>
      <form class="stack" id="fa-ed">
        <label class="field"><span>Legenda</span><input name="legenda" maxlength="200" value="${v(m.legenda)}" placeholder="Ex.: Vista da varanda ao pôr do sol"></label>
        <div class="field"><span>De onde é a foto?</span>
          <div class="pills">${[["","🏞️ Geral"],...i.map(w=>[w.id,`🏡 ${w.nome}`])].map(([w,x])=>`<label class="pill"><input type="radio" name="cab" value="${w}" ${(m.cabana_id||"")===w?"checked":""}><span>${v(x)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="ed-car"><span><b>🎠 Carrossel do Início</b><small>Foto geral no carrossel</small></span><input type="checkbox" name="car" ${m.no_carrossel?"checked":""}><i></i></label>
        <label class="cf-switch" id="ed-pri"><span><b>⭐ Foto principal da cabana</b><small>Capa da cabana e foto dela no carrossel</small></span><input type="checkbox" name="pri" ${m.principal?"checked":""}><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" ${m.na_galeria?"checked":""}><i></i></label>
        <div class="regra-linha"><span><b>Posição</b><small>Menor aparece primeiro</small></span>${sa("ordem",m.ordem,-999,999,"")}</div>
        <button class="btn block">Salvar</button>
        <button type="button" class="cf-del" data-apagar>🗑️ Apagar foto</button>
      </form>`,document.body.appendChild(l);const f=p("#fa-ed",l),h=f.elements,$=()=>{p("#ed-car",l).hidden=!!h.cab.value,p("#ed-pri",l).hidden=!h.cab.value};f.addEventListener("change",$),$(),l.querySelectorAll(".stp [data-d]").forEach(w=>w.addEventListener("click",()=>{const x=p("input",w.closest(".stp"));x.value=Math.min(999,Math.max(-999,(Number(x.value)||0)+Number(w.dataset.d)))})),l.addEventListener("click",w=>{(w.target===l||w.target.closest("[data-fechar]"))&&l.close()}),l.addEventListener("close",()=>l.remove()),p("[data-zoom]",l).addEventListener("click",()=>Ma([Q("fotos",m.path)])),f.addEventListener("submit",async w=>{w.preventDefault(),await z(f.querySelector(".btn.block"),async()=>{const x=h.cab.value||null,u={legenda:h.legenda.value.trim()||null,cabana_id:x,na_galeria:h.gal.checked,no_carrossel:!x&&h.car.checked,ordem:Number(h.ordem.value)||0},{error:g}=await q.from("fotos").update(u).eq("id",m.id);if(g)throw g;Object.assign(m,u,x!==(e.find(c=>c.id===m.id)?.cabana_id??null)?{principal:!1}:{}),x&&h.pri.checked&&!m.principal&&(await Y(m.id),e.forEach(c=>{c.cabana_id===x&&(c.principal=c.id===m.id)})),x||(m.principal=!1),e.sort((c,d)=>c.ordem-d.ordem),n(),C("Foto salva.","ok"),l.close(),s()})}),p("[data-apagar]",l).addEventListener("click",async()=>{if(!await B("Apagar esta foto?","Ela sai do app para todos. Não dá para desfazer.","Apagar",!0))return;const{error:w}=await q.from("fotos").delete().eq("id",m.id);if(w)return O(w);await q.storage.from("fotos").remove([m.path,m.mini_path]),e=e.filter(x=>x.id!==m.id),n(),C("Foto apagada.","ok"),l.close(),s()}),l.showModal()};await U(o,"adm-fotos",async()=>{const[m,l]=await Promise.all([ua(!0),ea(!0)]);return{lista:m,cabs:l}},m=>{e=m.lista.map(l=>({...l})),i=m.cabs,s()})}async function Ne(o){await U(o,"adm-clientes",async()=>{const{data:e,error:i}=await q.from("perfis").select("*").order("nome").limit(2e3);if(i)throw i;return e},e=>{o.innerHTML=`
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, região"><button class="btn sm ghost" id="csv">Baixar planilha</button></div>
    <p class="small muted gap-top">${e.length} cliente(s) · ${e.filter(a=>a.receber_email).length} querem novidades por e-mail · ${e.filter(a=>a.receber_push).length} por notificação</p>
    <div id="lista" class="list-cards"></div>`;const i=()=>{const a=p("#busca").value.trim().toLowerCase(),s=e.filter(t=>!a||[t.nome,t.telefone,t.regiao,t.email].some(r=>String(r??"").toLowerCase().includes(a)));p("#lista").innerHTML=s.slice(0,300).map(t=>`<article class="card row gap">
      <span class="avatar" ${t.foto_path?`data-avatar-path="${v(t.foto_path)}"`:""}>${v(Aa(t.nome))}</span>
      <span><strong>${v(t.nome)}</strong><br><span class="small"><a href="${Ia(t.telefone)}" target="_blank" rel="noopener noreferrer">${v(J(t.telefone))}</a> · ${v(t.email||"")}${t.regiao?" · "+v(t.regiao):""}</span>
      <br><span class="small muted">Desde ${V(t.criado_em)}${t.receber_email?" · ✉️ novidades":""}${t.receber_push?" · 🔔 novidades":""}</span></span></article>`).join(""),n()},n=async()=>{for(const a of pa("#lista [data-avatar-path]")){const s=await Za(a.dataset.avatarPath);s&&a.isConnected&&(a.innerHTML=`<img src="${v(s)}" alt="">`)}};p("#busca").addEventListener("input",i),p("#csv").addEventListener("click",()=>ga("clientes.csv",fa([["Nome","E-mail","Celular","Região","Novidades por e-mail","Novidades por notificação","Cadastro"],...e.map(a=>[a.nome,a.email,J(a.telefone),a.regiao,a.receber_email?"sim":"não",a.receber_push?"sim":"não",V(a.criado_em)])]))),i()})}async function ze(o){const e=F();o.innerHTML=`
    <form id="per" class="row wrap gap">
      <label class="field"><span>De</span><input type="date" name="de" value="${e.slice(0,7)}-01"></label>
      <label class="field"><span>Até</span><input type="date" name="ate" value="${K(K(e.slice(0,7)+"-01",32).slice(0,7)+"-01",-1)}"></label>
      <button class="btn sm">Ver</button>
    </form>
    <div class="row wrap gap"><button class="chip" data-p="mes">Este mês</button><button class="chip" data-p="ano">Este ano</button><button class="chip" data-p="12">Últimos 12 meses</button></div>
    <div id="rel" class="gap-top"></div>`;const i=p("#per"),n=async()=>{const a=i.elements.de.value,s=i.elements.ate.value,{data:t,error:r}=await q.rpc("relatorio_reservas",{p_de:a,p_ate:s});if(r)return O(r);const m=t.por_situacao||{};p("#rel").innerHTML=`
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
      <tbody>${t.por_cabana.map(l=>`<tr><td>${v(l.cabana)}</td><td>${l.reservas}</td><td>${l.noites_ocupadas}</td><td><span class="bar"><i style="width:${Math.min(100,Number(l.ocupacao)||0)}%"></i></span> ${l.ocupacao}%</td><td>${R(l.receita_centavos)}</td></tr>`).join("")}</tbody></table></div>
      <h3 class="section-title">Por mês (entrada)</h3>
      <table class="table"><thead><tr><th>Mês</th><th>Reservas</th><th>Receita</th></tr></thead>
      <tbody>${t.por_mes.map(l=>`<tr><td>${v(l.mes.split("-").reverse().join("/"))}</td><td>${l.reservas}</td><td>${R(l.receita_centavos)}</td></tr>`).join("")||'<tr><td colspan="3" class="muted">Sem dados</td></tr>'}</tbody></table>
      <div class="row wrap gap">
        <div class="grow"><h3 class="section-title">Situação</h3><table class="table"><tbody>${Object.entries(m).map(([l,f])=>`<tr><td>${v(ra[l]?.label||l)}</td><td>${f}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Origem</h3><table class="table"><tbody>${Object.entries(t.por_origem||{}).map(([l,f])=>`<tr><td>${v(Sa[l]||l)}</td><td>${f}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Região dos hóspedes</h3><table class="table"><tbody>${t.por_regiao.map(l=>`<tr><td>${v(l.regiao)}</td><td>${l.reservas}</td></tr>`).join("")}</tbody></table></div>
      </div>
      <button class="btn ghost" id="csv">Baixar planilha das reservas do período</button>`,p("#csv").addEventListener("click",async()=>{const l=await ea(),{data:f,error:h}=await q.from("reservas").select("*").lte("checkin",s).gt("checkout",a).order("checkin").limit(5e3);if(h)return O(h);ga(`reservas-${a}-a-${s}.csv`,fa([["Código","Cabana","Cliente","Celular","E-mail","Região","Entrada","Saída","Diárias","Pessoas","Valor","Situação","Validada","Origem","Criada em"],...f.map($=>[$.codigo,l.find(w=>w.id===$.cabana_id)?.nome,$.nome_cliente,J($.telefone_cliente),$.email_cliente,$.regiao_cliente,V($.checkin),V($.checkout),$.diarias,$.hospedes,($.valor_centavos/100).toFixed(2).replace(".",","),ra[$.status]?.label,$.validada?"sim":"não",Sa[$.origem],Z($.criado_em)])]))})};i.addEventListener("submit",a=>{a.preventDefault(),n()}),o.querySelectorAll("[data-p]").forEach(a=>a.addEventListener("click",()=>{const s=a.dataset.p;s==="mes"&&(i.elements.de.value=e.slice(0,7)+"-01"),s==="ano"&&(i.elements.de.value=e.slice(0,4)+"-01-01"),s==="12"&&(i.elements.de.value=K(e,-365)),i.elements.ate.value=s==="ano"?e.slice(0,4)+"-12-31":s==="12"?e:i.elements.ate.value,n()})),n()}async function Ie(o){await U(o,"adm-historico",async()=>{const{data:e,error:i}=await q.from("historico_hospedes").select("*").order("checkin",{ascending:!1}).limit(1e4);if(i)throw i;return e},e=>{const i=F();o.innerHTML=`
    <p class="small muted">Registro permanente de todas as hospedagens confirmadas. Ele não é apagado por nada: nem pela limpeza das conversas, nem pela exclusão da conta do cliente.</p>
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, cabana"><button class="btn sm ghost" id="csv">Baixar planilha completa</button></div>
    <p class="small gap-top">${e.length} hospedagem(ns) · ${new Set(e.map(a=>a.telefone||a.email||a.nome)).size} cliente(s)</p>
    <div class="table-wrap"><table class="table" id="tab"></table></div>`;const n=()=>{const a=p("#busca").value.trim().toLowerCase(),s=e.filter(t=>!a||[t.nome,t.telefone,t.email,t.cabana,t.regiao,t.codigo].some(r=>String(r??"").toLowerCase().includes(a)));p("#tab").innerHTML=`<thead><tr><th>Entrada</th><th>Saída</th><th>Hóspede</th><th>Contato</th><th>Cabana</th><th>Pessoas</th><th>Valor</th><th>Situação</th></tr></thead>
      <tbody>${s.slice(0,500).map(t=>`<tr><td>${V(t.checkin)}</td><td>${V(t.checkout)}</td><td>${v(t.nome)}${t.regiao?`<br><span class="muted small">${v(t.regiao)}</span>`:""}</td>
      <td class="small">${v(J(t.telefone))}<br>${v(t.email||"")}</td><td>${v(t.cabana)}</td><td>${t.hospedes}</td><td>${R(t.valor_centavos)}</td>
      <td>${t.situacao==="confirmada"?t.checkout<=i?'<span class="badge ok">Hospedou</span>':'<span class="badge info">Futura</span>':`<span class="badge muted">${v(ra[t.situacao]?.label||t.situacao)}</span>`}</td></tr>`).join("")}</tbody>`};p("#busca").addEventListener("input",n),p("#csv").addEventListener("click",()=>ga("historico-de-hospedes.csv",fa([["Código","Entrada","Saída","Diárias","Hóspede","Celular","E-mail","Região","Cabana","Pessoas","Valor","Situação","Confirmada em"],...e.map(a=>[a.codigo,V(a.checkin),V(a.checkout),a.diarias,a.nome,J(a.telefone),a.email,a.regiao,a.cabana,a.hospedes,(a.valor_centavos/100).toFixed(2).replace(".",","),a.situacao,Z(a.confirmada_em)])]))),n()})}async function Ha(){const{data:o,error:e}=await q.from("configuracoes_privadas").select("*").eq("id",1).single();if(e)throw e;return o}async function je(o){await U(o,"adm-privadas",Ha,e=>{o.innerHTML=`
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
    </form>`;const i=p("#horario"),n=()=>p("#horas").hidden=i.elements.sempre.checked;i.elements.sempre.addEventListener("change",n),n(),i.addEventListener("submit",async t=>{t.preventDefault();const r=i.elements;if(!r.sempre.checked&&(!r.ini.value||!r.fim.value||r.ini.value===r.fim.value))return C("Confira o horário da equipe.","bad");await z(i.querySelector(".btn"),async()=>{const{error:m}=await q.from("configuracoes").update({equipe_inicio:r.sempre.checked?null:r.ini.value,equipe_fim:r.sempre.checked?null:r.fim.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(m)throw new Error(/equipe_/.test(m.message)?"Rode o arquivo supabase/008_chamar_equipe.sql no Supabase para usar o horário da equipe.":m.message);await aa(!0),C("Horário salvo.","ok")})});const a=p("#f"),s=()=>p("#cont").textContent=a.elements.prompt.value.length;a.elements.prompt.addEventListener("input",s),s(),a.addEventListener("submit",async t=>{t.preventDefault(),await z(a.querySelector("button"),async()=>{const{error:r}=await q.from("configuracoes_privadas").update({prompt_ia:a.elements.prompt.value.trim(),atualizado_em:new Date().toISOString()}).eq("id",1);if(r)throw r;I("adm-privadas"),C("Informações salvas.","ok")})})})}function Va({titulo:o,texto:e,qr:i,segredo:n,verificar:a}){return new Promise(s=>{const t=document.createElement("dialog");t.className="dialog",t.innerHTML=`<form><h3>${v(o)}</h3><p>${v(e)}</p>
      ${i?`<img class="mfa-qr" src="${v(i)}" alt="QR Code para o aplicativo de códigos" width="200" height="200">`:""}
      ${n?`<p class="small muted">Ou digite no aplicativo: <code class="mfa-segredo">${v(n)}</code></p>`:""}
      <label class="field"><span>Código de 6 dígitos</span><input name="c" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required></label>
      <p class="warn small" data-erro hidden></p>
      <div class="row end"><button type="button" class="btn ghost" data-voltar>Voltar</button><button class="btn">Confirmar</button></div></form>`,document.body.appendChild(t);let r=!1;const m=t.querySelector("form");t.querySelector("[data-voltar]").onclick=()=>t.close(),m.addEventListener("submit",async l=>{l.preventDefault();const f=t.querySelector("[data-erro]");f.hidden=!0;try{await a(m.elements.c.value),r=!0,t.close()}catch(h){const $=h?.code==="mfa_verification_failed"||/invalid totp/i.test(h?.message||"");f.textContent=`${$?"Código incorreto ou vencido. Confira no aplicativo e tente de novo.":"Não foi possível confirmar o código."} (${h?.code||h?.status||"erro"}: ${h?.message||h})`,f.hidden=!1}}),t.addEventListener("close",()=>{s(r),t.remove()}),t.showModal()})}async function Re(){const{data:o,error:e}=await q.auth.mfa.getAuthenticatorAssuranceLevel();if(e)throw e;if(o.currentLevel==="aal2")return!0;const{data:i,error:n}=await q.auth.mfa.listFactors();if(n)throw n;const a=async(l,f)=>{const{error:h}=await q.auth.mfa.challengeAndVerify({factorId:l,code:f});if(h)throw h},s=i.totp.find(l=>l.status==="verified");if(s)return Va({titulo:"🔒 Código de duas etapas",texto:"Abra o aplicativo de códigos e digite o número desta conta.",verificar:l=>a(s.id,l)});for(const l of i.all.filter(f=>f.status!=="verified"))await q.auth.mfa.unenroll({factorId:l.id}).catch(()=>{});const{data:t,error:r}=await q.auth.mfa.enroll({factorType:"totp",friendlyName:"Chácara Canarinho"});if(r)throw r;const m=await Va({titulo:"🔒 Ativar a verificação em duas etapas",texto:"Para proteger a chave Pix, leia este QR Code com um aplicativo de códigos (Google Authenticator, por exemplo) e digite o número que aparecer.",qr:t.totp.qr_code,segredo:t.totp.secret,verificar:l=>a(t.id,l)});return m||await q.auth.mfa.unenroll({factorId:t.id}).catch(()=>{}),m}async function De(o){const{data:e,error:i}=await q.from("alteracoes_pix").select("em,email,chave_antes,chave_depois").order("id",{ascending:!1}).limit(10);if(i||!e?.length||!o.isConnected)return;const n=a=>v(a||"(vazia)");o.innerHTML=`<h3>Alterações do Pix</h3><ul class="small">${e.map(a=>`<li>${v(Z(a.em))} · ${v(a.email||"acesso direto ao banco")}: ${a.chave_antes===a.chave_depois?"outros dados do Pix":`chave ${n(a.chave_antes)} → ${n(a.chave_depois)}`}</li>`).join("")}</ul>`}async function Ua(o){await U(o,"adm-privadas",Ha,e=>{o.innerHTML=`
    <form id="f" class="stack">
      <p class="card small">${e.pix_chave&&e.pix_nome?"✅ <strong>Pix ativo.</strong> Quando o cliente reserva (pelo chat ou pela página da cabana), o QR Code e o Pix copia e cola aparecem no chat, e ele pode pedir o Pix de novo a qualquer momento.":"⚠️ <strong>Pix ainda não está ativo.</strong> Preencha a chave e o nome do recebedor e salve: o Pix passa a aparecer no chat sozinho."}</p>
      <div class="row gap wrap">
        <label class="field"><span>Tipo de chave</span><select name="tipo">${Object.entries(re).map(([n,a])=>`<option value="${n}" ${e.pix_tipo===n?"selected":""}>${a}</option>`).join("")}</select></label>
        <label class="field grow"><span>Chave Pix</span><input name="chave" maxlength="77" value="${v(e.pix_chave)}"></label>
      </div>
      <div class="row gap wrap">
        <label class="field grow"><span>Nome do recebedor (como aparece no banco)</span><input name="nome" maxlength="25" value="${v(e.pix_nome)}"></label>
        <label class="field"><span>Cidade</span><input name="cidade" maxlength="15" value="${v(e.pix_cidade)}"></label>
      </div>
      <label class="field"><span>Prazo para pagar (horas) — depois disso as datas são liberadas</span><input type="number" name="prazo" min="1" max="168" value="${e.prazo_pagamento_horas}"></label>
      <label class="check"><input type="checkbox" name="auto" ${e.confirmacao_automatica?"checked":""}> Confirmar sozinho quando o comprovante passar em todas as conferências da IA</label>
      <p class="small muted">A IA lê o comprovante e o app confere: valor exato, recebedor (chave ou nome), data depois da reserva, ID da transação válido e nunca usado, imagem nunca usada, sinais de montagem e qualidade da leitura. Se qualquer item falhar, a reserva fica "em análise" para você. Mesmo as confirmadas sozinhas aparecem em Reservas › "Para conferir": confira no extrato do banco e toque em Validar.</p>
      <p class="small muted">Todos os administradores recebem um e-mail (no e-mail da própria conta) e uma notificação no celular quando uma reserva é confirmada ou chega um comprovante para conferir. Para a notificação, cada um precisa ligar "Notificações no celular" no Menu.</p>
      <label class="field"><span>E-mail extra para receber esses avisos (opcional)</span><input type="email" name="email" value="${v(e.email_admin)}" placeholder="ex.: reservas@chacara.com"></label>
      <p class="small muted">🔒 Para alterar a chave, o recebedor, a confirmação automática ou o e-mail de avisos, o app pede o código de duas etapas. Todos os administradores são avisados de cada alteração.</p>
      <button class="btn">Salvar</button>
    </form>
    <div id="pix-hist" class="gap-top"></div>`,De(p("#pix-hist"));const i=p("#f");i.addEventListener("submit",async n=>{n.preventDefault();const a=i.elements,s=a.chave.value.trim()?le(a.tipo.value,a.chave.value):null;if(a.chave.value.trim()&&!s)return C("Chave Pix inválida para o tipo escolhido.","bad");if(s&&!a.nome.value.trim())return C("Informe também o nome do recebedor, como aparece no banco.","bad");const t=s!==(e.pix_chave??null)||a.tipo.value!==e.pix_tipo||(a.nome.value.trim()||null)!==(e.pix_nome??null)||a.auto.checked!==e.confirmacao_automatica||(a.email.value.trim()||null)!==(e.email_admin??null);await z(i.querySelector("button"),async()=>{if(t&&!await Re())return;const{error:r}=await q.from("configuracoes_privadas").update({pix_ativo:!!(s&&a.nome.value.trim()),pix_tipo:a.tipo.value,pix_chave:s,pix_nome:a.nome.value.trim()||null,pix_cidade:a.cidade.value.trim()||null,prazo_pagamento_horas:Number(a.prazo.value),confirmacao_automatica:a.auto.checked,email_admin:a.email.value.trim()||null,atualizado_em:new Date().toISOString()}).eq("id",1);if(r)throw r;C(s?"Pix salvo e ativo no chat.":"Pix salvo.","ok"),I("adm-privadas"),Ua(o)})})})}async function Oe(o){await U(o,"adm-aparencia",()=>aa(!0),e=>{o.innerHTML=`
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
    </form>`;const i=p("#f");let n=null,a=e.lat!=null&&e.lng!=null?{lat:e.lat,lng:e.lng}:null,s=!1;const t=()=>{p("#pin-status").innerHTML=a?'<b class="ok-text">📍 Local marcado no mapa</b>':"<b>Sem alfinete no mapa</b>",p("#pin-btn").textContent=a?"📍 Mudar no mapa":"📍 Marcar no mapa"};t();let r=null,m=!(e.ilustracao_versao>0),l=!1;const f=p("#ilus-prev"),h=()=>{r?f.src=URL.createObjectURL(r):f.src=m?"icons/passaro.svg":Q("marca",`ilustracao/v${e.ilustracao_versao}.png`),p("#ilus-padrao").hidden=m&&!r,p("#ilus-tam-img").src=f.src},$=Number(e.ilustracao_tamanho)||100,w=()=>{const k=Number(i.elements.ilustam.value);p("#ilus-tam-v").textContent=`${k}%`;const L=Math.round(96*k/100);p("#ilus-tam-img").width=L,p("#ilus-tam-img").height=L};i.elements.ilustam.addEventListener("input",w),w(),h(),i.elements.ilus.addEventListener("change",async()=>{const k=i.elements.ilus.files[0];if(i.elements.ilus.value="",!!k)try{r=await ha(k),r.size>480*1024&&(r=await ha(r,360)),m=!1,l=!0,h(),C("Ilustração escolhida. Toque em Salvar aparência.")}catch(L){O(L)}}),p("#ilus-padrao").addEventListener("click",()=>{r=null,m=!0,l=!0,h(),C("Volta ao passarinho padrão ao salvar.")}),p("#pin-btn").addEventListener("click",async()=>{const k=await be({...a||{},endereco:i.elements.end.value});k!==void 0&&(a=k,s=!0,t(),C(k?"Ponto marcado. Toque em Salvar aparência.":"Alfinete removido. Toque em Salvar aparência."))});let x=null,u=!1;const g=e.icone_versao>0?fetch(Xa(e.icone_versao,"logo.png")).then(k=>k.ok?k.blob():null).catch(()=>null):Promise.resolve(null),c=()=>{try{return Number(localStorage.getItem("icone-zoom"))||100}catch{return 100}};let d=!1;i.elements.zoom.value=c();const b=()=>p("#zoom-v").textContent=`${i.elements.zoom.value}%`;b();const _=[],y=async()=>{n=await te(x||"icons/logo.svg",i.elements.fundo.value,Number(i.elements.zoom.value)/100),_.splice(0).forEach(L=>URL.revokeObjectURL(L));const k=L=>{const P=URL.createObjectURL(n[L]);return _.push(P),P};p("#prev").src=k("icon-192.png"),p("#pv-circ").src=p("#pv-arred").src=k("icon-maskable-512.png"),p("#pv-ios").src=k("apple-touch-icon.png")};i.elements.fundo.addEventListener("input",()=>y().catch(O));let E;i.elements.zoom.addEventListener("input",()=>{d=!0,b(),clearTimeout(E),E=setTimeout(()=>y().catch(O),180)}),i.elements.logo.addEventListener("change",async()=>{const k=i.elements.logo.files[0];if(k)try{x=await ha(k),u=!0;const{selo:L,cor:P}=ie(await ne(x));L&&P&&(i.elements.fundo.value=P),await y(),p("#logo-padrao").hidden=!1,C(L&&P?"Logo ajustada para ocupar o ícone, com o fundo na cor do selo. Toque em Salvar aparência.":"Logo escolhida. Toque em Salvar aparência para aplicar.")}catch(L){O(L)}finally{i.elements.logo.value=""}}),p("#logo-padrao").addEventListener("click",()=>{x=null,u=!0,p("#logo-padrao").hidden=!0,y().catch(O)}),g.then(k=>(k&&!u&&(x=k),y())).catch(()=>{}),i.elements.cor.addEventListener("input",()=>{document.documentElement.style.setProperty("--brand",i.elements.cor.value),document.documentElement.style.setProperty("--brand-ink",ee(i.elements.cor.value))}),y().catch(()=>{}),i.addEventListener("submit",async k=>{k.preventDefault();const L=i.elements,P=oe(L.insta.value);if(P===null)return C("Instagram inválido. Use @perfil ou o endereço do perfil.","bad");const A=Ca(L.cor.value),M=Ca(L.fundo.value);await z(i.querySelector("button"),async()=>{const T=M!==e.cor_icone_fundo||u||d||e.icone_versao===0,S=T?Math.floor(Date.now()/1e3):e.icone_versao;if(T){await g,await y();const W={...n,...x?{"logo.png":x}:{}};for(const[Qa,qa]of Object.entries(W)){if(qa.size>500*1024)throw new Error("A logo gerou um ícone pesado demais. Use uma imagem mais simples (PNG com fundo transparente).");const{error:xa}=await q.storage.from("marca").upload(`v${S}/${Qa}`,qa,{contentType:"image/png",cacheControl:"31536000"});if(xa)throw xa}}let N=e.ilustracao_versao??0;if(l){if(m)N=0;else if(r){N=Math.floor(Date.now()/1e3);const{error:W}=await q.storage.from("marca").upload(`ilustracao/v${N}.png`,r,{contentType:"image/png",cacheControl:"31536000"});if(W)throw W}}const D=Math.min(200,Math.max(50,Math.round(Number(L.ilustam.value)/10)*10||100)),ma=D!==$,{error:G}=await q.from("configuracoes").update({nome_app:L.nome.value.trim(),cor_principal:A,cor_icone_fundo:M,boas_vindas:L.boas.value.trim(),endereco:L.end.value.trim()||null,instagram_url:P||null,icone_versao:S,atualizado_em:new Date().toISOString(),...s?{lat:a?.lat??null,lng:a?.lng??null}:{},...l?{ilustracao_versao:N}:{},...ma?{ilustracao_tamanho:D}:{}}).eq("id",1);if(G)throw/ilustracao_tamanho/i.test(G.message)?new Error("Para salvar o tamanho da ilustração, rode o arquivo supabase/019_tamanho_ilustracao.sql no Supabase."):/ilustracao/i.test(G.message)?new Error("Para salvar a ilustração, rode o arquivo supabase/006_ilustracao.sql no Supabase."):/lat|lng|column/i.test(G.message)?new Error("Para salvar o local no mapa, rode o arquivo supabase/005_mapa.sql no Supabase."):G;s=!1,l&&e.ilustracao_versao>0&&N!==e.ilustracao_versao&&q.storage.from("marca").remove([`ilustracao/v${e.ilustracao_versao}.png`]).catch(()=>{}),l=!1,T&&e.icone_versao>0&&q.storage.from("marca").remove(["icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","logo.png"].map(W=>`v${e.icone_versao}/${W}`)).catch(()=>{}),u=!1,d=!1;try{localStorage.setItem("icone-zoom",String(i.elements.zoom.value))}catch{}await aa(!0),Ka(),I("adm-aparencia"),I("adm-calendario"),C("Aparência salva.","ok")})})})}async function Ga(o){await U(o,"adm-novidades",async()=>{const[{count:e},{count:i},{data:n}]=await Promise.all([q.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_email",!0),q.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_push",!0),q.from("novidades").select("*").order("criado_em",{ascending:!1}).limit(30)]);return{ce:e,cp:i,envios:n}},({ce:e,cp:i,envios:n})=>{o.innerHTML=`
    <form id="f" class="stack card">
      <p class="small muted">Só recebem os clientes que pediram: ${e??0} por e-mail e ${i??0} por notificação.</p>
      <label class="field"><span>Título</span><input name="titulo" required minlength="2" maxlength="80"></label>
      <label class="field"><span>Mensagem</span><textarea name="texto" rows="5" required minlength="2" maxlength="2000"></textarea></label>
      <label class="check"><input type="checkbox" name="email" checked> Enviar por e-mail</label>
      <label class="check"><input type="checkbox" name="push" checked> Enviar por notificação</label>
      <button class="btn">Enviar novidade</button>
    </form>
    <h3 class="section-title">Enviadas</h3>
    ${(n||[]).map(s=>`<article class="card"><strong>${v(s.titulo)}</strong> <span class="muted small">${Z(s.criado_em)}</span><p class="small pre">${v(s.texto)}</p><p class="small muted">✉️ ${s.enviados_email} · 🔔 ${s.enviados_push}</p></article>`).join("")||'<p class="muted small">Nenhuma ainda.</p>'}`;const a=p("#f");a.addEventListener("submit",async s=>{s.preventDefault();const t=a.elements;await B("Enviar a novidade?","Ela vai para todos os clientes que pediram.","Enviar")&&await z(a.querySelector("button"),async()=>{const r=await ta("enviar-novidade",{titulo:t.titulo.value.trim(),texto:t.texto.value.trim(),email:t.email.checked,push:t.push.checked});C(`Enviada: ${r.enviados_email} e-mail(s) e ${r.enviados_push} notificação(ões).`,"ok"),I("adm-novidades"),Ga(o)})})})}const Fe=[["🧭","Visão geral",`
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
    </ul>`]];async function He(o){o.innerHTML=`
    <input type="search" id="ajuda-busca" placeholder="Buscar na ajuda (ex.: notificação, Pix, ícone)">
    <div class="ajuda gap-top">${Fe.map(([i,n,a],s)=>`
      <details class="ajuda-item" ${s===0?"open":""}>
        <summary><span class="li-ico">${i}</span><b>${v(n)}</b></summary>
        <div class="ajuda-txt">${a}</div>
      </details>`).join("")}</div>
    <p class="small muted center gap-top">Esta ajuda aparece só para administradores.</p>`;const e=pa(".ajuda-item",o);p("#ajuda-busca",o).addEventListener("input",i=>{const n=Ba(i.target.value);for(const a of e){const s=!n||Ba(a.textContent).includes(n);a.hidden=!s,n&&(a.open=s)}})}const Ba=o=>String(o??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();export{he as ADMIN_SECOES,Ye as renderAdmin};
