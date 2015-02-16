angular.module('components.settingsData', ['components.clickData'])
    .service('settingsData', function (clickData) {
        var settingsData = {
            themes: [
                {name: 'light'},
                {name: 'dark'}
            ],
            activeTheme: null,
            sound: false,
            animation: false,
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
                    for (var gestureAction in settingsData.gestureActions) {
                        if (settingsData.gestureActions[gestureAction].id === action.id) {
                            window.localStorage['settings.gestures.' + gesture] = gestureAction;
                            return;
                        }
                    }

                },
                sound: function (sound) {
                    settingsData.sound = sound;
                    window.localStorage['settings.sound'] = sound;
                },
                animation: function (animation) {
                    settingsData.animation = animation;
                    window.localStorage['settings.animation'] = animation;
                }
            },
            reset: function () {
                settingsData.change.theme(settingsData.themes[0]);
                settingsData.change.gestureAction('hold', settingsData.gestureActions.addFiveClicks);
                settingsData.change.gestureAction('swipeleft', settingsData.gestureActions.none);
                settingsData.change.sound(false);
            }
        };

        // defaults
        settingsData.activeTheme = JSON.parse(window.localStorage['settings.activeTheme'] || 'false')
            || settingsData.themes[0];
        settingsData.gestures.hold.action = settingsData.gestureActions[window.localStorage['settings.gestures.hold']]
            ||  settingsData.gestureActions.addFiveClicks;
        settingsData.gestures.swipeleft.action = settingsData.gestureActions[window.localStorage['settings.gestures.swipeleft']]
            ||  settingsData.gestureActions.none;
        settingsData.sound = JSON.parse(window.localStorage['settings.sound'] || 'false') || false;
        settingsData.animation = JSON.parse(window.localStorage['settings.animation'] || 'false') || false;

        return settingsData;
    });