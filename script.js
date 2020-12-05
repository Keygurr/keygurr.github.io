

function simpson13(a, b, n, func) {
    h = (b-a) / n;
    sum1 = 0;
    sum2 = 0;
    y0 = 0;
    yf = 0;
    x = 0;
    var fx = 0;
    for(i = 0; i < n+1; i++){
        x = a + (i*h);
        fx = eval(func);
        console.log(func);
        if (i >= 1 && i < n) {
            if (i % 2 == 0){
                sum1 += fx
            } else {
                sum2 += fx
            }
        }
        if (i == n){
            yf = fx;
        } else if (i == 0) {
            y0 = fx;
        }
    }
    var I = (h/3) * (y0 + (4*sum2) + (2*sum1) + yf);
    return I;
}

function simpson38(a, b, n, func) {
    h = (b-a) / n;
    sum1 = 0;
    sum2 = 0;
    sum3 = 0;
    x = 0;
    var fx = 0;
    for (i = 2; i < n; i += 3) {
        x = a+(i-1)*h;
        fx = eval(func);
        sum1 += fx;
    }

    for (i = 3; i < n + 1; i += 3) {
        x = a+(i-1)*h;
        fx = eval(func);
        sum2 += fx;
    }

    for (i = 4; i < n - 1; i += 3) {
        x = a+(i-1)*h;
        fx = eval(func);
        sum3 += fx;
    }
    x = a;
    var funa = eval(func);
    x = b;
    var funb = eval(func);
    var I = (funa + (3*sum1) + (3*sum2) +(2*(sum3+funb)))*(3*(h/8));
    return I;
}

function trapecio(a, b, n, func) {
     h = (b - a) / n;
    y0 = 0;
    yf = 0;
    sum = 0;
    x = 0;
    fx = eval(func);
    for(i = 0; i < n+1; i++){
        x = a + (i*h);
        fx = eval(func);
        if (i >= 1 && i < n) {
            sum += fx;
        }
        if (i == n){
            yf = fx;
        } else if (i == 0) {
            y0 = fx;
        }
    }
    var I = h* ((y0/2) + sum +(yf/2));
    return I;
}

function getData(functionInput, a, b, n) {
    var h = (b - a) / n;
    var data = [];
    var data2 = [];
    a = parseFloat(a);
    b = parseFloat(b);
    n = parseFloat(n);
    for (i = 0; i < n + 1; i++) {
        x = a + (i*h);
        data2.push(Math.round((a + (i*h)) * 100) / 100);
        data.push(Math.round(eval(functionInput)* 100) / 100);
    }
    var final =
    {         
    labels: data2,
    datasets: [{
        label: ['Función'],
        data: data,
        fill:true,
        backgroundColor:
            'rgba(255, 99, 132, 0.2)',
        borderColor:
            'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
}
return final;   // The function returns the product of p1 and p2
}
var rFunc = "";
var selValue = eval("x");
var a = 0;
var b = 0;
var x = 0;
var n = 10;
var sum1 = 0.0;
var sum = 0.0;
var sum2 = 0.0;
var sum3 = 0.0;
var y0 = 0.0;
var yf = 0.0;
var rIndex = 0;

document.addEventListener('click', function (event) {

    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('#run')) return;

    // Don't follow the link
    event.preventDefault();
    var selObj = document.getElementById("selectFunc");
    var selValue = selObj.value;
    console.log(selValue);
    var selReg = document.getElementById("selectRegression");
    a = parseInt(document.getElementById("a").value);
    b = parseInt(document.getElementById("b").value);
    n = parseInt(document.getElementById("n").value);
    document.getElementById("Trapecio").innerHTML = "Trapecio " + trapecio(a, b, n, selValue);
    document.getElementById("Simpson13").innerHTML = "Simpson 1/3: " + simpson13(a, b, n, selValue);
    document.getElementById("Simpson38").innerHTML = "Simpson 3/8: " + simpson38(a, b, n, selValue);
    myChart.data = getData(selValue, a, b, n);
    myChart.update();

}, false);


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: getData(selValue, a, b, n)
});


