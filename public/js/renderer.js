const papa = require('papaparse');
const fs = require('fs');

const graph = (infections, prediction, labels) => {
    var ctx = document.getElementById('chart').getContext('2d');

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Infeções',
                    borderColor: '#F95959',
                    data: infections,
                    fill: false
                },
                {
                    label: 'Previsão',
                    borderColor: '#E3E3E3',
                    data: prediction,
                    borderWidth: 2,
                    borderDash: [10, 5],
                    fill: false
                },
            ]
        },
    
        // Configuration options go here
        options: {
            annotation: {
                annotations: [
                    {
                        type: "line",
                        mode: "vertical",
                        scaleID: "x-axis-0",
                        value: 17,
                        borderColor: "#455D7A",
                        borderWidth: 3,
                        borderDash: [3, 3],
                        label: {
                            content: "Declarado estado de emergência",
                            enabled: true,
                            fontFamily: 'Sen',
                            backgroundColor: '#233142',
                            position: 'bottom',
                            yAdjust: 15
                        }
                    }
                ]
            },
            legend: {
                display: true,
                labels: {
                    fontFamily: 'Sen',
                    fontWeight: 400
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontFamily: 'Sen',
                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontFamily: 'Sen',
                    },
                    gridLines: {
                        display: false
                    }
                }]
            },
            tooltips: {
                backgroundColor: '#233142',
                titleFontFamily: 'Sen',
                titleFontStyle: 'bold',
                bodyFontFamily: 'Sen',
                bodyFontStyle: 'bold',
                footerFontFamily: 'Sen',
                footerFontStyle: 'bold'
            }
        }
    });
}

let raw_data = fs.readFileSync('covid19pt-data/data.csv', 'utf-8');
let data = papa.parse(raw_data).data;

data = data.slice(6, data.length - 1);

const infections = data.map(arr => parseInt(arr[2]));

let infectionRate = infections.map((_, i) => {
    return i !== infections.length - 1 ? infections.slice(i, i+2).reduce((a, b) => {
        return Number(Math.round((1 + (b-a) / a) + 'e2') + 'e-2');
    }) : null;
});

const DAYS_FOR_AVERAGING = 2;
console.log(infectionRate)
infectionRate = infections.map((_, i) => infectionRate.slice(i-DAYS_FOR_AVERAGING, i).reduce((a, b) => a + b, 0));
infectionRate = infectionRate.map(a => Math.round(a/DAYS_FOR_AVERAGING * 1000) / 1000);
infectionRate = infectionRate.map(a => a == 0 ? null : a);
console.log(infectionRate)

const prediction = infectionRate.map((e, i) => {
    return e !== null ? Math.round(e * infections[i]) : null;
});

prediction.unshift(null);

const firstInfection = new Date('March 2 2020');

const labels = Array.apply(null, Array(infections.length + 6)).map((e, i) => {
    const tomorrow = new Date(firstInfection);
    tomorrow.setDate(tomorrow.getDate() + i);
    return `${tomorrow.getDate()}/${tomorrow.getMonth() + 1}`;
});

document.getElementById('ep_factor_value').innerHTML = `${infectionRate[Math.round(infectionRate.length - 1)]}`;
document.getElementById('ep_factor_day').innerHTML = labels[infections.length - 1]

graph(infections, prediction, labels);
