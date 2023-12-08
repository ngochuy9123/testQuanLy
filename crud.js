


function readInfo(hinhanh, tensp, slg, giaVon, giaBan, sDate){
    document.querySelector('.showImg').src = hinhanh,
    document.querySelector('#showName').value = tensp,
    document.querySelector("#showAge").value = slg,
    document.querySelector("#showEmail").value = formatPrice(giaVon),
    document.querySelector("#showPhone").value = formatPrice(giaBan),
    document.querySelector("#showsDate").value = sDate
}

function editInfo(idsp,hinhanh, tensp, slg, giaVon, giaBan, ngayNhapHang){
    var imgInput = document.querySelector(".img"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    modalTitle = document.querySelector("#userForm .modal-title")
    inpId = document.getElementById("maSp")

    inpId.value = idsp
    imgInput.src = hinhanh
    userName.value = tensp
    age.value = slg
    email.value = giaVon,
    phone.value = giaBan,
    sDate.value = ngayNhapHang

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}






function resetTable(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
}

document.addEventListener('DOMContentLoaded', function () {
    const newUserButton = document.getElementById('btnNewProduct');

    if (newUserButton) {
        newUserButton.addEventListener('click', function () {
            const currentDate = new Date();

            // Định dạng ngày thành chuỗi "YYYY-MM-DD"
            const formattedDate = currentDate.toISOString().split('T')[0];

            // Đặt giá trị cho trường ngày
            document.getElementById('sDate').value = formattedDate;
        });
    }
});


function formatPriceInp(input) {
    // Lấy giá trị từ input
    let inputValue = input.value;

    // Xóa các dấu chấm phân cách hàng nghìn
    let numericValue = inputValue.replace(/[^\d.]/g, '');

    // Xóa các dấu chấm phân cách hàng nghìn
    numericValue = numericValue.replace(/\./g, '');

    // Chèn dấu chấm phân cách hàng nghìn
    numericValue = numericValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    // Gán giá trị đã định dạng trở lại cho input
    input.value = numericValue;
}

function formatPrice(num){
    num = num.replace(/\./g, '');

    // Chèn dấu chấm phân cách hàng nghìn
    num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return num
}