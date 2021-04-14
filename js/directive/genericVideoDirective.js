/**
 * Created by Oliver Urones on 16/10/18.
 */
angular.module('iberostar-webinar-app')
    .directive('genericVideoDirective', ['$document', '$window', '$sce', '$interval', 'GenericVideoFactory', 'GenericMusicFactory', function ($document, $window, $sce, $interval, GenericVideoFactory, GenericMusicFactory) {
        //Directiva para el control de eventos del vídeo
        return {
            restrict: 'A',
            link: {
                post: function ($scope, element, attrs) {

                    var videoElement = $('video').get(0);

                    var endFlag = true;

                    var nameAnimation = new TimelineMax({pause: true});
                    var textAnimation = new TimelineMax({pause: true});

                    var name = $('#name').get(0);
                    var text = $('#text').get(0);

                    /**
                     * Llamada la las funciones comunes de la factory
                     */
                    GenericVideoFactory.loadedEventHandler($scope, element, attrs);

                    GenericVideoFactory.clickEventHandler($scope, element, attrs);

                    GenericVideoFactory.contextmenuEventHandler($scope, element, attrs);

                    /**
                     * Evento de reproducción del vídeo específico por cada expereiencia
                     */
                    element.on('timeupdate', function () {
                        if( (videoElement.currentTime >= videoElement.duration - 4.88) && endFlag) {
                            endFlag = false;
                            $scope.showEnd = true;
                            nameAnimation.fromTo(name, 1, {opacity: 0}, {opacity: 1});
                            nameAnimation.eventCallback('onComplete', function () {
                                textAnimation.fromTo(text, 1, {opacity: 0}, {opacity: 1});
                            });
                            $scope.$apply();
                        }
                    });

                    element.on('ended', function () {
                        if($scope.isIE) {
                            var audioElement = $('audio').get(0)
                            audioElement.pause();
                        } else {
                            //Parar música según el valor de actualResourceNumber
                            $scope.source.stop();
                        }
                    })
                }
            }
        }
    }]);
