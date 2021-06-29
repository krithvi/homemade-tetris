# Tetris in Space
This project is a work in progress.

Tetris is Space, true to its name, is the popular Tetris game set in the backdrop of outer space. The design and code for this was built from scratch with the help for numerous online resources during the process of learning web development.

## How-To Play
* Click `Start/Pause` button to start the game.
* Move Left/Right (Arrows: ←/→, Keys: A/D) to move Tetromino to required column. 
* Tetromino can be rushed to descend (Arrow: ↓, Key S) when in required column.
* Rotate Tetromino (Arrow: ↑, Key: W) for required rotation
### Controls:
* Rotate = ↑ / W
* Down = ↓ / S
* Left = ← / A
* Right = → / D

## Playing Grid and Tetrominoes
Construct basic grid and populate Tetrominoes' values

```js
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
```

A mini-grid beside the main grid shows the up-next Tetromino

Built with the help of [this freeCodeCamp tutorial](https://www.freecodecamp.org/news/learn-javascript-by-creating-a-tetris-game/).