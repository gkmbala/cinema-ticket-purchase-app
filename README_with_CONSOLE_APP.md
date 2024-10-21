# Ticket Service Console Application

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

## Business Rules Tested

The application tests the following business rules:

1. **Single Adult Ticket Purchase**:
   - Tests the purchase of a single adult ticket.
   - The account ID should be valid.

2. **Purchase of One Adult and One Child Ticket**:
   - Verifies if both adult and child tickets can be purchased together.

3. **Multiple Tickets Purchase**:
   - Tests the scenario where an adult, child, and infant ticket are purchased together.

4. **Exceeding Maximum Tickets**:
   - Validates that the system throws an error if more than 25 tickets are requested.

5. **Invalid Ticket Combination (Child Only)**:
   - Ensures that child or infant tickets cannot be purchased without at least one adult ticket.

6. **Invalid Account ID**:
   - Tests the system's behavior when an invalid account ID (less than or equal to zero) is used.

## Output Examples

Here are examples of expected outputs for each scenario:

### Single Adult Ticket
```
Business Rule: Single Adult Ticket
Successful purchased ticket(s) for Account ID: 1
```

### One Adult and One Child Ticket
```
Business Rule: One Adult and One Child Ticket
Successful purchased ticket(s) for Account ID: 1
```

### One Adult, One Child, and One Infant
```
Business Rule: One Adult, One Child, and One Infant
Successful purchased ticket(s) for Account ID: 1
```

### Exceeding Maximum Tickets
```
Business Rule: Exceeding Maximum Tickets
Error: Cannot purchase more than 25 tickets at a time
```

### Invalid Ticket Combination (Child Only)
```
Business Rule: Invalid Ticket Combination
Error: At least one adult ticket must be purchased
```

### Invalid Account ID
```
Business Rule: Invalid Account ID
Error: Invalid account ID
```

## How to run Test Cases
**Run the `test\TicketServiceTest.js` file**:
   ```
   node test\TicketServiceTest.js
   ```
If you need to add more test cases or modify existing ones, you can edit the `index.js` file and add new scenarios using the `TicketServiceTest.TicketTypeRequest` function with different inputs.

---

That's it! Follow the steps above to run the Ticket Service Console Application and see the results based on different business rules.
