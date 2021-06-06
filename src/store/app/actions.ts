import { ActionContext } from 'vuex';
import { IState } from '@/interfaces/IState';
import { IAppState } from './state';

export interface IAppActions {
  changeTheme(context: ActionContext<IAppState, IState>, theme: string): void;
  changeFooter(context: ActionContext<IAppState, IState>, footer: boolean): void;
}

export const AppActions: IAppActions = {
  changeTheme: ({ commit }, theme) => commit('CHANGE_THEME', theme),
  changeFooter: ({ commit }, footer) => commit('CHANGE_FOOTER', footer),
};

export default AppActions;
