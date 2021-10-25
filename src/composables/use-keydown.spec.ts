import { render } from '@testing-library/vue';
import { useKeydown } from './use-keydown';
import { TestComponent, triggerDocument } from '@/test/test-utils';

describe('use-keydown-behaviour.ts', () => {
  beforeEach(() => (document.body.style.overflow = ''));

  test('should trigger onKeyDown', async () => {
    let keydownEvent: KeyboardEvent = null;
    const { unmount } = render(
      TestComponent(() => {
        const { onKeydown } = useKeydown();

        onKeydown((e) => (keydownEvent = e));
      }),
    );

    triggerDocument.keydown({ key: 'Escape' });

    await unmount();

    expect(keydownEvent).not.toBeNull();
  });
});
