angular.module('clicker.counter', ['components.stopParentClick', 'components.clickData'])
    .controller('CounterCtrl', function ($scope, clickData) {
        $scope.CounterCtrl = {
            getCount: function () {
                return clickData.getClicks().length;
            },
            increaseCounter: clickData.addClick,
            decreaseCounter: clickData.removeLastClick,
            getClickData: function () {
                return clickData.getClicks();
            },
            hold: function () {
                _.times(5, $scope.CounterCtrl.increaseCounter);
            }
        };

    });