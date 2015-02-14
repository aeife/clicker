angular.module('clicker.settings', ['clicker.settings.theme', 'components.settingsData'])
    .controller('SettingsCtrl', function ($scope, settingsData) {
        $scope.SettingsCtrl = {
            getActiveTheme: function () {
               return settingsData.activeTheme.name;
            }
        };
    });