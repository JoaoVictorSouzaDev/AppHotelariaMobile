import  AuthContainer  from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import  TextField  from "../ui/TextField";



const RenderLogin = () => {
    return (

        <AuthContainer
            title="Grand Hotel Royal"
            subtitle="Login"
            icon="hotel">

            <TextField
                label="E-mail"
                icon="email"
                placeholder="email@email.com"
                keyboardType="email-address"
            />

            <PasswordField
                label="Senha"
                placeholder="********"
            />

        </AuthContainer>



    )
}

export default RenderLogin;