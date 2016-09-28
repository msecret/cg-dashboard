# AusDTO Cloud Foundry Dashboard

[![CircleCI](https://circleci.com/gh/AusDTO/cg-dashboard.svg?style=svg)](https://circleci.com/gh/AusDTO/cg-dashboard)

[Production](https://dashboard.cloud.gov)
[Master](https://dashboard-master.apps.cloud.gov)
[Staging](https://dashboard-staging.apps.cloud.gov)


## Introduction

This dashboard is a web application to manage cloud.gov organizations, spaces, services, and apps.

Learn more about [cloud.gov](https://cloud.gov).

## Tech Stack

### Backend Server [![Go Code Coverage Status](https://coveralls.io/repos/AusDTO/cg-dashboard/badge.svg?branch=master&service=github)](https://coveralls.io/github/AusDTO/cg-dashboard?branch=master)
- `Go` (version 1.6.2)

### Front end application [![JS Code Coverage Status](https://coveralls.io/repos/AusDTO/cg-dashboard/badge.svg?branch=master&service=github)](https://coveralls.io/repos/AusDTO/cg-dashboard/badge.svg?branch=master&service=github)
- `Node` (version 6.x.x)
- `React` (version ^0.14.0)

## Setup
### Cloning the repository
If you are unfamiliar with [`Go` project directory structure](https://golang.org/doc/code.html#Workspaces), you want the code in this repository to be in something like `<your-code-directory>/cg-dashboard-ws/src/github.com/AusDTO/cg-dashboard`. You can use that exact pattern by cloning the repository with:

```
git clone git@github.com:AusDTO/cg-dashboard.git cg-dashboard-ws/src/github.com/AusDTO/cg-dashboard
```

### Create a Client with UAAC
- Make sure [UAAC](https://github.com/cloudfoundry/cf-uaac) is installed.
- Target your UAA server. `uaac target <uaa.your-domain.com>`
- Login with your current UAA account. `uaac token client get <your admin account> -s <your uaa admin password>`
- Create client account:
```
uaac client add <your-client-id> \
 --authorities uaa.none \
 --authorized_grant_types authorization_code,client_credentials,refresh_token \
 --scope cloud_controller.admin,cloud_controller.read,cloud_controller.write,openid,scim.read \
 --autoapprove true \
-s <your-client-secret>
```
- Unable to create an account still? Troubleshoot [here](https://docs.cloudfoundry.org/adminguide/uaa-user-management.html#creating-admin-users)

### Set the environment variables
If you are testing locally, export these variables. There is a sample file of environment variables called `env.sample`. Feel free to copy it and use the proper data. If you've never used environment variables before, you can run the following:
`mkdir ~/.env && cp ./env.sample ~/.env/cg-dashboard`

Then edit the file `~/.env/cg-dashboard` and provide the proper values. When you want to set all the environment variables, just run `source ~/.env/cg-dashboard`. You'll have to do this every time you open a new shell.

If you are deploying to cloud foundry, modify the `manifest.yml`

- `GOPATH`: The absolute path to your project root. If you followed the cloning instructions above, this path should end with `cg-dashboard-ws`
- `CONSOLE_CLIENT_ID`: Registered client id with UAA.
- `CONSOLE_CLIENT_SECRET`: The client secret.
- `CONSOLE_HOSTNAME`: The URL of the service itself.
- `CONSOLE_LOGIN_URL`: The base URL of the auth service. i.e. `https://login.domain.com`
- `CONSOLE_UAA_URL`: The URL of the UAA service. i.e. `https://uaa.domain.com`
- `CONSOLE_API_URL`: The URL of the API service. i.e. `http://api.domain.com`
- `CONSOLE_LOG_URL`: The URL of the loggregator service. i.e. `http://loggregator.domain.com`
- `PPROF_ENABLED`: <optional> If set to `true` or `1`, will turn on `/debug/pprof` endpoints as seen [here](https://golang.org/pkg/net/http/pprof/)
- `CG_STYLE_PATH`: <optional> The absolute path to your `cg-style` repo. If set, will use a local copy of `cloudgov-style` to build the front end application.

## Front end
Front end build commands should be run in the same directory as the `package.json` file. If you've used the cloning command from this README it should be something like `/path/to/cg-dashboard-ws/src/github.com/AusDTO/cg-dashboard`

Install front end dependencies (may require [special steps for node-gyp](https://github.com/nodejs/node-gyp#installation)):
```
npm install
```

Build the code:
```
npm run build
```
or to continually watch and build with changes:
```
npm run watch
```

To run the tests:
```
npm run test
```
or to continually watch for changes and run test suite (does not build front end app):
```
npm run watch-test
```

To lint the code:
```
npm run lint
```

In order to get correct synatax highlighting with vim, install the following
npm modules globally:

```
npm install -g eslint
npm install -g babel-eslint
npm install -g eslint-plugin-react
```

## Running locally
- Make sure all of your environment variables are set and you are using the Go version as mentioned above.
- Install [glide](https://github.com/Masterminds/glide)
- Run `glide install` to get all third party code
- `go run server.go`
- Navigate browser to [`http://localhost:9999`](http://localhost:9999)

### Run locally without needing Go
This is an easy way to test out front end changes without needing to set up environment variables or `Go`. We will use a small server with fake data (used for automated testing) to get going quickly. If you want to see live data, you'll need to follow the instructions above.

The command `npm run testing-server` will run the server. We will still be using `npm run watch` to build the front end application when the file changes.

#### Start it
- `npm install` to get the Javascript dependencies
- `npm run testing-server & npm run watch` to start the server and build process

#### Stop it
Now when you're done, you'll want to stop the `testing-server` that is running in the background. You can find it by running `jobs`, and the line that looks like this:

`[N]  + running    npm run testing-server`

To kill that process, run `kill %N` where "N" is the number from the line.

## Unit Testing
### Running Go unit tests
- `go test $(glide nv)`

### Running Javascript unit tests
Test can then be run with the command:
```
npm run tests
```
To get a viewable coverage report change the `coverageReport` object in `karma.conf.js` from `json` to `html`
```
coverageReporter: {
    type: 'html',
    dir: 'coverage',
    subdir: '.'
}
```

### Acceptance Tests
This project currently uses a combination of [Agouti](http://agouti.org/) + [Ginkgo](http://onsi.github.io/ginkgo/) + [Gomega](http://onsi.github.io/gomega/) to provide BDD acceptance testing.
All the acceptance tests are in the 'acceptance' folder.


#### Setup
- Make sure you have PhantomJS installed: `brew install phantomjs`
- Install aogut: `go get github.com/sclevine/agouti`
- Install ginkgo `go get github.com/onsi/ginkgo/ginkgo`
- Install gomega `go get github.com/onsi/gomega`
- To run locally, in addition to the variables in the "Set the environmnent variables" section, you will need to set two more variables in your environment
- `CONSOLE_TEST_USERNAME`: The username of the account you want the tests to use to login into your `CONSOLE_LOGIN_URL`
- `CONSOLE_TEST_PASSWORD`: The password of the account you want the tests to use to login into your `CONSOLE_LOGIN_URL`
- `CONSOLE_TEST_ORG_NAME`: The test organization the user should be navigating to.
- `CONSOLE_TEST_SPACE_NAME`: The test space the user should be navigating to.
- `CONSOLE_TEST_APP_NAME`: The test app the user should be navigating to.
- `CONSOLE_TEST_HOST`: The host that the app can create a mock route for.
- `CONSOLE_TEST_DOMAIN`: The domain for the mock route.

#### Running acceptance tests
##### Make sure you have docker installed on your computer

For automated mode:

- `acceptance/scripts/run_test.sh -a`

For debug mode where the developer can vnc into the container and the browser execute the commands:

- `acceptance/scripts/run_test.sh -d`
- Once inside the container, run `acceptance/scripts/debug.sh`

## Deploying

The cloud.gov dashboard is continuously deployed by CircleCI.

### Bootstrap Deployment Spaces
In each space that you plan on deploying, you need to create a `user-provided-service`.

Run:
```
# For applications without New Relic monitoring
cf cups dashboard-ups -p '{"CONSOLE_CLIENT_ID":"your-client-id","CONSOLE_CLIENT_SECRET":"your-client-secret"}'

# For applications with New Relic monitoring
cf cups dashboard-ups -p '{"CONSOLE_CLIENT_ID":"your-client-id","CONSOLE_CLIENT_SECRET":"your-client-secret","CONSOLE_NEW_RELIC_LICENSE":"your-new-relic-license"}'
```

### CI
This project uses CircleCI
- The following environment variables need to be set in plain text in the global env section:
  - `CONSOLE_API_URL`, `CONSOLE_UAA_URL`, `CONSOLE_LOG_URL`, `CONSOLE_LOGIN_URL`, `CONSOLE_HOSTNAME="http://localhost:9999"`, `CONSOLE_TEST_ORG_NAME`, `CONSOLE_TEST_SPACE_NAME`, and `CONSOLE_TEST_APP_NAME`
- In case you fork this project for your own use (no need to do this if forking to make a pull request), you will need to use the CircleCI CLI UI to set the variables
