$.ajax({
    headers: {'X-Auth-Token': 'ad621f63eed54e48b623639a33fb6597'},
    url: 'https://api.football-data.org/v2/competitions/PL/matches?matchday=7',
    dataType: 'json',
    type: 'GET',
}).done(function (response) {
    // do something with the response, e.g. isolate the id of a linked resource
    dom.showMatches(response);
    console.log(response);
});