export interface IClientDataOcr {
  id?: number;
  emailMessageId?: string;
  extractOcrDataJson?: string;
  searchId?: string;
  clientEmailAddress?: string;
  attachmentfileName?: string;
  inputTemplateTemplateName?: string;
  inputTemplateId?: number;
  transactionId?: number;
}

export const defaultValue: Readonly<IClientDataOcr> = {};
