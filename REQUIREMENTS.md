# Requirements

"Simple Organizer" is a simple single page web application to manage personal tasks.

## Stories

- User enters index view.
  - Should see all boards of tasks.
  - Each board should show the percentage of tasks completed.
  - Should be able to create a new board.
- User enters board view.
  - Should see all uncompleted and completed tasks in the main view
    with a counter of the number of tasks in list.
  - Can create new tasks with a raw string description.
  - Can edit existing tasks description.
  - Can remove existing tasks.
  - Should be able to list only uncompleted tasks with a counter of
    the visible tasks.
  - Should be able to list only completed tasks with a counter of
    the visible tasks.
  - Should be able to edit board name.
  - Should be able to complete all tasks.
  - Should be able to remove completed tasks.
  - Should be able to remove board.

## Models

### Board

- Name as string.

### Task

- Board as a reference to parent board.
- Name as simple text.
- Completed as boolean.
