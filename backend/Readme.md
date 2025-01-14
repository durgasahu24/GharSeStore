# Auth Routes

This file defines the routes for user authentication.

## Routes

### `POST /auth/signup`

- **Description**: Register a new user.
- **Response**: 
  - `201 Created`: User registered successfully.
- **Error**:
  - `400 Bad Request`: If the request body is invalid.

### `POST /auth/signin`

- **Description**: Log in an existing user.
- **Response**: 
  - `200 OK`: User logged in successfully.
- **Error**:
  - `400 Bad Request`: If the request body is invalid.
  - `401 Unauthorized`: If the credentials are incorrect.

## Controllers

- `authController`: Handles the logic for each route.


# Cart Routes

This file defines the routes for managing the user's cart.

## Routes

### `GET /api/cart`

- **Description**: Get the user's cart (requires authentication).
- **Response**: 
  - `200 OK`: Returns the user's cart.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

### `PUT /api/cart/add`

- **Description**: Add an item to the user's cart (requires authentication).
- **Response**: 
  - `200 OK`: Item added to cart successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

## Middleware

- `authenticate`: Ensures the user is authenticated.

## Controllers

- `cartController`: Handles the logic for each route.

# Cart Items Routes

This file defines the routes for managing cart items.

## Routes

### `PUT /api/cart_items/:id`

- **Description**: Update a cart item (requires authentication).
- **Response**: 
  - `200 OK`: Cart item updated successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the cart item is not found.

### `DELETE /api/cart_items/:id`

- **Description**: Remove a cart item (requires authentication).
- **Response**: 
  - `200 OK`: Cart item removed successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the cart item is not found.

## Middleware

- `authenticate`: Ensures the user is authenticated.

## Controllers

- `cartItemController`: Handles the logic for each route.

# Delete User Routes

This file defines the routes for deleting a user.

## Routes

### `DELETE /api/users/:id`

- **Description**: Delete a user by ID.
- **Response**: 
  - `200 OK`: User deleted successfully.
- **Error**:
  - `404 Not Found`: If the user is not found.

## Controllers

- `deleteUserByIdController`: Handles the logic for each route.


# Order Routes

This file defines the routes for managing orders.

## Routes

### `POST /api/orders`

- **Description**: Create a new order (requires authentication).
- **Response**: 
  - `201 Created`: Order created successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

### `GET /api/orders/OrderHis`

- **Description**: Get the user's order history (requires authentication).
- **Response**: 
  - `200 OK`: Returns the user's order history.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

### `GET /api/orders/:id`

- **Description**: Find an order by ID (requires authentication).
- **Response**: 
  - `200 OK`: Returns the order details.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the order is not found.

## Middleware

- `authenticate`: Ensures the user is authenticated.

## Controllers

- `orderController`: Handles the logic for each route.

# Payment Routes

This file defines the routes for managing payments.

## Routes

### `POST /api/payments/:id`

- **Description**: Create a payment link (requires authentication).
- **Response**: 
  - `201 Created`: Payment link created successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

### `GET /api/payments`

- **Description**: Update payment information (requires authentication).
- **Response**: 
  - `200 OK`: Payment information updated successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

## Middleware

- `authenticate`: Ensures the user is authenticated.

## Controllers

- `paymentController`: Handles the logic for each route.

# Product Routes

This file defines the routes for managing products.

## Routes

### `GET /api/products`

- **Description**: Get all products.
- **Response**: 
  - `200 OK`: Returns a list of products.
- **Error**:
  - `500 Internal Server Error`: If there is a server error.

### `GET /api/products/id/:id`

- **Description**: Find a product by ID.
- **Response**: 
  - `200 OK`: Returns the product details.
- **Error**:
  - `404 Not Found`: If the product is not found.

### `GET /api/products/search`

- **Description**: Search for products.
- **Response**: 
  - `200 OK`: Returns a list of products matching the search criteria.
- **Error**:
  - `500 Internal Server Error`: If there is a server error.

### `GET /api/products/latest`

- **Description**: Get the latest products.
- **Response**: 
  - `200 OK`: Returns a list of the latest products.
- **Error**:
  - `500 Internal Server Error`: If there is a server error.

### `GET /api/products/category/:categoryId`

- **Description**: Get products by category ID.
- **Response**: 
  - `200 OK`: Returns a list of products in the specified category.
- **Error**:
  - `404 Not Found`: If the category is not found.

### `GET /api/products/category`

- **Description**: Get products by category name.
- **Response**: 
  - `200 OK`: Returns a list of products in the specified category.
- **Error**:
  - `404 Not Found`: If the category is not found.

## Controllers

- `productController`: Handles the logic for each route.


# Rating Routes

This file defines the routes for managing product ratings.

## Routes

### `POST /api/ratings/create`

- **Description**: Create a new rating (requires authentication).
- **Response**: 
  - `201 Created`: Rating created successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

### `GET /api/ratings/product/:productId`

- **Description**: Get ratings for a product (requires authentication).
- **Response**: 
  - `200 OK`: Returns a list of ratings for the product.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the product is not found.

## Middleware

- `authenticate`: Ensures the user is authenticated.

## Controllers

- `ratingController`: Handles the logic for each route.


# Review Routes

This file defines the routes for managing product reviews.

## Routes

### `POST /api/reviews/create`

- **Description**: Create a new review (requires authentication).
- **Response**: 
  - `201 Created`: Review created successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

### `GET /api/reviews/product/:productId`

- **Description**: Get reviews for a product (requires authentication).
- **Response**: 
  - `200 OK`: Returns a list of reviews for the product.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the product is not found.

## Middleware

- `authenticate`: Ensures the user is authenticated.

## Controllers

- `reviewController`: Handles the logic for each route.

# User Routes

This file defines the routes for managing users.

## Routes

### `GET /api/users/profile`

- **Description**: Get the user's profile.
- **Response**: 
  - `200 OK`: Returns the user's profile.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

### `GET /api/users`

- **Description**: Get all users.
- **Response**: 
  - `200 OK`: Returns a list of users.
- **Error**:
  - `500 Internal Server Error`: If there is a server error.

## Controllers

- `userController`: Handles the logic for each route.


# Admin Order Routes

This file defines the routes for managing admin orders.

## Routes

### `GET /api/admin/orders`

- **Description**: Get all orders (requires authentication).
- **Response**: 
  - `200 OK`: Returns a list of orders.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.

### `PUT /api/admin/orders/:orderId/confirmed`

- **Description**: Confirm an order (requires authentication).
- **Response**: 
  - `200 OK`: Order confirmed successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the order is not found.

### `PUT /api/admin/orders/:orderId/ship`

- **Description**: Ship an order (requires authentication).
- **Response**: 
  - `200 OK`: Order shipped successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the order is not found.

### `PUT /api/admin/orders/:orderId/deliver`

- **Description**: Deliver an order (requires authentication).
- **Response**: 
  - `200 OK`: Order delivered successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the order is not found.

### `PUT /api/admin/orders/:orderId/cancel`

- **Description**: Cancel an order (requires authentication).
- **Response**: 
  - `200 OK`: Order canceled successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the order is not found.

### `DELETE /api/admin/orders/:orderId/delete`

- **Description**: Delete an order (requires authentication).
- **Response**: 
  - `200 OK`: Order deleted successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the order is not found.

## Middleware

- `authenticate`: Ensures the user is authenticated.

## Controllers

- `adminOrderController`: Handles the logic for each route.



# Admin Product Routes

This file defines the routes for managing admin products.

## Routes

### `POST /api/admin/products/create`

- **Description**: Create a new product (requires authentication and admin privileges).
- **Response**: 
  - `201 Created`: Product created successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `403 Forbidden`: If the user is not an admin.

### `POST /api/admin/products/creates`

- **Description**: Create multiple products (requires authentication and admin privileges).
- **Response**: 
  - `201 Created`: Products created successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `403 Forbidden`: If the user is not an admin.

### `DELETE /api/admin/products/:id`

- **Description**: Delete a product (requires authentication).
- **Response**: 
  - `200 OK`: Product deleted successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the product is not found.

### `PUT /api/admin/products/:id`

- **Description**: Update a product (requires authentication).
- **Response**: 
  - `200 OK`: Product updated successfully.
- **Error**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the product is not found.

## Middleware

- `authenticate`: Ensures the user is authenticated.
- `isAdmin`: Ensures the user has admin privileges.
- `upload`: Handles file uploads.

## Controllers

- `productController`: Handles the logic for each route.