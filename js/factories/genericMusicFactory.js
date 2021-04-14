/**
 * Created by Oliver Urones on 20/11/18.
 */
angular.module('iberostar-webinar-app')
    .factory('GenericMusicFactory', ['$window', '$http', '$q', function ($window, $http, $q) {
        return {
            createAudioContext: createAudioContext,
            createBuffer: createBuffer,
            loadData: loadData,
            loadAudio: loadAudio
        };

        function createAudioContext($scope) {
            $window.AudioContext = $window.AudioContext || $window.webkitAudioContext;
            $scope.audioCtx = new AudioContext();
            //console.log($scope.audioCtx);
            //$scope.audioCtx.suspend();
            return createBuffer($scope);
            //return audioCtx;
            //loadData(audioCtx, bufferSource)
        }

        function createBuffer($scope) {
            $scope.source = $scope.audioCtx.createBufferSource();
            //console.log($scope.source)
            return loadData($scope);
            //return ctx.createBufferSource();
        }

        function loadData($scope) {
            var url = './img/audio/music.mp3';
            var config = {'responseType': "arraybuffer"};
            var deferred = $q.defer();
            $http.get(url, config)
                .then(function (data) {
                    //console.log("succes GenericMusicFactory.loadData()");
                    //console.log(data);
                    $scope.audioCtx.decodeAudioData(data.data, function (buffer) {
                        $scope.source.buffer = buffer;
                        $scope.source.connect($scope.audioCtx.destination);
                        $scope.source.loop = true;
                        $scope.source.start();
                        $scope.audioCtx.suspend();
                    })
                }, function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function loadAudio($scope) {
            $window.AudioContext = $window.AudioContext || $window.webkitAudioContext;
            $scope.audioCtx = new AudioContext();
            $scope.source = $scope.audioCtx.createBufferSource();
            var url = './img/audio/music.mp3';
            var config = {'responseType': 'arraybuffer'};
            var deferred = $q.defer();
            $http.get(url, config)
                .then(function (data) {
                    deferred.resolve(data.data);
                }, function (error) {
                    console.log("Error loadAudio");
                    console.log(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }]);
