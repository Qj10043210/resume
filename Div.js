class Div{
    constructor(div){
        this.div = div;        
    }
    checkScroll(){
        return this.div.scrollTop + this.div.clientHeight < this.div.scrollHeight;

    }
    scrollDiv(state,amout=0.5){
        //true -> top, false -> down
        let temp = state ? this.div.clientHeight : this.div.clientHeight * -1
        this.div.scrollBy({
            top : temp * amout,
            behavior : 'smooth'
        })
    }
}
export default Div;