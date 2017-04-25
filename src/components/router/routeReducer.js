// import { NavigationExperimental } from 'react-native';
// import {
//     POP_ROUTE,
//     PUSH_ROUTE,
//     APP_READY,
//     RESET_ROUTE,
// } from './routesActionTypes';
// import { LOAD } from 'redux-storage';

// const { StateUtils: NavigationStateUtils } = NavigationExperimental;

// const initState = {
//     index: 0,
//     routes: [{ key: 'Main' }],
//     prevPushedRoute: {},
// };

// function navReducer(state = initState, action) {
//     switch (action.type) {
//         // for some reason, redux-storage saves the prev
//         // state. We want it to have initial state every time instead
//         case LOAD:
//             return initState;

//         case APP_READY: {
//             return {
//                 ...state,
//                 index: 0,
//                 routes: [action.route],
//             };
//         }
//         case PUSH_ROUTE: {
//             const routes = state.routes.slice();
//             routes.push(action.route);
//             return {
//                 ...state,
//                 prevPushedRoute: action.route,
//                 index: routes.length - 1,
//                 routes,
//             };
//         }
//         case RESET_ROUTE: {
//             const routes = (state.routes = [action.route]);

//             return {
//                 ...state,
//                 prevPushedRoute: action.route,
//                 index: routes.length - 1,
//                 routes,
//             };
//         }

//         case POP_ROUTE: {
//             return NavigationStateUtils.pop(state);
//         }

//         default:
//             return state;
//     }
// }

// export default navReducer;
