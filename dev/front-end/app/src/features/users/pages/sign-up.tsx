import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import PageTitle from "../../../shared/components/page-title";
import { useState } from "react";
import { CreateUser } from "../models/create-user";
import { UserService } from "../services/user-service";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff, IoMdCheckmarkCircleOutline } from "react-icons/io";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<CreateUser>();

    const save: SubmitHandler<CreateUser> = async (createdUser) => {
        const result = await UserService.instance.registerAsync(createdUser);

        console.log(result);
    }

    return (
        <>
            <PageTitle
                title={"Cadastre-se"}
                caption={"Preencha os dados básicos para se tornar um usuário da Loja de Conveniência"}
            />

            <Stack component={"form"} onSubmit={handleSubmit(save)} gap={3} sx={{ maxWidth: 400, mt: 5 }}>
                <TextField
                    {...register("name", {
                        required: "O campo é obrigatório.",
                        minLength: { value: 3, message: "O campo nome deve possuir ao menos 3 caracteres." }
                    })}
                    label="Nome"
                    variant="outlined"
                    size="small"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    {...register("email", { required: "O campo é obrigatório." })}
                    type="email"
                    label="E-mail"
                    variant="outlined"
                    size="small"

                />

                <TextField
                    {...register("password", { required: "O campo é obrigatório." })}
                    type={showPassword && "text" || "password"}
                    label="Senha"
                    variant="outlined"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword && <IoIosEye /> || <IoIosEyeOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    {...register("passwordConfirmation", { required: "O campo é obrigatório." })}
                    type={showPasswordConfirmation && "text" || "password"}
                    label="Confirmar Senha"
                    variant="outlined"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                                    {showPasswordConfirmation && <IoIosEye /> || <IoIosEyeOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Button type="submit" variant="contained" sx={{ mx: 16, mt: 1, gap: 1 }}>
                    <IoMdCheckmarkCircleOutline />Cadastrar
                </Button>
            </Stack>
        </>
    )
}

export default SignUpPage;