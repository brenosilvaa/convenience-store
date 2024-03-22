import { Box, Typography } from "@mui/material"

interface PageTitleProps {
    title: string;
    caption?: string
}

const PageTitle = ({ title, caption }: PageTitleProps) => {
    return (
        <Box>
            <Typography component={"h2"} variant="h5">{title}</Typography>
            {!!caption && (
                <Typography>{caption}</Typography>
            )}
        </Box>
    );
}

export default PageTitle;