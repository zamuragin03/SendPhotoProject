export interface IState {
  isVerified: boolean;
  amount: number;
  name: string;
}
export const INITIAL_STATE: IState = {
  isVerified: false,
  amount: 50,
  name: "Не подтвержденный(скам)",
};
