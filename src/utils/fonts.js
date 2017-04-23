/*
* @flow
*/
import { Platform } from 'react-native';
const style = {
    one: Platform.select({
        ios: { fontFamily: 'Fredoka One' },
        android: { fontFamily: 'FredokaOne' },
    }),
    regular: Platform.select({
        ios: { fontFamily: 'FredokaOne-Regular' },
        android: { fontFamily: 'FredokaOne_Regular' },
    }),
};
const fonts = (type: String) =>  style[type];

export default fonts;
