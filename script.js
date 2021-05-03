window.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');
});

var dateElement = document.getElementById('date-picker');
var weightElement = document.getElementById('weight-picker');
var parentDivEl = document.querySelector('.history__new');

function maxDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '1' + month;
    }
    today = year + '-' + month + '-' + day;
    dateElement === null || dateElement === void 0 ? void 0 : dateElement.setAttribute('max', today);
}

maxDate();
var addElement = document.getElementById('weight-add');
addElement.addEventListener('click', function (e) {
    e.preventDefault;
    addHistory();
    var count = getCount(parentDivEl, false);
    removeLastEl(count);
});


function addHistory() {
    var dateValue = dateElement.value.trim();
    var weightValue = weightElement.value;
    localStorage.setItem(dateValue, weightValue);
    var basicDiv = document.querySelector('.history__new');
    var newDiv = document.createElement('div');
    basicDiv.appendChild(newDiv);
    newDiv.className = 'history__new__items';
    var weightText = document.createElement('p');
    newDiv.appendChild(weightText);
    weightText.appendChild(document.createTextNode(weightValue + ' kg'));

    basicDiv.insertBefore(newDiv, basicDiv.childNodes[0]);
    var dateText = document.createElement('p');
    newDiv.appendChild(dateText);
    dateText.appendChild(document.createTextNode(dateValue));
    basicDiv.insertBefore(newDiv, basicDiv.childNodes[0]);

    document.getElementById("curWeight").innerHTML = (weightValue + ' kg');

    document.getElementById("startWeight").innerHTML = (weightValue + ' kg'); // nem sikerült csak az első klikket vizsgálni

    document.getElementById("difWeight").innerHTML = (weightValue - 57  + ' kg'); // jelenlegi súly - kezdősúly, avagy fordítva

}


function getCount(parent, getChildrensChildren) {
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for (var i = 0; i < children; i++) {
        if (parent.childNodes[i].nodeType != 3) {
            if (getChildrensChildren)
                relevantChildren += getCount(parent.childNodes[i], true);
            relevantChildren++;
        }
    }
    return relevantChildren;
}
function removeLastEl(count) {
    if (count >= 10) {
        var lastElement = document.querySelector('.history__new');
        lastElement.removeChild(lastElement.lastChild);
    }
}
// Calendar
$(document).ready(function () {
    var currentDate = new Date();
    $('.disableFuturedate').datepicker({
    format: 'dd/mm/yyyy',
    autoclose:true,
    endDate: "currentDate",
    maxDate: currentDate
    }).on('changeDate', function (ev) {
       $(this).datepicker('hide');
    });
    $('.disableFuturedate').keyup(function () {
       if (this.value.match(/[^0-9]/g)) {
          this.value = this.value.replace(/[^0-9^-]/g, '');
       }
    });
 });

// Empty button behavior

$(document).ready(function(){
    $('.sendButton').attr('disabled',true);

    $('#date-picker') && $('#weight-picker').keyup(function(){
        if($(this).val().length !=0){
            $('.sendButton').attr('disabled', false);
        }
        else
        {
            $('.sendButton').attr('disabled', true);        
        }
    })
});