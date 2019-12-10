# Catch me there

## Create events of anyhting you do and want people to join you.

## Join created events.

## You can merge an event with a concert.



## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start saving favorite restaurants
-  **Login:** As a user I can login to the platform so that I can see my favorite restaurants
-  **Logout:** As a user I can logout from the platform so no one else can use it

-  **New Event** As a user you are able to create a new group, of your own idea of event or to link it with an existing concert, adding photo and theme song.
-  **explore ** As a user you are able to find concerts in your town and creat groups going to this event
-  **Join** As a user you can join existing groups of custom events or concerts.
-  **Profile** As a user you can see what information is being stored on your profile.
-  **Edit Profile** As a user you can edit your profile details, add photo and favorite song.

200 OK
201 Created
202 Accepted

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed

## Backlog

- self deleting events

Top songs of artist when seing a concert details:
- connect to spotify API and find top songs of that artist

Geo Location:
- find results by "my location"
- adding location to event by touch
  

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form

- /events/join - see existing events
- /events/join/:eventid - show specific event
- /events/delete/:eventid
- /events/attending/:eventId - show specific event who joined

- /events/concerts/:city - find concerts
- /events/concerts/detail/:concertId - show specific concert 

- /events/create/event - create custom event
- /events/create/event/:concertId - create event from concert

- /profile/ - my details 
- /profile/edit - edit my profile // backlog //
- /profile/user/:id - another person details



- 404

## Pages

- Home Page (public)

- Sign in Page (anon only)
- Log in Page (anon only)

- Events List Page (user only)
- Event (user only)
- Concert List Page (user only)
- Concert (user only)

- Profile Page (user only)
- Edit Profile Page (user only)

- 404 Page (public)

## Components

- Events Card component
  - Input: events = Events.find()
  - Output: this.props.events.title, photo, id, theme song, max people etc.)
- Search component
  - Sort: sort by date
  
- Event card component
	-Input: eventId
	-Output: event details
  
- Concerts card component
- Search component
  - Location: typed or "my location"
Output from API: photo, title, description
Output from Spotify API: top songs by artist

- Concert card component
	-Input: concerttId
	-Output: concert details

- Create event card component
  -Input: ConcertId if existing
  -Output: form to add all details
  
- Profile card component
	-Input: UserId
	-Output: user details
	
- Edit Profile card component
	-Input: UserId
	-Output: form
	// backlog

## IO



## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()


- Concert Service
  - concert.getAllByCity(city)
  - concert.detail(id)
  
  - event.all()
  - event.detail(eventId)
  - event.remove(eventId) 
  - event.update(eventId, body)

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
attending - [ObjectID<Events>]
organizing - [ObjectID<Events>]
whatsAppNumber - number
photo - string (link) // required
```

Event model

whatsAppGroup - String // required
title - string // required
description - string // required
vibe - string
max people - number
coming - number
location - string 
date - string // required
hour - string // required
ageRange - string
photo - string (link)
themeSong - string (link)
concertId - [ObjectID<concertsAPI>]




## API Endpoints/Backend Routes


- GET /auth/me
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)


- GET /events/:eventid - return specific event details
- GET /events - get all existing events

- POST /events/:concertId - create event from concert
- POST /events - create custom event
- PUT  /events/:eventId - add coming

- DELETE /events/delete/:eventid - delete specific event


- GET /concerts/:city - find concerts
- GET /concerts/:concertId - show specific concert 

- GET /user/:userId - my details
- PUT /user/:userId - Edit my details 

   
  

## Links

### Trello/Kanban

https://ibb.co/gWpDtTc

### Git

The url to your repository and to your deployed project



### Slides

The url to your presentation slides
https://docs.google.com/presentation/d/1kIU02yx6w_WevpjWLfX4BD7rbsjUcgBmfgUqQb5j3Gk/edit#slide=id.p