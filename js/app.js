/**
 * Created by Oliver Urones on 15/10/18.
 */
//Declaración del móduo e inyección de sus dependencias.
var app = angular.module('iberostar-webinar-app', [
]);

//Configuración del módulo
app.config(function ($httpProvider) {
    //Añadido interceptor en el $httpProvider para establecer las cabeceras
    //Esto añade al objeto $httpProvider la configuración que devuelve la factory httpRequestInterceptorFactory
    $httpProvider.interceptors.push('httpRequestInterceptorFactory');
});
