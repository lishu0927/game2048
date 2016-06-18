/**
 * Created by ls on 2015/12/29.
 */
function showNumAnimation(i,j,randnum){
    var numCell=$("#number-cell-"+i+"-"+j);
    numCell.css('background-color',getNumBackgroundColor(randnum));
    numCell.css('color',getNumColor(randnum));
    numCell.text(randnum);
    numCell.animate({
        width:cellSlideLength,
        height:cellSlideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50)
}


function showMoveAnimation(fromx,fromy,tox,toy){
    var numCell=$("#number-cell-"+fromx+"-"+fromy);
    numCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)

}
function updateScore(){
    $('#score').text(score);
}