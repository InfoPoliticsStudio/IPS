document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            fetch('/click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ party: button.id })
            })
            .then(response => response.json())
            .then(data => {
                updateRanking(data.ranking);
            });
        });
    });

    function updateRanking(ranking) {
        const rankingDiv = document.getElementById('ranking');
        rankingDiv.innerHTML = '';
        ranking.forEach((party, index) => {
            rankingDiv.innerHTML += `<p>${index + 1}. ${party.name}: ${party.count}</p>`;
        });
    }
});
