document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const w = 10

    console.log(grid)

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

    // randomly select a Tetromino and its initial rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    // draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    // undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    // move the terominoes down every second
    timerId = setInterval(moveDown,1000)

    // assign functions to keyCodes
    function control(e) {
        if(e.keyCode === 37 || e.keyCode === 65 ) {
            moveLeft()
        } else if(e.keyCode === 38 || e.keyCode === 87 ) {
            rotate()
        } else if(e.keyCode === 39 || e.keyCode === 68 ) {
            moveRight()
        } else if(e.keyCode === 40 || e.keyCode === 83 ) {
            moveDown()
        }
    }

    // control event listener
    document.addEventListener('keyup', control)

    // move down function
    function moveDown() {
        undraw()
        currentPosition += w
        draw()
        freeze()
        console.log(current)
    }

    // freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + w].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // start new tetromino falling
            random = Math.floor(Math.random()*theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    // move tetromino left unless edge or is blocked
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % w === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }

        draw()
    }

    // move tetromino right unless edge or is blocked
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % w === w-1)

        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }

        draw()
    }


    // rotate the tetromino
    function rotate() {
        undraw()
        currentRotation++
        if(currentRotation === current.length) { //if current rotation gets to end of array, make it go back to 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }


})