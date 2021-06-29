document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const highScore = document.querySelector('#high-score')
    const startBtn = document.querySelector('#start-button')
    const resetBtn = document.querySelector('#reset')
    const w = 10
    let nextRandom = 0
    let timerId
    let score = 0
    let hscore = 0

    //document.cookie = 'ppkcookie1=testcookie; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=/'

//functions for setting cookies
function setCookie(cname,cvalue,exdays) {
	if (exdays) {
		var date = new Date()
		date.setTime(date.getTime()+(exdays*24*60*60*1000))
		var expires = "; expires="+date.toGMTString()
	}
	else var expires = ""
	document.cookie = cname+"="+cvalue+expires+"; path=/"
}
function getCookie(cname) {
	var name = cname + "="
	var ca = document.cookie.split(';')
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length)
		if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length)
    }
	}
	return null;
}

//highscore cookie
var hs = getCookie("highscore")
if (hs != null) {
  hscore = Number(hs)
  highScore.innerHTML = hscore
} else {
  if (hs != "" && hs != null) {
  setCookie("highscore", hscore.toString(), 365)
  }
}

    //assigns a div for the "game over" text and appends it to the grid when the condition happens
    const gameOverTxt = document.createElement('div')
    gameOverTxt.id = 'gameover'
    grid.appendChild(gameOverTxt)
    gameOverTxt.classList.add('no-display')

    // Tetrominoes' colors
    const colors = [
        'blue',
        'red',
        'purple',
        'green',
        'orange' 
    ]

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

    let currentPosition = 4
    let currentRotation = 0

    // randomly select a Tetromino and its initial rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    // draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    // undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    // move the terominoes down every second
    //timerId = setInterval(moveDown,1000)

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
    }

    // freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + w].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // start new tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayUpNext()
            addScore()
            gameOver()
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

    // show up-next teromino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    const displayIndex = 0

    // Tetrominoes without rotations
    const upNextTetrominoes = [
        [1,displayWidth+1,displayWidth*2+1,2], //lTetromino
        [displayWidth+1,displayWidth+2,displayWidth*2,displayWidth*2+1], //zTetromino
        [1,displayWidth,displayWidth+1,displayWidth+2], //tTetromino
        [0,1,displayWidth,displayWidth+1], //oTetromino
        [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1] //iTetromino
    ]

    // display shape in mini-grid
    function displayUpNext() {
        // remove any trace of tetromino from grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex +index].classList.add('tetromino')
            displaySquares[displayIndex +index].style.backgroundColor = colors[nextRandom]
        })
    }

    // add functionality to start button
    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown,1000)
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            displayUpNext()
        }
    })

    //add functionality to the reset button
    resetBtn.addEventListener('click', () => {
        undraw()
        grid.appendChild(gameOverTxt)
        clearInterval(timerId)
        timerId = null
        for (let i = 0; i < 199; i += w) {
          const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
          row.forEach(index => {
            squares[index].classList.remove('taken')
            squares[index].classList.remove('tetromino')
            squares[index].style.backgroundColor = ''
          })
        }
        displaySquares.forEach(square => {
          square.classList.remove('tetromino')
          square.classList.remove('taken')
          square.style.backgroundColor = ''
        })
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        gameOverTxt.innerHTML = ''
        grid.removeChild(gameOverTxt)
        scoreDisplay.innerHTML = 0
    })

    // add score
    function addScore() {
        for(let i = 0; i < 199; i +=w) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i,w)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
                if(hscore<score) {
                    hscore = score
                    highScore.innerHTML = hscore
                    setCookie("highscore", hscore.toString(), 365)
                }
            }
        }
    }

    // game over
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = '-'
            grid.appendChild(gameOverTxt)
            gameOverTxt.innerHTML = '<h3>GAME OVER</h3>'
            gameOverTxt.classList.remove('no-display')
            gameOverTxt.classList.add('on-display')
            clearInterval(timerId)
            timerId = null
            for (let i = 0; i < 199; i +=w) {
                const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

})