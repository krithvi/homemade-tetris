# Home-made Tetris

## How-To Play
* Move Left/Down to place Tetromino in required position. 
* Rotate Tetromino for required rotation
### Controls:
* Rotate = UpArrow / W
* Down = DownArrow / S
* Left = LeftArrow / A
* Right = RightArrow / D

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

Built with the help of [this freeCodeCamp tutorial](https://www.freecodecamp.org/news/learn-javascript-by-creating-a-tetris-game/).