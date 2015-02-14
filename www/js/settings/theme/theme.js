angular.module('clicker.settings.theme', [])
    .controller('ThemeCtrl', function ($scope, settingsData) {
        $scope.ThemeCtrl = {
            themes: settingsData.themes,
            setActiveTheme: function (theme) {
                settingsData.activeTheme = theme;
            }
        };
    });