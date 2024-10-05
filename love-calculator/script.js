function calculated_love() {
    var yourName = document.getElementById("yourName").value; 
    var theirName = document.getElementById("theirName").value;

    if (yourName === "" || theirName === "") {
        alert("Please enter both names.");
        return; 
    }

    var n = Math.random();
    n = n * 100;
    n = Math.floor(n);

    document.getElementById("result").innerText = yourName + " and " + theirName + "'s love percentage is: " + n + "%";
    var resultBox = document.getElementById("result");
    resultBox.style.display = "block";
}
