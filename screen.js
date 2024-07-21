class screen{
    constructor(screens){
        this.screens = screens;
        this.touchXdown = null;
        this.touchYdown = null;
        this.currentSection = 0;
    }
    touchStart(event){
        let touchFirst = (event.toches || event.originalEvent.touches)[0];
        this.touchXdown = touchFirst.clientX;
        this.touchYdown = touchFirst.clientY;
    }
    touchMouve(event){
        if( !this.touchXdown || !this.touchYdown){
            return;
        }

        let xUp = event.toches[0].clientX;
        let yUp = event.toches[0].clientY;

        let xDiff= this.touchXdown - xUp;
        let yDiff= this.touchYdown - yUp;

        if(Math.abs(yDiff) > Math.abs(xDiff)){ //세로로 움직였을 떄
            if(yDiff>0){ //아래로
                return this.screenNext()
            }
            else{ //위로
                return this.screenPrev()
            }
        }
        this.touchXdown = null;
        this.touchYdown = null;
    }
    screenNext(){
        if(this.currentSection < this.screens.length - 1){
            this.currentSection++;
            this.screenScroll();
        }
        return this.currentSection
    }
    screenPrev(){
        if(this.currentSection>0){
            this.currentSection--;
            this.screenScroll();            
        }
        return this.currentSection
    }
    screenScroll(order=null){
        if(order!=null){
            this.currentSection = order;
        }
        let temp = this.currentSection;        
        let screenTop = this.screens[temp].offsetTop;
        window.scrollTo({
            top:screenTop,
            behavior : 'smooth'
        })
        
    }
}
export default screen;