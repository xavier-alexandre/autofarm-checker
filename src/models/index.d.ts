import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PurchasesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AutofarmBalanceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type IronfinanceBalanceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Purchases {
  readonly id: string;
  readonly platform?: string;
  readonly amount?: string;
  readonly date?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Purchases, PurchasesMetaData>);
  static copyOf(source: Purchases, mutator: (draft: MutableModel<Purchases, PurchasesMetaData>) => MutableModel<Purchases, PurchasesMetaData> | void): Purchases;
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