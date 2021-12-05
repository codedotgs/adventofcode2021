const fs = require('fs')

const updatePosition = (positionToUpdate, newPosition) => {
    switch(newPosition.arrow) {
        case 'forward':
            positionToUpdate.x += newPosition.step
            if (positionToUpdate.aim > 0) {
                positionToUpdate.y += (newPosition.step * positionToUpdate.aim)
            }
            break
        case 'down':
            // positionToUpdate.y += newPosition.step
            positionToUpdate.aim += newPosition.step
            break
        case 'up':
            // positionToUpdate.y -= newPosition.step
            positionToUpdate.aim -= newPosition.step
            break
    }
    return positionToUpdate
}

fs.readFile('./inputs/2.txt', 'utf8', (err, response) => {
    if (err) throw err
    
    const data = response.split('\n').map((move) => {
        const [arrow, step] = move.split(' ')   
        return { arrow, step: parseInt(step, 10) }
    })
    let position = { x:0, y:0, aim:0 }
    data.forEach((move) => {
        position = updatePosition(position, move)
    })

    result = position.x * position.y
    console.log({position, result})
    return result
})