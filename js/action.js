/**
 * @author: Caden
 * @description:
 * @Date: 10/29 0029 16:43
 */

function tips() {
    layer.tips("出了点问题，不过这不怪我，是你网速太慢了(ˇˍˇ)，我再给你试试看。 ", ".inputwords", {
        tips: [2, 'deepskyblue']
    });
    translate();
}


function show(data) {
    var $table = $("<table class='table table-striped'><tbody><\/tbody><\/table>");
    var $tr1 = $("<tr><td>基本释义<\/td><td>" + data.translation + "<\/td><\/tr>");

    if (data.basic) {
        var $tr2 = $("<tr><td>发音<\/td><\/tr>");
        var $tr3 = "";
        var read = [];
        $.each(data.basic, function (i, n) {
            if (i == "phonetic") {
                read.push(n);
            }

            if (i == 'us-phonetic') {
                read.push("【美】" + n);
            }
            if (i == 'uk-phonetic') {
                read.push("【英】" + n);
            }
            if (i == 'explains') {
                $tr3 = $("<tr><td>扩展释义<\/td><td>" + n.join("，") + "<\/td><\/tr>")
            }
        });
        var $td = $("<td>" + read.sort().join("，") + "<\/td>");
        $tr2.append($td);
    }

    if (data.web) {
        var $tr4 = $("<tr><td>相关释义<\/td><\/tr>");
        var about = [];
        $.each(data.web, function (i, n) {
            about.push(n.value + "【" + n.key + "】");
        });

        var $td2 = $("<td>" + about.join("<br/>") + "<\/td>");
        $tr4.append($td2);
    }

    $table.append($tr1);
    $table.append($tr2);
    $table.append($tr3);
    $table.append($tr4);


    $("input").after($table);
}

// $("input").on("change", function () {
//     setTimeout(function () {
//         translate();
//     }, 1500)
// });

$("input").on("keydown", function (e) {
    if (e.keyCode == 13) {
        translate();
    }
})

function translate() {
    if ($("input").val().length == 0) {
        return;
    }
    $("table").remove();
    var startTime = 0;
    var timer = setInterval(function () {
        startTime++;
        if (startTime > 3) {
            if ($("table").length == 0) {
                tips();
            }
            clearInterval(timer);
        }
    }, 1000);
    var words = $("input").val();
    var tranStr = 'http://fanyi.youdao.com/openapi.do?keyfrom=TranslationNow&key=1884208507&type=data&doctype=jsonp&callback=show&version=1.1&q=' + words;
    var $script = $("<script src=" + tranStr + "><\/script>");
    $("body").append($script);
    $script.remove();
}