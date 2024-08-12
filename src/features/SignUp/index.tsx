import {Form} from "@entities";
import {useCallback, useState} from "react";
import {simpleInput, inputPassword, Register} from "@shared";
import type {FormProps} from "antd";


type FieldType = {
    username?: string;
    password?: string;
    password2?: string
};

type argFailed<T extends FormProps<FieldType>['onFinishFailed']> = T extends (error: infer V)=>void ? V : never;

function SingUp(props: {onSubmit?:()=>void}){

    const [textError, setTextError] = useState<FieldType & {error?: string} >({});

    const onFinish = useCallback((values:FieldType) => {
        const valueForm = {...values};
        delete valueForm.password2;
        const register = new Register<FieldType>(false);
        register.fetch(values)
            .then((el=> {console.log(el); props.onSubmit && props.onSubmit();}))
            .catch(el=>{
                setTextError({});
                setTextError(register.methodFailure(el));
            })
    },[textError]);

    const onFinishFailed = useCallback((errorInfo:argFailed<FormProps<FieldType>['onFinishFailed']>) => {
        console.log('Failed:', errorInfo);
    },[])


    return <Form<FieldType> onFinish={onFinish} onFinishFailed={onFinishFailed} textError={textError} remember={true} submit={'Зарегистрироваться'} childrenItem={[
        simpleInput<FieldType>({
            label: 'Логин',
            name: 'username',
            rules: [{ required: true, message: 'Please input your username!' }]
        }),
        inputPassword<FieldType>({
            label: 'Пароль',
            name: 'password'
        }),
        inputPassword<FieldType>({
            label: 'Поддтвердите пароль',
            name: 'password2',
            rules: [({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The password that you entered do not match!'));
                },
            })]
        })
    ]} />
}

export default SingUp;