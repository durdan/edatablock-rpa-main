export interface ITemplateRules {
  id?: number;
  ruleSequence?: number;
  lookupPlace?: string;
  operator?: string;
  value?: string;
  joinField?: string;
  description?: string;
  inputTemplateTemplateName?: string;
  inputTemplateId?: number;
  clientClientName?: string;
  clientId?: number;
}

export const defaultValue: Readonly<ITemplateRules> = {};
