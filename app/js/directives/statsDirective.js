angular.module('dwTest')
    .directive("statsDirective",
    function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {

                // Chart des parties gagnées / perdues / exaequo
                var ctx_wle  = $("#winLoseExChart").get(0).getContext("2d");

                var data_wle = [
                    {
                        value: scope.currentUser.won_game,
                        color:"rgba(138,30,62,1)",
                        highlight:"rgba(138,30,62,0.75)",
                        label:"Victoires"
                    },
                    {
                        value: scope.currentUser.lost_game,
                        color:"rgba(193,54,69,1)",
                        highlight:"rgba(193,54,69,0.75)",
                        label:"Défaites"
                    },
                    {
                        value:scope.currentUser.exaequo,
                        color:"rgba(214,92,79,1)",
                        highlight:"rgba(214,92,79,0.75)",
                        label:"Exaequo"
                    }
                ];


                var winLoseExChart = new Chart(ctx_wle).Doughnut(data_wle, {
                    scaleBeginAtZero : true
                });

                // Chart des parties jouées / entrainement

                var ctx_game  = $("#gameChart").get(0).getContext("2d");
                var data_game = [
                    {
                        value: scope.currentUser.won_game + scope.currentUser.lost_game + scope.currentUser.exaequo,
                        color:"rgba(138,30,62,1)",
                        highlight:"rgba(138,30,62,0.75)",
                        label:"Nombre de parties"
                    },
                    {
                        value:scope.countTrainings, // TODO correct this
                        color:"rgba(214,92,79,1)",
                        highlight:"rgba(214,92,79,0.75)",
                        label:"Nombre d'entrainements"
                    }
                ];

                console.log(data_game);
                var gameChart = new Chart(ctx_game).Pie(data_game, {
                    scaleBeginAtZero : true
                });

                // Chart des joueurs en attente

                var ctx_wait  = $("#waitChart").get(0).getContext("2d");

                var data_wait = {
                    labels: ["Vous attendent", "Vous attendez"],
                    datasets: [
                        {
                            label: "My First dataset",
                            fillColor: "rgba(193,54,69,1)",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "rgba(193,54,69, 0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: [scope.waitingYou, scope.waitingOther]
                        }
                    ]
                };

                var waitChart = new Chart(ctx_wait).Bar(data_wait, {
                    scaleBeginAtZero : true
                });
            }
        }
    }
);
