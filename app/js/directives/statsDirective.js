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
                    legendTemplate : "" +
                    "<ul class=\"<%=name.toLowerCase()%>-legend list-unstyled\">" +
                    "<% for (var i=0; i<segments.length; i++){%>" +
                    "<li>" +
                    "<span style=\"background-color:<%=segments[i].fillColor%>\">" +
                    "<%if(segments[i].label){%><strong><%=segments[i].label%></strong><%}%> <%if(segments[i].value){%>: <%=segments[i].value%><%}%>" +
                    "</span>" +
                    "</li>" +
                    "<%}%>" +
                    "</ul>",
                    scaleBeginAtZero : true
                });
                $('#legendFirst').html(winLoseExChart.generateLegend());

                // Chart des parties jouï¿½es / entrainement


                var ctx_game  = $("#gameChart").get(0).getContext("2d");
                var data_game = [
                    {
                        value: parseInt(scope.currentUser.won_game) + parseInt(scope.currentUser.lost_game) + parseInt(scope.currentUser.exaequo),
                        color:"rgba(138,30,62,1)",
                        highlight:"rgba(138,30,62,0.75)",
                        label:"Parties"
                    },
                    {
                        value:scope.countTrainings,
                        color:"rgba(214,92,79,1)",
                        highlight:"rgba(214,92,79,0.75)",
                        label:"Entrainements"
                    }
                ];

                var gameChart = new Chart(ctx_game).Pie(data_game, {
                    legendTemplate : "" +
                    "<ul class=\"<%=name.toLowerCase()%>-legend list-unstyled\">" +
                    "<% for (var i=0; i<segments.length; i++){%>" +
                    "<li>" +
                    "<span style=\"background-color:<%=segments[i].fillColor%>\">" +
                    "<%if(segments[i].label){%><strong><%=segments[i].label%></strong><%}%> <%if(segments[i].value){%>: <%=segments[i].value%><%}%>" +
                    "</span>" +
                    "</li>" +
                    "<%}%>" +
                    "</ul>",
                    scaleBeginAtZero : true
                });

                $('#legendSecond').html(gameChart.generateLegend());

                // Chart des joueurs en attente

                var ctx_wait  = $("#waitChart").get(0).getContext("2d");

                var data_wait = {
                    labels: ["0 bonne réponse", "1 bonne réponse", "2 bonnes réponses", "3 bonnes réponses", "4 bonnes réponses"],
                    datasets: [
                        {
                            label: "My First dataset",
                            fillColor: "rgba(193,54,69,1)",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "rgba(193,54,69, 0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: [ scope.trainingStats[0],  scope.trainingStats[1],  scope.trainingStats[2],  scope.trainingStats[3],  scope.trainingStats[4] ]
                        }
                    ]
                };

                var waitChart = new Chart(ctx_wait).Bar(data_wait, {
                    scaleBeginAtZero : true,
                    scaleShowHorizontalLines: true
                });
            }
        }
    }
);
