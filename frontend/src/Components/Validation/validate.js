export const validateField = function(field, regex){
    let obj = document.getElementById(field);
    if (regex.test(obj.value)){
        setVisible(field+"Error", false);
    }
    else{
        setVisible(field+"Error", true);
        let errorText = document.getElementById(field + "Error");
        errorText.className = "block text-red left-2 relative";
    }
}
export const setVisible = function(elem,flag){
    let obj = document.getElementById(elem)
    if(flag){
        obj.className = ""
    }
    else{
        obj.className = "invisible absolute top-0"
    }
}