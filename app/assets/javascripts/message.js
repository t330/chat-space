$(function(){

  function buildHTML(message){

    var image = (message.image) ? image = `<img class="lower-message__image" src="${message.image}" height = 200>` : image = "";

    var html = `
      <div class="message">
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
      alert('えらー。メンターさんいつもありがとうございます＾＾');
    })
    return false;
    
  })

})