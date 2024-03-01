import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <>
            <Container component={"header"} sx={{ py: 2 }}>
                <Card>
                    <CardContent>
                        <Typography component="h1" variant="h4">Loja de Conveniência</Typography>

                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                            <Link to={"/"}>
                                <Typography component={"span"}>
                                    Home
                                </Typography>
                            </Link>
                            •
                            <Link to={"/sobre"}>
                                <Typography component={"span"}>
                                    Sobre
                                </Typography>
                            </Link>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>

            <Container component={"main"}>
                <Outlet />
            </Container>
        </>
    );
}

export default DefaultLayout;