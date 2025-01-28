import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    console.log("Received post data:", body);
    console.log("User ID:", tokenUserId);

    // Validate required fields
    if (!body.postData || !body.postDetail) {
      return res.status(400).json({ 
        message: "Missing required data", 
        received: body 
      });
    }

    // Create the post with postDetail in a transaction
    const newPost = await prisma.$transaction(async (prisma) => {
      // First create the main post
      const post = await prisma.post.create({
        data: {
          ...body.postData,
          userId: tokenUserId,
        },
      });

      // Then create the post detail
      await prisma.postDetail.create({
        data: {
          ...body.postDetail,
          postId: post.id,
        },
      });

      return post;
    });

    console.log("Created post:", newPost);
    res.status(200).json(newPost);
  } catch (err) {
    console.error("Error creating post:", {
      message: err.message,
      code: err.code,
      meta: err.meta
    });
    res.status(500).json({ 
      message: "Failed to create post",
      error: err.message,
      code: err.code,
      meta: err.meta 
    });
  }
};

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          //to get username and avatar only of the user for single page
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    }
    //res.status(200).json({ ...post, isSaved: false });//fix
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};


export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    // First check if post exists and user is authorized
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        savedPosts: true
      }
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    try {
      // Delete associated records one by one with error handling
      if (post.savedPosts?.length > 0) {
        await prisma.savedPost.deleteMany({
          where: { postId: id }
        });
      }

      if (post.postDetail) {
        await prisma.postDetail.delete({
          where: { postId: id }
        });
      }

      // Finally delete the post
      await prisma.post.delete({
        where: { id }
      });

      res.status(200).json({ message: "Post deleted successfully!" });
    } catch (deleteErr) {
      console.log("Specific delete operation error:", deleteErr);
      res.status(500).json({ 
        message: "Error during delete operation",
        error: deleteErr.message,
        code: deleteErr.code
      });
    }
  } catch (err) {
    console.log("General error in delete controller:", err);
    res.status(500).json({ 
      message: "Failed to process delete request",
      error: err.message,
      code: err.code
    });
  }
};