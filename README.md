Storly

Storly is a ecommerce store that allows you to create account add product, and order it. I might consider adding more functionalities later on.

![Alt text](./img/Banner.png)

How to Use
1. Clone the Repository

First, clone the repository to your local machine. You can do this using the following command in your terminal:

bash

git clone [Your Repo Link]

[Screenshot: Terminal with git clone command]
2. Install Dependencies

Navigate to the project directory and install the required dependencies using npm:

bash

cd [Your Project Name]
npm install

[Screenshot: Terminal showing npm install command and dependencies being installed]
3. Start the Development Server

Once the dependencies are installed, start the development server:

bash

npm run start

This will start the development server and open the application in your default web browser at localhost:3000.

[Screenshot: Browser window with the app running]
4. Update Piwik PRO Credentials

Navigate to the index.js file located in the /src directory of the project. Update the Piwik PRO credentials (website ID and instance URL) in line 12.

javascript

// Example Code Snippet from index.js
const piwikProCredentials = {
  websiteId: 'YOUR_WEBSITE_ID',
  instanceUrl: 'YOUR_PIWIK_PRO_INSTANCE_URL'
};

[Screenshot: Code editor showing the modified index.js file]
5. Explore the App

Now, the application should be configured and running with your Piwik PRO credentials. Explore the app functionalities!

[Screenshot: Various UI screens of your app]
Note

Please use the provided database and credentials respectfully. It's hosted on a free Google hosting plan, and excessive account registrations or data usage may impact its availability for other users. Thank you for your consideration!
Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
License

MIT © [Your Name]
