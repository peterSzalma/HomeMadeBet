let bundes = {
        showMatches: function (summary) {
            let matchElement = document.getElementById("matchData");
            console.log(summary);
            // while (matchElement.firstChild) matchElement.removeChild(matchElement.firstChild);
            let counter = 0;
            for (let match of summary.matches) {
                let round = match.matchday;

                let homeTeam = match.homeTeam.name;
                let homeTeamGoals = match.score.fullTime.homeTeam;


                let awayTeamGoals = match.score.fullTime.awayTeam;
                let awayTeam = match.awayTeam.name;

                let statusShort = match.status;

                let time = match.utcDate;
                let isoDate = new Date(time).toISOString().substring(0, 10);
                let isoTime = new Date(time).toISOString().substring(11, 16);
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
                counter++;
                }
            }
    };

function showLeaderBoard(summary) {
    let leaderBoardElement = document.getElementById('leaderBoardData');

    for (let leader of summary.standings) {
        let leaderTotal = leader;
        for (let tableData of leaderTotal.table) {
            let position = tableData.position;

            let teamName = tableData.team.name;
            let playedGames = tableData.playedGames;
            let won = tableData.won;
            let lost = tableData.lost;
            let points = tableData.points;
            let goalsFor = tableData.goalsFor;
            let goalsAgainst = tableData.goalsAgainst;
            let goalDifference = tableData.goalDifference;

            let newDiv = `
                                <tr>
                                <td>${position}</td>
                                <td>${teamName}</td>
                                <td>${playedGames}</td>
                                <td>${won}</td>
                                <td>${lost}</td>
                                <td>${goalsFor}</td>
                                <td>${goalsAgainst}</td>
                                <td>${goalDifference}</td>
                                <td id="points">${points}</td>
                                </tr>
                    `;
            leaderBoardElement.innerHTML += newDiv;
        }
    }

}

function showScoreBoard (summary) {
    let scoreBoardElement = document.getElementById('scoreBoardData');
    console.log(summary);

    for (let scorer of summary.scorers) {
        let numberOfGoals = scorer.numberOfGoals;
        let teamName = scorer.team.name;
        let playerName = scorer.player.name;


        let newDiv = `
                    <tr>
                    <td>${playerName}</td>
                    <td>${teamName}</td>
                    <td>${numberOfGoals}</td>
                    </tr>
        `;
        scoreBoardElement.innerHTML += newDiv;
    }
}

function showRemainingMatches(summary) {
    let remainingBoarElement = document.getElementById('remainingBoardData');
    console.log(summary);

    for (let match of summary.matches) {
        let round = match.matchday;

        let homeTeam = match.homeTeam.name;

        let awayTeam = match.awayTeam.name;

        let statusShort = match.status;

        let time = match.utcDate;
        let isoDate = new Date(time).toISOString().substring(0, 10);
        let isoTime = new Date(time).toISOString().substring(11, 16);
        let fullTime = isoDate + ' ' + isoTime;

        let div = `
                            <tr>
                            <td>${round}</td>
                            <td>${homeTeam}</td>
                            <td>${awayTeam}</td>
                            <td>${statusShort}</td>
                            <td>${fullTime}</td>
                            </tr>
    
                `;
        remainingBoarElement.innerHTML += div;
    }


}

function leaderBoardEvent() {
    let leaderBoardButton = document.getElementsByClassName("rang-table");
    for (leaderButton of leaderBoardButton) {
        leaderButton.addEventListener('click', function () {
            getLeaderBoardData()
        })
    }
}

function getLeaderBoardData() {
    $.ajax({
        headers: {'X-Auth-Token': 'ad621f63eed54e48b623639a33fb6597'},
        url: 'https://api.football-data.org/v2/competitions/BL1/standings',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        // do something with the response, e.g. isolate the id of a linked resource
        showLeaderBoard(response);
        console.log(response);
    });
}

function scoreBoardEvent() {
    let scoreBoardButton = document.getElementsByClassName('score-table');
    for (scoreButton of scoreBoardButton) {
        scoreButton.addEventListener('click', function () {
            getScoreBoardData()
        })
    }

}

function getScoreBoardData() {
    $.ajax({
        headers: {'X-Auth-Token': 'ad621f63eed54e48b623639a33fb6597'},
        url: 'https://api.football-data.org/v2/competitions/BL1/scorers?limit=15',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        // do something with the response, e.g. isolate the id of a linked resource
        showScoreBoard(response);
        console.log(response);
    });
}

function remainingMatchesEvent() {
    let remainingMatchesButton = document.getElementsByClassName('remaining-table');
    for (let remainigButton of remainingMatchesButton) {
        remainigButton.addEventListener('click', function () {
            getRemainingMatchesData()
        })
    }

}

function getRemainingMatchesData() {
    $.ajax({
        headers: {'X-Auth-Token': 'ad621f63eed54e48b623639a33fb6597'},
        url: 'https://api.football-data.org/v2/competitions/BL1/matches?status=SCHEDULED',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        // do something with the response, e.g. isolate the id of a linked resource
        showRemainingMatches(response);
        console.log(response);
    });
}


scoreBoardEvent();
leaderBoardEvent();
remainingMatchesEvent();