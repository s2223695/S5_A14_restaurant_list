# Restaurant List
This is a web app to show restaurant list which is based on express,js.

## Features
+ User can register an account
+ User can login with Facebook
+ Show user's restaurant list at index page with basic data.
+ User can choose sort type of restaurant list.
+ Show detail data of the restaurant you choose.
+ User can search restaurant by name or category at index page.
+ User can add new restaurant.
+ User can edit data of exist restaurant.
+ User can delete restaurant from restaurants list.

## Installing
### Environment
+ node.js 12.13.0
+ bcryptjs
+ body-parser
+ connect-flash
+ dotenv
+ express
+ express-handlebars
+ express-session
+ method-override
+ mongoose
+ mongoDB
+ passport
+ passport-facebook
+ passport-local

### Step
Choose a [dir] as a workspace.
First, clone this project to the [dir].
```
git clone https://github.com/s2223695/S5_A14_restaurant_list.git [dir]
```
Switch to the project folder.
```
cd S5_A14_restaurant_list/
```
Install the modules.
```
npm install
```
Create .env file in project root path, add the content below to the file
```
FACEBOOK_ID= //your Client ID
FACEBOOK_SECRET= //your Client secret
FACEBOOK_CALLBACK= http://localhost:3000/auth/facebook/callback
```
Run the Express server with normal setting.
```
npm run start
```
Or, run the Express server with develop setting.
```
npm run dev
```
Now, you can go to http://localhost:3000 with your browser.

In addition, you can setup seed data before start the Express server
```
npm run seed
```