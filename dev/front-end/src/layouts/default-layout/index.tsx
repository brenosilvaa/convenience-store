import { Box, Container, Stack, Typography, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartState } from "../../features/order-item/states/cart-state";

const BannerPrincipal = styled("img")({
    width: "100%",
    borderRadius: "1.2rem",
    height: 240,
    objectFit: "cover"
});

const Mask = styled("div")({
    position: "absolute",
    width: "100%",
    height: "calc(100% - 4px)",
    backgroundColor: "rgba(0, 0, 0, .5)",
    borderRadius: "1.2rem",
    top: 0,
    left: 0
});


const DefaultLayout = () => {
    const cart = useRecoilValue(cartState);
    const { enqueueSnackbar } = useSnackbar();

    const showBuildProductsSnackBar = () => {
        enqueueSnackbar('Adicione alguns itens ao seu carrinho !', { variant: 'info', autoHideDuration: 3000,  });
    }

    const cartIsEmpty = cart.length === 0;

    return (
        <>
            <Container component={"header"} sx={{ my: 2, p: "0 !important", position: "relative" }}>
                <BannerPrincipal src="/images/banner.jpg" alt="Banner principal" />

                <Mask />

                <Box sx={{ position: "absolute", width: "calc(100% - 48px)", p: 3, bottom: 0, left: 0, color: "white" }}>
                    <Typography component="h1" variant="h4">Loja de Conveniência</Typography>

                    <Stack direction={"row"} gap={1} alignItems={"center"} sx={{ width: 1 }}>
                        <Link to={"/"} style={{ textDecorationColor: "white" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Home
                            </Typography>
                        </Link>
                        •
                        <Link to={"/sobre"} style={{ textDecorationColor: "white" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Sobre
                            </Typography>
                        </Link>
                        •
                        <Link to={"/produtos"} style={{ textDecorationColor: "white" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Produtos
                            </Typography>
                        </Link>

                        <Link onClick={cartIsEmpty ? showBuildProductsSnackBar : () => {}} to={cartIsEmpty ? "/" : "/carrinho"} style={{ textDecorationColor: "white", marginLeft: "auto" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Carrinho ({cartIsEmpty ? "vazio" : cart.length})
                            </Typography>
                        </Link>
                        •
                        <Link to={"/cadastro"} style={{ textDecorationColor: "white" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Cadastre-se
                            </Typography>
                        </Link>
                    </Stack>
                </Box>
            </Container>

            <Container component={"main"}>
                <Outlet />
            </Container>
        </>
    );
}

export default DefaultLayout;