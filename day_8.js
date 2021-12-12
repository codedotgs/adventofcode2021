const fs = require('fs')

const getTheSeven = (str) => str.length === 3
const getTheOne = (str) => str.length === 2
const getTheFour = (str) => str.length === 4
const getTheEight = (str) => str.length === 7
const getSixSegments = (str) => str.length === 6
const getA = (one, seven) => {
    for (let i=0; i<seven.length; i++) {
        if (!one.includes(seven[i])) {
            return seven[i]
        }
    }
}
// CF === One
const getC = (sixSegments, segmentCF) => {
    let c = ''
    sixSegments.forEach((sixSegment) => {
        segmentCF.forEach((cOrF) => {
            if (!sixSegment.includes(cOrF)) {
                c = cOrF
            }
        })
    })
    return c
}
const getF = (c, one) => one.filter(char => char !== c)[0]
const getBD = (one, four) => {
    const bd = [] 
    for (let i=0; i< four.length; i++) {
        if (!one.includes(four[i])) {
            bd.push(four[i])
        }
    }
    return bd
}
const getD = (sixSegments, segmentBD) => {
    let d = ''
    sixSegments.forEach((sixSegment) => {
        segmentBD.forEach((bOrD) => {
            if (!sixSegment.includes(bOrD)) {
                d = bOrD
            }
        })
    })
    return d
}
const getB = (d, bd) => bd.filter(char => char !== d)[0]
const getEG = (zero, ...abcf) => zero.split('').filter(letter => !abcf.includes(letter))
const getTheZero = (sixSegments, segmentBD) => {
    let zero = ''
    sixSegments.forEach((sixSegment) => {
        let includesBD = segmentBD.every((bOrD) => sixSegment.includes(bOrD))
        if (!includesBD) {
            zero = sixSegment
        }
    })
    return zero
}
const getTheSix = (sixSegments, maybeC) => {
    let six = ''
    sixSegments.forEach((sixSegment) => {
        if (!sixSegment.includes(maybeC)) {
            six = sixSegment
        }
    })
    return six
}
const getTheNine = (sixSegments, ...zeroAndSix) => sixSegments.filter(sixSegment => !zeroAndSix.includes(sixSegment))[0]
const getE = (nine, eOrG) => eOrG.filter(letter => !nine.includes(letter)).pop()
const getG = (eg, e) => eg.filter(letter => letter !== e).pop()

const getTheNumber = (number, mapLetters, trueWireSegments, uniqueSinglePatterns) => {
    const originalSegment = trueWireSegments[number]
    const lettersFromSegment = originalSegment.map((letter) => mapLetters.get(letter))
    return uniqueSinglePatterns.filter((uniqueSinglePattern) => {
        if (lettersFromSegment.length === uniqueSinglePattern.length) {
            return lettersFromSegment.every(
                letter => uniqueSinglePattern.includes(letter)
            )
        }
    }).pop()
}
const getOutputNumber = (outputStr, mapNumbers) => [...mapNumbers.entries()]
    .filter(
        ([, str]) => str.length === outputStr.length && outputStr.split('').every(letter => str.includes(letter))
    ).pop()[0]
const getValidNumbers = (str) => getTheSeven(str) || getTheOne(str) || getTheFour(str) || getTheEight(str)


const trueWireSegments = {
    0: ['a', 'b', 'c', 'e', 'f', 'g'],
    1: ['c', 'f'],
    2: ['a', 'c', 'd', 'e', 'g'],
    3: ['a', 'c', 'd', 'f', 'g'],
    4: ['b', 'c', 'd', 'f'],
    5: ['a', 'b', 'd', 'f', 'g'],
    6: ['a', 'b', 'd', 'e', 'f', 'g'],
    7: ['a', 'c', 'f'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['a', 'b', 'c', 'd', 'f', 'g'],
}

/**
 *   
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
*/

fs.readFile('./inputs/8.txt', 'utf8', (err, response) => {
    if (err) throw err

    

    let partOne = 0
    const data = response.split('\n').map((line, index) => {
        const [patterns, outputValue] = line.split(' | ')
        const mapLetters = new Map()
        const mapNumbers = new Map()
        const sixSegments = []

        // PART ONE
        outputValue.split(' ').forEach((outputStr) => {
            if (getValidNumbers(outputStr)) {
                partOne++
            }
        })

        // PART TWO
        const uniqueSinglePatterns = patterns.split(' ')
        uniqueSinglePatterns.forEach((uniquePattern) => {
            if (getTheOne(uniquePattern)) {
                mapNumbers.set(1, uniquePattern)
            }
            
            if (getTheFour(uniquePattern)) {
                mapNumbers.set(4, uniquePattern)
            }
            
            if (getTheSeven(uniquePattern)) {
                mapNumbers.set(7, uniquePattern)
            }

            if (getTheEight(uniquePattern)) {
                mapNumbers.set(8, uniquePattern)
            }

            if (getSixSegments(uniquePattern)) {
                sixSegments.push(uniquePattern)
            }
        })

        const segmentA = getA(mapNumbers.get(1), mapNumbers.get(7))
        mapLetters.set('a', segmentA)
        const segmentBD = getBD(mapNumbers.get(7), mapNumbers.get(4))
        const segmentCF = mapNumbers.get(1).split('')
        const segmentC = getC(sixSegments, segmentCF)
        mapLetters.set('c', segmentC)
        const segmentF = getF(segmentC, segmentCF)
        mapLetters.set('f', segmentF)
        const segmentD = getD(sixSegments, segmentBD)
        mapLetters.set('d', segmentD)
        const segmentB = getB(segmentD, segmentBD)
        mapLetters.set('b', segmentB)
        const zero = getTheZero(sixSegments, segmentBD)
        mapNumbers.set(0, zero)
        const segmentEG = getEG(zero, segmentA, segmentB, segmentC, segmentF)
        const six = getTheSix(sixSegments, segmentC)
        mapNumbers.set(6, six)
        const nine = getTheNine(sixSegments, zero, six)
        mapNumbers.set(9, nine)
        const segmentE = getE(nine, segmentEG)
        mapLetters.set('e', segmentE)
        const segmentG = getG(segmentEG, segmentE)
        mapLetters.set('g', segmentG)

        

        const two = getTheNumber(2, mapLetters, trueWireSegments, uniqueSinglePatterns)
        mapNumbers.set(2, two)
        const three = getTheNumber(3, mapLetters, trueWireSegments, uniqueSinglePatterns)
        mapNumbers.set(3, three)
        const five = getTheNumber(5, mapLetters, trueWireSegments, uniqueSinglePatterns)
        mapNumbers.set(5, five)

        const output = outputValue.split(' ').map((outputStr) => getOutputNumber(outputStr, mapNumbers)).join('')
    
        return parseInt(output, 10)
    })

    const partTwo = data.reduce((acc, curr) => acc+curr)
    console.log({partOne, partTwo})
})