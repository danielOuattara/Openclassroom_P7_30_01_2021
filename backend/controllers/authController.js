

/* 
Controller for testing Authorization
------------------------------------

There are 2 functions:
– /api/test/user for loggedin users (role: user/moderator/admin)
– /api/test/admin for users having admin role

//--------------------------------*/



exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

