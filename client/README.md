# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🏠 NyumbaFind

NyumbaFind is a modern full-stack real estate web application that allows users to browse, create, and manage property listings across Kenya.

Built with React, Flask REST API, PostgreSQL, JWT Authentication, and Tailwind CSS.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- User Roles (Admin & User)

### Property Management
- Create Property Listings
- Edit Listings
- Delete Listings
- Upload Multiple Property Images
- Image Gallery
- Search Properties
- Filter Properties
- Pagination

### User Features
- Dashboard
- Favorites
- Profile
- My Properties

### Admin Features
- Admin Dashboard
- User Management
- Platform Statistics
- Admin Authorization

---

## Technologies Used

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Flask
- Flask RESTful
- Flask JWT Extended
- Flask SQLAlchemy
- Flask Migrate

### Database
- PostgreSQL

---

## Installation

### Backend

```bash
cd server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## API Features

- Authentication
- Property CRUD
- Favorites
- Image Upload
- Admin Dashboard
- User Management
- Search & Filtering
- Pagination

---

## Future Improvements

- Google Maps Integration
- Payment Integration
- Property Reviews
- Email Notifications
- Live Chat
- Property Recommendations

---

## Author

Ahmad Yusuf

GitHub:
https://github.com/yusufahmadnaim-web