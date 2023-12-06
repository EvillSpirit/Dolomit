import { CarriageType } from "./carriage-type";

export interface DataDolomit {
  id: string;
  dateCreated: string;
  zayavleno: number;
  prinyato: number;
  pogruzheno: number;
  plusMinusPrinyato: number;
  carriageType: CarriageType;
}
