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
                {name: 'light', class: 'theme-light'},
                {name: 'dark', class: 'theme-dark'},
                {name: 'grey', class: 'theme-grey'},
                {name: 'red', class: 'theme-red'},
                {name: 'blue', class: 'theme-blue'},
                {name: 'green', class: 'theme-green'},
                {name: 'mint', class: 'theme-mint'}
            ],
            activeTheme: null,
            sound: false,
            animation: false,
            skipIntroduction: false,
            keepAwake: true,
            locked: false,
            gestureActions: {
                none: {
                    id: 0,
                    name: 'None',
                    fn: null
                },
                addClick: {
                    id: 1,
                    name: 'Add A Click',
                    fn: clickData.addClick
                },
                addFiveClicks: {
                    id: 2,
                    name: 'Add Five Clicks',
                    fn: function () {
                        clickData.addNClicks(5);
                    }
                },
                addTenClicks: {
                    id: 3,
                    name: 'Add Ten Clicks',
                    fn: function () {
                        clickData.addNClicks(10);
                    }
                },
                removeLastClick: {
                    id: 4,
                    name: 'Remove Last Click',
                    fn: clickData.removeLastClick
                },
                removeLastFiveClicks: {
                    id: 5,
                    name: 'Remove Last Five Clicks',
                    fn: function () {
                        clickData.removeLastNClicks(5);
                    }
                },
                removeLastTenClicks: {
                    id: 6,
                    name: 'Remove Last Ten Clicks',
                    fn: function () {
                        clickData.removeLastNClicks(10);
                    }
                },
                reset: {
                    id: 7,
                    name: 'Quick Reset Counter',
                    fn: clickData.reset
                },
                lock: {
                    id: 8,
                    name: 'Lock Counter',
                    fn: function () {
                        settingsData.locked = !settingsData.locked;
                    }
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
                },
                swiperight: {
                    name: 'Swipe Right',
                    action: null
                },
                swipeup: {
                    name: 'Swipe Up',
                    action: null
                },
                swipedown: {
                    name: 'Swipe Down',
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
                settingsData.change.gestureAction('hold', settingsData.gestureActions.none);
                settingsData.change.gestureAction('swipeleft', settingsData.gestureActions.removeLastClick);
                settingsData.change.gestureAction('swiperight', settingsData.gestureActions.addClick);
                settingsData.change.gestureAction('swipeup', settingsData.gestureActions.addFiveClicks);
                settingsData.change.gestureAction('swipedown', settingsData.gestureActions.removeLastFiveClicks);
                settingsData.change.sound(false);
            }
        };

        // defaults
        settingsData.activeTheme = JSON.parse(window.localStorage['settings.activeTheme'] || 'false')
            || settingsData.themes[0];
        settingsData.gestures.hold.action = settingsData.gestureActions[window.localStorage['settings.gestures.hold']]
            ||  settingsData.gestureActions.none;
        settingsData.gestures.swipeleft.action = settingsData.gestureActions[window.localStorage['settings.gestures.swipeleft']]
            ||  settingsData.gestureActions.removeLastClick;
        settingsData.gestures.swiperight.action = settingsData.gestureActions[window.localStorage['settings.gestures.swiperight']]
        ||  settingsData.gestureActions.addClick;
        settingsData.gestures.swipeup.action = settingsData.gestureActions[window.localStorage['settings.gestures.swipeup']]
        ||  settingsData.gestureActions.addFiveClicks;
        settingsData.gestures.swipedown.action = settingsData.gestureActions[window.localStorage['settings.gestures.swipedown']]
        ||  settingsData.gestureActions.removeLastFiveClicks;
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