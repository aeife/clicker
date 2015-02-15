angular.module('clicker.statistics', ['chart.js', 'components.clickData'])
    .controller('StatisticsCtrl', function ($scope, clickData) {
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

        $scope.StatisticsCtrl = {
            charts: {
                sum: {
                    labels: [],
                    series: [],
                    data: []
                },
                rate: {
                    labels: [],
                    series: [],
                    data: []
                }
            },
            statistics: {
                perSecond: 0,
                perMinute: 0,
                perHour: 0
            },
            generateCharts: function (target, options) {
                target.data[0] = calculateChart(options);
                if (target.data[0] && target.data[0].length > 0) {
                    target.labels = [];
                    target.data[0].forEach(function (dataPoint, index) {
                        target.labels.push('');
                    });
                }
            },
            generateStatistics: function () {
                if (clickData.getClicks() && clickData.getClicks().length > 0) {
                    var totalTime = _.last(clickData.getClicks()).time - _.first(clickData.getClicks()).time;

                    $scope.StatisticsCtrl.statistics.perSecond = clickData.getClicks().length / Math.abs(totalTime/1000);
                    $scope.StatisticsCtrl.statistics.perMinute = clickData.getClicks().length / Math.abs(totalTime/1000 * 60);
                    $scope.StatisticsCtrl.statistics.perHour = clickData.getClicks().length / Math.abs(totalTime/1000 * 60 * 60);
                }
            }
        };

        $scope.$on('$stateChangeSuccess',function(event, toState){
            if (toState.name === 'app.statistics') {
                $scope.StatisticsCtrl.generateCharts($scope.StatisticsCtrl.charts.sum, {sum: true, dataPoints: 20});
                $scope.StatisticsCtrl.generateCharts($scope.StatisticsCtrl.charts.rate, {sum: false, dataPoints: 20});
                $scope.StatisticsCtrl.generateStatistics();
            }
        });
    });