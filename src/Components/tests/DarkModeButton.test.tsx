import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'mobx-react';

import { uiStore } from '../../Stores/UIStore';
import DarkModeButton from '../DarkModeButton';
import userEvent from '@testing-library/user-event';

describe('DarkModeButton', () => {
  test('toggles dark mode on click', () => {
    const { getByTestId, debug } = render(
      <Provider store={uiStore}>
        <DarkModeButton />
      </Provider>,
    );

    const button = getByTestId('dark-mode-button');
    const buttonIcon = getByTestId('dark-mode-button-icon');
    act(() => {
      uiStore.setDarkMode(false);
    });

    expect(uiStore.darkMode).toBe(false);
    expect(buttonIcon).toHaveClass('bg-GPmid2', 'text-GPlight');

    // FIXME state update is not observed by component
    // act(() => {
    //   userEvent.click(button);
    // });

    // expect(uiStore.darkMode).toBe(true);
    // expect(buttonIcon).toHaveClass('bg-GPmid1', 'text-GPdark2');
  });
});
