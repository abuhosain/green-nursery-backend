import { Router } from 'express'
import { CategoryRoutes } from '../modules/category/category.route'
import { ProductRoutes } from '../modules/product/product.route'
import { UserRoutes } from '../modules/user/user.route'
import { OrderRoutes } from '../modules/order/order.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
