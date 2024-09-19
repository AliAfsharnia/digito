export enum Massages{

     // #Address

     CITY_NOT_FOUND = "This city doesn't exist",
     ADDRESS_CREATED = "Address created successfully: ",
     ADDRESS_UPDATED = "Address updated successfully: ",
     ADDRESS_DELETED = "Address deleted successfully: ",

     // #Authorized

     NOT_AUTHORIZED = 'Not authorized',
     TOKEN_NOT_VERIFIED = "Token not verified!",
     TOKEN_CREATED = "Token created successfully for user: ",
     TOKEN_NOT_VALID = "User not found or token is expired!",
     EMAIL_OR_USER_TAKEN = 'Email or username are taken',
     USER_REGISTER = "User registered successfully: ",
     USER_LOGGING = "User logged in successfully:",
     FORGOT_EMAIL_SENT = "Forgot password email sent successfully for user:",
     PASSWORD_CHANGE = "Password changed successfully for user:",

     // #Brand & Category

     NAME_TAKEN = 'Name is taken',
     BRAND_CREATED = "Brand created successfully: ",
     BRAND_UPDATED = "Brand updated successfully: ",
     BRAND_DELETED = "Brand deleted successfully: ",
     BRAND_NOT_FOUND = 'Brand not found',
     CATEGORY_CREATED = "Category created successfully: ",
     CATEGORY_UPDATED = "Category updated successfully: ",
     CATEGORY_DELETED = "Category deleted successfully: ",
     CATEGORY_NOT_FOUND = 'Category not found',

     // #Order

     ORDER_CREATE = "Order created successfully: ",
     ORDER_NOT_FOUND = "this order doesn't exist!",
     ORDER_NOT_PENDING = 'Order most be on (pending) status for this request!',
     ITEM_ADDED = "item added to order successfully: ",
     ITEM_NOT_FOUND = "this item doesn't exist!",
     ITEM_NOT_IN_ORDER = "this item doesn't exist!",
     ITEM_DELETED = "item deleted from the order successfully: ",

     // #Product

     PRODUCT_CREATED = "Product created successfully: ",
     PRODUCT_UPDATED = "Product updated successfully: ",
     PRODUCT_PHOTO_UPDATED = "Product image updated successfully: ",
     PRODUCT_DELETED = "Product deleted successfully: ",
     PRODUCT_PHOTO_DELETED = "Product deleted image successfully: ",
     PRODUCT_NOT_FOUND = "this product doesn't exist!",
     PRODUCT_PHOTO_NOT_FOUND = "this product image doesn't exist!",
     PRODUCT_OUT_OF_STUCK = 'this product quantity is less then request!',
     PRODUCT_ADDED_TO_FAVORITES = "Product added to favorite successfully for user: ",
     PRODUCT_FAVORITES_INCREASED = "Product favorites increased successfully for product: ",
     PRODUCT_REMOVED_FROM_FAVORITES = "Product removed from favorite successfully for user: ",
     PRODUCT_FAVORITES_DECREASED = "Product favorites decreased successfully for product: ",
     ATTRIBUTE_CREATED = "Attribute created successfully for product: ",
     ATTRIBUTE_UPDATED = "Attribute updated successfully for product: ",
     ATTRIBUTE_DELETED = "Attribute deleted successfully: ",
     ATTRIBUTE_NOT_FOUND = 'Attribute not found',

     // #Review
     
     REVIEW_CREATED = "Review created successfully: ",
     REVIEW_NOT_FOUND = 'Review not found',
     REVIEW_APPROVED = "Review approved successfully: ",

     // #User

     USER_CREATED = "User created successfully: ",
     USER_UPDATED = "User updated successfully: ",
     USER_DELETED = "User deleted successfully: ",
     USER_NOT_FOUND = 'User not found',
}    

