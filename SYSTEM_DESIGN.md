# System Design

Simple Organizer is a small single page web application to manage personal tasks.

## User Requirements

- [x] Users need to be signed up and signed in to manage boards and tasks.
- [x] Language is English.

### Users management

- [x] Should be able to sign up with name, email, and password.
- [x] Should be able to sign in with email and password.
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
  in creation chronological ascending order.
- [x] Should be able to create a new task with a name.
- [x] Should be able to editor any task completation.
- [x] Should be able to edit any task name.
- [x] Should be able to delete any task.
- [x] Should be able to list only uncompleted tasks.
- [x] Should be able to complete all tasks.
- [x] Should be able to delete completed tasks.

## Functional Requirements

- [x] App is a SPA with code-splitting for each page.
- [x] Only latest browser versions supported.
- [x] Should work for mobile and desktop browsers.
- [ ] Should work from minimum 360px browser viewport width.
- [x] When a board is deleted, all its corresponding tasks should be deleted too.
- [ ] Should add analytics tracking.

### Performance

- [x] JavaScript/CSS files should be bundled and splitted for each application page.
- [x] HTML/JavaScript/CSS/JSON files should be minified.
- [x] Server encoding in GZIP or Brotli.
- [ ] Should work on Fast 3G connection with response time less than 2 seconds.
- [ ] Use webp image file format for pictures.
- [ ] Images should be lazy loaded.
- [x] Should show optimistic updates on user data changes side-effects.
- [ ] Animations should only trigger repaint.
- [ ] Show loading skeletons for page data content.
- [ ] Analytics file should be loaded after main app.
- [ ] Preconnect to image assets servers.
- [x] Preconnect to font assets servers.
- [x] Font assets should be loaded and swapped.

### Accessibility

- [ ] Since content is dynamic and private, it is not crawable by search engines.
- [ ] Should allow dark and light theme color schemes.
- [ ] Should allow to reduce/disable animations.
- [ ] Visual colors should have AA contrast ratio.
- [ ] Edition form inputs should update data when user blurs from them on change.
- [ ] Should show social media share metadata.
- [ ] Images should have alternative texts.
- [ ] Form inputs should have autocomplete names where needed.
- [ ] Call to actions should have titles with longer explanations.
- [ ] Call to action elements should be able to be focused with keyboard.
- [ ] Use CSS REM units for user resizing customization.

## Data Models

### User

- Email.
- Password.
- Name.
- Photo.
- Created datetime.
- Updated datetime.

### Board

- Name as string.
- Created datetime.
- Updated datetime.

### Task

- Board as a reference to parent board.
- Name.
- Completed as boolean.
- Created datetime.
- Updated datetime.
