import { Box, Button } from "@mui/material";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import PageTitle from "../../../shared/components/page-title";
import withUser from "../../../shared/hocs/withUser";
import ProductForm from "../components/product-form";
import ProductsList from "../components/products-list";
import { Product } from "../models/product";

const ProductsPage = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
    const [addOpened, setAddOpened] = useState<boolean>(false);

    const add = () => {
        setSelectedProduct({
            id: "",
            name: "",
            value: 0,
            description: "",
            image: "",
            userId: "08dc452b-ebc9-4410-8eba-1600de6d7668"
        });

        setAddOpened(true);
    }

    return (
        <>
            <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between", alignItems: "center" }}>
                <PageTitle
                    title={"Cadastro de Produtos"}
                    caption={"Preencha os dados básicos do seu produto"}
                />

                <Button type="button" variant="contained" onClick={add} sx={{ gap: 1 }}>
                    <IoMdAddCircle />Adicionar
                </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
                <ProductsList selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} setOpened={setAddOpened} />
                <ProductForm selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} opened={addOpened} setOpened={setAddOpened}/>
            </Box>
        </>
    );
};

export default withUser(ProductsPage, "seller");
