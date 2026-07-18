import { Components } from "@formio/react";

type EmployeeRecord = {
  employeeNumber: string;
  name: string;
  departiment: string;
};

const EMPLOYEE_DIRECTORY: EmployeeRecord[] = [
  { employeeNumber: "1001", name: "山田太郎", departiment: "営業部" },
];

function findEmployee(employeeNumber: string): EmployeeRecord | undefined {
  return EMPLOYEE_DIRECTORY.find(
    (emp) => emp.employeeNumber === employeeNumber,
  );
}

function searchEmployees(query: string): EmployeeRecord[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return EMPLOYEE_DIRECTORY;
  return EMPLOYEE_DIRECTORY.filter(
    (emp) =>
      emp.employeeNumber.includes(normalized) ||
      emp.name.toLowerCase().includes(normalized),
  );
}

const FieldComponent = Components.components.field;

export default class EmpPickerComponent extends FieldComponent {
  static schema(...extend: any[]) {
    return FieldComponent.schema(
      {
        type: "emppicker",
        label: "社員番号",
        key: "employeePicker",
        customProperty: "Custom Property",
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: "社員入力・選択",
      group: "custom",
      icon: "user",
      documentation: "/userguide/#textfield",
      weight: 30,
      schema: EmpPickerComponent.schema(),
    };
  }

  get defaultSchema() {
    return EmpPickerComponent.schema();
  }

  get emptyValue() {
    return "";
  }

  get employeeNumber(): string {
    return this.detaValue || "";
  }

  get employeeName(): string {
    return findEmployee(this.employeeNumber)?.name ?? "";
  }

  rendar() {
    const disabledAttr = this.disabled ? "disabled" : "";

    const children = `
        <div class="row employee-picker">
          <div class="col-sm-6 formio-component-textfield">
            <label class="control-label">${this.t(this.component.label)}</label>
            <div class="input-group">
              <input
                ref="numberInput"
                type="text"
                class="form-control"
                value="${this.employeeNumber}"
                ${disabledAttr}
              />
              <button ref="searchButton" type="text" class="btn btn-outline-secondary" aria-label="社員検索" ${disabledAttr}>
                ${this.getIcon("search")}
              </button>
            </div>
            <div
              ref="messageContainer"
              class="formio-errors invalid-feedback"
            ></div>
          </div>
          <div class="col-sm-6 formio-component-textfield">
            <label class="control-label">社員名</label>
            <input ref="nameDisplay" type="text" class="form-control" value="${this.employeeName}" disabled readonly />
          </div>
        </div>
      `;

    return super.render(
      this.renderTemplate("emppicker", {
        visible: this.visible,
        id: this.id,
        classes: this.className,
        styles: this.customStyle,
        children,
      }),
    );
  }

  attach(element: HTMLElement) {
    this.loadRefs(element, {
      numberInput: "single",
      searchButton: "single",
      nameDisplay: "single",
      messageContainer: "single",

      customInput: "single",
    });

    if (this.refs.numberInput) {
      this.addEventListener(this.refs.numberInput, "blur", () => {
        this.applyEmployeeNumber(this.refs.numberInput.value);
      });
    }
    if (this.refs.searchButton) {
      this.addEventListener(this.refs.numberButton, "click", (event: Event) => {
        event.preventDefault();
        this.openSearchModal();
      });
    }

    return super.attach(element);
  }

  applyEmployeeNumber(rawValue: string): void {
    this.setValue((rawValue || "").trim(), { modified: true });
  }

  setValue(value: any, flags: any = {}) {
    const changed = super.setValue(value, flags);
    this.updateDisplay();
    return changed;
  }

  updateDisplay(): void {
    if (
      this.refs.numberInput &&
      this.refs.numberInput.value !== this.employeeNumber
    ) {
      this.refs.numberInput.value = this.employeeNumber;
    }
    if (this.refs.nameDisplay) {
      this.refs.nameDisplay.value = this.employeeName;
    }
  }

  openSearchModal(): void {}
}
