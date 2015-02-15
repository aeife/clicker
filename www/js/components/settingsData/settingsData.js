angular.module('components.settingsData', [])
    .service('settingsData', function () {
        var settingsData = {
            themes: [
                {name: 'light'},
                {name: 'dark'}
            ],
            activeTheme: null,
            gestureActions: {
                none: {
                    id: 0,
                    name: 'None'
                },
                addFiveClicks: {
                    id: 1,
                    name: 'Add Five Clicks'
                }
            },
            gestures: {
                hold: {
                    name: 'Hold',
                    action: null
                },
                swipeLeft: {
                    name: 'Swipe Left',
                    action: null
                }
            }
        };

        settingsData.activeTheme = settingsData.themes[0];
        settingsData.gestures.hold.action = settingsData.gestureActions.addFiveClicks;
        settingsData.gestures.swipeLeft.action = settingsData.gestureActions.none;

        return settingsData;
    });