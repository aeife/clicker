angular.module('clicker.settings.theme', [])
    .controller('ThemeCtrl', function ($scope, settingsData) {
        $scope.ThemeCtrl = {
            themes: settingsData.themes,
            getActiveTheme: function () {
                return settingsData.activeTheme;
            },
            setActiveTheme: function (theme) {
                settingsData.change.theme(theme);
            }
        };
    });