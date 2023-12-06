# Note App

## Overview

This is a note-taking application developed using Django Rest Framework (DRF) for the backend and React for the frontend. The app allows users to create, manage, and organize their notes.

## Features

### Backend (Django Rest Framework)

- **Custom User Model**:
  - Fields: `first_name`, `last_name`, `email`, `gender`, `password`, `profile_picture`.
  
- **Note Model**:
  - Fields: `user` (ForeignKey to Custom User), `title`, `content`, `created_at`, `updated_at`.

### Frontend (React)

- **Authentication**:
  - Registration Form
  - Login Form
  
- **Notes Management**:
  - List Notes
  - Create/Edit/Delete Note Form
  
- **User Profile Section**:
  - Profile Update Form

### API Endpoints

- User Authentication:
  - Registration (`POST /api/users/register/`)
  - Login (`POST /api/users/login/`)
  - Logout (`POST /api/users/logout/`)
  
- Notes Operations:
  - Create a Note (`POST /api/notes/`)
  - Retrieve all Notes for a User (`GET /api/notes/`)
  - Retrieve, Update, Delete a Note (`GET/PUT/DELETE /api/notes/<note_id>/`)
  
- User Profile Management:
  - Update User Profile (`PUT /api/users/profile/`)

## Installation

### Backend (Django)

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Create a virtual environment.
4. Install dependencies from `requirements.txt`.
5. Apply database migrations.
6. Run the Django development server.

### Frontend (React)

1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install`.
3. Start the React development server.

## Usage

- Access the application via the provided URLs after starting both the backend and frontend servers.
- Register or login to manage notes and update user profiles.

## Technologies Used

- Django Rest Framework
- React
- Axios (for API communication)
- Redux (for state management)

## Contributing

Please read the [Contribution Guidelines](CONTRIBUTING.md) before contributing to this project.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- 
