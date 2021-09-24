// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CryptoPurchase, AutofarmBalance, IronfinanceBalance } = initSchema(schema);

export {
  CryptoPurchase,
  AutofarmBalance,
  IronfinanceBalance
};