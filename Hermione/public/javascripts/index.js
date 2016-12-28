$('.split').css('height', 80 + $('#vid').css('height') + "px");
$('.left')
    .mouseenter(function() {
        $(this).css("background-color", "rgba(0,50,98,0.5)");
    })
    .mouseleave(function() {
        $(this).css("background-color", "rgba(0,50,98,0.1)");
    });
$('.right')
    .mouseenter(function() {
        $(this).css("background-color", "rgba(253,181,21,0.5)");
    })
    .mouseleave(function() {
        $(this).css("background-color", "rgba(253,181,21,0.1)");
    });
