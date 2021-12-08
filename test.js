var userArray = new Array();//定义用户数组
var timer;
var outUser;
var randomNumber;
var inUser;
var flag = false

function startRun() {
    $('#successUser').html('');
    randomNumber = document.getElementById('randomNumber').value
    outUser = shuffle(userArray);
    if (randomNumber == 0) {
        alert("请设置抽人数!!!!")
    } else if (randomNumber > outUser.length) {
        alert("参与人数不够！！！")
    } else {
        flag = true
        timer = setInterval("randomShow()", 10);
    }

}

function shuffle(arr) {
    //著名的洗牌算法，原理就是遍历数组元素，将当前元素与随机抽取的一个剩余元素进行交换。
    for (let i = arr.length - 1; i >= 0; i--) {
        let rIndex = Math.floor(Math.random() * (i + 1));
        // 打印交换值
        // console.log(i, rIndex);
        let temp = arr[rIndex];
        arr[rIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function randomShow() {
    pcount = userArray.length - 1;
    num = Math.floor(Math.random() * pcount);
    html = userArray[num]
    $('#randomUser').html(html)
}

function stop() {
    if (flag) {
        let html = ''
        clearInterval(timer);
        //$('#start').removeAttr('disabled');
        $('#randomUser').html('');
        for (i = 0; i < randomNumber; i++) {
            var number = i + 1
            html += '<br><span class="badge badge-success">第' + number + '名-----' + outUser[i] + '</span><br>'
        }
        var newUser = new Array();
        for (i = randomNumber; i < outUser.length; i++) {
            newUser[i - randomNumber] = outUser[i]
        }
        userArray = newUser;
        showUsr(userArray)

        $('#successUser').html(html);
    }
}


function upload(input) {
    //支持chrome IE10
    if (window.FileReader) {
        var file = input.files[0];
        filename = file.name.split(".")[0];
        var reader = new FileReader();
        reader.onload = function () {
            // $("#tableuser").html(this.result);
            console.log(this.result);
            inUser = this.result.split('\n')
            showUsr(inUser)
        }
        reader.readAsText(file);
    }

}

function showUsr(arr) {
    $('#tableuser').html("")
    var user
    for (i = 0; i < arr.length; i++) {
        userArray[i] = arr[i]
        user += '<tr><td>' + arr[i] + '</td></tr>'
    }
    $('#tableuser').html(user);
}