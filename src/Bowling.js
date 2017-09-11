"use strict";
function Bowling() {
  this.history = []
  this.points = 0
  this.status = "The game has ended."
}

Bowling.prototype.lastPlay = function() {
  return this.history[(this.history.length) - 1]
}

Bowling.prototype.roll = function(ceiling = 10) {
  return Math.ceil(Math.random()*ceiling);
};

Bowling.prototype.spare = function() {
  if(this.lastPlay()[0] + this.lastPlay()[1] === 10){
    return true
  } else { return false}
};

Bowling.prototype.strike = function() {
  if(this.lastPlay()[0] == 10){
    return true
  } else {return false}
};

Bowling.prototype.addPointsFromLastFrame = function() {
  if (this.history.length>0){
    if(this.strike()){
      console.log("First roll from previous frame was 10")
      this.points += (this.first+this.second)
    }else if(this.spare()){
      console.log("Total first + second roll from previous frame was 10")
      this.points += this.first
    }
  }
};

Bowling.prototype.firstRoll = function() {
  this.first = this.roll();
  this.second = 0;
  console.log("First roll is: " + this.first);
};

Bowling.prototype.secondRoll = function() {
  this.second = this.roll(10-this.first);
  console.log("Second roll is: " + this.second);
};

Bowling.prototype.summary = function() {
  console.log("History: " + this.history);
  console.log("Frame points: " + (this.first+this.second));
  console.log("Total points: " + this.points);
  console.log("------------------------------------");
};

Bowling.prototype.updateStrike = function() {
  this.history.push([this.first])
  this.points +=10
};

Bowling.prototype.updateNormal = function() {
  this.history.push([this.first, this.second])
  this.points += (this.first+this.second)
};

Bowling.prototype.intro = function() {
  console.log("Frame " + (this.history.length+1) + " :")
};

Bowling.prototype.start = function() {
  if(this.history.length<= 11){
    if(this.history.length<= 9 || this.strike() || this.spare()){
      this.status = "The player is rock and rolling."
      this.intro();
      this.firstRoll();
      if (this.first!==10){
        this.secondRoll();
        this.addPointsFromLastFrame();
        this.updateNormal();
      } else {
        this.updateStrike();
      }
      this.summary();
    } else {
      this.end()
    };
  }else{
    this.end()
  }
};

Bowling.prototype.reset = function() {
  this.history = []
};

Bowling.prototype.end = function() {
  this.status = "The game has ended."
  console.log(this.status)
};


player = new Bowling
player.start()



// Player.prototype.pause = function() {
//   this.isPlaying = false;
// };
//
// Player.prototype.resume = function() {
//   if (this.isPlaying) {
//     throw new Error("song is already playing");
//   }
//
//   this.isPlaying = true;
// };
//
// Player.prototype.makeFavorite = function() {
//   this.currentlyPlayingSong.persistFavoriteStatus(true);
// };



// function Player() {
// }
// Player.prototype.play = function(song) {
//   this.currentlyPlayingSong = song;
//   this.isPlaying = true;
// };
//
// Player.prototype.pause = function() {
//   this.isPlaying = false;
// };
//
// Player.prototype.resume = function() {
//   if (this.isPlaying) {
//     throw new Error("song is already playing");
//   }
//
//   this.isPlaying = true;
// };
//
// Player.prototype.makeFavorite = function() {
//   this.currentlyPlayingSong.persistFavoriteStatus(true);
// };
