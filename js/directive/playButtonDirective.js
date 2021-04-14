/**
 * Created by Oliver Urones on 16/10/18.
 */
angular.module('iberostar-webinar-app')
    .directive('playButtonDirective', ['GenericMusicFactory', function (GenericMusicFactory) {
        return {
            restrict: 'A',
            link: {
                post: function ($scope, element, attrs) {
                    element.bind('click', function () {
                        videoElement = $('video').get(0);
                        var promisePlay = videoElement.play();
                        if(promisePlay !== undefined) {
                            promisePlay
                                .then(function () {
                                    //Autoplay started!
                                    $scope.showPlayButton = false;
                                    if($scope.isIE) {
                                        var audioElement = $('audio').get(0);
                                        audioElement.play();
                                    }
                                    $scope.$apply();
                                    //GenericMusicFactory.createAudioContext($scope);
                                    //$scope.source.start();

                                })
                                .catch(function (error) {
                                    $scope.showPlayButton = !$scope.showPlayButton;
                                    var playButton = $(".playButton").get(0);
                                    //$(playButton).css("zIndex", $(playButton).css("zIndex"));
                                    $scope.$apply();
                                })
                        } else {
                            $scope.showPlayButton = false;
                            if($scope.isIE) {
                                var audioElement = $('audio').get(0);
                                audioElement.play();
                            }
                            $scope.$apply();
                        }
                    });
                }
            }
        }
    }]);
