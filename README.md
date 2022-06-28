# MERN STACK // Update Log

-- Version 1.1
In Commit 1.1 we made a data which consists of an array containing Objects, in this case our products. the objects contain information like the product name, price, slug, and so on.

We then use the map function to map our data.products into jsx and use the slug as a key while also styling and setting classes.

-- Version 1.1b
Installed react-router-dom - Frontend
This a relatively smaller change because I want to be able to look back at this later and make sure I understand this.
So what we did here was add our routes using React-Router-Dom. Moved the old design that was in app.js to HomeScreen.js so now when you click on products it brings you to a blank page of the slug. we then added a route with the path of /product/:slug and an element of another screen we made called ProductScreens.js

Here we use the useParams() which "returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path." -- Meaning it grabs the key aka the product.slug we set in v-1.1
I wanted to make sure I understand this so that is why this commit is called 1.1b

-- Version 1.2
After Version 1.1b all we did was change our anchors to react-router Links so that we have a single page and stops reloading everytime we switch screens.

-- Version 1.3
Installed Express and Nodemon - Backend
In this update we start the setup of the backend express server. we have it running on port 5000 and when users visit the address
/api/proudcts we send a responce of data.products, we cloned our data.js from frontend and put it in backend as well. Other than that we installed nodemon for quality of life, nodemon updates on file save.

-- Version 1.4
Installed Axios - Frontend
in package.json we set our proxy to localhost:5000, which is our backend address, then we installed axios and put it in a useEffect hook so that it can fetch the JSON from our backend endpoint of /api/products which then gets stored in a useState hook.

-- Version 1.5
Installed use-reducer-logger
In this patch we implemented useReducer with the 3 cases of fetch,request, and fail. we then replaced the old useState code with our new reducer in our fetchData function. after setting everything up we added some render conditions for a loading and error screen before showing the data to user.
