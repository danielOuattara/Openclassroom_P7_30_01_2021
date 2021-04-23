
exports.allAccess = (req, res) => {
    res.status(200).send(" Public Content !");  // for public access
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content !");  //  for loggedin users (role: user/moderator/admin)
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content !");  // for users having moderator role
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content !");  // for users having admin role
}