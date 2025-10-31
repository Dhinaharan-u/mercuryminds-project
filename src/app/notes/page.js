"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../components/navbar";
import { useTheme } from "@mui/material/styles";

export default function NotesPage() {
  const { data: session, status } = useSession();
  const theme = useTheme();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  // ✅ Always call hooks — no conditional skipping
  useEffect(() => {
    if (status === "authenticated") {
      fetchNotes();
    }
  }, [status]);

  // ✅ Fetch Notes
  async function fetchNotes() {
    setLoading(true);
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (data.success) setNotes(data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Add Note
  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");

    setAdding(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          user: session?.user?.email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNotes((prev) => [data.data, ...prev]);
        setTitle("");
        setContent("");
      } else {
        alert(data.error || "Failed to add note");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  }

  // ✅ Delete Note
  async function handleDelete(id) {
    if (!confirm("Delete this note?")) return;
    try {
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setNotes((prev) => prev.filter((n) => n._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  }

  
  let contentToRender;

  if (status === "loading") {
    contentToRender = (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor={theme.palette.background.default}
      >
        <Typography variant="h6" color={theme.palette.text.primary}>
          Checking authentication...
        </Typography>
      </Box>
    );
  } else if (status === "unauthenticated") {
    contentToRender = (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor={theme.palette.background.default}
      >
        <Typography
          variant="h4"
          gutterBottom
          color={theme.palette.text.primary}
        >
          Access Denied
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          color={theme.palette.text.secondary}
        >
          Please log in with Google to access your notes.
        </Typography>
        <Button
          variant="contained"
          onClick={() => signIn("google")}
          sx={{
            textTransform: "none",
            px: 3,
            py: 1,
            borderRadius: 2,
            backgroundColor: "#001F3F",
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#001737" },
          }}
        >
          Login with Google
        </Button>
      </Box>
    );
  } else {
    // Authenticated user content
    contentToRender = (
      <Container
        maxWidth="md"
        sx={{
          py: 4,
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          📝 My Notes
        </Typography>

        {/* Add Note Form */}
        <Box
          component="form"
          onSubmit={handleAdd}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 4,
            p: 2,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            disabled={adding}
          >
            {adding ? "Adding..." : "Add Note"}
          </Button>
        </Box>

        {/* Notes List */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : notes.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No notes yet. Add one above!
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} key={note._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {note.title}
                    </Typography>
                    {note.content && (
                      <Typography variant="body2" color="text.secondary">
                        {note.content}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 1 }}
                    >
                      {new Date(note.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(note._id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    );
  }

  // ✅ Always return JSX
  return (
    <>
      <Navbar />
      {contentToRender}
    </>
  );
}
