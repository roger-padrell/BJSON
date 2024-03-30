var bjson = {};

bjson.object = class{
    constructor(el){
        this.el = el;
        this.content = el.innerHTML.replaceAll("'",'"').replaceAll("\n","").replaceAll("        ","").replaceAll("    ","");
        this.title = el.dataset.title;

        //check if valid JSON
        try{JSON.parse(this.content)}
        catch(e){
            alert("Input is not a correct JSON")
            return false;
        }

        this.el.classList.add("bjson-container")

        this.el.innerHTML = ""

        let title = document.createElement("div");
        title.innerHTML = this.title;
        title.classList.add("bjson-title");
        this.el.insertBefore(title, this.el.firstChild)

        let overAllBTN = document.createElement("button");
        overAllBTN.innerHTML = this.content;
        overAllBTN.classList.add("bjson-btn");
        this.el.appendChild(overAllBTN)
        overAllBTN.onclick = bjson.functions.hide;
        overAllBTN.style.borderColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        bjson.functions.createButtons(overAllBTN)

        overAllBTN.innerHTML = overAllBTN.innerHTML.replaceAll("{","{<br>").replaceAll("}","<br>}").replaceAll('",','",<br>')
    }
}

bjson.functions = {};
bjson.functions.hide = function(e){
    if(e.target.innerHTML == "{}"){
        e.target.innerHTML = e.target.dataset.content;
    }
    else{
        e.target.dataset.content = e.target.innerHTML;
        e.target.innerHTML = "{}"
    }
}

bjson.functions.createButtons = function(parent){
    let json = JSON.parse(parent.innerHTML);
    let arr = Object.keys(json);
    let str = parent.innerHTML;
    for(let a in arr){
        if(typeof json[arr[a]] == "object"){
            let ob = document.createElement("button");
            ob.innerHTML = JSON.stringify(json[arr[a]]);
            bjson.functions.createButtons(ob);
            ob.setAttribute('class','bjson-btn');
            ob.onclick = bjson.functions.hide;
            ob.style.borderColor = "#" + Math.floor(Math.random()*16777215).toString(16);

            let ara = str.split(JSON.stringify(json[arr[a]]));
            parent.innerHTML = ara[0];
            parent.appendChild(ob);
            parent.append(ara[1])
            str = parent.innerHTML;
        }
    }
}
