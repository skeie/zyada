import { NavigationActions } from 'react-navigation';

export const goToRoute = (dispatch, routeName) => {
    const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })],
    });
    return dispatch(actionToDispatch);
};

export const pushRoute = (navigate, routeName, props = {}) => {
    return navigate(routeName, props);
};
