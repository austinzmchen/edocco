$(document).ready(function(){
    $("head").append("<link>");
    <!--include css library-->
    var css1 = $("head").children(":last");
    css1.attr({
        rel:  "stylesheet",
        type: "text/css",
        href: "js/lib/bootstrap-editable/css/bootstrap-editable.css"
    });
    $("head").append("<link>");
    var css2 = $("head").children(":last");
    css2.attr({
        rel:  "stylesheet",
        type: "text/css",
        href: "js/lib/bootstrap/css/bootstrap.css"
    });
    $("head").append("<link>");
    var css3 = $("head").children(":last");
    css3.attr({
        rel:  "stylesheet",
        type: "text/css",
        href: "js/lib/inputs-ext/wysihtml5/bootstrap-wysihtml5-0.0.2/bootstrap-wysihtml5-0.0.2.css"
    });
    $("head").append("<link>");
    var css4 = $("head").children(":last");
    css4.attr({
        rel:  "stylesheet",
        type: "text/css",
        href: "docco.css"
    });
    $("head").append("<link>");
    var css5 = $("head").children(":last");
    css5.attr({
        rel:  "stylesheet",
        type: "text/css",
        media: "all",
        href: "css/app.css"
    });

    // dirty trick to sequencially load multiple libraries without introducing third party include .js
    $.getScript("js/lib/bootstrap/js/bootstrap.js", function(){
        $.getScript("js/lib/bootstrap-editable/js/bootstrap-editable.js", function () {
            $.getScript("js/lib/inputs-ext/wysihtml5/bootstrap-wysihtml5-0.0.2/wysihtml5-0.3.0.min.js", function () {
                $.getScript("js/lib/inputs-ext/wysihtml5/bootstrap-wysihtml5-0.0.2/bootstrap-wysihtml5-0.0.2.min.js", function () {
                    $.getScript("js/lib/inputs-ext/wysihtml5/wysihtml5.js", function () {

                        // adding fixtures
                        $('#container').prepend(
                            '<!--added dom divs buttons/backgrounds -->' +
                            '<div id="changeButton"></div>' +
                            '<a id="gaiButton" href="https://github.com/austinzmchen/editable-annotated-source"></a>' +
                            '<div id="background2"></div>'
                        );

                        // insert html to each li element
                        var i = 0;
                        var keyPrefix = $('title').html() + '-';
                        $.each($('.sections>li'), function () {
                            if (i!=0) { // skip the title
                                $(this).append('<div id="' + keyPrefix + 'edittext' + i  + '" class="editarea" data-type="wysihtml5">');
                            }
                            i++;
                        });

                        for (var i = 1; i < $('.editarea').length + 1; i++) {
                            var key = keyPrefix + 'edittext' + i;
                            var value = localStorage[key];
//                console.log("localStorage key " + key);
//                console.log("localStorage value " + value);
                            $('#' + key).html(value);
                        };

                        $('.editarea').editable({
                            // url: '/post', // turn url off for local storage
                            title: 'Enter Notes',
                            success: function(response, newValue) {
//                    console.log("editable success " + newValue);
                                localStorage[this.id] = newValue;
                            },
                            error: function() {
                                console.log("editable error.");
                            }
                        });

                        $('#background2').width(0);
                        $('.editarea').css('opacity', 0);
                        $('#changeButton').css('right', 20);
                        $('#gaiButton').css('opacity', 0);
                        $('#changeButton').on('click', function() {

                            if ($('#background2').width() == 0) {
                                console.log('changeButton clicked.')
                                $('#background2').animate({width: "350"}, 'fast');
                                $('.editarea').animate({opacity: "1"}, 'slow');
                                $('#changeButton').animate({right: "290"}, 'fast');

                                // gai button animation pre-config
                                $('#gaiButton').css('right', 290);

                                // gai button animation
                                $('#gaiButton').animate({opacity: "1"}, { duration: 1500, queue: false });
                                $('#gaiButton').animate({right: "250"}, { duration: 1500, queue: false });
                            } else {
                                // gai button animation
                                $('#gaiButton').stop();
                                $('#gaiButton').css('opacity', 0);

                                $('.editarea').animate({opacity: "0"}, 'fast');
                                $('#background2').animate({width: "0"}, 'fast');
                                $('#changeButton').animate({right: "20"}, 'fast');
                            };
                        });
                    });
                });
            });
        });
    });
});