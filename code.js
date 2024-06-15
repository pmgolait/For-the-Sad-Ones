var p5Inst = new p5(null, "sketch");

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {
    orderedKeys: [
      "550b19df-906c-4c27-96d3-bdbb544a9a5e",
      "138865ab-29f3-4417-8345-201a584572ed",
      "15e83c0b-9aca-4aa7-99c6-bad25f7017f6",
      "4e3e8f34-2e56-4bbe-aa9e-39d812ba677f",
    ],
    propsByKey: {
      "550b19df-906c-4c27-96d3-bdbb544a9a5e": {
        name: "Final_bg.png_1",
        sourceUrl:
          "assets/v3/animations/tocJtx1bUgD0Q1XQmPMxZXg23k-7bMV0IIrDwCr6yEc/final_bg.png",
        frameSize: { x: 400, y: 6000 },
        frameCount: 1,
        looping: true,
        frameDelay: 4,
        version: "E5ThUTCt_zXRqUGyvlyrsEFGSPHAAHBW",
        loadedFromSource: true,
        saved: true,
        sourceSize: { x: 400, y: 6000 },
        rootRelativePath:
          "assets/v3/animations/tocJtx1bUgD0Q1XQmPMxZXg23k-7bMV0IIrDwCr6yEc/final_bg.png",
      },
      "138865ab-29f3-4417-8345-201a584572ed": {
        name: "message.png_1",
        sourceUrl:
          "assets/v3/animations/tocJtx1bUgD0Q1XQmPMxZXg23k-7bMV0IIrDwCr6yEc/138865ab-29f3-4417-8345-201a584572ed.png",
        frameSize: { x: 400, y: 400 },
        frameCount: 1,
        looping: true,
        frameDelay: 4,
        version: "4Tf4__FPNSgnaD2XQhv8N2H3tkOiL0AG",
        loadedFromSource: true,
        saved: true,
        sourceSize: { x: 400, y: 400 },
        rootRelativePath:
          "assets/v3/animations/tocJtx1bUgD0Q1XQmPMxZXg23k-7bMV0IIrDwCr6yEc/138865ab-29f3-4417-8345-201a584572ed.png",
      },
      "15e83c0b-9aca-4aa7-99c6-bad25f7017f6": {
        name: "pre-1.PNG_1",
        sourceUrl:
          "assets/v3/animations/tocJtx1bUgD0Q1XQmPMxZXg23k-7bMV0IIrDwCr6yEc/15e83c0b-9aca-4aa7-99c6-bad25f7017f6.png",
        frameSize: { x: 405, y: 51 },
        frameCount: 1,
        looping: true,
        frameDelay: 4,
        version: "Wy4HKzX4uwSiknCnHrzv9xSBTGr.ra.2",
        loadedFromSource: true,
        saved: true,
        sourceSize: { x: 405, y: 51 },
        rootRelativePath:
          "assets/v3/animations/tocJtx1bUgD0Q1XQmPMxZXg23k-7bMV0IIrDwCr6yEc/15e83c0b-9aca-4aa7-99c6-bad25f7017f6.png",
      },
      "4e3e8f34-2e56-4bbe-aa9e-39d812ba677f": {
        name: "click_to_continue.png_1",
        sourceUrl:
          "assets/v3/animations/tocJtx1bUgD0Q1XQmPMxZXg23k-7bMV0IIrDwCr6yEc/4e3e8f34-2e56-4bbe-aa9e-39d812ba677f.png",
        frameSize: { x: 120, y: 10 },
        frameCount: 1,
        looping: true,
        frameDelay: 4,
        version: "2Lqgs_3_4vi7MpOGi_4sDGUwbQecFvsl",
        loadedFromSource: true,
        saved: true,
        sourceSize: { x: 120, y: 10 },
        rootRelativePath:
          "assets/v3/animations/tocJtx1bUgD0Q1XQmPMxZXg23k-7bMV0IIrDwCr6yEc/4e3e8f34-2e56-4bbe-aa9e-39d812ba677f.png",
      },
    },
  };
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount; 
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
        image,
        props.frameSize.x,
        props.frameSize.y,
        frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] =
        loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay =
        props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === "preload") {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
    // -----
    // MAIN CODE Starts Here

    // Declaring and initializing gameStates
    var PRE = 0;
    var PLAY = 1;
    var END = 2;
    var gameState = PRE;

    // Background Sprite
    var ground = createSprite(200, -2500, 400, 400);
    ground.setAnimation("Final_bg.png_1");

    // Pre State Message Sprites
    var pre1_message = createSprite(200, 200);
    pre1_message.setAnimation("pre-1.PNG_1");
    pre1_message.scale = 1;
    pre1_message.visible = false;
    var pre2_message = createSprite(200, 265);
    pre2_message.setAnimation("click_to_continue.png_1");
    pre2_message.scale = 2;
    pre2_message.visible = false;

    // End State Message Sprite
    var gameOver = createSprite(200, 200);
    gameOver.setAnimation("message.png_1");
    gameOver.visible = false;

    // Main character
    var ball = createSprite(380, 380, 20, 20);
    ball.shapeColor = "black";

    // Main Character's friend
    var friend = createSprite(225, 30, 20, 20);
    friend.shapeColor = "black";
    friend.visible = false;

    // Group for blocks
    var ObstaclesGroup = createGroup();

    // Background Music
    playSound("assets/music_main.mp3", true);

    // Main Function
    function draw() {
      // background
      background(rgb(157, 207, 148));

      // Condition for PRE gameState
      if (gameState === PRE) {
        background("black");
        ground.visible = false;
        pre1_message.visible = true;
        pre2_message.visible = true;

        // Condition for starting the game
        if (mousePressedOver(pre2_message)) {
          gameState = PLAY;
        }
      }

      // Creating Edges
      edges = createEdgeSprites();
      // Main character collider settings
      ball.setCollider("circle", 0, 0, 30);

      // Condition for PLAY gameState
      if (gameState === PLAY) {
        ground.visible = true;
        pre1_message.visible = false;
        pre2_message.visible = false;

        // Calling the spawnBlocks function to display blocks
        spawnBlocks();

        // Velocity and other functionalities for Ground (Background)
        ground.y = ground.y + 2;
        if (ground.y >= 2800) {
          ground.y = 2500;
        }

        // Main Character control conditions
        if (keyDown("up")) {
          ball.y = ball.y - 5;
        }
        if (keyDown("down")) {
          ball.y = ball.y + 5;
        }
        if (keyDown("right")) {
          ball.x = ball.x + 5;
        }
        if (keyDown("left")) {
          ball.x = ball.x - 5;
        }

        // To make ball bounceOff at edges
        ball.bounceOff(edges[0]);
        ball.bounceOff(edges[1]);
        ball.bounceOff(edges[2]);
        ball.bounceOff(edges[3]);

        // To make ball bounceOff blocks (obstacles)
        ObstaclesGroup.bounceOff(ball);

        // To display our friend after a certain period of time
        if (ground.y > 2400) {
          friend.visible = true;
          ball.setCollider("rectangle", 0, 0, 20, 20);
        }

        // Condition to end the game
        if (friend.visible === true && ball.isTouching(friend)) {
          gameState = END;
        }
      }

      // Condition for END gameState
      else if (gameState === END) {
        ground.visible = true;
        pre1_message.visible = false;
        pre2_message.visible = false;

        // Displaying message, destroying other stuff
        ground.velocityY = 0;
        gameOver.visible = true;
        ObstaclesGroup.destroyEach();
        ground.destroy();
        ball.destroy();
        friend.destroy();
      }

      // Display All Sprites
      drawSprites();
    }

    // Function to spawn Blocks
    function spawnBlocks() {
      if (World.frameCount % 10 === 0 && gameState === PLAY) {
        var randomX = randomNumber(10, 380);
        var randomY = randomNumber(5, 290);
        var obstacle = createSprite(randomX, randomY, 15, 15);
        obstacle.velocityY = 1;
        obstacle.setCollider("circle", 0, 0, 50);
        ObstaclesGroup.add(obstacle);

        obstacle.lifetime = 70;
      }
    }

    // -----
    // Main Code Over
    try {
      window.draw = draw;
    } catch (e) { }
    switch (stage) {
      case "preload":
        if (preload !== window.preload) {
          preload();
        }
        break;
      case "setup":
        if (setup !== window.setup) {
          setup();
        }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode("preload");
};

window.setup = function () {
  window.wrappedExportedCode("setup");
};
