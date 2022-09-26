## I have two major errors right now...

### Error 1
The first problem is that the title and the poem are not adding to the posts I create. I've tracked it down to the postsApi.create where it doesn't ever post it to the body.
I've tried it with JSON.stringify and without, neither is working. 

### Error 2
For whatever reason, in Profile.jsx, userService.getProfile isn't returning the posts along with the user. Everything is written the same as pupstagram, so I'm really not sure why this is happening.

---

I'm not sure if these two errors are somehow related or what could be causing them.