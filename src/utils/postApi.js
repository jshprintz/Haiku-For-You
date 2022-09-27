import tokenService from "./tokenService";

const BASE_URL = "/api/posts";

export function create(post) {
  return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response, "<-- Response in postAPI Create");
      throw new Error(response.err);
    });
  });
}

export function getAll() {
  return fetch(BASE_URL, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), // This grabs thee JWT token out
      // local storage and send its in the header to the server
    },
  }).then((res) => {
    if (res.ok) return res.json();

    return res.json().then((response) => {
      console.log(response, "<-- Response in postAPI Get");
      throw new Error(response.err);
    });
  });
}

export function deletePost(postID) {
  return fetch(BASE_URL + "/" + postID, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), // This grabs thee JWT token out
      // local storage and send its in the header to the server
    },
  }).then((res) => {
    if (res.ok) return res.json();

    return res.json().then((response) => {
      console.log(response, "<-- Response in postAPI Get");
      throw new Error(response.err);
    });
  });
}

export function getPost(postID) {
  return fetch(BASE_URL + "/details/" + postID, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(), // This grabs thee JWT token out
      // local storage and send its in the header to the server
    },
  }).then((res) => {
    if (res.ok) return res.json();
    console.log(res, "<-----HERE");
    return res.json().then((response) => {
      console.log(response, "<-- Response in postAPI Get");
      throw new Error(response.err);
    });
  });
}
