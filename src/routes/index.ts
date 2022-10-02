import express from 'express';

import blogPostRoutes from './blog-posts';
import categoryRoutes from './category';

const router = express.Router();

const allRoutes = [
  {
    path: '/blog-posts',
    route: blogPostRoutes,
  },
  {
    path: '/category',
    route: categoryRoutes,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
