/**
 * Created by Oliver Urones on 15/10/18.
 */
angular.module('iberostar-webinar-app')
    .factory('ExperienceFactory', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            getExperience: getExperience,
            getResource: getResource,
            getPublicUrl: getPublicURL,
            getUserProfile: getUserProfile,
            updateUserProfile: updateUserProfile,
            updateStoreExperience: updateStoreExperience,
            getFilteredExperience: getFilteredExperience
        };

        /**
         * Función que retorna la url construída según un parámetro
         * @param route Parámetro para construir la url según sea necesario
         * @return {string} Url base para hacer peticiones a la api
         * @private
         */
        function _getUrlBase(route){
            //urlBase para local
            //var urlBase = 'http://10.10.0.43:8003/api/v1/'+route;
            //urlBase para pre
            //var urlBase = 'https://pre-experiences.snippet.es/api/v1/'+route;
            //urlBase para pro
            var urlBase = 'https://experiences.snippet.es/api/v1/'+route;
            //urlBase para mixta
            //var urlBase = 'https://mixta-experiences.snippet.es/api/v1/'+route;
            //urlBase para telmex
            //var urlBase = 'https://telmex-experiences.snippet.es/api/v1/'+route;
            return urlBase;
        }

        /**
         * Función que retorna la promesa de la petición para obtener una experiencia a través de su id
         * @param id string ID de la experiencia
         */
        function getExperience(id) {
            var route = 'experiences/' + id + '/'
            url = _getUrlBase(route);

            var deferred = $q.defer();

            $http.get(url)
                .then(function (data) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        /**
         * Función que retorna la promesa de la petición para obtener un recurso a través de su id
         * @param id string ID del recurso
         */
        function getResource(id) {
            var route = 'resources/' + id + '/'
            url = _getUrlBase(route);

            var deferred = $q.defer();

            $http.get(url)
                .then(function (data) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        /**
         * Función que retorna la promesa de la petición para obtener una url pública
         * @param id int ID del recurso
         */
        function getPublicURL(id) {
            var route = 'resources/' + id + '/public_url/'
            url = _getUrlBase(route);

            var deferred = $q.defer();

            $http.get(url)
                .then(function (data) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        /**
         * Función que retorna la promesa de la petición para obtener los datos de un perfil de usuario
         * @param profileId string ID del perfil del usuario
         * @param experienceId string ID de la experiencia para inyectarlo en la cabecera de la petición
         */
        function getUserProfile(profileId, experienceId) {
            var route = 'user-profiles/' + profileId + '/'
            url = _getUrlBase(route);

            var deferred = $q.defer();

            var config = {'headers': {'Experience': experienceId}};

            $http.get(url, config)
                .then(function (data) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        /**
         * Función para actualizar los datos de un perfil de usuario a través de su id
         * @param profileId string ID del perfil de usuario a actualizar
         * @param experienceId string ID de la experiencia para inyectarlo en la cabeceara de la petición
         * @param data JSON Datos a modificar d
         */
        function updateUserProfile(profileId, experienceId, data) {
            var route = 'user-profiles/' + profileId + '/'
            url = _getUrlBase(route);

            var deferred = $q.defer();

            var config = {'headers': {'Experience': experienceId}};

            $http.put(url, data, config)
                .then(function (data) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        /**
         * Función para actualizar el store de la experience
         * @param experienceId string Id de la experiencia
         * @param data JSON Store con los nuevos datos
         */
        function updateStoreExperience(experienceId, data) {
            var route = 'experiences/' + experienceId + '/'
            url = _getUrlBase(route);

            var deferred = $q.defer();

            $http.put(url, data)
                .then(function (data) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        /**
         * Función para obtener una experiencia a través de un filro de campaign y key
         * @param key string Se usa para el filtro en la url
         * @returns data JSON de una experiencia en formato filtrado
         */
        function getFilteredExperience(key) {
            //campaign para local
            //campaign = '17'
            //campaign para pre
            //campaign = '49'
            //campaign para pro
            campaign = '200'

            var route = 'experiences/?campaign=' + campaign + '&key=' + key
            var url = _getUrlBase(route);

            var deferred = $q.defer();

            $http.get(url)
                .then(function (data) {
                    deferred.resolve(data.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }]);
