angular.module('dwGame')
    .controller('StartController', ['$scope', '$rootScope', 'QuestionService', '$location', 'FlashService',
        function ($scope, $rootScope, QuestionService, $location, FlashService) {

            /* Get the next question's id */

            $scope.next = function (questions, step) {
                $rootScope.questions = questions; // Contient quatre objets, un par question.
                $rootScope.step = step;  // On stock l'étape actuelle
                return currentId = $rootScope.questions[$rootScope.step].id;
            };


            // TODO Tester quand on aura la route d'update de parties puis supprimer
            $scope.waitingForYou = function(user_id) {
                QuestionService.getUserGameNotPlayed(user_id).then(function(res) {
                    console.log(res.data);
                });
            };

            // TODO Tester quand on aura la route d'update de parties puis supprimer
            $scope.waitingForOther = function(user_id) {
                QuestionService.getUserGameWaiting(user_id).then(function(res) {
                    console.log(res.data)
                });
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
                        //test['answer' + i] = {};
                        //test['answer' + i].content = res.data['answer_' + i];
                        //test['answer' + i].value = i == 1;
                    }
                    shuffle(tests);
                    $rootScope.currentQuestion = questionJson;
                    $rootScope.currentAnswers = tests;

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

                    if($rootScope.newGame) {
                        var finalGame = [
                            $scope.currentUser.id,
                            $rootScope.user2,
                            [
                                $rootScope.questions[0].id,
                                $rootScope.questions[1].id,
                                $rootScope.questions[2].id,
                                $rootScope.questions[3].id
                            ],
                            $rootScope.results,
                            '', // Réponses de l'user 2, plus tard
                            '', // ID du winner à déterminer dans la seconde partie
                            '' // ID du loser à déterminer dans la seconde partie
                        ];
                        console.log(finalGame);
                        QuestionService.sendResults(finalGame);

                        $location.path('/start');
                        FlashService.flashPending();

                    } else {
                        var finalPending = [
                            '', // user 1 déjà dans la BDD
                            '', // user 2 déjà dans la BDD
                            '', // Questions déjà dans la BDD
                            '', // Réponses user1 déjà dans la BDD
                            $rootScope.results, // answers user 2
                            '', // TODO déterminer winner user id
                            '' // TODO déterminer loser user id
                        ];

                        //TODO Incrémenter le win et lose game des users !

                        console.log(finalPending);

                        QuestionService.sendResults(finalPending);
                        $location.path('/start');

                        var winner = true; // TODO Déterminer s'il est gagnant ou pas selon les résultats
                        if(winner) {
                            FlashService.flashWinner();
                        } else {
                            FlashService.flashLoser();
                        }
                    }

                    console.log($rootScope.user2);
                }
            };


        }]);