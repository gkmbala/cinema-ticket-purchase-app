import http from 'http';
import fs from 'fs';
import url from 'url';
import querystring from 'querystring';
import TicketTypeRequest from './src/pairtest/lib/TicketTypeRequest.js';
import TicketService from './src/pairtest/TicketService.js';

const ticketService = new TicketService();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && parsedUrl.pathname === '/purchase') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = querystring.parse(body);
            const accountId = Number(formData.accountId);
            const adultTickets = Number(formData.adultTickets);
            const childTickets = Number(formData.childTickets);
            const infantTickets = Number(formData.infantTickets);

            const requests = [];
            if (adultTickets > 0) requests.push(new TicketTypeRequest('ADULT', adultTickets));
            if (childTickets > 0) requests.push(new TicketTypeRequest('CHILD', childTickets));
            if (infantTickets > 0) requests.push(new TicketTypeRequest('INFANT', infantTickets));

            try {
                const purchaseDetails = ticketService.purchaseTickets(accountId, ...requests);
                const totalAmount = purchaseDetails.totalAmount; // Get total amount from purchaseDetails
                const seatsReserved = purchaseDetails.totalSeatsToReserve; // Get total seats to reserve
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<p>Successfully purchased tickets for Account ID: ${accountId}.<br/>Seats Reserved: ${seatsReserved}.<br/>Total Amount: £${totalAmount}.<br/><a href="/">Reset</a> </p>`);
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end(`<p style="color:red;">Error: ${error.message}</p><br/><a href="/">Reset</a>`);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
