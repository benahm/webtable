/**
 * Created by ahmed on 11/13/13.
 */

/**
 *
 * @param config
 */
function webtable(config) {

    /**
     * Configuration module
     */
    var configuration,
    //defaults configurations
        defaults = {
            limit: 15,
            minColumnWidth: 10, // the minimum column width
            countVisibleRecords: 10 // the number of records that can be visible on a single page
        };

    if (angular.isDefined(config)) {
        // config = path to json file
        if (angular.isString(config)) {
            console.log("path")
            var $injector = angular.injector(['ng']);
            var $http = $injector.get('$http'); // get instance of $http
            console.log($http)
            // ajax request to the json file
            $http({
                method: "GET",
                url: config
            }).success(function (data) {
                    //apply the configurations
                    configuration = angular.extend(defaults, data);
                    bootstrap(configuration);
                }).error(function () {
                    console.log("error")
                });
        } else {
            // config not object => Error
            if (!angular.isObject(config)) throw  new Error("Bad config");
            // config passed as object
            configuration = angular.extend(defaults, config);
            bootstrap(configuration);
        }
    } else {
        // no configs passed => bootstrap with defaults
        bootstrap(defaults);
    }


    /**
     * bootstrap the application with the configuration in param
     * @param configuration
     */
    function bootstrap(configuration) {
        angular.module('configuration', [])
            .constant('config', configuration);
        var webtable_element = angular.element("[webtable=''");
        // bootstrap.
        angular.bootstrap(webtable_element, ["webtable"]);
    }
}