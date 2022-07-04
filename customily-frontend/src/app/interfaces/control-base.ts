export interface ControlBase {
    key: string,
    options?: { key: string, value: string }[],
    required?: boolean,
    text?: string,
    order: number,
    controlType: string
}