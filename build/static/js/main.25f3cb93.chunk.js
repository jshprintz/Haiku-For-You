(this["webpackJsonpjwt-boilerplate"]=this["webpackJsonpjwt-boilerplate"]||[]).push([[0],{122:function(e,t,n){},153:function(e,t,n){},161:function(e,t,n){},162:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(57),a=n.n(o),s=(n(152),n(153),n(10)),c=n(7),i=(n(122),n(8)),l=n(14),j=n(15),u=n(39),h=n(1);function d(e){return Object(h.jsx)("span",{className:"error",children:e.error})}function b(){var e=localStorage.getItem("token");e&&(JSON.parse(atob(e.split(".")[1])).exp<Date.now()/1e3&&(localStorage.removeItem("token"),e=null));return e}var p={setToken:function(e){e?localStorage.setItem("token",e):localStorage.removeItem("token")},getToken:b,removeToken:function(){localStorage.removeItem("token")},getUserFromToken:function(){var e=b();return e?JSON.parse(atob(e.split(".")[1])).user:null}},O="/api/users/";var g={signup:function(e){return fetch(O+"signup",{method:"POST",body:e}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw console.log(e),new Error(e.err)}))})).then((function(e){var t=e.token;return p.setToken(t)}))},logout:function(){p.removeToken()},login:function(e){return fetch(O+"login",{method:"POST",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw console.log(e),new Error(e.err)}))})).then((function(e){var t=e.token;return p.setToken(t)}))},getUser:function(){return p.getUserFromToken()},getProfile:function(e){return console.log("getProfile calling"),fetch(O+e,{headers:{Authorization:"Bearer "+p.getToken()}}).then((function(e){if(console.log(e,"<---Res in UserService"),e.ok)return e.json();throw new Error("Error from getProfile Request, check the server terminal!")}))}},x=n(181),m=n(182),f=n(175),v=n(183),w=n(179);function k(e,t){return e===t}function y(e){var t=Object(r.useState)({message:"",passwordError:!1}),n=Object(s.a)(t,2),o=n[0],a=n[1],b=Object(r.useState)({username:"",email:"",password:"",passwordConf:"",bio:""}),p=Object(s.a)(b,2),O=p[0],y=p[1],L=Object(r.useState)(""),C=Object(s.a)(L,2),U=C[0],S=C[1],E=Object(c.m)();function P(e){y(Object(u.a)(Object(u.a)({},O),{},Object(j.a)({},e.target.name,e.target.value)))}function T(){return(T=Object(l.a)(Object(i.a)().mark((function t(n){var r,o;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),k(O.password,O.passwordConf)){t.next=3;break}return t.abrupt("return",a({message:"Passwords Must Match!",passwordError:!0}));case 3:for(o in a({message:"",passwordError:!1}),(r=new FormData).append("photo",U),O)r.append(o,O[o]);return t.prev=7,t.next=10,g.signup(r);case 10:e.handleSignUpOrLogin(),E("/"),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(7),console.log(t.t0),a({message:t.t0.message,passwordError:!1});case 18:case"end":return t.stop()}}),t,null,[[7,14]])})))).apply(this,arguments)}return Object(h.jsx)(x.a,{textAlign:"center",style:{height:"100vh",width:"100vw"},verticalAlign:"middle",children:Object(h.jsxs)(x.a.Column,{style:{maxWidth:450},children:[Object(h.jsx)(m.a,{as:"h2",color:"grey",textAlign:"center",children:"Sign Up"}),Object(h.jsxs)(f.a,{onSubmit:function(e){return T.apply(this,arguments)},children:[Object(h.jsxs)(v.a,{stacked:!0,children:[Object(h.jsx)(f.a.Input,{name:"username",placeholder:"username",value:O.username,onChange:P,required:!0}),Object(h.jsx)(f.a.Input,{type:"email",name:"email",placeholder:"email",value:O.email,onChange:P,required:!0}),Object(h.jsx)(f.a.Input,{error:o.passwordError,name:"password",type:"password",placeholder:"password",value:O.password,onChange:P,required:!0}),Object(h.jsx)(f.a.Input,{error:o.passwordError,name:"passwordConf",type:"password",placeholder:"Confirm Password",value:O.passwordConf,onChange:P,required:!0}),Object(h.jsx)(f.a.TextArea,{label:"bio",name:"bio",placeholder:"Tell us more about yourself...",value:O.bio,onChange:P}),Object(h.jsx)(f.a.Field,{children:Object(h.jsx)(f.a.Input,{type:"file",name:"photo",placeholder:"upload image",onChange:function(e){console.log(e.target.files," < - this is e.target.files!"),S(e.target.files[0])}})}),Object(h.jsx)(w.a,{type:"submit",className:"btn",children:"Signup"})]}),o.message?Object(h.jsx)(d,{error:o.message}):null]})]})})}n(161);var L=n(19),C=n(178);function U(e){var t=Object(r.useState)(""),n=Object(s.a)(t,2),o=n[0],a=n[1],b=Object(r.useState)({email:"",password:""}),p=Object(s.a)(b,2),O=p[0],k=p[1],y=Object(c.m)();function U(e){k(Object(u.a)(Object(u.a)({},O),{},Object(j.a)({},e.target.name,e.target.value)))}function S(){return(S=Object(l.a)(Object(i.a)().mark((function t(n){return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.prev=1,t.next=4,g.login(O);case 4:e.handleSignUpOrLogin(),y("/"),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0,"<--ERROR IN LOGIN PAGE"),a(t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})))).apply(this,arguments)}return Object(h.jsx)(x.a,{textAlign:"center",style:{height:"100vh",width:"100vw"},verticalAlign:"middle",children:Object(h.jsxs)(x.a.Column,{style:{maxWidth:450},children:[Object(h.jsx)(m.a,{as:"h2",color:"grey",textAlign:"center",children:"Log-in to your account"}),Object(h.jsx)(f.a,{onSubmit:function(e){return S.apply(this,arguments)},children:Object(h.jsxs)(v.a,{stacked:!0,children:[Object(h.jsx)(f.a.Input,{type:"email",name:"email",placeholder:"email",value:O.email,onChange:U,required:!0}),Object(h.jsx)(f.a.Input,{name:"password",type:"password",placeholder:"password",value:O.password,onChange:U,required:!0}),Object(h.jsx)(w.a,{color:"grey",fluid:!0,size:"large",type:"submit",className:"btn",children:"Login"})]})}),Object(h.jsxs)(C.a,{children:["New to us? ",Object(h.jsx)(L.b,{to:"/signup",children:"Sign Up"})]}),o?Object(h.jsx)(d,{error:o}):null]})})}var S=n(24),E=n(135),P=n(83);function T(e){var t=e.loggedUser,n=e.handleLogout;return Object(h.jsxs)(v.a,{clearing:!0,children:[Object(h.jsxs)(m.a,{as:"h2",floated:"right",children:[Object(h.jsx)(L.b,{to:"/".concat(null===t||void 0===t?void 0:t.username),children:Object(h.jsx)(E.a,{src:null!==t&&void 0!==t&&t.photoUrl?null===t||void 0===t?void 0:t.photoUrl:"https://react.semantic-ui.com/images/wireframe/square-image.png",avatar:!0})}),t?Object(h.jsx)(L.b,{to:"",onClick:n,children:"Logout"}):Object(h.jsx)(L.b,{to:"/".concat(null===t||void 0===t?void 0:t.username),children:"Login"})]}),Object(h.jsxs)(m.a,{as:"h2",floated:"left",children:[Object(h.jsx)(L.b,{to:"/",children:Object(h.jsx)(P.a,{name:"home"})}),t?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(L.b,{to:"/more",children:"More"}),Object(h.jsx)(L.b,{to:"/write",children:"Write a Haiku"})]}):null]})]})}var A=n(174);function R(){return Object(h.jsx)(A.a,{size:"small",active:!0,children:"Loading"})}var I=n(176),N=n(177),z="/api/posts";function q(e){return fetch(z,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer "+p.getToken()}}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw console.log(e,"<-- Response in postAPI Create"),new Error(e.err)}))}))}function F(){return fetch(z,{headers:{Authorization:"Bearer "+p.getToken()}}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw console.log(e,"<-- Response in postAPI Get"),new Error(e.err)}))}))}var H=function(e){var t=e.post,n=(e.isProfile,e.addLike),r=e.removeLike,o=e.loggedUser,a=t.likes.findIndex((function(e){return e.username===o.username})),s=a>-1?"pink":"grey",c=a>-1?function(){return r(t.likes[a]._id)}:function(){return n(t._id)};return console.log(o.username,"<<<-Logged user"),console.log(t.user.username),Object(h.jsxs)(I.a,{children:[Object(h.jsxs)(I.a.Content,{children:[Object(h.jsx)(I.a.Header,{textAlign:"center",children:Object(h.jsxs)(L.b,{to:"/".concat(t.user.username),children:[Object(h.jsx)(E.a,{size:"large",avatar:!0,src:t.user.photoUrl?t.user.photoUrl:"https://react.semantic-ui.com/images/wireframe/square-image.png"}),t.user.username]})}),Object(h.jsx)("br",{}),Object(h.jsx)(I.a.Header,{children:t.title}),Object(h.jsx)("p",{children:t.poem})]}),Object(h.jsx)(I.a.Content,{textAlign:"right",children:t.user.username===o.username?Object(h.jsx)(L.b,{to:"#",children:Object(h.jsx)(P.a,{name:"delete",size:"large",color:"red",onClick:function(){var e;console.log("DELETE CLICKED"),console.log(t._id),e=t._id,fetch("/api/posts/"+e,{method:"DELETE",headers:{Authorization:"Bearer "+p.getToken()}}).then((function(e){return e.ok?e.json():e.json().then((function(e){throw console.log(e,"<-- Response in postAPI Get"),new Error(e.err)}))}))}})}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(L.b,{to:"#",children:Object(h.jsx)(P.a,{name:"heart",size:"large",color:s,onClick:c})}),t.likes.length,Object(h.jsx)(L.b,{to:"#",children:Object(h.jsx)(P.a,{name:"user plus",size:"large",color:"blue"})})]})})]},t._id)};function W(e){var t=e.posts,n=e.numPhotosCol,r=e.isProfile,o=e.loading,a=e.removeLike,s=e.addLike,c=e.loggedUser;return Object(h.jsxs)(I.a.Group,{itemsPerRow:n,stackable:!0,children:[o?Object(h.jsxs)(v.a,{children:[Object(h.jsx)(N.a,{active:!0,inverted:!0,children:Object(h.jsx)(R,{size:"small",children:"Loading"})}),Object(h.jsx)(E.a,{src:"https://react.semantic-ui.com/images/wireframe/short-paragraph.png"})]}):null,t.map((function(e){return Object(h.jsx)(H,{post:e,isProfile:r,removeLike:a,addLike:s,loggedUser:c},e._id)}))]})}var B="/api/";function D(e){return fetch("".concat(B,"posts/").concat(e,"/likes"),{method:"POST",headers:{Authorization:"Bearer "+p.getToken()}}).then((function(e){if(e.ok)return e.json();throw new Error(e.error)}))}function J(e){return fetch("".concat(B,"likes/").concat(e),{method:"DELETE",headers:{Authorization:"Bearer "+p.getToken()}}).then((function(e){if(e.ok)return e.json();throw new Error(e.error)}))}function _(e){var t=e.loggedUser,n=e.handleLogout,o=Object(r.useState)([]),a=Object(s.a)(o,2),c=a[0],j=a[1],u=Object(r.useState)(""),b=Object(s.a)(u,2),p=b[0],O=b[1],g=Object(r.useState)(!0),m=Object(s.a)(g,2),f=m[0],v=m[1];function w(){return(w=Object(l.a)(Object(i.a)().mark((function e(t){var n;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D(t);case 3:n=e.sent,console.log(n,"from add like"),y(),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0," err from server"),O("error adding like");case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function k(){return(k=Object(l.a)(Object(i.a)().mark((function e(t){var n;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,J(t);case 3:n=e.sent,console.log(n," remove like"),y(),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0),O("error removing like");case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function y(){return L.apply(this,arguments)}function L(){return(L=Object(l.a)(Object(i.a)().mark((function e(){var t;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F();case 3:t=e.sent,j(Object(S.a)(t.data)),v(!1),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0.message," this is the error"),v(!1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return Object(r.useEffect)((function(){y()}),[]),p?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(T,{handleLogout:n,loggedUser:t}),Object(h.jsx)(d,{error:p})]}):f?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(T,{handleLogout:n,loggedUser:t}),Object(h.jsx)(R,{})]}):Object(h.jsxs)(x.a,{centered:!0,children:[Object(h.jsx)(x.a.Row,{children:Object(h.jsx)(x.a.Column,{children:Object(h.jsx)(T,{handleLogout:n,loggedUser:t})})}),Object(h.jsx)(x.a.Row,{className:"feed-gallery",children:Object(h.jsxs)(x.a.Column,{style:{maxwidth:350},children:[Object(h.jsx)("h1",{children:"Here are all the posts"}),Object(h.jsx)(W,{posts:c,numPhotosCol:3,isProfile:!1,loading:f,addLike:function(e){return w.apply(this,arguments)},removeLike:function(e){return k.apply(this,arguments)},loggedUser:t})]})})]})}function G(e){var t=e.user;return Object(h.jsxs)(x.a,{textAlign:"center",children:[Object(h.jsx)(x.a.Row,{children:Object(h.jsx)(x.a.Column,{children:Object(h.jsx)(E.a,{src:"".concat(t.photoUrl?t.photoUrl:"https://react.semantic-ui.com/images/wireframe/square-image.png"," "),avatar:!0,size:"small"})})}),Object(h.jsx)(x.a.Row,{children:Object(h.jsxs)(x.a.Column,{textAlign:"left",style:{maxWidth:450},children:[Object(h.jsx)(v.a,{vertical:!0,children:Object(h.jsx)("h3",{children:t.username})}),Object(h.jsx)(v.a,{children:Object(h.jsxs)("span",{children:[" Bio: ",t.bio]})})]})})]})}function M(e){var t=e.loggedUser,n=e.handleLogout,o=Object(r.useState)(""),a=Object(s.a)(o,2),j=a[0],u=a[1],b=Object(r.useState)({}),p=Object(s.a)(b,2),O=p[0],m=p[1],f=Object(r.useState)(!0),v=Object(s.a)(f,2),w=v[0],k=v[1],y=Object(r.useState)([]),L=Object(s.a)(y,2),C=L[0],U=L[1],S=Object(c.o)().username;function E(){return(E=Object(l.a)(Object(i.a)().mark((function e(t){var n;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D(t);case 3:n=e.sent,console.log(n,"from add like"),A(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0," err from server");case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function P(){return(P=Object(l.a)(Object(i.a)().mark((function e(t){var n;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,J(t);case 3:n=e.sent,console.log(n," remove like"),A(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}var A=Object(r.useCallback)(Object(l.a)(Object(i.a)().mark((function e(){var t;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.getProfile(S);case 3:t=e.sent,k(!1),m(t.data.user),U(t.data.posts),console.log(t,"Response"),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0.message,"<--Error"),u("Profile does not exist! You are in the wrong in place.");case 14:case"end":return e.stop()}}),e,null,[[0,10]])}))),[S]);return Object(r.useEffect)((function(){console.log("firing!"),A()}),[S,A]),j?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(T,{handleLogout:n,loggedUser:t}),Object(h.jsx)(d,{error:j}),";"]}):w?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(T,{handleLogout:n,loggedUser:t}),Object(h.jsx)(R,{})]}):Object(h.jsxs)(x.a,{children:[Object(h.jsx)(x.a.Row,{children:Object(h.jsx)(x.a.Column,{children:Object(h.jsx)(T,{handleLogout:n,loggedUser:t})})}),Object(h.jsx)(x.a.Row,{children:Object(h.jsx)(x.a.Column,{children:Object(h.jsx)(G,{user:O})})}),Object(h.jsx)(x.a.Row,{centered:!0,className:"profile-posts",children:Object(h.jsxs)(x.a.Column,{style:{maxWidth:750},children:[Object(h.jsx)("h3",{children:"Posts go here"}),Object(h.jsx)(W,{posts:C,numPhotosCol:3,isProfile:!0,loading:w,addLike:function(e){return E.apply(this,arguments)},removeLike:function(e){return P.apply(this,arguments)},loggedUser:t})]})})]})}function K(e){var t=e.loggedUser,n=e.handleLogout;return Object(h.jsxs)(x.a,{children:[Object(h.jsx)(x.a.Row,{children:Object(h.jsx)(x.a.Column,{children:Object(h.jsx)(T,{handleLogout:n,loggedUser:t})})}),Object(h.jsx)(x.a.Row,{children:Object(h.jsx)(x.a.Column,{children:Object(h.jsx)("h1",{children:"Here is the MORE page."})})})]})}function Y(e){var t=Object(r.useState)({title:"",poem:""}),n=Object(s.a)(t,2),o=n[0],a=n[1];function c(e){a(Object(u.a)(Object(u.a)({},o),{},Object(j.a)({},e.target.name,e.target.value)))}function d(){return(d=Object(l.a)(Object(i.a)().mark((function t(n){return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.prev=1,t.next=4,e.handleAddPost(o);case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),console.log(t.t0,"<-- in Addpost handlesubmit");case 9:case"end":return t.stop()}}),t,null,[[1,6]])})))).apply(this,arguments)}return Object(h.jsx)(v.a,{children:Object(h.jsxs)(f.a,{onSubmit:function(e){return d.apply(this,arguments)},children:[Object(h.jsx)(f.a.Input,{className:"form-control",name:"title",value:o.title,placeholder:"Title",onChange:c,required:!0}),Object(h.jsx)(f.a.TextArea,{className:"form-control",name:"poem",value:o.poem,placeholder:"Write Haiku Here",onChange:c,required:!0}),Object(h.jsx)(w.a,{type:"submit",className:"btn",children:"Post Haiku"})]})})}function $(e){var t=e.loggedUser,n=e.handleLogout,o=Object(r.useState)([]),a=Object(s.a)(o,2),c=a[0],j=a[1],u=Object(r.useState)(""),d=Object(s.a)(u,2),b=d[0],p=d[1];function O(){return(O=Object(l.a)(Object(i.a)().mark((function e(t){var n;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,q(t);case 3:n=e.sent,j([n.data].concat(Object(S.a)(c))),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),p("Error creating post, please try again");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}return Object(h.jsxs)(x.a,{centered:!0,children:[Object(h.jsx)(x.a.Row,{children:Object(h.jsx)(x.a.Column,{children:Object(h.jsx)(T,{handleLogout:n,loggedUser:t})})}),Object(h.jsx)(x.a.Row,{children:Object(h.jsxs)(x.a.Column,{children:[Object(h.jsx)("h1",{children:"Write a Haiku"}),Object(h.jsx)("p",{children:b})]})}),Object(h.jsx)(x.a.Row,{children:Object(h.jsx)(x.a.Column,{style:{maxWidth:450},children:Object(h.jsx)(Y,{handleAddPost:function(e){return O.apply(this,arguments)}})})})]})}var Q=function(){var e=Object(r.useState)(g.getUser()),t=Object(s.a)(e,2),n=t[0],o=t[1];function a(){o(g.getUser())}function i(){g.logout(),o(null)}return n?Object(h.jsxs)(c.d,{children:[Object(h.jsx)(c.b,{path:"/",element:Object(h.jsx)(_,{loggedUser:n,handleLogout:i})}),Object(h.jsx)(c.b,{path:"/login",element:Object(h.jsx)(U,{handleSignUpOrLogin:a})}),Object(h.jsx)(c.b,{path:"/signup",element:Object(h.jsx)(y,{handleSignUpOrLogin:a})}),Object(h.jsx)(c.b,{path:"/more",element:Object(h.jsx)(K,{loggedUser:n,handleLogout:i})}),Object(h.jsx)(c.b,{path:"/write",element:Object(h.jsx)($,{loggedUser:n,handleLogout:i})}),Object(h.jsx)(c.b,{path:"/:username",element:Object(h.jsx)(M,{loggedUser:n,handleLogout:i})})]}):Object(h.jsxs)(c.d,{children:[Object(h.jsx)(c.b,{path:"/",element:Object(h.jsx)(_,{loggedUser:n,handleLogout:i})}),Object(h.jsx)(c.b,{path:"/login",element:Object(h.jsx)(U,{handleSignUpOrLogin:a})}),Object(h.jsx)(c.b,{path:"/signup",element:Object(h.jsx)(y,{handleSignUpOrLogin:a})}),Object(h.jsx)(c.b,{path:"/*",element:Object(h.jsx)(c.a,{to:"/login"})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(Object(h.jsx)(L.a,{children:Object(h.jsx)(Q,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[162,1,2]]]);
//# sourceMappingURL=main.25f3cb93.chunk.js.map