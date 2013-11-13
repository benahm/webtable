/**
 * Created by ahmed on 11/11/13.
 */

/**
 * modal management
 */
angular.module("modalController", [])
    .controller("modalController", function ($scope, dataFactory) {

        var _this = this;
        this.isVisible = "hide";
        this.message = "";
        this.data = false;
        // icons codes
        icons = {
            error: "glyphicon-exclamation-sign",
            warning: "glyphicon-warning-sign",
            inform: "glyphicon-info-sign",
            confirm: "glyphicon-question-sign"
        }
        /**
         * object to control the button right
         * @type {{isVisible: boolean, label: string, action: Function}}
         */
        this.btnRight = {
            isVisible: true,
            label: "OK",
            /**
             * default action when click of the button right (close the modal & clear messages)
             */
            action: function () {
                _this.isVisible = "hide";
                _this.data = undefined;
                _this.message = undefined;
            }
        };
        /**
         * object to control the button left
         * @type {{isVisible: boolean, label: string, btnLeft: Function}}
         */
        this.btnLeft = {
            isVisible: false,
            label: "Close",
            /**
             * default action when click of the button left (close the modal & clear messages)
             */
            btnLeft: function () {
                _this.isVisible = "hide";
                _this.data = undefined;
                _this.message = undefined;
            }
        }

        /**
         * display an error message
         * @param message to display
         * @param callback : callback to execute on click on the button right
         */
        this.error = function (message, callback) {
            _this.message = message;
            _this.isVisible = "show";
            _this.icon = icons.error;
            if (typeof callback === "function")
                _this.btnRight.action = callback;
        };
        /**
         * display un array of errors with title
         * @param data data to display
         * @param callback callback to execute on click on the button OK
         */
        this.errors = function (data, callback) {
            _this.icon = icons.error;
            _this.data = {
                title: $scope.datas.head[data.index].name,
                messages: data.messages
            }
            _this.isVisible = "show";
            if (typeof callback === "function")
                _this.btnRight.action = callback;
        };
        /**
         * display a warning message
         * @param message to display
         * @param callback : callback to execute on click on the button right
         */
        this.warning = function (message, callback) {
            _this.message = message;
            _this.isVisible = "show";
            _this.icon = icons.warning;
            if (typeof callback === "function")
                _this.btnRight.action = callback;
        };
        /**
         * display an informative message
         * @param message to display
         * @param callback : callback to execute on click on the button right
         */
        this.inform = function (message, callback) {
            _this.message = message;
            _this.isVisible = "show";
            _this.icon = icons.inform;
            if (typeof callback === "function")
                _this.btnRight.action = callback;
        };
        /**
         * display a confirmation modal
         * @param message to display
         * @param callback : callback to execute on click on the button right
         */
        this.confirm = function (message, callback) {
            _this.message = message;
            _this.isVisible = "show";
            _this.icon = icons.confirm;
            if (typeof callback === "function")
                _this.btnRight.action = callback;
        };

        /**
         * bind to events that other modules can emit or broadcast
         */
        var bindEvents = function () {

            $scope.$on("error", function (event, message) {
                _this.error(message);
            })

            $scope.$on("errors", function (event, message) {
                _this.errors(message);
            })

            $scope.$on("warning", function (event, message) {
                _this.warning(message);
            })

            $scope.$on("inform", function (event, message) {
                _this.inform(message);
            })

            $scope.$on("confirm", function (event, message) {
                _this.confirm(message);
            })
        }

        // bind events
        bindEvents();
    });