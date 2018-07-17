var $user = {};
$(document).ready(function () {
    initDefault();
    setTimeout(function () {
        loadImage();
    }, 500)
});

function verificationPicFile(file) {
    var fileSize = 0;
    var fileMaxSize = 1024 * 5 * 2;//5M

    var filePath = file.value;

    fileSize =file.files[0].size;
    var size = fileSize / 1024;
    if (size > fileMaxSize) {
        console.log("文件大小不能大于5M！");
        $('.p1-upload-max10m').show();
        file.value = "";
        return false;
    }else if (size <= 0) {
        console.log("文件大小不能为0M！");
        $('.p1-upload-max10m').show();
        file.value = "";
        return false;
    }


    return true;
}

function ajaxUpload(data, obj){
    //console.log(data, obj);

    $.ajax({
        type: 'POST',
        url: config.api.upload,
        data: {
            data: data
        },
        success: function(res){
            console.log(res);
            if(res.code === 200) {
                obj.src = res.link;
                obj.style.display='block';
                $('.p1-upload-success').show();
            }
        },
        error: function(xhr,errorText,errorType){
            console.log(xhr,errorText,errorType);
            $('.p1-upload-error').show();
        },
        dataType: 'json'
    });
}

function ajaxSubmitP1(){
    var data = {
        oppo_id: $('#username').val().trim(),
        mobile: $('#mobile').val().trim(),
        is_up_wall: $('[name="show"]:checked').val(),
        url: $('#upload_url').attr('src'),
        token: $user.token,
    };

    console.log(data);

    $.ajax({
        type: 'POST',
        url: config.api.join,
        data: data,
        success: function(res){
            console.log(res);
            if(res.code === 200) {
                $('.p1-join-success').show();
            }else{
                $('.p1-error').show();
            }
        },
        error: function(xhr,errorText,errorType){
            console.log(xhr,errorText,errorType);
            $('.p1-error').show();
        },
        dataType: 'json'
    });
}

function initDefault(){
    $(document).ajaxStart(function(){
        //$('.p3-ajaxing').show();
    });
    $(document).ajaxStop(function(){
        //$('.p3-ajaxing').hide();
    });

    if(typeof android=="undefined"){ //
        //老版本android对象不存在，为true时，代表老版本；
        //在这里面写提醒用户升级客户端版本的代码
        // alert('请升级客户端');
        $('.p1-update').show();
        $('.p3-update').show();
        return;
    }

    $('.shadow .close').click(function(){
        $(this).parents('.shadow').fadeOut();
    });

    $('.preview').click(function () {
        $(this).fadeOut();
    });

    if(typeof window.ThemeClient !== 'undefined'
        && typeof window.ThemeClient.getUserName !== 'undefined'
        && window.ThemeClient.getUserName instanceof Function){
        $user.deviceId = window.ThemeClient.getDeviceId();
        $user.oppoId = window.ThemeClient.getUserName();
        $user.oppoUserName = window.ThemeClient.getUserName();
        console.log($user.deviceId + $user.oppoId);
    }

    console.log($user);

    if(!$user.oppoUserName || $user.oppoUserName === '') {
        $('.p1-login-first').show();
        $('.p3-login-first').show();
        console.log('请登录oppo的账号');
        $user.deviceId = 'desand';
        $user.oppoId = 'desand';
        $user.oppoUserName = '13826019412';
        //return;
    }

    // try{
    //
    //
    // } catch ($err) {
    //   //alert($err);
    //   $('.p1-login-first').show();
    //   $('.p3-login-first').show();
    //   console.log('请登录oppo的账号');
    //   $user.deviceId = 'desand';
    //   $user.oppoId = 'desand';
    //   $user.oppoUserName = '13826019412';
    // }

    $.post(config.api.login, $user, function(res){
        $user.token = res.data.token;
        $user.b1_praised = res.data.b1_praised;
        $user.a1_voted = res.data.a1_voted;
        console.log($user);

        $.ajax({
            type: 'GET',
            url: config.api.info,
            data: {
                'token': $user.token
            },
            success: function(res){
                console.log(res);
                $('.b1_draw_count').text(res.data.b1_draw_count);
                $('.a1_draw_count').text(res.data.a1_draw_count);
            },
            error: function(xhr,errorText,errorType){
                console.log(xhr,errorText,errorType);
            },
            dataType: 'json'
        });

        if($(document).find('.p1').length>0){
            //首页 A-1
            initP1();
        }

        if($(document).find('.p2').length>0){
            //转盘抽奖页
            initP2();
        }

        if($(document).find('.p3').length>0){
            //告白墙
            initP3();
        }

    }, 'json');
}

function initP1(){
    //我要参赛
    $('.p1-button').click(function(){
        $('.p1-1-1').fadeIn('fast');
    });

    $('.p1-1-1 .submit').click(function(){
        console.log('submit');
        if(!checkP1Input()){
            return;
        }

        ajaxSubmitP1();
    });

    $("#upload").on("change", function() {
        var filePath = $(this).val();//读取图片路径

        var fr = new FileReader();//创建new FileReader()对象
        var imgObj = this.files[0];//获取图片

        if(imgObj === undefined) {
            return;
        }

        fr.readAsDataURL(imgObj);//将图片读取为DataURL
        var obj = $(this).prev()[0];//

        if(!verificationPicFile(this)){
            return false;
        }

        console.log(imgObj);

        if(filePath.indexOf("jpeg") != -1
            || filePath.indexOf("JPEG") != -1
            || filePath.indexOf("jpg") != -1
            || filePath.indexOf("JPG") != -1
            || filePath.indexOf("PNG") != -1
            || filePath.indexOf("png") != -1) {
            var arr = filePath.split('\\');
            var fileName = arr[arr.length - 1];

            fr.onload = function() {
                ajaxUpload(this.result, obj);
            };
        } else {
            console.log('错误图片格式');
            return false;
        }
    });
}

function checkP1Input(){
    if($('#username').val() === ''){
        console.log('username can not empty');
        $('.p1-empty-username').show();
        return false;
    }

    if($('#mobile').val() === ''){
        console.log('mobile can not empty');
        $('.p1-empty-mobile').show();
        return false;
    }

    if($('#upload_url').attr('src') === ''){
        console.log('upload_url can not empty');
        $('.p1-empty-image').show();
        return false;
    }

    if(!$('#rule').is(':checked')){
        console.log('rule can not unchecked');
        $('.p1-empty-rule').show();
        return false;
    }

    return true;
}
