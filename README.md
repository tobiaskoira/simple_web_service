# simple_web_service

# Step 1: Project Initialization

npm init -y

This will create a package.json file that lists the dependencies and settings for the project.

# Step 2: Install Dependencies

## Server-Side Dependencies
npm install express mongoose cors body-parser

## Client-Side Dependencies
Install React, Webpack, and necessary plugins, along with Material-UI:

npm install react react-dom react-router-dom
npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin css-loader style-loader @mui/material @emotion/react @emotion/styled 

# Step 3: Project Structure
![Project structure](structure.png)


I used npx create-react-app client to quickly create a project template. Therefore, the project is already configured to use Webpack, but the webpack.config.js file is hidden inside the default configuration of Create React App (CRA).

The client-side is functional and can be started using npm start.
Now, let's move on to creating the server-side.

# Step 4: Backend Development

Create a server folder for the backend
mkdir server
cd server

Initialize the backend project:
npm init -y

Install necessary dependencies:

npm install express mongoose cors body-parser

Create  app.js
Ceate model for MongoDB
mkdir models
echo > models/Task.js

# Step 5: Run the Backend

We connect to the MongoDB database. To do this, we create a new cluster  https://cloud.mongodb.com/v2/617fc3ec8a59287999795147#/clusters/detail/Cluster0 and connect it to MongoCompass. Copy the connection string and paste it into our code in app.js. Restart the server using node app.js. The connection is successful, and we see:
MongoDB connected to Atlas
Server running on http://localhost:5000
MongoDB is running, node app.js

To test, go to http://localhost:5000/tasks, and you'll see an empty array since there is no data in the database yet.

#Step 6: Connect Frontend to Backend

Update client/src/App.js to include API calls for managing tasks. For starting the frontend move to client folder:


npm start

Step 7: Add Validation and Error Handling
On the Server: server/app.js 


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

On client: client/app.js

.catch((error) => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
});

# Step 8: Add Advanced Functionality
Add functionality to mark tasks as completed:
On server:

app.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, { completed: req.body.completed }, { new: true });
    res.json(updatedTask);
});

On client: Add a button to toggle task status.

Tasks filtering.


# Step 9: Styling
Use Material-UI for styling:
npm install @mui/material @emotion/react @emotion/styled

# Deployment to Heroku
## Step 1: Prepare for Deployment
### Backend Configuration
Test, that server is ready for deployment:

Update the app.js file to use an environment variable for the port:

const PORT = process.env.PORT || 5000;

-creating Procfile

Heroku use Procfile, to konow how to start the application. Create a Procfile in the project root:

web: node server/app.js



## Step 2: Configure Heroku
    1. Install Heroku CLI
    
    https://devcenter.heroku.com/articles/heroku-cli

    2. Set environment variables for MongoDB:

    Our app use MongoDB Atlas, so set variable MONGO_URI:

    3.create app at Heroku
    heroku create simple-web-service

heroku config:set MONGO_URI="mongodb+srv://Dina:VSYSedhiHFWoXL2J@cluster0.5qkjo.mongodb.net/testApp?retryWrites=true&w=majority"

After creation lets unit it to our local repository


heroku git:remote -a simple-web-service

Now heroku knows that we want deploy this application for simple-web-service.

### Step 3: Deploy the Application


Add a remote repository for Heroku:

heroku git:remote -a your-app-name
Push the code to Heroku:

git push heroku main
If your main branch is called master, use:

bash
Copy code
git push heroku master


### Step 4: Integrate the Frontend
#### Integration of the Client-Side
We want to see a complete interface, so the client-side (React) needs to be set up. Here's how to do it:
cd client
npm run build




