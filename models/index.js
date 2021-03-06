// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Consultation, Patient, Config, Visit, MedicalRecord, Rendezvous } = initSchema(schema);

export {
  Consultation,
  Patient,
  Config,
  Visit,
  MedicalRecord,
  Rendezvous
};