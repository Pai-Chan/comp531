const md5 = require('md5')

const cookieKey = 'sid'

const data = []

const createRandomSalt = () => {
	return md5(Math.random())
}

const createHash = (password, salt) => {
	return md5(password + salt)
}

const queryHashByUsername = (username, data) => {

	function isThisUsername(item) {
		return item.username === username
	}
	return data.find(isThisUsername)
}

const actRegister = (req, res) => {
	console.log('Payload received', req.body)
	res.status(200).send({result: 'success', username: req.body.username})
}

const actLogin = (req, res) => {
	console.log('Payload received', req.body)
	res.status(200).send({username: req.body.username, result: 'success'})
}

const actLogout = (req, res) => {
	res.status(200).send('OK')
}

const actChangePassword = (req, res) => {
	res.status(200).send({username: 'Scott', status:'will not change'})
}

//use facebook authentication
const callbackURL = 'http://localhost:3000/auth/callback'
const config = {
	clientSecret: '124d6d71bc38d8748972ca84db895c2b',
	clientID: '1783965338584990',
	callbackURL
}

var users = []
var session = require('express-session')
var cookieParser = require('cookie-parser')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy 

passport.serializeUser(function(user, done){
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
	var user = users[id]
	done(null, user)
})

passport.use(new FacebookStrategy(
	config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			return done(null, profile)
		})
	}
))

const profile = (req, res) => {
	res.send({'ok now what?':req.user})
}

module.exports = app => {
	app.use(session({secret: 'ThisIsMySecret'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.post('/login', actLogin)
	app.put('/logout', actLogout)
	app.post('/register', actRegister)
	app.put('/password', actChangePassword)
	app.use('/login/facebook', passport.authenticate('facebook',{scope: 'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect: '/profile', failureRedirect:'/fail'}))
	app.use('/logout', actLogout)
	app.use('/profile', profile)
}