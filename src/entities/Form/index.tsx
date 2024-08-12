import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import type {FormProps} from 'antd';
import { Button, Form, Flex} from 'antd';
import type {typeChildForm} from "@shared";

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

type typeFormProps<T extends {[keys: string]: string}> = {
    remember: boolean,
    onFinish: FormProps<T>['onFinish'],
    onFinishFailed: FormProps<T>['onFinishFailed'],
    childrenItem: Array<typeChildForm<T>&{ obj:ReactElement }>,
    submit: string,
    textError?: T & {error?: string},
    children?: ReactElement
};

function MyForm<T extends {[keys: string]: string}>(props: typeFormProps<T>) {
    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(()=>{
        for (let textErrorKey in props.textError) {
            setFields([{name: textErrorKey === 'error'? 'submit' : textErrorKey , errors: [props.textError[textErrorKey]]}])
        }
    },[props.textError])

    const onChange = useCallback(()=>{
        if(props.textError && fields.length && fields[0].errors?.length) {
            setFields([{name: 'submit', errors:[]}]);
        }
    },[props.textError, fields])


    return <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: props.remember }}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        autoComplete="off"
        fields={fields}
        onValuesChange={onChange}
    >
        { props.childrenItem.map(el=>(
            <Form.Item<T>
            label={el.label}
            name={el.name}
            rules={el.rules}
        >
                {el.obj}
        </Form.Item>
        ))}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} name={'submit'}>
            <Flex gap="small">
                <Button type="primary" htmlType="submit">
                    {props.submit}
                </Button>
                {props.children}
            </Flex>
        </Form.Item>
    </Form>
};

export default MyForm;