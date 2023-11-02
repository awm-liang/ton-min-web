import { createMemoryRouter } from "react-router-dom";

import Layout from '@/layout'

import User from '@/pages/user'
import UserDetail from "@/pages/user-detail";

const routes = createMemoryRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <User />
            },
            {
                path: "user-detail/:id",
                element: <UserDetail />
            },
        ]
    }
])

export default routes;