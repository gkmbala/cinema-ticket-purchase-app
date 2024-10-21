=============================================================================
# Ticket Service Console Application
=============================================================================

This application demonstrates the use of a `TicketService` class for purchasing different types of tickets according to various business rules. The test scenarios validate ticket purchasing rules such as account ID validation, maximum ticket limits, and ticket type combinations.
## Prerequisites
- Node.js installed (Node.js v20.18.0)
## Setup & Installation
**Clone the repository**:
   ```
   git clone  https://github.com/gkmbala/cinema-ticket-purchase-app.git
   ```
## Running the Application
1. **Run the `index.js` file**:
   ```
   node index.js
   ```
   2. **See the outputs**:
   The application will run several test cases and print the results to the console based on different ticket purchasing scenarios.
   
==========================================================================
# Ticket Service UI Form Browser Application
=========================================================================
## Running the Application

1. **Start the Server**
Run the following command in your terminal to start the server:
```bash
   node server.js
```
You should see a message indicating that the server is running:
```
Server is running at http://localhost:3000
```
2. **Open the Web Application**
- Open a web browser and navigate to `http://localhost:3000`.
- You should see the `index.html` form, which allows you to enter ticket purchase details.
## Stopping the Server
To stop the server, press `Ctrl + C` in the terminal where the server is running.
## Interacting with the Application

1. **Fill Out the Ticket Form**

   In the `index.html` page, fill in the form fields:

   - **Account ID**: A positive integer.
   - **Adult Tickets**: Number of adult tickets.
   - **Child Tickets**: Number of child tickets.
   - **Infant Tickets**: Number of infant tickets.

2. **Submit the Form**

   Click the "Submit" button to send the form data to the server. The server will process the request and respond:

   - **Success**: If the purchase is valid, you'll see a success message with the total amount and seats reserved.
   - **Error**: If there is a validation error, you will see an error message indicating the problem.

## Business Rules Implemented

1. At least one adult ticket must be purchased for any transaction that includes child or infant tickets.
2. A maximum of 25 tickets can be purchased at one time.
3. The account ID must be greater than zero.
4. Seat reservations and payment are processed through the services `SeatReservationService` and `TicketPaymentService` respectively.

## Example Usage

Here’s how you can run through different test scenarios:

1. **Single Adult Ticket**

   - Account ID: 1
   - Adult Tickets: 1
   - Child Tickets: 0
   - Infant Tickets: 0

   Expected result: Successful purchase.

2. **Exceeding Maximum Tickets**

   - Account ID: 1
   - Adult Tickets: 26
   - Child Tickets: 0
   - Infant Tickets: 0

   Expected result: Error – Cannot purchase more than 25 tickets at a time.

3. **Child Ticket Without Adult**

   - Account ID: 1
   - Adult Tickets: 0
   - Child Tickets: 1
   - Infant Tickets: 0

   Expected result: Error – At least one adult ticket must be purchased.
