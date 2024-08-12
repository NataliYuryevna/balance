import {FormItemProps, Input} from 'antd';
import type {typeChildForm} from '@shared';

function InputPassword<T extends {[key:string]:string}>(arg: typeChildForm<T>){
    return {
        ...arg,
        rules: [{ required: true, message: 'Please input your password!' },{min:6, message: 'Please input min 6 symbols!'},...arg.rules||[]],
        obj: <Input.Password/>
    }
};

export default InputPassword;