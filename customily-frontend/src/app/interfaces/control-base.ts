export interface ControlBase {
    key: string,
    value?: string,
    options?: { key: string, value: string }[],
    required?: boolean,
    order: number,
    controlType: string
}