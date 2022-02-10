const bcrypt = require('bcryptjs');
const users = [];

module.exports = {

    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {

          const existingAccount = bcrypt.compareSync(password, users[i].passwordHash);

          if (existingAccount) {

            let existingUser = {...users[i]};
            delete existingUser.passwordHash;
            res.status(200).send(existingUser);
          }          
        }
      }
      res.status(400).send("User not found.")
    },

    register: (req, res) => {

      console.log(req.body);
      const {username, email, firstName, lastName, password} = req.body;
      let salt = bcrypt.genSaltSync(5);
      const passwordHash = bcrypt.hashSync(password, salt);

      const newUsers = {
        username,
        email,
        firstName,
        lastName,
        passwordHash
      }

      users.push(newUsers);
      let usersObjCopy = {...newUsers};
      delete usersObjCopy.passwordHash;
      res.status(200).send(usersObjCopy);
    }
}