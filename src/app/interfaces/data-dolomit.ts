export interface Records {
  id: string;
  dateCreated: string;
  zayavleno: number;
  prinyato: number;
  pogruzheno: number;
  plusMinusPrinyato: number;
  logs: object[];
  carriageType: {
    id: number;
    type: string;
    description: string;
  };
}