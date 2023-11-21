import { CarriageType } from "./carriage-type";

export interface Record {
    id: string;
    dateCreated: string;
    zayavleno: number;
    prinyato: number;
    pogruzheno: number;
    plusMinusPrinyato: number;
    carriageTypes: CarriageType[];
  }