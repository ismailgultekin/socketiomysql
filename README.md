# socketiomysql
Socketio &amp; Mysql

Kurulum
npm install
npm init -y //package.json oluşturuyoruz
npm install socket.io
npm install express
npm install mysql
npm install nodemon

Veri tabani için localde bir veritabanı oluşturup içine socketmesaj tablosu 3 sütunlu olacak şekilde
id, (serial)
mesaj, (text)
user (varchar)

//Nodejs Mysqle veri tabani baglantisi
var mysql = require('mysql');
var baglanti = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'veritabaniadi'
});

//Bağlantımızı connect yapiyoruz
    baglanti.connect();

Veri eklemek için
    var mesajs = {mesaj:veri.mesaj, user:veri.kullanici};
    var ekle   = baglanti.query('insert into socketmesaj set ?', mesajs, function(hata, cevap)
        {
            console.log(ekle.sql);
        });

npm start


