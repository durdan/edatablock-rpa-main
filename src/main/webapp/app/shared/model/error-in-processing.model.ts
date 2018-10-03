import { Moment } from 'moment';

export interface IErrorInProcessing {
  id?: number;
  errorCode?: string;
  description?: string;
  processType?: string;
  createDate?: Moment;
  exception?: string;
  processBy?: string;
  processID?: number;
}

export const defaultValue: Readonly<IErrorInProcessing> = {};
