export interface IEmailAttachment {
  id?: number;
  messageId?: string;
  clientEmailAddress?: string;
  fileName?: string;
  fileExtension?: string;
  fileLocation?: string;
  emailMessagesMessageId?: string;
  emailMessagesId?: number;
}

export const defaultValue: Readonly<IEmailAttachment> = {};
