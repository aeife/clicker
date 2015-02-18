angular.module('clicker.counter', ['components.stopParentClick', 'components.clickData', 'components.settingsData'])
    .controller('CounterCtrl', function ($scope, clickData, settingsData, $timeout, $ionicModal) {
        // initialize sound several times so it can be played fast in sequence
        // pre initialization for performance reasons
        var sounds = [];
        _.times(10, function () {
            sounds.push(new Audio("audio/beep.wav"));
        });
        var soundCounter = 0;

        var playSound = function () {
            if (settingsData.sound) {
                sounds[soundCounter].play();
                soundCounter++;
                if (soundCounter > 9) {
                    soundCounter = 0;
                }
            }
        };

        $scope.CounterCtrl = {
            getCount: function () {
                return clickData.getClicks().length;
            },
            increaseCounter: function () {
                clickData.addClick();
                playSound();
            },
            decreaseCounter: clickData.removeLastClick,
            getClickData: function () {
                return clickData.getClicks();
            },
            handleGesture: function (p) {
                if (settingsData.gestures[p.type]) {
                    $timeout(function () {
                        settingsData.gestures[p.type].action.fn();
                    }, 0);
                    playSound();
                }
            },
            getAnimation: function () {
                return settingsData.animation;
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