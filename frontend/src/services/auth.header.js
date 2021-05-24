
// export default function authHeader() {
//     let user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.accessToken) {
//         return ({ Authorization: 'Bearer' + user.accessToken });
//     } else {
//         return ({});
//     }
// }

/* Note: For Node.js Express back-end tutorial, 
         prefer x-access-token header like this: */

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
        return {"x-access-token": user.accessToken};
    } else {
        return {};
    }
}
