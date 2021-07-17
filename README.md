
### Widgets Unlimited: An E-Commerce Site Built with React

[View the app live](https://r0tne.sse.codesandbox.io/)

[View the Project on Code Sandbox](https://codesandbox.io/s/morning-lake-r0tne?file=/README.md)

#### Features:
- Pages: Home, Shop, Contact
- (almost) Fully E-commerce enabled
- Payment processing using Stripe
- User Authentication using Firebase
- Redux State Management
- Accessibility
- Server-side Rendered
- Single Page App with Persistence via redux persist.

### Firing it up
#### After installing (npm/yarn install) from the root directory: 
`npm start`<br /><br />
**The app will be available on port 3001** (http://localhost:3001)
<br />

**Other Commands:** (note: depending on your setup, you may have to prepend the command with "run-script" i.e. `npm run-script build`)

- ***BUILD***: uses create-react-app's build command to make a production-ready, webpack-compiled app, with HTML prerendered (server-side)

- ***DEVELOPMENT***: uses create-react-app's start command, utilizing webpack's dev server for real-time updates. **This runs on PORT 3000** (http://localhost:3000)

- ***TEST***: uses create-react-app's test command to run tests.

#### Folder Structure:  
- **server.js:** Where the server-side code resides
- **SSR.js** (server-side rendering): This script is called on post-build, and pre-renders the html.
- **client:** Directory where the React Application resides. Created using create-react-app, so the basic folder structure is the same as other apps using cra (public folder, build, src, etc.).
