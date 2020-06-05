Sistema Informativo Territoriale della città di Bolzano
==========

Quick Start
------------

Clone the repository with the --recursive option to automatically clone submodules:

`git clone --recursive https://github.com/geosolutions-it/MapStore2-C028.git`

Install NodeJS >= 4.6.1 , if needed, from [here](https://nodejs.org/en/download/releases/).

Update npm to 3.x, using:

`npm install -g npm@3`

Start the demo locally:

`npm cache clean` (this is useful to prevent errors on Windows during install)

`npm install`

`npm start`

The demo runs at `http://localhost:8081` afterwards.

Read more on the [wiki](git@github.com:geosolutions-it/MapStore2-C028.git/wiki).


To Create a deployable war
--------------------------

Edit the LDAP properties file (DO NOT COMMIT CREDENTIALS) web/ldap.properties.

You can find LDAP credentials [here](https://docs.google.com/document/d/1ASz55b7LDXW5CL6ULmmFnT-dMSjj7fB4c-iN2tW8d_s/edit?usp=sharing)

During the build process the credentials will be applied to geostore-spring-security.xml, so after a deploy is only necessary to check that spring-security file is properly configured


 - Only locally edit the url, userDn and password in **web/ldap.properties**
 - Run build.sh
