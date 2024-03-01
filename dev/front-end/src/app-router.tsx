import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import HomePage from "./features/common/pages/home";
import AboutPage from "./features/common/pages/about";
import NotFoundPage from "./features/common/pages/not-found";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<DefaultLayout />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="sobre" element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;