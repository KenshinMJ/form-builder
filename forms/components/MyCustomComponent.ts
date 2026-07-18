import { Components } from "@formio/react";

const FieldComponent = Components.components.field;

export default class MyCustomComponent extends FieldComponent {
  public myNumber: number = 0;
  static schema(...extend: any[]) {
    return FieldComponent.schema(
      {
        type: "myCustomComponent",
        label: "Custom Text Element",
        key: "customTextElement",
        customProperty: "Default Value",
      },
      ...extend,
    );
  }

  // 2. Metadata for the Form Builder sidebar panel
  static get builderInfo() {
    return {
      title: "My Custom Component",
      icon: "terminal", // FontAwesome class name
      group: "basic", // The sidebar panel group to inject into
      documentation: "",
      weight: 0, // Sort position in the panel
      schema: MyCustomComponent.schema(),
    };
  }

  // 3. Define the HTML template structure for rendering
  render() {
    return super.render(`
      <div class="custom-component-wrapper">
        <label class="control-label">${this.component.label}</label>
        <input class="form-control" type="text" id="${this.component.key}" value="${this.dataValue || ""}">
        <input ref="numberInput" class="form-control" type="number" id="${this.component.customProperty}" value="${this.myNumber}">
        <small class="text-muted">Property: ${this.component.customProperty}</small>
      </div>
    `);
  }

  // 4. Attach event listeners to update Form.io state on input
  attach(element: HTMLElement) {
    this.loadRefs(element, { customInput: "single", numberInput: "single" });

    const input = element.querySelector(`#${this.component.key}`);
    if (input) {
      this.addEventListener(input, "input", (event: Event) => {
        this.setValue(event.target?.value);
      });
    }
    return super.attach(element);
  }
}
