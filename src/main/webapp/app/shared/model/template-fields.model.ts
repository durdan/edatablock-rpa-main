export interface ITemplateFields {
  id?: number;
  fieldName?: string;
  fieldZoneMinX?: number;
  fieldZoneMinY?: number;
  fieldZoneMaxX?: number;
  fieldZoneMaxY?: number;
  width?: number;
  height?: number;
  sequence?: number;
  isTemplateIdentifier?: number;
  fieldValidationRequire?: number;
  fieldValidationRule?: string;
  inputTemplateTemplateName?: string;
  inputTemplateId?: number;
}

export const defaultValue: Readonly<ITemplateFields> = {};
