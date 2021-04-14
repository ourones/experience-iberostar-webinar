/**
 * Created by Oliver Urones on 16/10/18.
 */
angular.module('iberostar-webinar-app')
    .directive('orientationChangeDirective', ['$window', function ($window) {
        //Directiva para controlar el giro del dispositivo.
        return {
            restrict: 'A',
            link: {
                post: function ($scope, element, attrs) {
                    angular.element($window).bind('orientationchange', function () {
                        var videoElement = $('video').get(0);
                        //if(!$scope.isLandscape()) {
                        //    $scope.blockContent = true;
                        //    $scope.audioCtx.suspend();
                        //    $('video').get(0).pause();
                        //} else {
                            $scope.blockContent = false;
                            if(!videoElement.ended && !$scope.showForm) {
                                var promisePlay = $('video').get(0).play();
                                if(promisePlay !== undefined) {
                                    promisePlay
                                        .then(function () {
                                            $scope.showPlayButton = false;
                                            $scope.audioCtx.resume();
                                            $scope.$apply();
                                        })
                                        .catch(function (error) {
                                            $scope.showPlayButton = true;
                                            $scope.audioCtx.suspend();
                                            $scope.$apply();
                                            var playButton = $(".playButton").get(0);
                                            //$(playButton).css("zIndex", $(playButton).css("zIndex"));
                                        })
                                } else {
                                    $scope.showPlayButton = false;
                                    $scope.$apply();
                                }
                            }
                        //}
                        $scope.$apply();
                    })
                }
            }
        }
    }]);
