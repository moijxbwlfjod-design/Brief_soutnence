document.addEventListener("DOMContentLoaded", ()=>{
    const add_staff_btn = document.getElementById("add_staff_btn");
    const main = document.getElementById("main");
    const pattern = {
        staff_name : {
            regex : /^[a-zA-Z ]{2,30}$/,
            message : "Give a name between 2 to 29 letters"
        },
        staff_email : {
            regex : /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message : "Give a valide email like example@gmail.com"
        },
        staff_tel : {
            regex : /^[0][5-6][0-9]{8}$/,
            message : "Give a valide phone number like 0612345678"
        },
        staff_experience : {
            regex : /^[a-zA-Z0-9 ]{10,}$/,
            message : "The experience must be at lest 10 characters"
        }
    }
    const userData = {}
    const non_used_staffs = document.getElementById("non_used_staffs");
    let how_much_edit_btn = 1;
    let how_much_staff = 1;

    function add_staff(){
        add_staff_btn.addEventListener("click", (e)=>{
           e.preventDefault();
           main.insertAdjacentHTML('beforeend', `
                <div id="add_staff" class="add_staff fixed top-[0] left-[0] w-[100%] h-[100vh]">
                <div id="popup" class="popup w-[25rem] h-[100vh] bg-[white] rounded-[20px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[0.6rem] flex flex-col gap-[10px] overflow-y-auto">
                    <div id="staff_name" class="staff_name flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                        <label for="staff_name">Staff Name:</label>
                        <input type="text" id="staff_name" placeholder="mohamed" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                        <span id="staff_name_error"></span>
                    </div>

                    <div id="staff_role" class="staff_role flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                        <label for="staff_role">Staff Role:</label>
                        <select name="staff_role" id="staff_role" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                            <option value="Reception">Reception</option>
                            <option value="IT Guy">IT Guy</option>
                            <option value="Cleaner">Cleaner</option>
                            <option value="Manager">Manager</option>
                            <option value="Security Guy">Security Guy</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div id="staff_photo" class="staff_photo flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                        <div class="staff_photo_url">
                            <label for="staff_photo">Photo URL:</label>
                            <input type="text" id="staff_photo_input" placeholder="https://......"  class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                        </div>
                        <div class="staff_photo_upload flex flex-col items-center gap-[10px] my-[10px]">
                            <div class="staff_photo_upload_img">
                                <input type="file" id="hidden" class="hidden">
                                <img id="profileImg" src="./assets/no-image.svg" class="bg-gray-500 rounded-[50%] object-cover w-[7rem] h-[7rem]" alt="staff image" title="staff image">
                            </div>
                            <button id="upload_img_btn" class="bg-[#007BFF] text-[white] px-[1rem] py-[0.4rem] rounded-[8px]">Upload</button>
                        </div>
                    </div>

                    <div id="staff_email" class="staff_email flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                        <label for="staff_email">Staff Email:</label>
                        <input type="text" id="staff_email" placeholder="mohamed@gmail.com" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                        <span id="staff_email_error"></span>
                    </div>

                    <div id="staff_tel" class="staff_tel flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                        <label for="staff_tel">Staff Phone:</label>
                        <input type="text" id="staff_tel" placeholder="0612345678" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                        <span id="staff_tel_error"></span>
                    </div>

                    <div id="staff_experience" class="staff_experience flex flex-col">
                        <div class="staff_experience_one flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                            <div class="experience_company flex flex-col">
                                <label for="experience_company">Company:</label>
                                <input type="text" id="experience_company" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                <span></span>
                            </div>

                            <div class="experience_role flex flex-col">
                                <label for="experience_role">Role:</label>
                                <input type="text" id="experience_role" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                <span></span>
                            </div>

                            <div class="experience_start flex flex-col">
                                <label for="experience_start">Started at:</label>
                                <input type="date" id="experience_start" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                <span></span>
                            </div>

                            <div class="experience_end flex flex-col">
                                <label for="experience_end">Finished at:</label>
                                <input type="date" id="experience_end" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                <span></span>
                            </div>
                        </div>
                        <div id="staff_experience_add" class="staff_experience_add flex flex-col gap-[5px] mt-[5px]">

                        </div>
                        <div class="staff_experience_btn ml-[auto] my-[5px]">
                            <button id="add_staff_experience" class="bg-[#007BFF] text-[white] px-[0.5rem] rounded-[8px] w-[3rem] ml-[auto]">Add</button>
                            <button id="remove_staff_experience" class="bg-red-400 text-[white] px-[0.5rem] rounded-[8px] w-[5rem] ml-[auto]">Remove</button>
                        </div>
                    </div>

                    <div id="popup_btns" class="popup_btns w-[100%] flex gap-[7px] relative">
                        <button id="save_staff" class="bg-green-400 text-[white] py-[0.2rem] px-[0.5rem] w-[100%] rounded-[8px]">Save</button>
                        <button id="close_staff_popup" class="bg-red-400 text-[white] py-[0.2rem] px-[0.5rem] w-[100%] rounded-[8px]">Close</button>
                    </div>
                </div>
            </div>
           `);
           const save_staff_btn = document.getElementById("save_staff");
           const close_staff_popup = document.getElementById("close_staff_popup");
           const add_experience_btn = document.getElementById("add_staff_experience")
           const remove_experience_btn = document.getElementById("remove_staff_experience");
           const add_img = document.getElementById("upload_img_btn");
           const img_url = document.getElementById("staff_photo_input");
           const profileImg = document.getElementById("profileImg");
           const hiddenInput = document.getElementById("hidden");
           remove_experience_btn.style.display = "none";
    
            add_img.addEventListener("click", (e)=>{
                e.preventDefault()
                img_url.disabled = true;
                img_url.classList.add("disabled:cursor-not-allowed");
                hiddenInput.click();
            });


            hiddenInput.addEventListener("change", ()=>{
                const file = hiddenInput.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event)=>{
                    profileImg.src = event.target.result;
                };
                reader.readAsDataURL(file);
            })


            img_url.addEventListener("input", (e)=>{
                e.preventDefault()
                if(img_url.value.length > 0){
                    add_img.disabled = true;
                    hiddenInput.disabled = true;
                    add_img.classList.remove("bg-[#007BFF]")
                    add_img.classList.add("bg-[#CED4DA]");
                    add_img.classList.add("disabled:text-[#6C757D]");
                    add_img.classList.add("disabled:cursor-not-allowed");
                } else {
                    add_img.disabled = false;
                    hiddenInput.disabled = false;
                    add_img.classList.remove("bg-[#CED4DA]");
                    add_img.classList.add("bg-[#007BFF]")
                }
            })


           add_experience_btn.addEventListener("click", (e)=>{
            e.preventDefault();
            const experience_span = document.getElementById("staff_experience_error");
            const added_experiece_container = document.getElementById("staff_experience_add")
            added_experiece_container.insertAdjacentHTML('beforeend', `
                        <div class="staff_experience_block flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                            <div class="experience_company flex flex-col">
                                <label for="experience_company">Company:</label>
                                <input type="text" id="experience_company" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                <span id="experience_company_error"></span>
                            </div>

                            <div class="experience_role flex flex-col">
                                <label for="experience_role">Role:</label>
                                <input type="text" id="experience_role" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                <span id="experience_role_error"></span>
                            </div>

                            <div class="experience_start flex flex-col">
                                <label for="experience_start">Started at:</label>
                                <input type="date" id="experience_start" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                <span id="experience_start_error"></span>
                            </div>

                            <div class="experience_end flex flex-col">
                                <label for="experience_end">Finished at:</label>
                                <input type="date" id="experience_end" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                <span id="experience_end_error"></span>
                            </div>
                        </div>
                `);
            remove_experience_btn.style.display = ""
            }
           );


           remove_experience_btn.addEventListener("click", (e)=>{
            e.preventDefault();
            let inputs = document.getElementsByClassName("staff_experience_block");
            let last_input_index = inputs.length - 1;
            if (last_input_index >= 0) {
                inputs[last_input_index].remove();
            }
            if(document.getElementsByClassName("staff_experience_block").length == 0){
                remove_experience_btn.style.display = "none";
            }
           });


            save_staff_btn.addEventListener("click", ()=>{
                let result = checkFormValidation();
                if(result == 0){
                    let staffName = document.querySelector("#staff_name input").value;
                    let staffRole = document.querySelector("#staff_role select").value;;
                    let final_input = Array.from(document.querySelectorAll("#popup input, #staff_role"));
                    let filtred_inputs = [];
                    for (let i = 0; i < final_input.length; i++){
                        if(final_input[i].disabled == false){
                            filtred_inputs.push(final_input[i]);
                        };
                    }
                    userData[how_much_staff] = {};
                    filtred_inputs.forEach(input => {
                        if(!input.getAttribute("id").includes("experience")){
                            userData[how_much_staff][input.getAttribute("id")] = input.value;
                        } else {
                            if (input.getAttribute("id") in userData[how_much_staff]){
                                userData[how_much_staff][input.getAttribute("id")].push(input.value);
                            } else {
                                userData[how_much_staff][input.getAttribute("id")] = [];
                                userData[how_much_staff][input.getAttribute("id")].push(input.value);
                            }
                        }
                    })
                    
                    document.getElementById("add_staff").remove();
                    document.getElementById("non_used_staffs").insertAdjacentHTML('beforeend', `
                        <div class="non_used_card w-[90%] h-[auto] bg-[white] px-[2px] rounded-[8px]">
                            <div class="non_used_text">
                                <h2 class="text-black text-[25px] mb-[-5px]">${staffName}</h2>
                                <p class="text-gray-400">${staffRole}</p>
                            </div>
                            <div class="non_used_btns flex flex-wrap gap-[5px] px-[2px] py-[7px]">
                                <button id="edit_btn_${how_much_edit_btn}" class="edit_btn bg-yellow-500 text-[white] py-[0.2rem] flex-1 px-[auto] rounded-[8px]">Edit</button>
                                <button id="remove_btn" class="remove_btn bg-red-400 text-[white] py-[0.2rem] flex-1 px-[auto] rounded-[8px]">Remove</button>
                            </div>
                        </div>
                    `);
                    let btn_id = `edit_btn_${how_much_edit_btn}`;
                    how_much_edit_btn++;
                    editInfos(how_much_staff, staffName, btn_id);
                    how_much_staff++;
                    
                }
            });

            close_staff_popup.addEventListener("click", ()=> {
                document.getElementById("add_staff").remove();
            });
        });
    };

    function checkFormValidation(){
        const formInputs = Array.from(document.getElementById("popup").getElementsByTagName("input"));
        let num = 0;
        formInputs.filter(item => {
            return !item.classList.contains("hidden");
        })
            formInputs.forEach(input => {
                
                if(input.getAttribute("id") in pattern){
                    let span = input.nextElementSibling;
                    if (pattern[input.getAttribute("id")].regex.test(input.value)){
                        span.textContent = "";
                        input.style.border = "";
                } else {
                    input.style.border = "1px solid red";
                    span.textContent = pattern[input.getAttribute("id")].message;
                    span.style.color = "red";
                    num++;
                }
            } else{
                if(input.getAttribute("id") != "hidden" && input.getAttribute("id") != "staff_photo_input"){
                    let spantwo = input.nextElementSibling;
                    if(input.value.length == 0){
                        input.style.border = "1px solid red";
                        spantwo.textContent = "Give valide data";
                        spantwo.style.color = "red";
                        num++;
                    } else{
                        spantwo.textContent = "";
                        input.style.border = "";
                    }
                }
            }
        })
            return num;
    }

    function editInfos(id, Staff_Name, edit_btn_id){
        if(document.getElementById(edit_btn_id)){
            const edit_btn = document.getElementById(`${edit_btn_id}`);
            edit_btn.addEventListener("click", (e)=>{
                e.preventDefault();
                main.insertAdjacentHTML("beforeend", `
                <div id="edit_staff_div" class="edit_staff_div fixed top-[0] left-[0] w-[100%] h-[100vh]">
                    <div id="popup" class="popup w-[25rem] h-[100vh] bg-[white] rounded-[20px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[0.6rem] flex flex-col gap-[10px] overflow-y-auto">
                        <div id="staff_name" class="staff_name flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                            <label for="staff_name">Staff Name:</label>
                            <input type="text" id="staff_name" placeholder="mohamed" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                            <span id="staff_name_error"></span>
                        </div>

                        <div id="staff_role" class="staff_role flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                            <label for="staff_role">Staff Role:</label>
                            <select name="staff_role" id="staff_role" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                <option value="Reception">Reception</option>
                                <option value="IT Guy">IT Guy</option>
                                <option value="Cleaner">Cleaner</option>
                                <option value="Manager">Manager</option>
                                <option value="Security Guy">Security Guy</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div id="staff_photo" class="staff_photo flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                            <div class="staff_photo_url">
                                <label for="staff_photo">Photo URL:</label>
                                <input type="text" id="staff_photo_input" placeholder="https://......"  class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                            </div>
                            <div class="staff_photo_upload flex flex-col items-center gap-[10px] my-[10px]">
                                <div class="staff_photo_upload_img">
                                    <input type="file" id="hidden" class="hidden">
                                    <img id="profileImg" src="./assets/no-image.svg" class="bg-gray-500 rounded-[50%] object-cover w-[7rem] h-[7rem]" alt="staff image" title="staff image">
                                </div>
                                <button id="upload_img_btn" class="bg-[#007BFF] text-[white] px-[1rem] py-[0.4rem] rounded-[8px]">Upload</button>
                            </div>
                        </div>

                        <div id="staff_email" class="staff_email flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                            <label for="staff_email">Staff Email:</label>
                            <input type="text" id="staff_email" placeholder="mohamed@gmail.com" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                            <span id="staff_email_error"></span>
                        </div>

                        <div id="staff_tel" class="staff_tel flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                            <label for="staff_tel">Staff Phone:</label>
                            <input type="text" id="staff_tel" placeholder="0612345678" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                            <span id="staff_tel_error"></span>
                        </div>

                        <div id="staff_experience" class="staff_experience flex flex-col">
                            <div class="staff_experience_one flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                <div class="experience_company flex flex-col">
                                    <label for="experience_company">Company:</label>
                                    <input type="text" id="experience_company" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                    <span></span>
                                </div>

                                <div class="experience_role flex flex-col">
                                    <label for="experience_role">Role:</label>
                                    <input type="text" id="experience_role" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                    <span></span>
                                </div>

                                <div class="experience_start flex flex-col">
                                    <label for="experience_start">Started at:</label>
                                    <input type="date" id="experience_start" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                    <span></span>
                                </div>

                                <div class="experience_end flex flex-col">
                                    <label for="experience_end">Finished at:</label>
                                    <input type="date" id="experience_end" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                    <span></span>
                                </div>
                            </div>
                            <div id="staff_experience_add" class="staff_experience_add flex flex-col gap-[5px] mt-[5px]">

                            </div>
                        </div>

                        <div id="popup_btns" class="popup_btns w-[100%] flex gap-[7px] relative">
                            <button id="save_staff" class="bg-green-400 text-[white] py-[0.2rem] px-[0.5rem] w-[100%] rounded-[8px]">Save</button>
                            <button id="close_staff_popup" class="bg-red-400 text-[white] py-[0.2rem] px-[0.5rem] w-[100%] rounded-[8px]">Close</button>
                        </div>
                    </div>
                </div>
                `);
                const save_staff_btn = document.getElementById("save_staff");
                const close_staff_popup = document.getElementById("close_staff_popup");
                const add_img = document.getElementById("upload_img_btn");
                const img_url = document.getElementById("staff_photo_input");
                const profileImg = document.getElementById("profileImg");
                const hiddenInput = document.getElementById("hidden");
                const Inputs = document.querySelectorAll("#edit_staff_div input, #edit_staff_div select");
                const curent_user_data = userData[id];
                console.log(`this : ${curent_user_data} and the id is : ${id}`);
                console.log(userData)
                Object.entries(curent_user_data).forEach(([key,value]) => {
                    if(!key.includes("experience")){
                        Inputs.forEach(item => {
                            if(item.getAttribute("id") == key && value.length != 0){
                                item.value = value;
                            }
                        })
                    } else if (key.includes("experience_company")) {
                            const added_experiece_container = document.getElementById("staff_experience_add");
                            for (let i = 1; i < value.length; i++){
                                added_experiece_container.insertAdjacentHTML('beforeend', `
                                            <div class="staff_experience_block flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <div class="experience_company flex flex-col">
                                                    <label for="experience_company">Company:</label>
                                                    <input type="text" id="experience_company" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                                    <span id="experience_company_error"></span>
                                                </div>

                                                <div class="experience_role flex flex-col">
                                                    <label for="experience_role">Role:</label>
                                                    <input type="text" id="experience_role" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                                    <span id="experience_role_error"></span>
                                                </div>

                                                <div class="experience_start flex flex-col">
                                                    <label for="experience_start">Started at:</label>
                                                    <input type="date" id="experience_start" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                                    <span id="experience_start_error"></span>
                                                </div>

                                                <div class="experience_end flex flex-col">
                                                    <label for="experience_end">Finished at:</label>
                                                    <input type="date" id="experience_end" class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
                                                    <span id="experience_end_error"></span>
                                                </div>
                                            </div>
                                    `);
                            };
                            let Experience_Company = document.querySelectorAll("#experience_company");
                            console.log(Experience_Company)
                            console.log(`its length is ${Experience_Company.length}`)
                            Experience_Company.forEach((itm, index) => {
                                itm.value = value[index];
                            })
                    } else if (key.includes("experience_role") || key.includes("experience_start") || key.includes("experience_end")){
                        let Experience_Company = document.querySelectorAll(`#${key}`);
                            Experience_Company.forEach((itm, index) => {
                                itm.value = value[index];
                            })
                    }
                });
                add_img.addEventListener("click", (e)=>{
                    e.preventDefault()
                    img_url.disabled = true;
                    img_url.classList.add("disabled:cursor-not-allowed");
                    hiddenInput.click();
                });


                hiddenInput.addEventListener("change", ()=>{
                    const file = hiddenInput.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event)=>{
                        profileImg.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                })


                img_url.addEventListener("input", (e)=>{
                    e.preventDefault()
                    if(img_url.value.length > 0){
                        add_img.disabled = true;
                        hiddenInput.disabled = true;
                        add_img.classList.remove("bg-[#007BFF]")
                        add_img.classList.add("bg-[#CED4DA]");
                        add_img.classList.add("disabled:text-[#6C757D]");
                        add_img.classList.add("disabled:cursor-not-allowed");
                    } else {
                        add_img.disabled = false;
                        hiddenInput.disabled = false;
                        add_img.classList.remove("bg-[#CED4DA]");
                        add_img.classList.add("bg-[#007BFF]")
                    }
                })


                save_staff_btn.addEventListener("click", ()=>{
                    let result = checkFormValidation();
                    if(result == 0){
                        let staffName = document.querySelector("#staff_name input").value;
                        let staffRole = document.querySelector("#staff_role select").value;
                        let key_name = id++;
                        let final_input = Array.from(document.querySelectorAll("#popup input, select"));
                        let company = [];
                        let role = [];
                        let start = [];
                        let end = [];
                        let filtred_inputs = []
                        for (let i = 0; i < final_input.length; i++){
                            if(final_input[i].disabled == false){
                                filtred_inputs.push(final_input[i]);
                            };
                        };
                        filtred_inputs.forEach(input => {
                            
                            if(!input.getAttribute("id").includes("experience")){
                                userData[id][input.getAttribute("id")] = input.value;
                            } else {
                                if(input.getAttribute("id").includes("company")){
                                    company.push(input.value);
                                } else if (input.getAttribute("id").includes("role")){
                                    role.push(input.value);
                                } else if (input.getAttribute("id").includes("start")){
                                    start.push(input.value);
                                } else if (input.getAttribute("id").includes("end")){
                                    end.push(input.value);
                                }
                            }
                        })
                        userData[id]["experience_end"] = end;
                        userData[id]["experience_start"] = start;
                        userData[id]["experience_role"] = role;
                        userData[id]["experience_company"] = company;
                        userData[key_name] = userData[id];
                        delete userData[id];
                        console.log(userData)
                        document.getElementById("edit_staff_div").remove();
                        edit_btn.parentNode.previousElementSibling.querySelector("h2").textContent = staffName;
                        edit_btn.parentNode.previousElementSibling.querySelector("p").textContent = staffRole;
                    }
                });

                close_staff_popup.addEventListener("click", ()=> {
                    document.getElementById("edit_staff_div").remove();
                });
            });
        }
    }
    add_staff();
    
    
    
})