# Food Ordering System Frontend Prototype

**Student:** Kristian Dale David
**Section:** BSCS - 3A
**Module:** Module 7 Design and Implementation

## System Description
This project is a functional frontend prototype for the **Food Ordering System**, originally proposed in Module 6. It translates the "Order" entity into a working Vue.js web application.

## Implemented Features
- **Create**: Add new food orders using a validation-enforced form.
- **Read**: View all existing orders in an organized data table.
- **Update**: Load and edit existing order details and status.
- **Delete**: Remove orders with a confirmation prompt.
- **Search**: Filter orders dynamically by customer name, food items, or status.
- **Persistence**: All data is saved to the browser's `localStorage`, keeping orders intact upon refresh.

## Technologies Used
- **Frontend Framework**: Vue.js (Vite)
- **Styling**: Tailwind CSS v4
- **Language**: JavaScript
- **Data Storage**: Browser `localStorage`

## Installation and Run Instructions
1. Clone this repository: `git clone https://github.com/kdaledavid24-max/david-module7-system.git`
2. Navigate into the project: `cd david-module7-system`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and navigate to the local address provided by Vite (usually `http://localhost:5173/`).

## Explanation of `localStorage`
In this prototype, we simulate a database backend by using the browser's native `localStorage` API.
- **Saving Data**: When an order is added, edited, or deleted, the application converts the entire list of records into a JSON string using `JSON.stringify()` and saves it to `localStorage` under the key `module7-records`.
- **Loading Data**: When the application loads (using Vue's `onMounted` lifecycle hook), it checks `localStorage` for this key. If data exists, it parses it back into a JavaScript array using `JSON.parse()` and populates the `records` state.

## Connection Between Module 6 and Module 7
In Module 6, the three-tier architecture was designed, specifying a Vue.js frontend, an Express/Node.js backend, and a MongoDB database. This Module 7 project implements a functional vertical slice of the **Presentation Layer (Frontend)**. The application logic manages state natively, and the data layer is currently mocked using `localStorage`.

## Known Limitations and Future Improvements
- **Backend Dependency**: Data is only saved locally in the browser. A future improvement is to implement the proposed Express API to persist data to a MongoDB database.
- **Authentication**: There is no user login. Currently, any user visiting the interface has administrative privileges to edit or delete any order.
- **Payment Processing**: The frontend calculates total amounts but does not yet integrate an online payment gateway.
