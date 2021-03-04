
exports.module = (req, res, next) => {
    
    // 'Password not strong ?'

    try {
      const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?&#@$%µ€_])[a-zA-Z0-9!?&#@$%µ€_]{7,}/
      if (regex.test(req.body.password)) next();
      
        
    } catch(err) {
      return res.status(401).json({ error: `Password not Strong! :  7 characters at least 1 Uppercase,
                                              1 Lowercase, 1 Digit, 1 symbol between: ! ? & # @ $ % µ € _ `});

    }
    
}

