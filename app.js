import {addDoc,doc,setDoc,deleteDoc,collection,getFirestore, getDocs,updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"


const db = getFirestore()
const dbRef = collection(db,"products")



// Code Mau
var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")
    




// Get Data
let products = []
const getProducts = async () =>{
    try{
        const docSnap = await  getDocs(dbRef);
        docSnap.forEach((doc) => {
            const product = doc.data()
            product.id = doc.id
            products.push(product)
        })
        console.log(products);
        
        showInfo(products)
    }
    catch (err){
        console.log("Get Products = "+err);
    }
}
getProducts()


newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./image/Profile Icon.webp"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            let imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}



async function deleteInfo(idsp){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {

            const dbRefToDelete = doc(db, "products", idsp);
  
            try{
                await deleteDoc(dbRefToDelete,data)
                .then(()=>{
                    announce("success","Xóa sản phẩm thành công")
                })
            }
            catch (err){
                console.log(err);
                announce("error","Xóa sản phẩm không thành công")
            }
        
        resetTable()
        products = []
        getProducts()

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
    });



    
  }


function showInfo(products){

    
    products.forEach((element, index) => {
        let idsp =element.id
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.hinhanh}" alt="" width="50" height="50"></td>
            <td>${element.tensp}</td>
            <td>${element.slg}</td>
            <td> ${formatPrice(element.giaVon)}</td>
            <td>${formatPrice(element.giaBan)}</td>
            <td>${element.ngayNhapHang}</td>
            <td>
                
                <button class="btn btn-success" onclick="readInfo('${element.hinhanh}', '${element.tensp}', '${element.slg}', '${ element.giaVon}', '${element.giaBan}', '${element.ngayNhapHang}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo('${element.id}','${element.hinhanh}', '${element.tensp}', '${element.slg}', '${element.giaVon}', '${element.giaBan}', '${element.ngayNhapHang}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" id = 'deleteButton_${element.id}'"><i class="bi bi-trash"></i></button>
                
                            
            </td>
        </tr>`
        

        userInfo.innerHTML += createElement
    })

    products.forEach((element) => {
        let deleteButton = document.getElementById(`deleteButton_${element.id}`);
        deleteButton.addEventListener('click', () => deleteInfo(element.id));
    })
}




form.addEventListener('submit', async (e)=> {
    e.preventDefault()
    let inpIDSP = document.getElementById("maSp")
    
    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        startDate: sDate.value,
        
    }

    let idSp = products.length+1
    if(submitBtn.innerHTML !="Update"){
        
        try{
            await addDoc(dbRef,{
                tensp:information.employeeName,
                slg:information.employeeAge,
                giaVon:information.employeeEmail,
                giaBan:information.employeePhone,
                ngayNhapHang:information.startDate,
                hinhanh: information.picture
            })
            .then(()=>{
                announce("success","Thêm sản phẩm thành công")
            })
        }
        catch (err){
            console.log(err);
            announce("error","Cập nhật sản phẩm không thành công")
        }
        submitBtn.innerText = "Submit"
        modalTitle.innerHTML = "Fill The Form"
        form.reset()
        setDay()

        imgInput.src = "./image/Profile Icon.webp"  
    }
    
    else{
        const dbRef = doc(db,"products",inpIDSP.value)
        const data = {
            tensp:userName.value,
            slg:age.value,
            giaVon:email.value,
            giaBan:phone.value,
            ngayNhapHang:sDate.value,
            hinhanh: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        }
        try{
            await updateDoc(dbRef,data)
            .then(()=>{
                announce("success","Cập nhật sản phẩm thành công")
            })
        }
        catch (err){
            console.log(err);
            announce("error","Cập nhật sản phẩm không thành công")
        }

        simulateClick()

        form.reset()
        imgInput.src = "./image/Profile Icon.webp"
        // modal.style.display = "none"
        // document.querySelector(".modal-backdrop").remove()
        
    }
    resetTable()
    products = []
    getProducts()

    
    
})

// Các function giao diện

function setDay(){
    const currentDate = new Date();

    // Định dạng ngày thành chuỗi "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Đặt giá trị cho trường ngày
    document.getElementById('sDate').value = formattedDate;
}
function formatPrice(num){
    num = num.replace(/\./g, '');

    // Chèn dấu chấm phân cách hàng nghìn
    num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return num
}

function announce(trangThai,tb){
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: trangThai,
        title: tb
      });
}

function simulateClick() {
    var btnToClick = document.getElementById('btnToggleModal');

    // Tạo một sự kiện click mới
    var clickEvent = new Event('click');

    // Gửi sự kiện click tới button
    btnToClick.dispatchEvent(clickEvent);
}
