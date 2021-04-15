/**
 * Created by Oliver Urones on 27/11/18.
 */
angular.module('iberostar-webinar-app')
    .controller('IberostarWebinarController',
        ['$scope', '$window', '$location', '$timeout', '$sce', 'ExperienceFactory', 'GenericMusicFactory', function ($scope, $window, $location, $timeout, $sce, ExperienceFactory, GenericMusicFactory) {
        //Variables comunes
        $scope.screenWidth = null;
        $scope.videoUrl = [];
        $scope.landscape = null;
        $scope.blockContent = null;
        $scope.showPlayButton = true;
        $scope.profileId = null;
        $scope.showSpinner = false;
        $scope.isIE = false;
        $scope.showLegal = true;
        $scope.actualResourceNumber = 0;
        $scope.showEnd = false;
        alert("Prueba")

        /**
         * Función inicializadora
         */
        $scope.init = function () {
            $scope.experienceId = $scope.getExperienceId();
            $scope._changeShowLegal();
            $scope._checkMobileOS();
            $scope._isIExplorer();
            if(!$scope.isIE) {
                GenericMusicFactory.loadAudio($scope)
                    .then(function (data) {
                        $scope.audioCtx.decodeAudioData(data, function (buffer) {
                        $scope.source.buffer = buffer;
                        $scope.source.connect($scope.audioCtx.destination);
                        $scope.source.loop = false;
                        $scope.source.start();
                        $scope.audioCtx.suspend();
                        //Hago las llamadas a los servicios que me devuelven los datos
                        ExperienceFactory.getExperience($scope.experienceId)
                            .then(function (data) {
                                //Se guardan en el scope las variables que vienen en data.store (si viene algo)
                                $scope.name = data.store.name;
                                $scope.orderedResources = _.orderBy(data.resources, ['label']);
                                angular.forEach($scope.orderedResources, function (resource, index) {
                                    ExperienceFactory.getPublicUrl(resource.id)
                                        .then(function (data) {
                                            $scope.videoUrl[index] = $sce.trustAsResourceUrl(data.public_url);
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        })
                                })
                                //GenericMusicFactory.createAudioContext($scope);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    })
                    .catch(function (error) {
                        console.log("Controller line 61");
                        console.log(error);
                    })
                });
            } else {
                //Hago las llamadas a los servicios que me devuelven los datos
                ExperienceFactory.getExperience($scope.experienceId)
                    .then(function (data) {
                        //Se guardan en el scope las variables que vienen en data.store (si viene algo)
                        $scope.name = data.store.name;
                        $scope.orderedResources = _.orderBy(data.resources, ['label']);
                        angular.forEach($scope.orderedResources, function (resource, index) {
                            ExperienceFactory.getPublicUrl(resource.id)
                                .then(function (data) {
                                    $scope.videoUrl[index] = $sce.trustAsResourceUrl(data.public_url);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                        })
                        //GenericMusicFactory.createAudioContext($scope);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }


            //Comprobar si es móvil
            $scope.landscape = $scope.isLandscape();
            if(!$scope.landscape) {
                $scope.blockContent = true;
            } else {
                $scope.blockContent = false;
            }
        };

        /**
         * Función que comprueba si está en modo landscape o en portrait
         * @returns {boolean} True si está en landscape False si está en portrait
         */
        $scope.isLandscape = function isLandscape() {
            try {
                var orientationType = $window.screen.orientation.type.split('-')[0];
                if(orientationType === 'landscape') {
                    return true;
                } else {
                    return false;
                }
            } catch(error) {
                //console.log("error on $scope.isLandscape");
                //console.log(error);
                //console.log($window.orientation);
                if($window.orientation != undefined && Math.abs($window.orientation) === 90) {
                    return true
                } else if($window.orientation != undefined && Math.abs($window.orientation) !== 90) {
                    return false;
                } else {
                    return $window.screen.height < $window.screen.width;
                }
            }

            //return $window.innerHeight < $window.innerWidth;
         };

        /**
         * Función que obtiene el ancho de la pantalla
         * @returns {Number} int Ancho de la pantalla
         */
         $scope.getScreenWidth = function () {
             return $window.screen.width;
         };

        /**
         * Función que obtiene el token de experiencia a través de la url
         * @returns {string} El id (token) de la experiencia
         */
         $scope.getExperienceId = function () {
             if($location.absUrl().indexOf('?') === -1) {
                return $location.absUrl().split('/')[$location.absUrl().split('/').length-1];
             } else {
                 return $location.absUrl().split('/')[$location.absUrl().split('/').length-1].split('?')[0];
             }
         };

        /**
         * Función que obtiene el token de experiencia a través de la url
         * @returns {string} El id (token) de la experiencia
         */
         $scope.getKey = function () {
             if($location.absUrl().indexOf('?') === -1) {
                return ($location.absUrl().split('/')[$location.absUrl().split('/').length-1] != "" ? $location.absUrl().split('/')[$location.absUrl().split('/').length-1] : undefined);
             } else {
                return ($location.absUrl().split('/')[$location.absUrl().split('/').length-1].split('?')[0] != "" ? $location.absUrl().split('/')[$location.absUrl().split('/').length-1].split('?')[0] : undefined);
             }
         };

        /**
         * Función para visualizar el aviso legal
         */
        $scope.viewLegal = function () {
             $scope.showLegal = !$scope.showLegal;
             $scope._changeShowLegal();
         };

        /**
         * Función para ocultar el aviso legal a los 3 segundos
         * @private
         */
        $scope._changeShowLegal = function () {
            $timeout(function () {
               $scope.showLegal = !$scope.showLegal;
            }, 3000);
        };

        /**
         * Función para determinar nombre y versión de navegador
         */
        $scope.getBrowser = function(){
           var ua= $window.navigator.userAgent, tem,
           M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
           if(/trident/i.test(M[1])){
               tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
               return 'IE '+(tem[1] || '');
           }
           if(M[1]=== 'Chrome'){
               tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
               if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
           }
           M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
           if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
           return M.join(' ');
        };

        $scope.acceptCookies = function () {
            $scope.showCookies = false;
        };

        $scope._checkMobileOS = function () {
            var platform = $window.navigator.platform.toLowerCase();
            if(/^iphone/.test(platform) || /^ipad/.test(platform) || /^ipod/.test(platform)) {
                $scope.googleApp = 0;
            } else if(/^linux/.test(platform)) {
                $scope.googleApp = 1;
            } else {
                $scope.googleApp = -1;
            }
        };

        /**
         * Funcíon que establece la variable del $scope.isIE a true si el navegador es internet explorer
         * @private
         */
        $scope._isIExplorer = function () {
            if(/^IE/.test($scope.getBrowser())) {
                $scope.audioSrc = './img/audio/music.mp3';
                $scope.isIE = true;
            }
        };
    }]);
