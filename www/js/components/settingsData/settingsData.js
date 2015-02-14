angular.module('components.settingsData', [])
    .service('settingsData', function () {
        var settingsData = {
            themes: [
                {name: 'light'},
                {name: 'dark'}
            ],
            activeTheme: null
        };

        settingsData.activeTheme = settingsData.themes[0];

        return settingsData;
    });