﻿//common.js
(function (window, $) {

    //文档元素
    var document = window.document,
    //文档$对象
        $doc = $(document),
    //body $对象
        $body = $(document.body);


    /**
     * 是否显示二维码(默认为true)
     * @type {boolean}
     */
    $.isShowQrcode = true;

    /**
     * 是否为移动端
     * @type {boolean}
     */
    $.isMobi = /(iPhone|iPod|iPad|android|windows phone os|iemobile)/i.test(window.navigator.userAgent);


    /**
     * 显示/隐藏mask函数
     * @param isShow 是否显示
     */
    $.toggleMask = (function () {
        var $mask = $('#mask');
        if ($mask.length === 0) {
            $mask = $('<div id="mask"><i class="spinner"></i></div>');
            $body.append($mask);
        }
        return function (isShow) {
            isShow ? $mask.addClass('visible') : $mask.removeClass('visible');
        };
    })();


    //文档加载完成
    $(function () {

        //添加class
        $body.addClass('loaded');

        //a标签touch
        $doc.on('touchstart', 'a', function () {
            $(this).addClass('focus');
        });
        $doc.on('touchend', 'a', function () {
            $(this).removeClass('focus');
        });

        //pc端二维码
        $.isShowQrcode && !$.isMobi && $.jsonp('http://img.gd.sohu.com/js/qrcode.js', function () {
                var $qrcode = $('#qrcode');
                if ($qrcode.length === 0) {
                    $qrcode = $('<div id="qrcode"></div>');
                    $body.append($qrcode);
                    new QRCode($qrcode[0], {
                        width: $qrcode.width(),
                        height: $qrcode.height(),
                        text: location.href
                    });
                }
                $doc.on('click', '#qrcode', function () {
                    $qrcode.fadeOut();
                });
            }
        );

    });

})(this, $);