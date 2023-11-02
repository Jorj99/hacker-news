import useNewStories from "./hooks/useNewStories";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import sxStyle from "./styles.sx";

function App() {
  const { data, loading, refetch } = useNewStories();

  if (loading) {
    return (
      <Box sx={sxStyle.app}>
        <Typography variant="h4" component="h4">
          Loading ...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={sxStyle.app}>
      <Typography variant="h2" component="h2" sx={sxStyle.appTitle}>
        Hacker news
      </Typography>
      {data.map((item) => (
        <Link
          to={`/${item.id}`}
          key={item.id}
          style={sxStyle.card as React.CSSProperties}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h6">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author: {item.by}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Score: {item.score}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Time: {new Date(item.time * 1000).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
      <Box sx={sxStyle.updateBtnWrapper}>
        <Button variant="contained" onClick={refetch}>
          Update news
        </Button>
      </Box>
    </Box>
  );
}

export default App;
