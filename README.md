# Team_6_JuiceWithEase

CSE583 SDOS Winter 2021, IIITD

## Software Requirements Specification

## <span style="color:darkgrey">Overview </span>

This is a web-app for buying fresh cold pressed juices and beverages online and getting it delivered at your doorstep. The responsive web-app offers one-time delivery and a Daily/Weekly Basket: A customized subscription service where you can choose a variety of juices you want for as many weeks. The users would be able to explore product categories, see the product listing and add items to cart. They can choose the timings for their delivery, allowing 6hrs hours between the time at which order is placed and the expected delivery time.
They can then proceed to checkout and pay using multiple payment options. The web-app will also have an Admin interface, which will allow the admin to track customer transactions and business statistics.

## <span style="color:darkgrey">Entity Relationship Diagram </span>

![alt text](Technical-Documents/ERD.png "ERD")
[ERD Diagram](https://app.moqups.com/e8iFpgsYVG/view/page/a9222f231)

## <span style="color:darkgrey">User Journey </span>

![alt text](Technical-Documents/user_journey.png "User_Journey")
[User Journey](https://lucid.app/lucidchart/8c403b1a-4229-4709-ba27-fa7b3375018c/view?page=bH3tPkT6qkiv#?folder_id=home&browser=icon)

## <span style="color:darkgrey"> Feature Requirements </span>

### <span style="color: grey"> User Features </span>

High Priority Features:

- Login/ Sign Up
  - During “Sign Up” , the email Id and the mobile number entered by the customer will be verified and in case any of them are invalid, the user would be prompted to fill it out again. After verifying these fields successfully, a new account will be created and the user is redirected to the “Home page”.
  - During “Login” using mobile number if the mobile number is invalid or the password is wrong, the user is prompted to retry.
  - [Low Priority] During “Login” using facebook/gmail, the user is required to select their facebook/google account and provide the password for the respective account.
- Check if Delivery is Possible
  - User can enter pincode to check whether the product is deliverable
  - Admin can add and delete pin codes from the backend.
- Product Categories
  - The user can select any one of the four categories:
    - Pure Juices
    - Daily Detox
    - Desi Splash
    - Exotic Delight
  - The user should be able to select any of these categories and view the products under that particular category
- View Product
  - The user should be able to view the bottle variations for a particular product
  - The user should be able to view the price of the product.
  - The user also has the option to “Add to cart”.
- Add To Cart
  - The user can see the “Add to Cart” option for all the products.
  - The quantity to be added should be shown as a “number” field. The minimum value should be 1 and the maximum value would be admin defined.
  - Once the user selects the quantity, the product is added to the user’s cart.
- Order by whatsapp
  - The user is now able to chat with the store admin and places his/her order manuall
  - The whatsapp of the store admin would be determined by the pincode added by the user, if the pin code lies in the non-serviceable region the whatsapp contact of the super admin is used.
- Checkout
  - The user should be able to view all the different products in their cart.
  - The user should be able to see the quantity of each product.
  - The user should be able to see the total price for a product.  
    Total price = Price of 1 item \* Quantity of that item.
  - The user should be able to change the quantity of any product. special case: If the quantity of a product is 1 and user reduces the quantity of this product, the product should be removed from the cart.
  - The user should see a “Confirm Order” option and a warning that “ Orders once placed cannot be cancelled”. If the user selects this option and :
    - The user is not logged in : The user is prompted to “Login/Sign Up”. After the user successfully logs in, they are asked to “select delivery time & date”.
    - The user is logged in: The user is asked to “select delivery time & date”.
  - The user should be able to select a date. The user should be able to select the time slot from the three slots: Morning slot 6 am – 8 am, 8 am -10am and Evening Slot 4pm-6pm, 6 pm -8pm). The users should only be able to view the slots that are at least 6 hours from the time of placing order.
  - After selecting the date and time slot for delivery, the user is redirected to the payment gateway.

Medium Priority Features

- User Profile
  - The user should be able to view all their details: Name, mobile number, email Id, Addresses and their past 10 orders
  - Current subscription Details, If no subscription is availed it shows “Not subscribed”
- Edit Profile
  - The user should be able to view all their details: Name, mobile number, email Id, Addresses and their previous 10 orders
  - The user should be able to edit the mobile number and address.
  - “Change Password option”, the user should be able to change their password after entering the previous password, the new password and confirming the new password.
  - The user should be able to add new addresses to the “My Addresses” field.
- View Active Orders
  - The list orders that the user has ordered should be fetched from the database on every request in order to show the most latest details.
- About Us
  - The feature enables the user to view the details and history about the company “Juice with Ease”
- Submit Feedback
  -The user can enter a feedback and submit it. These feedbacks can be read by the admins.
- Contact Us
  - The feature enables the user to view the contact details about the company “Juice with Ease” such as email id, mobile number, address, etc.

Low Priority Features

- Subscription Purchase
  - The user should be able to see and choose the Subscription models.
  - The user should be able to customize their model by entering all the above mentioned details
  - Users should be able to redirect to the checkout page after subscription selection.
- Forgot Password
  - The user should be able to enter his/her email and get a link via mail. On clicking the link a new link will open asking them for the new password.
- Cancelling Order
  - The user can select any active subscription order to cancel. Single Orders cant be cancelled.
  - Subscription can be cancelled at least 2 days in advance
  - After cancellation, a refund is initiated if the order was already paid for.


### <span style="color: grey"> Super Admin Features </span>
Medium Priority Features

- View orders (to-be-served)
  - The list of orders which are yet to be delivered should be fetched from the database on every request in order to show the most latest details. It should contain all the details of order.
- View orders ( Completed/Failed )
  - The list of orders that have been delivered should be fetched from the database on every request in order to show the most latest details.
- Mark orders completed
  - That particular order is removed from the to-be-served list and dumped in the past orders list.
- Add order details
  - When the store admin adds the order details, it gets added to the database successfully.
- Change product availability - Admin can choose which products are available and which are not and depending on that the availability will be shown in the website for the customers to order.
  Low Priority Features
- View Customer feedback
  - The admin can see the list of user feedbacks that were submitted corresponding to the orders served by that store.

Low Priority Features

- View all user information
  - The super admin should see the user Ids and their order histories.
- Adding of new pincodes and stores
  - After the pincode is entered it is added in the database and then when a customer from that area enters their pincode the website should show that the delivery is possible in that area.

## <span style="color:darkgrey"> Non Fucntional Requirements </span>

# Performance Requirements

- Handling DAU ~ 50, expected to scale upto 1000
- Handling ~ 10 Stores

# Safety Requirements

- Email Authentication
- Phone Number Authentication

# Software Quality Attributes

- **Maintainable** : The Software will have the required Documentation accompanying the code.
- **Correctness**: User review is used to ensure the correctness of requirements stated in the SRS. SRS is said to be correct if it covers all the requirements that are actually expected from the system.
- **Responsive** : The website will be able to run on devices of varying screen sizes.
- **Usability** : The interface is easy to learn and navigate; buttons, headings, and help/error messages are simple to understand.
- **Accessibility**: The website will suitable for use by people with disabilities

## <span style="color:darkgrey"> Architecture </span>

- Follows 3-Tier, Client Server Model
- The presentation layer has three different components: Super Admin, Customer and Store Admin
- Database will have data for: Products, Catalogues, Customers, Orders etc. It will serve requests that come from the client web-app and return the result.
- A third party service would be used for processing payments.
  Google Account Authentication is used for sign-up/sign-in.

![alt text](Technical-Documents/architecture.png "Arch")

## <span style="color:grey"> Architecture Attributes </span>

- **Authentication** : Google Login
- **Security** : Backend, database and frontend guarantees prevention of unauthorized access and Cross site Scripting (XSS) attacks.
- **Availability**: 24hrs 365 days
- **Reliability**: As provided by the domain registrar and hosting companies
- **Performance**: Should be able to handle 1000 simultaneous connections
- **Scalability** : Daily Active Users ~ 100
- **Configurability** : dedicated Admin and Super-Admin interfaces
- **Portability** : Frontend runs on any modern browser on any Operating system. Backend would be deployed on cloud services hence will be ubiquitous.
- **Privacy**: Database privacy is subjected to storage space of hosting company. Customer’s personal data won’t be accessible to admin or super admin except the order details and address. Passwords are also hashed before storing.

## <span style="color:grey"> Connectors </span>

- Database connector (server and database)
- APIs (frontend and server)
- Third-party APIs (payment gateway and server)
- Third-party APIs (payment gateway and frontend)

## <span style="color:grey"> Tech Stack </span>

- Django(Backend)
- PostgreSQL(Database)
- HTML & CSS(Frontend)
- ReactJS & JavaScript(Frontend)
- Razorpay(Payment)

## <span style="color:grey"> Running the Frontend </span>

- Clone the frontend folder
- Unzip and open the frontend folder in terminal
- Run "npm install"
- Run "npm start"
- Go to "localhost:8000/" in your browser

## <span style="color:grey"> Running the Backend </span>
