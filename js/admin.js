import{sb as x,state as I,$ as u,$$ as ma,view as Va,go as ka,toast as E,fail as O,api as ta,busy as N,confirmDialog as G,promptDialog as Ua,loadConfig as Y,loadCabanas as aa,loadFotos as pa,publicUrl as Q,avatarUrl as Ga,applyBrand as Ba,screenCached as ua,screenUpdate as ia,screenForget as z,screenForgetPrefix as xa,marcaUrl as Qa,loadFeriados as Ja}from"./core.js";import{esc as p,filtrarClientes as Wa,fmtMoney as R,fmtDate as V,fmtDateTime as W,parseMoney as na,normalizeHex as qa,inkOn as Za,instagramUrl as Ka,csv as va,todayISO as j,addDays as B,STATUS as ra,ORIGENS as Ea,fmtPhone as J,initials as La,MESES as fa,daysBetween as la}from"./util.js";import{resizeForGallery as Xa,makeIconSet as Ya,extOf as Ca,resizeLogo as ba,analisarLogo as ae,abrirLogo as ee}from"./images.js";import{PIX_TYPES as oe,normalizePixKey as se}from"./pix.js";import{statusBadge as te,openLightbox as Sa,fab as Aa,ICON as ie}from"./app.js";import{feriadoNacional as Ta,estadia as ne}from"./precos.js";import{renderConversasAdmin as re,renderConversaAdmin as le}from"./admin-conversas.js";import{marcarNoMapa as ce}from"./map.js";const de=[["reservas","✅","Reservas: conferir e validar"],["conversas","💬","Conversas dos clientes"],["calendario","🗓️","Calendário e dias disponíveis"],["cabanas","🏡","Cabanas e fotos das cabanas"],["fotos","🖼️","Fotos do carrossel e da galeria"],["clientes","👥","Clientes"],["relatorios","📊","Relatórios"],["historico","📚","Histórico de hóspedes"],["ia","🤖","Informações do chat (IA)"],["pix","💠","Pix e conferência do comprovante"],["aparencia","🎨","Aparência: cores e ícone"],["novidades","📣","Enviar novidades"],["ajuda","❓","Ajuda: como tudo funciona"]];async function Ge(t,e=[]){const n=de.find(([o])=>o===t);if(!n)return ka("#/menu");if(t==="conversas"&&e[0])return le(e[0]);Va().innerHTML=`
    <section class="admin">
      <header class="admin-head pad"><a href="#/menu" class="back">‹ Menu</a><h1 class="title">${n[1]} ${p(n[2])}</h1></header>
      <div class="pad" id="admin-body"><div class="loading">Carregando…</div></div>
    </section>`;const r=u("#admin-body"),a={reservas:be,conversas:re,calendario:za,cabanas:da,fotos:Ee,clientes:Le,relatorios:Ce,historico:Se,ia:Ae,pix:Oa,aparencia:Pe,novidades:Ha,ajuda:ze}[t];if(!a)return ka("#/admin");await a(r)}async function U(t,e,n,r){const a=ua(e);let o=!1;const i=()=>o=!0;t.addEventListener("input",i),a!==void 0&&r(a);let l;try{l=await n()}catch(d){if(a===void 0)throw d;return}ia(e,l),t.isConnected&&(a===void 0||!o&&JSON.stringify(l)!==JSON.stringify(a))&&(t.removeEventListener("input",i),r(l))}const ha=(t,e,n="text/csv;charset=utf-8")=>{const r=document.createElement("a");r.href=URL.createObjectURL(new Blob([e],{type:n})),r.download=t,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),2e3)},Ma=t=>t?`https://wa.me/${encodeURIComponent(t)}`:"",Pa=[["validar","🔎","Para conferir"],["proximas","🗓️","Próximas"],["aguardando_pagamento","⏳","Aguardando Pix"],["confirmada","✅","Confirmadas"],["todas","📋","Todas"],["cancelada","🚫","Canceladas"],["recusada","❌","Não confirmadas"],["expirada","⌛","Prazo encerrado"]],me=["dom.","seg.","ter.","qua.","qui.","sex.","sáb."],pe=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],Na=t=>{const e=new Date(t+"T12:00:00Z");return{dia:String(e.getUTCDate()).padStart(2,"0"),mes:pe[e.getUTCMonth()],sem:me[e.getUTCDay()]}},ue='<svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1.2-1.1 2 .9c-.2 1.2-1.2 1.9-2.4 1.7-3-.6-5.5-3-6-6-.2-1.2.5-2.2 1.7-2.4l.9 2z"/></svg>';function ve(t){if(!["aguardando_pagamento","em_analise","confirmada"].includes(t.status))return"";const e=j();if(t.checkout<=e)return'<span class="ar-quando passado">Já saiu</span>';if(t.checkin<=e)return'<span class="ar-quando agora">🏡 Hospedado agora</span>';const n=la(e,t.checkin);return`<span class="ar-quando">${n===1?"Entra amanhã":`Entra em ${n} dias`}</span>`}function fe(t){if(t.status!=="aguardando_pagamento"||!t.expira_em)return"";const e=Math.round((Date.parse(t.expira_em)-Date.now())/6e4);return e<=0?'<p class="ar-aviso warn">⏳ O prazo do Pix acabou; a reserva vai expirar sozinha.</p>':`<p class="ar-aviso warn">⏳ Esperando o Pix do cliente · prazo de <b>${e<60?`${e} min`:e<1440?`${Math.floor(e/60)} h ${e%60?`${e%60} min`:""}`:`${Math.floor(e/1440)} dia(s)`}</b></p>`}async function be(t){const e=I.cabanas||ua("vitrine")?.cabanas||await aa(),n=s=>e.find(v=>v.id===s)?.nome||"—";let r=sessionStorage.getItem("adm-filtro")||"validar";Pa.some(([s])=>s===r)||(r="validar"),t.innerHTML=`
    <div class="ar-busca"><span aria-hidden="true">🔍</span><input id="f-busca" type="search" placeholder="Buscar por nome, código ou celular" autocomplete="off"><button type="button" id="limpar" aria-label="Limpar busca" hidden>✕</button></div>
    <div class="ar-filtros" role="tablist">${Pa.map(([s,v,$])=>`<button type="button" role="tab" data-f="${s}" class="${s===r?"on":""}">${v} ${$}<b class="ar-n" data-n="${s}"></b></button>`).join("")}</div>
    <div class="ar-bulk" id="bulk" hidden></div>
    <div id="lista" class="ar-lista"></div>
    ${Aa("nova","Nova reserva")}`;const a=u("#f-busca"),o=sessionStorage.getItem("adm-busca");o&&(sessionStorage.removeItem("adm-busca"),a.value=o,r="todas");const i=()=>{t.querySelectorAll("[data-f]").forEach(s=>s.classList.toggle("on",s.dataset.f===r)),t.querySelector("[data-f].on")?.scrollIntoView({block:"nearest",inline:"center"})};i(),u("#limpar").hidden=!a.value;const l=async()=>{const{data:s}=await x.from("reservas").select("status,validada,checkout").in("status",["aguardando_pagamento","em_analise","confirmada"]).limit(2e3);if(!s||!t.isConnected)return;const v=j(),$={validar:s.filter(y=>y.status==="em_analise"||y.status==="confirmada"&&!y.validada).length,proximas:s.filter(y=>y.checkout>=v).length,aguardando_pagamento:s.filter(y=>y.status==="aguardando_pagamento").length};t.querySelectorAll("[data-n]").forEach(y=>{const k=$[y.dataset.n];y.textContent=k||"",y.classList.toggle("alerta",y.dataset.n==="validar"&&k>0)})};let d=[];const c=s=>r==="validar"?s.status==="em_analise"||s.status==="confirmada"&&!s.validada:r==="proximas"?["aguardando_pagamento","em_analise","confirmada"].includes(s.status)&&s.checkout>=j():r==="todas"||s.status===r,f=s=>{const v=new Map(s.map($=>[$.id,$]));d=d.map($=>v.get($.id)||$).filter(c),xa("adm-reservas:"),ia(`adm-reservas:${r}:${a.value.trim()}`,d),g(d),l()},b={validar:["🎉","Tudo conferido!","Nenhum comprovante esperando e nenhuma reserva para validar."],proximas:["🌿","Nenhuma hospedagem pela frente","As próximas reservas aparecem aqui."]},g=s=>{d=s;const v=u("#lista");if(!v)return;const $=s.filter(_=>_.status==="confirmada"&&!_.validada),y=u("#bulk");if(y.hidden=$.length<2,y.innerHTML=`<span><b>${$.length} confirmadas</b> esperando a sua validação</span><button type="button" class="btn sm" id="validar-todas">Validar todas</button>`,v.dataset.ids=JSON.stringify($.map(_=>_.id)),!s.length){const[_,L,T]=a.value.trim()?["🔍","Nada encontrado",'Confira o nome, o código ou o celular, ou procure em "Todas".']:b[r]||["📭","Nenhuma reserva aqui","Escolha outro filtro acima."];v.innerHTML=`<div class="ar-vazio"><span>${_}</span><h3>${L}</h3><p class="muted small">${T}</p></div>`;return}let k="";v.innerHTML=s.map(_=>{const L=_.checkin.slice(0,7),T=L!==k?`<h3 class="ar-mes">${fa[Number(L.slice(5))-1]} de ${L.slice(0,4)}</h3>`:"";return k=L,T+m(_)}).join("")},w=async()=>{const s=u("#lista"),v=a.value.trim(),$=r,y=`adm-reservas:${$}:${v}`,k=ua(y);k?g(k):s.innerHTML='<div class="ar-esqueleto"><i></i><i></i></div>';let _=x.from("reservas").select("*").order("checkin",{ascending:$==="proximas"||$==="validar"}).limit(200);$==="validar"?_=_.or("status.eq.em_analise,and(status.eq.confirmada,validada.eq.false)"):$==="proximas"?_=_.in("status",["aguardando_pagamento","em_analise","confirmada"]).gte("checkout",j()):$!=="todas"&&(_=_.eq("status",$));const L=v.replace(/[,()%]/g,"");L&&(_=_.or(`nome_cliente.ilike.%${L}%,codigo.ilike.%${L}%,telefone_cliente.ilike.%${L.replace(/\D/g,"")||L}%`));const{data:T,error:D}=await _;if(D)return k?void 0:O(D);if(!s.isConnected||a.value.trim()!==v||r!==$)return ia(y,T);JSON.stringify(T)!==JSON.stringify(k)&&g(T),ia(y,T)},q=s=>s.resultado==="aprovado"?["ok","✅ Aprovado pela IA"]:s.resultado==="nao_e_comprovante"?["bad","❌ Não parece um comprovante"]:["warn","⚠️ A IA pediu para conferir"],m=s=>{const v=s.analise_ia,$=ra[s.status]||{label:s.status,tone:""},y=Na(s.checkin),k=Na(s.checkout),_=s.telefone_cliente,L=["aguardando_pagamento","em_analise"].includes(s.status),T=L&&s.status==="em_analise"?["confirmar","✅ Confirmar pagamento"]:s.status==="confirmada"&&!s.validada?["validar","☑️ Validar reserva"]:L?["confirmar","✅ Confirmar pagamento"]:null,D=[s.comprovante_path?["ver","Comprovante",""]:null,s.status==="em_analise"?["pedir_novo","Pedir outro",""]:null,L?["recusar","Recusar","danger"]:null,s.status==="confirmada"?["cancelar","Cancelar","danger"]:null].filter(Boolean),[S,M]=v?.verificacoes?q(v):[];return`<article class="res-card adm-res t-${$.tone}" data-id="${s.id}">
      <div class="ar-head">
        <span class="ar-av">${p(La(s.nome_cliente))}</span>
        <div class="ar-tit"><h3>${p(s.nome_cliente)}</h3><span class="res-code" title="Feita em ${p(W(s.criado_em))}">#${p(s.codigo)} · ${s.origem==="chat"?"💬 chat":s.origem==="admin"?"👤 equipe":"📱 app"} · ${new Date(s.criado_em).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}</span></div>
        <span class="res-status ${$.tone}">${p($.label)}</span>
      </div>
      <div class="ar-cab"><span>🏡 <b>${p(n(s.cabana_id))}</b></span>${ve(s)}</div>
      <div class="res-dates">
        <div class="rd"><small>Entrada</small><strong>${y.dia} ${y.mes}</strong><span>${y.sem}</span></div>
        <div class="rd-mid"><span>${s.diarias} ${s.diarias===1?"noite":"noites"}</span></div>
        <div class="rd"><small>Saída</small><strong>${k.dia} ${k.mes}</strong><span>${k.sem}</span></div>
      </div>
      <div class="res-info"><span>${ie.people} ${s.hospedes} ${s.hospedes===1?"pessoa":"pessoas"}</span><strong>${R(s.valor_centavos)}</strong></div>
      ${_||s.email_cliente?`<div class="ar-contato">
        ${_?`<a class="ar-ct whats" href="${Ma(_)}" target="_blank" rel="noopener noreferrer">${ue}<span>${p(J(_))}</span></a>`:""}
        ${s.email_cliente?`<a class="ar-ct" href="mailto:${p(s.email_cliente)}">✉️<span>${p(s.email_cliente)}</span></a>`:""}
        ${s.regiao_cliente?`<span class="ar-ct sem">📍<span>${p(s.regiao_cliente)}</span></span>`:""}
      </div>`:""}
      ${fe(s)}
      ${s.status==="em_analise"?'<p class="ar-aviso info">🧾 O cliente enviou o comprovante. Confira no extrato do banco antes de confirmar.</p>':""}
      ${s.status==="confirmada"?s.validada?`<p class="ar-aviso ok">☑️ Validada em ${W(s.validada_em)}</p>`:'<p class="ar-aviso warn">👀 Confirmada, esperando a sua validação (confira o Pix no extrato).</p>':""}
      ${s.motivo?`<p class="res-motivo">💬 ${p(s.motivo)}</p>`:""}
      ${v?.verificacoes?`<details class="ar-ia ${S}"><summary><span>${M}</span><small>ver detalhes</small></summary>
        <ul>${v.verificacoes.map(A=>`<li class="${A.ok?"ok":"bad"}"><i>${A.ok?"✓":"✗"}</i><span><b>${p(A.regra)}</b><small>${p(A.detalhe)}</small></span></li>`).join("")}</ul>
        ${v.extraido?.pagador_nome?`<p class="small">Pagador: <b>${p(v.extraido.pagador_nome)}</b>${v.extraido.destinatario_instituicao?` · ${p(v.extraido.destinatario_instituicao)}`:""}</p>`:""}
        ${v.extraido?.observacoes?`<p class="small muted">Obs.: ${p(v.extraido.observacoes)}</p>`:""}</details>`:""}
      ${T||D.length?`<div class="ar-acoes">
        ${T?`<button class="btn block" data-a="${T[0]}">${T[1]}</button>`:""}
        ${D.length?`<div class="ar-sec">${D.map(([A,C,P])=>`<button class="btn sm ghost ${P}" data-a="${A}">${C}</button>`).join("")}</div>`:""}
      </div>`:""}
    </article>`};t.querySelectorAll("[data-f]").forEach(s=>s.addEventListener("click",()=>{r!==s.dataset.f&&(r=s.dataset.f,sessionStorage.setItem("adm-filtro",r),i(),w())}));let h;a.addEventListener("input",()=>{u("#limpar").hidden=!a.value,clearTimeout(h),h=setTimeout(w,350)}),u("#limpar").addEventListener("click",()=>{a.value="",u("#limpar").hidden=!0,w(),a.focus()}),u("#nova").addEventListener("click",()=>he(e,()=>{xa("adm-reservas:"),w(),l()})),u("#bulk").addEventListener("click",async s=>{const v=s.target.closest("#validar-todas");if(!v)return;const $=JSON.parse(u("#lista").dataset.ids||"[]");!$.length||!await G(`Validar ${$.length} reserva(s)?`,"Confirme que conferiu os pagamentos no extrato do banco.","Validar todas")||await N(v,async()=>{const y=[];for(const k of $)y.push((await ta("admin-reserva",{acao:"validar",reserva_id:k})).reserva);E("Reservas validadas.","ok"),f(y)})}),u("#lista").addEventListener("click",async s=>{const v=s.target.closest("[data-a]");if(!v)return;const $=v.closest(".adm-res").dataset.id,y=v.dataset.a;if(y==="ver"){await N(v,async()=>{const{data:_}=await x.from("reservas").select("comprovante_path").eq("id",$).single(),{data:L,error:T}=await x.storage.from("comprovantes").createSignedUrl(_.comprovante_path,600);if(T)throw T;Sa([L.signedUrl])});return}let k;if(["recusar","cancelar","pedir_novo"].includes(y)){if(k=await Ua({recusar:"Recusar a reserva",cancelar:"Cancelar a reserva",pedir_novo:"Pedir outro comprovante"}[y],"Motivo (o cliente recebe esta mensagem)","","Enviar"),k===null)return}else if(y==="confirmar"&&!await G("Confirmar o pagamento?","O cliente recebe a confirmação por e-mail e notificação.","Confirmar"))return;await N(v,async()=>{const{reserva:_}=await ta("admin-reserva",{acao:y,reserva_id:$,motivo:k});E({confirmar:"Pagamento confirmado. O cliente foi avisado.",validar:"Reserva validada.",recusar:"Reserva recusada.",cancelar:"Reserva cancelada.",pedir_novo:"Pedido enviado ao cliente."}[y]||"Pronto.","ok"),f([_])})}),w(),l()}function he(t,e){const n=t.filter(s=>s.ativa),r=document.createElement("dialog");r.className="dialog cab-form",r.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head"><button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button><h3>Nova reserva</h3><span></span></header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Hospedagem</h4>
        <div class="pills">${n.map((s,v)=>`<label class="pill"><input type="radio" name="cabana_id" value="${s.id}" ${v===0?"checked":""}><span>${p(s.nome)}</span></label>`).join("")}</div>
        <div class="datas-2">
          <label class="field"><span>Entrada</span><input type="date" name="checkin" required min="${j()}"></label>
          <label class="field"><span>Saída</span><input type="date" name="checkout" required min="${j()}"></label>
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
  </form>`,document.body.appendChild(r);const a=u("form",r),o=a.elements;u("[data-close]",r).onclick=()=>r.close();let i=I.feriados||[];Ja().then(s=>{i=s,d()}).catch(()=>{});const l=()=>n.find(s=>s.id===o.cabana_id.value),d=()=>{const s=l(),v=u("#nr-calc",r);if(s&&(u("#nr-cap",r).textContent=`até ${s.capacidade} nesta cabana`),o.checkin.value&&(!o.checkout.value||o.checkout.value<=o.checkin.value)&&(o.checkout.value=B(o.checkin.value,1)),o.checkin.value&&(o.checkout.min=B(o.checkin.value,1)),!s||!o.checkin.value||!o.checkout.value)return;const{total:$,grupos:y}=ne(s,o.checkin.value,o.checkout.value,i),k=la(o.checkin.value,o.checkout.value),_=[y.normal.n&&`${y.normal.n} normal`,y.fim_semana.n&&`${y.fim_semana.n} sex a dom`,y.feriado.n&&`${y.feriado.n} feriado`].filter(Boolean);v.innerHTML=`<span>${k} ${k===1?"diária":"diárias"}${_.length>1||y.fim_semana.n||y.feriado.n?` <small>(${_.join(" · ")})</small>`:""}</span><b>${R($)}</b>`};a.addEventListener("change",d),r.querySelectorAll(".stp [data-d]").forEach(s=>s.addEventListener("click",()=>{const v=s.closest(".stp"),$=u("input",v);$.value=Math.min(l()?.capacidade||50,Math.max(1,(Number($.value)||0)+Number(s.dataset.d)))})),d();let c=null,f=!1,b=null;const g=u("#nr-busca",r),w=u("#nr-lista",r),q=s=>p([J(s.telefone),s.email].filter(Boolean).join(" · ")),m=()=>{if(f){w.innerHTML='<p class="muted small">Não foi possível carregar os clientes. Feche e abra de novo.</p>';return}if(!c){w.innerHTML='<p class="muted small">Carregando clientes…</p>';return}w.innerHTML=Wa(c,g.value).map(s=>`<button type="button" class="nr-item" data-id="${p(s.id)}"><b>${p(s.nome)}</b><small>${q(s)}</small></button>`).join("")||'<p class="muted small">Nenhum cliente encontrado. Se for a primeira vez dele, escolha Novo cliente.</p>'},h=s=>{b=s,u("#nr-procura",r).hidden=!!s;const v=u("#nr-escolhido",r);v.hidden=!s,v.innerHTML=s?`<span><b>${p(s.nome)}</b><small>${q(s)}</small></span><button type="button" class="btn sm ghost" data-trocar>Trocar</button>`:"",s||g.focus()};w.addEventListener("click",s=>{const v=s.target.closest("[data-id]")?.dataset.id;v&&h(c.find($=>$.id===v))}),u("#nr-escolhido",r).addEventListener("click",s=>{s.target.closest("[data-trocar]")&&h(null)}),g.addEventListener("input",m),g.addEventListener("keydown",s=>{s.key==="Enter"&&s.preventDefault()}),r.querySelectorAll("[name=tipo_cliente]").forEach(s=>s.addEventListener("change",()=>{const v=o.tipo_cliente.value==="cadastrado";u("#nr-cadastrado",r).hidden=!v,u("#nr-novo",r).hidden=v})),m(),Promise.all([x.from("perfis").select("id,nome,telefone,email").order("nome").limit(2e3),x.from("admins").select("user_id")]).then(([s,v])=>{if(s.error||v.error)throw s.error||v.error;const $=new Set(v.data.map(y=>y.user_id));c=s.data.filter(y=>!$.has(y.id))}).catch(()=>{f=!0}).finally(m),a.addEventListener("submit",async s=>{s.preventDefault();const v=(_,L)=>{_?.focus(),E(L,"bad")};if(!o.cabana_id.value)return v(null,"Escolha a cabana.");if(!o.checkin.value||!o.checkout.value||o.checkout.value<=o.checkin.value)return v(o.checkin,"Confira as datas de entrada e saída.");const $=o.tipo_cliente.value==="cadastrado";if($&&!b)return v(g,"Escolha o cliente cadastrado.");if(!$&&o.nome.value.trim().length<2)return v(o.nome,"Escreva o nome do cliente.");if(!$&&o.email.value.trim()&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.email.value.trim()))return v(o.email,"Confira o e-mail do cliente.");const y=Number(o.hospedes.value);if(!Number.isInteger(y)||y<1)return v(o.hospedes,"Confira o número de pessoas.");if(y>l().capacidade)return v(o.hospedes,`Esta cabana recebe até ${l().capacidade} pessoas.`);const k=o.valor.value.trim()?na(o.valor.value):void 0;if(k===null)return v(o.valor,"Valor inválido.");await N(a.querySelector(".cf-foot .btn"),async()=>{await ta("admin-reserva",{acao:"criar",cabana_id:o.cabana_id.value,checkin:o.checkin.value,checkout:o.checkout.value,hospedes:Number(o.hospedes.value),...$?{cliente_id:b.id}:{nome:o.nome.value,telefone:o.telefone.value,email:o.email.value},valor_centavos:k,confirmada:o.confirmada.checked,motivo:o.obs.value}),E("Reserva criada.","ok"),r.close(),e()})}),r.addEventListener("close",()=>r.remove()),r.showModal()}const ge=[["ocupacao","🗓️","Ocupação"],["periodos","🔒","Abrir e fechar"],["feriados","🎉","Feriados"],["regras","⚙️","Regras"]];let ga="ocupacao",$a=null;const ca=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],_a=t=>new Date(t+"T12:00:00Z").getUTCDay(),ea=t=>fa[Number(t.slice(5,7))-1].slice(0,3);function wa(t,e){const n=Number(t.slice(8)),r=Number(e.slice(8));return t===e?`${n} de ${ea(t)}.`:t.slice(0,7)===e.slice(0,7)?`${n} a ${r} de ${ea(e)}.`:`${n} de ${ea(t)}. a ${r} de ${ea(e)}.`}const oa=(t,e,n,r,a)=>`<div class="stp" data-min="${n}" data-max="${r}">
  <button type="button" data-d="-1" aria-label="Menos">−</button>
  <input type="number" name="${t}" min="${n}" max="${r}" value="${e}" inputmode="numeric">
  <button type="button" data-d="1" aria-label="Mais">+</button><small>${a}</small></div>`;async function za(t){await U(t,"adm-calendario",async()=>{const[e,n,{data:r,error:a},o]=await Promise.all([Y(!0),aa(!0),x.from("calendario").select("*").gte("fim",j()).order("inicio"),x.from("feriados").select("data,nome").gte("data",j()).order("data")]);if(a)throw a;return{cfg:e,cabs:n,periodos:r,feriados:o.error?null:o.data}},e=>{t.innerHTML=`
      <div class="cal-abas" role="tablist">${ge.map(([a,o,i])=>`<button type="button" role="tab" data-aba="${a}" class="${a===ga?"on":""}"><span>${o}</span>${i}</button>`).join("")}</div>
      <div id="cal-pane"></div>`;const n=u("#cal-pane",t),r=a=>{ga=a,t.querySelectorAll("[data-aba]").forEach(o=>o.classList.toggle("on",o.dataset.aba===a)),{ocupacao:$e,periodos:we,feriados:ye,regras:ke}[a](n,e,()=>za(t))};t.querySelectorAll("[data-aba]").forEach(a=>a.addEventListener("click",()=>r(a.dataset.aba))),r(ga)})}const Z=t=>{z("adm-calendario"),t()};function $e(t,{cabs:e,feriados:n},r){const a=e.filter(o=>o.ativa);if(!a.length){t.innerHTML='<div class="card center"><p class="muted">Cadastre uma cabana em <a href="#/admin/cabanas">Cabanas</a> para ver a ocupação.</p></div>';return}t.innerHTML='<div id="mapa"><div class="loading">Carregando…</div></div>',ja(u("#mapa",t),a,n||[],$a||j().slice(0,7),r)}async function ja(t,e,n,r,a){$a=r;const[o,i]=r.split("-").map(Number),l=`${r}-01`,d=new Date(Date.UTC(o,i,0)).getUTCDate(),c=`${r}-${String(d).padStart(2,"0")}`,f=j(),[{data:b},g]=await Promise.all([x.from("reservas").select("id,cabana_id,checkin,checkout,status,nome_cliente,codigo,hospedes").in("status",["aguardando_pagamento","em_analise","confirmada"]).lte("checkin",c).gt("checkout",l),Promise.all(e.map(S=>x.rpc("disponibilidade",{p_cabana:S.id,p_de:l,p_ate:c}).then(M=>M.data||[])))]);if(!t.isConnected||$a!==r)return;const w=Array.from({length:d},(S,M)=>`${r}-${String(M+1).padStart(2,"0")}`),q=e.map((S,M)=>w.map(A=>{const C=(b||[]).find(P=>P.cabana_id===S.id&&A>=P.checkin&&A<P.checkout);return{d:A,r:C,sit:C?C.status:g[M].find(P=>P.dia===A)?.situacao||"passado"}})),m=q.flat(),h=m.filter(S=>S.r).length,s=m.filter(S=>S.sit==="livre").length,v=m.filter(S=>S.sit==="fechado").length,$=h+s,y=$?Math.round(h/$*100):0,k=new Date(Date.UTC(o,i-2,1)).toISOString().slice(0,7),_=new Date(Date.UTC(o,i,1)).toISOString().slice(0,7),L=S=>_e(S,n);t.innerHTML=`
    <div class="occ-head">
      <button type="button" class="icon-btn" data-m="${k}" aria-label="Mês anterior">‹</button>
      <div class="occ-mes"><strong>${fa[i-1]} de ${o}</strong>${r!==f.slice(0,7)?`<button type="button" class="link-btn" data-m="${f.slice(0,7)}">voltar para hoje</button>`:""}</div>
      <button type="button" class="icon-btn" data-m="${_}" aria-label="Próximo mês">›</button>
    </div>
    <div class="occ-kpis">
      <div class="occ-kpi destaque"><b>${y}%</b><small>ocupação</small><i style="--p:${y}%"></i></div>
      <div class="occ-kpi"><b>${h}</b><small>noites reservadas</small></div>
      <div class="occ-kpi"><b>${s}</b><small>noites livres</small></div>
      <div class="occ-kpi"><b>${v}</b><small>fechadas</small></div>
    </div>
    <div class="occ-card">
      <div class="occ-wrap"><table class="occ">
        <thead><tr><th class="occ-nome"></th>${w.map(S=>{const M=_a(S);return`<th class="${M===0||M===6?"fds":""} ${S===f?"hoje":""} ${L(S)?"fer":""}" title="${p(L(S)||"")}"><small>${ca[M][0]}</small>${Number(S.slice(8))}</th>`}).join("")}</tr></thead>
        <tbody>${e.map((S,M)=>`<tr><th class="occ-nome">${p(S.nome)}</th>${q[M].map((A,C)=>{const P=A.r&&(A.d===A.r.checkin||C===0),F=A.r&&(B(A.d,1)===A.r.checkout||C===d-1);return`<td><button type="button" class="occ-c occ-${A.sit} ${P?"ini":""} ${F?"fim":""} ${A.d===f?"hoje":""}" data-c="${M}" data-i="${C}" aria-label="${p(S.nome)} ${V(A.d)}"></button></td>`}).join("")}</tr>`).join("")}</tbody></table></div>
      <div class="occ-legenda small">
        <span><i class="occ-confirmada"></i>Confirmada</span><span><i class="occ-aguardando_pagamento"></i>Aguardando Pix</span>
        <span><i class="occ-em_analise"></i>Em análise</span><span><i class="occ-livre"></i>Livre</span><span><i class="occ-fechado"></i>Fechado</span>
      </div>
    </div>
    <div id="occ-info" class="occ-info"><p class="small muted">👆 Toque num dia para ver a reserva ou para abrir e fechar a data.</p></div>`,t.querySelectorAll("[data-m]").forEach(S=>S.addEventListener("click",()=>{t.querySelector(".occ-card")?.classList.add("carregando"),ja(t,e,n,S.dataset.m,a)}));const T=u("#occ-info",t);t.querySelector(".occ").addEventListener("click",S=>{const M=S.target.closest(".occ-c");if(!M)return;t.querySelectorAll(".occ-c.sel").forEach(F=>F.classList.remove("sel")),M.classList.add("sel");const A=e[Number(M.dataset.c)],C=q[Number(M.dataset.c)][Number(M.dataset.i)],P=`<div class="occ-info-tit"><b>${p(A.nome)}</b><span>${ca[_a(C.d)]}, ${V(C.d)}${L(C.d)?` · 🎉 ${p(L(C.d))}`:""}</span></div>`;if(C.r)T.innerHTML=`${P}<div class="occ-info-res">${te(C.r.status)}
        <p><b>${p(C.r.nome_cliente)}</b> · ${C.r.hospedes} pessoa(s)</p>
        <p class="small muted">Reserva ${p(C.r.codigo)} · ${wa(C.r.checkin,B(C.r.checkout,-1))} (saída ${V(C.r.checkout)})</p>
        <a class="btn sm ghost" href="#/admin/reservas">Ver em Reservas ›</a></div>`;else if(C.sit==="livre"||C.sit==="fechado"){const F=C.sit==="livre";T.innerHTML=`${P}<p class="occ-info-sit ${C.sit}">${F?"🟢 Livre para reservar":"⚪ Fechado para reservas"}</p>
        <button type="button" class="btn sm ${F?"ghost danger":""}" id="occ-acao">${F?"🔒 Fechar este dia":"🔓 Abrir este dia"}</button>`,u("#occ-acao",T).addEventListener("click",sa=>N(sa.currentTarget,async()=>{const{error:X}=await x.from("calendario").insert({cabana_id:A.id,tipo:F?"fechado":"aberto",inicio:C.d,fim:C.d,motivo:null});if(X)throw X;E(F?"Dia fechado.":"Dia aberto.","ok"),Z(a)}))}else T.innerHTML=`${P}<p class="small muted">${C.d<f?"Data que já passou.":"Fora do prazo de reservas (veja em Regras)."}</p>`;T.scrollIntoView({block:"nearest",behavior:"smooth"})});const D=t.querySelector("thead th.hoje");D&&(t.querySelector(".occ-wrap").scrollLeft=Math.max(0,D.offsetLeft-140))}const _e=(t,e)=>e.find(n=>n.data===t)?.nome||Ta(t);function we(t,{cabs:e,periodos:n},r){const a=c=>c?e.find(f=>f.id===c)?.nome||"—":"Todas as cabanas",o=j();t.innerHTML=`
    <form id="periodo" class="cal-card stack">
      <h3>Novo período</h3>
      <div class="tipo-escolha" role="radiogroup">
        <label><input type="radio" name="tipo" value="fechado" checked><span><b>🔒 Fechar</b><small>Ninguém reserva nesses dias</small></span></label>
        <label><input type="radio" name="tipo" value="aberto"><span><b>🔓 Abrir</b><small>Libera dias que estavam fechados</small></span></label>
      </div>
      <div class="field"><span>Cabana</span>
        <div class="pills">${[["","Todas"],...e.map(c=>[c.id,c.nome])].map(([c,f],b)=>`<label class="pill"><input type="radio" name="cab" value="${c}" ${b===0?"checked":""}><span>${p(f)}</span></label>`).join("")}</div></div>
      <div class="datas-2">
        <label class="field"><span>De</span><input type="date" name="ini" required min="${o}"></label>
        <label class="field"><span>Até (inclusive)</span><input type="date" name="fim" required min="${o}"></label>
      </div>
      <p class="per-resumo small" id="per-resumo"></p>
      <label class="field"><span>Motivo <small class="muted">(opcional)</small></span><input name="motivo" maxlength="120" placeholder="Ex.: manutenção"></label>
      <div class="pills sm">${["Manutenção","Evento particular","Férias","Reforma"].map(c=>`<button type="button" class="pill-btn" data-mot="${c}">${c}</button>`).join("")}</div>
      <button class="btn block">Salvar período</button>
    </form>
    <h3 class="cal-sub">Programados <span class="seg-n">${(n||[]).length}</span></h3>
    <div class="per-lista">${(n||[]).map(c=>{const f=la(c.inicio,c.fim)+1;return`<article class="per-item ${c.tipo}" data-id="${c.id}">
        <span class="per-ico">${c.tipo==="aberto"?"🔓":"🔒"}</span>
        <div class="grow"><b>${wa(c.inicio,c.fim)}</b> <span class="small muted">· ${f} dia${f>1?"s":""}</span>
          <p class="small muted">${c.tipo==="aberto"?"Aberto":"Fechado"} · ${p(a(c.cabana_id))}${c.motivo?" · "+p(c.motivo):""}</p></div>
        <button type="button" class="icon-btn danger" data-del aria-label="Remover período" title="Remover">🗑️</button></article>`}).join("")||'<div class="cal-vazio"><span>📅</span><p class="muted small">Nenhum período programado. Todos os dias seguem as Regras.</p></div>'}</div>`;const i=u("#periodo",t),l=i.elements,d=()=>{const c=l.ini.value,f=l.fim.value,b=u("#per-resumo",t);if(c&&(!f||f<c)&&(l.fim.value=c),!l.ini.value||!l.fim.value)return b.textContent="";const g=la(l.ini.value,l.fim.value)+1,w=l.tipo.value==="fechado"?"Fecha":"Abre",q=l.cab.value?e.find(m=>m.id===l.cab.value)?.nome:"todas as cabanas";b.innerHTML=`${w} <b>${wa(l.ini.value,l.fim.value)}</b> (${g} dia${g>1?"s":""}) para <b>${p(q)}</b>.`};i.addEventListener("change",d),t.querySelectorAll("[data-mot]").forEach(c=>c.addEventListener("click",()=>{l.motivo.value=c.dataset.mot})),i.addEventListener("submit",async c=>{if(c.preventDefault(),l.fim.value<l.ini.value)return E("A data final precisa ser depois da inicial.","bad");await N(i.querySelector(".btn.block"),async()=>{const{error:f}=await x.from("calendario").insert({cabana_id:l.cab.value||null,tipo:l.tipo.value,inicio:l.ini.value,fim:l.fim.value,motivo:l.motivo.value.trim()||null});if(f)throw f;E("Período salvo.","ok"),Z(r)})}),t.querySelectorAll("[data-del]").forEach(c=>c.addEventListener("click",async()=>{await G("Remover o período?","Os dias voltam a seguir as Regras do calendário.","Remover",!0)&&await N(c,async()=>{const{error:f}=await x.from("calendario").delete().eq("id",c.closest("[data-id]").dataset.id);if(f)throw f;E("Período removido.","ok"),Z(r)})}))}function ye(t,{feriados:e},n){const r=[];for(let o=j(),i=0;i<366;i++,o=B(o,1)){const l=Ta(o);l&&r.push({data:o,nome:l})}const a=(o,i)=>`<div class="fer-item" ${i?`data-fer="${o.data}"`:""}>
    <span class="fer-data"><b>${Number(o.data.slice(8))}</b><small>${ea(o.data)}</small></span>
    <span class="grow"><b>${p(o.nome)}</b><small class="muted">${ca[_a(o.data)]} · ${o.data.slice(0,4)}</small></span>
    ${i?'<button type="button" class="icon-btn danger" data-del-fer aria-label="Remover feriado" title="Remover">🗑️</button>':""}</div>`;t.innerHTML=`
    <div class="cal-card">
      <p class="small muted">Nos feriados vale o <b>valor de feriado</b> de cada cabana (em <a href="#/admin/cabanas">Cabanas</a> › Editar). Os nacionais entram sozinhos; cadastre aqui os da cidade.</p>
      ${e===null?'<p class="warn small">Rode o arquivo supabase/007_precos_fim_semana.sql no Supabase para cadastrar feriados.</p>':`
      <form id="feriado" class="fer-form">
        <label class="field"><span>Data</span><input type="date" name="data" required min="${j()}"></label>
        <label class="field grow"><span>Nome</span><input name="nome" required minlength="2" maxlength="60" placeholder="Ex.: Aniversário da cidade"></label>
        <button class="btn">Adicionar</button>
      </form>`}
    </div>
    ${e===null?"":`<h3 class="cal-sub">Da cidade <span class="seg-n">${e.length}</span></h3>
    <div class="fer-lista">${e.map(o=>a(o,!0)).join("")||'<div class="cal-vazio"><span>🎉</span><p class="muted small">Nenhum feriado da cidade cadastrado.</p></div>'}</div>`}
    <details class="fer-nac"><summary>🇧🇷 Nacionais, entram sozinhos <span class="seg-n">${r.length}</span></summary>
      <div class="fer-lista nac">${r.map(o=>a(o,!1)).join("")}</div></details>`,u("#feriado",t)?.addEventListener("submit",async o=>{o.preventDefault();const i=o.currentTarget.elements;await N(o.currentTarget.querySelector("button"),async()=>{const{error:l}=await x.from("feriados").insert({data:i.data.value,nome:i.nome.value.trim()});if(l)throw new Error(/duplicate|unique/i.test(l.message)?"Essa data já está cadastrada.":l.message);I.feriados=null,E("Feriado adicionado.","ok"),Z(n)})}),t.querySelectorAll("[data-del-fer]").forEach(o=>o.addEventListener("click",async()=>{await G("Remover o feriado?","Essa data volta a ser cobrada como um dia comum.","Remover",!0)&&await N(o,async()=>{const{error:i}=await x.from("feriados").delete().eq("data",o.closest("[data-fer]").dataset.fer);if(i)throw i;I.feriados=null,Z(n)})}))}function ke(t,{cfg:e},n){t.innerHTML=`
    <form id="regras" class="stack">
      <section class="cal-card stack">
        <h3>Como o calendário funciona</h3>
        <div class="tipo-escolha col" role="radiogroup">
          <label><input type="radio" name="modo" value="aberto" ${e.modo_calendario!=="fechado"?"checked":""}><span><b>✅ Sempre aberto</b><small>Todos os dias da semana marcados abaixo ficam livres. Você fecha só as exceções em "Abrir e fechar".</small></span></label>
          <label><input type="radio" name="modo" value="fechado" ${e.modo_calendario==="fechado"?"checked":""}><span><b>🔐 Só quando eu abrir</b><small>Tudo fica fechado; só os períodos que você abrir podem ser reservados.</small></span></label>
        </div>
        <div class="field" id="dows"><span>Dias da semana em que a diária pode começar</span>
          <div class="dow-pills">${ca.map((i,l)=>`<label><input type="checkbox" name="dow" value="${l}" ${e.dias_semana.includes(l)?"checked":""}><span>${i}</span></label>`).join("")}</div></div>
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
    </form>`;const r=u("#regras",t),a=r.elements,o=()=>u("#dows",t).classList.toggle("apagado",a.modo.value==="fechado");r.addEventListener("change",o),o(),t.querySelectorAll(".stp [data-d]").forEach(i=>i.addEventListener("click",()=>{const l=i.closest(".stp"),d=u("input",l);d.value=Math.min(Number(l.dataset.max),Math.max(Number(l.dataset.min),(Number(d.value)||0)+Number(i.dataset.d)))})),r.addEventListener("submit",async i=>{i.preventDefault();const l=Number(a.min.value),d=Number(a.max.value),c=Number(a.ante.value);if(!(l>=1&&l<=30)||!(d>=1&&d<=90)||!(c>=7&&c<=730))return E("Confira os números da estadia.","bad");if(d<l)return E("O máximo precisa ser maior ou igual ao mínimo.","bad");const f=ma('input[name="dow"]:checked',r).map(b=>Number(b.value));if(a.modo.value==="aberto"&&!f.length)return E("Marque pelo menos um dia da semana.","bad");await N(r.querySelector(".btn.block"),async()=>{const{error:b}=await x.from("configuracoes").update({modo_calendario:a.modo.value,dias_semana:f,min_diarias:l,max_diarias:d,antecedencia_max_dias:c,checkin_hora:a.cin.value,checkout_hora:a.cout.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(b)throw b;await Y(!0),E("Regras salvas.","ok"),Z(n)})})}async function Ia(t,e,n=()=>{}){const r=[];let a=0;for(const o of t){n(`Reduzindo e enviando ${++a} de ${t.length}…`);const{big:i,mini:l}=await Xa(o),d=crypto.randomUUID(),c=`fotos/${d}.${Ca(i)}`,f=`fotos/${d}-mini.${Ca(l)}`,b=await x.storage.from("fotos").upload(c,i,{contentType:i.type});if(b.error)throw b.error;const g=await x.storage.from("fotos").upload(f,l,{contentType:l.type});if(g.error)throw g.error;const{data:w,error:q}=await x.from("fotos").insert({path:c,mini_path:f,...e}).select("*").single();if(q)throw q;r.push(w)}return n(""),I.fotos=null,z("adm-cabanas"),z("adm-fotos"),r}async function K(t){const{error:e}=await x.rpc("definir_foto_principal",{p_foto:t});if(e)throw/definir_foto_principal|function/i.test(e.message)?new Error("Rode o arquivo supabase/003_foto_principal.sql no Supabase para usar a foto principal."):e;I.fotos=null,z("adm-cabanas"),z("adm-fotos")}async function da(t){await U(t,"adm-cabanas",async()=>{const[e,n]=await Promise.all([aa(!0),pa(!0)]);return{cabs:e,todas:n}},({cabs:e,todas:n})=>{const r=a=>{const o=n.filter(i=>i.cabana_id===a.id).sort((i,l)=>(l.principal===!0)-(i.principal===!0)||i.ordem-l.ordem)[0];return o?`<img src="${p(Q("fotos",o.mini_path))}" alt="">`:'<span class="cab-sem-foto">Sem foto</span>'};t.innerHTML=`
    ${Aa("add","Nova cabana")}
    <div class="list-cards cab-lista">${e.map(a=>`<article class="card cab-adm" data-id="${a.id}">
      <div class="cab-adm-capa">${r(a)}</div>
      <div class="grow">
        <div class="row between"><h3>${p(a.nome)}</h3>${a.ativa?'<span class="badge ok">Ativa</span>':'<span class="badge muted">Desativada</span>'}</div>
        <p class="small">Até ${a.capacidade} pessoas · ${R(a.preco_diaria_centavos)} a diária</p>
        ${[a.preco_fim_semana_centavos!=null?`Sex a dom ${R(a.preco_fim_semana_centavos)}`:"",a.preco_feriado_centavos!=null?`Feriado ${R(a.preco_feriado_centavos)}`:""].filter(Boolean).map(o=>`<span class="badge">${o}</span>`).join(" ")}
        <p class="small muted">📷 ${n.filter(o=>o.cabana_id===a.id).length} foto(s)</p>
        <button class="btn sm ghost" data-edit>Editar dados e fotos</button>
      </div></article>`).join("")||'<p class="muted">Toque no + para cadastrar a primeira cabana.</p>'}</div>`,u("#add").addEventListener("click",()=>ya(null,t)),t.querySelectorAll("[data-edit]").forEach(a=>a.addEventListener("click",()=>ya(e.find(o=>o.id===a.closest("[data-id]").dataset.id),t)))})}function ya(t,e){const n=document.createElement("dialog");n.className="dialog cab-form";const r=b=>b==null?"":(b/100).toFixed(2).replace(".",","),a=t?.capacidade??2,o=t?.descricao||"";n.innerHTML=`<form class="cf" novalidate>
    <header class="cf-head">
      <button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button>
      <h3>${t?"Editar cabana":"Nova cabana"}</h3>
      <span></span>
    </header>
    <div class="cf-body">
      <section class="cf-card">
        <h4><span class="cf-ico">🏡</span> Sobre a cabana</h4>
        <label class="field"><span>Nome</span><input name="nome" required minlength="2" maxlength="60" value="${p(t?.nome)}" placeholder="Ex.: Cabana do Lago" autocomplete="off"></label>
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
            <div class="cf-money"><i>R$</i><input name="preco" required inputmode="decimal" placeholder="0,00" value="${r(t?.preco_diaria_centavos)}"></div></label>
          <label class="cf-preco"><span>Sexta a domingo</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fds" inputmode="decimal" placeholder="Igual ao normal" value="${r(t?.preco_fim_semana_centavos)}"></div></label>
          <label class="cf-preco"><span>Feriados</span><small>Opcional</small>
            <div class="cf-money"><i>R$</i><input name="preco_fer" inputmode="decimal" placeholder="Igual a sex a dom" value="${r(t?.preco_feriado_centavos)}"></div></label>
        </div>
        <p class="cf-sim small" id="cf-sim"></p>
        <p class="small muted">Feriados nacionais entram sozinhos (inclusive Carnaval e Corpus Christi). Os da cidade você cadastra em <a href="#/admin/calendario">Calendário</a>. Um feriado usa o valor de feriado; em branco, o de sexta a domingo.</p>
      </section>

      <section class="cf-card">
        <h4><span class="cf-ico">👁️</span> Exibição</h4>
        <label class="cf-switch"><span><b>Ativa</b><small>Aparece para os clientes e pode ser reservada</small></span>
          <input type="checkbox" name="ativa" ${t?.ativa!==!1?"checked":""}><i></i></label>
        <label class="field cf-ordem"><span>Posição na lista</span><input type="number" name="ordem" value="${t?.ordem??0}"><small class="muted">As de número menor aparecem primeiro.</small></label>
      </section>

      ${t?`<section class="cf-card cab-fotos">
        <h4><span class="cf-ico">📷</span> Fotos da cabana</h4>
        <p class="small muted">A foto com ⭐ é a <strong>principal</strong>: aparece no carrossel do início e como capa da cabana. As outras ficam na página da cabana.</p>
        <div class="cab-fotos-grid" id="cab-fotos"><div class="loading">Carregando…</div></div>
        <label class="btn ghost sm">📷 Adicionar fotos<input type="file" accept="image/*" multiple hidden id="cab-up"></label>
        <p class="small muted" id="cab-prog"></p>
      </section>
      <button type="button" class="cf-del" data-del>🗑️ Excluir cabana</button>`:'<p class="small muted center">Depois de salvar, você já adiciona as fotos da cabana.</p>'}
    </div>
    <footer class="cf-foot"><button class="btn block">${t?"Salvar alterações":"Salvar e adicionar fotos"}</button></footer>
  </form>`,document.body.appendChild(n);const i=u("form",n),l=i.elements;u("[data-close]",n).onclick=()=>n.close(),t&&xe(t,n),l.descricao.addEventListener("input",()=>u(".cf-count b",n).textContent=l.descricao.value.length);const d=u(".cf-stepper output",n);n.querySelectorAll("[data-step]").forEach(b=>b.addEventListener("click",()=>{const g=Math.min(50,Math.max(1,Number(l.capacidade.value)+Number(b.dataset.step)));l.capacidade.value=g,d.innerHTML=`<b>${g}</b> ${g===1?"pessoa":"pessoas"}`}));const c=b=>b.trim()?na(b)??void 0:null,f=()=>{const b=na(l.preco.value),g=u("#cf-sim",n);if(b===null)return g.textContent="";const w=c(l.preco_fds.value),q=c(l.preco_fer.value),m=w??b;g.innerHTML=`<b>Exemplo:</b> quinta a sábado (2 diárias) = ${R(b)} + ${R(m)} = <b>${R(b+m)}</b>`+(q!=null?` · uma diária de feriado = <b>${R(q)}</b>`:"")};["preco","preco_fds","preco_fer"].forEach(b=>l[b].addEventListener("input",f)),f(),i.addEventListener("submit",async b=>{b.preventDefault();const g=(s,v)=>{s.focus(),E(v,"bad")};if(l.nome.value.trim().length<2)return g(l.nome,"Escreva o nome da cabana.");const w=na(l.preco.value);if(w===null)return g(l.preco,"Valor da diária inválido.");const q=c(l.preco_fds.value);if(q===void 0)return g(l.preco_fds,"Valor de sexta a domingo inválido.");const m=c(l.preco_fer.value);if(m===void 0)return g(l.preco_fer,"Valor de feriado inválido.");const h={nome:l.nome.value.trim(),descricao:l.descricao.value.trim()||null,capacidade:Number(l.capacidade.value),preco_diaria_centavos:w,ordem:Number(l.ordem.value)||0,ativa:l.ativa.checked};(q!==null||t?.preco_fim_semana_centavos!=null)&&(h.preco_fim_semana_centavos=q),(m!==null||t?.preco_feriado_centavos!=null)&&(h.preco_feriado_centavos=m),await N(i.querySelector(".cf-foot .btn"),async()=>{const{data:s,error:v}=t?await x.from("cabanas").update(h).eq("id",t.id).select("*").single():await x.from("cabanas").insert(h).select("*").single();if(v)throw/preco_fim_semana|preco_feriado/.test(v.message)?new Error("Rode o arquivo supabase/007_precos_fim_semana.sql no Supabase para usar os valores de fim de semana e feriado."):v;I.cabanas=null,z("vitrine"),n.close(),z("adm-cabanas"),da(e),t?E("Cabana salva.","ok"):(E("Cabana criada! Agora adicione as fotos.","ok"),ya(s,e))})}),u("[data-del]",n)?.addEventListener("click",async()=>{if(!await G("Excluir a cabana?","Cabanas com reservas não podem ser excluídas: nesse caso, desative.","Excluir",!0))return;const{error:b}=await x.from("cabanas").delete().eq("id",t.id);if(b)return E(/foreign|violates/i.test(b.message)?'Esta cabana tem reservas. Desligue "Ativa" em vez de excluir.':b.message,"bad");n.close(),z("adm-cabanas"),da(e)}),n.addEventListener("close",()=>{n.remove(),t&&da(e)}),n.showModal()}async function xe(t,e){const n=u("#cab-fotos",e),r=async()=>{const o=(await pa(!0)).filter(i=>i.cabana_id===t.id).sort((i,l)=>(l.principal===!0)-(i.principal===!0)||i.ordem-l.ordem);return n.innerHTML=o.length?o.map(i=>`<div class="cab-foto ${i.principal?"principal":""}" data-id="${i.id}">
          <img src="${p(Q("fotos",i.mini_path))}" alt="">
          <button type="button" class="cf-star" data-star title="${i.principal?"Foto principal":"Tornar principal"}" aria-label="Tornar principal">${i.principal?"⭐":"☆"}</button>
          <button type="button" class="cf-del" data-del-foto title="Apagar" aria-label="Apagar foto">✕</button>
        </div>`).join(""):'<p class="small muted">Nenhuma foto ainda.</p>',o};let a=await r();n.addEventListener("click",async o=>{const i=o.target.closest(".cab-foto");if(!i)return;const l=a.find(d=>d.id===i.dataset.id);if(o.target.closest("[data-star]")&&!l.principal)try{await K(l.id),E("Foto principal escolhida.","ok"),a=await r()}catch(d){O(d)}if(o.target.closest("[data-del-foto]")){if(!await G("Apagar esta foto?","","Apagar",!0))return;const{error:d}=await x.from("fotos").delete().eq("id",l.id);if(d)return O(d);await x.storage.from("fotos").remove([l.path,l.mini_path]),I.fotos=null,z("adm-cabanas"),z("adm-fotos"),a=await r(),l.principal&&a[0]&&await K(a[0].id).catch(()=>{}),a=await r()}}),u("#cab-up",e).addEventListener("change",async o=>{const i=[...o.target.files];if(o.target.value="",!i.length)return;const l=o.target.closest("label");l.classList.add("busy");try{const d=!a.some(f=>f.principal),c=await Ia(i,{cabana_id:t.id,na_galeria:!0,no_carrossel:!1,ordem:a.length},f=>u("#cab-prog",e).textContent=f);d&&c[0]&&await K(c[0].id).catch(()=>{}),E(`${c.length} foto(s) adicionada(s).`,"ok"),a=await r()}catch(d){O(d)}finally{l.classList.remove("busy")}})}let H="todas";const qe=(t,e)=>e.filter(n=>n.cabana_id===t.id).sort((n,r)=>(r.principal===!0)-(n.principal===!0)||n.ordem-r.ordem)[0];async function Ee(t){let e=[],n=[];const r=()=>{I.fotos=null,z("adm-cabanas"),z("adm-fotos"),z("vitrine")},a=d=>d?n.find(c=>c.id===d)?.nome||"Cabana":"Geral",o=()=>{const c=[...n.filter(m=>m.ativa).map(m=>qe(m,e)).filter(Boolean),...e.filter(m=>m.no_carrossel&&!m.cabana_id)],f=[["todas","📸 Todas",e.length],["carrossel","🎠 Carrossel",c.length],["galeria","🖼️ Galeria",e.filter(m=>m.na_galeria).length],["gerais","🏞️ Gerais",e.filter(m=>!m.cabana_id).length],...n.map(m=>[m.id,`🏡 ${m.nome}`,e.filter(h=>h.cabana_id===m.id).length])];f.some(([m])=>m===H)||(H="todas");const b=new Set(c.map(m=>m.id)),g=e.filter(m=>H==="todas"?!0:H==="carrossel"?b.has(m.id):H==="galeria"?m.na_galeria:H==="gerais"?!m.cabana_id:m.cabana_id===H);H==="carrossel"&&g.sort((m,h)=>c.indexOf(m)-c.indexOf(h)),t.innerHTML=`
      <section class="fa-car">
        <div class="fa-car-head"><h3>🎠 Carrossel do Início</h3><span class="seg-n">${c.length}</span></div>
        ${c.length?`<div class="fa-car-strip">${c.map((m,h)=>`<button type="button" class="fa-car-item" data-edit="${m.id}">
            <img src="${p(Q("fotos",m.mini_path))}" alt="" loading="lazy"><b>${h+1}</b><small>${p(a(m.cabana_id))}</small></button>`).join("")}</div>`:'<p class="small muted">Nenhuma foto no carrossel ainda.</p>'}
        <p class="small muted fa-car-dica">Entram a foto <b>⭐ principal</b> de cada cabana e as fotos gerais com <b>🎠</b> ligado.</p>
      </section>
      <label class="fa-drop" id="drop">
        <input type="file" id="fa-files" accept="image/*" multiple hidden>
        <span class="fa-drop-ico">📷</span><b>Adicionar fotos</b>
        <small>Toque para escolher (pode ser várias). Elas são reduzidas no aparelho antes de enviar.</small>
      </label>
      <div class="ar-filtros fa-filtros" role="tablist">${f.map(([m,h,s])=>`<button type="button" data-f="${m}" class="${m===H?"on":""}">${p(h)}<b class="ar-n">${s||""}</b></button>`).join("")}</div>
      ${g.length?`<div class="fa-grid">${g.map(m=>{const h=b.has(m.id);return`<article class="fa-tile ${!h&&!m.na_galeria?"oculta":""}" data-id="${m.id}">
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
        </article>`}).join("")}</div>`:'<div class="ar-vazio"><span>🖼️</span><h3>Nenhuma foto aqui</h3><p class="muted small">Toque em "Adicionar fotos" para enviar.</p></div>'}`,t.querySelectorAll("[data-f]").forEach(m=>m.addEventListener("click",()=>{H=m.dataset.f,o(),t.querySelector(".fa-filtros .on")?.scrollIntoView({block:"nearest",inline:"center"})})),t.querySelectorAll("[data-edit]").forEach(m=>m.addEventListener("click",()=>l(e.find(h=>h.id===m.dataset.edit))));const w=u("#fa-files",t);w.addEventListener("change",()=>{w.files.length&&i([...w.files]),w.value=""});const q=u("#drop",t);q.addEventListener("dragover",m=>{m.preventDefault(),q.classList.add("sobre")}),q.addEventListener("dragleave",()=>q.classList.remove("sobre")),q.addEventListener("drop",m=>{m.preventDefault(),q.classList.remove("sobre");const h=[...m.dataTransfer.files].filter(s=>s.type.startsWith("image/"));h.length&&i(h)}),t.querySelectorAll(".fa-quick button").forEach(m=>m.addEventListener("click",async()=>{const h=e.find(s=>s.id===m.closest("[data-id]").dataset.id);await N(m,async()=>{if(m.hasAttribute("data-star")){if(h.principal)return E("Esta já é a foto principal. Escolha outra foto da cabana para trocar.");await K(h.id),e.forEach(s=>{s.cabana_id===h.cabana_id&&(s.principal=s.id===h.id)}),E(`Foto principal da ${a(h.cabana_id)} trocada.`,"ok")}else{const s=m.dataset.t,{error:v}=await x.from("fotos").update({[s]:!h[s]}).eq("id",h.id);if(v)throw v;h[s]=!h[s],E(s==="no_carrossel"?h[s]?"Foi para o carrossel.":"Saiu do carrossel.":h[s]?"Aparece na galeria.":"Saiu da galeria.","ok")}r(),o()})}))},i=d=>{const c=d.map(h=>URL.createObjectURL(h)),f=document.createElement("dialog");f.className="sheet";const b=n.some(h=>h.id===H)?H:"";f.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Enviar ${d.length} ${d.length===1?"foto":"fotos"}</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <div class="fa-prev">${c.map(h=>`<img src="${h}" alt="">`).join("")}</div>
      <form class="stack" id="fa-up">
        <div class="field"><span>De onde são as fotos?</span>
          <div class="pills">${[["","🏞️ Geral"],...n.map(h=>[h.id,`🏡 ${h.nome}`])].map(([h,s])=>`<label class="pill"><input type="radio" name="cab" value="${h}" ${h===b?"checked":""}><span>${p(s)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="sw-car"><span><b>🎠 Carrossel do Início</b><small>Só para fotos gerais (das cabanas vai a ⭐ principal)</small></span><input type="checkbox" name="car" checked><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" checked><i></i></label>
        <div class="fa-prog" hidden><i></i><span></span></div>
        <button class="btn block">Enviar ${d.length===1?"foto":"fotos"}</button>
      </form>`,document.body.appendChild(f);const g=u("#fa-up",f),w=g.elements,q=()=>{u("#sw-car",f).hidden=!!w.cab.value};g.addEventListener("change",q),q();let m=!1;f.addEventListener("cancel",h=>m&&h.preventDefault()),f.addEventListener("click",h=>{!m&&(h.target===f||h.target.closest("[data-fechar]"))&&f.close()}),f.addEventListener("close",()=>{c.forEach(h=>URL.revokeObjectURL(h)),f.remove()}),g.addEventListener("submit",async h=>{h.preventDefault();const s=u(".fa-prog",f);m=!0,s.hidden=!1;try{await N(g.querySelector(".btn"),async()=>{const v=w.cab.value||null,$=v&&!e.some(_=>_.cabana_id===v&&_.principal);let y=0;const k=await Ia(d,{cabana_id:v,no_carrossel:!v&&w.car.checked,na_galeria:w.gal.checked},_=>{_&&y++,u("span",s).textContent=_||"Pronto!",u("i",s).style.width=`${Math.round((_?y-1:d.length)/d.length*100)}%`});$&&k[0]&&(await K(k[0].id).catch(()=>{}),k[0].principal=!0),e=[...k,...e],r(),E(`${k.length} ${k.length===1?"foto enviada":"fotos enviadas"}.`,"ok"),m=!1,f.close(),o()})}finally{m=!1}}),f.showModal()},l=d=>{if(!d)return;const c=document.createElement("dialog");c.className="sheet",c.innerHTML=`
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head"><h3>Editar foto</h3><button type="button" class="icon-btn" data-fechar aria-label="Fechar">✕</button></div>
      <button type="button" class="fa-grande" data-zoom><img src="${p(Q("fotos",d.path))}" alt=""><span>🔍 Ver grande</span></button>
      <form class="stack" id="fa-ed">
        <label class="field"><span>Legenda</span><input name="legenda" maxlength="200" value="${p(d.legenda)}" placeholder="Ex.: Vista da varanda ao pôr do sol"></label>
        <div class="field"><span>De onde é a foto?</span>
          <div class="pills">${[["","🏞️ Geral"],...n.map(w=>[w.id,`🏡 ${w.nome}`])].map(([w,q])=>`<label class="pill"><input type="radio" name="cab" value="${w}" ${(d.cabana_id||"")===w?"checked":""}><span>${p(q)}</span></label>`).join("")}</div></div>
        <label class="cf-switch" id="ed-car"><span><b>🎠 Carrossel do Início</b><small>Foto geral no carrossel</small></span><input type="checkbox" name="car" ${d.no_carrossel?"checked":""}><i></i></label>
        <label class="cf-switch" id="ed-pri"><span><b>⭐ Foto principal da cabana</b><small>Capa da cabana e foto dela no carrossel</small></span><input type="checkbox" name="pri" ${d.principal?"checked":""}><i></i></label>
        <label class="cf-switch"><span><b>🖼️ Galeria</b><small>Aparece na aba Galeria</small></span><input type="checkbox" name="gal" ${d.na_galeria?"checked":""}><i></i></label>
        <div class="regra-linha"><span><b>Posição</b><small>Menor aparece primeiro</small></span>${oa("ordem",d.ordem,-999,999,"")}</div>
        <button class="btn block">Salvar</button>
        <button type="button" class="cf-del" data-apagar>🗑️ Apagar foto</button>
      </form>`,document.body.appendChild(c);const f=u("#fa-ed",c),b=f.elements,g=()=>{u("#ed-car",c).hidden=!!b.cab.value,u("#ed-pri",c).hidden=!b.cab.value};f.addEventListener("change",g),g(),c.querySelectorAll(".stp [data-d]").forEach(w=>w.addEventListener("click",()=>{const q=u("input",w.closest(".stp"));q.value=Math.min(999,Math.max(-999,(Number(q.value)||0)+Number(w.dataset.d)))})),c.addEventListener("click",w=>{(w.target===c||w.target.closest("[data-fechar]"))&&c.close()}),c.addEventListener("close",()=>c.remove()),u("[data-zoom]",c).addEventListener("click",()=>Sa([Q("fotos",d.path)])),f.addEventListener("submit",async w=>{w.preventDefault(),await N(f.querySelector(".btn.block"),async()=>{const q=b.cab.value||null,m={legenda:b.legenda.value.trim()||null,cabana_id:q,na_galeria:b.gal.checked,no_carrossel:!q&&b.car.checked,ordem:Number(b.ordem.value)||0},{error:h}=await x.from("fotos").update(m).eq("id",d.id);if(h)throw h;Object.assign(d,m,q!==(e.find(s=>s.id===d.id)?.cabana_id??null)?{principal:!1}:{}),q&&b.pri.checked&&!d.principal&&(await K(d.id),e.forEach(s=>{s.cabana_id===q&&(s.principal=s.id===d.id)})),q||(d.principal=!1),e.sort((s,v)=>s.ordem-v.ordem),r(),E("Foto salva.","ok"),c.close(),o()})}),u("[data-apagar]",c).addEventListener("click",async()=>{if(!await G("Apagar esta foto?","Ela sai do app para todos. Não dá para desfazer.","Apagar",!0))return;const{error:w}=await x.from("fotos").delete().eq("id",d.id);if(w)return O(w);await x.storage.from("fotos").remove([d.path,d.mini_path]),e=e.filter(q=>q.id!==d.id),r(),E("Foto apagada.","ok"),c.close(),o()}),c.showModal()};await U(t,"adm-fotos",async()=>{const[d,c]=await Promise.all([pa(!0),aa(!0)]);return{lista:d,cabs:c}},d=>{e=d.lista.map(c=>({...c})),n=d.cabs,o()})}async function Le(t){await U(t,"adm-clientes",async()=>{const{data:e,error:n}=await x.from("perfis").select("*").order("nome").limit(2e3);if(n)throw n;return e},e=>{t.innerHTML=`
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, região"><button class="btn sm ghost" id="csv">Baixar planilha</button></div>
    <p class="small muted gap-top">${e.length} cliente(s) · ${e.filter(a=>a.receber_email).length} querem novidades por e-mail · ${e.filter(a=>a.receber_push).length} por notificação</p>
    <div id="lista" class="list-cards"></div>`;const n=()=>{const a=u("#busca").value.trim().toLowerCase(),o=e.filter(i=>!a||[i.nome,i.telefone,i.regiao,i.email].some(l=>String(l??"").toLowerCase().includes(a)));u("#lista").innerHTML=o.slice(0,300).map(i=>`<article class="card row gap">
      <span class="avatar" ${i.foto_path?`data-avatar-path="${p(i.foto_path)}"`:""}>${p(La(i.nome))}</span>
      <span><strong>${p(i.nome)}</strong><br><span class="small"><a href="${Ma(i.telefone)}" target="_blank" rel="noopener noreferrer">${p(J(i.telefone))}</a> · ${p(i.email||"")}${i.regiao?" · "+p(i.regiao):""}</span>
      <br><span class="small muted">Desde ${V(i.criado_em)}${i.receber_email?" · ✉️ novidades":""}${i.receber_push?" · 🔔 novidades":""}</span></span></article>`).join(""),r()},r=async()=>{for(const a of ma("#lista [data-avatar-path]")){const o=await Ga(a.dataset.avatarPath);o&&a.isConnected&&(a.innerHTML=`<img src="${p(o)}" alt="">`)}};u("#busca").addEventListener("input",n),u("#csv").addEventListener("click",()=>ha("clientes.csv",va([["Nome","E-mail","Celular","Região","Novidades por e-mail","Novidades por notificação","Cadastro"],...e.map(a=>[a.nome,a.email,J(a.telefone),a.regiao,a.receber_email?"sim":"não",a.receber_push?"sim":"não",V(a.criado_em)])]))),n()})}async function Ce(t){const e=j();t.innerHTML=`
    <form id="per" class="row wrap gap">
      <label class="field"><span>De</span><input type="date" name="de" value="${e.slice(0,7)}-01"></label>
      <label class="field"><span>Até</span><input type="date" name="ate" value="${B(B(e.slice(0,7)+"-01",32).slice(0,7)+"-01",-1)}"></label>
      <button class="btn sm">Ver</button>
    </form>
    <div class="row wrap gap"><button class="chip" data-p="mes">Este mês</button><button class="chip" data-p="ano">Este ano</button><button class="chip" data-p="12">Últimos 12 meses</button></div>
    <div id="rel" class="gap-top"></div>`;const n=u("#per"),r=async()=>{const a=n.elements.de.value,o=n.elements.ate.value,{data:i,error:l}=await x.rpc("relatorio_reservas",{p_de:a,p_ate:o});if(l)return O(l);const d=i.por_situacao||{};u("#rel").innerHTML=`
      <div class="kpis">
        <div class="kpi"><span>Receita confirmada</span><strong>${R(i.receita_centavos)}</strong></div>
        <div class="kpi"><span>Reservas confirmadas</span><strong>${d.confirmada||0}</strong></div>
        <div class="kpi"><span>Diárias vendidas</span><strong>${i.diarias}</strong></div>
        <div class="kpi"><span>Hóspedes</span><strong>${i.hospedes}</strong></div>
        <div class="kpi"><span>Faltam validar</span><strong>${i.nao_validadas}</strong></div>
        <div class="kpi"><span>Todas as reservas</span><strong>${i.total}</strong></div>
      </div>
      <h3 class="section-title">Por cabana</h3>
      <div class="table-wrap"><table class="table"><thead><tr><th>Cabana</th><th>Reservas</th><th>Noites</th><th>Ocupação</th><th>Receita</th></tr></thead>
      <tbody>${i.por_cabana.map(c=>`<tr><td>${p(c.cabana)}</td><td>${c.reservas}</td><td>${c.noites_ocupadas}</td><td><span class="bar"><i style="width:${Math.min(100,Number(c.ocupacao)||0)}%"></i></span> ${c.ocupacao}%</td><td>${R(c.receita_centavos)}</td></tr>`).join("")}</tbody></table></div>
      <h3 class="section-title">Por mês (entrada)</h3>
      <table class="table"><thead><tr><th>Mês</th><th>Reservas</th><th>Receita</th></tr></thead>
      <tbody>${i.por_mes.map(c=>`<tr><td>${p(c.mes.split("-").reverse().join("/"))}</td><td>${c.reservas}</td><td>${R(c.receita_centavos)}</td></tr>`).join("")||'<tr><td colspan="3" class="muted">Sem dados</td></tr>'}</tbody></table>
      <div class="row wrap gap">
        <div class="grow"><h3 class="section-title">Situação</h3><table class="table"><tbody>${Object.entries(d).map(([c,f])=>`<tr><td>${p(ra[c]?.label||c)}</td><td>${f}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Origem</h3><table class="table"><tbody>${Object.entries(i.por_origem||{}).map(([c,f])=>`<tr><td>${p(Ea[c]||c)}</td><td>${f}</td></tr>`).join("")}</tbody></table></div>
        <div class="grow"><h3 class="section-title">Região dos hóspedes</h3><table class="table"><tbody>${i.por_regiao.map(c=>`<tr><td>${p(c.regiao)}</td><td>${c.reservas}</td></tr>`).join("")}</tbody></table></div>
      </div>
      <button class="btn ghost" id="csv">Baixar planilha das reservas do período</button>`,u("#csv").addEventListener("click",async()=>{const c=await aa(),{data:f,error:b}=await x.from("reservas").select("*").lte("checkin",o).gt("checkout",a).order("checkin").limit(5e3);if(b)return O(b);ha(`reservas-${a}-a-${o}.csv`,va([["Código","Cabana","Cliente","Celular","E-mail","Região","Entrada","Saída","Diárias","Pessoas","Valor","Situação","Validada","Origem","Criada em"],...f.map(g=>[g.codigo,c.find(w=>w.id===g.cabana_id)?.nome,g.nome_cliente,J(g.telefone_cliente),g.email_cliente,g.regiao_cliente,V(g.checkin),V(g.checkout),g.diarias,g.hospedes,(g.valor_centavos/100).toFixed(2).replace(".",","),ra[g.status]?.label,g.validada?"sim":"não",Ea[g.origem],W(g.criado_em)])]))})};n.addEventListener("submit",a=>{a.preventDefault(),r()}),t.querySelectorAll("[data-p]").forEach(a=>a.addEventListener("click",()=>{const o=a.dataset.p;o==="mes"&&(n.elements.de.value=e.slice(0,7)+"-01"),o==="ano"&&(n.elements.de.value=e.slice(0,4)+"-01-01"),o==="12"&&(n.elements.de.value=B(e,-365)),n.elements.ate.value=o==="ano"?e.slice(0,4)+"-12-31":o==="12"?e:n.elements.ate.value,r()})),r()}async function Se(t){await U(t,"adm-historico",async()=>{const{data:e,error:n}=await x.from("historico_hospedes").select("*").order("checkin",{ascending:!1}).limit(1e4);if(n)throw n;return e},e=>{const n=j();t.innerHTML=`
    <p class="small muted">Registro permanente de todas as hospedagens confirmadas. Ele não é apagado por nada: nem pela limpeza das conversas, nem pela exclusão da conta do cliente.</p>
    <div class="row wrap gap"><input type="search" id="busca" placeholder="Buscar nome, telefone, cabana"><button class="btn sm ghost" id="csv">Baixar planilha completa</button></div>
    <p class="small gap-top">${e.length} hospedagem(ns) · ${new Set(e.map(a=>a.telefone||a.email||a.nome)).size} cliente(s)</p>
    <div class="table-wrap"><table class="table" id="tab"></table></div>`;const r=()=>{const a=u("#busca").value.trim().toLowerCase(),o=e.filter(i=>!a||[i.nome,i.telefone,i.email,i.cabana,i.regiao,i.codigo].some(l=>String(l??"").toLowerCase().includes(a)));u("#tab").innerHTML=`<thead><tr><th>Entrada</th><th>Saída</th><th>Hóspede</th><th>Contato</th><th>Cabana</th><th>Pessoas</th><th>Valor</th><th>Situação</th></tr></thead>
      <tbody>${o.slice(0,500).map(i=>`<tr><td>${V(i.checkin)}</td><td>${V(i.checkout)}</td><td>${p(i.nome)}${i.regiao?`<br><span class="muted small">${p(i.regiao)}</span>`:""}</td>
      <td class="small">${p(J(i.telefone))}<br>${p(i.email||"")}</td><td>${p(i.cabana)}</td><td>${i.hospedes}</td><td>${R(i.valor_centavos)}</td>
      <td>${i.situacao==="confirmada"?i.checkout<=n?'<span class="badge ok">Hospedou</span>':'<span class="badge info">Futura</span>':`<span class="badge muted">${p(ra[i.situacao]?.label||i.situacao)}</span>`}</td></tr>`).join("")}</tbody>`};u("#busca").addEventListener("input",r),u("#csv").addEventListener("click",()=>ha("historico-de-hospedes.csv",va([["Código","Entrada","Saída","Diárias","Hóspede","Celular","E-mail","Região","Cabana","Pessoas","Valor","Situação","Confirmada em"],...e.map(a=>[a.codigo,V(a.checkin),V(a.checkout),a.diarias,a.nome,J(a.telefone),a.email,a.regiao,a.cabana,a.hospedes,(a.valor_centavos/100).toFixed(2).replace(".",","),a.situacao,W(a.confirmada_em)])]))),r()})}async function Ra(){const{data:t,error:e}=await x.from("configuracoes_privadas").select("*").eq("id",1).single();if(e)throw e;return t}async function Ae(t){await U(t,"adm-privadas",Ra,e=>{t.innerHTML=`
    <form id="f" class="stack">
      <p class="small muted">Escreva tudo o que o atendente virtual (IA do Google) deve saber para responder aos clientes: regras da casa, o que está incluso, como chegar, animais, crianças, cancelamento, horários, valores extras… As cabanas, preços, disponibilidade e horários de entrada e saída já são enviados automaticamente.</p>
      <label class="field"><span>Informações para a IA</span><textarea name="prompt" rows="16" maxlength="12000">${p(e.prompt_ia)}</textarea></label>
      <p class="small muted"><span id="cont"></span> / 12000 caracteres</p>
      <button class="btn">Salvar</button>
    </form>
    <form id="horario" class="cal-card stack gap-top">
      <h3>🙋 Quando o cliente chama a equipe</h3>
      <p class="small muted">No chat, o cliente toca em 🙋 (ou pede à IA) para falar com uma pessoa. Todos os administradores recebem notificação e e-mail; se ninguém responder em 15 minutos, chega um lembrete. Enquanto a equipe atende, a IA fica pausada; ela volta quando você toca em "Encerrar" ou depois de 24 h sem mensagens.</p>
      <label class="cf-switch"><span><b>A equipe atende a qualquer hora</b><small>Desligue para definir um horário: fora dele o cliente é avisado e a notificação chega quando a equipe começar.</small></span><input type="checkbox" name="sempre" ${I.config?.equipe_inicio&&I.config?.equipe_fim?"":"checked"}><i></i></label>
      <div class="datas-2" id="horas">
        <label class="field"><span>Das</span><input type="time" name="ini" value="${p((I.config?.equipe_inicio||"08:00").slice(0,5))}"></label>
        <label class="field"><span>Até</span><input type="time" name="fim" value="${p((I.config?.equipe_fim||"20:00").slice(0,5))}"></label>
      </div>
      <button class="btn">Salvar horário</button>
    </form>`;const n=u("#horario"),r=()=>u("#horas").hidden=n.elements.sempre.checked;n.elements.sempre.addEventListener("change",r),r(),n.addEventListener("submit",async i=>{i.preventDefault();const l=n.elements;if(!l.sempre.checked&&(!l.ini.value||!l.fim.value||l.ini.value===l.fim.value))return E("Confira o horário da equipe.","bad");await N(n.querySelector(".btn"),async()=>{const{error:d}=await x.from("configuracoes").update({equipe_inicio:l.sempre.checked?null:l.ini.value,equipe_fim:l.sempre.checked?null:l.fim.value,atualizado_em:new Date().toISOString()}).eq("id",1);if(d)throw new Error(/equipe_/.test(d.message)?"Rode o arquivo supabase/008_chamar_equipe.sql no Supabase para usar o horário da equipe.":d.message);await Y(!0),E("Horário salvo.","ok")})});const a=u("#f"),o=()=>u("#cont").textContent=a.elements.prompt.value.length;a.elements.prompt.addEventListener("input",o),o(),a.addEventListener("submit",async i=>{i.preventDefault(),await N(a.querySelector("button"),async()=>{const{error:l}=await x.from("configuracoes_privadas").update({prompt_ia:a.elements.prompt.value.trim(),atualizado_em:new Date().toISOString()}).eq("id",1);if(l)throw l;z("adm-privadas"),E("Informações salvas.","ok")})})})}function Da({titulo:t,texto:e,qr:n,segredo:r,verificar:a}){return new Promise(o=>{const i=document.createElement("dialog");i.className="dialog",i.innerHTML=`<form><h3>${p(t)}</h3><p>${p(e)}</p>
      ${n?`<img class="mfa-qr" src="${p(n)}" alt="QR Code para o aplicativo de códigos" width="200" height="200">`:""}
      ${r?`<p class="small muted">Ou digite no aplicativo: <code class="mfa-segredo">${p(r)}</code></p>`:""}
      <label class="field"><span>Código de 6 dígitos</span><input name="c" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required></label>
      <p class="warn small" data-erro hidden></p>
      <div class="row end"><button type="button" class="btn ghost" data-voltar>Voltar</button><button class="btn">Confirmar</button></div></form>`,document.body.appendChild(i);let l=!1;const d=i.querySelector("form");i.querySelector("[data-voltar]").onclick=()=>i.close(),d.addEventListener("submit",async c=>{c.preventDefault();const f=i.querySelector("[data-erro]");f.hidden=!0;try{await a(d.elements.c.value),l=!0,i.close()}catch(b){const g=b?.code==="mfa_verification_failed"||/invalid totp/i.test(b?.message||"");f.textContent=`${g?"Código incorreto ou vencido. Confira no aplicativo e tente de novo.":"Não foi possível confirmar o código."} (${b?.code||b?.status||"erro"}: ${b?.message||b})`,f.hidden=!1}}),i.addEventListener("close",()=>{o(l),i.remove()}),i.showModal()})}async function Te(){const{data:t,error:e}=await x.auth.mfa.getAuthenticatorAssuranceLevel();if(e)throw e;if(t.currentLevel==="aal2")return!0;const{data:n,error:r}=await x.auth.mfa.listFactors();if(r)throw r;const a=async(c,f)=>{const{error:b}=await x.auth.mfa.challengeAndVerify({factorId:c,code:f});if(b)throw b},o=n.totp.find(c=>c.status==="verified");if(o)return Da({titulo:"🔒 Código de duas etapas",texto:"Abra o aplicativo de códigos e digite o número desta conta.",verificar:c=>a(o.id,c)});for(const c of n.all.filter(f=>f.status!=="verified"))await x.auth.mfa.unenroll({factorId:c.id}).catch(()=>{});const{data:i,error:l}=await x.auth.mfa.enroll({factorType:"totp",friendlyName:"Chácara Canarinho"});if(l)throw l;const d=await Da({titulo:"🔒 Ativar a verificação em duas etapas",texto:"Para proteger a chave Pix, leia este QR Code com um aplicativo de códigos (Google Authenticator, por exemplo) e digite o número que aparecer.",qr:i.totp.qr_code,segredo:i.totp.secret,verificar:c=>a(i.id,c)});return d||await x.auth.mfa.unenroll({factorId:i.id}).catch(()=>{}),d}async function Me(t){const{data:e,error:n}=await x.from("alteracoes_pix").select("em,email,chave_antes,chave_depois").order("id",{ascending:!1}).limit(10);if(n||!e?.length||!t.isConnected)return;const r=a=>p(a||"(vazia)");t.innerHTML=`<h3>Alterações do Pix</h3><ul class="small">${e.map(a=>`<li>${p(W(a.em))} · ${p(a.email||"acesso direto ao banco")}: ${a.chave_antes===a.chave_depois?"outros dados do Pix":`chave ${r(a.chave_antes)} → ${r(a.chave_depois)}`}</li>`).join("")}</ul>`}async function Oa(t){await U(t,"adm-privadas",Ra,e=>{t.innerHTML=`
    <form id="f" class="stack">
      <p class="card small">${e.pix_chave&&e.pix_nome?"✅ <strong>Pix ativo.</strong> Quando o cliente reserva (pelo chat ou pela página da cabana), o QR Code e o Pix copia e cola aparecem no chat, e ele pode pedir o Pix de novo a qualquer momento.":"⚠️ <strong>Pix ainda não está ativo.</strong> Preencha a chave e o nome do recebedor e salve: o Pix passa a aparecer no chat sozinho."}</p>
      <div class="row gap wrap">
        <label class="field"><span>Tipo de chave</span><select name="tipo">${Object.entries(oe).map(([r,a])=>`<option value="${r}" ${e.pix_tipo===r?"selected":""}>${a}</option>`).join("")}</select></label>
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
    <div id="pix-hist" class="gap-top"></div>`,Me(u("#pix-hist"));const n=u("#f");n.addEventListener("submit",async r=>{r.preventDefault();const a=n.elements,o=a.chave.value.trim()?se(a.tipo.value,a.chave.value):null;if(a.chave.value.trim()&&!o)return E("Chave Pix inválida para o tipo escolhido.","bad");if(o&&!a.nome.value.trim())return E("Informe também o nome do recebedor, como aparece no banco.","bad");const i=o!==(e.pix_chave??null)||a.tipo.value!==e.pix_tipo||(a.nome.value.trim()||null)!==(e.pix_nome??null)||a.auto.checked!==e.confirmacao_automatica||(a.email.value.trim()||null)!==(e.email_admin??null);await N(n.querySelector("button"),async()=>{if(i&&!await Te())return;const{error:l}=await x.from("configuracoes_privadas").update({pix_ativo:!!(o&&a.nome.value.trim()),pix_tipo:a.tipo.value,pix_chave:o,pix_nome:a.nome.value.trim()||null,pix_cidade:a.cidade.value.trim()||null,prazo_pagamento_horas:Number(a.prazo.value),confirmacao_automatica:a.auto.checked,email_admin:a.email.value.trim()||null,atualizado_em:new Date().toISOString()}).eq("id",1);if(l)throw l;E(o?"Pix salvo e ativo no chat.":"Pix salvo.","ok"),z("adm-privadas"),Oa(t)})})})}async function Pe(t){await U(t,"adm-aparencia",()=>Y(!0),e=>{t.innerHTML=`
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
    </form>`;const n=u("#f");let r=null,a=e.lat!=null&&e.lng!=null?{lat:e.lat,lng:e.lng}:null,o=!1;const i=()=>{u("#pin-status").innerHTML=a?'<b class="ok-text">📍 Local marcado no mapa</b>':"<b>Sem alfinete no mapa</b>",u("#pin-btn").textContent=a?"📍 Mudar no mapa":"📍 Marcar no mapa"};i();let l=null,d=!(e.ilustracao_versao>0),c=!1;const f=u("#ilus-prev"),b=()=>{l?f.src=URL.createObjectURL(l):f.src=d?"icons/passaro.svg":Q("marca",`ilustracao/v${e.ilustracao_versao}.png`),u("#ilus-padrao").hidden=d&&!l};b(),n.elements.ilus.addEventListener("change",async()=>{const k=n.elements.ilus.files[0];if(n.elements.ilus.value="",!!k)try{l=await ba(k),l.size>480*1024&&(l=await ba(l,360)),d=!1,c=!0,b(),E("Ilustração escolhida. Toque em Salvar aparência.")}catch(_){O(_)}}),u("#ilus-padrao").addEventListener("click",()=>{l=null,d=!0,c=!0,b(),E("Volta ao passarinho padrão ao salvar.")}),u("#pin-btn").addEventListener("click",async()=>{const k=await ce({...a||{},endereco:n.elements.end.value});k!==void 0&&(a=k,o=!0,i(),E(k?"Ponto marcado. Toque em Salvar aparência.":"Alfinete removido. Toque em Salvar aparência."))});let g=null,w=!1;const q=e.icone_versao>0?fetch(Qa(e.icone_versao,"logo.png")).then(k=>k.ok?k.blob():null).catch(()=>null):Promise.resolve(null),m=()=>{try{return Number(localStorage.getItem("icone-zoom"))||100}catch{return 100}};let h=!1;n.elements.zoom.value=m();const s=()=>u("#zoom-v").textContent=`${n.elements.zoom.value}%`;s();const v=[],$=async()=>{r=await Ya(g||"icons/logo.svg",n.elements.fundo.value,Number(n.elements.zoom.value)/100),v.splice(0).forEach(_=>URL.revokeObjectURL(_));const k=_=>{const L=URL.createObjectURL(r[_]);return v.push(L),L};u("#prev").src=k("icon-192.png"),u("#pv-circ").src=u("#pv-arred").src=k("icon-maskable-512.png"),u("#pv-ios").src=k("apple-touch-icon.png")};n.elements.fundo.addEventListener("input",()=>$().catch(O));let y;n.elements.zoom.addEventListener("input",()=>{h=!0,s(),clearTimeout(y),y=setTimeout(()=>$().catch(O),180)}),n.elements.logo.addEventListener("change",async()=>{const k=n.elements.logo.files[0];if(k)try{g=await ba(k),w=!0;const{selo:_,cor:L}=ae(await ee(g));_&&L&&(n.elements.fundo.value=L),await $(),u("#logo-padrao").hidden=!1,E(_&&L?"Logo ajustada para ocupar o ícone, com o fundo na cor do selo. Toque em Salvar aparência.":"Logo escolhida. Toque em Salvar aparência para aplicar.")}catch(_){O(_)}finally{n.elements.logo.value=""}}),u("#logo-padrao").addEventListener("click",()=>{g=null,w=!0,u("#logo-padrao").hidden=!0,$().catch(O)}),q.then(k=>(k&&!w&&(g=k),$())).catch(()=>{}),n.elements.cor.addEventListener("input",()=>{document.documentElement.style.setProperty("--brand",n.elements.cor.value),document.documentElement.style.setProperty("--brand-ink",Za(n.elements.cor.value))}),$().catch(()=>{}),n.addEventListener("submit",async k=>{k.preventDefault();const _=n.elements,L=Ka(_.insta.value);if(L===null)return E("Instagram inválido. Use @perfil ou o endereço do perfil.","bad");const T=qa(_.cor.value),D=qa(_.fundo.value);await N(n.querySelector("button"),async()=>{const S=D!==e.cor_icone_fundo||w||h||e.icone_versao===0,M=S?Math.floor(Date.now()/1e3):e.icone_versao;if(S){await q,await $();const P={...r,...g?{"logo.png":g}:{}};for(const[F,sa]of Object.entries(P)){if(sa.size>500*1024)throw new Error("A logo gerou um ícone pesado demais. Use uma imagem mais simples (PNG com fundo transparente).");const{error:X}=await x.storage.from("marca").upload(`v${M}/${F}`,sa,{contentType:"image/png",cacheControl:"31536000"});if(X)throw X}}let A=e.ilustracao_versao??0;if(c){if(d)A=0;else if(l){A=Math.floor(Date.now()/1e3);const{error:P}=await x.storage.from("marca").upload(`ilustracao/v${A}.png`,l,{contentType:"image/png",cacheControl:"31536000"});if(P)throw P}}const{error:C}=await x.from("configuracoes").update({nome_app:_.nome.value.trim(),cor_principal:T,cor_icone_fundo:D,boas_vindas:_.boas.value.trim(),endereco:_.end.value.trim()||null,instagram_url:L||null,icone_versao:M,atualizado_em:new Date().toISOString(),...o?{lat:a?.lat??null,lng:a?.lng??null}:{},...c?{ilustracao_versao:A}:{}}).eq("id",1);if(C)throw/ilustracao/i.test(C.message)?new Error("Para salvar a ilustração, rode o arquivo supabase/006_ilustracao.sql no Supabase."):/lat|lng|column/i.test(C.message)?new Error("Para salvar o local no mapa, rode o arquivo supabase/005_mapa.sql no Supabase."):C;o=!1,c&&e.ilustracao_versao>0&&A!==e.ilustracao_versao&&x.storage.from("marca").remove([`ilustracao/v${e.ilustracao_versao}.png`]).catch(()=>{}),c=!1,S&&e.icone_versao>0&&x.storage.from("marca").remove(["icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","logo.png"].map(P=>`v${e.icone_versao}/${P}`)).catch(()=>{}),w=!1,h=!1;try{localStorage.setItem("icone-zoom",String(n.elements.zoom.value))}catch{}await Y(!0),Ba(),z("adm-aparencia"),z("adm-calendario"),E("Aparência salva.","ok")})})})}async function Ha(t){await U(t,"adm-novidades",async()=>{const[{count:e},{count:n},{data:r}]=await Promise.all([x.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_email",!0),x.from("perfis").select("id",{count:"exact",head:!0}).eq("receber_push",!0),x.from("novidades").select("*").order("criado_em",{ascending:!1}).limit(30)]);return{ce:e,cp:n,envios:r}},({ce:e,cp:n,envios:r})=>{t.innerHTML=`
    <form id="f" class="stack card">
      <p class="small muted">Só recebem os clientes que pediram: ${e??0} por e-mail e ${n??0} por notificação.</p>
      <label class="field"><span>Título</span><input name="titulo" required minlength="2" maxlength="80"></label>
      <label class="field"><span>Mensagem</span><textarea name="texto" rows="5" required minlength="2" maxlength="2000"></textarea></label>
      <label class="check"><input type="checkbox" name="email" checked> Enviar por e-mail</label>
      <label class="check"><input type="checkbox" name="push" checked> Enviar por notificação</label>
      <button class="btn">Enviar novidade</button>
    </form>
    <h3 class="section-title">Enviadas</h3>
    ${(r||[]).map(o=>`<article class="card"><strong>${p(o.titulo)}</strong> <span class="muted small">${W(o.criado_em)}</span><p class="small pre">${p(o.texto)}</p><p class="small muted">✉️ ${o.enviados_email} · 🔔 ${o.enviados_push}</p></article>`).join("")||'<p class="muted small">Nenhuma ainda.</p>'}`;const a=u("#f");a.addEventListener("submit",async o=>{o.preventDefault();const i=a.elements;await G("Enviar a novidade?","Ela vai para todos os clientes que pediram.","Enviar")&&await N(a.querySelector("button"),async()=>{const l=await ta("enviar-novidade",{titulo:i.titulo.value.trim(),texto:i.texto.value.trim(),email:i.email.checked,push:i.push.checked});E(`Enviada: ${l.enviados_email} e-mail(s) e ${l.enviados_push} notificação(ões).`,"ok"),z("adm-novidades"),Ha(t)})})})}const Ne=[["🧭","Visão geral",`
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
    </ul>`]];async function ze(t){t.innerHTML=`
    <input type="search" id="ajuda-busca" placeholder="Buscar na ajuda (ex.: notificação, Pix, ícone)">
    <div class="ajuda gap-top">${Ne.map(([n,r,a],o)=>`
      <details class="ajuda-item" ${o===0?"open":""}>
        <summary><span class="li-ico">${n}</span><b>${p(r)}</b></summary>
        <div class="ajuda-txt">${a}</div>
      </details>`).join("")}</div>
    <p class="small muted center gap-top">Esta ajuda aparece só para administradores.</p>`;const e=ma(".ajuda-item",t);u("#ajuda-busca",t).addEventListener("input",n=>{const r=Fa(n.target.value);for(const a of e){const o=!r||Fa(a.textContent).includes(r);a.hidden=!o,r&&(a.open=o)}})}const Fa=t=>String(t??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();export{de as ADMIN_SECOES,Ge as renderAdmin};
