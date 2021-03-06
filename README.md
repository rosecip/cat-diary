## Cat Diary

<img width="1512" alt="Screen Shot 2022-05-29 at 2 54 19 PM" src="https://user-images.githubusercontent.com/102383483/170887113-e48a3ef1-3e06-42e3-9c6a-457e5d2215e9.png">

Cat Diary is a application where users can log cats that they've met, or view cats that other users have met. A user can then write a diary entry about their experiences meeting a particular cat, or view diary entries written by other users. When a user visits the "Adopt a Cat" page, they can enter their zip code and view adoptable cats nearby. Clicking on an adoptable cat will allow a user to visit the cat's petfinder listing.

[Visit Cat Diary](https://your-cat-diary.herokuapp.com/)

## Setup

After cloning:

```
$ yarn install
```
To create the PostgreSQL database:
```
$ cd server
$ createdb cat-diary-development
$ yarn run migrate:latest
```
To run the server locally:
```
$ yarn run dev
```

## To Do List

- PetFinder API integration 
- "About the Developer" page
- Edit / Delete features
