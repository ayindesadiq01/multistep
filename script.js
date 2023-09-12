'use strict';

const nextButton = document.querySelector('.next-btn');
const previousButton = document.querySelector('.prev-btn');
const stepIcons = document.querySelectorAll('.step');
const textBoxs =document.querySelectorAll('.text-box');
const inView = document.querySelector('.in-view');
const thankYou = document.querySelector('.thank-you');


// INPUT FIELD
let mailField = document.querySelector('.email-field');
let numberField = document.querySelector('.number-field');
let nameField = document.querySelector('.name-field');


// ERROR MEESAGE
let noErrMessage = document.querySelector('.no-err-message');
let mailErrMessage = document.querySelector('.mail-err-message');
let nameErrMessage = document.querySelector('.name-err-message');


//SWITCHING PLAN TOGGLE BTN
const switchBtn = document.querySelector('.switch');
const switchToggle = document.querySelector('.switch-toggle');
const monthPlan = document.querySelector('.month-plan');
const yearPlan = document.querySelector('.year-plan');
const monthAddOns = document.querySelector('.month-adds-on');
const yearAddOns = document.querySelector('.year-adds-on');
let finishMonth = document.querySelector('.month-finish');
let finishYear = document.querySelector('.year-finish');




let activeIndex = 0;


nextButton.addEventListener('click', function(){
  //NAME-FIELD
  // WORKING WITH NAME FILED INPUT

  //Regex for Number
  const hasNumber = /\d/.test(nameField.value);


  if(nameField.value.includes(' ') && !hasNumber)
  {
    nameErrMessage.textContent = '';
    nameField.style.border = '1px solid hsl(229, 24%, 87%)';
  }else if(hasNumber){
    nameErrMessage.textContent = 'Name should not contain Number';
    nameField.style.border = '1px solid hsl(354, 84%, 57%)'
  } else {
    nameErrMessage.textContent = 'This field is required';
    nameField.style.border = '1px solid hsl(354, 84%, 57%)'
  }
  
  //EMAIL FIELD
  // Check if mail is in correct form

  //Regex for Email
  let emailPattern = /^([a-zA-X0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;

  if (mailField.value && mailField.value.match(emailPattern)) {
    mailErrMessage.textContent = '';
    mailField.style.border = '1px solid hsl(229, 24%, 87%)'
  } else if(!mailField.value.match(emailPattern)) {
    mailErrMessage.textContent = 'Email not valid'
  }
  
  if(!mailField.value) {
    mailErrMessage.textContent = 'This field is required'
    mailField.style.border = '1px solid hsl(354, 84%, 57%)'
  }

  

  // NUMBER FIELD

  //Regex for Mobile phone
  let mobilePhonePattern1 = /^\(?\d{4}\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  if(!numberField.value) {
    noErrMessage.textContent = 'This field is required';
    numberField.style.border = '1px solid hsl(354, 84%, 57%)';
  } else if (numberField.value && mobilePhonePattern1.test(numberField.value)) {
    noErrMessage.textContent = '';
    numberField.style.border = '1px solid hsl(229, 24%, 87%)';
  }


  //If all this conditions(Name, Email and Phone Number) are met move to the next page
  if(nameField.value.includes(' ') && !hasNumber && mailField.value.match(emailPattern)  && mobilePhonePattern1.test(numberField.value)) {
    //working on icon
    
    //Working on Next Button
    if(activeIndex < stepIcons.length) {
      activeIndex++;
      // console.log(activeIndex, stepIcons.length)
      //Add Active-Step to Number Icon
      stepIcons.forEach((step, index) => {
        if(index === activeIndex) {
          step.classList.add('active-step');
        } else {
          step.classList.remove('active-step')
        }
      })

    
      // Add Active-View to Text-Box
      textBoxs.forEach((tBox, index) => {
        if(index === activeIndex) {
          tBox.classList.add('active-view')
        } else {
          tBox.classList.remove('active-view')
        }
      })

      if(activeIndex === 3) {
        nextButton.textContent = 'Confirm';
      }
    }
    
    //Providing Thank you message on the last page
    if(activeIndex === stepIcons.length) {
      thankYou.classList.toggle('hidden');
      inView.classList.toggle('hidden');
    }

    // Display Previous Button
    previousButton.textContent = 'Go Back';
    
    // // WORKING WITH PLAN PAGE
    const plans = document.querySelectorAll('.plan');
    
    // MONTH PLAN
    document.querySelector('.month-plan').addEventListener('click', e => {
      const clicked = e.target.closest('.plan');
      if(clicked){

      }
      
      plans.forEach(plan => {
        plan.classList.remove('active-plan')
      })
      
      if(clicked) {
        clicked.classList.add('active-plan');
      }
      
    })
    
    let finalPlan =document.querySelector('.final-plan');
    let finalAmount= document.querySelector('.final-amount');
    let totalAmount  = document.querySelector('.total-amount');
    let onlineCharges = document.querySelector('.online-charges');
    let confirmCharges = document.querySelector('.storage-charges');
    let confirmAddOns = document.querySelectorAll('.confirm-add-on');

    
    // YEAR PLAN
    document.querySelector('.year-plan').addEventListener('click', e => {
      const clicked = e.target.closest('.plan')
      plans.forEach(plan => {
        plan.classList.remove('active-plan')
      })
      
      if(clicked) {
        clicked.classList.add('active-plan');
      }
    })
    
    // SWITCHING TOGGLES
    switchBtn.addEventListener('click', e =>{
      switchToggle.classList.toggle('active-toggle');
      
      // CHANGING OF PLAN
      monthPlan.classList.toggle('active-toggle-plan');
      yearPlan.classList.toggle('active-toggle-plan');
      
      // CHANGING OF ADDS ON
      monthAddOns.classList.toggle('active-add-ons');
      yearAddOns.classList.toggle('active-add-ons');
      
      // CHANGING OF FINISH UP PLAN
      finishMonth.classList.toggle('active-finish');
      finishYear.classList.toggle('active-finish');
    });


    let fAmountValue;
    let mthYr;
    let monYear;
    let per = document.querySelector('.per')

    plans.forEach((plan, index) => {
      plan.addEventListener('click', function() {

        // WORKING ON TEXTCONTENT IN SELECT PLAN
        
        if(index === 0 || index === 1 || index === 2) {
          mthYr = 'Monthly';
          monYear = '/mo';
          per.textContent = '(per month)';

        } else if (index === 3 || index === 4 || index === 5) {
          mthYr = 'Yearly'
          monYear = '/yr'
          per.textContent = '(per year)';
        }


        if(index === 0 || index === 3) {
          finalPlan.textContent = `Arcade (${mthYr})`;
        } else if (index === 1 || index === 4) {
          finalPlan.textContent = `Advanced (${mthYr})`
        } else if (index === 2 || index === 5) {
          finalPlan.textContent = `Pro (${mthYr})`
        }

        // WORKING ON FINISH UP VALUE
        if(index === 0) {
          fAmountValue = 9
          finalAmount.textContent = `$${fAmountValue}${monYear}`;
        } else if(index === 1) {
          fAmountValue = 12
          finalAmount.textContent = `$${fAmountValue}${monYear}`;
        } else if(index === 2) {
          fAmountValue = 15;
          finalAmount.textContent = `$${fAmountValue}${monYear}`;
        } else if(index === 3) {
          fAmountValue = 90
          finalAmount.textContent = `$${fAmountValue}${monYear}`;
        } else if(index === 4) {
          fAmountValue = 120
          finalAmount.textContent = `$${fAmountValue}${monYear}`;
        } else if(index === 5) {
          fAmountValue = 150
          finalAmount.textContent = `$${fAmountValue}${monYear}`;
        }

        // Calculating Total Amount
        let planValue = Number.parseFloat(`${fAmountValue}`);
        let exCharges;
        let onCharge;

        if(finishYear.classList.contains('active-finish')) {
          exCharges = 10
          onCharge = 20
          confirmCharges.textContent = `$${exCharges}/yr`;
          onlineCharges.textContent = `$${onCharge}/yr`;

          totalAmount.textContent = `$${planValue + exCharges + onCharge}${monYear}`;
        } else if(finishMonth.classList.contains('active-finish')) {
          exCharges = 1;
          onCharge = 2;
          confirmCharges.textContent = `$${exCharges}/mo`;
          onlineCharges.textContent = `$${onCharge}/mo`;

          totalAmount.textContent = `$${planValue + exCharges + onCharge}${monYear}`;
        }
      })
    })

  }
})


// Working on Previous Button
previousButton.addEventListener('click', function() {
  if(activeIndex > 0) {
    activeIndex--;

    stepIcons.forEach((step, index) => {
      if(index === activeIndex) {
        step.classList.add('active-step');
      } else {
        step.classList.remove('active-step')
      }
    })


    textBoxs.forEach((tBox, index) => {
      if(index === activeIndex) {
        tBox.classList.add('active-view')
      } else {
        tBox.classList.remove('active-view')
      }
    })
  }

  //When the previous button index is equal to 0 the text content should be empty
  if(activeIndex === 0) {
    previousButton.textContent = '';
  }
  //If active Index is less than 3 the text content for next button should be 'Next Page'
  if(activeIndex < 3){
    nextButton.textContent = 'Next Page'
  }
})


const changePlan = document.querySelector('.change');
const box2 = document.querySelector('.text-box--2');
const box4 = document.querySelector('.text-box--4');


changePlan.addEventListener('click', function(){
  box2.classList.add('active-view');
  box4.classList.remove('active-view');
})

    


