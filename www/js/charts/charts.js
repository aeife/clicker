angular.module('clicker.charts', ['chart.js', 'components.clickData'])
    .controller('ChartsCtrl', function ($scope, clickData) {


        // for each click
        // calculate diff to 1 click
        // if diff lower than x: add to first data point
        // if diff greater than x: start new data point, current click is reference to calculate future diffs


        var calculateChart = function () {
            var data = [];
            var referenceTime = clickData.getClicks()[0].time;
            var interval = 1000;
            var startTime = clickData.getClicks()[0].time;
            var endTime = clickData.getClicks()[clickData.getClicks().length - 1].time;
            var totalTime = endTime - startTime;
            var points = Math.ceil(totalTime/interval);
            console.log(points);

            var clicks = clickData.getClicks().slice(0);
            for (var i = 0, len = points; i < len; i++) {
                var currentStartTime = startTime + (i * interval);
                var currentEndTime = currentStartTime + interval;
                var currentCount = 0;
                var lastIndex;

                _.forEach(clicks, function (click, index) {
                    if (click.time < currentEndTime) {
                        currentCount++;
                    } else {
                        lastIndex = index;
                        return false;
                    }
                });

                data.push(currentCount);

                clicks.splice(0, lastIndex);
            }


            return data;
        };

        $scope.ChartsCtrl = {
            chart: {
                labels: [],
                series: [],
                data: []
            },
            generateChart: function () {
                $scope.ChartsCtrl.chart.data[0] = calculateChart();
                $scope.ChartsCtrl.chart.data[0].forEach(function (dataPoint, index) {
                    $scope.ChartsCtrl.chart.labels.push('point ' + index);
                });

                console.log($scope.ChartsCtrl.chart);
            }
        };

        $scope.ChartsCtrl.generateChart();
    });