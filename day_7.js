const fs = require('fs')

const findLeastMove = (numbers, expensive) => {
    const fuels = []
    const min = Math.min(...numbers)
    const max = Math.max(...numbers)
    const fillers = filler(min, max)
    
    fillers.forEach((value) => {
        const result = numbers.map((num) => {
            const distingo = value >= num ? value - num : num - value
            return expensive ? taxes(distingo) : distingo
        })
        const fuel = result.reduce((acc, curr) => acc+curr)
        fuels.push(fuel)
    })

    return Math.min(...fuels)
}

const filler = (min, max) => {
    let fillers = []
    for (let i=min; i<max; i++) {
        fillers.push(i)
    }
    return fillers
}

const taxes = (n) => n*(n+1)/2

fs.readFile('./inputs/7.txt', 'utf8', (err, response) => {
    if (err) throw err

    const data = response.split(',').map(num => parseInt(num, 10))
    
    // PART ONE
    const partOne = findLeastMove(data, false)
    
    // PART TWO
    const partTwo = findLeastMove(data, true)
    
    console.log({partOne, partTwo})
})