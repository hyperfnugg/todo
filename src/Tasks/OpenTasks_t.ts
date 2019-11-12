import { fireEvent, RenderResult, within } from '@testing-library/react';

export type OpenTasks_t = {
  waitUntilDataLoaded: () => Promise<void>;
  row: (index: number) => OpenTaskElement_t;
};
export type OpenTaskElement_t = {
  clickDone: () => void;
};

export const openTasks_t = (r: RenderResult): OpenTasks_t => ({
  waitUntilDataLoaded: async () => {
    await r.findByText('To do');
  },
  row: index =>
    r.getAllByTestId('OpenTaskItem').map(element => {
      const rowRenderResult = within(element);
      const ret: OpenTaskElement_t = {
        clickDone: () => {
          fireEvent.click(rowRenderResult.getByText('Done!'));
        },
      };
      return ret;
    })[index],
});
