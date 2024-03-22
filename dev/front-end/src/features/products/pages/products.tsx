import React, { useState } from "react";
import { Stack, TextField, Button, Typography, Box } from "@mui/material";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import PageTitle from "../../../shared/components/page-title";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateProduct } from "../../products/models/create-product";
import { ProductService } from "../../products/services/product-service";
import { useSnackbar } from "notistack";

const ProductsPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateProduct>();
    const [imageUrl, setImageUrl] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();
    
    const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);
    };

    const handleSucces = () => {
        enqueueSnackbar('Salvo com succeso!', { variant: 'success', autoHideDuration: 3000 });
    };

    const handleError = () => {
        enqueueSnackbar('Algo deu errado!', { variant: 'error', autoHideDuration: 3000 });
    };

    const save: SubmitHandler<CreateProduct> = async (createdProduct) => {
        const result = await ProductService.instance.createAsync(createdProduct);

        if (result != null) {
            handleSucces();
            setFocus("name");
            reset();
        } else {
            handleError();
        }
    };

    return (
        <>
            <PageTitle
                title={"Cadastro de Produtos"}
                caption={"Preencha os dados básicos do seu produto"}
            />

            <Box style={{ display: "flex" }}>
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
                        {...register("userId", { required: "O campo é obrigatório." })}
                        type="text"
                        label="Usuário"
                        variant="outlined"
                        size="small"
                    />

                    <TextField
                        {...register("image")}
                        type="text"
                        label="Imagem"
                        variant="outlined"
                        size="small"
                        onChange={handleImageUrlChange}
                    />

                    <TextField
                        {...register("value", { required: "O campo é obrigatório." })}
                        type="number"
                        label="Valor"
                        variant="outlined"
                        size="small"
                    />

                    <TextField
                        {...register("description")}
                        type="text"
                        label="Descrição"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={3}
                    />

                    <Button type="submit" variant="contained" sx={{ mx: 16, mt: 1, gap: 1 }}>
                        <IoMdCheckmarkCircleOutline />Cadastrar
                    </Button>
                </Stack>

                {imageUrl && (
                    <Box style={{ marginLeft: "20px" }}>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            Pré-Visualização
                        </Typography>
                        <Box style={{ maxWidth: "300px", maxHeight: "165px", overflow: "hidden", border: "1px solid #ccc" }}>
                            <img src={imageUrl} alt="Imagem Renderizada" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                    </Box>
                )}
            </Box >
        </>
    );
};

export default ProductsPage;
