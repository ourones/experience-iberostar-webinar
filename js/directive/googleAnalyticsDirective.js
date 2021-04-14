/**
 * Created by Oliver Urones on 16/03_21
 */
angular.module('iberostar-webinar-app')
    .directive('googleAnalyticsDirective', ['$document', function ($document) {
        //Directiva para gestionar los eventos de google analytics
        return {
            restict: 'A',
            link: {
                post: function ($scope, element, attrs) {
                    angular.element($document).ready(function () {
                        //Google Analytics cuando se carga la página
                        gtag('event', 'intro_experience', {
                            'event_category': 'entroenlaexperiencia',
                            'event_label': $scope.experienceId
                        });

                        var videoElement = $('video').get(0);
                        var buttonPlay = $('.playButton').get(0);
                        var playFlag = true;
                        var oneThirdFlag = true;
                        var twoThirdFlag = true;
                        var fullVideoFlag = true;

                        var word2fly = $('#word2fly').get(0);
                        var newblue = $('#newblue').get(0);
                        var icarion = $('#icarion').get(0);
                        var w2mpro = $('#w2mpro').get(0);

                        var word2flyFlag = true;
                        var newblueFlag = true;
                        var icarionFlag = true;
                        var w2mproFlag = true;

                        $(buttonPlay).on('click', function () {
                            if(playFlag) {
                                //Google Analytics cuando se da click para reproducir el vídeo
                                gtag('event', 'play', {
                                    'event_category': 'vervideo',
                                    'event_label': $scope.experienceId
                                });
                                playFlag = false;
                                //console.log("GoogleAnalytics -- Se ha dado al play del vídeo");
                            }
                        });

                        $(videoElement).on('timeupdate', function () {
                            if( (videoElement.currentTime >= (videoElement.duration / 3)) && oneThirdFlag ) {
                                //Goole Analytics para el primer tercio del video
                                gtag('event', 'primertercio', {
                                    'event_category': 'primertercio',
                                    'event_label': $scope.experienceId
                                });
                                oneThirdFlag = false;
                                //console.log("GoogleAnalytics -- Se ha visto el primer tercio del vídeo");

                                if(playFlag) {
                                    //Google Analytics cuando se da click para reproducir el vídeo
                                    gtag('event', 'play', {
                                        'event_category': 'vervideo',
                                        'event_label': $scope.experienceId
                                    });
                                    playFlag = false;
                                    //console.log("GoogleAnalytics -- Autoplay del vídeo");
                                }
                            }

                            if( (videoElement.currentTime >= (videoElement.duration / 3) * 2) && twoThirdFlag ) {
                                //Google Analytics para el segundo tercio del vídeo
                                gtag('event', 'dostercios', {
                                    'event_category': 'dostercios',
                                    'event_label': $scope.experienceId
                                });
                                twoThirdFlag = false
                                //console.log("GoogleAnalytics -- Se ha visto el segundo tercio")
                            }

                            if( videoElement.currentTime  >= (videoElement.duration-5) && fullVideoFlag) {
                                //Google Analytics para el final del vídeo
                                gtag('event', 'vistofinal', {
                                    'event_category': 'final',
                                    'event_label': $scope.experienceId
                                });
                                fullVideoFlag = false;
                                //console.log("GoogleAnalhytics -- Se ha visto el final del vídeo.");
                            }
                        })

                        $(word2fly).on('click', function () {
                            if(word2flyFlag) {
                                //Google Analytics para cuando se hace click en los iconos
                                gtag('event', 'logo_word2fly', {
                                    'event_category': 'logo',
                                    'event_label': $scope.experienceId
                                });
                                word2flyFlag = false;
                            }
                        });

                        $(newblue).on('click', function () {
                            if(newblueFlag) {
                                //Google Analytics para cuando se hace click en los iconos
                                gtag('event', 'logo_newblue', {
                                    'event_category': 'logo',
                                    'event_label': $scope.experienceId
                                });
                                newblueFlag = false;
                            }
                        });

                        $(icarion).on('click', function () {
                            if(icarionFlag) {
                                //Google Analytics para cuando se hace click en los iconos
                                gtag('event', 'logo_icarion', {
                                    'event_category': 'logo',
                                    'event_label': $scope.experienceId
                                });
                                icarionFlag = false;
                            }
                        });

                        $(w2mpro).on('click', function () {
                            if(w2mproFlag) {
                                //Google Analytics para cuando se hace click en los iconos
                                gtag('event', 'logo_w2mpro', {
                                    'event_category': 'logo',
                                    'event_label': $scope.experienceId
                                });
                                w2mproFlag = false;
                            }
                        });
                    })
                }
            }
        }
    }]);