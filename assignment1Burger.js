const Order = require("./assignment1Order");
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Ac7Gk9BNM5CKkxAeiN1xs-tMbOrHXJwNSjzWyFvwQMNb5vr-f5D0ph34luoJa5APpq3L9XInoPXVhOMj',
  'client_secret': 'EBFyPOCHHBp1nYpnPuz3w8hBCf25D-ZQ2dPkA_xNLFL2uwJoF-wmQBLyZF_Im6HLD1ArEbY4fG5bQMhz'
});

const OrderState = Object.freeze({
  WELCOMING:   Symbol("welcoming"),
  NAME: Symbol("name"),
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
  PAYMENT:  Symbol("payment"),
  
});

module.exports = class BurgerOrder extends Order {
  constructor(sNumber, sUrl){
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.name = "";
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
        this.stateCur = OrderState.NAME;
        aReturn.push("Welcome to Dharti-Shreya's food-lab.Please enter your name.");
        break;

    case OrderState.NAME:
        this.stateCur = OrderState.TYPE;
        this.name = sInput;
        aReturn.push("Hi " + this.name + "! What type of burger would you like - Veg / Non-Veg?");
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
                        aReturn.push("Which burger would you like to have - Mc-Veggie and Mc-Maharaja?");
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
                                    this.stateCur = OrderState.PAYMENT;
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
                                        this.cost += tax;
                                        aReturn.push(`Tax: ${tax}`);
                                        aReturn.push(`Total order cost: ${this.cost}`);
                                    }
                                    let d = new Date(); 
                                    d.setMinutes(d.getMinutes() + 20);
                                    aReturn.push(`Please pick your order up at ${d.toTimeString()}`);
                                    
                                    aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                                    aReturn.push(`Please click above payment link or copy-paste the link on current browser`);
                                    break;
                                    case OrderState.PAYMENT:
                                        console.log(sInput);
                                        console.log("Dharti");
                                        console.log(sInput.purchase_units[0]);
                                        this.isDone(true);
                                        let date = new Date();
                                        date.setMinutes(date.getMinutes() + 20);
                                        aReturn.push(`Hello ${
                                          sInput.purchase_units[0].shipping.name.full_name
                                        }, 
                                        Your order will be delivered on ${date.toTimeString()}
                                        at address ${sInput.purchase_units[0].shipping.address.address_line_1}
                                        ${sInput.purchase_units[0].shipping.address.address_line_2}
                                        ${sInput.purchase_units[0].shipping.address.admin_area_2}
                                        ${sInput.purchase_units[0].shipping.address.admin_area_1}
                                        ${sInput.purchase_units[0].shipping.address.postal_code}
                                        ${sInput.purchase_units[0].shipping.address.country_code}`);
                                        break;
                            }
                            return aReturn;
                        }

                        renderForm(sTitle = "-1", sAmount = "-1") {
                            // your client id should be kept private
                            if (sTitle != "-1") {
                              this.sItem = sTitle;
                            }
                            if (sAmount != "-1") {
                              this.nOrder = sAmount;
                            }
                            const sClientID = "Ac7Gk9BNM5CKkxAeiN1xs-tMbOrHXJwNSjzWyFvwQMNb5vr-f5D0ph34luoJa5APpq3L9XInoPXVhOMj" ||
                              "put your client id here for testing ... Make sure that you delete it before committing";
                            return `
                              <!DOCTYPE html>
                          
                              <head>
                                <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
                                <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
                              </head>
                              
                              <body>
                                <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
                                <script
                                  src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
                                </script>
                                <H1> Thank you ${this.name} for your ${this.sItem} order of $${this.cost}. </H1>
                                <div id="paypal-button-container"></div>
                          
                                <script>
                                  paypal.Buttons({
                                      createOrder: function(data, actions) {
                                        // This function sets up the details of the transaction, including the amount and line item details.
                                        return actions.order.create({
                                          purchase_units: [{
                                            amount: {
                                              value: '${this.cost}'
                                            }
                                          }]
                                        });
                                      },
                                      onApprove: function(data, actions) {
                                        // This function captures the funds from the transaction.
                                        return actions.order.capture().then(function(details) {
                                          // This function shows a transaction success message to your buyer.
                                          $.post(".", details, ()=>{
                                            window.open("", "_self");
                                            window.close(); 
                                          });
                                        });
                                      }
                                  
                                    }).render('#paypal-button-container');
                                  // This function displays Smart Payment Buttons on your web page.
                                </script>
                              
                              </body>
                                  
                              `;
                          }
};
