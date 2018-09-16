
## Run Locally

```
brew update && brew install hugo
hugo server
open http://localhost:1313
```

## Build Locally

```
hugo 
npm install -g http-server
cd public && http-server -p 1313 .
open http://localhost:1313
```

## Deploy to Prod

```
heroku buildpacks:set https://github.com/roperzh/heroku-buildpack-hugo.git -a jaketrent-blog
git push heroku master
```
