  var produced = {}
  $(function () {
	  var HOST = '118.ydmhb.com'
	  var LOGIN_URL = 'https://' + HOST + '/index.php/home/index/getUserInfo'
	  var clipboard = new ClipboardJS('#clipboard')
		clipboard.on('success', function(e) {
			$('#bar').blur();
			mui.alert('复制成功!');
		});
		
	  function isWechat () {
		return /MicroMessenger/.test(navigator.userAgent)
	  }
    if ( isWechat() && !( window.isLogin && window.user_id > 0 ) ) {
		mui.alert('正在登录!');
      location.href = LOGIN_URL
      return
    }
    var uri = location.search
    var param = uri.substring(1).split('&')
    var parameters = {}
    for ( var i = 0; i < param.length; i++ ) {
      var tmp = param[ i ].split('=')
      if ( tmp.length == 2 ) {
        parameters[ tmp[ 0 ] ] = tmp[ 1 ]
      }
    }
    parameters.user_id = window.user_id
    $.get('https://' + HOST + '/v2/produced/' + parameters.id, function (str) {
      var data = JSON.parse(str)
      if ( data.errcode != 0 ) {
        mui.alert(data.msg)
        return
      }
      produced = data.data
      $('#img').prop('src', produced.img)
      $('#title').text(produced.name)
      $('#bar').text(produced.clipboard)
      console.log(produced)
    })


    var url = ''
    $('.apply').on('click', function () {
      var name = $.trim($('#name').val())
      var tel = $.trim($('#tel').val())
      if ( name == '' ) {
        return mui.toast('姓名不能为空')
      }
      if ( tel == '' ) {
        return mui.toast('手机号码不能为空！')
      }

      var patter = /^1[2|3|4|5|6|8|7|9][0-9]\d{8}$/.test(tel)
      if ( !patter ) {
        return mui.toast('手机号码格式错误！')
      }
      parameters.name = name
      parameters.tel = tel
      $.post('https://' + HOST + '/v2/produced', parameters, function (str) {
        var data = JSON.parse(str)
        if ( data.errcode != 0 ) {
          mui.alert(data.msg)
          return
        }
        location.href = produced.url
      }, 'JSON')

    })
  })