// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Purchases, AutofarmBalance, IronfinanceBalance } = initSchema(schema);

export {
  Purchases,
  AutofarmBalance,
  IronfinanceBalance
};