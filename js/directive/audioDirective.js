/**
 * Created by Oliver Urones on 29/11/18.
 */
angular.module('iberostar-webinar-app')
    .directive('audioDirective', [function () {
        return {
            restrict: 'A',
            link: {
                post: function ($scope, element, attrs) {
                    if($scope.isIE) {
                        element.prop('autoplay', true);
                    }
                }
            }
        }
    }]);
