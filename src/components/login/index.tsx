import  AuthContainer  from "../ui/AuthContainer";
import  TextField  from "../ui/TextField";


const RenderLogin = () => {
    return (

        <AuthContainer
            title="Grand Hotel Royal"
            subtitle="Login"
            icon="hotel">

            <TextField
                label="E-mail"
                icon="email">
            </TextField>

        </AuthContainer>


    )
}

export default RenderLogin;