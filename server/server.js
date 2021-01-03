const port = process.env.PORT || 3000; 
const io = require('socket.io')(3001,{
    cors: {
        //localhost:port adresinden gelen isteklere izin ver
        origin:`http://localhost:${port}`,
        methods: ["GET","POST"]
    }
});
console.log("Uygulama localhost:3001 adresini dinliyor");

//Kullanıcıların tutulduğu nesne
const users={};

//Yeni bağlantı
io.on('connection',socket => {
    //Bağlanan kullanıcıyı kaydet 
    //ve diğer kullanıcılara sohbete katıldığını bildir
    socket.on('new-user',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name);
        console.log(name, "sohbete katıldı");
    });

    //Gelen mesajı diğer kullanıcılara gönder
    socket.on('send-chat-message',message=>{
        console.log(users[socket.id],":",message);
        socket.broadcast.emit('chat-message', {message,name:users[socket.id ]});
    });

    //Bağlantısını kesen kullanıcıyı sil
    //ve diğer kullanıcılara sohbetten ayrıldığını bildir
    socket.on('disconnect',()=>{
        console.log(users[socket.id],"sohbetten ayrıldı");
        socket.broadcast.emit('user-disconnected',users[socket.id]);
        delete users[socket.id];
    });
});
