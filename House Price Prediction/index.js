document.getElementById('submitBtn').addEventListener('click',()=>{

    let location = document.getElementById('location').value.toLowerCase().trim();

    let noBedroom=parseInt(document.getElementById('bedrooms').value);

    let sqrtFeet=parseInt(document.getElementById('sqft').value);

    let yearBuild=parseInt(document.getElementById('yearBuilt').value);


    if(error_handler(location,noBedroom,sqrtFeet,yearBuild)){
        trainModel(location,sqrtFeet,noBedroom,yearBuild);
    }
    
})

function error_handler(location, noBedroom, sqrtFeet, yearBuild) {
    const validLocations = ['chennai', 'madurai', 'trichy', 'kancheepuram'];

    // Check if location is valid
    if (!validLocations.includes(location)) {
        navigator.vibrate(200);
        const container = document.getElementById('location');
        container.classList.add('vibrate');
        setTimeout(() => {
            container.classList.remove('vibrate');
        }, 400);
        return false;
    }

    // Check if number of bedrooms is within the valid range
    if (noBedroom < 1 || noBedroom > 10 || !noBedroom) {
        navigator.vibrate(200);
        const container = document.getElementById('bedrooms');
        container.classList.add('vibrate');
        setTimeout(() => {
            container.classList.remove('vibrate');
        }, 400);
        return false;
    }

    // Check if square footage is within the valid range
    if (sqrtFeet < 200 || sqrtFeet > 1000 || !sqrtFeet) {
        navigator.vibrate(200);
        const container = document.getElementById('sqft');
        container.classList.add('vibrate');
        setTimeout(() => {
            container.classList.remove('vibrate');
        }, 400);
        return false;
    }

    // Check if building age is within the valid range
    if (yearBuild < 1 || yearBuild > 10 || !yearBuild) {
        navigator.vibrate(200);
        const container = document.getElementById('yearBuilt');
        container.classList.add('vibrate');
        setTimeout(() => {
            container.classList.remove('vibrate');
        }, 400);
        return false;
    }

    return true;
}
