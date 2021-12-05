/*
const fs = require('fs')

const getGammaRate = (binaries, length, bitIndex) => {
    let count = 0

    for (const binary of binaries) {
        if(binary[bitIndex] === '1') {
            count++
        }

        if (count > length/2) {
            break
        }
    }

    return count > (length/2) ? '1' : '0'
}

const getEpsilonRate = (gamma) => {
    let epsilon = ''
    for (let i=0; i<gamma.length; i++) {
        epsilon += gamma[i] === '1' ? '0' : '1'
    }
    return epsilon
}


const binaryToInt = (binary) => parseInt(binary, 2)

fs.readFile('./inputs/3.txt', 'utf8', (err, response) => {
    if (err) return err

    const binaries = response.split('\n')
    let gammaRate = ''
    
    for(let bitIndex=0; bitIndex < binaries[0].length; bitIndex++) {
        gammaRate += getGammaRate(binaries, binaries.length, bitIndex)
    }

    const powerConsumption = binaryToInt(gammaRate) * binaryToInt(
        getEpsilonRate(gammaRate)
    )

    console.log(powerConsumption)
})
*/


const fs = require('fs')

const getRating = (binaries, length, bitIndex, tendency) => {
    let count = 0

    for (const binary of binaries) {
        if(binary[bitIndex] === '1') {
            count++
        }

        if (count > length/2) {
            break
        }
    } 

    if (count > (length/2)) {
        return tendency === 1 ? '1' : '0'
    } else if (count < (length/2)) {
        return tendency === 1 ? '0' : '1'
    } else {
        return tendency === 1 ? '1' : '0'
    }
    
}

const binaryToInt = (binary) => parseInt(binary, 2)

fs.readFile('./inputs/3.txt', 'utf8', (err, response) => {
    if (err) return err

    const binaries = response.split('\n')

    let o2diag = ''
    let co2diag = ''

    let cO2Rating = [...binaries]
    let o2Rating = [...binaries]

    for(let bitIndex=0; bitIndex < binaries[0].length; bitIndex++) {
        o2diag += getRating(o2Rating, o2Rating.length, bitIndex, 1)
        co2diag += getRating(cO2Rating, cO2Rating.length, bitIndex, 0)

        if (cO2Rating.length > 1) {
            cO2Rating = cO2Rating.filter((binary) => binary[bitIndex] === co2diag[bitIndex])
        }

        if (o2Rating.length > 1) {
            o2Rating = o2Rating.filter((binary) => binary[bitIndex] === o2diag[bitIndex])
        }

        if (o2Rating.length === 1 && cO2Rating.length === 1) {
            break
        }

    }

    const lifeSupportRating = binaryToInt(cO2Rating[0]) * binaryToInt(o2Rating[0])

    console.log({
        lifeSupportRating
    })
})