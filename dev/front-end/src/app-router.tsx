import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import HomePage from "./features/common/pages/home";
import AboutPage from "./features/common/pages/about";
import NotFoundPage from "./features/common/pages/not-found";
import SignUpPage from "./features/users/pages/sign-up";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<DefaultLayout />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="sobre" element={<AboutPage />} />
                    <Route path="cadastro" element={<SignUpPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;