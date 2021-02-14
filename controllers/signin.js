const handleSignin = (req, res, db, bcrypt) => {

    //comparing hash to password where email matches in 'login',
	//if true returns user from 'users' where email matches

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }

    db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash); // check if the password is correct with bcrypt

        if (isValid) {
            return db.select('*')
            .from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'));
        } else {
            res.status(400).json('wrong credentials');
        }
    })
    .catch(err => res.status(400).json('wrong credentials'));
}

export default { handleSignin: handleSignin };