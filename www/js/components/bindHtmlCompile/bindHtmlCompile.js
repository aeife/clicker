angular.module('components.bindHtmlCompile', [])
    .directive('bindHtmlCompile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (val) {
                    el.html(val);
                    $compile(el.contents())(scope);
                });
            }
        };
    });