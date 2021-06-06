import { CounterMutations } from '@/store/counter/mutations';
import { CounterDefaultState, ICounterState } from '@/store/counter/state';

describe('CounterMutations', () => {
  let testState: ICounterState;

  beforeEach(() => {
    testState = CounterDefaultState();
  });

  test('it should set the count', () => {
    CounterMutations.SET_COUNT(testState, 1337);
    expect(testState.count).toBe(1337);
  });

  test('it should set increment pending', () => {
    CounterMutations.SET_INCREMENT_PENDING(testState, true);
    expect(testState.incrementPending).toBe(true);
  });

  test('it should set decrement pending', () => {
    CounterMutations.SET_DECREMENT_PENDING(testState, true);
    expect(testState.decrementPending).toBe(true);
  });
});
