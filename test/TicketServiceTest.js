import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';
import TicketService from '../src/pairtest/TicketService.js';
import InvalidPurchaseException from '../src/pairtest/lib/InvalidPurchaseException.js';

//function for running tests
function runTest(testTicketAppName, testTicketAppFunction) {
    try {
        testTicketAppFunction();
        console.log(`PASS:  ${testTicketAppName} passed`);
    } catch (error) {
        console.error(`FAIL:  ${testTicketAppName} failed: ${error.message}`);
    }
}

const ticketService = new TicketService();

// Test Case 1: Single Adult Ticket
console.log("Test Case 1: Single Adult Ticket");
runTest('Single Adult Ticket', () => {
    const singleAdultTicket = [new TicketTypeRequest('ADULT', 1)];
    ticketService.purchaseTickets(1, ...singleAdultTicket);
});

// Test Case 2: One Adult and One Child Ticket
console.log("\nTest Case 2: One Adult and One Child Ticket");
runTest('One Adult and One Child Ticket', () => {
    const adultAndChildTicket = [
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 1),
    ];
    ticketService.purchaseTickets(1, ...adultAndChildTicket);
});

// Test Case 3: One Adult, One Child, and One Infant
console.log("\nTest Case 3: One Adult, One Child, and One Infant");
runTest('One Adult, One Child, and One Infant', () => {
    const adultChildInfantTicket = [
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 1),
        new TicketTypeRequest('INFANT', 1),
    ];
    ticketService.purchaseTickets(1, ...adultChildInfantTicket);
});

// Test Case 4: Exceeding Maximum Tickets (26 Tickets)
console.log("\nTest Case 4: Exceeding Maximum Tickets");
runTest('Exceeding Maximum Tickets', () => {
    const exceedingTickets = [
        new TicketTypeRequest('ADULT', 26),
    ];
    try {
        ticketService.purchaseTickets(1, ...exceedingTickets);
        throw new Error('Expected an exception for exceeding maximum tickets');
    } catch (error) {
        if (!(error instanceof InvalidPurchaseException) || error.message !== 'Cannot purchase more than 25 tickets at a time') {
            throw new Error('Unexpected error message or type');
        }
    }
});

// Test Case 5: Invalid Ticket Combination (Child Ticket Without Adult)
console.log("\nTest Case 5: Invalid Ticket Combination");
runTest('Child Ticket Without Adult', () => {
    const childOnlyTicket = [
        new TicketTypeRequest('CHILD', 1),
    ];
    try {
        ticketService.purchaseTickets(1, ...childOnlyTicket);
        throw new Error('Expected an exception for child ticket without adult');
    } catch (error) {
        if (!(error instanceof InvalidPurchaseException) || error.message !== 'At least one adult ticket must be purchased') {
            throw new Error('Unexpected error message or type');
        }
    }
});

// Test Case 6: Invalid Account ID (Account ID <= 0)
console.log("\nTest Case 6: Invalid Account ID");
runTest('Invalid Account ID', () => {
    const invalidAccountIdTicket = [
        new TicketTypeRequest('ADULT', 1),
    ];
    try {
        ticketService.purchaseTickets(0, ...invalidAccountIdTicket);
        throw new Error('Expected an exception for invalid account ID');
    } catch (error) {
        if (!(error instanceof InvalidPurchaseException) || error.message !== 'Invalid account ID') {
            throw new Error('Unexpected error message or type');
        }
    }
});
