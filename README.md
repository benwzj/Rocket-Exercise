## 

## API Server

Need to start API server that provides data.

To start the server, use a separate terminal window with the following:

1. Change into the `server` directory and run `npm install`
2. Start the server via `npm run start`

The following 2 endpoints will now be available.

| Endpoint                             | Description                       |
| ------------------------------------ | --------------------------------- |
| http://localhost:8001/launches       | returns an array of launch data   |
| http://localhost:8001/launchpads     | returns launchpads                |


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

