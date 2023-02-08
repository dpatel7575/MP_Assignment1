const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    TYPE : Symbol("type"),
    SIZE_1:   Symbol("size"),
    NONVEG: Symbol("nv"),
    TOPPINGS_1:   Symbol("toppings"),
    SECOND_ITEM:   Symbol("second item"),
    SIZE_2:   Symbol("size2"),
    TOPPINGS_2:   Symbol("toppings2"),
    THIRD_ITEM:   Symbol("third item"),
    SIZE_3:   Symbol("size3"),
    TOPPINGS_3:   Symbol("toppings3"),
    UP_SELL_2 : Symbol("fries"),
    ICE_CREAM:  Symbol("ice-cream"),
    
});

module.exports = class BurgerOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.type = "";
        this.sSize = "";
        this.nonveg = "";
        this.sToppings = "";
        this.sICE_CREAM = "";
        this.sItem = "Burger";
        this.sItem = "";
        this.sSize2 = "";
        this.sToppings2 = "";
        this.sSize3 = "";
        this.sToppings3 = "";
        this.sUpSell2 = "";
    
        this.cost = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.TYPE;
                aReturn.push("Welcome to Dharti's food.");
                aReturn.push("What type of burger would you like - Veg / Non-Veg?");
                break;            
                
            
            case OrderState.TYPE:
                if(sInput !== "Veg" && sInput !== "Non-Veg"){
                aReturn.push("Invalid input, please choose either Veg or Non-Veg.");
                break;
                }
                else{
                if(sInput == "Veg")
                        {
                            this.stateCur = OrderState.SIZE_1
                            this.type = sInput;
                            aReturn.push("Which burger would you like to have - Mc-Veggie and Maharaja Mac?");
                            this.cost = 10;
                            break;
                        }
                        else if(sInput !== "Non-Veg")
                        {
                            this.stateCur = OrderState.SIZE_1
                            this.type = sInput;
                            aReturn.push("Which burger would you like to have - Mc-Chicken and Mc-Egg?");
                            this.cost = 10;
                            break;
                        }
                    }
                    

            case OrderState.SIZE_1:
                    if(sInput !== "Mc-Veggie" && sInput !== "Mc-Maharaja" && sInput !== "Mc-Chicken" && sInput !== "Mc-Egg"){
                        aReturn.push("Invalid input, please choose from given options only");
                        break;
                    }
                    this.stateCur = OrderState.TOPPINGS_1
                    this.sSize = sInput;
                    aReturn.push("Which extra filling would you like in burger - Cheese or Mayo?");
                    this.cost = 10;
                    break;


            case OrderState.TOPPINGS_1:
                if (sInput !== "Cheese" && sInput !== "Mayo") {
                    aReturn.push("Invalid topping, please choose either Cheese or Mayo.");
                    break;
                }
                this.stateCur = OrderState.SECOND_ITEM;
                this.sToppings = sInput;
                aReturn.push("Would you like a wrap?");
                break;

                case OrderState.SECOND_ITEM:
                    if(sInput.toLowerCase() != "yes" && sInput.toLowerCase() != "no"){
                    aReturn.push("Invalid input. Please enter either 'yes' or 'no'");
                    break;
                    }
                    if(sInput.toLowerCase() == "yes"){
                    this.sItem2 = "Wrap";
                    this.stateCur = OrderState.SIZE_2;
                    this.cost = this.cost + 15;
                    aReturn.push("What size of wrap would you like-regular or large?");
                    break;
                    }
                    this.stateCur = OrderState.THIRD_ITEM
                    aReturn.push("Would you like a subway - yes or no?");
                    break;

                    case OrderState.SIZE_2:
                        if(sInput.toLowerCase() === "regular" || sInput.toLowerCase() === "large"){
                        this.stateCur = OrderState.THIRD_ITEM
                        this.sSize2 = sInput;
                        aReturn.push("Would you like a subway - yes or no?");
                        }else{
                        aReturn.push("Invalid input! Please choose between regular or large.");
                        }
                        break;
                    
            
                        case OrderState.THIRD_ITEM:
                            if(sInput.toLowerCase() != "yes" && sInput.toLowerCase() != "no"){
                            aReturn.push("Invalid response, please enter either yes or no.");
                            break;
                            }
                            if(sInput.toLowerCase() != "no"){
                            this.sItem3 = "Burger";
                            this.stateCur = OrderState.SIZE_3;
                            this.cost = this.cost + 5;
                            aReturn.push("What type of bread would you like - white or brown?");
                            break;
                            }
                            this.stateCur = OrderState.UP_SELL_2
                            aReturn.push("Would you like fries with that - yes or no?");
                            break;
                
                            case OrderState.SIZE_3:
                                if (sInput.toLowerCase() !== 'white' && sInput.toLowerCase() !== 'brown') {
                                aReturn.push("Sorry, that's not a valid bread option. Please select 'white' or 'brown' for your sub size.");
                                } else {
                                this.stateCur = OrderState.TOPPINGS_3
                                this.sSize3 = sInput;
                                aReturn.push("Which should be added in sub - Tomato or Lettuce?");
                                }
                                break;

                                case OrderState.TOPPINGS_3:
                                if (sInput !== "Lettuce" && sInput !== "Tomato") {
                                aReturn.push("Invalid input. Please choose either Lettuce or Tomato.");
                                break;
                                }
                                this.stateCur = OrderState.UP_SELL_2
                                this.sToppings3 = sInput;
                                aReturn.push("Would you like french fries with that - yes or no?");
                                break;
                                
                                
           
                                case OrderState.UP_SELL_2:
                                    if(sInput.toLowerCase() !== "yes" && sInput.toLowerCase() !== "no"){
                                        aReturn.push("Invalid input, please enter either 'yes' or 'no' for fries");
                                        break;
                                    }
                                    this.stateCur = OrderState.ICE_CREAM
                                    if(sInput.toLowerCase() === "yes"){
                                        this.sUpSell2 = sInput;
                                        this.cost = this.cost + 3;
                                    }
                                    aReturn.push("Would you like ice-cream with that- yes or no?");
                                    break;
                        
                                    case OrderState.ICE_CREAM:
                                        if(sInput.toLowerCase() !== "yes" && sInput.toLowerCase() !== "no"){
                                            aReturn.push("Invalid input, please enter either 'yes' or 'no'");
                                            break;
                                        }
                                        else{
                                            this.isDone(true);
                                            if(sInput.toLowerCase() != "no"){
                                                this.cost = this.cost + 2;
                                                this.sICE_CREAM = sInput;
                                            }
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
                                        if(this.sICE_CREAM){
                                            aReturn.push("ice-cream");
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