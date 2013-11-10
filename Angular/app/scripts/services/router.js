/**
 * Created by Bensaad on 08/11/13.
 */

angular.module('router', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/page/:pagId', {

        });

        $routeProvider.when('/page/:pageId', {

        });

        $routeProvider.otherWise('/Book/:bookId', {

        });

    });