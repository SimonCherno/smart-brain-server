const handleSignIn = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if ( !email || !password) {
        return res.status(400).json('incorrect form submition');
    }
    db.select('*')
    .from('login')
    .where('email', '=', email)
    .then(user => {
        const isValid = bcrypt.compareSync(password, user[0].hash);
        if (isValid) {
            db.select('*')
            .from('users')
            .where('email', '=', email)
            .then(user => res.json(user[0]))
        } else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignIn
}