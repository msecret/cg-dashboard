#!/bin/bash

# This script will install the autopilot plugin, login, pick the right manifest and deploy the app with 0 downtime.

set -e

curl -v -L -o cf-cli_amd64.deb 'https://cli.run.pivotal.io/stable?release=debian64&source=github'
sudo dpkg -i cf-cli_amd64.deb
cf -v

# Install autopilot
go get github.com/contraband/autopilot
cf install-plugin -f /home/ubuntu/.go_workspace/bin/autopilot

CF_PATH="."
if [[ "$CIRCLE_TAG" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[A-Za-z0-9-]+)? ]]
then
	CF_MANIFEST="manifest-prod.yml"
	CF_APP="cg-dashboard-prod"
elif [ "$CIRCLE_BRANCH" == "master" ]
then
	CF_MANIFEST="manifest-staging.yml"
	CF_APP="cg-dashboard-staging"
else
  exit
fi

echo $CF_MANIFEST

# Log in to cf
cf api $CF_API
cf auth $CF_USERNAME $CF_PASSWORD && cf target -o $CF_ORGANIZATION -s $CF_SPACE
# Set manifest path for australia
MANIFEST_PATH=manifests/aus/$CF_MANIFEST
# Run autopilot plugin
cf zero-downtime-push $CF_APP -f $MANIFEST_PATH -p $CF_PATH
