/**
 * Created by ls on 2015/12/29.
 */
documentWidth=window.screen.availWidth;//当前设备的屏幕中可以使用的宽度
documentHeight=window.screen.availHeight;//当前设备的屏幕中可以使用的宽度
console.log(documentWidth);

gridContainerWidth=0.92*documentWidth;
cellSlideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;


function getPosTop(i,j){
    return cellSpace+i*(cellSlideLength+cellSpace);

}
function getPosLeft(i,j){
    return cellSpace+j*(cellSlideLength+cellSpace);
}
function getNumText(number){
    switch (number){
        case 128:return 0.4*cellSlideLength+'px';break;
        case 256:return 0.4*cellSlideLength+'px';break;
        case 512:return 0.4*cellSlideLength+'px';break;
        case 1024:return 0.3*cellSlideLength+'px';break;
        case 2048:return 0.3*cellSlideLength+'px';break;
    }
    return 0.6*cellSlideLength+'px';

}
function getNumBackgroundColor(number){
    switch (number){
        case 2:return '#eee4da';break;
        case 4:return '#eda0c8';break;
        case 8:return '#f2b179';break;
        case 16:return '#f59563';break;
        case 32:return '#f67c5f';break;
        case 64:return '#f65e3b';break;
        case 128:return '#edcf72';break;
        case 256:return '#edcc61';break;
        case 512:return '#9c0';break;
        case 1024:return '#33b5e5';break;
        case 2048:return '#09c';break;
    }
    return 'black';

}
function getNumColor(number){
    if(number<=4)
        return '#776e65';
    return 'white';
}
function nospace(border){
    for(var i=0;i<4;i++)
    for(var j=0;j<4;j++){
        if(border[i][j]==0)//遍历看是否有空元素
            return false;
    }
    return true;
}
function noBlockHorizontal(row,col1,col2,border){
    for(var j=col1+1;j<col2;j++)
        if(border[row][j]!=0)
            return false;
    return true;
}
function noBlockVertical(row1,row2,col,border){
    for(var i=row1+1;i<row2;i++)
        if(border[i][col]!=0)
            return false;
    return true;
}

function canMoveLeft(border){
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++)
            if (border[i][j]!=0)
                if(border[i][j-1]==0||border[i][j-1]==border[i][j])
                    return true;
    return false;
}
function canMoveUp(border){
    for(var i=1;i<4;i++)
        for(var j=0;j<4;j++)
            if (border[i][j]!=0)
                if(border[i-1][j]==0||border[i-1][j]==border[i][j])
                    return true;
    return false;
}

function canMoveRight(border){
    for(var i=0;i<4;i++)
        for(var j=0;j<3;j++)
            if (border[i][j]!=0)
                if(border[i][j+1]==0||border[i][j+1]==border[i][j])
                    return true;
    return false;
}

function canMoveDown(border){
    for(var i=0;i<3;i++)
        for(var j=0;j<4;j++)
            if (border[i][j]!=0)
                if(border[i+1][j]==0||border[i+1][j]==border[i][j])
                    return true;
    return false;
}

function nomove(border){
    if(canMoveLeft(border)||canMoveDown(border)||
        canMoveRight(border)||canMoveUp(border))
    return false;

    return true;
}