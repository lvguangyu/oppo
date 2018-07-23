var $user = {};
var clearIndex = null;
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

    fileSize = file.files[0].size;
    var size = fileSize / 1024;
    if (size > fileMaxSize) {
        console.log("文件大小不能大于5M！");
        $('.p1-upload-max5m').show();
        file.value = "";
        return false;
    } else if (size <= 0) {
        console.log("文件大小不能为0M！");
        $('.p1-upload-max10m').show();
        file.value = "";
        return false;
    }


    return true;
}

function ajaxUpload(data, obj) {
    //console.log(data, obj);

    $.ajax({
        type: 'POST',
        url: config.api.upload,
        data: {
            data: data
        },
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                obj.src = res.link;
                obj.style.display = 'block';
                $('.p1-upload-success').show();
            }
        },
        error: function (xhr, errorText, errorType) {
            console.log(xhr, errorText, errorType);
            $('.p1-upload-error').show();
        },
        dataType: 'json'
    });
}

function ajaxSubmitP1(isAuthor) {
    var data = {
        oppo_id: $user.oppoId,
        mobile: $('#mobile').val().trim(),
        is_up_wall: isAuthor,
        url: $('#upload_url').attr('src'),
        token: $user.token,
    };

    console.log(data);

    $.ajax({
        type: 'POST',
        url: config.api.join,
        data: data,
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                $('.p1-join-success').show();
            } else {
                $('.p1-error').show();
            }
        },
        error: function (xhr, errorText, errorType) {
            console.log(xhr, errorText, errorType);
            $('.p1-error').show();
        },
        dataType: 'json'
    });
}

function initDefault() {
    $(document).ajaxStart(function () {
        //$('.p3-ajaxing').show();
    });
    $(document).ajaxStop(function () {
        //$('.p3-ajaxing').hide();
    });

    $('.shadow .close').click(function () {
        $(this).parent().parent('.shadow').fadeOut();
    });

    $('.preview').click(function () {
        $(this).fadeOut();
    });
    $user.oppoId = window.localStorage.getItem('font-user-id');

    if (!$user.oppoId) {
        $('.very-code-model').fadeIn('fast');
    } else {
        getUserInfo();
    }

    $('#very-code-btn').click(function () {
        var phone = $('#very-code-phone').val().trim();
        if (phone) {
            if ( $('#very-code-btn').text() != '获取验证码') {
                return;
            }
            $('#code').val('');
            var i = 60;
            sendCode(phone);
            clearIndex = setInterval(function () {
                if (i > 1) {
                    i = i - 1;
                    $('#very-code-btn').text(i + '秒后重新发送');
                } else {
                    $('#very-code-btn').text('获取验证码');
                    clearInterval(clearIndex);
                }
            }, 1000);
        } else {
            $('.empty-mobile').show();
        }
    });
    $('.very').bind('input', (function () {
        var phone = $('#very-code-phone').val();
        var code = $('#code').val();
        if (!phone || !code) {
            $('.very-code-model .submit').addClass('disabled');
        } else {
            $('.very-code-model .submit').removeClass('disabled');
        }
    }));
    $('.very-code-model .submit').click(function () {
        veryCode();
    })

}
function checkoutLogin() {
    if (!$user.oppoId) {
        $('.very-code-model').find('input').val('');
        $('.very-code-model').fadeIn('fast');
        return false;
    } else {
        return true;
    }
}
function sendCode(phone) {
    $.ajax({
        type: 'POST',
        url: config.api.sendCode,
        data: {
            'mobile': phone
        },
        dataType: 'json',
        success: function (res) {
            if (res.error === 0) {
                $('.success-code').fadeIn();
                $('.success-code').fadeOut(2000);
            } else {
                $('.error-network').show();
                $('#very-code-btn').html('获取验证码')
            }
            // $('.very-code-model').fadeOut('fast');
        },
        error: function (xhr, errorText, errorType) {
            $('.error-network').show();
            $('#very-code-btn').html('获取验证码');
            clearInterval(clearIndex);
        }
    });
}
function veryCode() {
    var phone = $('#very-code-phone').val().trim();
    var code = $('#code').val().trim();
    var data = {
        mobile: parseInt(phone),
        code: parseInt(code)
    };
    if (!phone || !code) {
        return;
    }
    $.ajax({
        type: 'POST',
        url: config.api.veryCode,
        data: data,
        dataType: 'json',
        success: function (res) {
            if (res.error === 0) {
                localStorage.setItem('font-user-id', phone);
                $user.oppoId = phone;
                $('.very-code-model').fadeOut('fast');
                $('.very-code-model').find('input').val('');
                getUserInfo();
            } else {
                $('.error-code').fadeIn();
                $('.error-code').fadeOut(2000);
            }
        },
        error: function (xhr, errorText, errorType) {
            $('.error-network').show();
        }
    });
}
function getUserInfo() {
    $.post(config.api.login, $user, function (res) {
        $user.token = res.data.token;
        $user.b1_praised = res.data.b1_praised;
        $user.a1_voted = res.data.a1_voted;
        console.log('user', $user);

        $.ajax({
            type: 'GET',
            url: config.api.info,
            data: {
                'token': res.data.token
            },
            success: function (res) {
                $('.b1_draw_count').text(res.data.b1_draw_count);
                $('.a1_draw_count').text(res.data.a1_draw_count);
            },
            error: function (xhr, errorText, errorType) {
                console.log(xhr, errorText, errorType);
            },
            dataType: 'json'
        });

        if ($(document).find('.p1').length > 0) {
            //首页 A-1
            initP1();
        }

        if ($(document).find('.p2').length > 0) {
            //转盘抽奖页
            initP2();
        }

        if ($(document).find('.p3').length > 0) {
            //告白墙
            initP3();
        }

    }, 'json');
}
function initP1() {
    //我要参赛
    $('.p1-button').click(function () {
        var isLogin = checkoutLogin();
        if (!isLogin) {
            return;
        }
        $('.p1').fadeOut('fast');
        clearInput();
        $('.p1-1-1').fadeIn('fast');
    });

    $('.p1-1-1-close').click(function () {
        $('.p1-1-1').fadeOut();
        $('.p1').fadeIn('fast');
    });

    $('.jury-close').click(function () {
        console.log('jury');
        $('.p1-jury').fadeOut();
    });

    $('.message .close').click(function () {
        $(this).parent().parent('.shadow').fadeOut();
    });


    $('.judge').click(function () {
        $('.p1-jury').show();
        var swiper = new Swiper('#p1-jury-swiper-container', {
            scrollbarHide: true,
            slidesPerView: 'auto',
            // centeredSlides: true,
            spaceBetween: 8,
            grabCursor: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination'
        });
    });
    // $('.shadow .jury-close').click(function () {
    //     $(this).parent().parent('.shadow').fadeOut();
    // });

    $('.p1-1-1 .submit').click(function () {
        if (!checkP1Input()) {
            return;
        }
        $('.p1-author').show();
    });
    $('.p1-author .yes-author').click(function () {
        $('.p1-author').fadeOut();
        ajaxSubmitP1(1);
    });
    $('.p1-author .no-author').click(function () {
        $('.p1-author').fadeOut();
        ajaxSubmitP1(0);
    });

    $("#upload").on("change", function () {
        var filePath = $(this).val();//读取图片路径

        var fr = new FileReader();//创建new FileReader()对象
        var imgObj = this.files[0];//获取图片

        if (imgObj === undefined) {
            return;
        }

        fr.readAsDataURL(imgObj);//将图片读取为DataURL
        var obj = $(this).prev()[0];//
        if (!verificationPicFile(this)) {
            return false;
        }

        console.log(imgObj);

        if (filePath.indexOf("jpeg") != -1
            || filePath.indexOf("JPEG") != -1
            || filePath.indexOf("jpg") != -1
            || filePath.indexOf("JPG") != -1
            || filePath.indexOf("PNG") != -1
            || filePath.indexOf("png") != -1) {
            var arr = filePath.split('\\');
            var fileName = arr[arr.length - 1];

            fr.onload = function () {
                ajaxUpload(this.result, obj);
            };
        } else {
            console.log('错误图片格式');
            return false;
        }
    });
}

function  clearInput() {
    $('#mobile').val('');
    // $('#upload_url').attr('src', '#');
    // $('#upload').val('');
    $('#rule').attr('checked', false);
    clearInterval(clearIndex);
}
function checkP1Input() {
    // if($('#username').val() === ''){
    //   console.log('username can not empty');
    //   $('.p1-empty-username').show();
    //   return false;
    // }

    if ($('#mobile').val() === '') {
        console.log('mobile can not empty');
        $('.p1-empty-mobile').show();
        return false;
    }

    if ($('#upload_url').attr('src') === '') {
        console.log('upload_url can not empty');
        $('.p1-empty-image').show();
        return false;
    }

    if (!$('#rule').is(':checked')) {
        console.log('rule can not unchecked');
        $('.p1-empty-rule').show();
        return false;
    }

    return true;
}

function syncP3Comments(page) {
    page = page === undefined ? 1 : page;
    $.get(config.api.comment, {
        page: page,
        'token': $user.token
    }, function (res) {
        console.log(res);
        var tar = $('#p3-comments').find('ul');
        if (res.code === 200) {
            tar.html('');
            var list = [];
            $.each(res.data.list, function (i, row) {
                list.push('<li><div class="title">' + $user.oppoId + '</div><p>' + row.content + '</p></li>')
            });

            tar.html(list.join(''));

            initP3Paginator(res.data.pagination);
        }
    }, 'json');
}

function loadComment(page) {
    syncP3Comments(page)
}

function p3Awards() {
    $.get(config.api.award, {'token': $user.token}, function (res) {
        console.log(res);
        var tar = $('#p3-awards-swiper');
        if (res.code === 200) {
            tar.html('');
            var list = [];
            $.each(res.data, function (i, row) {
                list.push('<div class="swiper-slide lazyload" data-src="' + row.url + '" style="background-image:url(' + row.url + ')"></div>')
            });

            tar.html(list.join(''));
            //lazyload();

            var swiper = new Swiper('#p3-awards-container', {
                scrollbar: '.swiper-scrollbar',
                scrollbarHide: true,
                slidesPerView: 'auto',
                // centeredSlides: true,
                spaceBetween: 8,
                grabCursor: true
            });
        }
    }, 'json');
}

function p3WallWinners() {
    $.get(config.api.wallWinners, {'token': $user.token}, function (res) {
        console.log(res);
        var tar = $('#p3-winners-swiper');
        if (res.code === 200) {
            tar.html('');
            var list = [];
            $.each(res.data, function (i, row) {
                var mobile = row.mobile2;
                if (mobile) {
                    mobile = mobile.substr(0, 3) + '****' + mobile.substr(7);
                    list.push('<div class="swiper-slide"><p>恭喜 ' + mobile + '<br>获得 ' + (row.award ? row.award.title : '') + ' 奖品 </p></div>')
                }
            });

            tar.html(list.join(''));

            var swiper = new Swiper('#p3-winners-container', {
                scrollbarHide: true,
                spaceBetween: 8,
                grabCursor: true,
                direction: 'vertical',
                autoplay: 2000,
                loop: true,
            });
        }
    }, 'json');
}

// 抽奖区
function initP3WallDraw() {
    $('#wall_draw').click(function () {
        var isLogin = checkoutLogin();
        if (!isLogin) {
            return;
        }
        if (!$user.b1_praised && parseInt($('.b1_draw_count').text()) <= 0) {
            $('.p3-praise-first').show();
            return;
        }

        if (parseInt($('.b1_draw_count').text()) <= 0) {
            $('.p3-nextday').show();
            return;
        }
        $.post(config.api.wallDraw, {'token': $user.token}, function (res) {
            console.log(res);
            if (res.code === 200 && res.data.winner !== false) {
                console.log('winner');
                $user.win = res.data.winner.id;
                $('.p3-draw-winner').show();
                $('.p3-draw-winner .award-title').html('恭喜您获得' + res.data.winner.name);
            } else {
                console.log('no winner');
                $('.p3-no-winner').show();
            }

            $('.b1_draw_count').text(res.data.b1_draw_count);

        }, 'json');
    });
}

function initP3Paginator(paginator) {
    var paginator = new pagination.TemplatePaginator({
        prelink: '/',
        current: paginator.current_page,
        rowsPerPage: paginator.per_page,
        totalResult: paginator.total,
        slashSeparator: true,
        template: document.getElementById("pagination-template").innerHTML
    });
    var html = paginator.render();
    console.log(html);
    document.getElementById("paging").innerHTML = html;
}

// 我的奖品
function p3WallMineAwards() {
    $.get(config.api.wallMineAward, {'token': $user.token}, function (res) {
        console.log(res);
        var tar = $('#mine-awards');
        if (res.code === 200) {
            tar.html('');
            var list = [];
            $.each(res.data, function (i, row) {
                list.push('<li><div class="award" style="background-image: url(' + row.award.url + ');"></div></li>');
            });

            tar.html(list.join(''));
        }
    }, 'json');
}
// 优秀作品展示，点赞区
function p3WallProductions() {
    $.get(config.api.wallProduction, {'token': $user.token}, function (res) {
        // console.log(res);
        if (res.code === 200 && res.data.length > 0) {
            var list = [];
            $.each(res.data, function (i, row) {
                list.push('<div class="swiper-slide lazyload" data-url="' + row.url + '" data-src="' + row.url + '" style="background-image:url(' + row.url + ')"><div class="zan ' + (row.praised ? 'checked' : '') + '" data-id="' + row.id + '"></div></div>')
            });
            console.log(list);
            $('#p3-confession-swiper').html(list.join(''));
            $('#p3-confession-swiper').find('.swiper-slide').click(function () {
                $('.preview').html('<img src="' + $(this).data('url') + '">').show();
            });
            //lazyload();

            var swiper = new Swiper('#p3-confession-container', {
                effect: 'flip',
                grabCursor: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'
            });

            $('.p3 .zan').unbind('click').click(function () {
                event.stopPropagation();
                var isLogin = checkoutLogin();
                if (!isLogin) {
                    return;
                }
                if (!$(this).hasClass('checked')) {
                    var tar = $(this);
                    $.post(config.api.praise, {id: tar.data('id'), 'token': $user.token}, function (res) {
                        // if (!$user.b1_praised) {
                        //     $('.p3-got-draw').show();
                        //     $user.b1_praised = true;
                        // }
                        // console.log(res);
                        tar.addClass('checked');
                        $('.b1_draw_count').text(res.data.b1_draw_count);
                        $user.b1_praised = res.data.b1_praised;
                    }, 'json');
                } else {
                    var tar = $(this);
                    $.post(config.api.dispraise, {id: tar.data('id'), 'token': $user.token}, function (res) {
                        console.log(res);
                        tar.removeClass('checked');
                        $('.b1_draw_count').text(res.data.b1_draw_count);
                        $user.b1_praised = res.data.b1_praised;
                    }, 'json');
                }
            });
        }
    }, 'json');
}

function checkP3Input() {
    // if ($('#username').val() === '') {
    //     console.log('username can not empty');
    //     $('.p3-empty-username').show();
    //     return false;
    // }

    if ($('#mobile').val() === '') {
        console.log('mobile can not empty');
        $('.p3-empty-mobile').show();
        return false;
    }

    // if ($('#name').val() === '') {
    //     console.log('name can not empty');
    //     $('.p3-empty-name').show();
    //     return false;
    // }
    //
    // if ($('#address').val() === '') {
    //     console.log('address can not empty');
    //     $('.p3-empty-address').show();
    //     return false;
    // }

    return true;
}

function checkP3EditInput() {
    // if ($('#username2').val() === '') {
    //     console.log('username can not empty');
    //     $('.p3-empty-username').show();
    //     return false;
    // }

    if ($('#mobile2').val() === '') {
        console.log('mobile can not empty');
        $('.p3-empty-mobile').show();
        return false;
    }

    // if ($('#name2').val() === '') {
    //     console.log('name can not empty');
    //     $('.p3-empty-name').show();
    //     return false;
    // }
    //
    // if ($('#address2').val() === '') {
    //     console.log('address can not empty');
    //     $('.p3-empty-address').show();
    //     return false;
    // }

    return true;
}

function ajaxSubmitP3() {
    var data = {
        oppo_id: $user.oppoId,
        mobile: $('#mobile').val().trim(),
        name: $('#name').val().trim(),
        address: $('#address').val().trim(),
        token: $user.token,
        id: $user.win,
    };

    console.log(data);

    $.ajax({
        type: 'POST',
        url: config.api.wallSubmit,
        data: data,
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                $('.p3-draw-winner').fadeOut();
                $user.win = '';
                $('.p3-success').show();
                p3WallMineAwards();
                p3WallWinners();
            } else {
                $('.p3-error').show();
            }
        },
        error: function (xhr, errorText, errorType) {
            console.log(xhr, errorText, errorType);
            $('.p3-error').show();
        },
        dataType: 'json'
    });
}

function ajaxEditSubmitP3() {
    var data = {
        oppo_id: $user.oppoId,
        mobile: $('#mobile2').val().trim(),
        name: $('#name2').val().trim(),
        address: $('#address2').val().trim(),
        token: $user.token,
        id: $user.win,
    };

    console.log(data);

    $.ajax({
        type: 'PUT',
        url: config.api.wallSubmit,
        data: data,
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                $('.p3-edit-draw-winner').fadeOut();
                $user.win = '';
                $('.p3-success').show();
                p3WallMineAwards();
                p3WallWinners();
            } else {
                $('.p3-error').show();
            }
        },
        error: function (xhr, errorText, errorType) {
            console.log(xhr, errorText, errorType);
            $('.p3-error').show();
        },
        dataType: 'json'
    });
}

function initP3() {
    // syncP3Comments();

    setTimeout(function () {
        p3Awards();
    }, 50);

    p3WallWinners(); // 获取中奖者列表
    initP3WallDraw(); // 初始化抽奖区图片
    p3WallMineAwards(); //更新我的奖品

    $('.close').click(function () {
        $(this).parents('.shadow').fadeOut();
    });

    $('.p3-my-award').click(function () {
        var isLogin = checkoutLogin();
        if (!isLogin) {
            return;
        }
        $('.p3-winner').show();
    });

    $('.p3-edit-address').click(function () {
        $('.p3-winner').fadeOut();
        $('.p3-edit-draw-winner').show();
    });

    setTimeout(function () {
        p3WallProductions();
    }, 50);

    // $('.p3-pic3-sent').click(function () {
    //     var comment = $('#comment').val().trim();
    //     if (comment === '') return;
    //
    //     $.ajax({
    //         type: 'POST',
    //         url: config.api.leaveComment,
    //         data: {content: comment, 'token': $user.token},
    //         success: function (res) {
    //             console.log(res);
    //             if (res.code === 200) {
    //                 $('.p3-comment-success').show();
    //                 $('#comment').val('');
    //                 syncP3Comments();
    //             } else {
    //                 $('.p3-error1').show();
    //             }
    //         },
    //         error: function (xhr, errorText, errorType) {
    //             console.log(xhr, errorText, errorType);
    //             $('.p3-error1').show();
    //         },
    //         dataType: 'json'
    //     });
    // });

    $('#show-rule').click(function () {
        $('.p3-rule').show();
    });

    $('#show-draw').click(function () {
        $('.p3-draw').show();
    });

    $('.p3-draw-winner .submit').click(function () {
        console.log('submit');
        if (!checkP3Input()) {
            return;
        }

        ajaxSubmitP3();
    });

    $('.p3-edit-draw-winner .submit').click(function () {
        console.log('edit submit');
        if (!checkP3EditInput()) {
            return;
        }

        ajaxEditSubmitP3();
    });
}

function p2ExcellentWinners() {
    $.get(config.api.excellentWinners, {'token': $user.token}, function (res) {
        console.log(res);
        var tar = $('#p2-winners-swiper');
        if (res.code === 200) {
            tar.html('');
            var list = [];
            $.each(res.data, function (i, row) {
                list.push('<div class="swiper-slide"><p>恭喜 ' + row.mobile + '<br>获得 ' + (row.award ? row.award.desc : '') + ' </p></div>')
            });

            tar.html(list.join(''));

            var swiper = new Swiper('#p2-winners-container', {
                scrollbarHide: true,
                spaceBetween: 8,
                grabCursor: true,
                direction: 'vertical',
                autoplay: 2000,
                loop: true
            });
        }
    }, 'json');
}

function p2ExcellentMineAwards() {
    $.get(config.api.excellentMineAward, {'token': $user.token}, function (res) {
        console.log(res);
        var tar = $('#mine-awards');
        if (res.code === 200) {
            tar.html('');
            var list = [];
            $.each(res.data, function (i, row) {
                list.push('<li><div class="award" style="background-image: url(' + row.award.url + ');"></div></li>');
            });

            tar.html(list.join(''));
        }
    }, 'json');
}


function checkP2Input() {
    // if ($('#username').val() === '') {
    //     console.log('username can not empty');
    //     $('.p1-empty-username').show();
    //     return false;
    // }

    if ($('#mobile').val() === '') {
        console.log('mobile can not empty');
        $('.p1-empty-mobile').show();
        return false;
    }

    return true;
}

function checkP2EditInput() {
    // if ($('#username2').val() === '') {
    //     console.log('username can not empty');
    //     $('.p1-empty-username').show();
    //     return false;
    // }

    if ($('#mobile2').val() === '') {
        console.log('mobile can not empty');
        $('.p1-empty-mobile').show();
        return false;
    }

    return true;
}

function ajaxSubmitP2() {
    var data = {
        oppo_id: $user.oppoId,
        mobile: $('#mobile2').val().trim(),
        token: $user.token,
        id: $user.win,
        name: $('#name2').val().trim(),
        address: $('#address2').val().trim()
    };

    console.log(data);

    $.ajax({
        type: 'POST',
        url: config.api.excellentSubmit,
        data: data,
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                $('.p2-draw-winner').fadeOut();
                $user.win = '';
                $('.p1-success').show();
                p2ExcellentWinners();
                p2ExcellentMineAwards();
            } else {
                $('.p1-error').show();
            }
        },
        error: function (xhr, errorText, errorType) {
            console.log(xhr, errorText, errorType);
            $('.p1-error').show();
        },
        dataType: 'json'
    });
}

function ajaxEditSubmitP2() {
    var data = {
        oppo_id: $user.oppoId,
        mobile: $('#mobile2').val().trim(),
        token: $user.token,
        id: $user.win,
        name: $('#name2').val().trim(),
        address: $('#address2').val().trim()
    };

    console.log(data);

    $.ajax({
        type: 'PUT',
        url: config.api.excellentSubmit,
        data: data,
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                $('.p2-edit-draw-winner').fadeOut();
                $user.win = '';
                $('.p1-success').show();
                p2ExcellentWinners();
                p2ExcellentMineAwards();
            } else {
                $('.p1-error').show();
            }
        },
        error: function (xhr, errorText, errorType) {
            console.log(xhr, errorText, errorType);
            $('.p1-error').show();
        },
        dataType: 'json'
    });
}

function initP2() {
    initRotate();
    p2ExcellentWinners();
    p2ExcellentMineAwards();
    $('.shadow .close').click(function () {
        $(this).parents('.shadow').fadeOut();
    });
    $('#p2-show-rule').click(function () {
        $('.p2-vote').show();
    });

    $('#p2-show-draw').click(function () {
        $('.p2-draw').show();
    });

    $('.p2-my-award').click(function () {
        var isLogin = checkoutLogin();
        if (!isLogin) {
            return;
        }
        $('.p2-winner').show();
    });

    $('.p2-edit-address').click(function () {
        $('.p2-winner').fadeOut();
        $('.p2-edit-draw-winner').show();
    });

    $('#p2-up-frame .btn').unbind('click').click(function () {
        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
        } else {
            if ($('#p2-up-frame .btn.checked').length >= 3) {
                return;
            } else {
                $(this).addClass('checked');
            }
        }

        $('.p2-vote-selected').text($('#p2-up-frame').find('.checked').length);
    });
    $.get(config.api.excellentProduction, {'token': $user.token}, function (res) {
        console.log(res);
        if (res.code === 200 && res.data.length > 0) {
            var list = [];
            $.each(res.data, function (i, row) {
                list.push('<li style="background-image:url(' + row.url + ')"><div class="btn ' + (row.voted ? '' : '') + '" data-id="' + row.id + '"></div></li>')
            });
            console.log(list);
            $('#p2-up-frame').html(list.join(''));

            $('#p2-up-frame .btn').unbind('click').click(function () {
                if ($('#p2-up-frame .btn.checked').length >= 3) {
                    return;
                }
                if (!$(this).hasClass('checked')) {
                    $(this).addClass('checked');
                } else {
                    $(this).removeClass('checked');
                }

                $('.p2-vote-selected').text($('#p2-up-frame').find('.checked').length);
            });
        }
    }, 'json');

    $('#p2-vote').click(function () {
        var isLogin = checkoutLogin();
        if (!isLogin) {
            return;
        }
        var selected = $('#p2-up-frame').find('.checked').length;
        if (selected <= 0) {
            $('.p2-empty-vote').show();
            return false;
        }

        var ids = [];
        $('#p2-up-frame').find('.checked').each(function () {
            ids.push($(this).data('id'));
        });

        $.post(config.api.vote, {ids: ids, 'token': $user.token}, function (res) {
            if (res.code === 200) {
                $('.a1_draw_count').text(res.data.a1_draw_count);
                //alert('成功参与，获得一次抽奖机会');
                if (!$user.a1_voted) {
                     $user.a1_voted = true;
                     $("#p2-vote").unbind("click");
                     $('.p2-got-draw-first').show();
                }
            } else {
                $('.p1-error').show();
            }
        }, 'json')

    });

    $('.p2-draw-winner .submit').click(function () {
        console.log('submit');
        if (!checkP2Input()) {
            return;
        }

        ajaxSubmitP2();
    });

    $('.p2-edit-draw-winner .submit').click(function () {
        console.log('submit');
        if (!checkP2EditInput()) {
            return;
        }

        ajaxEditSubmitP2();
    });
}

function initRotate() {
    var turnplate = {
        restaraunts: [],                //大转盘奖品名称
        colors: [],                 //大转盘奖品区块对应背景颜色
        outsideRadius: 240,         //大转盘外圆的半径
        textRadius: 155,                //大转盘奖品位置距离圆心的距离
        insideRadius: 68,           //大转盘内圆的半径
        startAngle: 0,              //开始角度
        randomRate: [],              //控制获奖率，百分制(相加需等于100%)，对应restaraunts(顺序需要保持一致)，
        bRotate: false              //false:停止;ture:旋转
    };

    $(document).ready(function () {
        //动态添加大转盘的奖品与奖品区域背景颜色
        turnplate.randomRate = ["20%", '10%', '10%', '10%', '50%'];  //小心设置按100%分配
        turnplate.restaraunts = ["黄铜书签", "羽毛笔","谢谢参与", "星星彩灯", "谢谢参与"];
        turnplate.colors = ["#353535", "#282828", "#464646", "#171717", "#928c8c"];


        var rotateTimeOut = function () {
            $('#wheelcanvas').rotate({
                angle: 0,
                animateTo: 2160,
                duration: 8000,
                callback: function () {
                    $('.p1-error').show();
                }
            });
        };

        //旋转转盘 item:奖品位置; txt：提示语;
        var rotateFn = function (item, txt) {
            var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
            if (angles < 270) {
                angles = 270 - angles;
            } else {
                angles = 360 - angles + 270;
            }
            $('#wheelcanvas').stopRotate();
            $('#wheelcanvas').rotate({
                angle: 0,
                animateTo: angles + 1800,
                duration: 8000,
                callback: function () {
                    // alert(txt);
                    console.log(item, txt);

                    if (item === 5) {
                        $('.p1-no-winner').show();
                    } else {
                        console.log('win');
                        $('.p2-draw-winner').show();
                    }

                    turnplate.bRotate = !turnplate.bRotate;
                }
            });
        };

        $('.p2-up-raffle').click(function () {
            var isLogin = checkoutLogin();
            if (!isLogin) {
                return;
            }
            var $canDraw = parseInt($('.a1_draw_count').text());
            if (parseInt($canDraw) <= 0) {
                if (!$user.a1_voted) {
                    $('.p2-vote-first').show();
                    return;
                } else {
                    $('.p2-nextday').show();
                    return;
                }
            }
            $('.a1_draw_count').text($canDraw - 1);

            if (turnplate.bRotate) return;
            turnplate.bRotate = !turnplate.bRotate;

            //获取随机数(奖品个数范围内)
            // var item = rnd(turnplate.randomRate);
            // rotateFn(item, turnplate.restaraunts[item - 1])

            $.post(config.api.excellentDraw, {'token': $user.token}, function (res) {
                console.log(res);
                if (res.code === 200) {
                    var item = res.data.item;
                    $user.a1_voted = res.data.a1_voted;
                    $user.win = res.data.winner.id;
                    //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
                    rotateFn(item, turnplate.restaraunts[item - 1]);
                }
            }, 'json');
        });
    });

    function rnd(rate) {
        var random = Math.floor(Math.random() * 100);
        var myRandom = [];
        var randomList = [];
        var randomParent = [];
        for (var i = 0; i < 100; i++) {
            myRandom.push(parseInt([i]) + 1);
        }
        for (var i = 0; i < rate.length; i++) {
            var temp = [];
            var start = 0;
            var end = 0;
            randomList.push(parseInt(rate[i].split('%')[0]));
            for (var j = 0; j < randomList.length; j++) {
                start += randomList[j - 1] || 0
                end += randomList[j]
            }
            temp = myRandom.slice(start, end);
            randomParent.push(temp)
        }
        for (var i = 0; i < randomParent.length; i++) {
            if ($.inArray(random, randomParent[i]) > 0) {
                return (i + 1)
            }
        }

    }


//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
    window.onload = function () {
        drawRouletteWheel();
    };

    function drawRouletteWheel() {
        console.log('drawRouletteWheel');
        var canvas = document.getElementById("wheelcanvas");
        if (canvas.getContext) {
            //根据奖品个数计算圆周角度
            var arc = Math.PI / (turnplate.restaraunts.length / 2);
            var ctx = canvas.getContext("2d");
            //在给定矩形内清空一个矩形
            ctx.clearRect(0, 0, turnplate.outsideRadius * 2, turnplate.outsideRadius * 2);
            //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
            ctx.strokeStyle = "#237b51";
            //font 属性设置或返回画布上文本内容的当前字体属性
            ctx.font = '30px Microsoft YaHei';
            for (var i = 0; i < turnplate.restaraunts.length; i++) {
                var angle = turnplate.startAngle + i * arc;
                ctx.fillStyle = turnplate.colors[i];
                ctx.beginPath();
                //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                ctx.arc(turnplate.outsideRadius, turnplate.outsideRadius, turnplate.outsideRadius, angle, angle + arc, false);
                ctx.arc(turnplate.outsideRadius, turnplate.outsideRadius, turnplate.insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                //锁画布(为了保存之前的画布状态)
                ctx.save();

                //----绘制奖品开始----
                // ctx.fillStyle = "#237b51";
                ctx.fillStyle = "#fff";
                var text = turnplate.restaraunts[i];
                var line_height = 31;
                //translate方法重新映射画布上的 (0,0) 位置
                ctx.translate(turnplate.outsideRadius + Math.cos(angle + arc / 2) * turnplate.textRadius, turnplate.outsideRadius + Math.sin(angle + arc / 2) * turnplate.textRadius);

                //rotate方法旋转当前的绘图
                ctx.rotate(angle + arc / 2 + Math.PI / 2);

                /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                if (text.indexOf("M") > 0) {//流量包
                    var texts = text.split("M");
                    for (var j = 0; j < texts.length; j++) {
                        ctx.font = j == 0 ? 'bold 30px Microsoft YaHei' : '30px Microsoft YaHei';
                        if (j == 0) {
                            ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
                        } else {
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    }
                } else if (text.indexOf("M") == -1 && text.length > 6) {//奖品名称长度超过一定范围
                    text = text.substring(0, 6) + "||" + text.substring(6);
                    var texts = text.split("||");
                    for (var j = 0; j < texts.length; j++) {
                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                    }
                } else {
                    //在画布上绘制填色的文本。文本的默认颜色是黑色
                    //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                }

                //添加对应图标
                if (text.indexOf("猫币") > 0) {
                    var img = document.getElementById("shan-img");
                    img.onload = function () {
                        ctx.drawImage(img, -15, 10);
                    };
                    ctx.drawImage(img, -15, 10);
                } else if (text.indexOf("谢谢参与") >= 0) {
                    var img = document.getElementById("sorry-img");
                    img.onload = function () {
                        ctx.drawImage(img, -15, 10);
                    };
                    ctx.drawImage(img, -15, 10);
                }
                //把当前画布返回（调整）到上一个save()状态之前
                ctx.restore();
                //----绘制奖品结束----
            }
        }
    }
}

function loadImage() {
    var preload = new createjs.LoadQueue();
    preload.addEventListener("fileload", handleFileComplete);
    // preload.loadFile("http://7xqoke.com1.z0.glb.clouddn.com/vanke-weiyuan/fonts/xjlFont.fon?#iefix");
    // preload.loadFile("http://7xqoke.com1.z0.glb.clouddn.com/vanke-weiyuan/images/logo.png");
    // $.each(window.school, function (key, rows) {
    //   $.each(rows, function (k, s) {
    //     preload.loadFile(s.bg);
    //   })
    // });

    if ($(document).find('.p1').length > 0) {
        //首页 A-1
        preloadP1(preload);
    }

    if ($(document).find('.p2').length > 0) {
        //转盘抽奖页
        preloadP2(preload);
    }

    if ($(document).find('.p3').length > 0) {
        //告白墙
        preloadP3(preload);
    }
}

function preloadP1(preload) {
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/login-bg.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p-send-code-success.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p-send-code-error.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p-mobile-empty.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1_01.jpg");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1_02.jpg");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1_03.jpg");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1_04.jpg");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_bg.jpg");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_01.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_02.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_join-error.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_join-success.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_jury-bg.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_jury-01.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_jury-02.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_jury-03.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_jury-04.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_jury-05.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_upload-error.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_upload-max5m.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-upload-max10m.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-2_upload-success.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-empty-img.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p1-empty-rule.png");
}

function preloadP2(preload) {
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/login-bg.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p-send-code-success.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p-send-code-error.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p-mobile-empty.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-bg.jpg");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-01.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_raffle.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_raffle-model.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_vote-model.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_raffle.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_empty-vote.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_got-draw.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_got-draw-first.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_raffle-rule-text.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_vote.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_vote-first.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-change-address.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-change-address-bg.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_nextday.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_no-winner.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_my-prize-bg.png");
}

function preloadP3(preload) {
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/login-bg.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p-send-code-success.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p-send-code-error.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p-mobile-empty.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_bg.jpg");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1-01.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1-02.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_draw-model.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_rule-model.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_my-prize-bg.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_winner-bg.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_nextday.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_no-winner.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_praise-first.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_zan-checked.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_zan-checked.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p3/p3-1_zan-default.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-change-address.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-change-address-bg.png");
    preload.loadFile("http://fonts.b0.upaiyun.com/font-activity/images/p2/p2-1_got-draw-first.png");
}
function handleFileComplete() {
    console.log('load');
}