	document.getElementById("chk-btn1").style.borderBottomColor = "#064acb";
	document.getElementById("register-form").style.display = "none";
function fun1(){
	setTimeout(window.open("login.html","_self"),1000);
};
function func_loginBtn(){
	document.getElementById("login-form").style.display = "block";
	document.getElementById("register-form").style.display = "none";
	document.getElementById("chk-btn1").style.borderBottomColor = "#064acb";
	document.getElementById("chk-btn2").style.borderBottomColor = "transparent";

}
function func_registerBtn(){
	document.getElementById("login-form").style.display = "none";
	document.getElementById("register-form").style.display = "block";
	document.getElementById("chk-btn1").style.borderBottomColor = "transparent";
	document.getElementById("chk-btn2").style.borderBottomColor = "#064acb";
}
