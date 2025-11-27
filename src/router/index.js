import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from "../views/About.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: route => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: EventDetails
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit
        },
      ]
    },
    {
      // match on /event/ and capture everything else in afterEvent
      // using (.*) so that includes "/" in the match (doesn't by default)
      path: '/event/:afterEvent(.*)',
      redirect: () => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },
    {
      path: '/about-us',
      name: 'about',
      component: About,
      alias: '/about' // not great for seo
    }
  ]
})

export default router
