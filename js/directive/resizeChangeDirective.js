/**
 * Created by Oliver Urones on 15/10/18.
 */
angular.module('iberostar-webinar-app')
    .directive('resizeChangeDirective', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: {
                post: function ($scope, element, attrs) {
                    angular.element($window).bind('resize load', function () {
                        var aspectRatio = 16 / 9;
                        var w = $('.app').width();
                        var h = $('.app').height();
                        var appContentWrapper = $('.app-content-wrapper').get(0);
                        if((w / h) > aspectRatio) {
                            $(appContentWrapper).height(h.toString() + 'px');
                            $(appContentWrapper).width((h * aspectRatio).toString() + 'px');
                            $(appContentWrapper).css("font-size", (h * aspectRatio * 10 / 1920).toString() + 'px');
                            $('.legal-text').css('font-size', (h * aspectRatio * 35 / 1920).toString() + 'px');
                        } else {
                            $(appContentWrapper).height((w / aspectRatio).toString() + 'px');
                            $(appContentWrapper).width(w.toString() + 'px');
                            $(appContentWrapper).css("font-size", (10 * w / 1920).toString() + 'px');
                            $('.legal-text').css('font-size', (25 * w / 1920).toString() + 'px');
                        }
                        $scope.$apply();
                    })
                }
            }
        }
    }]);
