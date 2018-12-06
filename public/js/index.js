var socket=io();

socket.on('connect',function(){
  console.log('Connected to server');


});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

socket.on('newMessage',function(msg){
  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var li=jQuery('<li></li>');
  li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(msg){
  var li=jQuery('<li></li>');
  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var a=jQuery('<a target="_blank">My current location</a>');
  li.text(`${msg.from} ${formattedTime}: `);
  a.attr('href',msg.url);
  li.append(a);
  jQuery('#messages').append(li)
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
