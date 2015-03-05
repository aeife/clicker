angular.module('components.clicksta', ['components.bindHtmlCompile'])
    .directive('clicksta', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/components/clicksta/clicksta.tpl.html'
        }
    });