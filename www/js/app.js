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
        .state("list", {
            "url": "/list",
            "templateUrl": "templates/list.html",
            "controller": "MainController",
            "cache": false,
            "reload": true

        })
        .state("item-en", {
            "url": "/item-en/:documentId/:documentRevision",
            "templateUrl": "templates/item-en.html",
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
        .state("capa", {
            "url": "/capa",
            "templateUrl": "templates/capa.html",
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

    $scope.save = function(firstname, lastname, email, pergunta1, pergunta2, pergunta3, idioma) {


      if (( firstname ) && (lastname) && (email))  {

          var now = new Date()
          var jsonDocument = {
              "firstname": firstname,
              "lastname": lastname,
              "email": email,
              "pergunta1": pergunta1,
              "pergunta2": pergunta2,
              "pergunta3": pergunta3,
              "idioma": idioma,
              "data": now,
          };
          if($stateParams.documentId) {
              jsonDocument["_id"] = $stateParams.documentId;
              jsonDocument["_rev"] = $stateParams.documentRevision;
          }
          $pouchDB.save(jsonDocument).then(function(response) {
              $state.go("obrigado-"+idioma);
          }, function(error) {
              console.log("ERROR -> " + error);
          });


      }
      else {
        alert('campos vazios');
      }
    }

    $scope.delete = function(id, rev) {
        $pouchDB.delete(id, rev);
    }

    $scope.back = function() {
        $ionicHistory.goBack();
    }

    $scope.scrollP2 = function() {
      $ionicScrollDelegate.scrollTo(0, 2000, true);
    };

    $scope.scrollP3 = function() {
      $ionicScrollDelegate.scrollTo(0, 4000, true);
    };

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
