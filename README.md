Esqueleto principal de una experience hecho en angulares


Modificaciones específicas por experience:

Archivos de configuración:
	gulpfile.js: Modificación de la variable 'title' según experience

Archivos js
	Cambiar todas las cadenas de los '<>' según nombre del módulo, controller, factories, directives, etc...
Controlador:
	Funciones comunes en el controlador:
		$scope.isLandscape
		$scope.getScreenWidth
		$scope.getExperienceId
		$scope.viewLegal
		$scope._changeShowLegal
		$scope.getBrowser
		$scope.acceptCookies
		$scope._checkMobileOS
		$scope._isIExplorer
	Función a adaptar:
		$scope.init
Directivas:
	Directivas genéricas:
		genericVideoDirective.js
		orientationChangeDirective.js
		playButtonDirective.js
		resizeChangeDirective.js
Factories:
	Factories genérias:
		experienceFactory.js
		genericMusciFactory.js (Si la música va en front)
		genericVideoFactory.js
		httpRequestInterceptorFactory.js
lib:
	Librerías necesarias:
		lodash.js (Obligatoria para ordenar los recursos en la función init del controller)