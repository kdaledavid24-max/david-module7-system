# Food Ordering System

## Student Information

- **Name:** Kristian Dale David
- **Course and Section:** BSCS 3A
- **Subject:** Software Engineering 1
- **Module:** Module 7 - Design and Implementation 

## Project Overview

FoodFlow Food Ordering System is a responsive Vue.js frontend prototype for managing food menu items and live kitchen orders in a restaurant environment.

The system focuses on the **Order / Food Item** entity selected from the proposed system in Module 6. It allows users to add, view, edit, delete, and search food order records through an organized and user-friendly interface.

For Module 7, the system uses browser `localStorage` as the data layer. A backend, API, and database are not required for this prototype and may be implemented as future components.

## Connection Between Module 6 and Module 7

Module 6 provided the architectural design and long-term blueprint of the proposed system. Module 7 translates one selected functional entity from that design into a working frontend prototype.

For this implementation:

- **Module 6:** Proposed food ordering and restaurant management system
- **Selected Module 7 Entity:** Order / Food Item
- **Presentation Layer:** Vue.js and Tailwind CSS
- **Application Logic:** JavaScript and Vue.js CRUD functions
- **Data Layer:** Browser `localStorage`
- **Future Components:** Backend, API, and database

## Features

- Food Order Registration
- View Food Records
- Edit Food Records
- Delete Food Records with Confirmation
- Food & Customer Search
- Form Validation (Name, Category, Price >= 0)
- Multi-Category Support (Main Course, Drinks, Sides, Desserts)
- Order Status Workflow (Pending, Preparing, Ready, Delivered, Cancelled)
- Dashboard Summary Statistics
- `localStorage` Data Persistence
- Responsive Design (Mobile & Desktop)
- Dark / Light Mode Theme Engine
- Reusable Vue Components
- GitHub Actions Build Verification
- GitHub Pages Deployment

## Required Module 7 Functions

### Create
Users can add a complete food order record through the food registration modal form.  
After successful registration, a confirmation message is displayed and the input form is cleared.

### Read
The system displays saved food order records in an organized, responsive list with thumbnails and status badges.

### Update
Users can select an existing food record, modify its information (name, item, category, price, status), and save the changes.

### Delete
Users can delete a food record after confirming the deletion prompt.

### Search
Users can search food records in real-time using relevant information such as:
- Customer name
- Food item name
- Category

### Validation
The food form prevents incomplete required information from being submitted.  
The system also validates price inputs to ensure valid non-negative values (accepting boundary price 0).

### Persistence
Food records are stored in the browser's `localStorage`. Saved records are loaded again when the application is refreshed.

## Technologies Used

- **Vue.js** - Frontend application framework (Composition API)
- **Vite** - Development and build tool
- **Tailwind CSS** - Responsive interface styling
- **JavaScript** - Application and CRUD logic
- **localStorage** - Browser-based prototype data persistence
- **Git** - Version control
- **GitHub** - Source code repository
- **GitHub Actions** - Continuous-integration build verification
- **GitHub Pages** - Application deployment

## Reusable Vue Components

The application is organized using reusable Vue components, including:

- `RecordForm.vue` - Handles food order registration and editing modals
- `RecordList.vue` - Displays food records, status pill filters, and actions
- `AppHeader.vue` - Provides the application header, theme switcher, and navigation
- `AppFooter.vue` - Provides the application footer and student details
- `LoginPage.vue` - Provides the aesthetic animated login and registration interface

## localStorage Implementation

The prototype uses browser `localStorage` instead of a backend database.

Food records are saved using the following storage key:
```text
module7-records
```

The application retrieves the saved records when it loads and saves changes whenever food records are added, updated, or deleted. This allows food records to remain available after refreshing the browser.

The selected theme and user session are also stored locally using:
```text
foodflow_theme
foodflow_user
```

## Installation

Clone the repository:
```bash
git clone https://github.com/kdaledavid24-max/david-module7-system.git
```

Navigate to the project:
```bash
cd david-module7-system
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Build the project for production:
```bash
npm run build
```

Run unit tests:
```bash
npm run test:run
```

## Application Screenshots

Screenshots demonstrating the required Module 7 functions and deployment evidence are included in the project submission.

The required evidence includes:
1. Running application
2. Add/Create food record
3. Food record list
4. Edit/Update food record
5. Delete confirmation
6. Search function
7. localStorage persistence
8. Responsive/mobile view
9. GitHub repository
10. Git commit history
11. Successful GitHub Actions build

## Deployment & Live System Access

The application is continuously deployed using GitHub Pages.

- **Live Demo URL:** [https://kdaledavid24-max.github.io/david-module7-system/](https://kdaledavid24-max.github.io/david-module7-system/)
- **GitHub Repository:** [https://github.com/kdaledavid24-max/david-module7-system](https://github.com/kdaledavid24-max/david-module7-system)

### Live System User Flow

1. **Authentication Gateway (Initial View):**
   - Navigating to the live link opens the **FoodFlow Authentication Portal (`LoginPage.vue`)**.
   - Features a modern split-screen layout with an animated carousel showcasing gourmet food items (*Pizza, Burgers, Artisan Drinks, Crispy Fries*) on the left and a responsive Sign In / Registration form on the right.
   - Users can sign in, register a new account, or enter with quick test credentials.

2. **Management Dashboard (Authenticated View):**
   - Once authenticated, the user enters the full **Food Ordering Management Dashboard**.
   - Provides access to the interactive 7-status filter pills (`All`, `Pending`, `Preparing`, `Ready`, `Delivered`, `Available`, `Cancelled`), category dropdown, real-time search, live metric counters, and modal CRUD operations with `localStorage` persistence.

## Known Limitations

- The current prototype does not use a backend server.
- The current prototype does not use a cloud database.
- Food data is stored only in the browser's `localStorage`.
- Data is limited to the browser and device where the application is used.
- Production-level payment processing is not included in this prototype.
- The system is a frontend prototype and is not intended to replace a full production enterprise system.

## Future Improvements

Future versions of the system may include:
- Backend API integration (Node.js/Express)
- Database integration (MongoDB Atlas)
- Online payment gateway integration
- Role-based kitchen & rider access control
- Cloud data storage and backups
- Real-time order tracking with WebSockets
- Automated receipt generation and printing
- Production-level security and data protection

## Module 8 Software Testing

### Tested Features
- Add Food Order
- Display Food Records
- Edit Food Order
- Delete Food Order
- Search Food Item

### Manual Testing
A total of 10+ manual test cases were performed, consisting of positive, negative, and edge test cases.

### Automated Testing
Vitest was used to execute automated unit tests for the food ordering management features.

### Defect Testing
A price validation defect (`BUG-01`) was identified where price 0 was incorrectly treated as an invalid/empty value. The validation logic was corrected to allow 0 as a valid price.

### Regression Testing
After the correction, all automated tests passed successfully, including the price 0 boundary test.

### Project Status
**Completed Module 7 & 8 frontend prototype and testing baseline.**  
The application implements the required CRUD operations, search, validation, localStorage persistence, responsive interface, reusable Vue components, GitHub version control, GitHub Actions build verification, and GitHub Pages deployment.

---

## Module 9 – Software Evolution

### Change Request

**Change Request ID:** CR-M9-01  
**Title:** Add Multi-Status & Category Food Order Filter  
**Maintenance Type:** Perfective Maintenance  

### Maintenance Type

**Perfective Maintenance**

The change improves the usability of the existing food record list by allowing users to filter records by food preparation status without removing existing system functions.

### Acceptance Criteria

1. The food records section provides **All, Pending, Preparing, Ready, Delivered, Available, and Cancelled** filter options.
2. Selecting **Pending** displays only food records marked as Pending.
3. Selecting **Delivered** displays only food records marked as Delivered.
4. Selecting **All** displays all food records.
5. Existing **Add, Display, Edit, Delete, Search, Validation, Delete Confirmation, and Persistence** functions continue to work correctly.

### Affected Architecture

The update affects the Vue.js frontend, particularly the food record presentation and filtering interaction.

The existing localStorage-based food data flow was preserved.

### Target Version

**Version 1.1.0**

### Implemented Changes

- Added **All, Pending, Preparing, Ready, Delivered, Available, and Cancelled** filter tabs.
- Added food order status support.
- Existing CRUD operations were preserved.
- Existing food search functionality was preserved.
- Existing validation was preserved.
- Existing delete confirmation was preserved.
- Existing localStorage persistence was preserved.
- Responsive desktop and mobile layouts were preserved.
- Older food records without a status safely default to **Pending**.


### Limitations

The current system continues to use browser localStorage for food records. The multi-status and category filter is implemented on the existing frontend data flow.

### Release Notes – Version 1.1.0

**Perfective Maintenance**

Added a Multi-Status and Category food record filter to improve order management and kitchen usability while preserving the existing CRUD, search, validation, delete confirmation, persistence, and responsive interface.

Testing confirmed that the evolved system passed the existing regression suite and the new filter tests.

- **Pull Request:** `Merge pull request #1 from kdaledavid24-max/module9/software-evolution` successfully merged into `main`

### Updated Test Cases

| Test Case ID | Test Case | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| TC01 | Add New Food Record | New food record is added successfully. | Food record was added successfully. | PASS |
| TC02 | Add Inactive Food Record | Food record is saved with Inactive / Cancelled status. | Inactive food record was saved successfully. | PASS |
| TC03 | Active Filter | Only Active / Available food records are displayed. | Active filter displayed only Active records. | PASS |
| TC04 | Inactive Filter | Only Inactive / Cancelled food records are displayed. | Inactive filter displayed only Inactive records. | PASS |
| TC05 | All Filter | All food records are displayed. | All food records were displayed. | PASS |
| TC06 | Search with Active Filter | Matching Active food record is displayed. | Matching Active record was displayed. | PASS |
| TC07 | Search with Inactive Filter | Matching Inactive food record is displayed. | Matching Inactive record was displayed. | PASS |
| TC08 | Empty Inactive Results | No records and the empty-state message are displayed. | 0 records and the empty-state message were displayed. | PASS |
| TC09 | Edit Food Record Status | Food record status changes successfully. | Food record status was changed successfully. | PASS |
| TC10 | Delete Food Record | Delete confirmation appears and the food record is removed. | Delete confirmation and removal worked successfully. | PASS |
| TC11 | Data Persistence | Food records remain after page refresh. | Food records remained after refresh. | PASS |
| TC12 | Responsive Filter UI | Filter controls remain usable on desktop and mobile. | Responsive filter interface was maintained. | PASS |

### Automated Test Evidence

- **Vitest:** 11 tests passed, 0 failed
- **Production Build:** Successful
- **GitHub Actions:** Successful

### Author

**Kristian Dale David**  
BSCS 3A | Software Engineering 1

