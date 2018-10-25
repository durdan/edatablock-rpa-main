import { Moment } from 'moment';
import { IInputTemplate } from 'app/shared/model//input-template.model';

export interface IClient {
  id?: number;
  clientName?: string;
  description?: string;
  clientAddress?: string;
  clientEmailAddress?: string;
  isActive?: number;
  createDate?: Moment;
  createdBy?: string;
  updateDate?: Moment;
  isMergedDocument?: number;
  updatedBy?: string;
  orgNameOrgName?: string;
  orgNameId?: number;
  inputTemplates?: IInputTemplate[];
}

export const defaultValue: Readonly<IClient> = {};
