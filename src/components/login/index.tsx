import TextField from "../ui/TextField";
import { FontAwesome5 } from "@expo/vector-icons"

export default function renderLogin() {
    return (
        <TextField
            label="E-mail"
            icon="email-outline"
        >
        </TextField>
    )
}