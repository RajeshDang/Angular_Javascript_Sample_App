# Enrollee Details System

This application is providing the following features for the users:
- Users can view a list of all enrollees in the system
- Users should be able to see all of the data related to an enrollee (their id, activation status, name, date of birth)
- Users should be able to tell which enrollees are activated and which are not at a glance
- Users should be able to change the name and activation status of an enrollee
- Users **cannot** modify the id or date of birth of an enrollee
- Handling an internal server error while Getting or modifying enrollees.

## Running the backend server
Navigate to `server` folder inside root folder and run the below command

```
deno run --allow-net server.ts
```

Note: Front-end application is considering the default port `8080` as backend service api port inside front-end application. If you are setting port to any other number then please change it inside app/services/api.service.ts.

## Running front-end application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.
So install Angular CLI to run this application
```
npm install - g @angular/cli
```

## Installing dependencies
navigate to `client` folder inside root folder and run the below command
```
npm install
```

## Development server

Run below command for a dev server.
```
ng serve
```
Navigate to `http://localhost:4200/` in the browser.