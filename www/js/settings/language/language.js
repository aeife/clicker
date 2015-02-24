angular.module('clicker.settings.language', [])
    .controller('LanguageCtrl', function ($scope, settingsData) {
        $scope.LanguageCtrl = {
            languages: settingsData.languages,
            getActiveLanguage: function () {
                return settingsData.activeLanguage;
            },
            setActiveLanguage: function (language) {
                settingsData.change.language(language);
            }
        };
    });