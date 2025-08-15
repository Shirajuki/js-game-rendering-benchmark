#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

git init
git checkout -B master
git add -A
git commit -m 'ci: deploy web build'

git push -f git@github.com:shirajuki/js-game-rendering-benchmark.git master:gh-pages

cd -
