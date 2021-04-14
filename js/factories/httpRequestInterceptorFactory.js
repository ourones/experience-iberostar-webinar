/**
 * Created by Oliver Urones on 15/10/18.
 */
(function () {
    'use strict';

    //Factory para añadir las cabeceras correspondientes para las peticiones
    //Devuelve un objeto config
    app.factory('httpRequestInterceptorFactory', function () {
        return {
            request: function (config) {
                //var localToken = '10623d4a6a5366f6d1b1c950391e90fb';
                //var preToken = '4e01d4309762355a48b4af8ab46c9e09';
                var proToken = 'e530224be15a0622d30b176e7838ac14';

                //config.headers['Authorization'] = localToken;
                //config.headers['Authorization'] = preToken;
                config.headers['Authorization'] = proToken;

                return config;
            }
        }
    })
})();