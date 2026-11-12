import{sb as E,state as j,$ as m,$$ as U,view as Xa,go as La,toast as A,fail as D,api as ta,busy as I,confirmDialog as G,promptDialog as Ka,loadConfig as X,loadCabanas as ia,loadFotos as ua,publicUrl as J,avatarUrl as Ya,applyBrand as ae,screenCached as va,screenUpdate as ra,screenForget as z,screenForgetPrefix as Aa,marcaUrl as ee,loadFeriados as oe}from"./core.js";import{esc as v,filtrarClientes as se,fmtMoney as O,fmtDate as V,fmtDateTime as K,parseMoney as la,normalizeHex as Sa,inkOn as te,instagramUrl as ie,csv as ba,todayISO as F,addDays as Y,STATUS as ca,ORIGENS as Ta,fmtPhone as W,initials as Ma,MESES as fa,daysBetween as da}from"./util.js";import{resizeForGallery as ne,makeIconSet as re,extOf as Pa,resizeLogo as ha,analisarLogo as le,abrirLogo as ce}from"./images.js";import{PIX_TYPES as ga,normalizePixKey as $a}from"./pix.js";import{statusBadge as de,openLightbox as Na,fab as Ia,ICON as me}from"./app.js";import{feriadoNacional as za,nomeFeriado as ja,estadia as pe}from"./precos.js";import{calendarioDatas as ue,calendarioPeriodo as ve}from"./calendario-datas.js";import{renderConversasAdmin as be,renderConversaAdmin as fe}from"./admin-conversas.js";import{marcarNoMapa as he}from"./map.js";const ge=[["reservas","✅","Reservas: conferir e validar"],["conversas","💬","Conversas dos clientes"],["calendario","🗓️","Calendário e dias disponíveis"],["cabanas","🏡","Cabanas e fotos das cabanas"],["fotos","🖼️","Fotos do carrossel e da galeria"],["clientes","👥","Clientes"],["relatorios","📊","Relatórios"],["historico","📚","Histórico de hóspedes"],["ia","🤖","Chat: IA ou chatbot"],["pix","💠","Pix e conferência do comprovante"],["aparencia","🎨","Aparência: cores e ícone"],["novidades","📣","Enviar novidades"],["ajuda","❓","Ajuda: como tudo funciona"]];async function oo(o,e=[]){const i=ge.find(([r])=>r===o);if(!i)return La("#/menu");if(o==="conversas"&&e[0])return fe(e[0]);Xa().innerHTML=`
    <section class="admin">
      <header class="admin-head pad">${o==="conversas"?"":'<a href="#/menu" class="back">‹ Menu</a>'}<h1 class="title">${i[1]} ${v(i[2])}</h1></header>
      <div class="pad" id="admin-body"><div class="loading">Carregando…</div></div>
    </section>`;const l=m("#admin-body"),a={reservas:ke,conversas:be,calendario:Fa,cabanas:pa,fotos:Ne,clientes:Ie,relatorios:ze,historico:je,ia:Re,pix:Qa,aparencia:Ve,novidades:Ja,ajuda:Ge}[o];if(!a)return La("#/admin");await a(l)}async function B(o,e,i,l){const a=va(e);let r=!1;const t=()=>r=!0;o.addEventListener("input",t),a!==void 0&&l(a);let s;try{s=await i()}catch(d){if(a===void 0)throw d;return}ra(e,s),o.isConnected&&(a===void 0||!r&&JSON.stringify(s)!==JSON.stringify(a))&&(o.removeEventListener("input",t),l(s))}const _a=(o,e,i="text/csv;charset=utf-8")=>{const l=document.createElement("a");l.href=URL.createObjectURL(new Blob([e],{type:i})),l.download=o,l.click(),setTimeout(()=>URL.revokeObjectURL(l.href),2e3)},Ra=o=>o?`https://wa.me/${encodeURIComponent(o)}`:"",Oa=[["validar","🔎","Para conferir"],["proximas","🗓️","Próximas"],["aguardando_pagamento","⏳","Aguardando Pix"],["confirmada","✅","Confirmadas"],["todas","📋","Todas"],["cancelada","🚫","Canceladas"],["recusada","❌","Não confirmadas"],["expirada","⌛","Prazo encerrado"]],$e=["dom.","seg.","ter.","qua.","qui.","sex.","sáb."],_e=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Da=o=>{const e=new Date(o+"T12:00:00Z");return{dia:String(e.getUTCDate()).padStart(2,"0"),mes:_e[e.getUTCMonth()],sem:$e[e.getUTCDay()]}},we='<svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1.2-1.1 2 .9c-.2 1.2-1.2 1.9-2.4 1.7-3-.6-5.5-3-6-6-.2-1.2.5-2.2 1.7-2.4l.9 2z"/></svg>';function xe(o){if(!["aguardando_pagamento","em_analise","confirmada"].includes(o.status))return"";const e=F();if(o.checkout<=e)return'<span class="ar-quando passado">Já saiu</span>';if(o.checkin<=e)return'<span class="ar-quando agora">🏡 Hospedado agora</span>';const i=da(e,o.checkin);return`<span class="ar-quando">${i===1?"Entra amanhã":`Entra em ${i} dias`}</span>`}function ye(o){if(o.status!=="aguardando_pagamento"||!o.expira_em)return"";const e=Math.round((Date.parse(o.expira_em)-Date.now())/6e4);return e<=0?'<p class="ar-aviso warn">⏳ O prazo do Pix acabou; a reserva vai expirar sozinha.</p>':`<p class="ar-aviso warn">⏳ Esperando o Pix do cliente · prazo de <b>${e<60?`${e} min`:e<1440?`${Math.floor(e/60)} h ${e%60?`${e%60} min`:""}`:`${Math.floor(e/1440)} dia(s)`}</b></p>`}async function ke(o){const e=j.cabanas||va("vitrine")?.cabanas||await ia(),i=p=>e.find(c=>c.id===p)?.nome||"—";let l=sessionStorage.getItem("adm-filtro")||"validar";Oa.some(([p])=>p===l)||(l="validar"),o.innerHTML=`
    <div class="ar-busca"><span aria-hidden="true">🔍</span><input id="f-busca" type="search" placeholder="Buscar por nome, código ou celular" autocomplete="off"><button type="button" id="limpar" aria-label="Limpar busca" hidden>✕</button></div>
    <div class="ar-filtros" role="tablist">${Oa.map(([p,c,h])=>`<button type="button" role="tab" data-f="${p}" class="${p===l?"on":""}">${c} ${h}<b class="ar-n" data-n="${p}"></b></button>`).join("")}</div>
    <div class="ar-bulk" id="bulk" hidden></div>
    <div id="lista" class="ar-lista"></div>
    ${Ia("nova","Nova reserva")}`;const a=m("#f-busca"),r=sessionStorage.getItem("adm-busca");r&&(sessionStorage.removeItem("adm-busca"),a.value=r,l="todas");const t=()=>{o.querySelectorAll("[data-f]").forEach(p=>p.classList.toggle("on",p.dataset.f===l)),o.querySelector("[data-f].on")?.scrollIntoView({block:"nearest",inline:"center"})};t(),m("#limpar").hidden=!a.value;const s=async()=>{const{data:p}=await E.from("reservas").select("status,validada,checkout").in("status",["aguardando_pagamento","em_analise","confirmada"]).limit(2e3);if(!p||!o.isConnected)return;const c=F(),h={validar:p.filter(q=>q.status==="em_analise"||q.status==="confirmada"&&!q.validada).length,proximas:p.filter(q=>q.checkout>=c).length,aguardando_pagamento:p.filter(q=>q.status==="aguardando_pagamento").length};o.querySelectorAll("[data-n]").forEach(q=>{const _=h[q.dataset.n];q.textContent=_||"",q.classList.toggle("alerta",q.dataset.n==="validar"&&_>0)})};let d=[];const n=p=>l==="validar"?p.status==="em_analise"||p.status==="confirmada"&&!p.validada:l==="proximas"?["aguardando_pagamento","em_analise","confirmada"].includes(p.status)&&p.checkout>=F():l==="todas"||p.status===l,b=p=>{const c=new Map(p.map(h=>[h.id,h]));d=d.map(h=>c.get(h.id)||h).filter(n),Aa("adm-reservas:"),ra(`adm-reservas:${l}:${a.value.trim()}`,d),x(d),s()},f={validar:["🎉","Tudo conferido!","Nenhum comprovante esperando e nenhuma reserva para validar."],proximas:["🌿","Nenhuma hospedagem pela frente","As próximas reservas aparecem aqui."]},x=p=>{d=p;const c=m("#lista");if(!c)return;const h=p.filter(y=>y.status==="confirmada"&&!y.validada),q=m("#bulk");if(q.hidden=h.length<2,q.innerHTML=`<span><b>${h.length} confirmadas</b> esperando a sua validação</span><button type="button" class="btn sm" id="validar-todas">Validar todas</button>`,c.dataset.ids=JSON.stringify(h.map(y=>y.id)),!p.length){const[y,S,L]=a.value.trim()?["🔍","Nada encontrado",'Confira o nome, o código ou o celular, ou procure em "Todas".']:f[l]||["📭","Nenhuma reserva aqui","Escolha outro filtro acima."];c.innerHTML=`<div class="ar-vazio"><span>${y}</span><h3>${S}</h3><p class="muted small">${L}</p></div>`;return}let _="";c.innerHTML=p.map(y=>{const S=y.checkin.slice(0,7),L=S!==_?`<h3 class="ar-mes">${fa[Number(S.slice(5))-1]} de ${S.slice(0,4)}</h3>`:"";return _=S,L+u(y)}).join("")},k=async()=>{const p=m("#lista"),c=a.value.trim(),h=l,q=`adm-reservas:${h}:${c}`,_=va(q);_?x(_):p.innerHTML='<div class="ar-esqueleto"><i></i><i></i></div>';let y=E.from("reservas").select("*").order("checkin",{ascending:h==="proximas"||h==="validar"}).limit(200);h==="validar"?y=y.or("status.eq.em_analise,and(status.eq.confirmada,validada.eq.false)"):h==="proximas"?y=y.in("status",["aguardando_pagamento","em_analise","confirmada"]).gte("checkout",F()):h!=="todas"&&(y=y.eq("status",h));const S=c.replace(/[,()%]/g,"");S&&(y=y.or(`nome_cliente.ilike.%${S}%,codigo.ilike.%${S}%,telefone_cliente.ilike.%${S.replace(/\D/g,"")||S}%`));const{data:L,error:M}=await y;if(M)return _?void 0:D(M);if(!p.isConnected||a.value.trim()!==c||l!==h)return ra(q,L);JSON.stringify(L)!==JSON.stringify(_)&&x(L),ra(q,L)},C=p=>p.resultado==="aprovado"?["ok","✅ Aprovado pela IA"]:p.resultado==="nao_e_comprovante"?["bad","❌ Não parece um comprovante"]:["warn","⚠️ A IA pediu para conferir"],u=p=>{const c=p.analise_ia,h=ca[p.status]||{label:p.status,tone:""},q=Da(p.checkin),_=Da(p.checkout),y=p.telefone_cliente,S=["aguardando_pagamento","em_analise"].includes(p.status),L=S&&p.status==="em_analise"?["confirmar","✅ Confirmar pagamento"]:p.status==="confirmada"&&!p.validada?["validar","☑️ Validar reserva"]:S?["confirmar","✅ Confirmar pagamento"]:null,M=[p.comprovante_path?["ver","Comprovante",""]:null,p.status==="em_analise"?["pedir_novo","Pedir outro",""]:null,S?["recusar","Recusar","danger"]:null,p.status==="confirmada"?["cancelar","Cancelar","danger"]:null].filter(Boolean),[N,T]=c?.verificacoes?C(c):[];return`<article class="res-card adm-res t-${h.tone}" data-id="${p.id}">
      <div class="ar-head">
        <span class="ar-av">${v(Ma(p.nome_cliente))}</span>
        <div class="ar-tit"><h3>${v(p.nome_cliente)}</h3><span class="res-code" title="Feita em ${v(K(p.criado_em))}">#${v(p.codigo)} · ${p.origem==="chat"?"💬 chat":p.origem==="admin"?"👤 equipe":"📱 app"} · ${new Date(p.criado_em).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}</span></div>
        <span class="res-status ${h.tone}">${v(h.label)}</span>
      </div>
      <div class="ar-cab"><span>🏡 <b>${v(i(p.cabana_id))}</b></span>${xe(p)}</div>
      <div class="res-dates">
        <div class="rd"><small>Entrada</small><strong>${q.dia} ${q.mes}</strong><span>${q.sem}</span></div>
        <div class="rd-mid"><span>${p.diarias} ${p.diarias===1?"noite":"noites"}</span></div>
        <div class="rd"><small>Saída</small><strong>${_.dia} ${_.mes}</strong><span>${_.sem}</span></div>
      </div>
      <div class="res-info"><span>${me.people} ${p.hospedes} ${p.hospedes===1?"pessoa":"pessoas"}</span><strong>${O(p.valor_centavos)}</strong></div>
      ${y||p.email_cliente?`<div class="ar-contato">
        ${y?`<a class="ar-ct whats" href="${Ra(y)}" target="_blank" rel="noopener noreferrer">${we}<span>${v(W(y))}</span></a>`:""}
        ${p.email_cliente?`<a class="ar-ct" href="mailto:${v(p.email_cliente)}">✉️<span>${v(p.email_cliente)}</span></a>`:""}
        ${p.regiao_cliente?`<span class="ar-ct sem">📍<span>${v(p.regiao_cliente)}</span></span>`:""}
      </div>`:""}
      ${ye(p)}
      ${p.status==="em_analise"?'<p class="ar-aviso info">🧾 O cliente enviou o comprovante. Confira no extrato do banco antes de confirmar.</p>':""}
      ${p.status==="confirmada"?p.validada?`<p class="ar-aviso ok">☑️ Validada em ${K(p.validada_em)}</p>`:'<p class="ar-aviso warn">👀 Confirmada, esperando a sua validação (confira o Pix no extrato).</p>':""}
      ${p.motivo?`<p class="res-motivo">💬 ${v(p.motivo)}</p>`:""}
      ${c?.verificacoes?`<details class="ar-ia ${N}"><summary><span>${T}</span><small>ver detalhes</small></summary>
        <ul>${c.verificacoes.map(P=>`<li class="${P.ok?"ok":"bad"}"><i>${P.ok?"✓":"✗"}</i><span><b>${v(P.regra)}</b><small>${v(P.detalhe)}</small></span></li>`).join("")}</ul>
        ${c.extraido?.pagador_nome?`<p class="small">Pagador: <b>${v(c.extraido.pagador_nome)}</b>${c.extraido.destinatario_instituicao?` · ${v(c.extraido.destinatario_instituicao)}`:""}</p>`:""}
        ${c.extraido?.observacoes?`<p class="small muted">Obs.: ${v(c.extraido.observacoes)}</p>`:""}</details>`:""}
      ${L||M.length?`<div class="ar-acoes">
        ${L?`<button class="btn block" data-a="${L[0]}">${L[1]}</button>`:""}
        ${M.length?`<div class="ar-sec">${M.map(([P,R,sa])=>`<button class="btn sm ghost ${sa}" data-a="${P}">${R}</button>`).join("")}</div>`:""}
      </div>`:""}
    </article>`};o.querySelectorAll("[data-f]").forEach(p=>p.addEventListener("click",()=>{l!==p.dataset.f&&(l=p.dataset.f,sessionStorage.setItem("adm-filtro",l),t(),k())}));let $;a.addEventListener("input",()=>{m("#limpar").hidden=!a.value,clearTimeout($),$=setTimeout(k,350)}),m("#limpar").addEventListener("click",()=>{a.value="",m("#limpar").hidden=!0,k(),a.focus()});const g=p=>qe(e,()=>{Aa("adm-reservas:"),k(),s()},p);m("#nova").addEventListener("click",()=>g(null));let w=null;try{w=JSON.parse(sessionStorage.getItem("adm-nova-reserva")||"null"),sessionStorage.removeItem("adm-nova-reserva")}catch{}w?.cabana&&g(w),m("#bulk").addEventListener("click",async p=>{const c=p.target.closest("#validar-todas");if(!c)return;const h=JSON.parse(m("#lista").dataset.ids||"[]");!h.length||!await G(`Validar ${h.length} reserva(s)?`,"Confirme que conferiu os pagamentos no extrato do banco.","Validar todas")||await I(c,async()=>{const q=[];for(const _ of h)q.push((await ta("admin-reserva",{acao:"validar",reserva_id:_})).reserva);A("Reservas validadas.","ok"),b(q)})}),m("#lista").addEventListener("click",async p=>{const c=p.target.closest("[data-a]");if(!c)return;const h=c.closest(".adm-res").dataset.id,q=c.dataset.a;if(q==="ver"){await I(c,async()=>{const{data:y}=await E.from("reservas").select("comprovante_path").eq("id",h).single(),{data:S,error:L}=await E.storage.from("comprovantes").createSignedUrl(y.comprovante_path,600);if(L)throw L;Na([S.signedUrl])});return}let _;if(["recusar","cancelar","pedir_novo"].includes(q)){if(_=await Ka({recusar:"Recusar a reserva",cancelar:"Cancelar a reserva",pedir_novo:"Pedir outro comprovante"}[q],"Motivo (o cliente recebe esta mensagem)","","Enviar"),_===null)return}else if(q==="confirmar"&&!await G("Confirmar o pagamento?","O cliente recebe a confirmação por e-mail e notificação.","Confirmar"))return;await I(c,async()=>{const{reserva:y}=await ta("admin-reserva",{acao:q,reserva_id:h,motivo:_});A({confirmar:"Pagamento confirmado. O cliente foi avisado.",validar:"Reserva validada.",recusar:"Reserva recusada.",cancelar:"Reserva cancelada.",pedir_novo:"Pedido enviado ao cliente."}[q]||"Pronto.","ok"),b([y])})}),k(),s()}function qe(o,e,i=null){const l=o.filter(c=>c.ativa),a=l.some(c=>c.id===i?.cabana)?i.cabana:l[0]?.id,r=document.createElement("dialog");r.className="dialog cab-form",r.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head"><button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button><h3>Nova reserva</h3><span></span></header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Hospedagem</h4>
        <div class="pills">${l.map(c=>`<label class="pill"><input type="radio" name="cabana_id" value="${c.id}" ${c.id===a?"checked":""}><span>${v(c.nome)}</span></label>`).join("")}</div>
        <input type="hidden" name="checkin"><input type="hidden" name="checkout">
        <p class="muted small" id="nr-dica"></p>
        <div class="calendar" id="nr-cal"></div>
        <div class="legend small"><span class="lg livre"></span>Livre <span class="lg reservado"></span>Reservado <span class="lg fechado"></span>Fechado para clientes <span class="lg-fer"></span>Feriado</div>
        <div class="regra-linha"><span><b>Pessoas</b><small id="nr-cap"></small></span>${aa("hospedes",Math.max(1,Math.min(50,Number(i?.hospedes)||2)),1,50,"")}</div>
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
  </form>`,document.body.appendChild(r);const t=m("form",r),s=t.elements;m("[data-close]",r).onclick=()=>r.close();let d=j.feriados||[];oe().then(c=>{d=c,b(),f.desenhar()}).catch(()=>{});const n=()=>l.find(c=>c.id===s.cabana_id.value),b=()=>{const c=n(),h=m("#nr-calc",r);if(c&&(m("#nr-cap",r).textContent=`até ${c.capacidade} nesta cabana`),!c||!s.checkin.value||!s.checkout.value){h.textContent="Escolha as datas para ver o valor.";return}const{total:q,grupos:_}=pe(c,s.checkin.value,s.checkout.value,d),y=da(s.checkin.value,s.checkout.value),S=[_.normal.n&&`${_.normal.n} normal`,_.fim_semana.n&&`${_.fim_semana.n} sex a dom`,_.feriado.n&&`${_.feriado.n} feriado`].filter(Boolean);h.innerHTML=`<span>${y} ${y===1?"diária":"diárias"}${S.length>1||_.fim_semana.n||_.feriado.n?` <small>(${S.join(" · ")})</small>`:""}</span><b>${O(q)}</b>`},f=ue(m("#nr-cal",r),m("#nr-dica",r),{cabana:s.cabana_id.value,carregar:async(c,h,q)=>{const{data:_,error:y}=await E.rpc("disponibilidade",{p_cabana:c,p_de:h,p_ate:q});if(y)throw y;return _},nomeFeriado:c=>ja(c,d),aoMudar:c=>{s.checkin.value=c.checkin,s.checkout.value=c.checkout,b()},selecao:i&&i.cabana===a?{checkin:i.checkin,checkout:i.checkout}:null});r.querySelectorAll("[name=cabana_id]").forEach(c=>c.addEventListener("change",()=>f.trocarCabana(s.cabana_id.value))),t.addEventListener("change",b),r.querySelectorAll(".stp [data-d]").forEach(c=>c.addEventListener("click",()=>{const h=c.closest(".stp"),q=m("input",h);q.value=Math.min(n()?.capacidade||50,Math.max(1,(Number(q.value)||0)+Number(c.dataset.d)))})),b();let x=null,k=!1,C=null;const u=m("#nr-busca",r),$=m("#nr-lista",r),g=c=>v([W(c.telefone),c.email].filter(Boolean).join(" · ")),w=()=>{if(k){$.innerHTML='<p class="muted small">Não foi possível carregar os clientes. Feche e abra de novo.</p>';return}if(!x){$.innerHTML='<p class="muted small">Carregando clientes…</p>';return}$.innerHTML=se(x,u.value).map(c=>`<button type="button" class="nr-item" data-id="${v(c.id)}"><b>${v(c.nome)}</b><small>${g(c)}</small></button>`).join("")||'<p class="muted small">Nenhum cliente encontrado. Se for a primeira vez dele, escolha Novo cliente.</p>'},p=c=>{C=c,m("#nr-procura",r).hidden=!!c;const h=m("#nr-escolhido",r);h.hidden=!c,h.innerHTML=c?`<span><b>${v(c.nome)}</b><small>${g(c)}</small></span><button type="button" class="btn sm ghost" data-trocar>Trocar</button>`:"",c||u.focus()};$.addEventListener("click",c=>{const h=c.target.closest("[data-id]")?.dataset.id;h&&p(x.find(q=>q.id===h))}),m("#nr-escolhido",r).addEventListener("click",c=>{c.target.closest("[data-trocar]")&&p(null)}),u.addEventListener("input",w),u.addEventListener("keydown",c=>{c.key==="Enter"&&c.preventDefault()}),r.querySelectorAll("[name=tipo_cliente]").forEach(c=>c.addEventListener("change",()=>{const h=s.tipo_cliente.value==="cadastrado";m("#nr-cadastrado",r).hidden=!h,m("#nr-novo",r).hidden=h})),w(),Promise.all([E.from("perfis").select("id,nome,telefone,email").order("nome").limit(2e3),E.from("admins").select("user_id")]).then(([c,h])=>{if(c.error||h.error)throw c.error||h.error;const q=new Set(h.data.map(_=>_.user_id));x=c.data.filter(_=>!q.has(_.id))}).catch(()=>{k=!0}).finally(w),t.addEventListener("submit",async c=>{c.preventDefault();const h=(S,L)=>{S?.focus(),A(L,"bad")};if(!s.cabana_id.value)return h(null,"Escolha a cabana.");if(!s.checkin.value||!s.checkout.value||s.checkout.value<=s.checkin.value)return h(null,"Escolha a entrada e a saída no calendário.");const q=s.tipo_cliente.value==="cadastrado";if(q&&!C)return h(u,"Escolha o cliente cadastrado.");if(!q&&s.nome.value.trim().length<2)return h(s.nome,"Escreva o nome do cliente.");if(!q&&s.email.value.trim()&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email.value.trim()))return h(s.email,"Confira o e-mail do cliente.");const _=Number(s.hospedes.value);if(!Number.isInteger(_)||_<1)return h(s.hospedes,"Confira o número de pessoas.");if(_>n().capacidade)return h(s.hospedes,`Esta cabana recebe até ${n().capacidade} pessoas.`);const y=s.valor.value.trim()?la(s.valor.value):void 0;if(y===null)return h(s.valor,"Valor inválido.");await I(t.querySelector(".cf-foot .btn"),async()=>{await ta("admin-reserva",{acao:"criar",cabana_id:s.cabana_id.value,checkin:s.checkin.value,checkout:s.checkout.value,hospedes:Number(s.hospedes.value),...q?{cliente_id:C.id}:{nome:s.nome.value,telefone:s.telefone.value,email:s.email.value},valor_centavos:y,confirmada:s.confirmada.checked,motivo:s.obs.value}),A("Reserva criada.","ok"),r.close(),e()})}),r.addEventListener("close",()=>r.remove()),r.showModal()}const Ee=[["ocupacao","🗓️","Ocupação"],["periodos","🔒","Abrir e fechar"],["feriados","🎉","Feriados"],["regras","⚙️","Regras"]];let wa="ocupacao",xa=null;const ma=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],ya=o=>new Date(o+"T12:00:00Z").getUTCDay(),na=o=>fa[Number(o.slice(5,7))-1].slice(0,3);function ka(o,e){const i=Number(o.slice(8)),l=Number(e.slice(8));return o===e?`${i} de ${na(o)}.`:o.slice(0,7)===e.slice(0,7)?`${i} a ${l} de ${na(e)}.`:`${i} de ${na(o)}. a ${l} de ${na(e)}.`}const aa=(o,e,i,l,a)=>`<div class="stp" data-min="${i}" data-max="${l}">
  <button type="button" data-d="-1" aria-label="Menos">−</button>
  <input type="number" name="${o}" min="${i}" max="${l}" value="${e}" inputmode="numeric">
  <button type="button" data-d="1" aria-label="Mais">+</button><small>${a}</small></div>`;async function Fa(o){await B(o,"adm-calendario",async()=>{const[e,i,{data:l,error:a},r]=await Promise.all([X(!0),ia(!0),E.from("calendario").select("*").gte("fim",F()).order("inicio"),E.from("feriados").select("data,nome").gte("data",F()).order("data")]);if(a)throw a;return{cfg:e,cabs:i,periodos:l,feriados:r.error?null:r.data}},e=>{o.innerHTML=`
      <div class="cal-abas" role="tablist">${Ee.map(([a,r,t])=>`<button type="button" role="tab" data-aba="${a}" class="${a===wa?"on":""}"><span>${r}</span>${t}</button>`).join("")}</div>
      <div id="cal-pane"></div>`;const i=m("#cal-pane",o),l=a=>{wa=a,o.querySelectorAll("[data-aba]").forEach(r=>r.classList.toggle("on",r.dataset.aba===a)),{ocupacao:Ce,periodos:Ae,feriados:Se,regras:Te}[a](i,e,()=>Fa(o))};o.querySelectorAll("[data-aba]").forEach(a=>a.addEventListener("click",()=>l(a.dataset.aba))),l(wa)})}const ea=o=>{z("adm-calendario"),o()};function Ce(o,{cabs:e,feriados:i},l){const a=e.filter(r=>r.ativa);if(!a.length){o.innerHTML='<div class="card center"><p class="muted">Cadastre uma cabana em <a href="#/admin/cabanas">Cabanas</a> para ver a ocupação.</p></div>';return}o.innerHTML='<div id="mapa"><div class="loading">Carregando…</div></div>',Ha(m("#mapa",o),a,i||[],xa||F().slice(0,7),l)}async function Ha(o,e,i,l,a){xa=l;const[r,t]=l.split("-").map(Number),s=`${l}-01`,d=new Date(Date.UTC(r,t,0)).getUTCDate(),n=`${l}-${String(d).padStart(2,"0")}`,b=F(),[{data:f},x]=await Promise.all([E.from("reservas").select("id,cabana_id,checkin,checkout,status,nome_cliente,codigo,hospedes").in("status",["aguardando_pagamento","em_analise","confirmada"]).lte("checkin",n).gt("checkout",s),Promise.all(e.map(L=>E.rpc("disponibilidade",{p_cabana:L.id,p_de:s,p_ate:n}).then(M=>M.data||[])))]);if(!o.isConnected||xa!==l)return;const k=Array.from({length:d},(L,M)=>`${l}-${String(M+1).padStart(2,"0")}`),C=e.map((L,M)=>k.map(N=>{const T=(f||[]).find(P=>P.cabana_id===L.id&&N>=P.checkin&&N<P.checkout);return{d:N,r:T,sit:T?T.status:x[M].find(P=>P.dia===N)?.situacao||"passado"}})),u=C.flat(),$=u.filter(L=>L.r).length,g=u.filter(L=>L.sit==="livre").length,w=u.filter(L=>L.sit==="fechado").length,p=$+g,c=p?Math.round($/p*100):0,h=new Date(Date.UTC(r,t-2,1)).toISOString().slice(0,7),q=new Date(Date.UTC(r,t,1)).toISOString().slice(0,7),_=L=>Le(L,i);o.innerHTML=`
    <div class="occ-head">
      <button type="button" class="icon-btn" data-m="${h}" aria-label="Mês anterior">‹</button>
      <div class="occ-mes"><strong>${fa[t-1]} de ${r}</strong>${l!==b.slice(0,7)?`<button type="button" class="link-btn" data-m="${b.slice(0,7)}">voltar para hoje</button>`:""}</div>
      <button type="button" class="icon-btn" data-m="${q}" aria-label="Próximo mês">›</button>
    </div>
    <div class="occ-kpis">
      <div class="occ-kpi destaque"><b>${c}%</b><small>ocupação</small><i style="--p:${c}%"></i></div>
      <div class="occ-kpi"><b>${$}</b><small>noites reservadas</small></div>
      <div class="occ-kpi"><b>${g}</b><small>noites livres</small></div>
      <div class="occ-kpi"><b>${w}</b><small>fechadas</small></div>
    </div>
    <div class="occ-card">
      <div class="occ-wrap"><table class="occ">
        <thead><tr><th class="occ-nome"></th>${k.map(L=>{const M=ya(L);return`<th class="${M===0||M===6?"fds":""} ${L===b?"hoje":""} ${_(L)?"fer":""}" title="${v(_(L)||"")}"><small>${ma[M][0]}</small>${Number(L.slice(8))}</th>`}).join("")}</tr></thead>
        <tbody>${e.map((L,M)=>`<tr><th class="occ-nome">${v(L.nome)}</th>${C[M].map((N,T)=>{const P=N.r&&(N.d===N.r.checkin||T===0),R=N.r&&(Y(N.d,1)===N.r.checkout||T===d-1);return`<td><button type="button" class="occ-c occ-${N.sit} ${P?"ini":""} ${R?"fim":""} ${N.d===b?"hoje":""}" data-c="${M}" data-i="${T}" aria-label="${v(L.nome)} ${V(N.d)}"></button></td>`}).join("")}</tr>`).join("")}</tbody></table></div>
      <div class="occ-legenda small">
        <span><i class="occ-confirmada"></i>Confirmada</span><span><i class="occ-aguardando_pagamento"></i>Aguardando Pix</span>
        <span><i class="occ-em_analise"></i>Em análise</span><span><i class="occ-livre"></i>Livre</span><span><i class="occ-fechado"></i>Fechado</span>
      </div>
    </div>
    <div id="occ-info" class="occ-info"><p class="small muted">👆 Toque num dia para ver a reserva ou para abrir e fechar a data.</p></div>`,o.querySelectorAll("[data-m]").forEach(L=>L.addEventListener("click",()=>{o.querySelector(".occ-card")?.classList.add("carregando"),Ha(o,e,i,L.dataset.m,a)}));const y=m("#occ-info",o);o.querySelector(".occ").addEventListener("click",L=>{const M=L.target.closest(".occ-c");if(!M)return;o.querySelectorAll(".occ-c.sel").forEach(R=>R.classList.remove("sel")),M.classList.add("sel");const N=e[Number(M.dataset.c)],T=C[Number(M.dataset.c)][Number(M.dataset.i)],P=`<div class="occ-info-tit"><b>${v(N.nome)}</b><span>${ma[ya(T.d)]}, ${V(T.d)}${_(T.d)?` · 🎉 ${v(_(T.d))}`:""}</span></div>`;if(T.r)y.innerHTML=`${P}<div class="occ-info-res">${de(T.r.status)}
        <p><b>${v(T.r.nome_cliente)}</b> · ${T.r.hospedes} pessoa(s)</p>
        <p class="small muted">Reserva ${v(T.r.codigo)} · ${ka(T.r.checkin,Y(T.r.checkout,-1))} (saída ${V(T.r.checkout)})</p>
        <a class="btn sm ghost" href="#/admin/reservas">Ver em Reservas ›</a></div>`;else if(T.sit==="livre"||T.sit==="fechado"){const R=T.sit==="livre";y.innerHTML=`${P}<p class="occ-info-sit ${T.sit}">${R?"🟢 Livre para reservar":"⚪ Fechado para reservas"}</p>
        <button type="button" class="btn sm ${R?"ghost danger":""}" id="occ-acao">${R?"🔒 Fechar este dia":"🔓 Abrir este dia"}</button>`,m("#occ-acao",y).addEventListener("click",sa=>I(sa.currentTarget,async()=>{const{error:Q}=await E.from("calendario").insert({cabana_id:N.id,tipo:R?"fechado":"aberto",inicio:T.d,fim:T.d,motivo:null});if(Q)throw Q;A(R?"Dia fechado.":"Dia aberto.","ok"),ea(a)}))}else y.innerHTML=`${P}<p class="small muted">${T.d<b?"Data que já passou.":"Fora do prazo de reservas (veja em Regras)."}</p>`;y.scrollIntoView({block:"nearest",behavior:"smooth"})});const S=o.querySelector("thead th.hoje");S&&(o.querySelector(".occ-wrap").scrollLeft=Math.max(0,S.offsetLeft-140))}const Le=(o,e)=>e.find(i=>i.data===o)?.nome||za(o);function Ae(o,{cabs:e,periodos:i,feriados:l},a){const r=n=>n?e.find(b=>b.id===n)?.nome||"—":"Todas as cabanas";o.innerHTML=`
    <form id="periodo" class="cal-card stack">
      <h3>Novo período</h3>
      <div class="tipo-escolha" role="radiogroup">
        <label><input type="radio" name="tipo" value="fechado" checked><span><b>🔒 Fechar</b><small>Ninguém reserva nesses dias</small></span></label>
        <label><input type="radio" name="tipo" value="aberto"><span><b>🔓 Abrir</b><small>Libera dias que estavam fechados</small></span></label>
      </div>
      <div class="field"><span>Cabana</span>
        <div class="pills">${[["","Todas"],...e.map(n=>[n.id,n.nome])].map(([n,b],f)=>`<label class="pill"><input type="radio" name="cab" value="${n}" ${f===0?"checked":""}><span>${v(b)}</span></label>`).join("")}</div></div>
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
    <h3 class="cal-sub">Programados <span class="seg-n">${(i||[]).length}</span></h3>
    <div class="per-lista">${(i||[]).map(n=>{const b=da(n.inicio,n.fim)+1;return`<article class="per-item ${n.tipo}" data-id="${n.id}">
        <span class="per-ico">${n.tipo==="aberto"?"🔓":"🔒"}</span>
        <div class="grow"><b>${ka(n.inicio,n.fim)}</b> <span class="small muted">· ${b} dia${b>1?"s":""}</span>
          <p class="small muted">${n.tipo==="aberto"?"Aberto":"Fechado"} · ${v(r(n.cabana_id))}${n.motivo?" · "+v(n.motivo):""}</p></div>
        <button type="button" class="icon-btn danger" data-del aria-label="Remover período" title="Remover">🗑️</button></article>`}).join("")||'<div class="cal-vazio"><span>📅</span><p class="muted small">Nenhum período programado. Todos os dias seguem as Regras.</p></div>'}</div>`;const t=m("#periodo",o),s=t.elements;ve(m("#per-cal",o),m("#per-dica",o),{nomeFeriado:n=>ja(n,l||[]),aoMudar:n=>{s.ini.value=n.ini,s.fim.value=n.fim,d(),t.dispatchEvent(new Event("input",{bubbles:!0}))}});const d=()=>{const n=m("#per-resumo",o);if(!s.ini.value||!s.fim.value)return n.textContent="";const b=da(s.ini.value,s.fim.value)+1,f=s.tipo.value==="fechado"?"Fecha":"Abre",x=s.cab.value?e.find(k=>k.id===s.cab.value)?.nome:"todas as cabanas";n.innerHTML=`${f} <b>${ka(s.ini.value,s.fim.value)}</b> (${b} dia${b>1?"s":""}) para <b>${v(x)}</b>.`};t.addEventListener("change",d),o.querySelectorAll("[data-mot]").forEach(n=>n.addEventListener("click",()=>{s.motivo.value=n.dataset.mot})),t.addEventListener("submit",async n=>{if(n.preventDefault(),!s.ini.value)return A("Toque no calendário no primeiro e no último dia.","bad");if(!s.fim.value)return A("Toque no último dia (para um dia só, toque de novo no mesmo dia).","bad");await I(t.querySelector(".btn.block"),async()=>{const{error:b}=await E.from("calendario").insert({cabana_id:s.cab.value||null,tipo:s.tipo.value,inicio:s.ini.value,fim:s.fim.value,motivo:s.motivo.value.trim()||null});if(b)throw b;A("Período salvo.","ok"),ea(a)})}),o.querySelectorAll("[data-del]").forEach(n=>n.addEventListener("click",async()=>{await G("Remover o período?","Os dias voltam a seguir as Regras do calendário.","Remover",!0)&&await I(n,async()=>{const{error:b}=await E.from("calendario").delete().eq("id",n.closest("[data-id]").dataset.id);if(b)throw b;A("Período removido.","ok"),ea(a)})}))}function Se(o,{feriados:e},i){const l=[];for(let r=F(),t=0;t<366;t++,r=Y(r,1)){const s=za(r);s&&l.push({data:r,nome:s})}const a=(r,t)=>`<div class="fer-item" ${t?`data-fer="${r.data}"`:""}>
    <span class="fer-data"><b>${Number(r.data.slice(8))}</b><small>${na(r.data)}</small></span>
    <span class="grow"><b>${v(r.nome)}</b><small class="muted">${ma[ya(r.data)]} · ${r.data.slice(0,4)}</small></span>
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
    <div class="fer-lista">${e.map(r=>a(r,!0)).join("")||'<div class="cal-vazio"><span>🎉</span><p class="muted small">Nenhum feriado da cidade cadastrado.</p></div>'}</div>`}
    <details class="fer-nac"><summary>🇧🇷 Nacionais, entram sozinhos <span class="seg-n">${l.length}</span></summary>
      <div class="fer-lista nac">${l.map(r=>a(r,!1)).join("")}</div></details>`,m("#feriado",o)?.addEventListener("submit",async r=>{r.preventDefault();const t=r.currentTarget.elements;await I(r.currentTarget.querySelector("button"),async()=>{const{error:s}=await E.from("feriados").insert({data:t.data.value,nome:t.nome.value.trim()});if(s)throw new Error(/duplicate|unique/i.test(s.message)?"Essa data já está cadastrada.":s.message);j.feriados=null,A("Feriado adicionado.","ok"),ea(i)})}),o.querySelectorAll("[data-del-fer]").forEach(r=>r.addEventListener("click",async()=>{await G("Remover o feriado?","Essa data volta a ser cobrada como um dia comum.","Remover",!0)&&await I(r,async()=>{const{error:t}=await E.from("feriados").delete().eq("data",r.closest("[data-fer]").dataset.fer);if(t)throw t;j.feriados=null,ea(i)})}))}function Te(o,{cfg:e},i){o.innerHTML=`
    <form id="regras" class="stack">
      <section class="cal-card stack">
        <h3>Como o calendário funciona</h3>
        <div class="tipo-escolha col" role="radiogroup">
          <label><input type="radio" name="modo" value="aberto" ${e.modo_calendario!=="fechado"?"checked":""}><span><b>✅ Sempre aberto</b><small>Todos os dias da semana marcados abaixo ficam livres. Você fecha só as exceções em "Abrir e fechar".</small></span></label>
          <label><input type="radio" name="modo" value="fechado" ${e.modo_calendario==="fechado"?"checked":""}><span><b>🔐 Só quando eu abrir</b><small>Tudo fica fechado; só os períodos que você abrir podem ser reservados.</small></span></label>
        </div>
        <div class="field" id="dows"><span>Dias da semana em que a diária pode começar</span>
          <div class="dow-pills">${ma.map((t,s)=>`<label><input type="checkbox" name="dow" value="${s}" ${e.dias_semana.includes(s)?"checked":""}><span>${t}</span></label>`).join("")}</div></div>
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
    </form>`;const l=m("#regras",o),a=l.elements,r=()=>m("#dows",o).classList.toggle("apagado",a.modo.value==="fechado");l.addEventListener("change",r),r(),o.querySelectorAll(".stp [data-d]").forEach(t=>t.addEventListener("click",()=>{const s=t.closest(".stp"),d=m("input",s);d.value=Math.min(Number(s.dataset.max),Math.max(Number(s.dataset.min),(Number(d.value)||0)+Number(t.dataset.d)))})),l.addEventListener("submit",async t=>{t.preventDefault();const s=Number(a.min.value),d=Number(a.max.value),n=Number(a.ante.value);if(!(s>=1&&s<=30)||!(d>=1&&d<=90)||!(n>=7&&n<=730))return A("Confira os números da estadia.","bad");if(d<s)return A("O máximo precisa ser maior ou igual ao mínimo.","bad");const b=U('input[name="dow"]:checked',l).map(f=>Number(f.value));if(a.modo.value==="aberto"&&!b.length)return A("Marque pelo menos um dia da semana.","bad");await I(l.querySelector(".btn.block"),async()=>{const{error:f}=await E.from("configuracoes").update({modo_calendario:a.modo.value,dias_semana:b,min_diarias:s,max_diarias:d,antecedencia_max_dias:n,checkin_hora:a.cin.value,checkout_hora:a.cout.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(f)throw f;await X(!0),A("Regras salvas.","ok"),ea(i)})})}async function Va(o,e,i=()=>{}){const l=[];let a=0;for(const r of o){i(`Reduzindo e enviando ${++a} de ${o.length}…`);const{big:t,mini:s}=await ne(r),d=crypto.randomUUID(),n=`fotos/${d}.${Pa(t)}`,b=`fotos/${d}-mini.${Pa(s)}`,f=await E.storage.from("fotos").upload(n,t,{contentType:t.type});if(f.error)throw f.error;const x=await E.storage.from("fotos").upload(b,s,{contentType:s.type});if(x.error)throw x.error;const{data:k,error:C}=await E.from("fotos").insert({path:n,mini_path:b,...e}).select("*").single();if(C)throw C;l.push(k)}return i(""),j.fotos=null,z("adm-cabanas"),z("adm-fotos"),l}async function oa(o){const{error:e}=await E.rpc("definir_foto_principal",{p_foto:o});if(e)throw/definir_foto_principal|function/i.test(e.message)?new Error("Rode o arquivo supabase/003_foto_principal.sql no Supabase para usar a foto principal."):e;j.fotos=null,z("adm-cabanas"),z("adm-fotos")}async function pa(o){await B(o,"adm-cabanas",async()=>{const[e,i]=await Promise.all([ia(!0),ua(!0)]);return{cabs:e,todas:i}},({cabs:e,todas:i})=>{const l=a=>{const r=i.filter(t=>t.cabana_id===a.id).sort((t,s)=>(s.principal===!0)-(t.principal===!0)||t.ordem-s.ordem)[0];return r?`<img src="${v(J("fotos",r.mini_path))}" alt="">`:'<span class="cab-sem-foto">Sem foto</span>'};o.innerHTML=`
    ${Ia("add","Nova cabana")}
    <div class="list-cards cab-lista">${e.map(a=>`<article class="card cab-adm" data-id="${a.id}">
      <div class="cab-adm-capa">${l(a)}</div>
      <div class="grow">
        <div class="row between"><h3>${v(a.nome)}</h3>${a.ativa?'<span class="badge ok">Ativa</span>':'<span class="badge muted">Desativada</span>'}</div>
        <p class="small">Até ${a.capacidade} pessoas · ${O(a.preco_diaria_centavos)} a diária</p>
        ${[a.preco_fim_semana_centavos!=null?`Sex a dom ${O(a.preco_fim_semana_centavos)}`:"",a.preco_feriado_centavos!=null?`Feriado ${O(a.preco_feriado_centavos)}`:""].filter(Boolean).map(r=>`<span class="badge">${r}</span>`).join(" ")}
        <p class="small muted">📷 ${i.filter(r=>r.cabana_id===a.id).length} foto(s)</p>
        <button class="btn sm ghost" data-edit>Editar dados e fotos</button>
      </div></article>`).join("")||'<p class="muted">Toque no + para cadastrar a primeira cabana.</p>'}</div>`,m("#add").addEventListener("click",()=>qa(null,o)),o.querySelectorAll("[data-edit]").forEach(a=>a.addEventListener("click",()=>qa(e.find(r=>r.id===a.closest("[data-id]").dataset.id),o)))})}function qa(o,e){const i=document.createElement("dialog");i.className="dialog cab-form";const l=f=>f==null?"":(f/100).toFixed(2).replace(".",","),a=o?.capacidade??2,r=o?.descricao||"";i.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head">
      <button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button>
      <h3>${o?"Editar cabana":"Nova cabana"}</h3>
      <span></span>
    </header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Sobre a cabana</h4>
        <label class="field"><span>Nome</span><input name="nome" required minlength="2" maxlength="60" value="${v(o?.nome)}" placeholder="Ex.: Cabana do Lago" autocomplete="off"></label>
        <label class="field"><span>Descrição</span><textarea name="descricao" rows="4" maxlength="2000" placeholder="O que tem, camas, vista, comodidades…">${v(r)}</textarea>
          <small class="cf-count"><b>${r.length}</b>/2000</small></label>
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
  </form>`,document.body.appendChild(i);const t=m("form",i),s=t.elements;m("[data-close]",i).onclick=()=>i.close(),o&&Me(o,i),s.descricao.addEventListener("input",()=>m(".cf-count b",i).textContent=s.descricao.value.length);const d=m(".cf-stepper output",i);i.querySelectorAll("[data-step]").forEach(f=>f.addEventListener("click",()=>{const x=Math.min(50,Math.max(1,Number(s.capacidade.value)+Number(f.dataset.step)));s.capacidade.value=x,d.innerHTML=`<b>${x}</b> ${x===1?"pessoa":"pessoas"}`}));const n=f=>f.trim()?la(f)??void 0:null,b=()=>{const f=la(s.preco.value),x=m("#cf-sim",i);if(f===null)return x.textContent="";const k=n(s.preco_fds.value),C=n(s.preco_fer.value),u=k??f;x.innerHTML=`<b>Exemplo:</b> quinta a sábado (2 diárias) = ${O(f)} + ${O(u)} = <b>${O(f+u)}</b>`+(C!=null?` · uma diária de feriado = <b>${O(C)}</b>`:"")};["preco","preco_fds","preco_fer"].forEach(f=>s[f].addEventListener("input",b)),b(),t.addEventListener("submit",async f=>{f.preventDefault();const x=(g,w)=>{g.focus(),A(w,"bad")};if(s.nome.value.trim().length<2)return x(s.nome,"Escreva o nome da cabana.");const k=la(s.preco.value);if(k===null)return x(s.preco,"Valor da diária inválido.");const C=n(s.preco_fds.value);if(C===void 0)return x(s.preco_fds,"Valor de sexta a domingo inválido.");const u=n(s.preco_fer.value);if(u===void 0)return x(s.preco_fer,"Valor de feriado inválido.");const $={nome:s.nome.value.trim(),descricao:s.descricao.value.trim()||null,capacidade:Number(s.capacidade.value),preco_diaria_centavos:k,ordem:Number(s.ordem.value)||0,ativa:s.ativa.checked};(C!==null||o?.preco_fim_semana_centavos!=null)&&($.preco_fim_semana_centavos=C),(u!==null||o?.preco_feriado_centavos!=null)&&($.preco_feriado_centavos=u),await I(t.querySelector(".cf-foot .btn"),async()=>{const{data:g,error:w}=o?await E.from("cabanas").update($).eq("id",o.id).select("*").single():await E.from("cabanas").insert($).select("*").single();if(w)throw/preco_fim_semana|preco_feriado/.test(w.message)?new Error("Rode o arquivo supabase/007_precos_fim_semana.sql no Supabase para usar os valores de fim de semana e feriado."):w;j.cabanas=null,z("vitrine"),i.close(),z("adm-cabanas"),pa(e),o?A("Cabana salva.","ok"):(A("Cabana criada! Agora adicione as fotos.","ok"),qa(g,e))})}),m("[data-del]",i)?.addEventListener("click",async()=>{if(!await G("Excluir a cabana?","Cabanas com reservas não podem ser excluídas: nesse caso, desative.","Excluir",!0))return;const{error:f}=await E.from("cabanas").delete().eq("id",o.id);if(f)return A(/foreign|violates/i.test(f.message)?'Esta cabana tem reservas. Desligue "Ativa" em vez de excluir.':f.message,"bad");i.close(),z("adm-cabanas"),pa(e)}),i.addEventListener("close",()=>{i.remove(),o&&pa(e)}),i.showModal()}async function Me(o,e){const i=m("#cab-fotos",e),l=async()=>{const r=(await ua(!0)).filter(t=>t.cabana_id===o.id).sort((t,s)=>(s.principal===!0)-(t.principal===!0)||t.ordem-s.ordem);return i.innerHTML=r.length?r.map(t=>`<div class="cab-foto ${t.principal?"principal":""}" data-id="${t.id}">
          <img src="${v(J("fotos",t.mini_path))}" alt="">
          <button type="button" class="cf-star" data-star title="${t.principal?"Foto principal":"Tornar principal"}" aria-label="Tornar principal">${t.principal?"⭐":"☆"}</button>
          <button type="button" class="cf-del" data-del-foto title="Apagar" aria-label="Apagar foto">✕</button>
        </div>`).join(""):'<p class="small muted">Nenhuma foto ainda.</p>',r};let a=await l();i.addEventListener("click",async r=>{const t=r.target.closest(".cab-foto");if(!t)return;const s=a.find(d=>d.id===t.dataset.id);if(r.target.closest("[data-star]")&&!s.principal)try{await oa(s.id),A("Foto principal escolhida.","ok"),a=await l()}catch(d){D(d)}if(r.target.closest("[data-del-foto]")){if(!await G("Apagar esta foto?","","Apagar",!0))return;const{error:d}=await E.from("fotos").delete().eq("id",s.id);if(d)return D(d);await E.storage.from("fotos").remove([s.path,s.mini_path]),j.fotos=null,z("adm-cabanas"),z("adm-fotos"),a=await l(),s.principal&&a[0]&&await oa(a[0].id).catch(()=>{}),a=await l()}}),m("#cab-up",e).addEventListener("change",async r=>{const t=[...r.target.files];if(r.target.value="",!t.length)return;const s=r.target.closest("label");s.classList.add("busy");try{const d=!a.some(b=>b.principal),n=await Va(t,{cabana_id:o.id,na_galeria:!0,no_carrossel:!1,ordem:a.length},b=>m("#cab-prog",e).textContent=b);d&&n[0]&&await oa(n[0].id).catch(()=>{}),A(`${n.length} foto(s) adicionada(s).`,"ok"),a=await l()}catch(d){D(d)}finally{s.classList.remove("busy")}})}let H="todas";const Pe=(o,e)=>e.filter(i=>i.cabana_id===o.id).sort((i,l)=>(l.principal===!0)-(i.principal===!0)||i.ordem-l.ordem)[0];async function Ne(o){let e=[],i=[];const l=()=>{j.fotos=null,z("adm-cabanas"),z("adm-fotos"),z("vitrine")},a=d=>d?i.find(n=>n.id===d)?.nome||"Cabana":"Geral",r=()=>{const n=[...i.filter(u=>u.ativa).map(u=>Pe(u,e)).filter(Boolean),...e.filter(u=>u.no_carrossel&&!u.cabana_id)],b=[["todas","📸 Todas",e.length],["carrossel","🎠 Carrossel",n.length],["galeria","🖼️ Galeria",e.filter(u=>u.na_galeria).length],["gerais","🏞️ Gerais",e.filter(u=>!u.cabana_id).length],...i.map(u=>[u.id,`🏡 ${u.nome}`,e.filter($=>$.cabana_id===u.id).length])];b.some(([u])=>u===H)||(H="todas");const f=new Set(n.map(u=>u.id)),x=e.filter(u=>H==="todas"?!0:H==="carrossel"?f.has(u.id):H==="galeria"?u.na_galeria:H==="gerais"?!u.cabana_id:u.cabana_id===H);H==="carrossel"&&x.sort((u,$)=>n.indexOf(u)-n.indexOf($)),o.innerHTML=`
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
      <div class="ar-filtros fa-filtros" role="tablist">${b.map(([u,$,g])=>`<button type="button" data-f="${u}" class="${u===H?"on":""}">${v($)}<b class="ar-n">${g||""}</b></button>`).join("")}</div>
      ${x.length?`<div class="fa-grid">${x.map(u=>{const $=f.has(u.id);return`<article class="fa-tile ${!$&&!u.na_galeria?"oculta":""}" data-id="${u.id}">
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
        </article>`}).join("")}</div>`:'<div class="ar-vazio"><span>🖼️</span><h3>Nenhuma foto aqui</h3><p class="muted small">Toque em "Adicionar fotos" para enviar.</p></div>'}`,o.querySelectorAll("[data-f]").forEach(u=>u.addEventListener("click",()=>{H=u.dataset.f,r(),o.querySelector(".fa-filtros .on")?.scrollIntoView({block:"nearest",inline:"center"})})),o.querySelectorAll("[data-edit]").forEach(u=>u.addEventListener("click",()=>s(e.find($=>$.id===u.dataset.edit))));const k=m("#fa-files",o);k.addEventListener("change",()=>{k.files.length&&t([...k.files]),k.value=""});const C=m("#drop",o);C.addEventListener("dragover",u=>{u.preventDefault(),C.classList.add("sobre")}),C.addEventListener("dragleave",()=>C.classList.remove("sobre")),C.addEventListener("drop",u=>{u.preventDefault(),C.classList.remove("sobre");const $=[...u.dataTransfer.files].filter(g=>g.type.startsWith("image/"));$.length&&t($)}),o.querySelectorAll(".fa-quick button").forEach(u=>u.addEventListener("click",async()=>{const $=e.find(g=>g.id===u.closest("[data-id]").dataset.id);await I(u,async()=>{if(u.hasAttribute("data-star")){if($.principal)return A("Esta já é a foto principal. Escolha outra foto da cabana para trocar.");await oa($.id),e.forEach(g=>{g.cabana_id===$.cabana_id&&(g.principal=g.id===$.id)}),A(`Foto principal da ${a($.cabana_id)} trocada.`,"ok")}else{const g=u.dataset.t,{error:w}=await E.from("fotos").update({[g]:!$[g]}).eq("id",$.id);if(w)throw w;$[g]=!$[g],A(g==="no_carrossel"?$[g]?"Foi para o carrossel.":"Saiu do carrossel.":$[g]?"Aparece na galeria.":"Saiu da galeria.","ok")}l(),r()})}))},t=d=>{const n=d.map($=>URL.createObjectURL($)),b=document.createElement("dialog");b.className="sheet";const f=i.some($=>$.id===H)?H:"";b.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Enviar ${d.length} ${d.length===1?"foto":"fotos"}</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <div class="fa-prev">${n.map($=>`<img src="${$}" alt="">`).join("")}</div>
      <form class="stack" id="fa-up">
        <div class="field"><span>De onde são as fotos?</span>
          <div class="pills">${[["","🏞️ Geral"],...i.map($=>[$.id,`🏡 ${$.nome}`])].map(([$,g])=>`<label class="pill"><input type="radio" name="cab" value="${$}" ${$===f?"checked":""}><span>${v(g)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="sw-car"><span><b>🎠 Carrossel do Início</b><small>Só para fotos gerais (das cabanas vai a ⭐ principal)</small></span><input type="checkbox" name="car" checked><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" checked><i></i></label>
        <div class="fa-prog" hidden><i></i><span></span></div>
        <button class="btn block">Enviar ${d.length===1?"foto":"fotos"}</button>
      </form>`,document.body.appendChild(b);const x=m("#fa-up",b),k=x.elements,C=()=>{m("#sw-car",b).hidden=!!k.cab.value};x.addEventListener("change",C),C();let u=!1;b.addEventListener("cancel",$=>u&&$.preventDefault()),b.addEventListener("click",$=>{!u&&($.target===b||$.target.closest("[data-fechar]"))&&b.close()}),b.addEventListener("close",()=>{n.forEach($=>URL.revokeObjectURL($)),b.remove()}),x.addEventListener("submit",async $=>{$.preventDefault();const g=m(".fa-prog",b);u=!0,g.hidden=!1;try{await I(x.querySelector(".btn"),async()=>{const w=k.cab.value||null,p=w&&!e.some(q=>q.cabana_id===w&&q.principal);let c=0;const h=await Va(d,{cabana_id:w,no_carrossel:!w&&k.car.checked,na_galeria:k.gal.checked},q=>{q&&c++,m("span",g).textContent=q||"Pronto!",m("i",g).style.width=`${Math.round((q?c-1:d.length)/d.length*100)}%`});p&&h[0]&&(await oa(h[0].id).catch(()=>{}),h[0].principal=!0),e=[...h,...e],l(),A(`${h.length} ${h.length===1?"foto enviada":"fotos enviadas"}.`,"ok"),u=!1,b.close(),r()})}finally{u=!1}}),b.showModal()},s=d=>{if(!d)return;const n=document.createElement("dialog");n.className="sheet",n.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Editar foto</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <button type="button" class="fa-grande" data-zoom><img src="${v(J("fotos",d.path))}" alt=""><span>🔍 Ver grande</span></button>
      <form class="stack" id="fa-ed">
        <label class="field"><span>Legenda</span><input name="legenda" maxlength="200" value="${v(d.legenda)}" placeholder="Ex.: Vista da varanda ao pôr do sol"></label>
        <div class="field"><span>De onde é a foto?</span>
          <div class="pills">${[["","🏞️ Geral"],...i.map(k=>[k.id,`🏡 ${k.nome}`])].map(([k,C])=>`<label class="pill"><input type="radio" name="cab" value="${k}" ${(d.cabana_id||"")===k?"checked":""}><span>${v(C)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="ed-car"><span><b>🎠 Carrossel do Início</b><small>Foto geral no carrossel</small></span><input type="checkbox" name="car" ${d.no_carrossel?"checked":""}><i></i></label>
        <label class="cf-switch" id="ed-pri"><span><b>⭐ Foto principal da cabana</b><small>Capa da cabana e foto dela no carrossel</small></span><input type="checkbox" name="pri" ${d.principal?"checked":""}><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" ${d.na_galeria?"checked":""}><i></i></label>
        <div class="regra-linha"><span><b>Posição</b><small>Menor aparece primeiro</small></span>${aa("ordem",d.ordem,-999,999,"")}</div>
        <button class="btn block">Salvar</button>
        <button type="button" class="cf-del" data-apagar>🗑️ Apagar foto</button>
      </form>`,document.body.appendChild(n);const b=m("#fa-ed",n),f=b.elements,x=()=>{m("#ed-car",n).hidden=!!f.cab.value,m("#ed-pri",n).hidden=!f.cab.value};b.addEventListener("change",x),x(),n.querySelectorAll(".stp [data-d]").forEach(k=>k.addEventListener("click",()=>{const C=m("input",k.closest(".stp"));C.value=Math.min(999,Math.max(-999,(Number(C.value)||0)+Number(k.dataset.d)))})),n.addEventListener("click",k=>{(k.target===n||k.target.closest("[data-fechar]"))&&n.close()}),n.addEventListener("close",()=>n.remove()),m("[data-zoom]",n).addEventListener("click",()=>Na([J("fotos",d.path)])),b.addEventListener("submit",async k=>{k.preventDefault(),await I(b.querySelector(".btn.block"),async()=>{const C=f.cab.value||null,u={legenda:f.legenda.value.trim()||null,cabana_id:C,na_galeria:f.gal.checked,no_carrossel:!C&&f.car.checked,ordem:Number(f.ordem.value)||0},{error:$}=await E.from("fotos").update(u).eq("id",d.id);if($)throw $;Object.assign(d,u,C!==(e.find(g=>g.id===d.id)?.cabana_id??null)?{principal:!1}:{}),C&&f.pri.checked&&!d.principal&&(await oa(d.id),e.forEach(g=>{g.cabana_id===C&&(g.principal=g.id===d.id)})),C||(d.principal=!1),e.sort((g,w)=>g.ordem-w.ordem),l(),A("Foto salva.","ok"),n.close(),r()})}),m("[data-apagar]",n).addEventListener("click",async()=>{if(!await G("Apagar esta foto?","Ela sai do app para todos. Não dá para desfazer.","Apagar",!0))return;const{error:k}=await E.from("fotos").delete().eq("id",d.id);if(k)return D(k);await E.storage.from("fotos").remove([d.path,d.mini_path]),e=e.filter(C=>C.id!==d.id),l(),A("Foto apagada.","ok"),n.close(),r()}),n.showModal()};await B(o,"adm-fotos",async()=>{const[d,n]=await Promise.all([ua(!0),ia(!0)]);return{lista:d,cabs:n}},d=>{e=d.lista.map(n=>({...n})),i=d.cabs,r()})}async function Ie(o){await B(o,"adm-clientes",async()=>{const{data:e,error:i}=await E.from("perfis").select("*").order("nome").limit(2e3);if(i)throw i;return e},e=>{o.innerHTML=`
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, região"><button class="btn sm ghost" id="csv">Baixar planilha</button></div>
    <p class="small muted gap-top">${e.length} cliente(s) · ${e.filter(a=>a.receber_email).length} querem novidades por e-mail · ${e.filter(a=>a.receber_push).length} por notificação</p>
    <div id="lista" class="list-cards"></div>`;const i=()=>{const a=m("#busca").value.trim().toLowerCase(),r=e.filter(t=>!a||[t.nome,t.telefone,t.regiao,t.email].some(s=>String(s??"").toLowerCase().includes(a)));m("#lista").innerHTML=r.slice(0,300).map(t=>`<article class="card row gap">
      <span class="avatar" ${t.foto_path?`data-avatar-path="${v(t.foto_path)}"`:""}>${v(Ma(t.nome))}</span>
      <span><strong>${v(t.nome)}</strong><br><span class="small"><a href="${Ra(t.telefone)}" target="_blank" rel="noopener noreferrer">${v(W(t.telefone))}</a> · ${v(t.email||"")}${t.regiao?" · "+v(t.regiao):""}</span>
      <br><span class="small muted">Desde ${V(t.criado_em)}${t.receber_email?" · ✉️ novidades":""}${t.receber_push?" · 🔔 novidades":""}</span></span></article>`).join(""),l()},l=async()=>{for(const a of U("#lista [data-avatar-path]")){const r=await Ya(a.dataset.avatarPath);r&&a.isConnected&&(a.innerHTML=`<img src="${v(r)}" alt="">`)}};m("#busca").addEventListener("input",i),m("#csv").addEventListener("click",()=>_a("clientes.csv",ba([["Nome","E-mail","Celular","Região","Novidades por e-mail","Novidades por notificação","Cadastro"],...e.map(a=>[a.nome,a.email,W(a.telefone),a.regiao,a.receber_email?"sim":"não",a.receber_push?"sim":"não",V(a.criado_em)])]))),i()})}async function ze(o){const e=F();o.innerHTML=`
    <form id="per" class="row wrap gap">
      <label class="field"><span>De</span><input type="date" name="de" value="${e.slice(0,7)}-01"></label>
      <label class="field"><span>Até</span><input type="date" name="ate" value="${Y(Y(e.slice(0,7)+"-01",32).slice(0,7)+"-01",-1)}"></label>
      <button class="btn sm">Ver</button>
    </form>
    <div class="row wrap gap"><button class="chip" data-p="mes">Este mês</button><button class="chip" data-p="ano">Este ano</button><button class="chip" data-p="12">Últimos 12 meses</button></div>
    <div id="rel" class="gap-top"></div>`;const i=m("#per"),l=async()=>{const a=i.elements.de.value,r=i.elements.ate.value,{data:t,error:s}=await E.rpc("relatorio_reservas",{p_de:a,p_ate:r});if(s)return D(s);const d=t.por_situacao||{};m("#rel").innerHTML=`
      <div class="kpis">
        <div class="kpi"><span>Receita confirmada</span><strong>${O(t.receita_centavos)}</strong></div>
        <div class="kpi"><span>Reservas confirmadas</span><strong>${d.confirmada||0}</strong></div>
        <div class="kpi"><span>Diárias vendidas</span><strong>${t.diarias}</strong></div>
        <div class="kpi"><span>Hóspedes</span><strong>${t.hospedes}</strong></div>
        <div class="kpi"><span>Faltam validar</span><strong>${t.nao_validadas}</strong></div>
        <div class="kpi"><span>Todas as reservas</span><strong>${t.total}</strong></div>
      </div>
      <h3 class="section-title">Por cabana</h3>
      <div class="table-wrap"><table class="table"><thead><tr><th>Cabana</th><th>Reservas</th><th>Noites</th><th>Ocupação</th><th>Receita</th></tr></thead>
      <tbody>${t.por_cabana.map(n=>`<tr><td>${v(n.cabana)}</td><td>${n.reservas}</td><td>${n.noites_ocupadas}</td><td><span class="bar"><i style="width:${Math.min(100,Number(n.ocupacao)||0)}%"></i></span> ${n.ocupacao}%</td><td>${O(n.receita_centavos)}</td></tr>`).join("")}</tbody></table></div>
      <h3 class="section-title">Por mês (entrada)</h3>
      <table class="table"><thead><tr><th>Mês</th><th>Reservas</th><th>Receita</th></tr></thead>
      <tbody>${t.por_mes.map(n=>`<tr><td>${v(n.mes.split("-").reverse().join("/"))}</td><td>${n.reservas}</td><td>${O(n.receita_centavos)}</td></tr>`).join("")||'<tr><td colspan="3" class="muted">Sem dados</td></tr>'}</tbody></table>
      <div class="row wrap gap">
        <div class="grow"><h3 class="section-title">Situação</h3><table class="table"><tbody>${Object.entries(d).map(([n,b])=>`<tr><td>${v(ca[n]?.label||n)}</td><td>${b}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Origem</h3><table class="table"><tbody>${Object.entries(t.por_origem||{}).map(([n,b])=>`<tr><td>${v(Ta[n]||n)}</td><td>${b}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Região dos hóspedes</h3><table class="table"><tbody>${t.por_regiao.map(n=>`<tr><td>${v(n.regiao)}</td><td>${n.reservas}</td></tr>`).join("")}</tbody></table></div>
      </div>
      <button class="btn ghost" id="csv">Baixar planilha das reservas do período</button>`,m("#csv").addEventListener("click",async()=>{const n=await ia(),{data:b,error:f}=await E.from("reservas").select("*").lte("checkin",r).gt("checkout",a).order("checkin").limit(5e3);if(f)return D(f);_a(`reservas-${a}-a-${r}.csv`,ba([["Código","Cabana","Cliente","Celular","E-mail","Região","Entrada","Saída","Diárias","Pessoas","Valor","Situação","Validada","Origem","Criada em"],...b.map(x=>[x.codigo,n.find(k=>k.id===x.cabana_id)?.nome,x.nome_cliente,W(x.telefone_cliente),x.email_cliente,x.regiao_cliente,V(x.checkin),V(x.checkout),x.diarias,x.hospedes,(x.valor_centavos/100).toFixed(2).replace(".",","),ca[x.status]?.label,x.validada?"sim":"não",Ta[x.origem],K(x.criado_em)])]))})};i.addEventListener("submit",a=>{a.preventDefault(),l()}),o.querySelectorAll("[data-p]").forEach(a=>a.addEventListener("click",()=>{const r=a.dataset.p;r==="mes"&&(i.elements.de.value=e.slice(0,7)+"-01"),r==="ano"&&(i.elements.de.value=e.slice(0,4)+"-01-01"),r==="12"&&(i.elements.de.value=Y(e,-365)),i.elements.ate.value=r==="ano"?e.slice(0,4)+"-12-31":r==="12"?e:i.elements.ate.value,l()})),l()}async function je(o){await B(o,"adm-historico",async()=>{const{data:e,error:i}=await E.from("historico_hospedes").select("*").order("checkin",{ascending:!1}).limit(1e4);if(i)throw i;return e},e=>{const i=F();o.innerHTML=`
    <p class="small muted">Registro permanente de todas as hospedagens confirmadas. Ele não é apagado por nada: nem pela limpeza das conversas, nem pela exclusão da conta do cliente.</p>
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, cabana"><button class="btn sm ghost" id="csv">Baixar planilha completa</button></div>
    <p class="small gap-top">${e.length} hospedagem(ns) · ${new Set(e.map(a=>a.telefone||a.email||a.nome)).size} cliente(s)</p>
    <div class="table-wrap"><table class="table" id="tab"></table></div>`;const l=()=>{const a=m("#busca").value.trim().toLowerCase(),r=e.filter(t=>!a||[t.nome,t.telefone,t.email,t.cabana,t.regiao,t.codigo].some(s=>String(s??"").toLowerCase().includes(a)));m("#tab").innerHTML=`<thead><tr><th>Entrada</th><th>Saída</th><th>Hóspede</th><th>Contato</th><th>Cabana</th><th>Pessoas</th><th>Valor</th><th>Situação</th></tr></thead>
      <tbody>${r.slice(0,500).map(t=>`<tr><td>${V(t.checkin)}</td><td>${V(t.checkout)}</td><td>${v(t.nome)}${t.regiao?`<br><span class="muted small">${v(t.regiao)}</span>`:""}</td>
      <td class="small">${v(W(t.telefone))}<br>${v(t.email||"")}</td><td>${v(t.cabana)}</td><td>${t.hospedes}</td><td>${O(t.valor_centavos)}</td>
      <td>${t.situacao==="confirmada"?t.checkout<=i?'<span class="badge ok">Hospedou</span>':'<span class="badge info">Futura</span>':`<span class="badge muted">${v(ca[t.situacao]?.label||t.situacao)}</span>`}</td></tr>`).join("")}</tbody>`};m("#busca").addEventListener("input",l),m("#csv").addEventListener("click",()=>_a("historico-de-hospedes.csv",ba([["Código","Entrada","Saída","Diárias","Hóspede","Celular","E-mail","Região","Cabana","Pessoas","Valor","Situação","Confirmada em"],...e.map(a=>[a.codigo,V(a.checkin),V(a.checkout),a.diarias,a.nome,W(a.telefone),a.email,a.regiao,a.cabana,a.hospedes,(a.valor_centavos/100).toFixed(2).replace(".",","),a.situacao,K(a.confirmada_em)])]))),l()})}async function Ua(){const{data:o,error:e}=await E.from("configuracoes_privadas").select("*").eq("id",1).single();if(e)throw e;return o}async function Re(o){await B(o,"adm-privadas",Ua,e=>{const i=j.config?.modo_atendimento==="chatbot"?"chatbot":"ia";o.innerHTML=`
    <form id="modo" class="cal-card stack">
      <h3>💬 Quem responde o cliente no chat</h3>
      <div class="segmented" role="radiogroup">
        <button type="button" data-modo="ia" role="radio">🤖 IA</button>
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
      <p class="small muted">O chatbot responde sozinho, sem IA, com os dados do app: dias livres, preços, como reservar, Pix, pagar com cartão (chama a equipe), minhas reservas, como chegar, entrada e saída. Aqui ficam as outras dúvidas: o cliente toca na pergunta ou escreve uma das palavras-chave. Toque em ✨ para a IA montar a lista a partir das Informações do chat; depois confira, ajuste e salve.</p>
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
    </form>`;const l={ia:"A IA (Groq, grátis; se ele falhar, Google; se os dois falharem, o chatbot) conversa com o cliente, tira dúvidas com as Informações do chat, consulta as datas e faz a reserva pelo próprio chat.",chatbot:"O chatbot responde com botões e respostas prontas, sem IA: dias livres, preços, reserva pelo calendário, Pix, pagar com cartão (chama a equipe), minhas reservas, como chegar e as perguntas abaixo. A conferência do comprovante do Pix continua com a IA."},a=()=>j.config?.modo_atendimento==="chatbot"?"chatbot":"ia",r=m("#modo"),t=g=>{U("[data-modo]",r).forEach(w=>{w.classList.toggle("on",w.dataset.modo===g),w.setAttribute("aria-checked",String(w.dataset.modo===g))}),m("#modo-txt").textContent=l[g]};t(i),r.addEventListener("click",async g=>{const w=g.target.closest("[data-modo]"),p=a();!w||w.dataset.modo===p||(t(w.dataset.modo),await I(w,async()=>{const{error:c}=await E.from("configuracoes").update({modo_atendimento:w.dataset.modo,atualizado_em:new Date().toISOString()}).eq("id",1);if(c)throw t(p),new Error(/modo_atendimento/.test(c.message)?"Rode o arquivo supabase/022_chatbot.sql no Supabase para usar o chatbot.":c.message);await X(!0),A(w.dataset.modo==="chatbot"?"Pronto: o chatbot responde os clientes.":"Pronto: a IA responde os clientes.","ok")}))});const s=60,d=m("#bot-lista"),n=(g={})=>`
    <div class="cal-card stack bot-item">
      <label class="field"><span>Pergunta (vira um botão)</span><input data-k="pergunta" maxlength="120" value="${v(g.pergunta||"")}" placeholder="Pode levar cachorro?"></label>
      <label class="field"><span>Palavras-chave, separadas por vírgula</span><input data-k="palavras" maxlength="400" value="${v((g.palavras||[]).join(", "))}" placeholder="cachorro, pet, animal, gato"></label>
      <label class="field"><span>Resposta</span><textarea data-k="resposta" rows="3" maxlength="1500" placeholder="Sim! Aceitamos pets de pequeno porte 🐶">${v(g.resposta||"")}</textarea></label>
      <div class="row end"><button type="button" class="btn ghost sm" data-tirar>Remover</button></div>
    </div>`,b=()=>{const g=U(".bot-item",d).length;m("#bot-cont").textContent=`${g} de ${s}`,m("#bot-mais").disabled=g>=s},f=g=>{d.innerHTML=g.length?g.map(n).join(""):'<p class="small muted center" data-vazio>Nenhuma pergunta ainda.</p>',b()},x=()=>U(".bot-item",d).map(g=>({pergunta:m('[data-k="pergunta"]',g).value.trim(),palavras:[...new Set(m('[data-k="palavras"]',g).value.split(",").map(w=>w.trim().toLowerCase()).filter(w=>w.length>=2))].slice(0,12),resposta:m('[data-k="resposta"]',g).value.trim()}));f(Array.isArray(e.chatbot_respostas)?e.chatbot_respostas:[]),m("#bot-mais").addEventListener("click",()=>{m("[data-vazio]",d)?.remove(),d.insertAdjacentHTML("beforeend",n()),b(),U(".bot-item",d).pop().querySelector("input").focus()}),d.addEventListener("click",g=>{const w=g.target.closest("[data-tirar]");w&&(w.closest(".bot-item").remove(),m(".bot-item",d)||f([]),b())}),m("#gerar").addEventListener("click",async g=>{const w=g.currentTarget;x().some(c=>c.pergunta||c.resposta)&&!await G("Criar com as Informações do chat","A lista abaixo será trocada pela que a IA montar. Nada muda para os clientes até você tocar em Salvar.","Criar")||await I(w,async()=>{const c=await ta("chat-ia",{acao:"gerar_chatbot"});f(c.perguntas||[]),A(`${(c.perguntas||[]).length} perguntas criadas. Confira e toque em Salvar.`,"ok")})}),m("#bot").addEventListener("submit",async g=>{g.preventDefault();const w=x(),p=w.findIndex(c=>!c.pergunta||!c.resposta);if(p>=0)return A(`Preencha a pergunta e a resposta do item ${p+1} (ou remova).`,"bad");await I(m("#bot-salvar"),async()=>{const{error:c}=await E.from("configuracoes_privadas").update({chatbot_respostas:w,atualizado_em:new Date().toISOString()}).eq("id",1);if(c)throw new Error(/chatbot_respostas/.test(c.message)?"Rode o arquivo supabase/022_chatbot.sql no Supabase para usar o chatbot.":c.message);z("adm-privadas"),A("Perguntas do chatbot salvas.","ok")})});const k=m("#horario"),C=()=>m("#horas").hidden=k.elements.sempre.checked;k.elements.sempre.addEventListener("change",C),C(),k.addEventListener("submit",async g=>{g.preventDefault();const w=k.elements;if(!w.sempre.checked&&(!w.ini.value||!w.fim.value||w.ini.value===w.fim.value))return A("Confira o horário da equipe.","bad");await I(k.querySelector(".btn"),async()=>{const{error:p}=await E.from("configuracoes").update({equipe_inicio:w.sempre.checked?null:w.ini.value,equipe_fim:w.sempre.checked?null:w.fim.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(p)throw new Error(/equipe_/.test(p.message)?"Rode o arquivo supabase/008_chamar_equipe.sql no Supabase para usar o horário da equipe.":p.message);await X(!0),A("Horário salvo.","ok")})});const u=m("#f"),$=()=>m("#cont").textContent=u.elements.prompt.value.length;u.elements.prompt.addEventListener("input",$),$(),u.addEventListener("submit",async g=>{g.preventDefault(),await I(u.querySelector("button"),async()=>{const{error:w}=await E.from("configuracoes_privadas").update({prompt_ia:u.elements.prompt.value.trim(),atualizado_em:new Date().toISOString()}).eq("id",1);if(w)throw w;z("adm-privadas"),A("Informações salvas.","ok")})})})}function Ga({titulo:o,texto:e,qr:i,segredo:l,verificar:a}){return new Promise(r=>{const t=document.createElement("dialog");t.className="dialog",t.innerHTML=`<form><h3>${v(o)}</h3><p>${v(e)}</p>
      ${i?`<img class="mfa-qr" src="${v(i)}" alt="QR Code para o aplicativo de códigos" width="200" height="200">`:""}
      ${l?`<p class="small muted">Ou digite no aplicativo: <code class="mfa-segredo">${v(l)}</code></p>`:""}
      <label class="field"><span>Código de 6 dígitos</span><input name="c" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required></label>
      <p class="warn small" data-erro hidden></p>
      <div class="row end"><button type="button" class="btn ghost" data-voltar>Voltar</button><button class="btn">Confirmar</button></div></form>`,document.body.appendChild(t);let s=!1;const d=t.querySelector("form");t.querySelector("[data-voltar]").onclick=()=>t.close(),d.addEventListener("submit",async n=>{n.preventDefault();const b=t.querySelector("[data-erro]");b.hidden=!0;try{await a(d.elements.c.value),s=!0,t.close()}catch(f){const x=f?.code==="mfa_verification_failed"||/invalid totp/i.test(f?.message||"");b.textContent=`${x?"Código incorreto ou vencido. Confira no aplicativo e tente de novo.":"Não foi possível confirmar o código."} (${f?.code||f?.status||"erro"}: ${f?.message||f})`,b.hidden=!1}}),t.addEventListener("close",()=>{r(s),t.remove()}),t.showModal()})}async function Oe(){const{data:o,error:e}=await E.auth.mfa.getAuthenticatorAssuranceLevel();if(e)throw e;if(o.currentLevel==="aal2")return!0;const{data:i,error:l}=await E.auth.mfa.listFactors();if(l)throw l;const a=async(n,b)=>{const{error:f}=await E.auth.mfa.challengeAndVerify({factorId:n,code:b});if(f)throw f},r=i.totp.find(n=>n.status==="verified");if(r)return Ga({titulo:"🔒 Código de duas etapas",texto:"Abra o aplicativo de códigos e digite o número desta conta.",verificar:n=>a(r.id,n)});for(const n of i.all.filter(b=>b.status!=="verified"))await E.auth.mfa.unenroll({factorId:n.id}).catch(()=>{});const{data:t,error:s}=await E.auth.mfa.enroll({factorType:"totp",friendlyName:"Chácara Canarinho"});if(s)throw s;const d=await Ga({titulo:"🔒 Ativar a verificação em duas etapas",texto:"Para proteger a chave Pix, leia este QR Code com um aplicativo de códigos (Google Authenticator, por exemplo) e digite o número que aparecer.",qr:t.totp.qr_code,segredo:t.totp.secret,verificar:n=>a(t.id,n)});return d||await E.auth.mfa.unenroll({factorId:t.id}).catch(()=>{}),d}async function De(o){const{data:e,error:i}=await E.from("alteracoes_pix").select("em,email,chave_antes,chave_depois").order("id",{ascending:!1}).limit(10);if(i||!e?.length||!o.isConnected)return;const l=a=>`<code>${v(a||"(vazia)")}</code>`;o.innerHTML=`<details class="pix-hist cal-card">
    <summary><span class="li-ico">🕘</span><b class="grow">Alterações do Pix</b><span class="seg-n">${e.length}</span></summary>
    <ol class="pix-linha">${e.map(a=>`<li>
      <small class="muted">${v(K(a.em))} · ${v(a.email||"acesso direto ao banco")}</small>
      <span>${a.chave_antes===a.chave_depois?"Outros dados do Pix":`Chave ${l(a.chave_antes)} → ${l(a.chave_depois)}`}</span></li>`).join("")}</ol>
  </details>`}const Ba={celular:{ph:"(11) 91234-5678",modo:"tel"},cpf:{ph:"Só os números do CPF ou do CNPJ",modo:"numeric"},email:{ph:"pix@exemplo.com",modo:"email"},aleatoria:{ph:"Ex.: 123e4567-e89b-12d3-a456-426614174000",modo:"text"}},Fe=[["💰","Valor exato"],["👤","Recebedor certo"],["📅","Data certa"],["🔢","ID da transação"],["🖼️","Imagem inédita"],["🕵️","Sem montagem"],["🔍","Leitura nítida"]],He=o=>o%24===0?`${o/24} ${o===24?"dia":"dias"}`:`${o} ${o===1?"hora":"horas"}`;async function Qa(o){await B(o,"adm-privadas",Ua,e=>{const i=!!(e.pix_chave&&e.pix_nome);o.innerHTML=`
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
          <div class="pills">${Object.entries(ga).map(([s,d])=>`<label class="pill"><input type="radio" name="tipo" value="${s}" ${(e.pix_tipo||"celular")===s?"checked":""}><span>${d}</span></label>`).join("")}</div></div>
        <label class="field"><span>Chave Pix</span>
          <input name="chave" maxlength="77" value="${v(e.pix_chave)}" autocomplete="off" spellcheck="false">
          <small class="pix-valida" id="pix-valida" aria-live="polite"></small></label>
        <label class="field"><span>Nome do recebedor <small class="muted">(como aparece no banco)</small></span>
          <input name="nome" maxlength="30" value="${v(e.pix_nome)}" autocomplete="off">
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
        <ul class="pix-confere">${Fe.map(([s,d])=>`<li><span aria-hidden="true">${s}</span>${d}</li>`).join("")}</ul>
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
    <div id="pix-hist" class="gap-top"></div>`,De(m("#pix-hist"));const l=m("#f"),a=l.elements,r=()=>(a.chave.value.trim()?$a(a.tipo.value,a.chave.value):null)!==(e.pix_chave||null)||a.tipo.value!==(e.pix_tipo||"celular")||(a.nome.value.trim()||null)!==(e.pix_nome||null)||a.auto.checked!==!!e.confirmacao_automatica||(a.email.value.trim()||null)!==(e.email_admin||null),t=()=>{const s=Ba[a.tipo.value]||Ba.celular;a.chave.placeholder=s.ph,a.chave.inputMode=s.modo;const d=m("#pix-valida"),n=a.chave.value.trim(),b=n&&$a(a.tipo.value,n);d.className=`pix-valida ${n?b?"ok":"bad":""}`,d.textContent=n?b?`✓ Chave válida${b!==n?`: ${b}`:""}`:`Formato inválido para ${ga[a.tipo.value]}.`:"",U("[data-conta]",l).forEach(x=>{const k=a[x.dataset.conta];x.textContent=`${k.value.length}/${k.maxLength}`});const f=Number(a.prazo.value)||0;m("#prazo-txt").textContent=f?`${He(f)} · depois disso as datas voltam a ficar livres`:"",m("#pix-salvar").textContent=r()?"🔒 Salvar (pede o código)":"Salvar"};l.addEventListener("input",t),l.addEventListener("change",t),U(".stp [data-d]",l).forEach(s=>s.addEventListener("click",()=>{const d=s.closest(".stp"),n=m("input",d);n.value=Math.min(Number(d.dataset.max),Math.max(Number(d.dataset.min),(Number(n.value)||0)+Number(s.dataset.d))),t()})),t(),l.addEventListener("submit",async s=>{s.preventDefault();const d=a.chave.value.trim()?$a(a.tipo.value,a.chave.value):null;if(a.chave.value.trim()&&!d)return A("Chave Pix inválida para o tipo escolhido.","bad");if(d&&!a.nome.value.trim())return A("Informe também o nome do recebedor, como aparece no banco.","bad");const n=Number(a.prazo.value);if(!(n>=1&&n<=168))return A("O prazo para pagar vai de 1 a 168 horas.","bad");const b=r();await I(m("#pix-salvar"),async()=>{if(b&&!await Oe())return;const{error:f}=await E.from("configuracoes_privadas").update({pix_ativo:!!(d&&a.nome.value.trim()),pix_tipo:a.tipo.value,pix_chave:d,pix_nome:a.nome.value.trim()||null,pix_cidade:a.cidade.value.trim()||null,prazo_pagamento_horas:n,confirmacao_automatica:a.auto.checked,email_admin:a.email.value.trim()||null,atualizado_em:new Date().toISOString()}).eq("id",1);if(f)throw f;A(d?"Pix salvo e ativo no chat.":"Pix salvo.","ok"),z("adm-privadas"),Qa(o)})})})}async function Ve(o){await B(o,"adm-aparencia",()=>X(!0),e=>{o.innerHTML=`
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
    </form>`;const i=m("#f");let l=null,a=e.lat!=null&&e.lng!=null?{lat:e.lat,lng:e.lng}:null,r=!1;const t=()=>{m("#pin-status").innerHTML=a?'<b class="ok-text">📍 Local marcado no mapa</b>':"<b>Sem alfinete no mapa</b>",m("#pin-btn").textContent=a?"📍 Mudar no mapa":"📍 Marcar no mapa"};t();let s=null,d=!(e.ilustracao_versao>0),n=!1;const b=m("#ilus-prev"),f=()=>{s?b.src=URL.createObjectURL(s):b.src=d?"icons/passaro.svg":J("marca",`ilustracao/v${e.ilustracao_versao}.png`),m("#ilus-padrao").hidden=d&&!s,m("#ilus-tam-img").src=b.src},x=Number(e.ilustracao_tamanho)||100,k=()=>{const _=Number(i.elements.ilustam.value);m("#ilus-tam-v").textContent=`${_}%`;const y=Math.round(96*_/100);m("#ilus-tam-img").width=y,m("#ilus-tam-img").height=y};i.elements.ilustam.addEventListener("input",k),k(),f(),i.elements.ilus.addEventListener("change",async()=>{const _=i.elements.ilus.files[0];if(i.elements.ilus.value="",!!_)try{s=await ha(_),s.size>480*1024&&(s=await ha(s,360)),d=!1,n=!0,f(),A("Ilustração escolhida. Toque em Salvar aparência.")}catch(y){D(y)}}),m("#ilus-padrao").addEventListener("click",()=>{s=null,d=!0,n=!0,f(),A("Volta ao passarinho padrão ao salvar.")}),m("#pin-btn").addEventListener("click",async()=>{const _=await he({...a||{},endereco:i.elements.end.value});_!==void 0&&(a=_,r=!0,t(),A(_?"Ponto marcado. Toque em Salvar aparência.":"Alfinete removido. Toque em Salvar aparência."))});let C=null,u=!1;const $=e.icone_versao>0?fetch(ee(e.icone_versao,"logo.png")).then(_=>_.ok?_.blob():null).catch(()=>null):Promise.resolve(null),g=()=>{try{return Number(localStorage.getItem("icone-zoom"))||100}catch{return 100}};let w=!1;i.elements.zoom.value=g();const p=()=>m("#zoom-v").textContent=`${i.elements.zoom.value}%`;p();const c=[],h=async()=>{l=await re(C||"icons/logo.svg",i.elements.fundo.value,Number(i.elements.zoom.value)/100),c.splice(0).forEach(y=>URL.revokeObjectURL(y));const _=y=>{const S=URL.createObjectURL(l[y]);return c.push(S),S};m("#prev").src=_("icon-192.png"),m("#pv-circ").src=m("#pv-arred").src=_("icon-maskable-512.png"),m("#pv-ios").src=_("apple-touch-icon.png")};i.elements.fundo.addEventListener("input",()=>h().catch(D));let q;i.elements.zoom.addEventListener("input",()=>{w=!0,p(),clearTimeout(q),q=setTimeout(()=>h().catch(D),180)}),i.elements.logo.addEventListener("change",async()=>{const _=i.elements.logo.files[0];if(_)try{C=await ha(_),u=!0;const{selo:y,cor:S}=le(await ce(C));y&&S&&(i.elements.fundo.value=S),await h(),m("#logo-padrao").hidden=!1,A(y&&S?"Logo ajustada para ocupar o ícone, com o fundo na cor do selo. Toque em Salvar aparência.":"Logo escolhida. Toque em Salvar aparência para aplicar.")}catch(y){D(y)}finally{i.elements.logo.value=""}}),m("#logo-padrao").addEventListener("click",()=>{C=null,u=!0,m("#logo-padrao").hidden=!0,h().catch(D)}),$.then(_=>(_&&!u&&(C=_),h())).catch(()=>{}),i.elements.cor.addEventListener("input",()=>{document.documentElement.style.setProperty("--brand",i.elements.cor.value),document.documentElement.style.setProperty("--brand-ink",te(i.elements.cor.value))}),h().catch(()=>{}),i.addEventListener("submit",async _=>{_.preventDefault();const y=i.elements,S=ie(y.insta.value);if(S===null)return A("Instagram inválido. Use @perfil ou o endereço do perfil.","bad");const L=Sa(y.cor.value),M=Sa(y.fundo.value);await I(i.querySelector("button"),async()=>{const N=M!==e.cor_icone_fundo||u||w||e.icone_versao===0,T=N?Math.floor(Date.now()/1e3):e.icone_versao;if(N){await $,await h();const Z={...l,...C?{"logo.png":C}:{}};for(const[Za,Ea]of Object.entries(Z)){if(Ea.size>500*1024)throw new Error("A logo gerou um ícone pesado demais. Use uma imagem mais simples (PNG com fundo transparente).");const{error:Ca}=await E.storage.from("marca").upload(`v${T}/${Za}`,Ea,{contentType:"image/png",cacheControl:"31536000"});if(Ca)throw Ca}}let P=e.ilustracao_versao??0;if(n){if(d)P=0;else if(s){P=Math.floor(Date.now()/1e3);const{error:Z}=await E.storage.from("marca").upload(`ilustracao/v${P}.png`,s,{contentType:"image/png",cacheControl:"31536000"});if(Z)throw Z}}const R=Math.min(200,Math.max(50,Math.round(Number(y.ilustam.value)/10)*10||100)),sa=R!==x,{error:Q}=await E.from("configuracoes").update({nome_app:y.nome.value.trim(),cor_principal:L,cor_icone_fundo:M,boas_vindas:y.boas.value.trim(),endereco:y.end.value.trim()||null,instagram_url:S||null,icone_versao:T,atualizado_em:new Date().toISOString(),...r?{lat:a?.lat??null,lng:a?.lng??null}:{},...n?{ilustracao_versao:P}:{},...sa?{ilustracao_tamanho:R}:{}}).eq("id",1);if(Q)throw/ilustracao_tamanho/i.test(Q.message)?new Error("Para salvar o tamanho da ilustração, rode o arquivo supabase/019_tamanho_ilustracao.sql no Supabase."):/ilustracao/i.test(Q.message)?new Error("Para salvar a ilustração, rode o arquivo supabase/006_ilustracao.sql no Supabase."):/lat|lng|column/i.test(Q.message)?new Error("Para salvar o local no mapa, rode o arquivo supabase/005_mapa.sql no Supabase."):Q;r=!1,n&&e.ilustracao_versao>0&&P!==e.ilustracao_versao&&E.storage.from("marca").remove([`ilustracao/v${e.ilustracao_versao}.png`]).catch(()=>{}),n=!1,N&&e.icone_versao>0&&E.storage.from("marca").remove(["icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","logo.png"].map(Z=>`v${e.icone_versao}/${Z}`)).catch(()=>{}),u=!1,w=!1;try{localStorage.setItem("icone-zoom",String(i.elements.zoom.value))}catch{}await X(!0),ae(),z("adm-aparencia"),z("adm-calendario"),A("Aparência salva.","ok")})})})}async function Ja(o){await B(o,"adm-novidades",async()=>{const[{count:e},{count:i},{data:l}]=await Promise.all([E.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_email",!0),E.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_push",!0),E.from("novidades").select("*").order("criado_em",{ascending:!1}).limit(30)]);return{ce:e,cp:i,envios:l}},({ce:e,cp:i,envios:l})=>{o.innerHTML=`
    <form id="f" class="stack card">
      <p class="small muted">Só recebem os clientes que pediram: ${e??0} por e-mail e ${i??0} por notificação.</p>
      <label class="field"><span>Título</span><input name="titulo" required minlength="2" maxlength="80"></label>
      <label class="field"><span>Mensagem</span><textarea name="texto" rows="5" required minlength="2" maxlength="2000"></textarea></label>
      <label class="check"><input type="checkbox" name="email" checked> Enviar por e-mail</label>
      <label class="check"><input type="checkbox" name="push" checked> Enviar por notificação</label>
      <button class="btn">Enviar novidade</button>
    </form>
    <h3 class="section-title">Enviadas</h3>
    ${(l||[]).map(r=>`<article class="card"><strong>${v(r.titulo)}</strong> <span class="muted small">${K(r.criado_em)}</span><p class="small pre">${v(r.texto)}</p><p class="small muted">✉️ ${r.enviados_email} · 🔔 ${r.enviados_push}</p></article>`).join("")||'<p class="muted small">Nenhuma ainda.</p>'}`;const a=m("#f");a.addEventListener("submit",async r=>{r.preventDefault();const t=a.elements;await G("Enviar a novidade?","Ela vai para todos os clientes que pediram.","Enviar")&&await I(a.querySelector("button"),async()=>{const s=await ta("enviar-novidade",{titulo:t.titulo.value.trim(),texto:t.texto.value.trim(),email:t.email.checked,push:t.push.checked});A(`Enviada: ${s.enviados_email} e-mail(s) e ${s.enviados_push} notificação(ões).`,"ok"),z("adm-novidades"),Ja(o)})})})}const Ue=[["🧭","Visão geral",`
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
    <p><b>Como o comprovante é conferido</b>: a IA só lê a imagem; regras fixas decidem. Se a IA estiver fora do ar, o comprovante vem para você conferir. Precisa passar em tudo:</p>
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
    <p>O <b>atendente virtual</b> (IA do Groq, ou do Google se o Groq falhar) responde dúvidas, mostra os dias livres, faz reservas e envia o Pix. Ele já sabe as cabanas, preços, horários, dias livres dos próximos 60 dias, o endereço e a rota.</p>
    <p>Em <a href="#/admin/ia">Chat: IA ou chatbot</a> você escreve o resto: regras da casa, o que está incluso, animais, crianças, cancelamento… Quanto mais completo, melhor ele responde.</p>
    <p>Em <a href="#/admin/ia">Chat: IA ou chatbot</a> você escolhe quem responde: a <b>IA</b> ou o <b>chatbot</b>, que responde com botões e respostas prontas, sem IA (dias livres, preços, reserva pelo calendário, Pix, pagar com cartão chamando a equipe, minhas reservas, como chegar e as perguntas que você cadastrar). Toque em ✨ para a IA montar as perguntas do chatbot com as Informações do chat; confira e salve.</p>
    <p>Na aba <b>Clientes</b> (barra de baixo; também em <a href="#/admin/conversas">Menu › Conversas dos clientes</a>) você lê todas as conversas e pode <b>responder como equipe</b>. O cliente recebe uma notificação e vê a mensagem com o selo "equipe". A IA passa a seguir o que você combinou.</p>
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
    <div class="ajuda gap-top">${Ue.map(([i,l,a],r)=>`
      <details class="ajuda-item" ${r===0?"open":""}>
        <summary><span class="li-ico">${i}</span><b>${v(l)}</b></summary>
        <div class="ajuda-txt">${a}</div>
      </details>`).join("")}</div>
    <p class="small muted center gap-top">Esta ajuda aparece só para administradores.</p>`;const e=U(".ajuda-item",o);m("#ajuda-busca",o).addEventListener("input",i=>{const l=Wa(i.target.value);for(const a of e){const r=!l||Wa(a.textContent).includes(l);a.hidden=!r,l&&(a.open=r)}})}const Wa=o=>String(o??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();export{ge as ADMIN_SECOES,oo as renderAdmin};
