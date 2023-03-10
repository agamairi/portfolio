window.addEventListener('load', function(){
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    let enemies = [];
    let score = 0;
    let gameOver = false;


    class InputHandler{
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e =>{
                    if ((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp'||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight')
                     && this.keys.indexOf(e.key) === -1){
                        this.keys.push(e.key);
                    }
             }); 
             window.addEventListener('keyup', e =>{
                if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp'||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight')){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
         }); 
         console.log(this.keys);
        }
    }

    class Player{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.maxFrame = 8;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImg');
            this.frameX = 0;
            this.frameY = 0;
            this.speed= 0;
            this.vy = 0;
            this.weight = 1;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            
        }

        draw(context){
            //context.fillStyle ='white';
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(this.x+this.width/2, this.y+this.height/2, this.width/2, 0, Math.PI*2); 
            context.stroke();
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

        }

        update(input, deltaTime, enemies){
            // calculation of collisions detection 
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
                const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < enemy.width/2 + this.width/2){
                    gameOver = true;
                }
            })
            // Animation of the character
            if(this.frameTimer >= this.frameInterval){
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            }
            else{
                this.frameTimer+= deltaTime;
            }


            // controls
            if(input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
            }
            else if(input.keys.indexOf('ArrowLeft') > -1){
                this.speed = -5;
            }
            else  if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                this.vy -=25;
            }
            else{
                this.speed = 0;
            }
            
            // Horizontal movement 
            this.x += this.speed;
            // horizontal boundary
            if(this.x < 0) this.x = 0;
            else if(this.x> this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            // Vertical movement
            this.y += this.vy;
            if(!this.onGround()){
                this.vy += this.weight;
                this.maxFrame = 5;
                this.frameY = 1;
                
            }
            else{
                this.vy = 0;
                this.maxFrame = 8;
                this.frameY =0;
            }
            // vertical boundary
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
            
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Background{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backGround');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 5;
        }

        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }

        update(){
            this.x -=this.speed;
            if(this.x < 0  - this.width) this.x = 0;

        }
    }

    class Enemy{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById('enemyImg');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 6;
            this.deleteEnemy = false;
        }

        draw(context){
            context.beginPath();
            context.arc(this.x+this.width/2, this.y+this.height/2, this.width/2, 0, Math.PI*2); 
            context.stroke();
            context.drawImage(this.image, this.frameX*this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        update(deltaTime){
            if(this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            }
            else{
                this.frameTimer += deltaTime;
            }

            this.x -= this.speed;
            if(this.x < 0 - this.width){
                this.deleteEnemy = true;
                score++; 
            } 

        }
    }

    function handleEnemies(deltaTime){


        if(enemyTimer > enemySpawnInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTimer = 0;
        }
        else{
            enemyTimer += deltaTime;
        }

        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        })
        enemies = enemies.filter(enemy => !enemy.deleteEnemy);
    }

    function GameUI(context) {
        context.fillStyle = 'black';
        context.font = '24px Helvetica';
        context.fillText('Points: ' + score, 20, 50);
        if(gameOver){
            context.fillStyle = 'white';
            context.font = '24px Helvetica';
            context.fillText('GAME OVER, YOUR SCORE: ' + score, 139, 175);
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const bg = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemySpawnInterval = 2000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        console.log(deltaTime);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bg.draw(ctx);
        //bg.update();
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        GameUI(ctx);

        if(!gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});