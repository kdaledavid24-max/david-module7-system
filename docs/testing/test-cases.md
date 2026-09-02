# Module 9 – Manual Test Cases & Regression Test Suite

## Food Ordering System (v1.1.0 Evolution)

**Student:** Kristian Dale David  
**Section:** BSCS - 3A  
**Subject:** Software Engineering 1  
**Change Request:** CR-M9-01 (Multi-Status & Category Filtering with Schema Backward Compatibility)

---

### Test Execution Summary

| Test ID | Requirement / Feature | Scenario Description | Status | Evidence File |
| :--- | :--- | :--- | :---: | :--- |
| **TC-01** | Create / Add Order | Add a valid food order record | **PASS** | `01-tc-01-add-valid-order.png` |
| **TC-02** | Input Validation | Reject missing required customer name | **PASS** | `02-tc-02-missing-required-field.png` |
| **TC-03** | Input Validation | Reject negative price / accept boundary 0 | **PASS** | `03-tc-03-invalid-quantity.png` |
| **TC-04** | Record Display | Display multiple food orders and summary metrics | **PASS** | `04-tc-04-multiple-orders.png` |
| **TC-05** | Update / Edit Order | Edit existing order status, food name, and price | **PASS** | `05-tc-05-edit-order.png` |
| **TC-06** | Delete Confirmation | Cancel record deletion keeps order intact | **PASS** | `06-tc-06-cancel-delete.png` |
| **TC-07** | Delete Order | Confirm food order deletion removes record | **PASS** | `07-tc-07-confirm-delete.png` |
| **TC-08** | Search Functionality | Search food records by food name keyword | **PASS** | `08-tc-08-search-existing.png` |
| **TC-09** | Search Functionality | Search for non-existent keyword shows empty state | **PASS** | `09-tc-09-search-missing.png` |
| **TC-10** | Data Persistence | Verify localStorage persistence after browser reload | **PASS** | `10-tc-10-localstorage-refresh.png` |
| **TC-11** | Responsive UI | Verify UI layout adaptability on mobile and desktop | **PASS** | `11-tc-11-responsive-layout.png` |
| **TC-12** | Feedback & Counters | Toast notification & dynamic record count | **PASS** | `12-tc-12-record-count-feedback.png` |
| **TC-13** | Status Filter (CR-M9-01) | Filter by status pills & clickable summary cards | **PASS** | `M9-07_Evolved_System.png` |
| **TC-14** | Data Compatibility (CR-M9-01) | Normalize legacy localStorage records safely | **PASS** | `M9-08_Updated_Test_Cases.png` |

---

## Detailed Manual Test Specifications

### TC-01 — Add a Valid Food Order
- **Requirement/Feature:** Create / Add Order (Regression)
- **Objective:** Verify that the system can successfully add a new food order with valid data.
- **Preconditions:** System is running at `http://localhost:5173/` and modal form is accessible.
- **Test Data:** Customer: `Juan Dela Cruz`, Food: `Classic Burger`, Category: `Main Course`, Price: `150.00`, Status: `Pending`.
- **Test Steps:**
  1. Click "Add Item" button to open modal.
  2. Enter "Juan Dela Cruz" in Customer Name.
  3. Select "Classic Burger" from Food dropdown.
  4. Verify Category auto-fills "Main Course" and Price "150.00".
  5. Select status "Pending" and click "Add Item".
- **Expected Result:** Modal closes, toast "Item added successfully." displays, record appears in table, and total orders count increments by 1.
- **Actual Result:** Order added successfully, toast message displayed, and counter updated accurately.
- **Status:** **PASS**

---

### TC-02 — Reject Missing Required Field
- **Requirement/Feature:** Input Validation (Regression)
- **Objective:** Verify form validation blocks submission when required fields are missing.
- **Preconditions:** Modal form is open.
- **Test Data:** Customer Name: `""` (Empty), Food: `Pepperoni Pizza`.
- **Test Steps:**
  1. Leave Customer Name empty.
  2. Select food item.
  3. Click "Add Item" submit button.
- **Expected Result:** Form is not submitted. Red validation error "Customer name is required" appears below input.
- **Actual Result:** Validation prevented submission and displayed the required field error message.
- **Status:** **PASS**

---

### TC-03 — Reject Invalid Price / Accept Boundary Value
- **Requirement/Feature:** Input Validation & Bug Fix (BUG-01 Regression)
- **Objective:** Verify system rejects negative prices and properly handles numerical input validation.
- **Preconditions:** Modal form is open.
- **Test Data:** Price: `-50`.
- **Test Steps:**
  1. Complete Customer Name and Food selection.
  2. Enter `-50` in Price field.
  3. Click "Add Item".
- **Expected Result:** Form blocks submission with "Valid price is required". Entering `0` or positive number passes.
- **Actual Result:** Negative price blocked; 0 and positive numbers validated correctly.
- **Status:** **PASS**

---

### TC-04 — Display Multiple Food Orders
- **Requirement/Feature:** Record Display (Regression)
- **Objective:** Verify data table renders all current items with proper columns, status badges, and food thumbnails.
- **Preconditions:** Multiple items exist in localStorage.
- **Test Steps:**
  1. Load application home page.
  2. Observe table rows and column headers.
- **Expected Result:** ID, Customer, Food Item (with image), Category, Price (₱ formatted), Status, and Action buttons render cleanly.
- **Actual Result:** All 10 initial records rendered in formatted table structure with matching status badges.
- **Status:** **PASS**

---

### TC-05 — Edit an Existing Food Order
- **Requirement/Feature:** Update / Edit Order (Regression)
- **Objective:** Verify editing an existing record modifies its values without duplicating records.
- **Preconditions:** At least one record exists in table.
- **Test Data:** Edit ID `#03038` status from `Delivered` to `Preparing`, price to `180.00`.
- **Test Steps:**
  1. Click "Edit" on target record row.
  2. Modal opens populated with current record data.
  3. Change status to "Preparing" and price to "180.00".
  4. Click "Save Changes".
- **Expected Result:** Toast "Item updated successfully." shows, table reflects updated status and price, record count remains constant.
- **Actual Result:** Item updated in place, localStorage updated, and no duplication occurred.
- **Status:** **PASS**

---

### TC-06 — Cancel Record Deletion
- **Requirement/Feature:** Delete Confirmation (Regression)
- **Objective:** Verify canceling the delete confirmation modal preserves the record.
- **Preconditions:** Record list is populated.
- **Test Steps:**
  1. Click "Delete" button on any record.
  2. When browser confirmation popup appears, click "Cancel".
- **Expected Result:** No deletion occurs; record remains visible in table.
- **Actual Result:** Record was preserved untouched upon cancellation.
- **Status:** **PASS**

---

### TC-07 — Confirm Food Order Deletion
- **Requirement/Feature:** Delete Order (Regression)
- **Objective:** Verify confirming deletion removes the order from state and localStorage.
- **Preconditions:** Record exists in list.
- **Test Steps:**
  1. Click "Delete" button on target record.
  2. Click "OK" on confirmation prompt.
- **Expected Result:** Record is removed from table, toast "Item deleted." appears, and summary metrics decrement.
- **Actual Result:** Record deleted cleanly from view and localStorage; counters updated.
- **Status:** **PASS**

---

### TC-08 — Search for an Existing Food Order
- **Requirement/Feature:** Search Functionality (Regression)
- **Objective:** Verify real-time search filters table rows by matching keyword.
- **Test Data:** Keyword: `Burger`.
- **Test Steps:**
  1. Type `Burger` into the search bar.
  2. Check filtered table output.
- **Expected Result:** Only orders with food name, customer, or category containing "Burger" are shown.
- **Actual Result:** Table instantly filtered to show only 3 matching burger orders.
- **Status:** **PASS**

---

### TC-09 — Search for Non-Existent Food Order
- **Requirement/Feature:** Search & Empty State (Regression)
- **Objective:** Verify system displays user-friendly empty state when search finds no match.
- **Test Data:** Keyword: `NonExistentFood999`.
- **Test Steps:**
  1. Type `NonExistentFood999` in search bar.
- **Expected Result:** Table is replaced by clean empty state illustration with a "Reset Filter Criteria" button.
- **Actual Result:** Custom empty state message and reset button displayed properly.
- **Status:** **PASS**

---

### TC-10 — Verify LocalStorage Persistence
- **Requirement/Feature:** Data Persistence (Regression)
- **Objective:** Verify modified records persist across page refresh.
- **Test Steps:**
  1. Add a new order named "Test Persistence Item".
  2. Reload browser window (`F5` / `Ctrl+R`).
  3. Inspect table.
- **Expected Result:** "Test Persistence Item" remains in table after reload.
- **Actual Result:** Data reloaded from `module7-records` localStorage key seamlessly.
- **Status:** **PASS**

---

### TC-11 — Check Responsive Layout
- **Requirement/Feature:** Responsive UI (Regression)
- **Objective:** Verify layout adapts cleanly between desktop (1920x1080) and mobile (375x667) viewports.
- **Test Steps:**
  1. Open DevTools Device Toolbar and test at 375px width.
  2. Test grid cards, search input, filter pills, and scrollable table.
- **Expected Result:** Dashboard cards stack 2-column, filter pills wrap smoothly, table enables horizontal scroll with no clipping.
- **Actual Result:** Responsive design adapts seamlessly with Tailwind CSS flex/grid breakpoints.
- **Status:** **PASS**

---

### TC-12 — Verify Live Metrics & Feedback
- **Requirement/Feature:** Summary Dashboard (Regression)
- **Objective:** Verify real-time calculation of status counters (Total, Available, Pending, Preparing, Delivered, Cancelled).
- **Test Steps:**
  1. Review total count vs individual status counts.
  2. Add an order with status "Preparing".
- **Expected Result:** Total Orders and Preparing counter increment simultaneously by 1.
- **Actual Result:** All computed summary cards reflect accurate real-time numbers.
- **Status:** **PASS**

---

### TC-13 — Status Filter & Dashboard Interactivity (CR-M9-01)
- **Requirement/Feature:** Software Evolution — Status Filtering (CR-M9-01)
- **Objective:** Verify clicking status pill buttons or summary dashboard metric cards filters the list accordingly.
- **Preconditions:** Records with diverse statuses exist.
- **Test Steps:**
  1. Click "Pending" status pill (or click the "Pending" top summary card).
  2. Observe table rows.
  3. Select Category "Main Course".
  4. Click "Clear filters" / "Reset All Filters".
- **Expected Result:** Table displays only "Pending" orders. When category is added, it displays only "Pending" Main Courses. Clicking clear resets to all records.
- **Actual Result:** Multi-facet filtering executed accurately with instant reactivity and active visual highlights.
- **Status:** **PASS**

---

### TC-14 — LocalStorage Schema Compatibility (CR-M9-01)
- **Requirement/Feature:** Software Evolution — Data Compatibility (CR-M9-01)
- **Objective:** Verify legacy localStorage records without `status` or `image` fields load without crashing and receive safe default values.
- **Preconditions:** Store legacy JSON payload `[{"id":"999","foodName":"Legacy Item","price":100}]` directly in `localStorage.setItem('module7-records', ...)`.
- **Test Steps:**
  1. Inject legacy data into localStorage.
  2. Refresh the application.
  3. Observe table rendering.
- **Expected Result:** Legacy item loads smoothly with default status "Pending", default price 100.00, and no console errors.
- **Actual Result:** Schema normalization executed cleanly; old and new records coexist without data corruption.
- **Status:** **PASS**
