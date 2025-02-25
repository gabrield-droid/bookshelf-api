# bookshelf-api by dicoding

This project is a REST API that can add, edit, delete, and show books. It was a submission project to acquire a certificate from Dicoding.

### Limitation/s:
This API only stores the data in an array variable. The data will be lost upon every restart.

## Data structure:

Data example:
```json
{
  "id": "Qbax5Oy7L8WKf74l",
  "name": "Buku A",
  "year": 2010,
  "author": "John Doe",
  "summary": "Lorem ipsum dolor sit amet",
  "publisher": "Dicoding Indonesia",
  "pageCount": 100,
  "readPage": 25,
  "finished": false,
  "reading": false,
  "insertedAt": "2021-03-04T09:11:44.598Z",
  "updatedAt": "2021-03-04T09:11:44.598Z"
}
```
The properties ```id```, ```finished```, ```insertedAt```, ```updatedAt``` are managed by the server.
The other properties are input by the client.

## Installation
1. Make sure you have ```nvm``` installed. If you don't have, install it using these commands below:
   * ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
     ```
     You could skip this step if you would like to install NodeJS in the other way
2. Install NodeJS v18.13.0 LTS via nvm:
   * ```bash
     nvm install v18.13.0
     nvm use v18.13.0
     ```
3. Install packages required in the project directory:
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
  It will create a web server that runs on [http://localhost:9000](http://localhost:9000).

## How to use the API

### 1. Saving a book
   Request:
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
     
   Response:
   1. If client doesn't send the property ```name```:
      * Status Code: **400**
      * Response Body:
        ```json
        {
          "status": "fail",
          "message": "Gagal menambahkan buku. Mohon isi nama buku"
        }
        ```
   2. If the ```readPage``` value is more than the ```pageCount``` value:
      * Status Code: **400**
      * Response Body:
        ```json
        {
          "status": "fail",
          "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }
        ```
   3. If the book is successfully added:
      * Status Code: **201**
      * Response Body:
        ```json
        {
          "status": "success",
          "message": "Buku berhasil ditambahkan",
          "data": {
            "bookId": "1L7ZtDUFeGs7VlEt"
          }
        }
        ```

### 2. Showing all the books
   Request:
   * Method: **GET**
   * URL: **/books**
   * Query parameters (optional, for filters):
     * **?name**, shows all books that have the name containing the value of this query.
     * **?reading**, shows all reading books if its value is ```true``` or ```1```, or all unread books if its value is ```false``` or ```0```.
     * **?finished**, shows all finished books  if its value is ```true``` or ```1```, or all unfinished books if its value is ```false``` or ```0```.
  
   Response:
   1. If there are some books:
      * Status Code: **200**
      * Response Body:
        ```json
        {
          "status": "success",
          "data": {
            "books": [
              {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
              },
              {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
              },
              {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
              }
            ]
          }
        }
        ```
   2. If there have not been books yet:
      * Status Code: **200**
      * Response Body:
        ```json
        {
          "status": "success",
          "data": {
            "books": []
          }
        }
        ``` 

### 3. Showing book's details
   Request:
   * Method: **GET**
   * URL: **/books/{bookId}**

   Response:
   1. If the book's  ```id``` is not found:
      * Status Code: **404**
      * Response Body:
        ```json
        {
          "status": "fail",
          "message": "Buku tidak ditemukan"
        }
        ```
   2. If the book's ```id``` is found:
      * Status Code: **200**
      * Response Body:
        ```json
        {
          "status": "success",
          "data": {
            "book": {
              "id": "aWZBUW3JN_VBE-9I",
              "name": "Buku A Revisi",
              "year": 2011,
              "author": "Jane Doe",
              "summary": "Lorem Dolor sit Amet",
              "publisher": "Dicoding",
              "pageCount": 200,
              "readPage": 26,
              "finished": false,
              "reading": false,
              "insertedAt": "2021-03-05T06:14:28.930Z",
              "updatedAt": "2021-03-05T06:14:30.718Z"
            }
          }
        }
        ```

### 4. Editing a book
   Request:
   * Method: **PUT**
   * URL: **/books/{bookId}**
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
   Response:
   1. If client doesn't send the property ```name```:
      * Status Code: **400**
      * Response Body:
        ```json
        {
          "status": "fail",
          "message": "Gagal memperbarui buku. Mohon isi nama buku"
        }
        ```
   2. If the ```readPage``` value is more than the ```pageCount``` value:
      * Status Code: **400**
      * Response Body:
        ```json
        {
          "status": "fail",
          "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }
        ```
   3. If the book's  ```id``` is not found:
      * Status Code: **404**
      * Response Body:
        ```json
        {
          "status": "fail",
          "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }
        ```
   4. If the book is successfully updated:
      * Status Code: **200**
      * Response Body:
        ```json
        {
          "status": "success",
          "message": "Buku berhasil diperbarui"
        }
        ```

### 5. Deleting a book
   Request:
   * Method: **DELETE**
   * URL: **books/{bookId}**

   Response:
   1. If the book's  ```id``` is not found:
      * Status Code: **404**
      * Response Body:
        ```json
        {
          "status": "fail",
          "message": "Buku gagal dihapus. Id tidak ditemukan"
        }
        ```
   2. If the book's ```id```is found:
      * Status Code: **200**
      * Response Body:
        ```json
        {
          "status": "success",
          "message": "Buku berhasil dihapus"
        }