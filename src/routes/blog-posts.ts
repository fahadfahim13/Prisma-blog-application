import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { includeCategories } = req.body;
    try {
      const posts = await prisma.blogPosts.findMany({
        include: {categories: includeCategories ?? false}
      });
      res.json({
        success: true,
        payload: posts,
        message: "Successfully fetched all posts",
      })
    } catch (error) {
      res.status(404);
      return res.json({
        success: false,
        payload: error,
        message: 'Something wrong happened'
      });
    }
  }
);

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const { includeCategories } = req.body;
    try {
      const post = await prisma.blogPosts.findFirst({
        where: {
          Id: Number(id),
        },
        include: {categories: includeCategories?? false}
      })
      if(!post){
        res.status(404);
        return res.json({
          success: false,
          payload: null,
          message: 'Post Not found'
        });
      }
      res.json({
        success: true,
        payload: post,
        message: "Successfully fetched post with id: " + id,
      })
    } catch (error) {
      res.status(404);
      return res.json({
        success: false,
        payload: error,
        message: 'Something wrong happened'
      });
    }
  }
);

router.post("/", async (req, res) => {
    const {name, description, body} = req.body;
    try {
      const post = await prisma.blogPosts.create({
        data: {
          name,
          description,
          body,
        }
      });
      res.json({
        success: true,
        payload: post,
        message: "Successfully created post",
      })
    } catch (error) {
      res.status(404);
      return res.json({
        success: false,
        payload: error,
        message: 'Something wrong happened'
      });
    }
  }
);

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {name, description, body} = req.body;
    try {
      const post = await prisma.blogPosts.update({
        where: {Id: Number(id)},
        data: {
          name,
          description,
          body
        }
      });
      res.json({
        success: true,
        payload: post,
        message: "Successfully updated post",
      })
    } catch (error) {
      res.status(404);
      return res.json({
        success: false,
        payload: error,
        message: 'Something wrong happened'
      });
    }
  }
);

router.put("/:id/add_category", async (req, res) => {
  const id = req.params.id;
  const {categoryId} = req.body;
  try {
    const post = await prisma.blogPosts.update({
      where: {Id: Number(id)},
      data: {
        categories: {
          connect: {
            Id: Number(categoryId)
          }
        }
      }
    });
    res.json({
      success: true,
      payload: post,
      message: "Successfully linked category",
    })
  } catch (error) {
    res.status(404);
    return res.json({
      success: false,
      payload: error,
      message: 'Something wrong happened'
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.blogPosts.delete({where: {Id: Number(id)}});
    res.json({
      success: true,
      payload: post,
      message: "Successfully deleted post",
    })
  } catch (error) {
    res.status(404);
    return res.json({
      success: false,
      payload: error,
      message: 'Something wrong happened'
    });
  }
  }
);

export default router;