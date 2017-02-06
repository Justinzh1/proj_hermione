/** Initialize dashboard using JQuery 
    Later plan on siwtching this to REACT or Angular.js */
$(document).ready(function() {
    var videos = $('.video-item');
    var video_container = $('#video-container');
    if (videos.length > 0) {
        $('.video-item:first').attr('id','active');
        var url = $('#active > #url').first().attr('href');
        var id = getId(url);
        var video = '<iframe width="100%" id="video-frame" height="100%" src="//www.youtube.com/embed/' 
        + id + '" frameborder="0" allowfullscreen></iframe>';
        video_container.html(video);
    }
    $('.class-dashboard-card:nth-child(2)').attr('id', 'active-card');
});

$('.class-dashboard-card').click(function() {
    if ($(this).attr('id') != 'active-card') {
        window.location.href = '/ee16a';
    }
});

$('.enroll').click(function() {
    $(this).val('');
    $(this).keypress(function(e) {
        $('#submit-btn').css({'background-color': '#003262', "color" : "white", "border" : "#003262 3px solid"});
    })
});

$('.class-dashboard-new').click(function() {
    $('.enroll-bg').show("medium");
    $('.enroll-module').show("medium");
});

$('.enroll-bg').click(function() {
    $('.enroll.module').hide("medium");
    $(this).hide("medium");
});

$('.video-item').click(function(){
    if ($(this).attr('id') == 'active') {
        console.log('already active');
    } else {
        $('#active').attr('id', 'reg');
        $(this).attr('id', 'active');
        $('#video-name').text($("#active > #url").text());
        var video_container = $('#video_container');
        var url = $(this).find('#url').attr('href');
        var id = getId(url);
        console.log("//www.youtube.com/embed/" + id + "?enablejsapi=1&origin=http://localhost");
        $('#video-frame').attr('src', "//www.youtube.com/embed/" + id + "?enablejsapi=1&origin=http://localhost");
    }
});

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

    

