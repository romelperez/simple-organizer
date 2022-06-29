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

When a signed in user enters the app index:

- [x] Should see all boards with number of tasks in creation chronological
  descending order.
- [x] Should be able to create a new board and inmediately see it in the list.
- [x] Should be able to open a specific board.

### Board and Tasks

When a signed in user opens a board:

- [x] Should be able to edit board name.
- [x] Should be able to delete board.
- [x] Should see all uncompleted and completed tasks
  with a counter of the number of tasks in list and a progress percentage
  in creation chronological ascending order.
- [x] Should be able to create a new task with a name.
- [x] Should be able to edit if a task is completed or not.
- [x] Should be able to edit any task name.
- [x] Should be able to delete any task.
- [x] Should be able to list only uncompleted tasks.
- [x] Should be able to complete all uncompleted tasks.
- [x] Should be able to delete completed tasks.

## Functional Requirements

- [x] App is a SPA with code-splitting for each page.
- [x] Only latest browser versions supported.
- [x] Should work for mobile and desktop browsers.
- [x] Should work from minimum 360px browser viewport width.
- [x] When a board is deleted, all its corresponding tasks should be deleted too.
- [ ] Should add analytics tracking.

### Performance

- [x] JavaScript/CSS files should be bundled and splitted for each application page.
- [x] HTML/JavaScript/CSS/JSON files should be minified.
- [x] Server encoding in GZIP or Brotli.
- [x] Should work on Fast 3G connection with response time less than 2 seconds.
- [x] Use `webp` image file format and fallback `jpg` and `svg`.
- [x] Images should be lazy loaded.
- [x] Should show optimistic updates on user data changes side-effects.
- [x] Animations should only trigger repaint.
- [x] Show loading skeletons for page data content after 500ms wait.
- [ ] Analytics file should be loaded after main app.
- [x] Preconnect to image assets servers.
- [x] Preconnect to font assets servers.
- [x] Font assets should be loaded and swapped.

### Accessibility

- [ ] Should allow dark and light theme color schemes.
- [ ] Should allow to reduce/disable animations.
- [x] Visual colors should have AA contrast ratio.
- [x] Edition form inputs should update data when user blurs from them on change.
- [ ] Should show social media share metadata.
- [x] Images should have alternative texts.
- [x] Form inputs should have autocomplete names where needed.
- [x] Call to actions should have titles with longer explanations.
- [x] Call to action elements should be able to be focused with keyboard.
- [x] Use CSS REM units for user resizing customization.
- [x] Call to action elements should have at least 40px size.
- Requires Internet connection to work. Offline mode is not supported.
- Requires JavaScript enabled to work.
- Since content is dynamically created and private, it is not crawable by search engines.
- Does not require schema markup data.
- Not available for screen readers.

## Data Models

### User

- Id as string.
- Email.
- Password.
- Name.
- Photo.
- Created datetime.
- Updated datetime.

### Board

- Id as string.
- User as a reference to user owner.
- Name as string.
- Created datetime.
- Updated datetime.

### Task

- Id as string.
- User as a reference to user owner.
- Board as a reference to parent board.
- Name.
- Completed as boolean.
- Created datetime.
- Updated datetime.
