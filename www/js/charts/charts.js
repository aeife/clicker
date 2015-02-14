angular.module('clicker.charts', ['chart.js', 'components.clickData'])
    .controller('ChartsCtrl', function ($scope, clickData) {
        var calculateChart = function (options) {
            if (!clickData.getClicks() || clickData.getClicks().length === 0) {
                console.log("return");
                return;
            }

            var data = [];
            var startTime = _.first(clickData.getClicks()).time;
            var endTime = _.last(clickData.getClicks()).time;
            var totalTime = endTime - startTime;
            var interval = totalTime / 20; // 20 datapoints by default

            if (options && options.dataPoints) {
                interval = totalTime / options.dataPoints;
            } else if (options && options.interval) {
                interval = options.interval;
            }

            var points = Math.ceil(totalTime/interval);
            var currentCount = 0;

            // copy of clickData, elements will be removed once processed
            var clicks = clickData.getClicks().slice(0);
            for (var i = 0, len = points; i < len; i++) {
                var currentStartTime = startTime + (i * interval);
                var currentEndTime = currentStartTime + interval;
                if (!options || !options.sum) {
                    currentCount = 0;
                }

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
            statistics: {
                perSecond: 0,
                perMinute: 0,
                perHour: 0
            },
            generateCharts: function (options) {
                $scope.ChartsCtrl.chart.data[0] = calculateChart(options);
                if ($scope.ChartsCtrl.chart.data[0] && $scope.ChartsCtrl.chart.data[0].length > 0) {
                    $scope.ChartsCtrl.chart.labels = [];
                    $scope.ChartsCtrl.chart.data[0].forEach(function (dataPoint, index) {
                        $scope.ChartsCtrl.chart.labels.push('');
                    });
                }
            },
            generateStatistics: function () {
                if (clickData.getClicks() && clickData.getClicks().length > 0) {
                    var totalTime = _.last(clickData.getClicks()).time - _.first(clickData.getClicks()).time;

                    $scope.ChartsCtrl.statistics.perSecond = clickData.getClicks().length / Math.abs(totalTime/1000);
                    $scope.ChartsCtrl.statistics.perMinute = clickData.getClicks().length / Math.abs(totalTime/1000 * 60);
                    $scope.ChartsCtrl.statistics.perHour = clickData.getClicks().length / Math.abs(totalTime/1000 * 60 * 60);
                }
            }
        };

        $scope.$on('$stateChangeSuccess',function(event, toState){
            if (toState.name === 'app.charts') {
                $scope.ChartsCtrl.generateCharts({sum: true, dataPoints: 20});
                $scope.ChartsCtrl.generateStatistics();
            }
        });
    });