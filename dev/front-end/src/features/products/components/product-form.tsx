import { Box, Stack, TextField, Button, Typography, Drawer, IconButton, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdCheckmarkCircleOutline, IoIosRefresh } from "react-icons/io";
import { CreateProduct } from "../models/create-product";
import { Product } from "../models/product";
import { ProductService } from "../services/product-service";
import { LoggedUser } from "../../users/models/logged-user";

interface ProductFormProps {
    selectedProduct: Product | undefined;
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
    opened: boolean;
    setOpened: any;
}

const ProductForm = ({ selectedProduct, setSelectedProduct, opened, setOpened }: ProductFormProps) => {
    const { register, handleSubmit, setFocus, reset, setValue, formState: { errors } } = useForm<CreateProduct>();
    const [imageUrl, setImageUrl] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();

    const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);
    };

    const handleSucces = () => {
        enqueueSnackbar('Salvo com sucesso!', { variant: 'success', autoHideDuration: 3000 });
    };

    const handleError = () => {
        enqueueSnackbar('Algo deu errado!', { variant: 'error', autoHideDuration: 3000 });
    };

    const save: SubmitHandler<CreateProduct> = async (createdProduct) => {
        const result = !selectedProduct?.id ?
            await ProductService.instance.createAsync(createdProduct) :
            await ProductService.instance.updateAsync(selectedProduct.id, createdProduct);

        if (result != null) {
            handleSucces();
            setImageUrl("");
            setFocus("name");
            reset();
            setSelectedProduct(undefined);
            setOpened(false);
        } else {
            handleError();
        }
    };

    useEffect(() => {
        if (!!selectedProduct) {
            setValue("name", selectedProduct.name);
            setValue("description", selectedProduct.description);
            setValue("image", selectedProduct.image);
            setValue("value", selectedProduct.value);

            // Recuperar o user do localStorage
            const userStorage = localStorage.getItem("conv_user");
            const user: LoggedUser | null = !!userStorage ? JSON.parse(userStorage) : null;
            // Definir o valor do campo userId no formulário
            setValue("userId", user?.id || '');

            setImageUrl(selectedProduct.image ?? '');
        }
    }, [selectedProduct]);

    return (
        <Drawer
            anchor="right"
            open={opened}
            onClose={() => setOpened(false)}
            ModalProps={{ keepMounted: true }}
        >
            <Box style={{ display: "flex" }} sx={{ width: 380, mr: 3, ml: 1, height: 1 }}>
                <Stack component={"form"} onSubmit={handleSubmit(save)} gap={3} sx={{ maxWidth: 400 }}>
                    <Box>
                        <Tooltip title="Limpar campos">
                            <IconButton onClick={() => reset()} color="warning" sx={{ backgroundColor: "warning" }}>
                                <IoIosRefresh />
                            </IconButton>
                        </Tooltip>
                    </Box>
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
                        InputLabelProps={{
                            shrink: true
                        }}
                        sx={{ marginTop: "-16px" }}
                    />

                    <TextField
                        {...register("image")}
                        type="text"
                        label="Imagem"
                        variant="outlined"
                        size="small"
                        onChange={handleImageUrlChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <TextField
                        {...register("value", { required: "O campo é obrigatório." })}
                        type="number"
                        label="Valor"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <TextField
                        {...register("description")}
                        type="text"
                        label="Descrição"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={3}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <Button type="submit" variant="contained" sx={{ mx: 16, mt: 1, gap: 1 }}>
                        <IoMdCheckmarkCircleOutline />Cadastrar
                    </Button>
                </Stack>
            </Box>


            {imageUrl && (
                <Box style={{ marginLeft: "20px", marginBottom: "10px" }}>
                    <Typography variant="h6">
                        Pré-Visualização
                    </Typography>
                    <Box style={{ maxWidth: "300px", maxHeight: "165px", overflow: "hidden", border: "1px solid #ccc" }}>
                        <img src={imageUrl} alt="Imagem Renderizada" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                </Box>
            )}
        </Drawer >

    );
}

export default ProductForm;
