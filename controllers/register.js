const handleRegister = (req, res, db, bcrypt) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('incorrect form submition');
    }
    const hash = bcrypt.hashSync(password, 10);
    db.transaction (trx => {
        trx('login')
        .insert({
            hash,
            email
        })
        .returning('email')
        .then(email => {
            trx('users')
            .insert({
                name,
                email: email[0].email,
                joined: new Date()
            })
            .returning('*')
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister
}