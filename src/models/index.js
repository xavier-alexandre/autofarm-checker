// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { AutofarmBalance, IronfinanceBalance } = initSchema(schema);

export {
  AutofarmBalance,
  IronfinanceBalance
};