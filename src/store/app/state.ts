export interface IAppState {
  theme: string;
  footer: boolean;
}

export const AppDefaultState = (): IAppState => {
  return {
    theme: 'light',
    footer: true,
  };
};

export default AppDefaultState;
