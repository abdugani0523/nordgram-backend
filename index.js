import { hash } from "bcrypt";


try {
    const hashed = await hash('abdugani', 10)
    console.log(await hash('abdugani', 10));
    console.log(await hash('abdugani', 10));
    console.log(await hash('asdasdad', 7));
    console.log(await hash('asdsa121323asdas', 6));
    console.log(await hash('donishmand', 5));
} catch(error) {
    console.log(error.message);
}