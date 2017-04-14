const md5 = require('md5')

const data = []

const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy 

const aSalt = Math.random()
const Users = {
	'pc30': {username: 'pc30', hash: (md5('ATestPassword' + aSalt)), salt: aSalt}
}

const redis = require('redis').createClient('redis://h:p0e60a7039ff1ba8cba6bf8b6392171e9418e48c55c8956087d4d5f7bed6009c2@ec2-34-206-56-163.compute-1.amazonaws.com:28069')

//use facebook authentication
const callbackURL = 'http://127.0.0.1:3000/auth/callback'
const config = {
	clientSecret: '124d6d71bc38d8748972ca84db895c2b',
	clientID: '1783965338584990',
	callbackURL
}


const addUser = (username, password) => {
	const newSalt = md5(Math.random())
	Users[username] = {username, hash: md5(password + newSalt), salt: newSalt}
}

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
	const username = req.body.username
	const password = req.body.password

	if (!username || !password) {
		res.status(400).send({result: 'Invalid Username or Password'})
		return
	} else if (Users[req.body.username]) {
		res.status(400).send({result: 'Username has been used'})
		return
	}

	addUser(req.body.username, req.body.password)
	res.status(200).send({
		username: username,
		result: 'success'
	})

}

const actLogin = (req, res) => {
	const username = req.body.username
	const password = req.body.password
	if (!username || !password) {
		res.status(400).send({result: 'Unauthorized'})
		return
	}

	const userObj = Users[req.body.username]

	if (userObj && md5(req.body.password + userObj.salt) == userObj.hash) {
		const now = new Date()
		const sessionId = md5(Math.random())
		redis.hmset(sessionId, userObj)

		res.cookie('sid', sessionId, {maxAge: 3600 * 1000, httpOnly: true})
		res.send({username: userObj.username, result: 'success'})
	} else {
		res.status(401).send('Unauthorized')
	}
}

const actLogout = (req, res) => {
	res.status(200).send('OK')
}

const isLoggedIn = (req, res, next) => {
	if (!req.cookies) {
		res.status(401).send('No cookies measn unauthorization.')
		return
	}
	const sid = req.cookies.sid
	if (!sid) {
		return res.status(401).send('Unauthorized')
	}
	redis.hgetall(sid, (err, userObj) => {
		if (err) {
			console.log(err)
			return
		}
		console.log(sid + ' mapped to ' + userObj)
		if (userObj && userObj.username) {
			req.username = userObj.username
			next()
		} else {
			res.redirect('/login')
		}
	})
}

const actChangePassword = (req, res) => {
	res.status(200).send({username: 'Scott', status:'will not change'})
}


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
	res.send({'ok now what?':req.username})
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
	app.use('/profile', isLoggedIn, profile)
}