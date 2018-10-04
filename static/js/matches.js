//Premier League
$.ajax({
    headers: {'X-Auth-Token': 'ad621f63eed54e48b623639a33fb6597'},
    url: 'https://api.football-data.org/v2/competitions/PL/matches?matchday=8',
    dataType: 'json',
    type: 'GET',
}).done(function (response) {
    // do something with the response, e.g. isolate the id of a linked resource
    pl.showMatches(response);
    console.log(response);
});

//Bundesliga
$.ajax({
    headers: {'X-Auth-Token': 'ad621f63eed54e48b623639a33fb6597'},
    url: 'https://api.football-data.org/v2/competitions/BL1/matches?matchday=7',
    dataType: 'json',
    type: 'GET',
}).done(function (response) {
    // do something with the response, e.g. isolate the id of a linked resource
    bundes.showMatches(response);
    console.log(response);
});

//La liga
$.ajax({
    headers: {'X-Auth-Token': 'ad621f63eed54e48b623639a33fb6597'},
    url: 'https://api.football-data.org/v2/competitions/PD/matches?matchday=8',
    dataType: 'json',
    type: 'GET',
}).done(function (response) {
    // do something with the response, e.g. isolate the id of a linked resource
    laliga.showMatches(response);
    console.log(response);
});

//Seria A
$.ajax({
    headers: {'X-Auth-Token': 'ad621f63eed54e48b623639a33fb6597'},
    url: 'https://api.football-data.org/v2/competitions/SA/matches?matchday=8',
    dataType: 'json',
    type: 'GET',
}).done(function (response) {
    // do something with the response, e.g. isolate the id of a linked resource
    seria.showMatches(response);
    console.log(response);
});

