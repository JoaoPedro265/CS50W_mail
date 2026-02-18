<img style="100%" src="https://capsule-render.vercel.app/api?type=waving&height=120&section=header&fontColor=FFFFFF&theme=cobalt" />

<h1 align="left">📧 Mail - Cliente de E-mail SPA</h1>

<p align="left">
Uma interface de e-mail moderna construída como uma <strong>Single Page Application (SPA)</strong>.
O projeto utiliza JavaScript para realizar requisições a uma API interna, permitindo o envio, recebimento, arquivamento e resposta de e-mails sem recarregar a página.
</p>

<h2 align="left">🕹️ Funcionalidades Implementadas</h2>

<ul>
<li><strong>Single Page Architecture:</strong> Alternância dinâmica entre caixas de entrada, enviados e composição via JavaScript.</li>
<li><strong>Envio de E-mails:</strong> Processamento de formulários via requisições <code>POST</code> para a API.</li>
<li><strong>Gerenciamento de Estado (Read/Unread):</strong> E-mails lidos ganham destaque visual (fundo cinza) através de requisições <code>PUT</code>.</li>
<li><strong>Arquivamento Dinâmico:</strong> Mova e-mails para o arquivo ou traga-os de volta para a Inbox com um clique.</li>
<li><strong>Sistema de Resposta (Reply):</strong> Preenchimento inteligente de campos (Re:, Destinatário e Histórico) ao responder um e-mail.</li>
<li><strong>Interface Responsiva:</strong> Renderização dinâmica de elementos HTML diretamente pelo arquivo <code>inbox.js</code>.</li>
</ul>

<h2 align="left">🧩 Arquitetura do Projeto (SPA)</h2>

<p align="left">
O projeto foca intensamente na <strong>manipulação do DOM</strong> e no uso da <strong>Fetch API</strong> para interagir com o back-end:
</p>

GET /emails/<mailbox>: Carrega a lista de e-mails.

POST /emails: Envia um novo e-mail.

PUT /emails/<email_id>: Atualiza o status (lido/arquivado).

GET /emails/<email_id>: Recupera o conteúdo detalhado de uma mensagem.

<h2 align="left">🛠️ Tecnologias Utilizadas</h2>

<div align="left">
<img src="https://skillicons.dev/icons?i=js,html,css,django,py,sqlite" height="40" />
</div>
###

<h2 align="left">📺 Demonstração em Vídeo</h2>

<div align="center">
  [COLE OU ARRASTE SEU VÍDEO AQUI]

  <p><i>Demonstração do fluxo de autenticação, criação de tarefas e responsividade da interface.</i></p>
</div>
