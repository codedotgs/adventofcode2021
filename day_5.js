const fs = require('fs')

const getCoversPoints = (points) => {
    const coverpoints = []
    let currX = points.x1
    let currY = points.y1
    
    const xShouldBeAsc = points.x1 < points.x2
    const yShouldBeAsc = points.y1 < points.y2
    
    do {
        coverpoints.push({x: currX, y: currY})

        if (currX !== points.x2) {
            xShouldBeAsc ? currX++ : currX--
        }

        if (currY !== points.y2) {
            yShouldBeAsc ? currY++ : currY--
        }
    } while (!coverpoints.find( (value) => value.x === points.x2 && value.y === points.y2))
    
    return coverpoints
}

const formatLine = (line) => {
    const values = line.split(' -> ').map(segment => segment.split(',')).flat()
    return {
        x1: parseInt(values[0], 10),
        y1: parseInt(values[1], 10),
        x2: parseInt(values[2], 10),
        y2: parseInt(values[3], 10),
    }
}

const toKey = (point) => `${point.x}_${point.y}`

const getDuplicates = (arr) => {
    const flattenArray = {}
    arr.forEach((values) => {
        values.forEach((value) => {
            if (flattenArray[toKey(value)]) {
                flattenArray[toKey(value)]++
            } else {
                flattenArray[toKey(value)] = 1
            }
        })
    })
    return flattenArray
}

const filterHorizontalAndVerticalLines = (line) => line.x1 === line.x2 || line.y1 === line.y2

// PART ONE
fs.readFile('./inputs/5.txt', 'utf8', (err, response) => {
    if (err) throw err

    const data = response.split('\n')
    const formattedLines = data.map(line => formatLine(line))
    const onlyHorizontalAndVerticalLines = formattedLines.filter(filterHorizontalAndVerticalLines)
    const coversPoints = onlyHorizontalAndVerticalLines.map(line => getCoversPoints(line))
    const pointsWithDuplicateScore = getDuplicates(coversPoints)
    
    const onlyDuplicates = []
    for (const keyDup of Object.keys(pointsWithDuplicateScore)) {
        if (pointsWithDuplicateScore[keyDup] > 1) {
            onlyDuplicates.push(pointsWithDuplicateScore[keyDup])
        } 
    }
    console.log(onlyDuplicates.length)
})

// PART TWO
fs.readFile('./inputs/5.txt', 'utf8', (err, response) => {
    if (err) throw err

    const data = response.split('\n')
    const formattedLines = data.map(line => formatLine(line))
    const coversPoints = formattedLines.map(line => getCoversPoints(line))
    const pointsWithDuplicateScore = getDuplicates(coversPoints)
    const onlyDuplicates = []

    for (const keyDup of Object.keys(pointsWithDuplicateScore)) {
        if (pointsWithDuplicateScore[keyDup] > 1) {
            onlyDuplicates.push(pointsWithDuplicateScore[keyDup])
        }
    }

    console.log(onlyDuplicates.length)
})