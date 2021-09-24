import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CryptoPurchaseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AutofarmBalanceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type IronfinanceBalanceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class CryptoPurchase {
  readonly id: string;
  readonly platform?: string;
  readonly amount?: number;
  readonly date?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CryptoPurchase, CryptoPurchaseMetaData>);
  static copyOf(source: CryptoPurchase, mutator: (draft: MutableModel<CryptoPurchase, CryptoPurchaseMetaData>) => MutableModel<CryptoPurchase, CryptoPurchaseMetaData> | void): CryptoPurchase;
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