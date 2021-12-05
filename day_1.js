const fs = require('fs');

fs.readFile('./inputs/1.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const numbers = data.split('\n')
        .map(value => parseInt(value, 10))
    let countNormal = 0
    let countThreeMeasurements = 0

    //STEP ONE
    for(let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] < numbers[i+1]) {
            countNormal++
        }
    }

    // STEP TWO
    for(let i = 0; i < numbers.length - 2; i++) {
        const windowA = numbers[i]+numbers[i+1]+numbers[i+2]
        const windowB = numbers[i+1]+numbers[i+2]+numbers[i+3]
        if (windowA < windowB) {
            countThreeMeasurements++
        } 
    }

    console.log({
        stepOne: countNormal,
        stepTwo: countThreeMeasurements
    });
})