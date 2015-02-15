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
                },
                gestureAction: function (gesture, action) {
                    settingsData.gestures[gesture].action = action;
                }
            }
        };

        // defaults
        settingsData.activeTheme = settingsData.themes[0];
        settingsData.gestures.hold.action = settingsData.gestureActions.addFiveClicks;
        settingsData.gestures.swipeleft.action = settingsData.gestureActions.none;
        settingsData.gestures.swipeleft.action = settingsData.gestureActions.removeLastClick;

        return settingsData;
    });