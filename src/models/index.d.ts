import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PaymenMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AutofarmBalanceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type IronfinanceBalanceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Paymen {
  readonly id: string;
  readonly platform?: string;
  readonly amount?: number;
  readonly date?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Paymen, PaymenMetaData>);
  static copyOf(source: Paymen, mutator: (draft: MutableModel<Paymen, PaymenMetaData>) => MutableModel<Paymen, PaymenMetaData> | void): Paymen;
}

export declare class AutofarmBalance {
  readonly id: string;
  readonly balance: number;
  readonly chain: string;
  readonly token1: string;
  readonly token2: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AutofarmBalance, AutofarmBalanceMetaData>);
  static copyOf(source: AutofarmBalance, mutator: (draft: MutableModel<AutofarmBalance, AutofarmBalanceMetaData>) => MutableModel<AutofarmBalance, AutofarmBalanceMetaData> | void): AutofarmBalance;
}

export declare class IronfinanceBalance {
  readonly id: string;
  readonly balance: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<IronfinanceBalance, IronfinanceBalanceMetaData>);
  static copyOf(source: IronfinanceBalance, mutator: (draft: MutableModel<IronfinanceBalance, IronfinanceBalanceMetaData>) => MutableModel<IronfinanceBalance, IronfinanceBalanceMetaData> | void): IronfinanceBalance;
}