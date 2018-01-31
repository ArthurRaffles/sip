import { ChangeEventHandler } from 'react';


export interface ValueChanged<T> {
    isValid: boolean;
    value: T;
}

export interface ValidationProps<T> {
    isValid: boolean;
    onChanged: (newValue: ValueChanged<T>) => void;
}

export interface ControlProps<T,TEvent> {
    value: T;
    onChanged: (event:  React.ChangeEvent<TEvent>) => void;
}