import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Consultation {
  readonly id: string;
  readonly subject: string;
  readonly date?: string;
  readonly diagnosis?: string;
  readonly treatment?: string;
  readonly prescription?: string;
  readonly exam?: string;
  readonly status?: string;
  readonly Patient?: Patient;
  constructor(init: ModelInit<Consultation>);
  static copyOf(source: Consultation, mutator: (draft: MutableModel<Consultation>) => MutableModel<Consultation> | void): Consultation;
}

export declare class Patient {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly birthdate?: string;
  readonly gender: string;
  readonly contact?: string;
  readonly address?: string;
  readonly email?: string;
  readonly age?: number;
  constructor(init: ModelInit<Patient>);
  static copyOf(source: Patient, mutator: (draft: MutableModel<Patient>) => MutableModel<Patient> | void): Patient;
}

export declare class Config {
  readonly id: string;
  readonly dayStart?: string;
  readonly dayEnd?: string;
  constructor(init: ModelInit<Config>);
  static copyOf(source: Config, mutator: (draft: MutableModel<Config>) => MutableModel<Config> | void): Config;
}

export declare class Visit {
  readonly id: string;
  readonly Patient?: Patient;
  readonly status: string;
  readonly subject: string;
  readonly arrivalTime: string;
  readonly visitTime?: string;
  readonly Consultation?: Consultation;
  constructor(init: ModelInit<Visit>);
  static copyOf(source: Visit, mutator: (draft: MutableModel<Visit>) => MutableModel<Visit> | void): Visit;
}

export declare class MedicalRecord {
  readonly id: string;
  readonly Patient?: Patient;
  constructor(init: ModelInit<MedicalRecord>);
  static copyOf(source: MedicalRecord, mutator: (draft: MutableModel<MedicalRecord>) => MutableModel<MedicalRecord> | void): MedicalRecord;
}

export declare class Rendezvous {
  readonly id: string;
  readonly date: string;
  readonly subject: string;
  readonly Patient?: Patient;
  readonly status: string;
  constructor(init: ModelInit<Rendezvous>);
  static copyOf(source: Rendezvous, mutator: (draft: MutableModel<Rendezvous>) => MutableModel<Rendezvous> | void): Rendezvous;
}