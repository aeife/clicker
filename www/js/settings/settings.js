angular.module('clicker.settings', ['clicker.settings.theme', 'clicker.settings.gestures', 'components.settingsData'])
    .controller('SettingsCtrl', function ($scope, settingsData) {
        $scope.SettingsCtrl = {
            getActiveTheme: function () {
               return settingsData.activeTheme.name;
            }
        };
    });