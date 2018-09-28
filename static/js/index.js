function getTodayMatchesData() {
    $.ajax({
        headers: {'X-Auth-Token': 'ad621f63eed54e48b623639a33fb6597'},
        url: 'https://api.football-data.org/v2/matches',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        // do something with the response, e.g. isolate the id of a linked resource
        showTodayMatches(response);
        console.log(response);
    });
}

function showTodayMatches(summary) {
    let matchElement = document.getElementById("todayMatchData");
    // while (matchElement.firstChild) matchElement.removeChild(matchElement.firstChild);

    for (let match of summary.matches) {
        let round = match.matchday;

        let homeTeam = match.homeTeam.name;
        let homeTeamGoals = match.score.fullTime.homeTeam;


        let awayTeamGoals = match.score.fullTime.awayTeam;
        let awayTeam = match.awayTeam.name;

        let statusShort = match.status;

        let time = match.utcDate;
        let isoDate = new Date(time).toISOString().substring(0,10);
        let isoTime = new Date(time).toISOString().substring(11,16);
        let fullTime = isoDate + ' ' + isoTime;

        let div = `
                        <tr>
                        <td>${round}</td>
                        <td>${homeTeam}</td>
                        <td>${homeTeamGoals}</td>
                        <td>${awayTeamGoals}</td>
                        <td>${awayTeam}</td>
                        <td>${fullTime}</td>
                        </tr>

            `;
        matchElement.innerHTML += div;
    }


}

getTodayMatchesData();