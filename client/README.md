### Widgets Unlimited: A Mock E-Commerce Site Built with React 

#### Note: App was created in 2021 and has some outdated packages (which will soon be updated), so this is only recommended for demo purposes and/or code evaluation. 

#### Running start script from the root directory ( ../ one level up) will serve a pre-compiled (server-side rendered) version of this app on port 3001. Run npm build from this directory to update.

#### This is the React Project Directory. Node/Express Server is (../) one level up. 

![Image of Metrics](/client/public/img/scores.png) 

#### To highlight the customizable nature of the store, a few basic configuration changes have been made to transform the site in to a Dairy Supplier 

![Custom Theme](/client/public/img/dairy-suppliers.webp) 
<br />

<a href="https://codesandbox.io/s/github/keithricker/e-commerce-template"><strong>View the Project On CodeSandbox</strong></a> 
<br />

#### Features:
- Pages: Home, Shop, Contact
- E-commerce (mock)enabled
- Payment processing using Stripe
- User Authentication using Firebase (enabled)
- Redux State Management
- Accessibility
- Server-side Rendered
- Single Page App with Persistence (via redux persist).
- High Performance Metrics.
- Does not use Typescript (check out some of my other projects for examples using Typescript) 

#### Folder Structure:  
- **server.js:** Where the server-side code resides
- **SSR.js** (server-side rendering): This script is called on post-build, and pre-renders the html.
- **graphql-server:** Apollo server that queries firebase for content, and serves graphql api endpoint for the client-side React application.
- **client:** Directory where the React Application resides. Created using create-react-app (project follows that basic structure).