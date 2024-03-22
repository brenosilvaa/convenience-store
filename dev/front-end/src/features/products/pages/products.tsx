import { Stack, TextField, Button } from "@mui/material";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import PageTitle from "../../../shared/components/page-title";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateProduct } from "../../products/models/create-product";
import { ProductService } from "../../products/services/product-service";
import { useSnackbar } from "notistack";

const ProductsPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateProduct>();

    const { enqueueSnackbar } = useSnackbar();


    const handleSucces = () => {
        enqueueSnackbar('Salvo com succeso!', { variant: 'success', autoHideDuration: 3000 });
    };

    const handleError = () => {
        enqueueSnackbar('Algo deu errado!', { variant: 'error', autoHideDuration: 3000 });
    };

    const save: SubmitHandler<CreateProduct> = async (createdProduct) => {
        const result = await ProductService.instance.createAsync(createdProduct);

        if (result != null)
            handleSucces();
        else {
            handleError();
        }
    }

    return (
        <>
            <PageTitle
                title={"Cadastro de Produtos"}
                caption={"Preencha os dados básicos do seu produto"}
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
        </>
    );
}

export default ProductsPage;