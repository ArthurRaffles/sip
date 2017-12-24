
import { ActionCreator } from '../action-creator';

export const StaticActionCreators = {
    tenorsReceived:  new ActionCreator<'TENORS_RECEIVED', string>('TENORS_RECEIVED'),
};
