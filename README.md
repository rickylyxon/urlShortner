# URL Shortener

## Description

This URL shortener is a simple web application that allows users to shorten long URLs into shorter, more manageable links. It provides a convenient way to share links while conserving space and making URLs more user-friendly.

## Technologies Used

- Node.js
- Express.js
- React.js
- TypeScript
- PostgreSQL (or any other database of your choice)
- Axios (for making HTTP requests)
- Prisma (for database operations)
- React Router (for routing in the frontend)
- Tailwind CSS (or any other CSS framework for styling)

## Setup Instructions

1. Clone the repository to your local machine:

```bash
git clone https://github.com/rickylyxon/urlShortner.git
```

2. Install dependencies for the backend and frontend:

```
cd backend
npm install
cd frontend
npm install
```

3. Set up the database:

- Create a PostgreSQL database for the URL shortener.
- Update the database configuration in the .env file.

4. Run the migrations to create the necessary tables:

```
npx prisma migrate dev
```

## Build

To build the TypeScript project:

1. Run the TypeScript compiler to transpile TypeScript code to JavaScript:

```
npx tsc -b
```

2. The compiled JavaScript files will be generated in the dist directory.

## Running the Application

After building the project, you can run the backend and frontend separately:

### Backend:

To start the backend server:

```
node ./dist/index.js
```

### Frontend

To start the frontend development server:

```
npm run dev
```

Access the application in your web browser at http://localhost:5173.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to improve the URL shortener.
