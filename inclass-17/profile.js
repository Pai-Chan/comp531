const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	if (req.params.user) {
		res.send({
			headlines:[
			{
				username: req.params.user,
				headline: "This is a headline"
			}
			]
		})		
	} else {
		res.send({
			headlines:[
			{
				username: 'aNameMaybeNotMe',
				headline: "This is a headline"
			}
			]
		})
	}
}

const putHeadline = (req, res) => {
	res.send({
		username: "CurrentLoginedUsername",
		headline: req.body.headline || "Not Provided"
	})
}

const getEmail = (req, res) => {
	if (req.params.user) {
		res.send({
			username: req.params.user,
			email: "aName@aName.com"
		})
	} else {
		res.send({
			username: "aNameMaybeNotMe",
			email: "aName@aName.com"
		})		
	}
}

const putEmail = (req, res) => {
	res.send({
		username: "aName",
		email: req.body.email || "Not Provided"
	})
}

const getZipcode = (req, res) => {
	if (req.params.user) {
		res.send({
			username: req.params.user,
			zipcode: "77005"
		})
	} else {
		res.send({
			username: "aNameMaybeNotMe",
			zipcode: "77005"
		})		
	}
}

const putZipcode = (req, res) => {
	res.send({
		username: "aName",
		zipcode: req.body.zipcode || "Not Provided"
	})
}

const getAvatars = (req, res) => {
	if (req.params.user) {
		res.send({
			avatars: [{
				username: req.params.user,
				avatar: "http://www.rice.edu/1.jpg"
			}]
		})
	} else {
		res.send({
			avatars: [{
				username: "aNameMaybeNotMe",
				avatar: "http://www.rice.edu/aNameMaybeNotMe.jpg"
			}]
		})		
	}
}

const putAvatar = (req, res) => {
	res.send({
			username: "aName",
			avatar: req.body.avatar || "Not Provided"
		}
	)
}

module.exports = app => {
    app.get('/', index)
    app.get("/headlines/:user?", getHeadlines)
    app.put("/headline", putHeadline)
    app.get("/email/:user?", getEmail)
    app.put("/email", putEmail)
    app.get("/zipcode/:user?", getZipcode)
    app.put("/zipcode", putZipcode)
    app.get("/avatars/:user?", getAvatars)
    app.put("/avatar", putAvatar)
}
