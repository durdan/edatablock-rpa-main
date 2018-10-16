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
}

export const defaultValue: Readonly<ITemplateRules> = {};
