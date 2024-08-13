import {LogIn, MenuHorizontal, SignUp} from "@features";
import {useCallback, useRef, useState} from "react";
import {Layout} from "antd";
const { Header, Content} = Layout;

function Register() {
    const [openSignUp, setOpenSignUp] = useState<boolean>(false);
    const keysMenu = useRef<[string,string]>(['login', 'signup'])

    const onSignUp = useCallback(()=> {
        setOpenSignUp(true);
    }, [openSignUp])

    const onSubmitSignUp = useCallback(()=> {
        setOpenSignUp(false);
    }, [openSignUp])

    const onClickMenu = useCallback((key:string)=> {
        switch (key) {
            case keysMenu.current[0]: setOpenSignUp(false); break;
            case keysMenu.current[1]: setOpenSignUp(true); break;
            default: setOpenSignUp(false);
        }
    }, [])

    return <Layout>
            <MenuHorizontal onClick={onClickMenu} keysItems={keysMenu.current}/>
        <Content style={{ padding: '16px 48px' }}>
            {!openSignUp ? <LogIn onSignUp={onSignUp}/> : <SignUp onSubmit={onSubmitSignUp}/>}
        </Content>
    </Layout>;
}


export default Register;