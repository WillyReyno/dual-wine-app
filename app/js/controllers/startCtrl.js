angular.module('dwGame')
    .controller('HomeController', ['$scope', '$rootScope', 'QuestionService', function($scope, $rootScope, QuestionService) {
        QuestionService.getUserGameNotPlayed($rootScope.currentUser.id).then(function(res) {
            $scope.players = res.data;
        });

        QuestionService.getUserGameWaiting($rootScope.currentUser.id).then(function(res) {
            $scope.others = res.data;
        });
    }])
    .controller('StartController', ['$scope', '$rootScope', 'QuestionService', '$location', 'FlashService',
        function ($scope, $rootScope, QuestionService, $location, FlashService) {


            /* Get the next question's id */

            $scope.next = function (questions, step) {
                $rootScope.questions = questions; // Contient quatre objets, un par question.
                $rootScope.step = step;  // On stock l'étape actuelle
                return currentId = $rootScope.questions[$rootScope.step].id;
            };

            /* Sets the current question and its answers */

            $scope.setQuestion = function(id) {
                QuestionService.getSingleQuestion(id).then(function (res) {
                    var questionJson = {};

                    function shuffle(array) {
                        var currentIndex = array.length, temporaryValue, randomIndex ;

                        // While there remain elements to shuffle...
                        while (0 !== currentIndex) {

                            // Pick a remaining element...
                            randomIndex = Math.floor(Math.random() * currentIndex);
                            currentIndex -= 1;

                            // And swap it with the current element.
                            temporaryValue = array[currentIndex];
                            array[currentIndex] = array[randomIndex];
                            array[randomIndex] = temporaryValue;
                        }

                        return array;
                    }

                    /* Formating the object with true and false answers */
                    questionJson.question = res.data.question;
                    var tests = [];
                    for (var i = 1; i <= 4; i++) {
                        tests.push({
                            "content":res.data['answer_' + i],
                            "value": i == 1
                        });
                    }
                    shuffle(tests);
                    $rootScope.currentQuestion = questionJson;
                    $rootScope.currentAnswers = tests;

                });
            };

            /* Start game and redirect to the first question */

            $scope.startGame = function () {
                $rootScope.gameType = "new";
                FlashService.dismiss(); // Hiding all flash message from a view to another

                /* Get the 4 questions given by the API */
                QuestionService.getQuestions().then(function(res) {


                    QuestionService.getRandomOtherUser($scope.currentUser.id).then(function (res) {
                        $rootScope.user2 = res.data;
                    });

                    var nextId = $scope.next(res.data, 0); // Retrieve the next question's ID

                    $location.path('/question/' + nextId); // Go to the next question
                    $scope.setQuestion(nextId);  // Stock the next question and answers to display them on the next view

                }, function () {
                    FlashService.flashError();
                });
            };

            $scope.startPendingGame = function(game) {
                $rootScope.game = game;
                $rootScope.gameType = "pending";
                $rootScope.gameId = game.id;
                $rootScope.gameUser1 = game.user1_id;
                FlashService.dismiss(); // Hiding all flash message from a view to another
                var nextId = $scope.next(game.questions, 0); // Retrieve the next question's ID

                $location.path('/question/' + nextId); // Go to the next question
                $scope.setQuestion(nextId);  // Stock the next question and answers to display them on the next view

            };

            $scope.startTraining = function() {
                $rootScope.gameType = "training";
                FlashService.dismiss(); // Hiding all flash message from a view to another

                QuestionService.getQuestions().then(function(res) {

                    var nextId = $scope.next(res.data, 0); // Retrieve the next question's ID

                    $location.path('/question/' + nextId); // Go to the next question
                    $scope.setQuestion(nextId);  // Stock the next question and answers to display them on the next view
                });

            };

            $scope.submit = function (result) {
                var id = null;

                if ($rootScope.step == 0) {
                    $rootScope.results = [];
                }

                if ($rootScope.step <= 3) {
                    $rootScope.results.push(result);

                    //console.log($rootScope.results);


                    $rootScope.step++;

                    if($rootScope.step < 4) {
                        id = $scope.next($rootScope.questions, $rootScope.step);
                        $scope.setQuestion(id);
                        $location.path('/question/' + id);
                    }

                }
                // If results == 4, end of the game
                if ($rootScope.results.length == 4) {

                    if($rootScope.gameType == "new") {
                        var launch = [];
                        launch['user1_id'] = $scope.currentUser.id;
                        launch['user2_id'] = $rootScope.user2.id;
                        launch['questions'] = [$rootScope.questions[0].id, $rootScope.questions[1].id, $rootScope.questions[2].id, $rootScope.questions[3].id];
                        launch['user1_answers'] = $rootScope.results;

                        QuestionService.launchGame(launch).then(function(res) {

                            QuestionService.getUser($rootScope.user2.id).then(function(res) {
                                FlashService.flashPending(res.data.username);
                            });

                            $location.path('/');
                        });

                    } else if($rootScope.gameType == "pending") {

                        var end = [];
                        end['id'] = $rootScope.gameId;
                        end['user2_answers'] = $rootScope.results;

                        QuestionService.endGame(end).then(function(res) {

                            var finish = {};
                            finish['id'] = $rootScope.gameId;
                            finish['user1_id'] = $rootScope.game.user1_id;
                            finish['user2_id'] = $rootScope.game.user2_id;
                            finish['user1_answers'] = $rootScope.game.user1_answers;
                            finish['user2_answers'] = $rootScope.results;

                            QuestionService.finishGame(finish).then(function(finishRes) {
                                if(finishRes.data.exaequo == true) {
                                    QuestionService.getUser($rootScope.gameUser1).then(function(res) {
                                        FlashService.flashExaequo(res.data.username);
                                    });
                                } else if (finishRes.data.winner == $rootScope.currentUser.id) {
                                    QuestionService.getUser($rootScope.gameUser1).then(function(res) {
                                        FlashService.flashWinner(res.data.username);
                                    });
                                } else {
                                    QuestionService.getUser($rootScope.gameUser1).then(function(res) {
                                        FlashService.flashLoser(res.data.username);
                                    });
                                }

                                $location.path('/');

                            });
                        });
                    } else if($rootScope.gameType == "training") {
                        var endTraining = {};
                        endTraining['user_id'] = $rootScope.currentUser.id;
                        endTraining['questions'] = [$rootScope.questions[0].id, $rootScope.questions[1].id, $rootScope.questions[2].id, $rootScope.questions[3].id];
                        endTraining['users_answers'] = $rootScope.results;

                        QuestionService.endTraining(endTraining).then(function(resTraining) {
                            FlashService.flashTraining(resTraining.data.score);
                            $location.path('/');
                        });
                        console.log(endTraining);
                    }
                }
            };
        }]);