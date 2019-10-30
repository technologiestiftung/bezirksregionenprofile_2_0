# bezirksregionenprofile_2_0

All data is loaded from API. API data can be edited in the [bezirksregionenprofile-daten
](https://github.com/technologiestiftung/bezirksregionenprofile-daten) repo

## Setup
```npm install```

## Config
Urls ```BASE_URL``` and ```API_URL``` need to be set in ```package.json``` files

In development mode ```BASE_URL``` defaults to ```http://localhost:3000```

Eventually check for CORS settings of API server if request in build process fail.

## Development
```npm run dev```
or
```npm run dev --fix```
to auto fix prettier format problems

## Build
Adjust urls in packagejson

```npm run generate```