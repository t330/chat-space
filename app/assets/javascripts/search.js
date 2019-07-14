$(function() {

  var search_list = $("#user-search-result");

  var add_to_bottom = $("#chat-group-users");

  $("#user-search-result").on("click", "#add-btn", function(){
    restore1 = $(this).data("user-id");
    restore2 = $(this).data("user-name");
    appendToBottom(restore1, restore2);
    $('#user-search-result').empty();
  });

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })

  function appendUser(user) {
    var html = `
                <div class="chat-group-user clearfix">
                  ${user.name}
                  <div id= "add-btn" class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                    追加
                  </div>
                </div>
              `
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `
                <li>
                  <div class='listview__element--right-icon'>${ msg }</div>
                </li>
              `
    search_list.append(html);
  }

  function appendToBottom(restore1, restore2) {
    var html = `
                <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${restore1}'>
                  ${restore2}
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                    削除
                  </div>
                </div>
                `
    add_to_bottom.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }

      else {
        appendErrMsgToHTML("該当するユーザーは存在しません...");
      }

    })
    
  });

});


