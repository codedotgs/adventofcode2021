const fs = require('fs')
const lineToArray = (line) => line.split(' ').filter(char => char)
const isBingoLine = (board, numbers) => {
    const lineKeys = Object.keys(board)
    let bingo = false
    
    for (const lineKey of lineKeys) {
        const isBingo = board[lineKey].every(num => numbers.includes(num))
        
        if(isBingo) {
            bingo = board[lineKey]
            break
        }
    }
    return bingo
}
const isBingoColumn = (board, numbers) => {
    const lineKeys = Object.keys(board)
    let bingo = false
    
    for (let j=0; j<5; j++) {
        let column = []
        
        for (const lineKey of lineKeys) {
            column.push(board[lineKey][j.toString()])
        }
        
        const isBingo = column.every(num => numbers.includes(num))
        
        if (isBingo) {
            bingo = column
            break
        }
    }
    return bingo
}

const isBoardBingo = (board, numbers) => isBingoLine(board, numbers) || isBingoColumn(board, numbers)


const splitBoards = (boards) => {
    const splittedBoards = []
    const filledBoards = boards.filter(l => l.length).map(l => l.trim())
    
    for (let i=0; i<filledBoards.length; i+5) {
        const arr = filledBoards.splice(i, i+5)
        splittedBoards.push({...arr.map(line => lineToArray(line))})
    }

    return splittedBoards
}

const flattenBoard = (board) => Object.values(board).flat()

const sumOfUnmarkedNumbers = (details, numbersThrown, board) => 
    board
        .filter(number => ![...details, ...numbersThrown].includes(number))
        .map((num) => parseInt(num, 10))
        .reduce((acc, curr) => acc + curr)

const getFinalScore = (details, numbersThrown, board, lastFoundNumber) => sumOfUnmarkedNumbers(details, numbersThrown, board) * parseInt(lastFoundNumber)

//PART ONE
fs.readFile('./inputs/4.txt', 'utf-8', (err, response) => {
    if (err) throw err

    const [data, ...boards] = response.split('\n')
    const numbersToThrow = data.split(',')
    const splittedBoards = splitBoards(boards)
    const boardKeys = (Object.keys(splittedBoards))
    let numbersThrown = []
    let winningBoard
    let lastFoundNumber
    let details
    for (let i=0; i < numbersToThrow.length; i++) {
        numbersThrown.push(numbersToThrow[i])
        for (const boardKey of boardKeys) {
            const bingo = isBoardBingo(splittedBoards[boardKey], numbersThrown)
            
            if (bingo) {
                details = isBingoLine(splittedBoards[boardKey], numbersThrown) || isBingoColumn(splittedBoards[boardKey], numbersThrown)
                winningBoard = splittedBoards[boardKey]
                lastFoundNumber = numbersToThrow[i]
                break
            }
        }
        
        if (winningBoard) {
            break
        }
    }

    const result = getFinalScore(
        details,
        numbersThrown,
        flattenBoard(winningBoard),
        lastFoundNumber
    )
    
    console.log(result)
})

//PART TWO
fs.readFile('./inputs/4.txt', 'utf-8', (err, response) => {
    if (err) throw err

    const [data, ...boards] = response.split('\n')
    const numbersToThrow = data.split(',')
    const splittedBoards = splitBoards(boards)
    const boardKeys = (Object.keys(splittedBoards))
    let numbersThrown = []
    let winningBoards = []
    let lastFoundNumber
    let details
    for (let i=0; i < numbersToThrow.length; i++) {
        numbersThrown.push(numbersToThrow[i])
        for (const boardKey of boardKeys) {
            const bingo = isBoardBingo(splittedBoards[boardKey], numbersThrown)
            const hasAlreadyWon = winningBoards.includes(splittedBoards[boardKey])
            
            if (bingo && !hasAlreadyWon) {
                details = isBingoLine(splittedBoards[boardKey], numbersThrown) || isBingoColumn(splittedBoards[boardKey], numbersThrown)
                winningBoards.push(splittedBoards[boardKey])
                lastFoundNumber = numbersToThrow[i]
            }
        }
    }

    const lastBoard = winningBoards.pop()
    const lastIndex = numbersThrown.findIndex(num => num === lastFoundNumber)
    const realNumbersThrown = numbersThrown.slice(0, lastIndex)
    const result = getFinalScore(
        details,
        realNumbersThrown,
        flattenBoard(lastBoard),
        lastFoundNumber
    )
    
    console.log(result)
})