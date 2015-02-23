angular.module('clicker.counter', ['components.stopParentClick', 'components.clickData', 'components.settingsData'])
    .controller('CounterCtrl', function ($scope, clickData, settingsData, $timeout, $ionicModal, $ionicPlatform) {
        var sound;

        var instantiateSound = function () {
            $ionicPlatform.ready(function () {
                sound = new Media('audio/beep.wav');
            });
        };

        var playSound = function () {
            if (settingsData.sound) {
                if (!sound) {
                    instantiateSound();
                }
                sound.play();
            }
        };

        $scope.CounterCtrl = {
            getCount: function () {
                return clickData.getClicks().length;
            },
            increaseCounter: function () {
                if (!settingsData.locked) {
                    clickData.addClick();
                    playSound();
                }
            },
            decreaseCounter: clickData.removeLastClick,
            getClickData: function () {
                return clickData.getClicks();
            },
            handleGesture: function (p) {

                if (settingsData.gestures[p.type]) {
                    // is not locked or lock gesture and is not none
                    if ((!settingsData.locked || settingsData.gestures[p.type].action === settingsData.gestureActions.lock) && settingsData.gestures[p.type].action.fn) {
                        $timeout(function () {
                            settingsData.gestures[p.type].action.fn();
                        }, 0);
                        playSound();
                    }
                }
            },
            getAnimation: function () {
                return settingsData.animation;
            },
            getLockStatus: function () {
                return settingsData.locked;
            }
        };

        if (!settingsData.skipIntroduction) {
            $ionicModal.fromTemplateUrl('js/introduction/introduction.tpl.html', {}).then(function(modal) {
                modal.show();
                // only show introduction at the first start
                settingsData.change.skipIntroduction(true);
            });
        }
    })
    .directive('detectGestures', function($ionicGesture, settingsData) {
        return {
            restrict :  'A',
            scope: {
                detectGestures: '='
            },
            link : function(scope, elem, attrs) {
                for (var gesture in settingsData.gestures) {
                    $ionicGesture.on(gesture, scope.detectGestures, elem);
                }
            }
        }
    });