angular.module('clicker.counter', ['components.stopParentClick', 'components.clickData', 'components.settingsData'])
    .controller('CounterCtrl', function ($scope, clickData, settingsData, $timeout) {
        var playSound = function () {
            if (settingsData.sound) {
                new Audio("audio/beep.wav").play();
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