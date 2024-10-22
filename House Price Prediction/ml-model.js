
let predicted_values =[];

function encodeLocation(location) {

    // Encoding locations as numeric values

    const locations = ['chennai', 'madurai','trichy','kancheepuram'];

    return locations.indexOf(location);

}

function generateSyntheticData(numSamples, locationindex, locationBedroomPrice, locationSquareFeetPrice, locationAgePrice) {

    const locations = ['chennai', 'madurai','trichy','kancheepuram'];

    const data = [];

    for (let i = 0; i < numSamples; i++) {
        const location = locations[locationindex];
        const bedrooms = Math.floor(Math.random() * 10) + 1;
        const squareFeet = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
        const buildingAge = Math.floor(Math.random() * 10) + 1;

        // Simulated price based on these factors + some noise
        const price = (bedrooms * locationBedroomPrice) + (squareFeet * locationSquareFeetPrice) - (buildingAge * locationAgePrice)
            + (Math.random() * 20000 - 10000);  // Adding random noise to simulate fluctuations

        const encodedLocation = encodeLocation(location); // Encoding location

        data.push({ location, bedrooms, squareFeet, buildingAge, price, encodedLocation });
    }

    return data;
}

function trainModel(location, sqrtfeet, noBedroom, buildAge) {

    let data;
    let currPrice = 0;

    // Generate data based on location
    if (location === 'chennai') {

        data = generateSyntheticData(10, 0, 5000, 3500, 10000);

        currPrice = (noBedroom * 5000) + (sqrtfeet * 3500) - (buildAge * 10000);

    } else if(location==='madurai') {

        data = generateSyntheticData(10, 1, 3000, 1500, 7000);

        currPrice = (noBedroom * 3000) + (sqrtfeet * 1500) - (buildAge * 7000);

    }else if(location ==='trichy'){

        data = generateSyntheticData(10, 1, 3000, 1500, 7000);

        currPrice = (noBedroom * 3000) + (sqrtfeet * 1500) - (buildAge * 7000);

    }else{
        
        data = generateSyntheticData(10, 1, 3000, 1500, 7000);

        currPrice = (noBedroom * 3000) + (sqrtfeet * 1500) - (buildAge * 7000);

    }


    // Prepare the dataset for regression model

    let inputs = [];
    let outputs = [];

    data.forEach(item => {
        inputs.push(item.squareFeet); // Using square footage as the main predictor for simplicity
        outputs.push(item.price);
    });



    const regression = ss.linearRegression(inputs.map((input, index) => [input, outputs[index]]));

    const regressionLine = ss.linearRegressionLine(regression);

   

    predicted_values.push(currPrice);

    for (let i = 1; i <= 10; i++) {
        const futureYear = 2024 + i;  // Simulating future years
        // Add a random fluctuation to make the price change unpredictably

        let randomFluctuation = (Math.random() - 0.5) * 0.1; // Random value between -5% and +5%

        let futurePrice = regressionLine(sqrtfeet) * (1 + randomFluctuation); 

        predicted_values.push(futurePrice.toFixed(0));
    }

    localStorage.setItem('result_values', JSON.stringify(predicted_values));

    window.location.href='prediction-page/index.html';

    
}
