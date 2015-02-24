angular.module('clicker.settings', [
    'clicker.settings.theme',
    'clicker.settings.language',
    'clicker.settings.gestures',
    'components.settingsData',
    'components.clickData',
    'ngCordova'
])
    .controller('SettingsCtrl', function ($scope, settingsData, $cordovaDialogs, $ionicPlatform, clickData) {
        $scope.SettingsCtrl = {
            resetClickData: function() {
                $ionicPlatform.ready(function() {
                    var confirm = $cordovaDialogs.confirm('Warning! This will reset your counter and all statistics.',
                        'Reset Counter', ['OK', 'Cancel']).then(function (result) {
                            if (result === 1) {
                                clickData.reset();
                            }
                        });
                });
            },
            resetSettings: function() {
                $ionicPlatform.ready(function() {
                    var confirm = $cordovaDialogs.confirm('Warning! This will restore the default settings.',
                        'Reset Settings', ['OK', 'Cancel']).then(function (result) {
                            if (result === 1) {
                                settingsData.reset();
                            }
                        });
                });
            },
            settingsData: settingsData
        };
    });