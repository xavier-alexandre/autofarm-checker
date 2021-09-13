import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type AutofarmBalanceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type IronfinanceBalanceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class AutofarmBalance {
  readonly id: string;
  readonly date: string;
  readonly balance: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AutofarmBalance, AutofarmBalanceMetaData>);
  static copyOf(source: AutofarmBalance, mutator: (draft: MutableModel<AutofarmBalance, AutofarmBalanceMetaData>) => MutableModel<AutofarmBalance, AutofarmBalanceMetaData> | void): AutofarmBalance;
}

export declare class IronfinanceBalance {
  readonly id: string;
  readonly date: string;
  readonly balance: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<IronfinanceBalance, IronfinanceBalanceMetaData>);
  static copyOf(source: IronfinanceBalance, mutator: (draft: MutableModel<IronfinanceBalance, IronfinanceBalanceMetaData>) => MutableModel<IronfinanceBalance, IronfinanceBalanceMetaData> | void): IronfinanceBalance;
}