# Simple Organizer

[![ci](https://github.com/romelperez/simple-organizer/workflows/ci/badge.svg)](https://github.com/romelperez/simple-organizer/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/51b96b1c-f001-4dd1-81a4-e7b02eb2f875/deploy-status)](https://app.netlify.com/sites/romelperez-simple-organizer/deploys)
[![License](https://img.shields.io/github/license/romelperez/simple-organizer.svg?maxAge=2592000&style=flat-square)](https://github.com/romelperez/simple-organizer/blob/main/LICENSE)

Manage simple personal tasks.

Open [production preview](https://main--romelperez-simple-organizer.netlify.app).

See [system design](./SYSTEM_DESIGN.md).

## Setup

```bash
nvm use
npm install
cp example.env .env
# configure environment variables
```

## Workflow

```bash
# development environment
npm run dev

# production environment
npm run build
npm run serve
```
