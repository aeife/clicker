angular.module('components.clickData', [])
    .service('clickData', function () {
        var _clicks = [];

        var clickData = {
            getClicks: function () {
                return _clicks;
            },
            addClick: function () {
                _clicks.push({time: new Date().getTime()})
            },
            addNClicks: function (n) {
                _.times(n, clickData.addClick);
            },
            removeLastClick: function () {

            }
        };

        return clickData;
    });