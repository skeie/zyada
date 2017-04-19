
if (__DEV__) {
    var Immutable = require('immutable');
    var installDevTools = require('immutable-devtools');
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Warning: ReactNative.createElement'];
    installDevTools(Immutable);
}