import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useAuth } from "../context/AuthContext";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
const POSTS_BASE_URL = "http://localhost:5000/api/posts";

function PostsPage() {
  const { token, userID } = useAuth();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [content, setContent] = useState("");


  const fetchPosts = async () => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        const liked = new Set(
          data.filter((post) => post.likedByUser).map((post) => post.id)
        );
        setLikedPosts(liked);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const handleCreatePost = async () => {
    if (!content) return;
    try {
      const response = await fetch(`${POSTS_BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userID, content }),
      });
      if (response.ok) {
        setContent("");
        fetchPosts();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLikePost = async (postId) => {
    if (likedPosts.has(postId)) return;

    try {
      const response = await fetch(`${POSTS_BASE_URL}/${postId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setLikedPosts(new Set(likedPosts).add(postId));
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Container fixed sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Card sx={{ padding: 3, marginBottom: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Create a New Post
        </Typography>
        <TextField
          label="What's on your mind?"
          multiline
          fullWidth
          rows={4}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreatePost}
          sx={{ textTransform: "none", fontWeight: "medium" }}
        >
          Post
        </Button>
      </Card>

      <Stack spacing={3}>
        {posts.map((post) => (
          <Card
            key={post.id}
            sx={{ padding: 3, boxShadow: 2, borderRadius: 2 }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "text.secondary" }}
            >
              {post.email}
            </Typography>
            <Typography variant="subtitle2" color="grey" mt={1}>
              {dayjs(post.created_at).format("DD-MM-YYYY")}
            </Typography>
            <Divider sx={{ marginY: 1 }} />
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              {post.content}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton
                onClick={() => handleLikePost(post.id)}
                disabled={likedPosts.has(post.id)}
                sx={{
                  color: likedPosts.has(post.id) ? "#1976d2" : "grey.500",
                  "&:hover": { color: "#1976d2" },
                }}
              >
                <ThumbUpIcon /> {post.likes}
              </IconButton>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Liked by {post.likes} {post.likes === 1 ? "person" : "people"}
              </Typography>
            </Box>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default PostsPage;
