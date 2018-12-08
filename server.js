var express = require('express');
var app = express();

var sunucu = app.listen(8000);
var io = require('socket.io').listen(sunucu);

var yol = require('path');

//Nodejs Mysqle veri tabani baglantisi
var mysql = require('mysql');
var baglanti = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'360plusmedya'
});

baglanti.connect();

io.sockets.on('connection', function(socket) {
    //console.log('socket baglandi');

    socket.on('gonder', function(veri){
        //console.log(veri);

        //Islem yapan kullaniciya veriyi dondurme
            //socket.emit('all', veri);
        //Tüm kullanicilara veriyi gönderme
            io.sockets.emit('all', veri);
    });

    socket.on('mesaj', function(veri){
        console.log('mesaj geldi' + veri.mesaj + " ** "+ veri.kullanici);

        //veri tabanina kaydediyoruz
            var mesajs = {mesaj:veri.mesaj, user:veri.kullanici};
            var ekle   = baglanti.query('insert into socketmesaj set ?', mesajs, function(hata, cevap)
            {
                console.log(ekle.sql);
            });


        
        //mesajlari tekrar geri gonderip kullanicilara gosterecegiz
            io.sockets.emit('mesajlarial', veri); 
    });
    
});



app.get('/socket.html', function(req, res){
    res.sendFile(yol.join(__dirname + "/socket.html"));
});



console.log('Sunucu Aktif');

