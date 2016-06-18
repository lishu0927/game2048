/**
 * Created by ls on 2015/12/29.
 */
var border=new Array();
var score=0;
var hasConflicted=new Array();

$(document).ready(function(){
    prepareForMobile();
    newgame();
});
function prepareForMobile(){
    if(documentWidth>480){
        gridContainerWidth=450;
        cellSlideLength=100;
        documentHeight=480;
        cellSpace=10;
    }
    $('#grid-container').css('width',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('margin-top',0.06*documentHeight);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSlideLength);
    $('.grid-cell').css('height',cellSlideLength);
    $('.grid-cell').css('border-radius',0.06*cellSlideLength);
}
function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();//在随机的两个格子生产数字
    score=0;
    updateScore();
}
function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridcell=$("#grid-cell-"+i+"-"+j);
            gridcell.css('top',getPosTop(i,j));
            gridcell.css('left',getPosLeft(i,j));
        }
    }
    for(var i=0;i<4;i++){
        border[i]=new Array();
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++)
        border[i][j]=0;
        hasConflicted[i][j]=false;
    }
    updateBorderView();
    score=0;
}
function updateBorderView(){
    $('.number-cell').remove();
    for(var i=0;i<4;i++ )
        for(var j=0;j<4;j++ ){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
            var theNumCell=$("#number-cell-"+i+"-"+j);
            if(border[i][j]==0){
                theNumCell.css('width','0px');
                theNumCell.css('height','0px');
                theNumCell.css('top',getPosTop(i,j)+cellSlideLength/2);
                theNumCell.css('left',getPosLeft(i,j)+cellSlideLength/2);
            }else {
                theNumCell.css('width',cellSlideLength);
                theNumCell.css('height',cellSlideLength);
                theNumCell.css('top',getPosTop(i,j));
                theNumCell.css('left',getPosLeft(i,j));
                theNumCell.css('border-radius',0.06*cellSlideLength);
                theNumCell.css('background-color',getNumBackgroundColor(border[i][j]));
                theNumCell.css('font-size',getNumText(border[i][j]));
                theNumCell.css('color',getNumColor(border[i][j]));
                theNumCell.text(border[i][j]);
            }
            hasConflicted[i][j]=false;

        }
    $('.number-cell').css('line-height',cellSlideLength+'px');
}

function generateOneNumber(){
    if(nospace(border))
        return false;
    //随机生产一个位置
    var randposX=parseInt(Math.floor(Math.random()*4));
    var randposY=parseInt(Math.floor(Math.random()*4));
    var times=0;
    while (times<50){
        if(border[randposX][randposY]==0)
            break;
        randposX=parseInt(Math.floor(Math.random()*4));
        randposY=parseInt(Math.floor(Math.random()*4));
        times++;
    }
    if(times==50){
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++){
                if(border[i][j]==0){
                    randposX=i;
                    randposY=j;
                }
            }
    }
    //随机生产一个数
    var randnum=Math.random()<0.8?2:4;
    //随机位置显示随机数字
    border[randposX][randposY]=randnum;
    showNumAnimation(randposX,randposY,randnum);
    updateBorderView();
    return true;
}
$(document).keydown(function(event){
    switch (event.keyCode){
        case 37:
            event.preventDefault();
            if(moveLeft()){
                setTimeout(generateOneNumber(),210);
                setTimeout("isGameOver()",300);
        }
            break;
        case 38:
            event.preventDefault();
            if(moveUp()){
                setTimeout(generateOneNumber(),210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39:
            event.preventDefault();
            if(moveRight()){
                setTimeout(generateOneNumber(),210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40:
            event.preventDefault();
            if(moveDown()){
                setTimeout(generateOneNumber(),210);
                setTimeout("isGameOver()",300);
            }
            break;
        default: //default
            break;
    }
});
function isGameOver(){
    if(nospace(border)&&nomove(border)){
        gameover();
    }
}
function gameover(){
    alert("gameover!");
}
function moveLeft(){
    if(!canMoveLeft(border))
        return false;
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++)
            if (border[i][j]!=0){
                for(var k=0;k<j;k++) {
                    if (border[i][k]==0&& noBlockHorizontal(i,k,j,border)) {
                        //move
                        showMoveAnimation(i,j,i,k);
                        border[i][k]=border[i][j];
                        border[i][j]=0;
                        continue;
                    }else if(border[i][k]==border[i][j]&& noBlockHorizontal(i,k,j,border)&&!hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        border[i][k]+=border[i][j];
                        border[i][j]=0;
                        score+=border[i][k];
                        updateScore();
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
    setTimeout('updateBorderView()',200);
    return true;
}
function moveUp(){
    if(!canMoveUp(border))
        return false;
    for(var i=1;i<4;i++)
        for(var j=0;j<4;j++)
            if (border[i][j]!=0){
                for(var k=0;k<i;k++) {
                    if (border[k][j]==0&& noBlockVertical(k,i,j,border)) {
                        //move
                        showMoveAnimation(i,j,k,j);
                        border[k][j]=border[i][j];
                        border[i][j]=0;
                        continue;
                    }else if(border[k][j]==border[i][j]&& noBlockVertical(k,i,j,border)&&!hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        border[k][j]+=border[i][j];
                        border[i][j]=0;
                        score+=border[k][j];
                        updateScore();
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
    setTimeout('updateBorderView()',200);
    return true;
}
function moveRight(){
    if(!canMoveRight(border))
        return false;
    for(var i=0;i<4;i++)
        //for(var j=0;j<3;j++)
        for(var j=2;j>=0;j--)
            if (border[i][j]!=0){
                for(var k=3;k>j;k--) {
                    if (border[i][k]==0&& noBlockHorizontal(i,j,k,border)) {
                        //move
                        showMoveAnimation(i,j,i,k);
                        border[i][k]=border[i][j];
                        border[i][j]=0;
                        continue;
                    }else if(border[i][k]==border[i][j]&& noBlockHorizontal(i,j,k,border)&&!hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        border[i][k]+=border[i][j];
                        border[i][j]=0;
                        score+=border[i][k];
                        updateScore();
                        hasConflicted[i][k]=true;
                        continue;
                    }
                }
            }
    setTimeout('updateBorderView()',200);
    return true;
}
function moveDown(){
    if(!canMoveDown(border))
        return false;
    for(var i=2;i>=0;i--)
        for(var j=0;j<4;j++)
            if (border[i][j]!=0){
                for(var k=3;k>i;k--) {
                    if (border[k][j]==0&& noBlockVertical(i,k,j,border)) {
                        //move
                        showMoveAnimation(i,j,k,j);
                        border[k][j]=border[i][j];
                        border[i][j]=0;
                        continue;
                    }else if(border[k][j]==border[i][j]&& noBlockVertical(i,k,j,border)&&!hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        border[k][j]+=border[i][j];
                        border[i][j]=0;
                        score+=border[k][j];
                        updateScore();
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
    setTimeout('updateBorderView()',200);
    return true;
}

