"use client";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Navbar from "../components/navbar";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await fetch("/feedback/feedbackapi");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data = await response.json();
        setFeedbackList(data);
      } catch (err) {
        setError("Error loading feedback");
      }
    }
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !feedback) {
      setError("Both name and feedback are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/feedback/feedbackapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, feedback }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      const newFeedback = await response.json();
      setFeedbackList((prev) => [...prev, newFeedback]);
      setName("");
      setFeedback("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 700, margin: "0 auto", padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Feedback Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
          />

          <TextField
            label="Feedback"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Feedback"}
          </Button>
        </form>

        {error && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="h5" sx={{ marginTop: 4, mb: 2 }}>
          Submitted Feedback
        </Typography>

        {/* ✅ Replaced List with Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>S.NO</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackList.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.feedback}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
