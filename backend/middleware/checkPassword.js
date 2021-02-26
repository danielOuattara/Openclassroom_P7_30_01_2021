
exports.module = (req, res, next) => {
    
    // 'Password not strong ?'
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?&#@$%µ€_])[a-zA-Z0-9!?&#@$%µ€_]{7,}/.test(req.body.password)) {
      return res.status(401).json({ error: `Password not Strong! :  7 characters at least 1 Uppercase,
                                            1 Lowercase, 1 Digit, 1 symbol between: ! ? & # @ $ % µ € _ `});
    }
   next();
}