This repository contains the completed Automation Tasks.

DAY 1
-
Day 1 Objectives :
1. Understand Manual testing scenarios
2. Setup Playwright project.
3. Configure Playwright with TypeScript
4. Write manual test cases for : https://www.saucedemo.com/
5. Create reusable test data
6. Automate basic login scenarios
7. Generate Playwright HTML reports

Day 1 Tasks Completed:

Task 1- Creation of Manual test cases
Created manual test cases for the SauceDemo functionality

Task 2: Playwright Project Setup
Completed the Setup activities

Task 3: Login Automation
Automated login related test scenarios using Playwright
TC_001: Login Page should load successfully
TC_002: Valid user should be able to login
TC_003: Invalid user should display an error message
TC_004: Locked out user should not login

Challenges Faced:
Import path issues

locator syntax errors

------------------------------------------------------------------------------------------------------------------------------------------------------------------
DAY 2
-
Day 2 Objectives:
1. Assertions
2. Locator Strategies
3. Cart Validation
4. Checkout Validation
5. Negative Testing
6. Debugging and reporting

Day 2 Tasks Completed:

Task 1: Product and Cart Functionality
1. Verify all products are visible
2. Add a single product to a cart
3. Add multiple products to a cart
4. Remove a product from the cart
5. Verify Selected products are in the cart.

Task 2: Checkout Validation
1. Checkout with Valid Details
2. Checkout without first name
3. Checkout without postal code

Debugging Note:

Failed Test :  
TC_005: All products should be displayed.

Reason for Failure:  
The test was failing because the assertion was using the products.length from the products.ts file. 
The products.ts file contained only 2 products while the SauceDemo website actually displayed 6 
products on the inventory page. 

How I investigated it: 
I ran the test in Playwright UI mode and checked the failed assertion details in the terminal 
output. I compared the expected product count with the actual number of product cards displayed 
on the website. 

Tools Used: 
Playwright UI mode 
Playwright HTML Report 

Fix Applied: 
I updated the assertion to validate the actual product count (6) displayed on the website instead 
of using the local test data array length. 

Learning: 
The issue helped me understand that application validations should match the actual UI behavior 
and data. Data files should not always be directly used for UI count validations unless they 
represent the whole application data.  


------------------------------------------------------------------------------------------------------------------------------------------------------------------
