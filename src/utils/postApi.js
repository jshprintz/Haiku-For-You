import tokenService from "./tokenService";

const BASE_URL = "/api/posts";

export function create(post) {
    console.log(
        post.forEach((item) => console.log(item, "<--postitem"))
      );

    return fetch(BASE_URL, {
        method: "POST",
        body: post,
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then((res) =>{
        console.log(res, "<--HEre is the res")
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response, "<-- Response in postAPI Create")
            throw new Error(response.err)
        })
    });
}

export function getAll() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken() // This grabs thee JWT token out
            // local storage and send its in the header to the server
        }
    })
    .then((res) => {
        if(res.ok) return res.json();

        return res.json().then(response => {
            console.log(response, "<-- Response in postAPI Get")
            throw new Error(response.err)
        })
    })
}