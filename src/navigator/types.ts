export type RootStackParamList = {
  Login: undefined;
  BottomTab: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
