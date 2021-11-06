import { Greeter } from './model/Greeter';

const TSDK = {
    VERSION:"0.0.1",
    test: () => {
        console.log("Hi,It's running.");
    },
    
    Greeter: Greeter,
}

export default TSDK;
