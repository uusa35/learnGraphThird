/**
 * Created by usamaahmed on 4/10/17.
 */

let propertiesReducers = function(properties = {}, action) {
    switch (action.type) {
        case 'ENABLE_LOADING' :
            return Object.assign({}, properties, {
                isLoading: true,
            });

        case 'DISABLE_LOADING' :
            return Object.assign({}, properties, {
                isLoading: false
            })
        default :
            return properties;
    }
}

export default propertiesReducers;