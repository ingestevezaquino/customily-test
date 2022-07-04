import { ControlBase } from '../../../interfaces/control-base';

export interface LabelControl extends Omit<ControlBase, 'required' | 'key'> {
    text?: string;
}