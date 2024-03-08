import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import PageTitle from "../../../shared/components/page-title";
import { useState } from "react";
import { CreateUser } from "../models/create-user";
import { UserService } from "../services/user-service";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const createdUser: CreateUser = {
            name,
            email,
            password,
            passwordConfirmation
        }

        const result = await UserService.instance.registerAsync(createdUser);

        console.log(result);
    }

    return (
        <>
            <PageTitle
                title={"Cadastre-se"}
                caption={"Preencha os dados básicos para se tornar um usuário da Loja de Conveniência"}
            />

            <Stack component={"form"} onSubmit={save} gap={3} sx={{ maxWidth: 400, mt: 5 }}>
                <TextField
                    label="Nome"
                    variant="outlined"
                    size="small"
                    error={true}
                    helperText="O nome é obrigatório"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <TextField
                    type="email"
                    label="E-mail"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <TextField
                    type={showPassword && "text" || "password"}
                    label="Senha"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword && "o" || "-"}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    type={showPasswordConfirmation && "text" || "password"}
                    label="Confirmar Senha"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    value={passwordConfirmation}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                                    {showPasswordConfirmation && "o" || "-"}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Button type="submit" variant="contained" sx={{ mx: 16, mt: 1 }}>
                    Cadastrar
                </Button>
            </Stack>
        </>
    )
}

export default SignUpPage;