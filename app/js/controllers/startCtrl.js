angular.module('dwGame')
    .controller('StartController', ['$scope', '$rootScope', 'QuestionService', '$location', 'FlashService',
        function ($scope, $rootScope, QuestionService, $location, FlashService) {


            QuestionService.getUserGameNotPlayed($rootScope.currentUser.id).then(function(res) {
                $scope.players = res.data;
            });

            QuestionService.getUserGameWaiting($rootScope.currentUser.id).then(function(res) {
                $scope.others = res.data;
            });


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
                $rootScope.newGame = true;
                FlashService.dismiss(); // Hiding all flash message from a view to another

                /* Get the 4 questions given by the API */
                QuestionService.getQuestions().then(function (res) {


                    QuestionService.getRandomOtherUser($scope.currentUser.id).then(function (res) {
                        $rootScope.user2 = res.data;
                    });

                    var nextId = $scope.next(res.data, 0); // Retrieve the next question's ID
                    console.log($rootScope.questions);

                    $location.path('/question/' + nextId); // Go to the next question
                    $scope.setQuestion(nextId);  // Stock the next question and answers to display them on the next view

                }, function () {
                    FlashService.flashError();
                });
            };

            $scope.startPendingGame = function(game) {
                $rootScope.newGame = false;
                FlashService.dismiss(); // Hiding all flash message from a view to another

                console.log(game.questions); // TODO Wait for object not id
                var arrayQuestions = [];
                for (var i = 0; i <= 4; i++) {
                    QuestionService.getSingleQuestion(game.questions[i]).then(function (res) {
                        arrayQuestions.push(res.data);
                    });
                }
                console.log(arrayQuestions);



                //for (var i = 0; i <= 4; i++) {
                //    arrayQuestions.push({
                //        "id": game.questions[i].id,
                //        "category_id": game.questions[i].category_id,
                //        "question": game.questions[i].question,
                //        "user_id": game.questions[i].user_id,
                //        "answer_1": game.questions[i].answer_1,
                //        "answer_2": game.questions[i].answer_2,
                //        "answer_3": game.questions[i].answer_3,
                //        "answer_4": game.questions[i].answer_4,
                //        "correct_answer": game.questions[i].correct_answer,
                //        "level": game.questions[i].level,
                //        "deleted_at": game.questions[i].deleted_at,
                //        "created_at": game.questions[i].created_at,
                //        "updated_at": game.questions[i].updated_at
                //    });
                //}
                //console.log(arrayQuestions);

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
                        var launch = [];
                        launch['user1_id'] = $scope.currentUser.id;
                        launch['user2_id'] = $rootScope.user2.id;
                        launch['questions'] = [$rootScope.questions[0].id, $rootScope.questions[1].id, $rootScope.questions[2].id, $rootScope.questions[3].id];
                        launch['user1_answers'] = $rootScope.results;

                        QuestionService.launchGame(launch).then(function(res) {
                            console.log(res.data);
                        });

                        $location.path('/');
                        FlashService.flashPending(); //TODO rajouter l'username

                    } else {
                        var end = [
                            id = 23, //TODO récupérer l'id de la partie
                            user2_answers = $rootScope.results
                        ];

                        QuestionService.endGame(end); // TODO Déterminer s'il est gagnant ou pas selon les résultats
                        $location.path('/');

                        var winner = true;
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