// Hannah Kops
// 12/17/21

// 	The purpose of my website is to display products created by a small business. I am hoping to reach
// an audience of many. Those who are looking to buy for themselves and others. I have chosen to keep the 
// website less distracting, but still functional. I added aspects that reflect good upon the owner. Such as, 
// positive previous customer reveiws. I think that gives the current customer confidence in the potential 
// purchase. I also included an about page that gives a little insight into the seller's life as a crafter. 
// After the about and contact info, there is a form the customer can submit that will go to the seller directly 
// from their own email. I used functions that pertained to what I wanted the website to do to best serve
// the customer. Continuing on, I would add a purchase page, where the customer could complete a purchase with
// a confirmation.


function addItemToCart(item) 
{
    //initializing variable
    var t = "qty" + item;
    var qty = document.getElementById(t).value;

    //creating a loop for if the quantity is greater than zero to add to cart
    if (qty > 0)
    {
        var itemsInCart = 0;
        //using session storage to keep track of number of items in cart
        itemsInCart = sessionStorage.getItem("itemCount");
        if (itemsInCart == null)
            {
                itemsInCart = 0;
            }
            else
            {
                itemsInCart = parseInt(sessionStorage.getItem("itemCount"));
            }    
        
        itemsInCart += 1;
        //This will keep item in cart using session storage
        sessionStorage.setItem("itemCount", itemsInCart);
        sessionStorage.setItem(itemsInCart, 
                                itemsArray[item].id+","
                                +itemsArray[item].name+","
                                +itemsArray[item].description+","
                                +qty+","
                                +itemsArray[item].price);
            //added an alert to notify customer items were added to cart
        alert(qty + " - " + itemsArray[item].name + " have been added to your cart!");
        document.getElementById(t).value = ""
    }
    //if quantity is not entered, there will be an error alert
    else
    {
        alert("Please enter a quantity!");
    }
}

function ShowCart() {

    var myItems = [
        {
            "ITEM#": "",
            "NAME": "",
            "DESCRIPTION": "",
            "QUANTITY": "",
            "PRICE": "",
            "EXTENDED": ""       
        }
    ]

    //creating the column header array
    var totalAmount = 0.0;
    var col = [];
    for (var i = 0; i < myItems.length; i++) {
        for (var key in myItems[i]) {
            if (col.indexOf(key) == -1) {
                col.push(key);
            }
        }
    }
    //This inserts the table tag
    var table = document.createElement("table");
    
    var tr = table.insertRow(-1); 
    var th = document.createElement("th"); 
    th.innerHTML = "";
    tr.appendChild(th);

    var tr = table.insertRow(-1); 
    //This creates the column headers
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); 
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    //This loop goes through session storage and gets line items
    for (var i = 1; i <= sessionStorage.getItem("itemCount"); i++) {
        tr = table.insertRow(-1);

        const lineItems = sessionStorage.getItem(i).split(",");
        //This loop gives line item properties
        for (var j = 0; j < 4; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = lineItems[j];
        }
        //This will give extended price
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = formatDollars(lineItems[4]);
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = formatDollars(parseFloat(lineItems[3])*parseFloat(lineItems[4]));
        totalAmount += parseFloat(lineItems[3])*parseFloat(lineItems[4]);
    }   

        tr = table.insertRow(-1);
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = " ";
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = " ";
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = " ";
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = " ";
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = "CART TOTAL";        
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = formatDollars(totalAmount);    

    var divContainer = document.getElementById("showCart");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    document.getElementById("remove").style.display = "block";
    document.getElementById("amount").value = totalAmount;
}

//This function clears the cart
function clearCart() 
{
    sessionStorage.setItem("itemCount", 0);
    ShowCart();
}

//This function formats the price to USD
function formatDollars(input) 
{
    var n = new Number(input).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    
    return n

}
