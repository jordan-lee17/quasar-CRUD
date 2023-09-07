
const routes = [
  {
    path: '/',
    component: () => import('layouts/GameDisplay.vue')
  },
  {
    path: '/gameReview/:id',
    component: () => import('pages/GameReview.vue')
  }
]

export default routes
