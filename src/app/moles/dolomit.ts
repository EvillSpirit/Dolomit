export interface Dolomit{
    id: string;
    dayOfNowDate: number;
    
    cs_cmv_zayavleno: number;
    cs_cmv_prinyato: number;
    cs_cmv_pogruzheno: number;
    cs_cmv_plus_minus_k_prinyato: number;

    hp_zayavleno: number;
    hp_prinyato: number;
    hp_pogruzheno: number;
    hp_plus_minus_k_prinyato: number;

    pv_inv_zayavleno: number;
    pv_inv_prinyato: number;
    pv_inv_pogruzheno: number;
    pv_inv_plus_minus_k_prinyato: number;
}