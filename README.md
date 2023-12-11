# assignment-unity

## Local Development

Before you started, make sure to create a mongodb server for the db.

```sh
cd project-folder
```

```sh
git clone https://github.com/Ankush263/assignment-unity.git
```

```sh
cd assignment-unity
```

```sh
npm i
```

```sh
cp .env.example .env
```

populate all the fields

```sh
npm start
```

## All routes

```
POST /api/auth/register
POST /api/auth/login
GET /api/buyer/list-of-sellers
GET /api/buyer/seller-catalog/:seller_id
POST /api/buyer/create-order/:seller_id
POST /api/product
POST /api/seller/create-catalog
GET /api/seller/orders
```

## Deployed url

```sh
https://assignment-unity.onrender.com
```
