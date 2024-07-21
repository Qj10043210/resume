class elevator{
    constructor(level, canvas, mains,imgs){
        this.viewHeight = window.innerHeight;
        this.viewWidth = window.innerWidth;
        this.level = level;
        this.eachsize = this.viewHeight / this.level.length
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');        
        this.currentlevel = 0.1;
        this.imgs = imgs;
        this.lineSetting = {
            lineHeight : 15
        ,lineWidth : 8
        ,lineSpace : 3
        ,skewX : 0
        ,skewY : -0.4,
        imgX:10
        };
        this.charSetting = {
            charX : 0,
            charY : 0,
            charW : 0,
            charH : 0,
            charOn : true,
        };
        this.chatSetting = {
            size : 85,
            font : 18
        }
        this.updateSize(mains);
    }

    updateSize(doc=null){
        console.log("초기화1", this.currentlevel)
        
        this.viewHeight = window.innerHeight;
        document.documentElement.style.setProperty('--custom-inner-height',`${this.viewHeight}px`);
        this.eachsize = this.viewHeight / this.level.length
        this.canvas.height = this.viewHeight;
        this.canvas.width = 100;
        if(window.innerWidth<700){
            this.viewWidth = window.innerWidth;
            document.documentElement.style.setProperty('--custom-box-head-size',`70px`);
            document.documentElement.style.setProperty('--custom-canvas-width',`30px`);
            this.lineSetting['lineWidth'] = 5;
            this.lineSetting['lineHeight'] = 8;
            this.lineSetting['imgX'] = 7;
            this.canvas.width = 30;
            this.charSetting.charOn = false;
            this.chatSetting.size = 60;
            this.chatSetting.font = 11;
        }else{
            this.viewWidth = window.innerWidth;
            document.documentElement.style.setProperty('--custom-box-head-size',`100px`);
            document.documentElement.style.setProperty('--custom-canvas-width',`100px`);
            this.lineSetting['lineWidth'] = 8;
            this.lineSetting['lineHeight'] = 15;
            this.lineSetting['imgX'] = 10;
            this.canvas.width = 100;
            this.chatSetting.size = 93;
            this.chatSetting.font = 18;
        }
        if(doc!=null){
            // doc.style.height = `${this.viewHeight * this.level.length}px`
            // doc.style.backgroundSize=`auto ${this.viewHeight}px`
        }
        this.emptydraw()
    }
    emptydraw(){
        this.ctx.fillStyle = 'rgb(0,0,0) / 0%';
        this.ctx.font = '20px Arial';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.eledraw(null)
        
    }
    async eledraw(level=null){
        
        let action = true;
        let lv = level;
        if(level!=null){
            if(this.currentlevel < level ){
                 
                    let tempLevel = this.currentlevel;
                    await this.drawLine(this.ctx, this.eachsize,level,this.canvas,this.imgs, action, tempLevel)
                    this.currentlevel = level;
                    
            }
            else if(this.currentlevel > level){              
                
                action = false;
                let tempLevel = this.currentlevel                
                    await this.drawLine(this.ctx, this.eachsize,level,this.canvas,this.imgs, action, tempLevel)
                    this.currentlevel = level;
                
            }else if(this.currentlevel== level ){
                
            }
        }else{
            console.log("널")  
            this.currentlevel = 0
            lv = this.currentlevel
            await this.drawLine(this.ctx, this.eachsize,lv,this.canvas,this.imgs, action)
        }
    }
    async drawLine(ctx, eachsize, currentlevel,canvas,imgs, direction, tempLevel=0){
        let lineHeight = this.lineSetting['lineHeight'];
        let lineWidth = this.lineSetting['lineWidth'];
        let lineSpace = this.lineSetting['lineSpace'];
        let skewX = this.lineSetting['skewX'];
        let skewY = this.lineSetting['skewY'];
        let lineLength = eachsize / 2 + eachsize * currentlevel
        let orginLength = eachsize / 2 + eachsize * (tempLevel)        
        let lineNum = Math.ceil(lineLength / (lineHeight + lineSpace))
        let orginNum = Math.ceil(orginLength / (lineHeight + lineSpace))        
        let adjsutX = canvas.width / 2 - lineWidth / 2;        
        this.canvas.style.backgroundColor = `rgba(200,255,255,${0.2 * (currentlevel / this.level.length) + 0.1})`
        let gradient = ctx.createLinearGradient(adjsutX, 0, adjsutX + lineWidth, 0);
        gradient.addColorStop(0, 'rgba(101, 67, 33, 1)'); // 진한 갈색
        gradient.addColorStop(1, 'rgba(210, 180, 140, 1)');
        document.documentElement.style.setProperty('--custom-canvas-chat-display',`none`);
        console.log(lineNum,orginNum)
        if(direction){
            if(lineNum==orginNum){
                let a = eachsize / 2 + eachsize * currentlevel - 1;
                orginNum = Math.ceil( a / (lineHeight + lineSpace))
            }            
            if(currentlevel==0){
                orginNum= 0;
                lineNum++;
            }
            
            for(let i = orginNum; i < lineNum; i++){                
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.save();
                let empty = [];
                for (let j = 0; j <= i; j++){
                    empty.push(j *(lineHeight + lineSpace))
                }
                for(let emp of empty){
                    ctx.setTransform(1, skewY, skewX, 1, 0, emp);
                    ctx.fillStyle=gradient;
                    ctx.fillRect(adjsutX,0,lineWidth,lineHeight)
                }
                ctx.restore();            
                this.drawBox(ctx,(i-1) *(lineHeight + lineSpace),lineWidth,canvas,imgs)
                await this.sleep(40);
                if(i==lineNum-1){
                    document.documentElement.style.setProperty('--custom-canvas-chat-font',`${this.chatSetting.font}px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-width',`${this.chatSetting.size}px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-top',`${(i-1) *(lineHeight + lineSpace) - (this.chatSetting.size * 42 / 32) *0.8 }px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-left',`-${lineWidth + this.chatSetting.size / 2}px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-display',`${this.charSetting.charOn?'block':'none'}`);
                }
                if(window.innerWidth<700){
                    document.documentElement.style.setProperty('--custom-canvas-chat-left',`-${this.chatSetting.size - lineWidth * 2}px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-top',`${(i-1) *(lineHeight + lineSpace) - (this.chatSetting.size * 42 / 32) *0.8 }px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-display',`${this.charSetting.charOn?'block':'none'}`);
                }
            }
        }else{            
            
            for(let i = orginNum; i >= lineNum; i--){
                       
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.save();
                let emptys = [];
                for (let j = 0; j <= i; j++) {
                    emptys.push(j * (lineHeight + lineSpace));
                }
                for (let emp of emptys) {
                    ctx.setTransform(1, skewY, skewX, 1, 0, emp);
                    ctx.fillStyle = gradient;
                    ctx.fillRect(adjsutX, 0, lineWidth, lineHeight);
                }                  
                ctx.restore();                
                this.drawBox(ctx,(i-1) *(lineHeight + lineSpace),lineWidth,canvas,imgs)                                             
                await this.sleep(30);
                if(i==lineNum){
                    document.documentElement.style.setProperty('--custom-canvas-chat-font',`${this.chatSetting.font}px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-width',`${this.chatSetting.size}px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-top',`${(i-1) *(lineHeight + lineSpace) - (this.chatSetting.size * 42 / 32) *0.8}px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-left',`-${lineWidth + this.chatSetting.size / 2}px`);
                    document.documentElement.style.setProperty('--custom-canvas-chat-display',`${this.charSetting.charOn?'block':'none'}`);
                    if(window.innerWidth<700){
                        document.documentElement.style.setProperty('--custom-canvas-chat-left',`-${this.chatSetting.size - lineWidth * 2}px`);
                        document.documentElement.style.setProperty('--custom-canvas-chat-top',`${(i-1) *(lineHeight + lineSpace) - (this.chatSetting.size * 42 / 32) *0.8 }px`);
                        document.documentElement.style.setProperty('--custom-canvas-chat-display',`${this.charSetting.charOn?'block':'none'}`);
                    }
                }
                
            }
        }
        
        
    }
    drawBox(ctx, lineLength, lineWidth, canvas,imgs){        
        let imgWidth = lineWidth * this.lineSetting['imgX'];
        let imgHeight = Math.floor(imgWidth / 816 * 1440)
        let adjustY = Math.floor(imgHeight / 1440 * 728)
        let adjustX = canvas.width /2 -  imgWidth /2
        let img = new Image();
        
        img.onload = function(){                        
            ctx.drawImage(img, adjustX, lineLength - adjustY, imgWidth, imgHeight)            
        }
        img.src = imgs[0].url;
        this.charSetting['charX'] = adjustX;
        this.charSetting['charY'] = lineLength - adjustY;
        this.charSetting['charW'] = imgWidth;
        this.charSetting['charH'] = imgHeight;        
    }
    clickChar(event){
        let tempX = event.offsetX;
        let tempY = event.offsetY;
        if(
            tempX >= this.charSetting.charX && tempX <= this.charSetting.charX + this.charSetting.charW
        &&  tempY >= this.charSetting.charY && tempY <= this.charSetting.charY + this.charSetting.charH
        ){
            this.charSetting.charOn = !this.charSetting.charOn;
            document.documentElement.style.setProperty('--custom-canvas-chat-display',`${this.charSetting.charOn?'block':'none'}`);
            return 0;
        }
        if(tempY >this.charSetting.charY + this.charSetting.charH){
            console.log("up")
            return 10 + this.currentlevel + 1;
        }
        if(tempY < this.charSetting.charY ){
            console.log("down")
            return 10 + this.currentlevel - 1;
        }
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
export default elevator;