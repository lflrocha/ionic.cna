angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $pouchDB) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
    $pouchDB.setDatabase("quizcna");
    $pouchDB.sync("http://45.56.114.69:5984/quizcna")
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("capa", {
            "url": "/capa",
            "templateUrl": "templates/capa.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("en01", {
            "url": "/en01/:idioma",
            "templateUrl": "templates/en01-form.html",
            "controller": "MainController",
            "params": {
              idioma: null
            },
            "cache": false,
            "reload": true
        })
        .state("en02", {
            "url": "/en02/:idioma",
            "templateUrl": "templates/en02-pergunta1.html",
            "controller": "MainController",
            "params": {
              idioma: null
            },
            "cache": false,
            "reload": true
        })
        .state("en03", {
            "url": "/en03",
            "templateUrl": "templates/en03-resposta1.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("en04", {
            "url": "/en04",
            "templateUrl": "templates/en04-pergunta2.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("en05", {
            "url": "/en05",
            "templateUrl": "templates/en05-resposta2.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("en06", {
            "url": "/en06",
            "templateUrl": "templates/en06-pergunta3.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("en07", {
            "url": "/en07",
            "templateUrl": "templates/en07-resposta3.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("en08", {
            "url": "/en08",
            "templateUrl": "templates/en08-obrigado.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("es01", {
            "url": "/es01/:idioma",
            "templateUrl": "templates/es01-form.html",
            "controller": "MainController",
            "params": {
              idioma: null
            },
            "cache": false,
            "reload": true
        })
        .state("es02", {
            "url": "/es02/:idioma",
            "templateUrl": "templates/es02-pergunta1.html",
            "controller": "MainController",
            "params": {
              idioma: null
            },
            "cache": false,
            "reload": true
        })
        .state("es03", {
            "url": "/es03",
            "templateUrl": "templates/es03-resposta1.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("es04", {
            "url": "/es04",
            "templateUrl": "templates/es04-pergunta2.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("es05", {
            "url": "/es05",
            "templateUrl": "templates/es05-resposta2.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("es06", {
            "url": "/es06",
            "templateUrl": "templates/es06-pergunta3.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("es07", {
            "url": "/es07",
            "templateUrl": "templates/es07-resposta3.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("es08", {
            "url": "/es08",
            "templateUrl": "templates/es08-obrigado.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("pt01", {
            "url": "/pt01/:idioma",
            "templateUrl": "templates/pt01-form.html",
            "controller": "MainController",
            "params": {
              idioma: null
            },
            "cache": false,
            "reload": true
        })
        .state("pt02", {
            "url": "/pt02/:idioma",
            "templateUrl": "templates/pt02-pergunta1.html",
            "controller": "MainController",
            "params": {
              idioma: null
            },
            "cache": false,
            "reload": true
        })
        .state("pt03", {
            "url": "/pt03",
            "templateUrl": "templates/pt03-resposta1.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("pt04", {
            "url": "/pt04",
            "templateUrl": "templates/pt04-pergunta2.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("pt05", {
            "url": "/pt05",
            "templateUrl": "templates/pt05-resposta2.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("pt06", {
            "url": "/pt06",
            "templateUrl": "templates/pt06-pergunta3.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("pt07", {
            "url": "/pt07",
            "templateUrl": "templates/pt07-resposta3.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("pt08", {
            "url": "/pt08",
            "templateUrl": "templates/pt08-obrigado.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("list", {
            "url": "/list",
            "templateUrl": "templates/list.html",
            "controller": "MainController",
            "cache": false,
            "reload": true

        });

    $urlRouterProvider.otherwise("capa");
})

.controller("MainController", function($scope, $rootScope, $state, $stateParams, $ionicHistory, $pouchDB, $ionicScrollDelegate) {

    $scope.items = {};

    $pouchDB.startListening();

    $rootScope.$on("$pouchDB:change", function(event, data) {
        $scope.items[data.doc._id] = data.doc;
        $scope.$apply();
    });

    $rootScope.$on("$pouchDB:delete", function(event, data) {
        delete $scope.items[data.doc._id];
        $scope.$apply();
    });

    if($stateParams.documentId) {
        $pouchDB.get($stateParams.documentId).then(function(result) {
            $scope.inputForm = result;
        });
    }

    $scope.nextHome = function() {
      $state.go("capa");
    }

    $scope.nextCapa = function(idioma) {
      if (idioma) {
        $scope.idioma = idioma;
        $rootScope.idioma = $scope.idioma;
        $state.go(idioma + "01");
      }
      else {
        alert('Please select your language.');
      }
    }

    $scope.nextP1 = function(nome, email, empresa, pais) {
      idioma = $rootScope.idioma;
      if (nome && email && empresa) {
        $rootScope.nome = nome;
        $rootScope.email = email;
        $rootScope.empresa = empresa;
        $rootScope.pais = pais;
        $state.go(idioma + "02");
      }
      else {
        if (idioma == "en") {
          alert("Please fill in all fields.");
        } else if (idioma == "es") {
          alert("Por favor, rellena todos los campos.");
        } else if (idioma == "pt") {
          alert("Por favor, preencha todos os campos.");
        }
      }
    };

    $scope.nextP2 = function(p1) {
      idioma = $rootScope.idioma;
      if (p1) {
        $rootScope.p1 = p1;
        $state.go(idioma + "03");
      }
      else {

        if (idioma == "en") {
          alert("Please select an option.");
        } else if (idioma == "es") {
          alert("Por favor, seleccione una opción.");
        } else if (idioma == "pt") {
          alert("Por favor, selecione uma opção.");
        }
      }
    };

    $scope.nextP3 = function() {
      idioma = $rootScope.idioma;
      $state.go(idioma + "04");
    };

    $scope.nextP4 = function(p2) {
      idioma = $rootScope.idioma;
      if (p2) {
        $rootScope.p2 = p2;
        $state.go(idioma + "05");
      }
      else {
        if (idioma == "en") {
          alert("Please select an option.");
        } else if (idioma == "es") {
          alert("Por favor, seleccione una opción.");
        } else if (idioma == "pt") {
          alert("Por favor, selecione uma opção.");
        }
      }
    };

    $scope.nextP5 = function() {
      idioma = $rootScope.idioma;
      $state.go(idioma + "06");
    };

    $scope.nextP6 = function(p3) {
      idioma = $rootScope.idioma;
      if (p3) {
        $rootScope.p3 = p3;
        $state.go(idioma + "07");
      }
      else {
        if (idioma == "en") {
          alert("Please select an option.");
        } else if (idioma == "es") {
          alert("Por favor, seleccione una opción.");
        } else if (idioma == "pt") {
          alert("Por favor, selecione uma opção.");
        }
      }
    };

    $scope.save = function() {
      var now = new Date();
      var jsonDocument = {
          "nome": $rootScope.nome,
          "email": $rootScope.email,
          "empresa": $rootScope.empresa,
          "pais": $rootScope.pais,
          "pergunta1": $rootScope.p1,
          "pergunta2": $rootScope.p2,
          "pergunta3": $rootScope.p3,
          "idioma": $rootScope.idioma,
          "data": now
      };
      if($stateParams.documentId) {
          jsonDocument["_id"] = $stateParams.documentId;
          jsonDocument["_rev"] = $stateParams.documentRevision;
      }
      $pouchDB.save(jsonDocument).then(function(response) {
          $state.go(idioma + "08");
      }, function(error) {
          console.log("ERROR -> " + error);
      });
    }

    $scope.delete = function(id, rev) {
        $pouchDB.delete(id, rev);
    }

})

.service("$pouchDB", ["$rootScope", "$q", function($rootScope, $q) {

    var database;
    var changeListener;

    this.setDatabase = function(databaseName) {
        database = new PouchDB(databaseName);
    }

    this.startListening = function() {
        changeListener = database.changes({
            live: true,
            include_docs: true
        }).on("change", function(change) {
            if(!change.deleted) {
                $rootScope.$broadcast("$pouchDB:change", change);
            } else {
                $rootScope.$broadcast("$pouchDB:delete", change);
            }
        });
    }

    this.stopListening = function() {
        changeListener.cancel();
    }

    this.sync = function(remoteDatabase) {
        database.sync(remoteDatabase, {live: true, retry: true});
    }

    this.save = function(jsonDocument) {
        var deferred = $q.defer();
        if(!jsonDocument._id) {
            database.post(jsonDocument).then(function(response) {
                deferred.resolve(response);
            }).catch(function(error) {
                deferred.reject(error);
            });
        } else {
            database.put(jsonDocument).then(function(response) {
                deferred.resolve(response);
            }).catch(function(error) {
                deferred.reject(error);
            });
        }
        return deferred.promise;
    }

    this.delete = function(documentId, documentRevision) {
        return database.remove(documentId, documentRevision);
    }

    this.get = function(documentId) {
        return database.get(documentId);
    }

    this.destroy = function() {
        database.destroy();
    }

}]);
