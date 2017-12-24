
export type Direction = 'buy' | 'sell';
export type PriceType = 'bid' | 'ask';

export interface PriceItem {
    price: number;
    previousPrice: number;
    priceChange: number;
}
export interface PriceAccepted {
    price: number;
    priceType: PriceType;
}
