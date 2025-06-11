import { marked } from "marked";
import DOMpurify from "dompurify";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  TextareaAutosize,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import initialMarkdown from "./initialMarkdown";

function App() {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const getMarkdownText = () => {
    const rawHTML = marked(markdown, { breaks: true });
    return { __html: DOMpurify.sanitize(rawHTML) };
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Markdown Live Preview
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button color="inherit" onClick={() => setMarkdown("")}>
                Reset
              </Button>
              <Button
                color="inherit"
                onClick={() => navigator.clipboard.writeText(markdown)}
              >
                Copy
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ display: "flex", height: "100vh" }}>
        <Container
          sx={{
            px: 0,
            minHeight: "100%",
            width: "47%",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", m: "15px" }}>
            MarkDown Code
          </Typography>
          <TextareaAutosize
            value={markdown}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "90%",
              fontSize: "16px",
              padding: "10px",
              border: "1px solid #ccc",
              resize: "none",
            }}
          ></TextareaAutosize>
        </Container>
        <Container
          sx={{
            height: "100%",
            width: "47%",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", m: "15px" }}>
            MarkDown Preview
          </Typography>
          <Box
            // ref={previewRef}
            sx={{
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: "white",
              minHeight: "90%",
            }}
            dangerouslySetInnerHTML={getMarkdownText()}
          ></Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
