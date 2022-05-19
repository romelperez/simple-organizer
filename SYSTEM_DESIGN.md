# System Design

Simple Organizer is a small single page web application to manage personal tasks.

## User Requirements

### General

- [x] Users need to be signed up and signed in to manage boards and tasks.

### Users management

- [x] Should be able to sign up.
- [x] Should be able to sign in.
- [x] Should be able to sign out.

### Boards

When a user enters the app index:

- [x] Should see all boards with number of tasks in creation chronological
  descending order.
- [x] Should be able to create a new board and inmediately see it in the list.

### Board and Tasks

When a user opens a board:

- [x] Should be able to edit board name.
- [x] Should be able to delete board.
- [x] Should see all uncompleted and completed tasks
  with a counter of the number of tasks in list and a progress percentage
  in creation chronological descending order.
- [x] Should be able to create a new task with a name.
- [x] Should be able to editor any task completation.
- [x] Should be able to edit any task name.
- [x] Should be able to delete any task.
- [x] Should be able to list only uncompleted tasks.
- [x] Should be able to complete all tasks.
- [x] Should be able to delete completed tasks.

## Functional Requirements

- [x] App is a SPA with code-splitting for each page.
- [x] Should work for mobile from 360px viewport width and any desktop viewport size.
- [x] When a board is deleted, all its corresponding tasks should be deleted too.
- [x] Should show optimistic updates on user data changes side-effects.

## Data Models

### User

- Email.
- Password.
- Name.
- Photo.
- Created date.
- Last updated date.

### Board

- Name as string.
- Created date.
- Last updated date.

### Task

- Board as a reference to parent board.
- Name.
- Completed as boolean.
- Created date.
- Last updated date.
