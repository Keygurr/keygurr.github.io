function singleSelectChangeValue() {
    //Getting Value
    //var selValue = document.getElementById("singleSelectDD").value;
    const selObj = document.getElementById("selectRegression");
    const selValue = selObj.options[selObj.selectedIndex].value;
    console.log(selValue)

}

function singleSelectChangeValue2() {
    //Getting Value
    //var selValue = document.getElementById("singleSelectDD").value;
    const selObj = document.getElementById("selectFunc");
    const selValue = selObj.options[selObj.selectedIndex].value;
    console.log(selValue)
}

function getData(index, rIndex) {
    // index is function value
    var data = [];
    var data2 = [];
    var regressionData = [];
    var regressionY = [];
    var x = 0;
    var y = 0;
    var j = 50;
    for (x = 0; x < j; x++) {
        if (index == 0) {
            y = x**2 + x + 3;
        } else if (index == 1){
            y = Math.sin(x) ** 2;
        } else if (index == 2) {
            y = x + 4;
        } else if (index == 3 ) {
            y = x**3 + x + 3;
        } else {
            y = x**4 + x + 3;
        }
        data2.push(x);
        data.push(y);
        regressionData.push([x, y]);
    }
       // Separar valores de regresion
       var unparsed = [regressionCalculate(rIndex, regressionData)];
       unparsed[0].forEach((number, index, array) => {
        regressionY.push(number[1])
    });
    
    var final =
    {         
    labels: data2,
    datasets: [{
        label: ['Función'],
        data: data,
        fill:false,
        backgroundColor:
            'rgba(255, 99, 132, 0.2)',
        borderColor:
            'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }, {
        label: ['Regresión'],
        data: regressionY,
        fill:false,
        backgroundColor:
            'rgba(54, 162, 235, 0.2)',
        borderColor:
            'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
}
return final;   // The function returns the product of p1 and p2
}
var rFunc = "";
function regressionCalculate(index, data) {
    // Lineal - 0
    // Quadratic - 1
    // Exponential - 2
    var result = 0;
    if (index == 0) {
        //const result = regression.linear();
        var result = regression.linear(data);
    } else if (index == 1) {
        var result = regression.polynomial(data, {order: 2});
    } else {
        var result = regression.exponential(data);
    }
    console.log(result.string)
    rFunc = result.string;
    return result.points;   // The function returns the product of p1 and p2
}

var selValue = 0;
var rIndex = 0;

document.addEventListener('click', function (event) {

    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('#run')) return;

    // Don't follow the link
    event.preventDefault();
    var selObj = document.getElementById("selectFunc");
    var selValue = selObj.options[selObj.selectedIndex].value;
    var selReg = document.getElementById("selectRegression");
    var rIndex = selReg.options[selReg.selectedIndex].value;
    myChart.data = getData(selValue, rIndex);
    myChart.update();
    console.log(myChart.data);
    console.log(rFunc);
    document.getElementById("rfunction").innerHTML = rFunc;
}, false);


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: getData(selValue, rIndex)
});
document.getElementById("rfunction").innerHTML = "Función de regresión: " + rFunc;

