import { withTheme, type ThemeProps } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { TextWidget } from "./widgets/TextWidget";
import { SelectWidget } from "./widgets/SelectWidget";
import { CheckboxWidget } from "./widgets/CheckboxWidget";
import { FieldTemplate } from "./templates/FieldTemplate";
import { ObjectFieldTemplate } from "./templates/ObjectFieldTemplate";
import { EmployeePickerWidget } from "./widgets/EmployeePickerWidget";

export const shadcnTheme: ThemeProps = {
  widgets: {
    TextWidget,
    SelectWidget,
    CheckboxWidget,
    EmployeePickerWidget,
  },
  templates: {
    FieldTemplate,
    ObjectFieldTemplate,
  },
};

export const ShadcnForm = withTheme(shadcnTheme);
export { validator };
