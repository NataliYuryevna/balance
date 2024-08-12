import {Input} from 'antd';
import type {typeChildForm} from '@shared';
function SimpleInput<T extends {[key:string]:string}>(arg: typeChildForm<T>){
    return {
        ...arg,
        obj: <Input/>
    }
};

export default SimpleInput;