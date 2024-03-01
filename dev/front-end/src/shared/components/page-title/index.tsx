import { Typography } from "@mui/material"

interface PageTitleProps {
    title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
    return (
        <Typography component={"h2"} variant="h5">{title}</Typography>
    )
}

export default PageTitle;