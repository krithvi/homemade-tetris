document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const w = 10

    // Tetrominoes
    const lTetromino = [
        [1,w+1,w*2+1,2],
        [w,w+1,w+2,w*2+2],
        [1,w+1,w*2,w*2+1],
        [w,w*2,w*2+1,w*2+2]
    ]

    const zTetromino = [
        [w+1,w+2,w*2,w*2+1],
        [1,w+1,w+2,w*2+2],
        [w+1,w+2,w*2,w*2+1],
        [1,w+1,w+2,w*2+2]
    ]

    const tTetromino = [
        [1,w,w+1,w+2],
        [1,w+1,w+2,w*2+1],
        [w,w+1,w+2,w*2+1],
        [1,w,w+1,w*2+1]
    ]

    const oTetromino = [
        [0,1,w,w+1],
        [0,1,w,w+1],
        [0,1,w,w+1],
        [0,1,w,w+1]
    ]

    const iTetromino = [
        [1,w+1,w*2+1,w*3+1],
        [w,w+1,w+2,w+3],
        [1,w+1,w*2+1,w*3+1],
        [w,w+1,w+2,w+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    console.log(theTetrominoes)

    let currentPosition = 4
    let currentRotation = 0
    let current = theTetrominoes[0][0]

    // draw the first rotation in the first tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    draw()



})