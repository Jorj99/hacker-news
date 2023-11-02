import { useParams } from "react-router-dom";
import useCommentsByIds from "./hooks/useCommentsByIds";
import { Box, Typography } from "@mui/material";
import sxStyle from "./styles.sx";

function CardComponent() {
  const { id } = useParams();
  const { loading } = useCommentsByIds(id as string);

  if (loading) {
    return (
      <Box sx={sxStyle.app}>
        <Typography variant="h4" component="h4">
          Loading ...
        </Typography>
      </Box>
    );
  }
  return <div>News Item ID: {id}</div>;
}

export default CardComponent;
