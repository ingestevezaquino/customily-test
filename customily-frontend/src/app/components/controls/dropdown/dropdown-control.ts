import { ControlBase } from '../../../interfaces/control-base'

export interface DropDownControl extends ControlBase {
    options?: { key: string, value: string }[];
}