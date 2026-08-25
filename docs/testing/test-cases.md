# Module 8 – Manual Test Cases

## Food Ordering System

### Test Execution Status

The following manual test cases are designed to verify the major functions of the Food Ordering System developed in Module 7. Each test case will be executed using the actual application, and the actual result and status will be updated after execution.

---

## TC-01 — Add a Valid Food Order

**Requirement/Feature:** Create / Add Order

**Objective:**
Verify that the system can successfully add a new food order when all required information is valid.

**Preconditions:**
The Food Ordering System is running and the order form is available.

**Test Data:**

* Customer Name: Juan Dela Cruz
* Food Item: Chicken Burger
* Quantity: 2
* Price: 150
* Order Status: Pending

**Test Steps:**

1. Open the Food Ordering System.
2. Open the order form.
3. Enter a valid customer name.
4. Select or enter a valid food item.
5. Enter a valid quantity.
6. Enter the required price or order information.
7. Select the appropriate order status if available.
8. Click the Add/Save button.

**Expected Result:**
The order is successfully added to the records. A success message or appropriate feedback is displayed, and the new order appears in the order list.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
01-tc-01-add-valid-order.png

---

## TC-02 — Reject Missing Required Field

**Requirement/Feature:** Input Validation

**Objective:**
Verify that the system prevents an order from being saved when a required field is empty.

**Preconditions:**
The order form is available.

**Test Data:**
Leave the Customer Name field empty while entering valid information in the other required fields.

**Test Steps:**

1. Open the order form.
2. Leave the Customer Name field empty.
3. Enter valid information in the other fields.
4. Click the Add/Save button.

**Expected Result:**
The system does not save the order and displays an appropriate validation message indicating that the required field must be completed.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
02-tc-02-missing-required-field.png

---

## TC-03 — Reject Invalid or Boundary Quantity

**Requirement/Feature:** Input Validation

**Objective:**
Verify that the system properly handles an invalid quantity value.

**Preconditions:**
The order form is available.

**Test Data:**
Quantity: 0 or a negative value.

**Test Steps:**

1. Open the order form.
2. Enter a valid customer name.
3. Enter a valid food item.
4. Enter an invalid quantity such as 0 or -1.
5. Complete the other required fields.
6. Click the Add/Save button.

**Expected Result:**
The system rejects the invalid quantity and displays a validation message. The invalid order should not be saved.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
03-tc-03-invalid-quantity.png

---

## TC-04 — Display Multiple Food Orders

**Requirement/Feature:** Record Display

**Objective:**
Verify that the system can display multiple food orders correctly.

**Preconditions:**
The system is running.

**Test Data:**
Create at least three valid food orders.

**Test Steps:**

1. Add the first valid food order.
2. Add the second valid food order.
3. Add the third valid food order.
4. View the order list/table.

**Expected Result:**
All valid orders are displayed correctly in the order list/table with their corresponding information.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
04-tc-04-multiple-orders.png

---

## TC-05 — Edit an Existing Food Order

**Requirement/Feature:** Update / Edit Order

**Objective:**
Verify that an existing food order can be edited and saved successfully.

**Preconditions:**
At least one food order exists in the system.

**Test Data:**
Change the quantity or other editable information of an existing order.

**Test Steps:**

1. Select an existing food order.
2. Click the Edit button.
3. Change the selected information.
4. Click Save/Update.
5. View the updated order.

**Expected Result:**
The selected order is updated successfully, and the new information replaces the previous information.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
05-tc-05-edit-order.png

---

## TC-06 — Cancel Record Deletion

**Requirement/Feature:** Delete Confirmation

**Objective:**
Verify that canceling a deletion keeps the selected food order unchanged.

**Preconditions:**
At least one food order exists.

**Test Steps:**

1. Select an existing food order.
2. Click the Delete button.
3. When the deletion confirmation appears, choose Cancel.
4. Check the order list.

**Expected Result:**
The selected order remains in the system and no record is deleted.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
06-tc-06-cancel-delete.png

---

## TC-07 — Confirm Food Order Deletion

**Requirement/Feature:** Delete Order

**Objective:**
Verify that an existing food order is successfully deleted after confirmation.

**Preconditions:**
At least one food order exists.

**Test Steps:**

1. Select an existing food order.
2. Click the Delete button.
3. Confirm the deletion.
4. Check the order list.

**Expected Result:**
The selected food order is removed from the order list and is no longer available in the records.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
07-tc-07-confirm-delete.png

---

## TC-08 — Search for an Existing Food Order

**Requirement/Feature:** Search

**Objective:**
Verify that the search function displays an existing food order when a matching keyword is entered.

**Preconditions:**
Multiple food orders exist in the system.

**Test Data:**
Search keyword: Chicken

**Test Steps:**

1. Open the Food Ordering System.
2. Locate the search field.
3. Enter a keyword that matches an existing food item or record.
4. Observe the displayed results.

**Expected Result:**
Only records matching the entered search keyword are displayed.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
08-tc-08-search-existing.png

---

## TC-09 — Search for a Missing Food Order

**Requirement/Feature:** Search

**Objective:**
Verify that the system properly handles a search keyword that does not match any existing record.

**Preconditions:**
The system contains food orders.

**Test Data:**
Search keyword: XYZ123

**Test Steps:**

1. Open the Food Ordering System.
2. Locate the search field.
3. Enter XYZ123.
4. Observe the order list.

**Expected Result:**
No matching records are displayed and an appropriate no-results state or message is shown if implemented.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
09-tc-09-search-missing.png

---

## TC-10 — Verify localStorage Persistence

**Requirement/Feature:** Data Persistence

**Objective:**
Verify that saved food orders remain available after refreshing the browser.

**Preconditions:**
The application uses localStorage and at least one food order exists.

**Test Steps:**

1. Add a valid food order.
2. Confirm that the order appears in the order list.
3. Refresh the browser.
4. Check the order list again.

**Expected Result:**
The previously saved food order remains available after the browser is refreshed.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
10-tc-10-localstorage-refresh.png

---

## TC-11 — Check Responsive Layout

**Requirement/Feature:** Responsive User Interface

**Objective:**
Verify that the Food Ordering System remains readable and usable when the browser window is reduced in size.

**Preconditions:**
The Food Ordering System is running.

**Test Steps:**

1. Open the application.
2. Resize the browser window to a narrow/mobile-like width.
3. Check the navigation, form, buttons, order list, and other visible content.
4. Try interacting with the important controls.

**Expected Result:**
The interface remains readable and the main controls remain usable without inappropriate overlapping or major layout problems.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
11-tc-11-responsive-layout.png

---

## TC-12 — Verify Record Count and Feedback

**Requirement/Feature:** Record Count / User Feedback

**Objective:**
Verify that the system provides correct record-count information or appropriate feedback after an order is added or deleted, if this feature is implemented.

**Preconditions:**
The system is running and the record-count or feedback feature is available.

**Test Steps:**

1. Record the current number of orders.
2. Add a valid food order.
3. Observe the record count or success feedback.
4. Delete an existing order if applicable.
5. Observe the record count or feedback again.

**Expected Result:**
The record count or feedback correctly reflects the performed action.

**Actual Result:**
To be recorded after execution.

**Status:**
Not Run

**Evidence:**
12-tc-12-record-count-feedback.png

---

## Test Case Summary

| Test Case | Scenario                         | Status  |
| --------- | -------------------------------- | ------- |
| TC-01     | Add a valid food order           | Not Run |
| TC-02     | Reject missing required field    | Not Run |
| TC-03     | Reject invalid/boundary quantity | Not Run |
| TC-04     | Display multiple food orders     | Not Run |
| TC-05     | Edit an existing food order      | Not Run |
| TC-06     | Cancel record deletion           | Not Run |
| TC-07     | Confirm record deletion          | Not Run |
| TC-08     | Search for existing order        | Not Run |
| TC-09     | Search for missing order         | Not Run |
| TC-10     | Verify localStorage persistence  | Not Run |
| TC-11     | Check responsive layout          | Not Run |
| TC-12     | Verify record count/feedback     | Not Run |

**Note:** The Status column will be changed to Pass, Fail, Blocked, or Not Run only after the corresponding test has actually been executed.
