import { RenderResult } from '@testing-library/react';

export type OpenTasks_t = {
  waitUntilDataLoaded: () => Promise<void>;
};

export const openTasks_t = (r: RenderResult): OpenTasks_t => ({
  waitUntilDataLoaded: async () => {
    await r.findByText('To do');
  },
});
