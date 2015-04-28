angular.module('dwGame')
    .controller('StartController', function ($scope, $rootScope, QuestionFactory, $location) {
        $rootScope.results = [];

        $scope.next = function(questions, step) {
            $rootScope.questions = questions; // Contient quatre objects, un par question.
            $rootScope.step = step;  // On stock l'étape actuelle
            return currentId = $rootScope.questions[$rootScope.step].id;
        };

        $scope.startGame = function () {
            QuestionFactory.getQuestions().then(function(res) {

                var currentId = $scope.next(res.data, 0);

                $location.path('/question/'+currentId);



                QuestionFactory.getSingleQuestion(currentId).then(function(res) {
                    var questionJson = {};

                    questionJson.question = res.data.question;
                    questionJson.answer = {};
                    for(var i = 1; i <= 4; i++) {
                        questionJson.answer['answer'+i] = {};
                        questionJson.answer['answer'+i].content = res.data['answer_'+i];
                        questionJson.answer['answer'+i].value = i == 1;
                    }


                    //questionJson.answer.answer2 = {};
                    //questionJson.answer.answer2.content = res.data.answer_2;
                    //questionJson.answer.answer2.value = false;
                    //questionJson.answer.answer3 = {};
                    //questionJson.answer.answer3.content = res.data.answer_3;
                    //questionJson.answer.answer3.value = false;
                    //questionJson.answer.answer4 = {};
                    //questionJson.answer.answer4.content = res.data.answer_4;
                    //questionJson.answer.answer4.value = false;

                    $rootScope.currentQuestion = questionJson;
                    $rootScope.currentAnswers = questionJson.answer;

                });
            }, function () {
                // fail
            });
        };

        $scope.submit = function(result) {
            $rootScope.results.push(result);
            var step = $rootScope.step;
            if(step == 0) {
                // TODO Redirect en fonction du step

                var id = $scope.next($rootScope, step);

                $location.path('/question/'+id);

            } else if(step == 1) {

            } else if(step == 2) {

            } else if(step == 3) {

            } else if(step == 4) {

            }

            // TODO comment rediriger vers la next route ? Sachant que le next est
            if($rootScope.results.length == 4) {
                console.log('fini !');
                // On envoie le résultat à l'API

                // if pending => redirect home

                // if winner => redirect home + message flash "tu as gagné"

                // if loser => redirect home + message flash "tu as perdu"
            }
            console.log($rootScope.results);
            console.log($rootScope.results.length);

        }
    });