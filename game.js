var buttonColors=["red", "blue", "green", "yellow"];
var game_pattern=[];
var userClickpattern=[];
var level=0;
var started=false;
$(document).on("keypress",function()
{
  if(started==false)
  {
    nextSequence();
    started=true;
  }
});
$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickpattern.push(userChosenColour);

  playSound(userChosenColour);

  animatepress(userChosenColour);

  checkAnswer(userClickpattern.length-1);
});
function nextSequence()
{
  userClickpattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var rand_num=Math.floor(Math.random()*4);
  var rand_chosen_color=buttonColors[rand_num];

  game_pattern.push(rand_chosen_color);

  var element_tag="#"+rand_chosen_color;

  $(element_tag).fadeOut(100).fadeIn(100);

  playSound(rand_chosen_color);
  animatepress(rand_chosen_color);
}
function checkAnswer(currentLevel)
{
    if(userClickpattern[currentLevel] === game_pattern[currentLevel])
    {
      if(userClickpattern.length === game_pattern.length)
      {
          setTimeout(function(){
          nextSequence()},700)
      }
    }
    else
    {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
      $("body").removeClass("game-over");
      },200)
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}
function startOver()
{
  level=0;
  game_pattern=[];
  started=false;
}
function playSound(name)
{
  var location="sounds/"+name+".mp3";
  var audio=new Audio(location);
  audio.play();
}
function animatepress(currentcolor)
{
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
      $("#"+currentcolor).removeClass("pressed");
  },100)
}
