$(function(){
  function buildHTML(message){
    var image = (message.image) ? image = `<img class="lower-message__image" src="${message.image}">` : image = "";
    var html = `
              <div class="message" data-message-id="${message.id}">
                <div class="message__upper-info">
                  <div class="message__upper-info__talker">
                    ${message.name}
                  </div>
                  <div class="message__upper-info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message__text">
                  <p class='lower-message__content'>
                    ${message.content}
                  </p>
                </div>
                ${image}
              </div>
              `
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false 
      })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}).bind("page:load");
      $('#new_message')[0].reset();
      $('.submit-btn').attr('disabled', false);
    })
    
    .fail(function(){
      alert('メッセージを入力してください');
    })

    return false;
  })

  var reloadMessages = function() {
    last_message_id = $('.message').last().data("message-id");
    var identifyHTML = window.location.href
    if (identifyHTML.match(/\/groups\/\d+\/messages/)) {

      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}).bind("page:load");
          })

      })

      .fail(function() {
        alert('エラーが発生しました');
      })

    };

  };

  setInterval(reloadMessages, 5000);
})