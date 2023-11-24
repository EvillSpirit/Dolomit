export interface DataDolomit {
  id: string;
  dateCreated: string;
  zayavleno: number;
  prinyato: number;
  pogruzheno: number;
  plusMinusPrinyato: number;
  carriageType: {
    id: number;
    type: string;
    description: string;
  };
}
