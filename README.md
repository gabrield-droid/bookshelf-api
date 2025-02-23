# bookshelf-api by dicoding

This project is a REST API that can add, edit, delete, and show books. It was a submission project to acquire a certificate from Dicoding.

### Limit:
This API only stores the data in an array variable. The data will be lost every restart.

## Initialisation
1. Install NodeJS v18.13.0 LTS via nvm
   * ```bash
     nvm install v18.13.0
     ```
2. Install packages required in the project directory
   * Open a terminal and change the directory to the project directory and type this command below:
     ```bash
     npm install
     ```
## Run the API
* Open a terminal and change the directory to the project directory.
* Type this command to run the API:
  ```bash
  npm run start
  ```
  It will create a web server than runs on [http://localhost:9000](http://localhost:9000).

## How to use the API;

### 1. Saving a book
   * Method: **POST**
   * URL: **/books**
   * Body Request:
     ```
     {
       "name": string,
       "year": number,
       "author": string,
       "summary": string,
       "publisher": string,
       "pageCount": number,
       "readPage": number,
       "reading": boolean
     }
     ```
     Example:

### 2. Showing all the books
   * Method: **GET**
   * URL: **/books**
### 3. Showing a book's details
   * Method: **GET**
   * URL: **/books/{bookId}**
### 4. Editing a book
   * Method: **PUT**
   * URL: **/books/{bookId}**
   * Body request:
     ```
     {
       "name": string,
       "year": number,
       "author": string,
       "summary": string,
       "publisher": string,
       "pageCount": number,
       "readPage": number,
       "reading": boolean
     }
     ```
### 5. Deleting a book
   * Method: **DELETE**
   * URL: **books/{bookId}**