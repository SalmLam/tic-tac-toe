

export const checkEndOfGame = async (board : number[] ) => {
    const winningPositions = [
        [0,1,2], [3,4,5], [6,7,8],
        [1,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (const position of winningPositions) {
        if (board[position[0]] == board[position[1]] 
            && board[position[1]] == board[position[2]] 
            && board[position[2]] != 0) {
                return board[position[2]];
            }
    }
    return 0;   

}
