const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));
const PORT = 5001;

const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const { Strategy } = require('passport-local'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const server = express();

// server.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

// server.listen(PORT);

//ルーティング設計 
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/user", authRoutes);
//DBと接続
const start = async () => {
    try {
        await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
            app.listen(process.env.PORT || PORT, console.log("server started"));
    } catch (err){
        console.log(err);
    }
}


mongoose.connect(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL,{useNewUrlParser: true});
const db =  mongoose.connection;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String
});

db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({extended: true}));
//body-parserはrequest streamをまるまる抽出してreq.bodyとして扱えるようにするミドルウェア。
//後でindex.htmlのformから受け取った値を認証するための関数に渡すために必要。

app.use(cookieParser());//cookieをparse
app.use(session({ resave: false, saveUninitialized:false, secret: 'something quite long and nonsense',
    cookie: {
        secure: false,
        maxAge: 3600000
    }
}));//expressアプリケーションにおいてセッションを用いることの宣言。
//これは下記のpassport.sessionより上位になければ正常に動作しない。
//secretは長くてあなたのオリジナルであればなんでもいい。

app.use(passport.initialize());//passport初期化のためのミドルウェア
app.use(passport.session());//cookieによるセッション維持を可能にするためのミドルウェア

passport.use(new Strategy //認証のための関数の宣言
    (async (username, password, done) => {
        try{
            await db.model('database', userSchema, 'users')
            .findOne({username: username}, (err, user) => {
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false);
                }
                if(user.toObject().password != password){
                    return done(null, false);
                }
                return done(null, user);
            })
        } catch(err) {
            console.log(err);
        }
    }
));

app.post('/admin', passport.authenticate('local', {failureRedirect:'/' }),
    (req, res) => {
        res.send('Success!');
    }
);

app.get('/admin',(req, res) => {
    if(!req.user){//下記のデシリアライズ処理でユーザー情報がreq streamにあるか判断する
        res.redirect('/');
    }
    else{
        res.send('still logged in!')
    }
});

passport.serializeUser( (user, cb) => {
    cb(null, user);
});//認証に成功しセッションが確立されたら
//ブラウザのcookieに保存させるため情報をバイトコードに変換する処理

passport.deserializeUser( async (id, cb) => {
    try{
        await db.model('database', userSchema, 'users').findById(id, (err, user) => {
            cb(err, user);
        })
    } catch(err) {
        console.log(err);
    }
});
//passportミドルウェアより必要に応じてユーザー情報を最並列化して返す処理
//req.userでリクエストから情報を受け渡せるようになる

start();