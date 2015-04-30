angular.module('dwGame')
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
        $scope.startGame = function () {

            Flash.dismiss(); // Hiding all flash message from a view to another

            /* Get the 4 questions given by the API */
            QuestionService.getQuestions().then(function (res) {

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
                id = $scope.next($rootScope.questions, $rootScope.step);
                $scope.setQuestion(id);
                $location.path('/question/' + id);
            }
            if ($rootScope.step == 3) {
                console.log("finish");
            }

            // TODO Use the flash messages at the right moment.
            FlashService.flashWinner();
            FlashService.flashLoser();
            FlashService.flashPending();
        };


    }]);