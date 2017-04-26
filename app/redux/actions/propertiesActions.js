/**
 * Created by usamaahmed on 4/10/17.
 */
let propertiesActions = {
    enableLoading: function() {
        return {
            type: 'ENABLE_LOADING',
            isLoading: true
        }
    },

    disableLoading: function() {
        "use strict";
        return {
            type: 'DISABLE_LOADING',
            isLoading: false
        }
    }
}

export default propertiesActions;