import * as React from 'react';
import {Menu} from "antd";
import {useCallback, useEffect, useState} from "react";
import type {MenuProps} from "antd";

type typeProps = {
    onClick: (key:string)=>void,
    items: MenuProps['items']
};
type typeArgOnClick<T extends  MenuProps['onClick']> = T extends (e: infer V)=>void ? V : never;

function MenuHorizontal(props: typeProps) {
    const [current, setCurrent] = useState<string|undefined>(undefined);

    useEffect(()=>{
        if(props.items?.length){
            setCurrent(String(props.items[0]?.key)||undefined)
        }
        else setCurrent(undefined)
    },[props.items])

    const onClick: MenuProps['onClick'] = useCallback((e:typeArgOnClick<MenuProps['onClick']>) => {
        setCurrent(e.key);
        props.onClick(e.key)
    },[current]);

    return (
        <Menu theme={'light'} style={{display: 'flex', justifyContent: 'flex-end'}} onClick={onClick} selectedKeys={current ? [current]:[]} mode="horizontal" items={props.items} />
    );
};

export default MenuHorizontal