import * as React from 'react';
import {MenuHorizontal} from '@shared';
import {useRef} from "react";

type Props = {
    onClick: (key:string)=>void,
    keysItems: [string, string]
};
function Menu(props: Props) {
    const items = useRef([
        {
            key: props.keysItems[0],
            label:'LogIn'
        },
        {
            key:props.keysItems[1],
            label: 'SignUp'
        }
    ])
    return (
        <MenuHorizontal onClick={props.onClick} items={items.current}/>
    );
};

export default Menu;