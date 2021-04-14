/**
 * Created by Oliver Urones on 25/10/18.
 */
angular.module('iberostar-webinar-app')
    .factory('GenericVideoFactory', ['GenericMusicFactory', function (GenericMusicFactory) {
        return {
            loadedEventHandler: loadedEventHandler,
            clickEventHandler: clickEventHandler,
            contextmenuEventHandler: contextmenuEventHandler,
            incrementResourceNumber: incrementResourceNumber,
            decrementResourceNumber: decrementResourceNumber,
            showSpinner: showSpinner,
            hideSpinner: hideSpinner
        };

        function loadedEventHandler($scope, element, attrs) {
            element.on('loadstart', function () {
                //if(!/^Safari/.test($scope.getBrowser())) {
                hideSpinner($scope);
                if($scope.isLandscape()) {
                        var promisePlay = $(this).get(0).play();
                        if(promisePlay !== undefined) {
                            promisePlay
                                .then(function () {
                                    //Autoplay started!
                                    $scope.showPlayButton = false;
                                    //$scope.source.start();
                                    $scope.audioCtx.resume();
                                    $scope.$apply();
                                })
                                .catch(function (error) {
                                    $scope.showPlayButton = true;
                                    //$scope.source.start();
                                    $scope.audioCtx.suspend();
                                    var playButton = $(".playButton").get(0);
                                    //$(playButton).css("zIndex", $(playButton).css("zIndex"));
                                    $scope.$apply();
                                })
                        } else {
                            $scope.showPlayButton = false;
                            $scope.$apply();
                        }
                        $scope.$apply();
                    }
                //} else {
                //    if(!$scope.showPlayButton) {
                //        var playButton = $(".playButton").get(0);
                //        $scope.showPlayButton = true;
                        //$(playButton).css("zIndex", $(playButton).css("zIndex"));
                //        $scope.$apply();
                //    }
                //}
            });
        }

        function clickEventHandler($scope, element, attrs) {
            element.on('click', function () {
                if(!$(this).get(0).ended) {
                    if(!$scope.showPlayButton) {
                        $(this).get(0).pause();
                        $scope.showPlayButton = true;
                        if($scope.isIE) {
                            var audioElement = $('audio').get(0);
                            audioElement.pause();
                        }
                        //var playButton = $(".playButton").get(0);
                        //$(playButton).css("zIndex", $(playButton).css("zIndex"));
                    }
                }
                $scope.$apply();
            });
        }

        function incrementResourceNumber($scope) {
            $scope.actualResourceNumber++;
        }

        function decrementResourceNumber($scope) {
            $scope.actualResourceNumber--;
        }

        function contextmenuEventHandler($scope, element, attrs) {
            element.on('contextmenu', function (event) {
                event.preventDefault();
            });
        }

        function showSpinner($scope) {
            $scope.showSpinner = true;
        }

        function hideSpinner($scope) {
            $scope.showSpinner = false;
        }
    }]);
