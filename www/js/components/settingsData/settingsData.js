angular.module('components.settingsData', ['components.clickData'])
    .service('settingsData', function (clickData) {
        var settingsData = {
            themes: [
                {name: 'light'},
                {name: 'dark'}
            ],
            activeTheme: null,
            gestureActions: {
                none: {
                    id: 0,
                    name: 'None',
                    fn: function () {}
                },
                addFiveClicks: {
                    id: 1,
                    name: 'Add Five Clicks',
                    fn: function () {
                        clickData.addNClicks(5);
                    }
                },
                removeLastClick: {
                    id: 2,
                    name: 'Remove Last Click',
                    fn: clickData.removeLastClick
                }
            },
            gestures: {
                hold: {
                    name: 'Hold',
                    action: null
                },
                swipeleft: {
                    name: 'Swipe Left',
                    action: null
                }
            },
            change: {
                theme: function (theme) {
                    settingsData.activeTheme = theme;
                    window.localStorage['settings.activeTheme'] = JSON.stringify(theme);
                },
                gestureAction: function (gesture, action) {
                    settingsData.gestures[gesture].action = action;
                    window.localStorage['settings.gestures.' + gesture] = JSON.stringify(settingsData.gestures[gesture].action);
                }
            }
        };

        // defaults
        settingsData.activeTheme = JSON.parse(window.localStorage['settings.activeTheme'] || 'false')
            || settingsData.themes[0];
        settingsData.gestures.hold.action = JSON.parse(window.localStorage['settings.gestures.hold'] || 'false')
            ||  settingsData.gestureActions.addFiveClicks;
        settingsData.gestures.swipeleft.action = JSON.parse(window.localStorage['settings.gestures.swipeleft'] || 'false')
            ||  settingsData.gestureActions.none;

        return settingsData;
    });