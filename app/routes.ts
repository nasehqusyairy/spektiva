import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [

    layout("components/layouts/default.tsx", [
        layout("components/layouts/criterions.tsx", [
            layout("components/layouts/dashboard.tsx", [index("pages/dashboard.tsx")]),
            route('criterions', "pages/criterions.tsx")]),
        route('scales', "pages/scales.tsx"),
    ])

] satisfies RouteConfig;
