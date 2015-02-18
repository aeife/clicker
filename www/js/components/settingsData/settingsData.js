angular.module('components.settingsData', ['components.clickData'])
    .service('settingsData', function (clickData, $ionicPlatform) {
        var setWakeLock = function (wakeLock) {
            $ionicPlatform.ready(function () {
                if (window.cordova && wakeLock) {
                    window.plugins.insomnia.keepAwake();
                } else if (window.cordova && !wakeLock) {
                    window.plugins.insomnia.allowSleepAgain();
                }
            });
        };

        var settingsData = {
            themes: [
                {name: 'light'},
                {name: 'dark'}
            ],
            activeTheme: null,
            sound: false,
            animation: false,
            skipIntroduction: false,
            keepAwake: true,
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
                },
                skipIntroduction: function (skipIntroduction) {
                    settingsData.skipIntroduction = skipIntroduction;
                    window.localStorage['settings.skipIntroduction'] = skipIntroduction;
                },
                keepAwake: function (keepAwake) {
                    settingsData.keepAwake = keepAwake;
                    window.localStorage['settings.keepAwake'] = keepAwake;
                    setWakeLock(keepAwake);
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
        settingsData.skipIntroduction = JSON.parse(window.localStorage['settings.skipIntroduction'] || 'false') || false;
        if (window.localStorage['settings.keepAwake'] === 'false') {
            settingsData.keepAwake = false;
        } else {
            setWakeLock(true);
        }

        return settingsData;
    });