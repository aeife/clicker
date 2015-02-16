// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('clicker', ['ionic',
    'clicker.sidebar',
    'clicker.counter',
    'clicker.settings',
    'clicker.statistics',
    'clicker.export',
    'clicker.about',
    'components.settingsData'
])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "js/sidebar/sidebar.tpl.html",
                controller: 'SidebarCtrl'
            })
            .state('app.counter', {
                url: "/counter",
                views: {
                    'sidebarContent': {
                        templateUrl: "js/counter/counter.tpl.html",
                        controller: 'CounterCtrl'
                    }
                }
            })

            .state('app.settings', {
                url: "/settings",
                views: {
                    'sidebarContent': {
                        templateUrl: "js/settings/settings.tpl.html",
                        controller: 'SettingsCtrl'
                    }
                }
            })
            .state('app.themes', {
                url: "/settings/themes",
                views: {
                    'sidebarContent': {
                        templateUrl: "js/settings/theme/theme.tpl.html",
                        controller: 'ThemeCtrl'
                    }
                }
            })
            .state('app.gestures', {
                url: "/settings/gestures",
                views: {
                    'sidebarContent': {
                        templateUrl: "js/settings/gestures/gestures.tpl.html",
                        controller: 'GesturesCtrl'
                    }
                }
            })

            .state('app.gestureActions', {
                url: "/settings/gestures/:action",
                views: {
                    'sidebarContent': {
                        templateUrl: "js/settings/gestures/actions/actions.tpl.html",
                        controller: 'ActionsCtrl'
                    }
                }
            })
            .state('app.statistics', {
                url: "/statistics",
                views: {
                    'sidebarContent': {
                        templateUrl: "js/statistics/statistics.tpl.html",
                        controller: 'StatisticsCtrl'
                    }
                }
            })
            .state('app.export', {
                url: "/export",
                views: {
                    'sidebarContent': {
                        templateUrl: "js/export/export.tpl.html",
                        controller: 'ExportCtrl'
                    }
                }
            })
            .state('app.about', {
                url: "/about",
                views: {
                    'sidebarContent': {
                        templateUrl: "js/about/about.tpl.html",
                        controller: 'AboutCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/counter');
    })
    .controller('StyleCtrl', function ($scope, settingsData) {
        $scope.StyleCtrl = {
            getActiveTheme: function () {
                return settingsData.activeTheme;
            }
        }
    });
