var socket=io();

function scrollToBottom(){
  var messages=jQuery("#messages");
  var newMessage=messages.children('li:last-child');

  var clientHeight=messages.prop('clientHeight');
  var scrollHeight=messages.prop('scrollHeight');
  var scrollTop=messages.prop('scrollTop');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight + scrollTop +newMessageHeight +lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function(){
    console.log('Connected to server');
});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

socket.on('newMessage',function(msg){
  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:msg.text,
    frm:msg.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();

/*  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var li=jQuery('<li></li>');
  li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
  jQuery('#messages').append(li); */
});

socket.on('newLocationMessage',function(msg){

  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var template=jQuery('#location-message-template').html();
  var html=Mustache.render(template,{
    url:msg.url,
    frm:msg.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});



jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){
    jQuery('[name=message]').val('')
  });
});

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
if(!navigator.geolocation){
    return alert('Geolocation not suported by your browser');
}
locationButton.attr('disabled','disabled').text('Sending location...');


navigator.geolocation.getCurrentPosition(function(position){
  locationButton.removeAttr('disabled').text('Send location');

  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
});
},function(){
  locationButton.removeAttr('disabled').text('Send location');
  alert('Unable to fetch location');
});
});
