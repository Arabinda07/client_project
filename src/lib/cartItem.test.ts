import test from 'node:test';
import assert from 'node:assert/strict';
import { getCartSelectionKey, isSameCartSelection } from './cartItem';

test('uses colour id as part of the cart selection key', () => {
  assert.equal(getCartSelectionKey('ts-001', 'maroon-gold'), 'ts-001::maroon-gold');
  assert.notEqual(
    getCartSelectionKey('ts-001', 'maroon-gold'),
    getCartSelectionKey('ts-001', 'green-gold')
  );
});

test('keeps products without colour options compatible with the old key shape', () => {
  assert.equal(getCartSelectionKey('er-004'), 'er-004');
});

test('matches cart lines by product id and selected colour id', () => {
  assert.equal(isSameCartSelection({ id: 'ts-001', selectedColour: { id: 'red' } }, 'ts-001', 'red'), true);
  assert.equal(isSameCartSelection({ id: 'ts-001', selectedColour: { id: 'red' } }, 'ts-001', 'blue'), false);
});
