# painting-base2
The general idea of this project is to create a web based tool that will allow users to see number related to images.
The idea is that every possible image is represented by some unique number.



## Requirements

### OpenCV
We will use Anaconda to manage installing python dependancies.

[install anaconda here](https://docs.continuum.io/anaconda/install#linux-install)

```bash
# install opencv
conda install -c menpo opencv=2.4.11
# test opencv
python -c "import cv2"
```


## Running the app
```bash
npm install
npm install webpack -g
npm start
```
To run the distribution server
```bash
npm run-script dist

```

## File structure
### Client
holds all the files and configuration pertaining the front-end.
- `index.js` is react's entry point
- `assets/` will hold images and sass files
- `app/` will hold all the components of our app, organization is TBD


### Server
will hold all files needed to run the server and image generation.

### Root
- `.babelrc` config for [babel](https://babeljs.io/), our jsx & es6 transpiler
- `.editorconfig` has suggestions for how we write code. Best practice to connect your [editor](http://editorconfig.org/#download).
- `.eslintrc.js` coding style guide for your [editor](http://eslint.org/docs/user-guide/integrations)
- `webpack.config.js` builds the project with different configuration for dev & prod
- `package.json` holds all our dependancies as well as our top-level scripts
- `webpack.paths.js` paths used by `webpack.config.js`



##Outside the SRC
The first file to see is the webpack.config.js. This file deals with packaging the javascript files into one bundle.
The next important file is the package.json. This file contains all of the npm packages and other specifications we are using in this project

##Inside the SRC
###static
The static folder contains all static files, this would include plain .js files, css files, images and other assets. Please place a file in the correct subfolder in the static folder.

###components
This folder is where all of the react components will be stored. On top of this the Layout.js is the base template for all components.

###views
Currently there is only index.ejs this is the base template for the entire site. As it is structured now it is a single page website

###Other files
Finally there is routes.js that handles the react routing.
Server.js that handles the node deployment and routing through express
and lastly app-client.js that handles rendering.

Most of this structure came from [this tutorial](https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app) Take a peak if your a little confused how it works.
