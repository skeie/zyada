import { NavigationActions } from 'react-navigation';

export const goToRoute = (dispatch, routeName) => {
    const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName  })],
    });
    return dispatch(actionToDispatch);
};
