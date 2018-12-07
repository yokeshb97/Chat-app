const expect=require('expect');

const {Users}=require('./users');


describe('Users',()=>{
var users;
  beforeEach(()=>{
    users=new Users();
    users.users=[{
      id:'123',
      name:'Yoks',
      room:'Node'
    },{
      id:'132',
      name:'Maks',
      room:'ML'
    },{
      id:'143',
      name:'Krish',
      room:'Node'
    }];
  });

  it('should add new user',()=>{
    var users=new Users();
    var user={
      id:'123',
      name:'Yoks',
      room:'Node'
    };
    var res=users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return name for node course',()=>{
    var list=users.getUserList('Node');
    expect(list).toEqual(['Yoks','Krish']);
  });

  it('should return name for ml course',()=>{
    var list=users.getUserList('ML');
    expect(list).toEqual(['Maks']);
  });
  it('should find user',()=>{
    var user={
      id:'123',
      name:'Yoks',
      room:'Node'
    };
    var a=users.getUser('123');
    expect(a).toEqual(user);
  });
  it('should not find user',()=>{
    var a=users.getUser('1');
    expect(a).toNotExist();
  });
  it('should remove user',()=>{
    var user={
      id:'123',
      name:'Yoks',
      room:'Node'
    };
    var a=users.removeUser('123');
    expect(a).toEqual(user);
    expect(users.users.length).toBe(2);
  });
  it('should not remove user',()=>{
    var a=users.removeUser('1');
    expect(a).toNotExist();
    expect(users.users.length).toBe(3);
  });


});
