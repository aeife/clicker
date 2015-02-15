angular.module('components.clickData', [])
    .service('clickData', function () {
        var _clicks = JSON.parse(window.localStorage['clicks'] || 'false') || [];

        var _save = function () {
            window.localStorage['clicks'] = JSON.stringify(_clicks);
        };

        var clickData = {
            getClicks: function () {
                return _clicks;
            },
            addClick: function () {
                _clicks.push({time: new Date().getTime()})
                _save();
            },
            addNClicks: function (n) {
                _.times(n, clickData.addClick);
                _save();
            },
            removeLastClick: function () {
                _clicks.pop();
                _save();
            },
            reset: function () {
                _clicks = [];
            }
        };

        return clickData;
    });