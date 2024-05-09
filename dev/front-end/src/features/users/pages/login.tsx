import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { IoIosEye, IoIosEyeOff, IoMdCheckmarkCircleOutline } from "react-icons/io";
import PageTitle from "../../../shared/components/page-title";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";


const LoginPage = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();

    const save = async () => {

        console.log('fez login!');
    }

    return (
        <>
            <PageTitle
                title={"Login"}
                caption={"Faça login no sistema e começa a vender seus produtos!"}
            />

            <Stack component={"form"}  gap={3} sx={{ maxWidth: 400, mt: 5 }}>


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

                <Button onSubmit={handleSubmit(save)} type="submit" variant="contained" sx={{ mx: 16, mt: 1, gap: 1 }}>
                    <IoMdCheckmarkCircleOutline />Entrar
                </Button>

            </Stack>
        </>
    )
}

export default LoginPage;