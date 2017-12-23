
export type Direction = 'buy' | 'sell';
export type PriceType = 'bid' | 'ask';

export interface PriceItem {
    price: number;
    priceChange: number;
}