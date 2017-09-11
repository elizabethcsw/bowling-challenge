describe("Bowling", function() {
  var player;

  beforeEach(function() {
    player = new Bowling();
  });

  it("should be able to knock down some pins", function() {
    expect(player.roll()).toBeLessThan(11);
  });

  it("should be able to knock down 5 pins", function() {
    player.roll = jasmine.createSpy("roll() spy").and.callFake(function() {
      console.log("Hello from roll()");
      return 5;
    });
    expect(player.roll()).toEqual(5);
  });

  it("should be able to knock down 8 pins", function() {
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(8);
    expect(player.roll()).toEqual(8);
  });

  it("should be able to record the first roll", function() {
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(8);
    player.firstRoll();
    player.updateNormal();
    expect(player.history).toEqual([[8,0]]);
  });

  it("should be able to record the first and second roll", function() {
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(8);
    player.firstRoll();
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(1);
    player.secondRoll();
    player.updateNormal();
    expect(player.history).toEqual([[8,1]]);
  });

  it("knows when there is a strike", function() {
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(10);
    player.firstRoll();
    player.updateNormal();
    expect(player.strike()).toBeTruthy();
  });

  it("knows when there is a spare", function() {
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(8);
    player.firstRoll();
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(2);
    player.secondRoll();
    player.updateNormal();
    expect(player.spare()).toBeTruthy();
  });

  it("can be reset", function(){
    player.firstRoll();
    player.updateNormal();
    player.reset();
    expect(player.history).toEqual([]);
  })

  it("add points if last frame was a strike", function(){
    player.history = [[10]];
    player.points = 10;
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(8);
    player.firstRoll();
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(2);
    player.secondRoll();
    player.addPointsFromLastFrame();
    player.updateNormal();
    expect(player.points).toEqual(30);
  })

  it("add points if last frame was a spare", function(){
    player.history = [[2,8]];
    player.points = 10;
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(6);
    player.firstRoll();
    player.addPointsFromLastFrame();
    player.updateNormal();
    expect(player.points).toEqual(22);
  })

  it("add 10 points when this frame is a strike", function() {
    player.roll = jasmine.createSpy("roll() spy").and.returnValue(10);
    player.firstRoll();
    player.updateStrike();
    expect(player.points).toEqual(10);
  });

  it("starts the game not more than 10 times if the last frame is not a strike nor spare", function() {
    player.history = [[10],[10],[10],[10],[10],[10],[10],[10],[10],[1,1]];
    player.start();
    expect(player.status).toEqual("The game has ended.");
  });

  it("plays the 11th frame if the 10th frame is a strike", function() {
    player.history = [[10],[10],[10],[10],[10],[10],[10],[10],[10],[10]];
    player.start();
    expect(player.status).toEqual("The player is rock and rolling.");
  });

  it("plays the 12th frame if the 11thframe is a spare", function() {
    player.history = [[10],[10],[10],[10],[10],[10],[10],[10],[10],[10],[2,8]];
    player.start();
    expect(player.status).toEqual("The player is rock and rolling.");
  });


});

  // it("should be able to knock down some pins", function() {
  //   player.roll();
  //   expect(player.history).toEqual([]);
  //   player.roll = jasmine.createSpy("roll() spy").andReturn(5);
  //
  // });



//   describe("when song has been paused", function() {
//     beforeEach(function() {
//       player.play(song);
//       player.pause();
//     });
//
//     it("should indicate that the song is currently paused", function() {
//       expect(player.isPlaying).toBeFalsy();
//
//       // demonstrates use of 'not' with a custom matcher
//       expect(player).not.toBePlaying(song);
//     });
//
//     it("should be possible to resume", function() {
//       player.resume();
//       expect(player.isPlaying).toBeTruthy();
//       expect(player.currentlyPlayingSong).toEqual(song);
//     });
//   });
//
//   // demonstrates use of spies to intercept and test method calls
//   it("tells the current song if the user has made it a favorite", function() {
//     spyOn(song, 'persistFavoriteStatus');
//
//     player.play(song);
//     player.makeFavorite();
//
//     expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
//   });
//
//   //demonstrates use of expected exceptions
//   describe("#resume", function() {
//     it("should throw an exception if song is already playing", function() {
//       player.play(song);
//
//       expect(function() {
//         player.resume();
//       }).toThrowError("song is already playing");
//     });
//   });
// });









//
//
//
//
//
// describe("Bowling", function() {
//   var player;
//   var song;
//
//   beforeEach(function() {
//     player = new Player();
//     song = new Song();
//   });
//
//   it("should be able to play a Song", function() {
//     player.play(song);
//     expect(player.currentlyPlayingSong).toEqual(song);
//
//     //demonstrates use of custom matcher
//     expect(player).toBePlaying(song);
//   });
//
//   describe("when song has been paused", function() {
//     beforeEach(function() {
//       player.play(song);
//       player.pause();
//     });
//
//     it("should indicate that the song is currently paused", function() {
//       expect(player.isPlaying).toBeFalsy();
//
//       // demonstrates use of 'not' with a custom matcher
//       expect(player).not.toBePlaying(song);
//     });
//
//     it("should be possible to resume", function() {
//       player.resume();
//       expect(player.isPlaying).toBeTruthy();
//       expect(player.currentlyPlayingSong).toEqual(song);
//     });
//   });
//
//   // demonstrates use of spies to intercept and test method calls
//   it("tells the current song if the user has made it a favorite", function() {
//     spyOn(song, 'persistFavoriteStatus');
//
//     player.play(song);
//     player.makeFavorite();
//
//     expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
//   });
//
//   //demonstrates use of expected exceptions
//   describe("#resume", function() {
//     it("should throw an exception if song is already playing", function() {
//       player.play(song);
//
//       expect(function() {
//         player.resume();
//       }).toThrowError("song is already playing");
//     });
//   });
// });
