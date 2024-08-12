let apiUrl = 'http://192.168.0.13:8080';

type typeError<T> =  {
    error?: {
        args: T,
        field: string,
        message: string
    }
} & {message: string};

interface typeSuccess {
    "authToken": string
}

export class Register<T>{
    #apiRegister = `${apiUrl}/api/register`;
    #apiLogin = `${apiUrl}/api/login`;
    #api:string;

    constructor(login: boolean) {
        this.#api = login ? this.#apiLogin : this.#apiRegister;
    }

    async fetch(values: T) {
        try {
            const response = await fetch(this.#api, {
                method: "POST",
                body: JSON.stringify(values),
            })
            if(response.ok) {
                return Promise.resolve(response);
            } else {
                let textError = await response.text();
                textError = await JSON.parse(textError);
                throw textError;
            }
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    methodFailure(el:typeError<T>) {
        if(typeof el === 'object') {
            if(el.error && el.error.field) return {[el.error.field]: el.error.message};
            else return {error: el.error?.message || el.message};
        }
        return {};
    }

    methodSuccess(el: typeSuccess | undefined){

    }
}