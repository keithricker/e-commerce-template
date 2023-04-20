### Widgets Unlimited: A Mock E-Commerce Site Built with React
<br />

#### Note: App was created in 2021 and has some outdated packages (which will soon be updated), so this is only recommended for demo purposes and/or code evaluation.
<br />

#### Running start script from this directory (client) will launch a localhost development server that updates dynamically (using nodemon -- not pre-compiled) . Running start script from the root directory ( ../ one level up) will serve a pre-compiled (server-side rendered) version of the site on port 3001.
<br />

#### This is the React Project Directory. Node/Express Server is (../) one level up.
<br />

![Image of Metrics](/client/public/img/scores.png)
<br />

#### To highlight the customizable nature of the store, a few basic configuration changes have been made to transform the site in to a Dairy Supplier
<br />

![Custom Theme](/client/public/img/dairy-suppliers.webp)
<br />
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
- **client:** Directory where the React Application resides. Created using create-react-app (project follows that basic structure).