const openStakePopup=()=>{$(".popup-card-section").show().fadeIn("linear",50);};const closePopup=()=>{$(".secondTable").hide();$(".firstTable").show().fadeIn("linear",50);$(".popup-card-section").hide();};const openRefferralPopup=()=>{$("#referral-popup").show().fadeIn("linear",50);};const closeRefferralPopup=()=>{$("#referral-popup").hide();};const openLoginPopup=()=>{$("#login-popup").show().fadeIn("linear",50);setTimeout(()=>{closeLoginPopup();},5000);};const closeLoginPopup=()=>{$("#login-popup").hide();};const showLoadingSpinner=()=>{$(".staking-btn").html('Start Staking <div class="spinner"><i class="fas fa-spinner"></i></div>');};const hideLoadingSpinner=()=>{$(".staking-btn").html('Start Staking');};$(".secondTable").hide();closePopup();closeRefferralPopup();closeLoginPopup();$("input[type='radio'][name='tenure']").on("change",()=>{const tenure=$("input[type='radio'][name='tenure']:checked").val();if(tenure.includes("Half")){$("input[type='number'][name='aprAmount']").val("10");}else{$("input[type='number'][name='aprAmount']").val("24");}});$(document).on("submit","#formSubmit",function(event){event.preventDefault();const tenure=$("input[type='radio'][name='tenure']:checked").val();const tokenAmount=$("input[type='number'][name='tokenAmount']").val();const aprAmount=$("input[type='number'][name='aprAmount']").val();let currentDate=new Date();let endDate=new Date();var options={year:"numeric",month:"long",day:"numeric",};$(".tokenAmount").html(tokenAmount);$(".tenureYearValue").html(tenure);$(".aprAmountValue").html(aprAmount);$("#startDate").html(currentDate.toLocaleDateString("en-IN",options));if(tenure==="yearly"){endDate.setFullYear(endDate.getFullYear()+1);}else{endDate.setMonth(endDate.getMonth()+6);}
$("#endDate").html(endDate.toLocaleDateString("en-IN",options));console.log(tenure);const totalAmount=tokenAmount*(aprAmount/100);$(".totalPrice").html(totalAmount);nextPage();});const nextPage=()=>{$(".firstTable").hide();$(".secondTable").show().fadeIn("linear",50);};const previousPage=()=>{$(".secondTable").hide();$(".firstTable").show().fadeIn("linear",50);};$(document).ready(function(){$(".formSubmit").submit((e)=>{e.preventDefault();});$(".navbar-toggle").on("click",()=>{$(".sidebar").toggleClass("show-sidebar");if($(".navbar-toggle i").hasClass("fa-times")){$(".navbar-toggle").html('<i class="fas fa-bars"></i>');}else{$(".navbar-toggle").html('<i class="fas fa-times"></i>');}});});function copyToClipboard(elementId){var aux=document.createElement("input");aux.setAttribute("value",document.getElementById(elementId).innerHTML);document.body.appendChild(aux);aux.select();document.execCommand("copy");alert("Referral Copied To Clipboard");document.body.removeChild(aux);}