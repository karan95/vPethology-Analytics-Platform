# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Details
# Welcome to vPethology Analytics Platform

Tech Stack:
- **Front End:** 
    React, React-Redux, Redux-Thunk, Immutable, Styling: Bootstrap, Font Awesome

- **Back End:** 
   Node.js, Express, MongoDB Atlas, Cloudinary(Image server), Repl.it(Online Server running platform)

- **Devtools:** Redux dev tools for debugging purpose

- To start with, it's was a great experience for me to develop this small project in the react. This is my second project in react. I have used redux with ember.js but with react, it works really well. I am using a live server and database so every record is persisted in MongoDB.

- I am using Repl.it for running express server on Node.js and online MongoDB Atlas as database. I will share a link to Repl project so you can check the code there. In case if a server isn't running then in center-top, there is Run/Stop button to manage service. 

- I have covered almost all use-cases from the assignment. Some components still need some work but almost all components can be extended based on the requirement.
Due to limited time, I haven't invested more time in design but it's visually appealing.


- Login/Sign up are's that great but it works.
    Login screen provides model for login or sign up.
    After sign up, there isn't any acknowledgment but it will redirect to login after successful signup. 
    After logged in user can see left navigation bar with nav links. For admin users, there is one more tab on left side: 'Admin Console' to view submitted cases and approve/reject it.

- Create a new case:
    - there are 4 fields where first 3 fields are required with atleast some length of chars.
    - You can see Submit button enabling/disabling based on user input.
    - At least 1 image upload is required.
    - On submit you can see success message.
    - cancel/reset form will revert form to the initial case.
    - i have developed case wizard in a way that it can be used for both creating new and editing a case

- Case List View:
    - fetch all cases created by user and displays it in the table
    - Newly created case will be in pending state waiting for approval from the admin
    - first column has edit record icon which re-directs to case edit wizard
    - only rejected cases can be edited and re-submitted
    - pending and submitted cases will have a edit icon disabled
    - on click of each row, it toggles to detail view and raw view
    - case status can be filtered by using dropdown menu on table header
    - Filter updates the list records based on selected status for a logged-in user

- Admin user
    - there is one more tab for admin user where it displays all pending case-requests from all user
    - design is similar to the case list view with detail page option
    - admin can approve/reject particular case
    - admin have an option to force approve/reject all pending cases in the list

- Design approch: 
    I tried to make all components as reusable as possible just so we can re-use those components in future for other screen or features.
    all screen pages realted components go under pages dir and shared components in shared
    redux dir contains all the actions, reducers based on the object entity and features
    i have seperated components based on heirarchy 

    I haven't done good amount of testing so there may be multiple minor bugs but overall it works fine.
    I took some time for live backend so i got average time to work on the front end part.
    Ux and styling looks okay but i can be improved a lot. I didn't spend too much time styling something. There aren't any good feedback after user creation or case creation.
                
--KT-- :)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
