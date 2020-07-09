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
 
 Test Environment
 ----------------
 
 Database configuration is configured in `setenv.sh`. 
 Note: Test environment is mapped as externally as `mapstore3`, but deployed in tomcat as `mapstore2`. This causes an issue because the print plugin doesn't calculate the correct path to provide in `info.json` (that describes the print services).
 For this reason MapStore2 we needed to customize `PRINT_BASE_URL` in `setenv.sh`
 
 /var/lib/tomcat/mapstore2/bin/setenv.sh: 
 ```
 export JAVA_OPTS="$JAVA_OPTS -Dgeostore-ovr=file:///var/lib/tomcat/mapstore2/conf/geostore-datasource-ovr.properties"
 export JAVA_OPTS="$JAVA_OPTS -DPRINT_BASE_URL=\"/mapstore3/pdf\""
 
 ```

### Release

First: We update the project by updating the submodule to a specific stable branch
Second: After a deploy has been tested we create a tag version.

Se

#### Tag name

For test the convention for the tag name is: v[major].[minor].[patch]-rc
example: v1.1.5-rc

For production the convention for the tag name is: v[major].[minor].[patch]
example: v1.1.5

Note that if the update is big enough you can increase the minor with a patch set to 0, otherwise just increase the patch

To [create a tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) for test, use these steps:
```sh
git checkout master
git tag v1.1.5-rc
git push origin v1.1.5-rc

```

For Production use these steps:
```sh
git checkout production
git tag v1.1.5
git push origin v1.1.5

```
