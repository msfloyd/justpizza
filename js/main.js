var pizzasizes = [
    "Personal",
    "Medium",
    "Large"
];

var pizzasizescosts = [10, 12, 15];

var pizzacrustscosts = [0, 0, 2];

var sauces = [
    "Marinara",
    "BBQ",
    "Ranch"
];

var crusts = [
    "Regular",
    "Whole Wheat",
    "Gluten Free"
];

var toppings = [
    "Pepperoni",
    "Sausage",
    "Bacon",
    "Chicken",
    "Mushrooms",
    "Onions",
    "Green Peppers",
    "Extra Cheese",
    "Pineapples",
    "Olives",
    "Anchovies"
];

var drinks = [
    "Cola",
    "Ginger Ale",
    "Fruit Punch",
    "Grape Soda",
    "Water",
    "Tea",
    "Coffee"
];
var sides = [
    "Garlic Knots",
    "Mozzarella Salad",
    "House Salad"
];
var toppingscosts = [
    2.00,
    2.00,
    2.00,
    2.00,
    2.00,
    2.00,
    2.00,
    2.00,
    2.00,
    2.00,
    3.00
];

var drinkscosts = [
    2.00,
    2.00,
    2.00,
    2.00,
    2.00,
    1.00,
    1.00
];
var sidescosts = [
    6.00,
    12.00,
    10.00
];
var pizza = [];

var orderitem = [];

var ordercost = [];
var item;
var menucost = "none";
var sizecost = pizzasizescosts[1];
var crustcost = pizzacrustscosts[0];
var toppingcost = toppingscosts.reduce( ( acc, cur ) => acc + cur, 0 );
var cost = sizecost + crustcost + toppingcost;
var itemcost;
var i;
var delete_row;
var ordernumber;

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function clearcart() {
    $('tfoot td#ordertotal').text(0);
    for (i = 0; i < orderitem.length; i++) {
        document.getElementById("orderlist").deleteRow(0);
    }
    $("#cartnumber").text("")
    orderitem.length = 0;
    ordercost.length = 0;
    $("#checkout").attr("disabled", true);
    $("#checkout").fadeTo(500, .5);
    closecart();


}

function deleteRow(btn, itemdelete, pricedelete) {
        delete_row=orderitem.indexOf(itemdelete);
        orderitem.splice(delete_row, 1);
        ordercost.splice(delete_row, 1);
        var row = btn.parentNode.parentNode;
        row.parentNode.removeChild(row);
        if (orderitem.length===0){
             $("#cartnumber").text("")
            
        }
        else{
            $("#cartnumber").text("("+orderitem.length+")")
        }
        $('tfoot td#ordertotal').text(parseInt($('tfoot td#ordertotal').text()) -pricedelete);
        if (($('tfoot td#ordertotal').text()==="0") && ($('#checkout').is(":disabled")===false)){
        $("#checkout").attr("disabled", true);
        $("#checkout").fadeTo(500, .5);
    }
}

function updatecustomtotal() {
    cost = sizecost + crustcost + toppingcost;
    $("#custompizzatotal").text("$"+cost)

}

function placeorder() {
    var today= new Date();
    var orderprefix = today.getFullYear() +"-" + pad((today.getMonth()+1)) +"-"+ pad(today.getDate()) + "-";
    $("#totalcost").text($('tfoot td#ordertotal').text());
    clearcart();
    ordernumber = localStorage.getItem("ordernumber");
    if (isNaN(parseInt(ordernumber))) {
            ordernumber=0;
        }
        else {
            }
    ordernumber++
    localStorage.setItem("ordernumber",ordernumber );
//    alert("Order "+orderprefix+ordernumber+" Placed");
    $("#ordernumber").text(orderprefix+ordernumber);
    $('#orderconfirmation').modal('show');

}

function closecart() {
$( "#cart" ).slideUp( "5000" );
}

$("input[type='button']").click(function() {
    item = this.value;
    if (item !== "Checkout" && item !== "Cancel Order") {
        switch (item) {

            case "Add to Cart":
                item = $("#pizzasize").text() + " " + $("#crusttype").text() + " Pizza";
                if ($("#custom-pizza-body").text() !== "") {
                    item = item+" with " + $("#custom-pizza-body").text();
                }
                itemcost=cost;
                $("#custom-pizza-body").text("");
                var $checkboxes = $('input[type="checkbox"]');
                $checkboxes.filter(':checked').each(function() {
                    this.click();
                });
                $('input:radio[name="crust"]').filter('[value="Regular"]').prop('checked', true);
                $('input:radio[name="size"]').filter('[value="Medium"]').prop('checked', true);
                $("#crusttype").text("Regular");
                $("#pizzasize").text("Medium");
                sizecost = pizzasizescosts[1];
                crustcost = pizzacrustscosts[0];
                toppingcost = 0;
                updatecustomtotal();

                break;
            default:
                if ($(this).hasClass("drink")) {
                    menucost = "drink"
                };
                if ($(this).hasClass("side")) {
                    menucost = "side"
                };
                switch (menucost) {
                    case "drink":
                        itemcost = drinkscosts[drinks.indexOf(this.value)];
                        break;
                    case "side":
                        itemcost = sidescosts[sides.indexOf(this.value)];
                        break;
                    default:
                        itemcost = 0;

                }
                menucost = "none";


        }
        orderitem.push(item);
        ordercost.push(itemcost);
        $("#orderlist").append('<tr><td class="col-xs-2"><input type="button" class="btn btn-sm btn-danger" value="X" onclick="deleteRow(this, \'' + item + '\', ' + itemcost + ')"></td><td class="col-xs-7">' + item + '</td><td class="col-xs-2 costalign">' + itemcost + '</td></tr>')
        $("#cartnumber").text("("+orderitem.length+")")
        if (isNaN(parseInt($('tfoot td#ordertotal').text()))) {
            $('tfoot td#ordertotal').text(itemcost);
        }
        else {
            $('tfoot td#ordertotal').text(parseInt($('tfoot td#ordertotal').text()) + itemcost);
        }
        if (($('tfoot td#ordertotal').text()!=="0") && ($('#checkout').is(":disabled"))){
            $("#checkout").attr("disabled", false);
            $("#checkout").fadeTo(500, 1);
        }

    }
});



$(document).ready(function() {
    $("#checkout").attr("disabled", true);
    $("#checkout").fadeTo(500, .5);

    $("#custompizzatotal").text("$"+itemcost);
    $("#opencart").click(function() {
      if ( $( "#cart" ).is( ":hidden" ) ) {
        $( "#cart" ).slideDown( "5000" );
      } else {
        $( "#cart" ).slideUp( "5000" );
      }
    });
    $("#closecart").click(function() {
        closecart();
    });

    
    $('input[type="radio"]').on('click change', function() {
        switch ($(this).attr("name")) {
            case "crust":
                {
                    $("#crusttype").text(this.value);
                    crustcost = pizzacrustscosts[crusts.indexOf(this.value)];
                    break;
                }
            case "size":
                {
                    $("#pizzasize").text(this.value);
                    sizecost = pizzasizescosts[pizzasizes.indexOf(this.value)];

                }

        }

        updatecustomtotal()

    });


    $("input[type='checkbox']").change(function() {
        $("#" + this.id + "-img").toggleClass("hideit", this.checked === false);
        if (this.checked) {
            pizza.push(this.value);
            toppingcost = toppingcost + toppingscosts[toppings.indexOf(this.value)];
        }
        else {
            pizza.splice(pizza.indexOf(this.value), 1);
            toppingcost = toppingcost - toppingscosts[toppings.indexOf(this.value)];

        }
        $("#custom-pizza .panel-body").html(pizza.join(", "));
        updatecustomtotal();
    }).change();

});
