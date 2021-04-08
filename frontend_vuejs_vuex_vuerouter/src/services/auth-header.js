/*
Data service
------------

We also have methods for retrieving data from server.
In the case we access protected resources, the HTTP
request needs Authorization header.

Let’s create a helper function called "authHeader()"
inside auth-header.js:
*/


// export default  function authHeader() {
//  let user = JSON.parse(localStorage.getItem('user'))

//  if (user && user.accesToken) {
//    return { Authorization: 'Bearer' + user.accesToken};

//  } else {
//    return {};
//  }
// }

// --------------------------------------------------------------------

export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };  // for Node.js Express back-end
  } else {
    return {};
  }
}



/* It checks Local Storage for user item.
If there is a logged in user with accessToken (JWT),
return HTTP Authorization header. Otherwise, return
an empty object.*/

