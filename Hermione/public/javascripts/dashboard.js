/** Initialize dashboard using JQuery*/
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
        $('#video-frame').attr('src', "//www.youtube.com/embed/" + id);
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

    

