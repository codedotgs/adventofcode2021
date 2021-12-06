const fs = require('fs')

// PART ONE
fs.readFile('./inputs/6.txt', 'utf8', (err, response) => {
    if (err) throw err

    let lanternfishes = response.split(',').map(fish => parseInt(fish, 10))
    
    for (let day = 0; day < 80; day++) {
        for (let i=0; i<lanternfishes.length; i++) {
            if (lanternfishes[i] > 0) {
                lanternfishes[i]--
            } else {
                lanternfishes[i] = 6
                lanternfishes.push(9)
            }
        }
    }
    console.log({count: lanternfishes.length})
})

// PART TWO
fs.readFile('./inputs/6.txt', 'utf8', async (err, response) => {
    if (err) throw err

    let data = response.split(',').map(fish => parseInt(fish, 10))
    const aMap = new Map()

    for (let i=0; i<9; i++) {
        aMap.set(i, 0)
    }

    data.forEach((fish) => {
        const value = aMap.get(fish)
        const newValue = value ? value+1 : 1
        aMap.set(fish, newValue)
    })

    for (let day=0; day < 256; day++) {
        let newFishes = 0
        for (let currKey=0; currKey < 9; currKey++) {
            const currValue = currKey !== 7 ? aMap.get(currKey) : aMap.get(currKey, 0) + newFishes
            const nextKey = currKey-1

            if (currKey === 0) {
                newFishes = currValue
            }
            
            if (currKey > 0) {
                aMap.set(nextKey, currValue)
            }

            if (currKey < 8) {
                aMap.set(currKey, 0)
            } else {
                aMap.set(currKey, newFishes)
            }
        }
    }
    let count = [...aMap.values()].reduce((acc, curr) => acc+curr)
    console.log({count})
})