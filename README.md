## 1 - Description:
- CRUD web made in and Angular 7 in client side, and PHP (API) with Sqlite3 database in server side with security features.

## 2 - Client side (crud-angular-php):

### 2.1 - Description:
- Angular project in client side for consuming PHP API.

### 2.2 - Tools:

#### 2.1.1 - Additional to "package.json":
- "@angular/cli": "^7.3.7",
- "ngx-pagination": "^3.2.1",
- "ngx-bootstrap": "^3.2.0",
- "http-proxy-middleware": "^0.19.1",
- "express": "^4.16.4"

## 3 - Server side (php-crud-api) 

### 3.1 - Description:
- API made in PHP that make connection, creation, edition and search register to database.

### 3.2 Features CRUD:

- Login with Session (MD5)
- Token (sha512)
- Search for Name and Code

### 3.3 - Security Features:

- SQL Injection protection
- PHP Injection Protection
- Cross Site Scripting Protection
- CSRF Protection

### 3.4 - Tools

- PHP 7.3.3
- PostgreSQL
- PDO (For PHP connection)
- SQLite3
