import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { includeBlogPosts } = req.body
    try {
      const categories = await prisma.category.findMany({
        include: { blogposts: includeBlogPosts ?? false}
      });
      res.json({
        success: true,
        payload: categories,
        message: "Successfully fetched all categories",
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
  try {
    const category = await prisma.category.findFirst({
      where: {
        Id: Number(id),
      }
    })
    if(!category){
      res.status(404);
      return res.json({
        success: false,
        payload: null,
        message: 'Category Not found'
      });
    }
    res.json({
      success: true,
      payload: category,
      message: "Successfully fetched category with id: " + id,
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
  const {name, description} = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        name,
        description: description ?? '',
      }
    });
    res.json({
      success: true,
      payload: category,
      message: "Successfully created category",
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
  const {name, description} = req.body;
  try {
    const category = await prisma.category.update({
      where: {Id: Number(id)},
      data: {
        name,
        description
      }
    });
    res.json({
      success: true,
      payload: category,
      message: "Successfully updated category",
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

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await prisma.category.delete({where: {Id: Number(id)}});
    res.json({
      success: true,
      payload: category,
      message: "Successfully deleted category",
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