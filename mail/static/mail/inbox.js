document.addEventListener('DOMContentLoaded', function () {
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => arquived('archived'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#add_email').addEventListener('click', add_email)//adicionar email ao BD
  // By default, load the inbox
  load_mailbox('inbox');
});

//enviar email ao BD
function add_email() {
  //console
  const recipients = document.querySelector('#compose-recipients').value
  const subject = document.querySelector('#compose-subject').value
  const body = document.querySelector('#compose-body').value
  //limpar
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body,
    })
  })
    .then(response => response.json())
    .then(result => {
      // Verifique se o e-mail foi enviado com sucesso
      console.log(result);
      // Carregue a caixa de correio de enviados após o envio
      load_mailbox('sent');
    });

}

//campo para escrever emails/ocultar
function compose_email() {
  //consertar o nome mudado
  document.querySelector('h3').textContent = 'New Email'
  // Mostrar a visualização de composição e ocultar outras visualizações
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Limpar os valores dos campos
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

//responder email recebido
function response_email(id) {
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
      // Print email clicado
      console.log(`responder ID:${email.id}`)
      document.querySelector('#emails-view').style.display = 'none'
      document.querySelector('#compose-view').style.display = 'block'
      document.querySelector('h3').textContent = 'Reply'
      document.querySelector('#compose-recipients').value = email.sender;
      document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
      document.querySelector('#compose-body').value = `${email.body}\n---\n`;
      //focar na linha do testo para digitar
      const focu = document.querySelector('#compose-body');
      focu.focus()
    });
}

//ver email
function views_email(id) {
  //visualizacao,mudar cor
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  })
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
      // Print email clicado
      console.log(email);
      document.querySelector('#emails-view').innerHTML = '';
      document.querySelector('#emails-view').innerHTML = `
    <strong>From:</strong> ${email.sender}<br>
    <strong>To:</strong> ${email.recipients}<br>
    <strong>Subject:</strong> ${email.subject}<br>
    <strong>Timestamp:</strong> ${email.timestamp}<br>
    <br><button id="response" type="button" class="btn btn-primary">Reply</button>
    <button id="Arquive" type="button" class="btn btn-primary">Arquive</button>
    <hr>
    ${email.body}<br>
    `
      //mudar cor do botao arquivado/verde/vermelho
      if (email.archived === false) {
        document.querySelector('#Arquive').className = "btn btn-success"
      } else {
        let button = document.querySelector('#Arquive');
        button.className = "btn btn-danger"
        button.innerHTML = 'Unarquive'
      }
      //botao para responder
      document.querySelector("#response").addEventListener('click', () => {
        response_email(id)
      })
      //botao para arquivar
      document.querySelector('#Arquive').addEventListener('click', () => {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: !email.archived
          })
        })
          .then(() => { load_mailbox('inbox') })
      });
    });
}

//arquivar mensagmes
function arquived(mailbox) {
  console.log(`Mailbox: ${mailbox}`);
  document.querySelector('#compose-view').style.display = 'none'
  document.querySelector('#emails-view').style.display = 'block'
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  // Solicitar emails arquivados
  fetch('/emails/archive')
    .then(response => response.json())
    .then(emails_arquivad => {
      // Print emails
      console.log(emails_arquivad);
      load_mailbox('archive')
      document.querySelector('#emails-view').append(email_arquivad);
    });
};

//carregar emais recebidos/criar div
function load_mailbox(mailbox) {
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  // Atualize o cabeçalho da caixa de correio
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  // Solicite os e-mails da caixa de correio
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      console.log(emails);
      //criar um loop para cada email exibir dentro de uma div
      emails.forEach(singleEmail => {
        //if(!singleEmail.archived==true){
        //  console.log('unarquivad')
        //}
        const new_Email = document.createElement('div');
        //elementos dentro da div
        //new_Email.innerHTML = 'This is the content of the div.';
        new_Email.className = 'border border-dark';
        new_Email.innerHTML = `
        <strong>From:</strong> ${singleEmail.sender}
        <strong>Subject:</strong> ${singleEmail.subject}
        <strong>Timestamp:</strong> ${singleEmail.timestamp}
        `
        //mudar a cor
        if (singleEmail.read === true) {
          new_Email.classList.add('read')
        } else {
          new_Email.classList.add('unread')
        }
        // Comportamento ao clicar no botao 'View'
        new_Email.addEventListener('click', () => {
          console.log('This element has been clicked!');
          //clica no botao, manda o id para a funcao views_email
          views_email(singleEmail.id)
        });

        // Mostrar na tela
        document.querySelector('#emails-view').append(new_Email);
      });
    });
};

