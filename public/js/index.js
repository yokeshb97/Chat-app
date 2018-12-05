var socket=io();

socket.on('connect',function(){
  console.log('Connected to server');


});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});

socket.on('newMessage',function(msg){
  console.log('New msg',msg);
  var li=jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(msg){
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My current location</a>');
  li.text(`${msg.from}: `);
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

  });
});

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
if(!navigator.geolocation){
    return alert('Geolocation not suported by your browser');
}
navigator.geolocation.getCurrentPosition(function(position){
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
});
},function(){
  alert('Unable to fetch location');
});
});
