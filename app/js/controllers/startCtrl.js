angular.module('dwGame')
    .controller('StartController', ['$scope', '$rootScope', 'QuestionService', '$location', 'FlashService',
        function ($scope, $rootScope, QuestionService, $location, FlashService) {

            /* Get the next question's id */
            $scope.next = function (questions, step) {
                $rootScope.questions = questions; // Contient quatre objets, un par question.
                $rootScope.step = step;  // On stock l'étape actuelle
                return currentId = $rootScope.questions[$rootScope.step].id;
            };

            $scope.randomUser = function(user_id) {
                QuestionService.getRandomOtherUser(user_id).then(function(res) {
                    console.log(res.data);

                });
            };

            $scope.waitingForYou = function(user_id) {
                QuestionService.getUserGameNotPlayed(user_id).then(function(res) {
                    console.log(res.data);

                });
            };

            $scope.waitingForOther = function(user_id) {
                QuestionService.getUserGameWaiting(user_id).then(function(res) {
                    console.log(res.data)
                });
            };

            /* Sets the current question and its answers */

            $scope.setQuestion = function(id) {
                QuestionService.getSingleQuestion(id).then(function (res) {
                    var questionJson = {};



                    /* Formating the object with true and false answers */
                    questionJson.question = res.data.question;
                    questionJson.answer = {};
                    for (var i = 1; i <= 4; i++) {
                        questionJson.answer['answer' + i] = {};
                        questionJson.answer['answer' + i].content = res.data['answer_' + i];
                        questionJson.answer['answer' + i].value = i == 1;
                    }

                    $rootScope.currentQuestion = questionJson;
                    $rootScope.currentAnswers = questionJson.answer;

                });
            };

            /* Start game and redirect to the first question */

            $scope.startPendingGame = function(game_id) {
                $rootScope.newGame = false;
                // TODO Récupérer la partie à partir du game_id (API), comprenant l'user 1 + les 4 questions

                var nextId = $scope.next('var questions depuis api', 0); // Retrieve the next question's ID

                $location.path('/question/' + nextId); // Go to the next question
                $scope.setQuestion(nextId);  // Stock the next question and answers to display them on the next view

            };

            $scope.startGame = function () {
                $rootScope.newGame = true;
                FlashService.dismiss(); // Hiding all flash message from a view to another

                /* Get the 4 questions given by the API */
                QuestionService.getQuestions().then(function (res) {

                    QuestionService.getRandomOtherUser($scope.currentUser.id).then(function (res) {
                        $rootScope.user2 = res.data;
                        console.log(res.data);
                    });
                    // TODO (if new game) Générer l'user 2
                    // TODO (if new game) Stocker dans la table partie : user1_id, user2_id, res.data, (user1_answers), (user2_answers), (winner_user_id), (looser_user_id)

                    var nextId = $scope.next(res.data, 0); // Retrieve the next question's ID

                    $location.path('/question/' + nextId); // Go to the next question
                    // TODO check si on peut inverser ces deux lignes ?
                    $scope.setQuestion(nextId);  // Stock the next question and answers to display them on the next view

                }, function () {
                    FlashService.flashError();
                });
            };

            $scope.submit = function (result) {
                var id = null;

                if ($rootScope.step == 0) {
                    $rootScope.results = [];
                }

                if ($rootScope.step <= 3) {
                    $rootScope.results.push(result);

                    console.log($rootScope.results);


                    $rootScope.step++;

                    if($rootScope.step < 4) {
                        id = $scope.next($rootScope.questions, $rootScope.step);
                        $scope.setQuestion(id);
                        $location.path('/question/' + id);
                    }

                }
                // If results == 4, end of the game
                if ($rootScope.results.length == 4) {
                    console.log($rootScope.newGame);

                    if($rootScope.newGame) {
                        var array = [
                            $scope.currentUser.id,
                            $rootScope.user2,
                            [
                                $rootScope.questions[0].id,
                                $rootScope.questions[1].id,
                                $rootScope.questions[2].id,
                                $rootScope.questions[3].id
                            ],
                            $rootScope.results,
                            '', // answers user 2
                            '', // winner user id
                            '' // loser user id
                        ];
                        console.log(array);
                        QuestionService.sendResults(array)
                    } else {

                    }


                    // TODO (if new game) Send results to the API : user1_id, (user2_id), res.data, user1_answers, (user2_answers), (winner_user_id), (looser_user_id)
                    // TODO location.path + FlashService.flashPending();

                    // TODO elseif (pending game) => Send results to the API : (user1_id), user2_id, (res.data), (user1_answers), user2_answers, winner_user_id, looser_user_id
                    // TODO location.path + if(user2_id == winner_user_id) FlashService.flashWinner(); else FlashService.flashLoser();

                    console.log($rootScope.user2);
                }
            };


        }]);