# Handling data better with TypeScript

Example app of how TypeScript can benefit your service. Data is based on HBOs The Sopranos television series (why not!)

####Dependencies

You must have Node installed to run this app. step1 branch should pull in all dependencies needed to get started.


###Step 1

The first step is a simple example that displays some static user data on a page. To get it running checkout the step1 branch and run the following.

```
git checkout step1
npm install
npm run dev:ts
```

Once running the app can be accessed at:
http://localhost:3000/users

###Step 2

Step2 introduces TypeScript. within the routes directory there's a new users-typescript.ts file.
We've added a User model and the user-connector-typescript.ts uses this model to send back a User Array.

```
git checkout step3
```





