// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Payments, AutofarmBalance, IronfinanceBalance } = initSchema(schema);

export {
  Payments,
  AutofarmBalance,
  IronfinanceBalance
};