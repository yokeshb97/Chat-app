var expect=require('expect');

var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
    var from='Yoks';
    var text='Hello';
    var msg=generateMessage(from,text);

    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({
      from,
      text
    });
  });

});

describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    var from='Yoks';
    var latitude = '11.12' ;
    var longitude = '78.65';
    var msg=generateLocationMessage(from,latitude,longitude);

    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({
      from,
      url:'https://www.google.com/maps/?q=11.12,78.65'
    });
  });

});
