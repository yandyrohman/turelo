import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import VueSweetalert2 from 'vue-sweetalert2'

import './style.css'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.use(VueSweetalert2)
app.use(routes)
app.mount('#app')
