
### Widgets Unlimited: A React-based Ecommerc Application 

#### Note: App was created in 2021, recently updated to incorporate redux toolkit for state management, a simple CMS and API pulling data from Firebase for content, and Material UI for some of the components. 
#### Note: There are some outdated packages (which will soon be updated), so this is only recommended for demo purposes and/or code evaluation. 

#### Running start script from the root level (./) will serve a pre-compiled (server-side rendered) version of the app using a simple express server, on port 3001. Server is not production-ready, but ideas can be borrowed and built upon. 

#### This is the Express Server Root Directory. React Project is in the /client directory. 

![Image of Metrics](/client/public/img/scores.png) 

<a href="https://codesandbox.io/s/github/keithricker/e-commerce-template"><strong>View the Project On CodeSandbox</strong></a> 

#### To highlight the customizable nature of the store, a few basic configuration changes have been made to transform the site in to a Dairy Supplier 

![Custom Theme](/client/public/img/dairy-suppliers.webp) 

#### Features: 
- Pages: Home, Shop, Contact
- E-commerce (mock)enabled
- Payment processing using Stripe
- User Authentication using Firebase (enabled)
- Redux State Management (Redux Toolkit)
- API querrying data from Firebase.
- Accessibility
- Server-side Rendered
- Single Page App with Persistence (via redux persist).
- High Performance Metrics.
- Does not use Typescript (check out some of my other projects for examples using Typescript)

#### Folder Structure:  
- **server.js:** Where the server-side code resides.
- **SSR.js** (server-side rendering): This script is called on post-build, and pre-renders the html.
- **graphql-server:** Apollo server that queries firebase for content, and serves graphql api endpoint for the client-side React application.
- **/client:** Where the React Application resides. Created using create-react-app (project follows that basic structure).
