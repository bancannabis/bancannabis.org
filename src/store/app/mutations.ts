import { IAppState } from './state';

export interface IAppMutations {
  CHANGE_THEME(state: IAppState, theme: string): void;
  CHANGE_FOOTER(state: IAppState, footer: boolean): void;
}

export const AppMutations: IAppMutations = {
  CHANGE_THEME: (state, theme) => {
    state.theme = theme;
  },
  CHANGE_FOOTER: (state, footer) => {
    state.footer = footer;
  },
};

export default AppMutations;
