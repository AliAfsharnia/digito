# Digito Backend Project! 

This project is a web application that allows users to order products online and manage their profile.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AliAfsharnia/Digito.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Digito
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the database (PostgreSQL):
   Create a `.env` file with your database credentials:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
   ```

5. Run migrations:
   ```bash
   npm run db:migrate
   ```
  
6. Run seeds:
   ```bash
   npm run db:seed
   ```

7. Start the application:
   ```bash
   npm run start:dev
   ```

## Usage

1. Register a new user:
   - Method: `POST`
   - Endpoint: `/user`
   - Body: multipart/form-data
     ```
     {
       "username": "johndoe",
       "email": "johndoe@example.com",
       "password": "yourpassword"
     }

     and en image for profile
     ```

2. Login to the application:
   - Method: `POST`
   - Endpoint: `/auth/login`
   - Body:
     ```json
     {
       "email": "johndoe@example.com",
       "password": "yourpassword"
     }
     ```

3. Get the list of products:
   - Method: `GET`
   - Endpoint: `/products`

4. add product to your favorite:
   - Method: `Post`
   - Endpoint: `/product/{id}/favorite`

5. order a product:
   - Method: `POST`
   - Endpoint: `/order`
   - Body:
     ```json
    [
      {
        "productProductId": "1",
        "quantity": "1"
      },
    ]

6. add your comment on a product:
   - Method: `POST`
   - Endpoint: `/products/{id}/comments`
   - Param: id: 1
   - Body:
     ```json
    {
      "subject": "string",
      "rating": "number 1 - 5",
      "context": "string",
      "images": "string, string"
    }

7. add your address:
   - Method: `POST`
   - Endpoint: `/users/address`
   - Body:
     ```json
    {
      "description": "string",
      "city": "number",
      "province": "number",
      "street": "string",
      "tag": "string"
    }

## API Endpoints
use #swagger to see api list

## Authors

- **Ali Afsharnia** - *Initial work* - [AliAfsharnia](https://github.com/AliAfsharnia)