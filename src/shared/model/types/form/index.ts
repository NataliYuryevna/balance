import type {FormItemProps, FormRule} from "antd";

export interface typeChild<T extends {[key:string]: string}> {
    label?: string,
    name?: FormItemProps<T>['name'],
    rules?: Array<FormRule>,
    validateStatus?: FormItemProps<T>['validateStatus'],
    help?: FormItemProps<T>["help"]
}