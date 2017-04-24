import { PUSH_ROUTE, POP_ROUTE, APP_READY, RESET_ROUTE } from './routesActionTypes';

export function push(route) {
    return {
        type: PUSH_ROUTE,
        route,
    };
}

export function pop() {
    return {
        type: POP_ROUTE,
    };
}

export const appReady = route => ({
    type: APP_READY,
    route,
});

export const resetRoute = route => ({
    type: RESET_ROUTE,
    route,
});
