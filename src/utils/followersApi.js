import tokenService from "./tokenService";
// import the tokenService so we can get the jwt to send
// over in our requests

const BASE_URL = "/api/";

export function create(userId) {
console.log(userId, "<<--HERE IS THE USER ID IN FOLLOWERS API")



  return fetch(`${BASE_URL}user/${userId}/followers`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), 
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(res.error);
  });
}

export function removeFollower(followerId) {
  return fetch(`${BASE_URL}followers/${followerId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), 
    }
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(res.error);
  });
}
