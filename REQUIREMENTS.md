# Requirements

"Simple Organizer" is a simple single page web application to manage personal tasks.

## Stories

### General

- [x] Users need to be signed up and signed in to manage boards and tasks.

### Users management

- [ ] Should be able to sign up.
- [x] Should be able to sign in.
- [x] Should be able to sign out.

### User boards

When a user enters the app index:

- [x] Should see all boards with number of tasks.
- [x] Should be able to create a new board and inmediately see it in the list.

### User board

When a user opens a board:

- [x] Should be able to edit board name.
- [x] Should be able to remove board.
- [x] Should see all uncompleted and completed tasks
  with a counter of the number of tasks in list and a progress percentage
  in creation chronological descending order.
- [x] Should be able to create a new task with a name.
- [x] Should be able to editor any task completation.
- [x] Should be able to edit any task name.
- [x] Should be able to remove any task.
- [ ] Should be able to list only uncompleted tasks.
- [ ] Should be able to list only completed tasks.
- [ ] Should be able to complete all tasks.
- [ ] Should be able to remove completed tasks.

## Data Models

### User

- Email.
- Password.
- Name.
- Photo.

### Board

- Name as string.

### Task

- Board as a reference to parent board.
- Name.
- Completed as boolean.
