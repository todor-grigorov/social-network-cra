import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { routesDeclaration } from './RoutesDeclaration';
import { Loader } from './Loader';
import NoMatch from '../components/NoMatch';

const flatten = (route) => {
    let routes = [];
    if (route.component) {
        routes = routes.concat(route);
    }

    if (route.children && route.children.length > 0) {
        routes = routes.concat(
            ...route.children.map((r) => {
                return flatten(r);
            }),
        );
    }

    return routes;
};

export const hasUser = (user) => {
    return user.email && user.displayName;
};

const isRoutePublic = (name) => {
    return publicRoutes.includes(name);
}

const publicRoutes = ['Home', 'Signin', 'Register'];

const RouterSwitch = () => {
    const user = useSelector((state => state.user));
    const routes = routesDeclaration(user);
    const flattenRoutes = flatten(routes).reverse();

    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                {flattenRoutes.map((route) => (
                    <Route
                        key={route}
                        path={route.path}
                        render={
                            props => isRoutePublic(route.name) ? !hasUser(user) ? <route.component {...props} /> : <Redirect to='/feed' /> : hasUser(user) ? <route.component {...props} /> : <Redirect to="/" />
                        }
                    />
                ))}
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        </Suspense>
    )
};

export default RouterSwitch;