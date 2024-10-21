import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {
    constructor() {
        this.ticketPrices = {
            INFANT: 0,
            CHILD: 15,
            ADULT: 25
        };
        this.paymentService = new TicketPaymentService();
        this.reservationService = new SeatReservationService();
    }

    /**
     * Purchase tickets for the given account.
     * 
     * @param {number} accountId - The account ID for ticket purchase.
     * @param {...TicketTypeRequest} ticketTypeRequests - The ticket requests.
     * @throws {InvalidPurchaseException} - If the purchase request is invalid.
     */
    purchaseTickets(accountId, ...ticketTypeRequests) {
        // Validate account ID
        if (!accountId || accountId <= 0) {
            throw new InvalidPurchaseException('Invalid account ID');
        }

        // Validate and calculate totals
        let totalTickets = 0;
        let totalAmount = 0;
        let totalAdultTickets = 0;
        let totalSeatsToReserve = 0;

        ticketTypeRequests.forEach(request => {
            if (!(request instanceof TicketTypeRequest)) {
                throw new InvalidPurchaseException('Invalid ticket type request');
            }

            //Calculates the correct amount for the requested tickets and makes a payment request to the TicketPaymentService. 
            //Calculates the correct no of seats to reserve and makes a seat reservation request to the SeatReservationService. 
            const type = request.getTicketType();
            const quantity = request.getNoOfTickets();
            totalTickets += quantity;
            
            if (type === 'ADULT') {
                totalAdultTickets += quantity;
                totalSeatsToReserve += quantity;
            } else if (type === 'CHILD') {
                totalSeatsToReserve += quantity;
            }
            // Calculate total amount
            totalAmount += this.ticketPrices[type] * quantity;
        });

        // Apply business rules
        if (totalTickets > 25) {
            throw new InvalidPurchaseException('Cannot purchase more than 25 tickets at a time');
        }
        if (totalAdultTickets === 0) {
            throw new InvalidPurchaseException('At least one adult ticket must be purchased');
        }

        // Make payment and reserve seats
        this.makePayment(accountId, totalAmount);
        this.reserveSeats(accountId, totalSeatsToReserve);
        // Return the details for purchase confirmation
        return {
            totalAmount,
            totalSeatsToReserve
        };
    }

    //The payment will always go through once a payment request has been made to the TicketPaymentService.
    makePayment(accountId, amount) {
        try {
            this.paymentService.makePayment(accountId, amount);
            console.log(`Payment of £${amount} made successfully for account ID ${accountId}.`);
        } catch (error) {
            console.error(`Payment failed for account ID ${accountId}: ${error.message}`);
        }
    }

    //The seat will always be reserved once a reservation request has been made to the SeatReservationService.
    reserveSeats(accountId, seats) {
        try {
            this.reservationService.reserveSeat(accountId, seats);
            console.log(`Reserved ${seats} seat(s) for account ID ${accountId}.`);
        } catch (error) {
            console.error(`Seat reservation failed for account ID ${accountId}: ${error.message}`);
        }
    }
}
