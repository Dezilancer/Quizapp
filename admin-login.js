
let uid
let errorMsg = document.getElementById("errorMsg")
function adminLogin() {
    var model = {}
    model.adminEmail = document.getElementById('adminEmail').value
    model.adminPassword = document.getElementById('adminPassword').value

    firebase.auth().signInWithEmailAndPassword(model.adminEmail, model.adminPassword).then(function (success) {
        uid = firebase.auth().currentUser.uid
        firebase.database().ref("user").on("child_added", function (data) {
            setTimeout(() => {
                success = data.val().dashboard
                location.replace(success)
            }, 2000);

        })
    })
        .catch(function (err) {

            adminEmail = document.getElementById('adminEmail').value
            adminPassword = document.getElementById('adminPassword').value

            if (adminPassword == "") {
                err = "Please enter your password"
            }
            errorMsg.innerHTML = err
        })

}
