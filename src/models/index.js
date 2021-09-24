// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Paymen, AutofarmBalance, IronfinanceBalance } = initSchema(schema);

export {
  Paymen,
  AutofarmBalance,
  IronfinanceBalance
};