import TicketTypeRequest from './src/pairtest/lib/TicketTypeRequest.js';
import TicketService from './src/pairtest/TicketService.js';

const ticketService = new TicketService();

function testTicketPurchase(accountId, requests) {
    try {
        ticketService.purchaseTickets(accountId, ...requests);
        console.log(`Successful purchased ticket(s) for Account ID: ${accountId}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}
//Business Rule: Starts with purchase ticket
console.log("\nBusiness Rule: Single Adult Ticket");
const singleAdultTicket = [new TicketTypeRequest('ADULT', 1)];
testTicketPurchase(1, singleAdultTicket);

//Business Rule: The ticket purchaser declares how many and what type of tickets they want to buy
console.log("\nBusiness Rule: One Adult and One Child Ticket");
const adultAndChildTicket = [
    new TicketTypeRequest('ADULT', 1),
    new TicketTypeRequest('CHILD', 1),
];
testTicketPurchase(1, adultAndChildTicket);

//Business Rule: Multiple tickets can be purchased at any given time
console.log("\nBusiness Rule: One Adult, One Child, and One Infant");
const adultChildInfantTicket = [
    new TicketTypeRequest('ADULT', 1),
    new TicketTypeRequest('CHILD', 1),
    new TicketTypeRequest('INFANT', 1),
];
testTicketPurchase(1, adultChildInfantTicket);

//Business Rule: Only a maximum of 25 tickets that can be purchased at a time.
console.log("\nBusiness Rule: Exceeding Maximum Tickets");
const exceedingTickets = [
    new TicketTypeRequest('ADULT', 26),
];
testTicketPurchase(1, exceedingTickets);

//Business Rule: Child and Infant tickets cannot be purchased without purchasing an Adult ticket.
console.log("\nBusiness Rule: Invalid Ticket Combination");
const childOnlyTicket = [
    new TicketTypeRequest('CHILD', 1),
];
testTicketPurchase(1, childOnlyTicket);

//Business Rule(Assumptions): All accounts with an id greater than zero are valid. 
console.log("\nBusiness Rule: Invalid Account ID");
const invalidAccountIdTicket = [
    new TicketTypeRequest('ADULT', 1),
];
testTicketPurchase(0, invalidAccountIdTicket);
