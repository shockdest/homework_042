window.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');
});

let dateElement = document.getElementById('date-picker') as HTMLInputElement;;
let weightElement = document.getElementById('weight-picker') as HTMLInputElement;;
const parentDivEl = document.querySelector('.history__new') as HTMLInputElement;;

function maxDate(){
    let today :any = new Date();
    let day :any = today.getDate();
    let month :any = today.getMonth()+1;
    let year = today.getFullYear();

    if(day < 10){
        day = '0' + day;
    }
    if(month <10){
        month = '1' + month;
    }
    today = year + '-' + month + '-' + day;

    dateElement?.setAttribute('max', today);
}
maxDate();


const addElement = document.getElementById('weight-add') as HTMLButtonElement;

addElement.addEventListener('click',function(e){
    e.preventDefault;
    
    addHistory();

    let count = getCount(parentDivEl, false);
    
    removeLastEl(count);

})

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

    document.getElementById("difWeight").innerHTML = (weightValue - 60  + ' kg'); // jelenlegi súly - kezdősúly, avagy fordítva

}


function getCount(parent: any, getChildrensChildren: boolean){
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for(var i=0; i < children; i++){
        if(parent.childNodes[i].nodeType != 3){
            if(getChildrensChildren)
                relevantChildren += getCount(parent.childNodes[i],true);
            relevantChildren++;
        }
    }
    return relevantChildren;
}

function removeLastEl(count: any){
    if (count >= 10) {
        let lastElement:any = document.querySelector('.history__hero');
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