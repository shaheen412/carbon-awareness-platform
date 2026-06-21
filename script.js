let chart;

function calculateFootprint(){

    let car =
    parseFloat(document.getElementById("car").value) || 0;

    let electricity =
    parseFloat(document.getElementById("electricity").value) || 0;

    let flights =
    parseFloat(document.getElementById("flights").value) || 0;

    let diet =
    parseFloat(document.getElementById("diet").value);

    let transportEmission = car * 0.21;
    let electricityEmission = electricity * 0.4;
    let flightEmission = flights * 90;
    let dietEmission = diet * 100;

    let total =
        transportEmission +
        electricityEmission +
        flightEmission +
        dietEmission;

    document.getElementById("emission").innerHTML =
        "Carbon Footprint: " +
        total.toFixed(2) +
        " kg CO₂";

    let score = 100;

    if(total > 1000) score = 80;
    if(total > 2000) score = 60;
    if(total > 3000) score = 40;
    if(total > 5000) score = 20;

    document.getElementById("score").innerHTML =
        "Sustainability Score: " +
        score +
        "/100";

    document.getElementById("advisor").innerHTML =
        getAdvice(score);

    let recommendations = [];

    if(car > 20){
        recommendations.push(
            "🚲 Use public transport more often."
        );
    }

    if(electricity > 300){
        recommendations.push(
            "💡 Use energy efficient appliances."
        );
    }

    if(flights > 5){
        recommendations.push(
            "✈️ Reduce air travel where possible."
        );
    }

    if(diet > 2){
        recommendations.push(
            "🥗 Consider reducing meat consumption."
        );
    }

    if(recommendations.length === 0){
        recommendations.push(
            "🌱 Great job! Keep maintaining sustainable habits."
        );
    }

    let html = "";

    recommendations.forEach(item=>{
        html +=
        `<div class="recommendation">${item}</div>`;
    });

    document.getElementById("recommendations")
        .innerHTML = html;

    localStorage.setItem(
        "carbonFootprint",
        total
    );

    drawChart(
        transportEmission,
        electricityEmission,
        flightEmission,
        dietEmission
    );
}

function getAdvice(score){

    if(score >= 80){
        return "Excellent sustainability performance.";
    }

    if(score >= 60){
        return "Good work. Reduce electricity usage further.";
    }

    if(score >= 40){
        return "Focus on transportation emissions.";
    }

    return "High emissions detected. Immediate improvements recommended.";
}

function drawChart(
    transport,
    electricity,
    flights,
    diet
){

    const ctx =
    document.getElementById("carbonChart");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx,{
        type:'doughnut',
        data:{
            labels:[
                'Transport',
                'Electricity',
                'Flights',
                'Diet'
            ],
            datasets:[{
                data:[
                    transport,
                    electricity,
                    flights,
                    diet
                ]
            }]
        }
    });
}

function downloadReport(){

    const emission =
    document.getElementById("emission").innerText;

    const score =
    document.getElementById("score").innerText;

    const advisor =
    document.getElementById("advisor").innerText;

    const report =
`
EcoTrack AI Report

${emission}

${score}

Advisor:
${advisor}
`;

    const blob =
    new Blob([report],{
        type:"text/plain"
    });

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "EcoTrack_Report.txt";

    link.click();
}