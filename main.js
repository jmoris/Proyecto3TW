const connection = new WebSocket('ws://proyectotw3.herokuapp.com:8080');

connection.onopen = () => {
  console.log('connected');
  var html = `
    <div class="message-box">
        <p class="message"><i class="fas fa-arrow-right text-muted">&nbsp;</i>Conectado al chat...</p>
    </div>
  `;
  let element = document.getElementById('chat').innerHTML;
  $('#chat').html($('#chat').html() + html);
};

connection.onclose = () => {
    var html = `
    <div class="message-box">
        <p class="message"><i class="fas fa-arrow-right text-muted">&nbsp;</i>Desconectado del chat...</p>
    </div>
  `;
  let element = document.getElementById('chat').innerHTML;
  $('#chat').html($('#chat').html() + html);
};

connection.onerror = error => {
    var html = `
    <div class="message-box">
        <p class="message"><i class="fas fa-arrow-right text-muted">&nbsp;</i>Error conectando al chat...</p>
    </div>
  `;
  let element = document.getElementById('chat').innerHTML;
  $('#chat').html($('#chat').html() + html);
};

connection.onmessage = event => {
  console.log('received', event.data);
  var data = JSON.parse(event.data);
  var html = `
    <div class="message-box">
        <span class="author">${data.author} (${data.date})</span>
        <p class="message"><i class="fas fa-arrow-right text-muted">&nbsp;</i>${data.msg}</p>
    </div>
  `;
  let element = document.getElementById('chat').innerHTML;
  $('#chat').html($('#chat').html() + html);
};

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  let message = document.querySelector('#message').value;
  let author = $('#authorTxt').val();
  var dt = {
      msg: message,
      author: author,
      date: moment().format('lll')
  };
  connection.send(JSON.stringify(dt));
  document.querySelector('#message').value = '';
});