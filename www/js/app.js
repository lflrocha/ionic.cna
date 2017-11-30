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
    $pouchDB.setDatabase("nraboy-test");
    if(ionic.Platform.isAndroid()) {
        $pouchDB.sync("http://192.168.57.1:4984/test-database");
    } else {
        $pouchDB.sync("http://localhost:4984/test-database");
    }
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
        .state("item-es", {
            "url": "/item-es/:documentId/:documentRevision",
            "templateUrl": "templates/item-es.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("item-pt", {
            "url": "/item-pt/:documentId/:documentRevision",
            "templateUrl": "templates/item-pt.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("obrigado-en", {
            "url": "/obrigado-en",
            "templateUrl": "templates/obrigado-en.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("obrigado-es", {
            "url": "/obrigado-es",
            "templateUrl": "templates/obrigado-es.html",
            "controller": "MainController",
            "cache": false,
            "reload": true
        })
        .state("obrigado-pt", {
            "url": "/obrigado-pt",
            "templateUrl": "templates/obrigado-pt.html",
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
      $scope.idioma = idioma;
      $rootScope.idioma = $scope.idioma;
      $state.go("en01");
    }

    $scope.nextP1 = function(nome, email, empresa) {
      $scope.idioma = $rootScope.idioma;
      alert($scope.idioma);
      if (nome && email && empresa) {
        $rootScope.nome = nome;
        $rootScope.email = email;
        $rootScope.empresa = empresa;
        $state.go("en02");
      }
      else {
        alert('Ops! Preencha o formulário!');
      }
    };

    $scope.nextP2 = function(p1) {
      alert($rootScope.idioma + ' - ' + $rootScope.nome + ' - ' + $rootScope.email + ' - ' + $rootScope.empresa);
      if (p1) {
        $rootScope.p1 = p1;
        $state.go("en03");
      }
      else {
        alert('Ops!');
      }
    };

    $scope.nextP3 = function() {
      alert($rootScope.idioma + ' - ' + $rootScope.nome + ' - ' + $rootScope.email + ' - ' + $rootScope.empresa + ' - ' + $rootScope.p1);
      $state.go("en04");
    };

    $scope.nextP4 = function(p2) {
      alert($rootScope.idioma + ' - ' + $rootScope.nome + ' - ' + $rootScope.email + ' - ' + $rootScope.empresa + ' - ' + $rootScope.p1);
      if (p2) {
        $rootScope.p2 = p2;
        $state.go("en05");
      }
      else {
        alert('Ops!');
      }
    };

    $scope.nextP5 = function() {
      alert($rootScope.idioma + ' - ' + $rootScope.nome + ' - ' + $rootScope.email + ' - ' + $rootScope.empresa + ' - ' + $rootScope.p1 + ' - ' + $rootScope.p2);
      $state.go("en06");
    };

    $scope.nextP6 = function(p3) {
      alert($rootScope.idioma + ' - ' + $rootScope.nome + ' - ' + $rootScope.email + ' - ' + $rootScope.empresa + ' - ' + $rootScope.p1 + ' - ' + $rootScope.p2);
      if (p3) {
        $rootScope.p3 = p3;
        $state.go("en07");
      }
      else {
        alert('Ops!');
      }
    };



    $scope.save = function() {

      var now = new Date();
      var jsonDocument = {
          "nome": $rootScope.nome,
          "email": $rootScope.email,
          "empresa": $rootScope.empresa,
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
          $state.go("en08");
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
