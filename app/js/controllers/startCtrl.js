angular.module('dwGame')
    .controller('StartController', ['$scope', '$rootScope', 'QuestionFactory', '$location', 'Flash', function ($scope, $rootScope, QuestionFactory, $location, Flash) {

        $scope.next = function (questions, step) {
            $rootScope.questions = questions; // Contient quatre objects, un par question.
            $rootScope.step = step;  // On stock l'étape actuelle
            return currentId = $rootScope.questions[$rootScope.step].id;
        };

        $scope.setQuestion = function(id) {
            QuestionFactory.getSingleQuestion(id).then(function (res) {
                var questionJson = {};

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

        $scope.startGame = function () {
            Flash.dismiss(); // On masque tous les messages Flash

            QuestionFactory.getQuestions().then(function (res) {

                var currentId = $scope.next(res.data, 0);

                $location.path('/question/' + currentId);

                $scope.setQuestion(currentId);
            }, function () {
                // fail
            });
        };

        $scope.submit = function (result) {
            var id = null;
            if ($rootScope.step == 0) {
                $rootScope.results = [];
            }


            // TODO Debug cet array qui ne push pas

            if ($rootScope.step <= 3) {
                $rootScope.results.push(result);

                console.log($rootScope.results);

                $rootScope.step++;
                id = $scope.next($rootScope.questions, $rootScope.step);
                $scope.setQuestion(id);
                $location.path('/question/' + id);
            }
            if ($rootScope.step == 3) {
                console.log("finish");
            }

            /*switch ($rootScope.step) {
                case 0:
                    $rootScope.results.push(result);
                    console.log($rootScope.results);
                    $rootScope.step++;
                    id = $scope.next($rootScope.questions, $rootScope.step);
                    $scope.setQuestion(id);
                    $location.path('/question/' + id);
                    break;
                case 1:
                    $rootScope.results.push(result);
                    console.log($rootScope.results);
                    $rootScope.step++;
                    id = $scope.next($rootScope.questions, $rootScope.step);
                    $scope.setQuestion(id);
                    $location.path('/question/' + id);
                    break;
                case 2:
                    $rootScope.results.push(result);
                    console.log($rootScope.results);
                    $rootScope.step++;
                    id = $scope.next($rootScope.questions, $rootScope.step);
                    $scope.setQuestion(id);
                    $location.path('/question/' + id);
                    break;
                case 3:
                    $rootScope.results.push(result);
                    console.log($rootScope.results);
                    console.log('fini !');
            }*/


            // TODO comment rediriger vers la next route ? Sachant que le next est

            //if ($rootScope.results.length == 4) {

                // On envoie le rï¿½sultat ï¿½ l'API

                // if pending => redirect home

                // if winner => redirect home + message flash "tu as gagnï¿½"

                // if loser => redirect home + message flash "tu as perdu"
            //}
            //console.log($rootScope.results.length);

        };


    }]);