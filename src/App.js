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
// import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  // const [syncScroll, setSyncScroll] = useState(false);
  // const editorRef = useRef(null);
  // const previewRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!syncScroll) {
  //       console.log("Editor is scrolling!!")
  //     }
  //     if (syncScroll && editorRef.current && previewRef.current) {
  //       const editor = editorRef.current;
  //       const preview = previewRef.current;

  //       const ratio =
  //         editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
  //       preview.scrollTop =
  //         ratio * (preview.scrollHeight - preview.clientHeight);
  //     }
  //   };
  //   const editor = editorRef.current;
  //   if (editor) {
  //     editor.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (editor) {
  //       editor.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // // }, [syncScroll]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const getMarkdownText = () => {
    const rawHTML = marked(markdown, { breaks: true });
    return { __html: DOMpurify.sanitize(rawHTML) };
  };

  // const handleChangeCheckBox = (event) => {
  //   console.log("Before setting: ", syncScroll);
  //   setSyncScroll(event.target.checked);
  //   console.log("After setting: ", syncScroll);
  // };

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
            // backgroundColor: "cyan",
            minHeight: "100%",
            width: "47%",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", m: "15px" }}>
            MarkDown Code
          </Typography>
          <TextareaAutosize
            // ref={editorRef}
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
            // backgroundColor: "cyan",
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
