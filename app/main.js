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
                <div id="popup" class="popup w-[25rem] h-[95vh] bg-[white] rounded-[20px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[0.6rem] flex flex-col gap-[10px] overflow-y-auto">
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
                            <input type="text" id="staff_photo_input" placeholder="Click 'Entrer' to get the image"  class="bg-[white] ml-[8px] border border-gray-300 focus:outline-none focus:border-blue-500 rounded-[8px]">
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
                    e.target.addEventListener("keydown", (event)=>{
                        if(event.target.key == "Enter"){
                            profileImg.src = img_url.value;
                        }
                    })
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
                let start_date_inputs = document.querySelectorAll("input[id='experience_start']");
                let end_date_inputs = document.querySelectorAll("input[id='experience_end']");
                if(result == 0 && filterDateInputs(start_date_inputs, end_date_inputs)){
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
                    userData[how_much_staff]["state"] = "without_work";
                    
                    document.getElementById("add_staff").remove();
                    document.getElementById("non_used_staffs").insertAdjacentHTML('beforeend', `
                        <div id="staff_without_work_${how_much_staff}" class="non_used_card w-[90%] h-[auto] bg-[white] px-[2px] rounded-[8px]">
                            <div class="non_used_text">
                                <h2 class="text-black text-[25px] mb-[-5px]">${staffName}</h2>
                                <p class="text-gray-400">${staffRole}</p>
                            </div>
                            <div class="non_used_btns flex flex-wrap gap-[5px] px-[2px] py-[7px]">
                                <button id="edit_btn_${how_much_edit_btn}" class="edit_btn bg-yellow-500 text-[white] py-[0.2rem] flex-1 px-[auto] rounded-[8px]">Edit</button>
                                <button id="remove_btn_${how_much_staff}" class="remove_btn bg-red-400 text-[white] py-[0.2rem] flex-1 px-[auto] rounded-[8px]">Remove</button>
                            </div>
                        </div>
                    `);
                    document.getElementById(`staff_without_work_${how_much_staff}`).addEventListener("click", ()=>{
                        main.insertAdjacentHTML("beforeend", `
                            <div id="show_staff" class="show_staff fixed top-[0] left-[0] w-[100%] h-[100vh]">
                                <div id="show_staff_popup" class="show_staff_popup w-[25rem] h-[95vh] bg-[white] rounded-[20px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[0.6rem] flex flex-col gap-[10px] overflow-y-auto">
                                    <div id="staff_name" class="staff_name flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                        <label>Staff Name:</label>
                                        <label id="staff_name" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                    </div>

                                    <div id="staff_role" class="staff_role flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                        <label>Staff Role:</label>
                                        <label id="staff_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                    </div>

                                    <div id="staff_photo" class="staff_photo flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                        <div class="staff_photo_url">
                                            <label>Photo:</label>
                                            <img id="profileImg" src="./assets/no-image.svg" class="bg-gray-500 rounded-[50%] object-cover w-[7rem] h-[7rem]" alt="staff image" title="staff image">
                                            </div>
                                    </div>
                                    <div id="staff_email" class="staff_email flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                        <label>Staff Email:</label>
                                        <label id="staff_email" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">
                                        
                                    </div>

                                    <div id="staff_tel" class="staff_tel flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                        <label>Staff Phone:</label>
                                        <label id="staff_tel" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">
                                        
                                    </div>

                                    <div id="staff_experience" class="staff_experience flex flex-col">
                                        <div class="staff_experience_one flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                            <div class="experience_company flex flex-col">
                                                <label>Company:</label>
                                                <label id="experience_company" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                            </div>

                                            <div class="experience_role flex flex-col">
                                                <label>Role:</label>
                                                <label id="experience_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                            </div>

                                            <div class="experience_start flex flex-col">
                                                <label>Started at:</label>
                                                <label id="experience_start" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                            </div>

                                            <div class="experience_end flex flex-col">
                                                <label>Finished at:</label>
                                                <label id="experience_end" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                            </div>
                                        </div>
                                        <div id="staff_experience_add" class="staff_experience_add flex flex-col gap-[5px] mt-[5px]">

                                        </div>
                                    </div>
                                    <div id="popup_btns" class="popup_btns w-[100%] flex gap-[7px] relative">
                                    <button id="close_show_staff" class="bg-red-400 text-[white] py-[0.2rem] px-[0.5rem] w-[100%] rounded-[8px]">Close</button>
                                </div>
                                </div>
                                
                    </div>
                            `);
                    document.querySelectorAll("label[id]").forEach(iteem => {
                        if(!iteem.getAttribute("id").includes("experience")){
                            iteem.textContent = userData[how_much_staff - 1][iteem.getAttribute("id")];
                        } else if(iteem.getAttribute("id").includes("experience_company")) {
                            if(userData[how_much_staff - 1]["experience_company"].length > 1){
                                for (let i = 1; i < userData[how_much_staff - 1]["experience_company"].length; i++){
                                    document.getElementById("staff_experience_add").insertAdjacentHTML("beforeend", `
                                        <div class="staff_experience_${i+1} flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                            <div class="experience_company flex flex-col">
                                                <label>Company:</label>
                                                <label id="experience_company" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[how_much_staff - 1]["experience_company"][i]}</label>
                                            </div>

                                            <div class="experience_role flex flex-col">
                                                <label>Role:</label>
                                                <label id="experience_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[how_much_staff - 1]["experience_role"][i]}</label>
                                            </div>

                                            <div class="experience_start flex flex-col">
                                                <label>Started at:</label>
                                                <label id="experience_start" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[how_much_staff - 1]["experience_start"][i]}</label>
                                            </div>

                                            <div class="experience_end flex flex-col">
                                                <label>Finished at:</label>
                                                <label id="experience_end" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[how_much_staff - 1]["experience_end"][i]}</label>
                                            </div>
                                        </div>
                                        `)
                                }
                            }
                            document.getElementById("experience_company").textContent = userData[how_much_staff - 1]["experience_company"][0];
                            document.getElementById("experience_role").textContent = userData[how_much_staff - 1]["experience_role"][0];
                            document.getElementById("experience_start").textContent = userData[how_much_staff - 1]["experience_start"][0];
                            document.getElementById("experience_end").textContent = userData[how_much_staff - 1]["experience_end"][0];
                        } else if(iteem.getAttribute("id").includes("staff_role")){
                            iteem.textContent = userData[how_much_staff - 1]["staff_role"];
                        }
                    })
                    document.getElementById("close_show_staff").addEventListener("click", ()=>{
                        document.getElementById("show_staff").remove()
                    })
                    })
                    if(document.getElementById(`remove_btn_${how_much_edit_btn}`)){
                        let rem_btn = document.getElementById(`remove_btn_${how_much_edit_btn}`);
                        rem_btn.addEventListener("click", (e)=>{
                            e.stopPropagation();
                            rem_btn.parentNode.parentNode.remove();
                            delete userData[how_much_staff];
                        }) 
                    }
                    
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
                e.stopPropagation();
                main.insertAdjacentHTML("beforeend", `
                <div id="edit_staff_div" class="edit_staff_div fixed top-[0] left-[0] w-[100%] h-[100vh]">
                    <div id="popup" class="popup w-[25rem] h-[95vh] bg-[white] rounded-[20px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[0.6rem] flex flex-col gap-[10px] overflow-y-auto">
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
                Object.entries(userData[id]).forEach(([key,value]) => {
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
                    let start_date_inputs = document.querySelectorAll("input[id='experience_start']");
                    let end_date_inputs = document.querySelectorAll("input[id='experience_end']");
                    if(result == 0 && filterDateInputs(start_date_inputs, end_date_inputs)){
                        let staffName = document.querySelector("#staff_name input").value;
                        let staffRole = document.querySelector("#staff_role select").value;
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
    
    
    function staffsManagament(){
        const divs = document.querySelectorAll("#entreprise div[id]");
        divs.forEach(itm => {
            itm.classList.add("flex");
            itm.classList.add("justify-center");
            itm.classList.add("items-center");
            itm.insertAdjacentHTML("beforeend", `
                    <div id="${itm.getAttribute("id")}_content" class="bg-[white] hover:[&_h2]:block hover:[&_button]:flex hover:transition-[0.3] transition-[0.3] w-[95%] h-[95%] rounded-[8px] flex flex-col gap-[5px] justify-center items-center">
                        <h2 class="text-bold">${itm.getAttribute("id").replaceAll("_", " ")}</h2>
                        <div id="${itm.getAttribute("id")}_staffs" class="bg-black/20 py-[4px] rounded-[8px] w-[90%] h-[80px] overflow-y-auto flex flex-col gap-[5px] items-center my-[10px] "></div>
                        <button id="${itm.getAttribute("id")}_add_btn" class="bg-[#007BFF] flex flex-col justify-center items-center w-[3rem] h-[3rem] rounded-[50%]"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
                    </div>
                `);
            changeColor(Array.from(document.getElementById(`${itm.getAttribute("id")}_staffs`).querySelectorAll("div")), document.getElementById(`${itm.getAttribute("id")}_content`));
            let change = document.getElementById(`${itm.getAttribute("id")}_content`);
            // }
            document.getElementById(`${itm.getAttribute("id")}_add_btn`).addEventListener("click", (e)=>{
                main.insertAdjacentHTML("beforeend", `
                        <div id="assign_staff" class="add_staff fixed top-[0] left-[0] w-[100%] h-[100vh]">
                            <div id="assign_staff_popup" class="popup w-[25rem] h-[95vh] bg-[white] rounded-[20px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[0.6rem] flex flex-col items-center gap-[10px] overflow-y-auto relative">
                                <div id="popup_btns" class="popup_btns w-[100%] flex justify-center gap-[7px] absolute bottom-[5px]">
                                    <button id="close_assign_staff" class="bg-red-400 text-[white] py-[0.2rem] px-[0.5rem] w-[90%] rounded-[8px]">Close</button>
                                </div>
                            </div>
                            
                        </div>
                    `);
                document.getElementById("close_assign_staff").addEventListener("click", (e)=>{
                    e.preventDefault();
                    document.getElementById("assign_staff").remove();
                })
                const assignStaffPopup = document.getElementById("assign_staff_popup");
                Object.entries(userData).forEach(([key, value]) => {
                    let staff_roole = userData[key]["staff_role"];
                    let staff_naaaame = userData[key]["staff_name"];
                    if(filterStaffsBeforeAssign(staff_roole, itm.getAttribute("id")) && userData[key]["state"] == "without_work"){
                        assignStaffPopup.insertAdjacentHTML("afterbegin", `
                                <div id="assign_staff_${key}" class="assign_staff_card w-[95%] bg-gray-200 h-[auto] bg-[white] px-[2px] rounded-[8px]">
                                    <div class="assign_staff_text">
                                        <h2 class="text-black text-[25px] mb-[-5px]">${staff_naaaame}</h2>
                                        <p class="text-gray-400">${staff_roole}</p>
                                    </div>
                                    <div class="assign_staff_btns flex flex-wrap gap-[5px] px-[2px] py-[7px]">
                                        <button id="assign_btn_${key}" class="edit_btn bg-[#007BFF] text-[white] py-[0.2rem] flex-1 px-[auto] rounded-[8px]">Assing</button>
                                    </div>
                                </div>
                            `);
                        document.getElementById(`assign_staff_${key}`).addEventListener("click", ()=>{
                                main.insertAdjacentHTML("beforeend", `
                                    <div id="show_staff" class="show_staff fixed top-[0] left-[0] w-[100%] h-[100vh]">
                                        <div id="show_staff_popup" class="show_staff_popup w-[25rem] h-[95vh] bg-[white] rounded-[20px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[0.6rem] flex flex-col gap-[10px] overflow-y-auto">
                                            <div id="staff_name" class="staff_name flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <label>Staff Name:</label>
                                                <label id="staff_name" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                            </div>

                                            <div id="staff_role" class="staff_role flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <label>Staff Role:</label>
                                                <label id="staff_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                            </div>

                                            <div id="staff_photo" class="staff_photo flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <div class="staff_photo_url">
                                                    <label>Photo:</label>
                                                    <img id="profileImg" src="./assets/no-image.svg" class="bg-gray-500 rounded-[50%] object-cover w-[7rem] h-[7rem]" alt="staff image" title="staff image">
                                                    </div>
                                            </div>
                                            <div id="staff_email" class="staff_email flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <label>Staff Email:</label>
                                                <label id="staff_email" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">
                                                
                                            </div>

                                            <div id="staff_tel" class="staff_tel flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <label>Staff Phone:</label>
                                                <label id="staff_tel" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">
                                                
                                            </div>

                                            <div id="staff_experience" class="staff_experience flex flex-col">
                                                <div class="staff_experience_one flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                    <div class="experience_company flex flex-col">
                                                        <label>Company:</label>
                                                        <label id="experience_company" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                    </div>

                                                    <div class="experience_role flex flex-col">
                                                        <label>Role:</label>
                                                        <label id="experience_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                    </div>

                                                    <div class="experience_start flex flex-col">
                                                        <label>Started at:</label>
                                                        <label id="experience_start" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                    </div>

                                                    <div class="experience_end flex flex-col">
                                                        <label>Finished at:</label>
                                                        <label id="experience_end" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                    </div>
                                                </div>
                                                <div id="staff_experience_add" class="staff_experience_add flex flex-col gap-[5px] mt-[5px]">

                                                </div>
                                            </div>
                                            <div id="popup_btns" class="popup_btns w-[100%] flex gap-[7px] relative">
                                            <button id="close_show_staff" class="bg-red-400 text-[white] py-[0.2rem] px-[0.5rem] w-[100%] rounded-[8px]">Close</button>
                                        </div>
                                        </div>
                                        
                            </div>
                                    `);
                            document.querySelectorAll("label[id]").forEach(iteem => {
                                if(!iteem.getAttribute("id").includes("experience")){
                                    iteem.textContent = userData[key][iteem.getAttribute("id")];
                                } else if(iteem.getAttribute("id").includes("experience_company")) {
                                    if(userData[key]["experience_company"].length > 1){
                                        for (let i = 1; i < userData[key]["experience_company"].length; i++){
                                            document.getElementById("staff_experience_add").insertAdjacentHTML("beforeend", `
                                                <div class="staff_experience_${i+1} flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                    <div class="experience_company flex flex-col">
                                                        <label>Company:</label>
                                                        <label id="experience_company" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_company"][i]}</label>
                                                    </div>

                                                    <div class="experience_role flex flex-col">
                                                        <label>Role:</label>
                                                        <label id="experience_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_role"][i]}</label>
                                                    </div>

                                                    <div class="experience_start flex flex-col">
                                                        <label>Started at:</label>
                                                        <label id="experience_start" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_start"][i]}</label>
                                                    </div>

                                                    <div class="experience_end flex flex-col">
                                                        <label>Finished at:</label>
                                                        <label id="experience_end" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_end"][i]}</label>
                                                    </div>
                                                </div>
                                                `)
                                        }
                                    }
                                    document.getElementById("experience_company").textContent = userData[key]["experience_company"][0];
                                    document.getElementById("experience_role").textContent = userData[key]["experience_role"][0];
                                    document.getElementById("experience_start").textContent = userData[key]["experience_start"][0];
                                    document.getElementById("experience_end").textContent = userData[key]["experience_end"][0];
                                } else if(iteem.getAttribute("id").includes("staff_role")){
                                    iteem.textContent = userData[key]["staff_role"];
                                }
                            })
                            document.getElementById("close_show_staff").addEventListener("click", ()=>{
                                document.getElementById("show_staff").remove()
                            })
                            })
                    }
                    if(document.getElementById(`assign_btn_${key}`)){
                        document.getElementById(`assign_btn_${key}`).addEventListener("click", (e)=>{
                            e.stopPropagation();
                            e.preventDefault();
                            userData[key]["state"] = "with_work";
                            let container = document.getElementById(`${itm.getAttribute("id")}_staffs`);
                            container.insertAdjacentHTML("beforeend", `
                                    <div id="staff_${key}" class="used_card w-[90%] h-[auto] bg-[white] px-[2px] rounded-[8px]">
                                        <div class="used_text">
                                            <p class="text-black text-[25px] mb-[-5px]">${staff_naaaame}</p>
                                            <p class="text-gray-400">${staff_roole}</p>
                                        </div>
                                            <button id="remove_btn_${key}" class="remove_btn bg-red-400 text-[white] py-[0.2rem] flex-1 px-[auto] rounded-[8px]">Remove</button>
                                        </div>
                                    </div>
                                `);
                            changeColor(Array.from(document.getElementById(`${itm.getAttribute("id")}_staffs`).querySelectorAll("div")), document.getElementById(`${itm.getAttribute("id")}_content`));
                            document.getElementById(`staff_${key}`).addEventListener("click", ()=>{
                                main.insertAdjacentHTML("beforeend", `
                                    <div id="show_staff" class="show_staff fixed top-[0] left-[0] w-[100%] h-[100vh]">
                                        <div id="show_staff_popup" class="show_staff_popup w-[25rem] h-[95vh] bg-[white] rounded-[20px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[0.6rem] flex flex-col gap-[10px] overflow-y-auto">
                                            <div id="staff_name" class="staff_name flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <label>Staff Name:</label>
                                                <label id="staff_name" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                            </div>

                                            <div id="staff_role" class="staff_role flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <label>Staff Role:</label>
                                                <label id="staff_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                            </div>

                                            <div id="staff_photo" class="staff_photo flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <div class="staff_photo_url">
                                                    <label>Photo:</label>
                                                    <img id="profileImg" src="./assets/no-image.svg" class="bg-gray-500 rounded-[50%] object-cover w-[7rem] h-[7rem]" alt="staff image" title="staff image">
                                                    </div>
                                            </div>
                                            <div id="staff_email" class="staff_email flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <label>Staff Email:</label>
                                                <label id="staff_email" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">
                                                
                                            </div>

                                            <div id="staff_tel" class="staff_tel flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                <label>Staff Phone:</label>
                                                <label id="staff_tel" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">
                                                
                                            </div>

                                            <div id="staff_experience" class="staff_experience flex flex-col">
                                                <div class="staff_experience_one flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                    <div class="experience_company flex flex-col">
                                                        <label>Company:</label>
                                                        <label id="experience_company" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                    </div>

                                                    <div class="experience_role flex flex-col">
                                                        <label>Role:</label>
                                                        <label id="experience_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                    </div>

                                                    <div class="experience_start flex flex-col">
                                                        <label>Started at:</label>
                                                        <label id="experience_start" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                    </div>

                                                    <div class="experience_end flex flex-col">
                                                        <label>Finished at:</label>
                                                        <label id="experience_end" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                    </div>
                                                </div>
                                                <div id="staff_experience_add" class="staff_experience_add flex flex-col gap-[5px] mt-[5px]">

                                                </div>
                                            </div>
                                            <div id="popup_btns" class="popup_btns w-[100%] flex gap-[7px] relative">
                                            <button id="close_show_staff" class="bg-red-400 text-[white] py-[0.2rem] px-[0.5rem] w-[100%] rounded-[8px]">Close</button>
                                        </div>
                                        </div>
                                        
                            </div>
                                    `);
                            document.querySelectorAll("label[id]").forEach(iteem => {
                                if(!iteem.getAttribute("id").includes("experience")){
                                    iteem.textContent = userData[key][iteem.getAttribute("id")];
                                } else if(iteem.getAttribute("id").includes("experience_company")) {
                                    if(userData[key]["experience_company"].length > 1){
                                        for (let i = 1; i < userData[key]["experience_company"].length; i++){
                                            document.getElementById("staff_experience_add").insertAdjacentHTML("beforeend", `
                                                <div class="staff_experience_${i+1} flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                    <div class="experience_company flex flex-col">
                                                        <label>Company:</label>
                                                        <label id="experience_company" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_company"][i]}</label>
                                                    </div>

                                                    <div class="experience_role flex flex-col">
                                                        <label>Role:</label>
                                                        <label id="experience_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_role"][i]}</label>
                                                    </div>

                                                    <div class="experience_start flex flex-col">
                                                        <label>Started at:</label>
                                                        <label id="experience_start" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_start"][i]}</label>
                                                    </div>

                                                    <div class="experience_end flex flex-col">
                                                        <label>Finished at:</label>
                                                        <label id="experience_end" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_end"][i]}</label>
                                                    </div>
                                                </div>
                                                `)
                                        }
                                    }
                                    document.getElementById("experience_company").textContent = userData[key]["experience_company"][0];
                                    document.getElementById("experience_role").textContent = userData[key]["experience_role"][0];
                                    document.getElementById("experience_start").textContent = userData[key]["experience_start"][0];
                                    document.getElementById("experience_end").textContent = userData[key]["experience_end"][0];
                                } else if(iteem.getAttribute("id").includes("staff_role")){
                                    iteem.textContent = userData[key]["staff_role"];
                                }
                            })
                            document.getElementById("close_show_staff").addEventListener("click", ()=>{
                                document.getElementById("show_staff").remove()
                            })
                            })
                            if(document.getElementById(`remove_btn_${how_much_edit_btn}`)){
                                let rem_btn = document.getElementById(`remove_btn_${how_much_edit_btn}`);
                                rem_btn.addEventListener("click", (e)=>{
                                    e.stopPropagation();
                                    rem_btn.parentNode.parentNode.remove();
                                    delete userData[how_much_staff];
                                }) 
                            }
                            document.getElementById(`assign_staff_${key}`).remove();
                            document.getElementById(`staff_without_work_${key}`).remove();
                            document.getElementById(`remove_btn_${key}`).addEventListener("click", (e)=>{
                                e.stopPropagation();
                                e.preventDefault();
                                document.getElementById(`staff_${key}`).remove();
                                changeColor(Array.from(document.getElementById(`${itm.getAttribute("id")}_staffs`).querySelectorAll("div")), document.getElementById(`${itm.getAttribute("id")}_content`));
                                userData[key]["state"] = "without_work";
                                document.getElementById("non_used_staffs").insertAdjacentHTML('beforeend', `
                                    <div id="staff_without_work_${key}" class="non_used_card w-[90%] h-[auto] bg-[white] px-[2px] rounded-[8px]">
                                        <div class="non_used_text">
                                            <h2 class="text-black text-[25px] mb-[-5px]">${staff_naaaame}</h2>
                                            <p class="text-gray-400">${staff_roole}</p>
                                        </div>
                                        <div class="non_used_btns flex flex-wrap gap-[5px] px-[2px] py-[7px]">
                                            <button id="edit_btn_${key}" class="edit_btn bg-yellow-500 text-[white] py-[0.2rem] flex-1 px-[auto] rounded-[8px]">Edit</button>
                                            <button id="remove_btn_${key}" class="remove_btn bg-red-400 text-[white] py-[0.2rem] flex-1 px-[auto] rounded-[8px]">Remove</button>
                                        </div>
                                    </div>
                                `);
                                document.getElementById(`staff_without_work_${key}`).addEventListener("click", ()=>{
                                    main.insertAdjacentHTML("beforeend", `
                                        <div id="show_staff" class="show_staff fixed top-[0] left-[0] w-[100%] h-[100vh]">
                                            <div id="show_staff_popup" class="show_staff_popup w-[25rem] h-[95vh] bg-[white] rounded-[20px] fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[0.6rem] flex flex-col gap-[10px] overflow-y-auto">
                                                <div id="staff_name" class="staff_name flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                    <label>Staff Name:</label>
                                                    <label id="staff_name" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                </div>

                                                <div id="staff_role" class="staff_role flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                    <label>Staff Role:</label>
                                                    <label id="staff_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                </div>

                                                <div id="staff_photo" class="staff_photo flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                    <div class="staff_photo_url">
                                                        <label>Photo:</label>
                                                        <img id="profileImg" src="./assets/no-image.svg" class="bg-gray-500 rounded-[50%] object-cover w-[7rem] h-[7rem]" alt="staff image" title="staff image">
                                                        </div>
                                                </div>
                                                <div id="staff_email" class="staff_email flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                    <label>Staff Email:</label>
                                                    <label id="staff_email" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">
                                                    
                                                </div>

                                                <div id="staff_tel" class="staff_tel flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                    <label>Staff Phone:</label>
                                                    <label id="staff_tel" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">
                                                    
                                                </div>

                                                <div id="staff_experience" class="staff_experience flex flex-col">
                                                    <div class="staff_experience_one flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                        <div class="experience_company flex flex-col">
                                                            <label>Company:</label>
                                                            <label id="experience_company" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                        </div>

                                                        <div class="experience_role flex flex-col">
                                                            <label>Role:</label>
                                                            <label id="experience_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                        </div>

                                                        <div class="experience_start flex flex-col">
                                                            <label>Started at:</label>
                                                            <label id="experience_start" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                        </div>

                                                        <div class="experience_end flex flex-col">
                                                            <label>Finished at:</label>
                                                            <label id="experience_end" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]"></label>
                                                        </div>
                                                    </div>
                                                    <div id="staff_experience_add" class="staff_experience_add flex flex-col gap-[5px] mt-[5px]">

                                                    </div>
                                                </div>
                                                <div id="popup_btns" class="popup_btns w-[100%] flex gap-[7px] relative">
                                                <button id="close_show_staff" class="bg-red-400 text-[white] py-[0.2rem] px-[0.5rem] w-[100%] rounded-[8px]">Close</button>
                                            </div>
                                            </div>
                                            
                                </div>
                                        `);
                                document.querySelectorAll("label[id]").forEach(iteem => {
                                    if(!iteem.getAttribute("id").includes("experience")){
                                        iteem.textContent = userData[key][iteem.getAttribute("id")];
                                    } else if(iteem.getAttribute("id").includes("experience_company")) {
                                        if(userData[key]["experience_company"].length > 1){
                                            for (let i = 1; i < userData[key]["experience_company"].length; i++){
                                                document.getElementById("staff_experience_add").insertAdjacentHTML("beforeend", `
                                                    <div class="staff_experience_${i+1} flex flex-col bg-gray-100 py-[10px] px-[5px] rounded-[8px]">
                                                        <div class="experience_company flex flex-col">
                                                            <label>Company:</label>
                                                            <label id="experience_company" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_company"][i]}</label>
                                                        </div>

                                                        <div class="experience_role flex flex-col">
                                                            <label>Role:</label>
                                                            <label id="experience_role" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_role"][i]}</label>
                                                        </div>

                                                        <div class="experience_start flex flex-col">
                                                            <label>Started at:</label>
                                                            <label id="experience_start" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_start"][i]}</label>
                                                        </div>

                                                        <div class="experience_end flex flex-col">
                                                            <label>Finished at:</label>
                                                            <label id="experience_end" class="bg-[white] ml-[8px] border border-blue-500 rounded-[8px]">${userData[key]["experience_end"][i]}</label>
                                                        </div>
                                                    </div>
                                                    `)
                                            }
                                        }
                                        document.getElementById("experience_company").textContent = userData[key]["experience_company"][0];
                                        document.getElementById("experience_role").textContent = userData[key]["experience_role"][0];
                                        document.getElementById("experience_start").textContent = userData[key]["experience_start"][0];
                                        document.getElementById("experience_end").textContent = userData[key]["experience_end"][0];
                                    } else if(iteem.getAttribute("id").includes("staff_role")){
                                        iteem.textContent = userData[key]["staff_role"];
                                    }
                                })
                                document.getElementById("close_show_staff").addEventListener("click", ()=>{
                                    document.getElementById("show_staff").remove()
                                })
                                })
                                if(document.getElementById(`remove_btn_${how_much_edit_btn}`)){
                                    let rem_btn = document.getElementById(`remove_btn_${how_much_edit_btn}`);
                                    rem_btn.addEventListener("click", (e)=>{
                                        e.stopPropagation();
                                        rem_btn.parentNode.parentNode.remove();
                                        delete userData[how_much_staff];
                                    }) 
                                }
                                document.getElementById(`remove_btn_${key}`).addEventListener("click", (e)=>{
                                    e.stopPropagation();
                                    document.getElementById(`remove_btn_${key}`).parentNode.parentNode.remove();
                                    delete userData[key];
                                }) 
                                editInfos(key, staff_naaaame, `edit_btn_${key}`);
                            })
                        });
                    }
                })
            })
        })
    }
    
    function filterStaffsBeforeAssign(Staff_Role, Salle_Name){
        if(Staff_Role == "Reception" && Salle_Name == "Salle_de_Réception"){
            return true;
        } else if(Staff_Role == "IT Guy" && Salle_Name == "Salle_des_serveurs"){
            return true;
        } else if(Staff_Role == "Security Guy" && Salle_Name == "Salle_de_sécurité"){
            return true;
        } else if(Staff_Role == "Manager"){
            return true;
        } else if(Staff_Role == "Cleaner" && Salle_Name != "Salle_d’archives"){
            return true;
        } else if (Staff_Role == "Others" && Salle_Name != "Salle_des_serveurs" && Salle_Name != "Salle_d’archives"){
            return true;
        } else {
            return false;
        }
    };

    function changeColor(taille, container){
        if(taille.length == 0){
            container.classList.remove("bg-[white]");
            container.classList.add("bg-red-400");
        } else {
            container.classList.add("bg-[white]");
            container.classList.remove("bg-red-400");
        }
    }

    function filterDateInputs(startFrom, endsIn){
        let how_much_valide = 0
        startFrom.forEach((item, index) => {
            let start = item.value;
            let end = endsIn[index].value;
            let StartDate = new Date(start);
            let EndsDate = new Date(end);
            if (StartDate >= EndsDate){
                item.nextElementSibling.textContent = "Please give a logic date";
                item.nextElementSibling.style.color = "red";
                endsIn[index].nextElementSibling.textContent = "Please give a logic date";
                endsIn[index].nextElementSibling.style.color = "red";
                how_much_valide++;
            } else {
                item.nextElementSibling.textContent = "";
                endsIn[index].nextElementSibling.textContent = "";
            }
        })
        if(how_much_valide == 0){
            return true;
        } else {
            return false;
        }
    }
    
    add_staff();
    staffsManagament();
})