## Crud API using nest JS and prisma.
## Description
<p>This simple crud using jwt passport for authentication. You can create, get, update, delete product. For create, update and delete the user role must be admin</p>

## Installation
```bash
# clone this repository
$ git clone https://github.com/DanarCahyadi12/nestjs-crud.git

```
```bash
# change directory
$ cd nestjs-crud
```
```bash
# install dependencies
$ npm install

```
change database configuration on .env based on your database. 

```bash
# migrate prisma tables to your database. 
$ npx prisma migrate dev --name initial_migrate

```


## Routes
```bash
# sign up route
http://127.0.0.1:3000/signup

```
<table>
 <tr> 
    <th>Method</th>
    <th>Request body</th>
    <th>Success response</th>
    <th>Error response</th>
    <th>Status code</th>
 </tr>
 <tr> 
    <td>POST</td>
    <td>
     <ul>
      <li>name: string </li>
      <li>email: string </li>
      <li>password: string </li>
      <li>role: string (user | admin)</li>
     <ul>
    </td>
    <td>
     <img src='https://user-images.githubusercontent.com/110749286/279913489-00735e08-4a81-4871-92bd-c86fad0a7f97.png'>
    </td>
    <td> 
     <img src='https://user-images.githubusercontent.com/110749286/279913559-6e68cbbc-2b03-451c-8b04-ff44b81e66b1.png'>
    </td>
    <td> 
      201,400
    </td>
 </tr>
</table>

```bash
# sign in route
http://127.0.0.1:3000/auth/signin

```

<table>
 <tr> 
    <th>Method</th>
    <th>Request body</th>
    <th>Success response</th>
    <th>Error response</th>
    <th>Status code</th>
 </tr>
 <tr> 
    <td>POST</td>
    <td>
     <ul>
      <li>email: string </li>
      <li>password: string </li>
     <ul>
    </td>
    <td>
     <img src='https://user-images.githubusercontent.com/110749286/279916469-ec370d4e-74fa-4165-904b-cc82e214098d.png'>
    </td>
    <td> 
      <img src='https://user-images.githubusercontent.com/110749286/279913559-6e68cbbc-2b03-451c-8b04-ff44b81e66b1.png'>
    </td>
    <td> 
      200,400
    </td>
 </tr>
</table>

```bash
# get access token route
http://127.0.0.1:3000/auth/token

```
<table>
 <tr> 
    <th>Method</th>
    <th>Success response</th>
    <th>Error response</th>
    <th>Status code</th>
 </tr>
 <tr> 
    <td>GET</td>
    <td>
     <img src='https://user-images.githubusercontent.com/110749286/279916469-ec370d4e-74fa-4165-904b-cc82e214098d.png'>
    </td>
    <td> 
      <img src='https://user-images.githubusercontent.com/110749286/279913559-6e68cbbc-2b03-451c-8b04-ff44b81e66b1.png'>
    </td>
    <td> 
      200,401
    </td>
 </tr>
</table>

```bash
# get products route
http://127.0.0.1:3000/products

```

<table>
 <tr> 
    <th>Method</th>
    <th>Request header</th>
    <th>Success response</th>
    <th>Error response</th>
    <th>Status code</th>
    <th>Role</th>
 </tr>
 <tr> 
    <td>GET</td>
    <td>
      Authorization: Bearer your_access_token
    </td>
    <td>
     <img src='https://user-images.githubusercontent.com/110749286/279920400-af5e770a-1777-420c-8a47-8041858def29.png'>
    </td>
    <td> 
      <img src='https://user-images.githubusercontent.com/110749286/279913559-6e68cbbc-2b03-451c-8b04-ff44b81e66b1.png'>
    </td>
    <td> 
      200,401
    </td>
    <td> User,admin</td>
 </tr>
</table>

```bash
# get detail product route
http://127.0.0.1:3000/products

```

<table>
 <tr> 
    <th>Method</th>
    <th>Request header</th>
    <th>Success response</th>
    <th>Error response</th>
    <th>Status code</th>
    <th>Role</th>
 </tr>
 <tr> 
    <td>GET</td>
    <td>
      Authorization: Bearer your_access_token
    </td>
    <td>
     <img src='https://user-images.githubusercontent.com/110749286/280178486-8ad8c4ee-707d-4ff9-89fb-f8052e9f7703.png'>
    </td>
    <td> 
      <img src='https://user-images.githubusercontent.com/110749286/279913559-6e68cbbc-2b03-451c-8b04-ff44b81e66b1.png'>
    </td>
    <td> 
      200,401,404
    </td>
    <td> User,admin</td>
 </tr>
</table>

```bash
# create products route
http://127.0.0.1:3000/products

```

<table>
 <tr> 
    <th>Method</th>
    <th>Request header</th>
    <th>Success response</th>
    <th>Error response</th>
    <th>Status code</th>
    <th>Role</th>
 </tr>
 <tr> 
    <td>POST</td>
    <td>
      Authorization: Bearer your_access_token
    </td>
    <td>
     <img src='https://user-images.githubusercontent.com/110749286/279913489-00735e08-4a81-4871-92bd-c86fad0a7f97.png'>
    </td>
    <td> 
      <img src='https://user-images.githubusercontent.com/110749286/279913559-6e68cbbc-2b03-451c-8b04-ff44b81e66b1.png'>
    </td>
    <td> 
      200,401,403
    </td>
    <td>Admin</td>
 </tr>
</table>

```bash
# update products route
http://127.0.0.1:3000/products/:id

```

<table>
 <tr> 
    <th>Method</th>
    <th>Request header</th>
    <th>Param</th>
    <th>Success response</th>
    <th>Error response</th>
    <th>Status code</th>
    <th>Role</th>
 </tr>
 <tr> 
    <td>PUT</td>
    <td>
      Authorization: Bearer your_access_token
    </td>
    <td>id product </td>
    <td>
     <img src='https://user-images.githubusercontent.com/110749286/279922825-c7b2f19a-1388-4aaf-9b0f-14b6fea72619.png'>
    </td>
    <td> 
      <img src='https://user-images.githubusercontent.com/110749286/279913559-6e68cbbc-2b03-451c-8b04-ff44b81e66b1.png'>
    </td>
    <td> 
      200,401,403,404
    </td>
    <td>Admin</td>
 </tr>
</table>


```bash
# Delete products route
http://127.0.0.1:3000/products/:id

```

<table>
 <tr> 
    <th>Method</th>
    <th>Request header</th>
    <th>Param</th>
    <th>Success response</th>
    <th>Error response</th>
    <th>Status code</th>
    <th>Role</th>
 </tr>
 <tr> 
    <td>DELETE</td>
    <td>
      Authorization: Bearer your_access_token
    </td>
    <td>id product </td>
    <td>
     <img src='https://user-images.githubusercontent.com/110749286/279923266-7a57fe69-ef49-4443-87c6-f95c93de1abc.png'>
    </td>
    <td> 
      <img src='https://user-images.githubusercontent.com/110749286/279913559-6e68cbbc-2b03-451c-8b04-ff44b81e66b1.png'>
    </td>
    <td> 
      200,401,403,404
    </td>
    <td>Admin</td>
 </tr>
</table>