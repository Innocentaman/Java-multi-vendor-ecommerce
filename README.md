# 🛒 Java Multi-Vendor Ecommerce Application

A full-stack **Multi-Vendor Ecommerce Platform** where multiple sellers can manage products while customers can browse, purchase, and track orders. The project demonstrates a complete e-commerce workflow with authentication, role-based authorization, shopping cart, checkout, and order management.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login
* JWT Authentication
* Browse Products
* Search Products
* View Product Details
* Add Items to Cart
* Update Cart Quantity
* Remove Items from Cart
* Checkout
* View Order History

### 🛍 Seller Features

* Seller Registration
* Add New Products
* Update Existing Products
* Delete Products
* View Seller Products

### 🔐 Security

* JWT-based Authentication
* Role-Based Authorization
* Protected APIs
* Request Validation
* Exception Handling

---

## 🏗 Tech Stack

### Backend

* Java
* Play Framework
* Hibernate / JPA
* MySQL
* SBT

### Frontend

* React
* React Router
* Axios
* Bootstrap

### Database

* MySQL

---

## 📂 Project Structure

```
Java-multi-vendor-ecommerce
│
├── multi-vendor-ecommerce/      # Play Framework Backend
│
└── multi-vendor-frontend/       # React Frontend
```

---

## 🗄 Database Design

The application consists of the following major entities:

* User
* Product
* Seller
* Cart
* CartItem
* Order
* OrderItem

Relationships include:

* One User → One Cart
* One Cart → Many Cart Items
* One Seller → Many Products
* One Order → Many Order Items
* One Product → Many Order Items

---

## ⚙ Backend Setup

### Clone Repository

```bash
git clone https://github.com/Innocentaman/Java-multi-vendor-ecommerce.git
```

### Navigate to Backend

```bash
cd Java-multi-vendor-ecommerce/multi-vendor-ecommerce
```

### Configure Database

Update your MySQL credentials in the backend configuration before running the application.

Example:

```properties
db.default.url=jdbc:mysql://localhost:3306/ecommerce
db.default.username=YOUR_USERNAME
db.default.password=YOUR_PASSWORD
```

### Run Backend

```bash
sbt run
```

Backend runs on:

```
http://localhost:9000
```

---

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd ../multi-vendor-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 📌 API Highlights

### Authentication

* Register User
* Login User

### Products

* Get All Products
* Get Product By ID
* Add Product
* Update Product
* Delete Product

### Cart

* Get Cart
* Add Item
* Update Quantity
* Remove Item
* Checkout

### Orders

* Place Order
* Get User Orders

---

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication.

Protected endpoints require the following header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

