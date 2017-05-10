#!/bin/bash

if [[ $TRAVIS_BRANCH != 'master' ]]; then
	# Not master branch aborting
	echo "this is not master"
	exit 0
fi
npm run ghpages
echo "finished build"
npm install -g gh-pages
git config --global user.email "$PUSH_EMAIL"
git config --global user.name "Travis CI"
git config --global push.default simple
echo "Pushing to github pages"
gh-pages -r "https://$PUSH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git" -d dist -x
