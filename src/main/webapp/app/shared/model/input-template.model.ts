import { Moment } from 'moment';

export interface IInputTemplate {
  id?: number;
  templateName?: string;
  templateDescription?: string;
  isActive?: number;
  createDate?: Moment;
  createdBy?: string;
  updateDate?: Moment;
  templateIdentifier?: string;
  numberOfPages?: number;
  updatedBy?: string;
  clientClientName?: string;
  clientId?: number;
}

export const defaultValue: Readonly<IInputTemplate> = {};
