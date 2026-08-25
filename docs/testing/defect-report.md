# Module 8 – Defect Report

## Food Ordering System

### Defect ID

BUG-01

### Summary

The system rejects a price value of 0, but the validation message incorrectly displays "Price is required" even though a value has already been entered.

### Application Version / Commit

Module 8 Initial Testing Version

### Environment

- Operating System: Windows
- Browser: Google Chrome
- Application: Food Ordering System
- Framework: Vue.js
- Runtime: Node.js
- Testing Environment: Local Development Environment

### Preconditions

The Food Ordering System is running and the order form is available.

### Steps to Reproduce

1. Open the Food Ordering System.
2. Open the order form.
3. Enter `KD` in the Customer Name field.
4. Enter `Classic Burger` in the Food Name field.
5. Enter or select `Main Course` in the Category field.
6. Enter `0` in the Price field.
7. Select `Preparing` as the Order Status.
8. Click the `SAVE CHANGES` button.
9. Observe the validation message below the Price field.

### Expected Result

The system should prevent the order from being saved because a price of `0` is invalid. The system should display a clear validation message explaining that the price must be greater than 0.

### Actual Result

The system prevents the order from being saved. However, the validation message displayed below the Price field is `Price is required`.

The message is misleading because the Price field contains the value `0`. The problem is that the price is invalid, not missing.

### Severity

Low

### Priority

Medium

### Evidence

03-failed-test-or-defect.png

### Status

New

### Fix Commit

To be completed after the defect is corrected.

---

## Defect Assessment

BUG-01 was discovered during manual testing of the Food Ordering System while testing an invalid price value.

The system correctly prevents the order from being saved when the price is `0`. However, the validation message does not accurately describe the problem. The message `Price is required` indicates that the field is empty, even though `0` was entered.

### Planned Correction

The validation message should be changed to a more accurate message:

`Price must be greater than 0`

### Planned Retest

After the defect is corrected:

1. Open the Food Ordering System.
2. Enter the required order information.
3. Enter `0` in the Price field.
4. Click `SAVE CHANGES`.
5. Verify that the order is not saved.
6. Verify that the validation message states that the price must be greater than 0.
7. Record the actual result and status in `test-cases.md`.

### Planned Regression Testing

After correcting BUG-01, the related order functions will be tested again to make sure the correction did not affect other functionality.

The following test cases will be included:

- TC-01 – Add a valid food order
- TC-03 – Reject invalid/boundary price
- TC-04 – Display multiple food orders
- TC-05 – Edit an existing food order
- TC-10 – Verify localStorage persistence

### Final Status

New – Pending Fix