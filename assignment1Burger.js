const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE_1:   Symbol("size"),
    TOPPINGS_1:   Symbol("toppings"),
    SECOND_ITEM:   Symbol("second item"),
    SIZE_2:   Symbol("size2"),
    TOPPINGS_2:   Symbol("toppings2"),
    THIRD_ITEM:   Symbol("third item"),
    SIZE_3:   Symbol("size3"),
    TOPPINGS_3:   Symbol("toppings3"),
    UP_SELL_2 : Symbol("fries"),
    DRINKS:  Symbol("drinks"),
    TURNOVERS: Symbol("turnovers"),
});

module.exports = class BurgerOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "Burger";
        this.sItem = "";
        this.sSize2 = "";
        this.sToppings2 = "";
        this.sSize3 = "";
        this.sToppings3 = "";
        this.sUpSell2 = "";
        this.sTurnovers="";
        this.cost = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE_1;
                aReturn.push("Welcome to Dharti's food.");
                aReturn.push("What type of burger would you like?");
                break;
            case OrderState.SIZE_1:
                this.stateCur = OrderState.TOPPINGS_1
                this.sSize = sInput;
                aReturn.push("Which filling would you like in burger?");
                this.cost = 10;
                break;
            case OrderState.TOPPINGS_1:
                this.stateCur = OrderState.SECOND_ITEM
                this.sToppings = sInput;
                aReturn.push("Would you like a wrap?");
                break;
            case OrderState.SECOND_ITEM:
                if(sInput.toLowerCase() != "no"){
                    this.sItem2 = "Wrap";
                    this.stateCur = OrderState.SIZE_2;
                    this.cost = this.cost + 15;
                    aReturn.push("What size of wrap would you like?");
                    break;
                }
                this.stateCur = OrderState.THIRD_ITEM
                aReturn.push("Would you like a subway?");
                break;
            case OrderState.SIZE_2:
                this.stateCur = OrderState.TOPPINGS_2
                this.sSize2 = sInput;
                aReturn.push("Do you like to have veg/non veg wrap ?");
                break;
            case OrderState.TOPPINGS_2:
                this.stateCur = OrderState.THIRD_ITEM
                this.sToppings2 = sInput;
                aReturn.push("Would you like a subway?");
                break;
            case OrderState.THIRD_ITEM:
                if(sInput.toLowerCase() != "no"){
                    this.sItem3 = "Burger";
                    this.stateCur = OrderState.SIZE_3;
                    this.cost = this.cost + 5;
                    aReturn.push("What type of bread would you like?");
                    break;
                }
                this.stateCur = OrderState.UP_SELL_2
                aReturn.push("Would you like fries with that?");
                break;
            case OrderState.SIZE_3:
                this.stateCur = OrderState.TOPPINGS_3
                this.sSize3 = sInput;
                aReturn.push("Which patty you want inside the sub?");
                break;
            case OrderState.TOPPINGS_3:
                this.stateCur = OrderState.UP_SELL_2
                this.sToppings3 = sInput;
                aReturn.push("Would you like french fries with that?");
                break;
            case OrderState.UP_SELL_2:
                this.stateCur = OrderState.DRINKS
                if(sInput.toLowerCase() != "no"){
                    this.sUpSell2 = sInput;
                    this.cost = this.cost + 3;
                }
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.cost = this.cost + 2;
                    this.sDrinks = sInput;
                }
                aReturn.push("Would you like turnover with that?");
                break;
                
                case OrderState.TURNOVERS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.cost = this.cost + 3;
                    this.sTurnovers = sInput;
                }

                aReturn.push("Thank-you for your order, here is the order summary:");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sItem2){
                aReturn.push(`${this.sSize2} ${this.sItem2} with ${this.sToppings2}`);
                }
                if(this.sItem3){
                    aReturn.push(`${this.sSize3} ${this.sItem3} with ${this.sToppings3} patty`);
                }
                if(this.sUpSell2){
                    aReturn.push("french fries");
                }
                if(this.sDrinks){
                    aReturn.push("drinks");
                }
                if(this.sTurnovers){
                    aReturn.push("turnovers");
                }
                if(this.cost){
                    let tax = this.cost * 0.13;
                    aReturn.push(`Tax: ${tax}`);
                    aReturn.push(`Total order cost: ${this.cost}`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick your order up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}