import { AuthContainer } from "../ui/AuthContainer";
import { TextField } from "../ui/TextField";


export function RenderLogin() {
    return (

        <AuthContainer
            title="Grand Hotel Royal"
            subtitle="Faça seu login"
            icon="hotel">

            <TextField
                label="E-mail"
                icon="email">
            </TextField>

        </AuthContainer>


    )
}