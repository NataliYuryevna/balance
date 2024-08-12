import {Form} from "@entities";
import React, {useCallback, useState} from "react";
import {simpleInput, inputPassword, Register} from "@shared";
import {Button} from "antd";
import type {FormProps} from "antd";


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    field?: string;
};

type argFailed<T extends FormProps<FieldType>['onFinishFailed']> = T extends (error: infer V)=>void ? V : never;

function LogIn(props:{onSignUp:(e?: React.MouseEvent<HTMLElement>)=>void, onSubmit?:()=>void}){

    const [textError, setTextError] = useState<FieldType & {error?: string}>({});

    const onFinish = useCallback((values:FieldType) => {
        const login = new Register<FieldType>(true);
        login.fetch(values)
            .then((el=> {console.log(el); props.onSubmit && props.onSubmit();}))
            .catch(el=>{
                setTextError({});
                setTextError(login.methodFailure(el));
            })
    },[textError]);

    const onFinishFailed = useCallback((errorInfo:argFailed<FormProps<FieldType>['onFinishFailed']>) => {
        console.log('Failed:', errorInfo);
    },[])

    return <Form<FieldType> onFinish={onFinish} onFinishFailed={onFinishFailed} remember={true} submit={'Зайти'} textError={textError} childrenItem={[
        simpleInput<FieldType>({
            label: 'Логин',
            name: 'username',
            rules: [{ required: true, message: 'Please input your username!' }]
        }),
        inputPassword<FieldType>({
            label: 'Пароль',
            name: 'password'
        })
    ]} >
        <Button type="primary" htmlType="button" onClick={props.onSignUp}>
            {'Зарегистрироваться'}
        </Button>
    </Form>
}

export default LogIn;