# Hack the North 2025 Backend Challenge

My submission for the Hack the North backend challenge! 

Check out the swagger docs for more information on the endpoints!

## Tech Stack
- <a href="https://expressjs.com/">Express</a>
- <a href="https://www.sqlite.org/">SQLite</a>
- <a href="https://www.prisma.io/">Prisma</a>
- <a href="https://swagger.io/">Swagger</a>

## Project Structure
- `db_diagram.pdf`: The database diagram generated using dbdiagram.io
- `/src/routes`: The route definitions
- `/src/controllers`: Middle layer that takes care of requests & responses
- `/src/services`: Implementation of the endpoints
- `/src/config`: swagger config file

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/ThomasQi3141/HTN-Backend-Challenge.git
   cd HTN-Backend-Challenge
   ```

2. **Install Dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**  
   Copy the `.env.example` file to `.env` and update it with your configuration.
   ```sh
   cp .env.example .env
   ```

4. **Run Prisma migration**
   ```sh
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run database seeding script**  
   Feel free to modify `example_data.json` before running the seed script.
   ```sh
   node seed.js
   ```

6. **Run the application**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

7. **Access the API docs via Swagger (or test the endpoints directly)**
   - Swagger UI: [`http://localhost:3000/api-docs/#/`](http://localhost:3000/api-docs/#/)
   - Endpoints: [`http://localhost:3000`](http://localhost:3000)

8. **Check out the database using Prisma Studio**
   ```sh
   npx prisma studio
   ```

