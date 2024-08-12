import {LogIn, SignUp} from "@features";
import {useCallback, useState} from "react";

function Register() {
    const [openSignUp, setOpenSignUp] = useState<boolean>(false);

    const onSignUp = useCallback(()=> {
        setOpenSignUp(true);
    }, [openSignUp])

    const onSubmitSignUp = useCallback(()=> {
        setOpenSignUp(false);
    }, [openSignUp])

    return <>
        {!openSignUp ? <LogIn onSignUp={onSignUp}/> : <SignUp onSubmit={onSubmitSignUp}/>}
    </>;
}


export default Register;