"use strict";
function getChannelInfo(){
        let output, active;
    let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "customer404"];
        channels.forEach((channel) => {
        $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+channel , (data) => {
            let status = data.stream !== null ? (data.stream.game+': '+data.stream.channel.status):'offline';
            active = status === 'offline'?'offline':'online';
            $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/'+channel, (response) => {
            let logo = response.logo != null ?response.logo:'http://via.placeholder.com/150x150';
            let name = response.display_name === undefined?'closed': response.display_name;
            let url = response.url != null? response.url:"#";
             if(status === 'offline'){
             $('#content').append('<div class="streamer offline">'+
                '<img src="'+logo+'" alt="" class="streamer-logo">'+
                '<p class="streamer-name">'+name+'</p>'+
                '<p class="streamer-status">'+status+'</p>'+
                '</div>'); 
             }else{
            $('#content').prepend('<div class="streamer online">'+
                '<img src="'+logo+'" alt="" class="streamer-logo">'+
                '<p class="streamer-name">'+name+'</p>'+
                '<p class="streamer-status">'+status+'</p>'+
                '</div>');
             }
        }, (err) => {
            console.log(err);
                alert(err);
        });
        }, function(err){
            console.log(err);
            alert(err);
        });
    });
}
$(document).ready(function() {
    getChannelInfo();
    $('button').click(function(){
        $('button').removeClass('button-active');
        $(this).addClass('button-active');
        $('.streamer').slideUp(700);
        this.id === 'all' ? $('.streamer').slideDown(700): $('.'+this.id).slideDown(700);
    });
});