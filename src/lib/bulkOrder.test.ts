import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatDateInputValue,
  getBulkOrderMinimumDate,
  isBulkOrderDateAllowed,
} from './bulkOrder';

test('calculates the bulk order minimum as two calendar months from today', () => {
  const today = new Date(2026, 4, 19);

  assert.equal(formatDateInputValue(getBulkOrderMinimumDate(today)), '2026-07-19');
});

test('clamps the dynamic bulk minimum to the final day of shorter target months', () => {
  const today = new Date(2027, 11, 31);

  assert.equal(formatDateInputValue(getBulkOrderMinimumDate(today)), '2028-02-29');
});

test('rejects bulk delivery dates before the dynamic two-month minimum', () => {
  const today = new Date(2026, 4, 19);

  assert.equal(isBulkOrderDateAllowed('2026-07-18', today), false);
  assert.equal(isBulkOrderDateAllowed('2026-07-19', today), true);
});
