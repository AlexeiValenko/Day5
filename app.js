/**
 * Created by py on 1/19/17.
 */
var readlineSync = require('readline-sync');

var exit = false;

var menu = [
    'Print current folder',
    'Change current folder',
    'Create file or folder',
    'Delete file or folder',
    'Open file',
    'Search file',
    'Quit Program'
];

var myFileSystem = [
    [0,0,'root']
    ];

var currentFolder = 0;
var currentFolderName = 'root';

main();

function main(){
    while(!exit)
        showMenu();
}

function showMenu(){


    var choise = readlineSync.keyInSelect(menu,'Please make your choise : ');

    switch(choise){
        case 0 : printCurrentFolder();
                 break;
        case 1 : changeCurrentFolder();
                 break;
        case 2 : createFile();
                 break;
        case 3 : deleteFile();
                 break;
        case 4 : openFile();
                 break;
        case 5 : searchFile();
                 break;
        case 6 : quitProgram();
                 break;
        default: break;
    }

}

function isFile(index){
    return myFileSystem[index].length > 3 ;
}

function inCurrentFolder(index){
    return myFileSystem[index][1] == currentFolder;
}

function isFileName(index,name){
    return myFileSystem[index][2] == name ;
}

function getName(index){
    return myFileSystem[index][2];
}


function printCurrentFolder(){
    console.log(currentFolderName);
    for(var i = 0; i < myFileSystem.length; i++){
        if(inCurrentFolder(i) && myFileSystem[i][1] != myFileSystem[i][0]) // last check for root
            console.log("\t",myFileSystem[i][2]);
    }
}

function changeCurrentFolder(){
    var folderName = readlineSync.question("Insert folder name or [..]  :");

    if(folderName == ".."){ // go to father folder
        for(var i = 1; i < myFileSystem.length; i++){
            if(myFileSystem[i][0] == currentFolder) {
                currentFolder = myFileSystem[i][1];
                for(var j = 0; j < myFileSystem.length; j++){
                    if(myFileSystem[j][0] == currentFolder){
                        currentFolderName = getName(j);
                    }

                }
            }
        }

    }
    else {  // go to subfolder
        for ( i = 0; i < myFileSystem.length; i++) {
            if (isFileName(i, folderName) && inCurrentFolder(i) && !isFile(i)) {
                currentFolder = myFileSystem[i][0];
                currentFolderName = getName(i);
                break;
            }

        }
    }
    printCurrentFolder();
}


function createFile(){
    var fileName = readlineSync.question("Insert file/folder name :");
    for(var i = 0; i < myFileSystem.length; i++){
        if(inCurrentFolder(i) && isFileName(i, fileName )){
            console.log("File or folder with this name already existh in this folder.");
            return;
        }
    }
    var newFile = [myFileSystem[myFileSystem.length - 1][0] + 1, currentFolder, fileName];
    var content = readlineSync.question("Insert content ( if empty create folder) :");
    if(content != '')
        newFile.push(content);

    myFileSystem.push(newFile);


    console.log(currentFolderName);
    console.log("\t",newFile[2]);

}

function deleteFoldersList(id, list){

    for(var i = 0; i < myFileSystem.length; i++){
        if(myFileSystem[i][1] == id){
            list[i] = true;
            if(!isFile(i)){
                deleteFoldersList(myFileSystem[i][0],list);
            }
        }
    }
}


function deleteFile(){
    var fileName = readlineSync.question("Insert file/folder name :");
    var folder = -1;
    var indexesToDelete = new Array(myFileSystem.length);

    for(var i = 0; i < myFileSystem.length; i++){
        if(inCurrentFolder(i) && isFileName(i, fileName)){
            if(isFile(i) ){
                myFileSystem.splice(i,1);
                console.log("File ", fileName, " is deleted.");
                return;

            } else{
                folder = myFileSystem[i][0];
                indexesToDelete[i] = true;
                break;
            }
        }

    }

    if(folder != -1) {
        deleteFoldersList(folder,indexesToDelete);
        for( i = myFileSystem.length - 1; i > 0 ; i--){   // we never ever delete root
            if(indexesToDelete[i] == true)
                myFileSystem.splice(i,1);
        }
        console.log("Folder ", fileName, " is deleted.");
    }
    else{
            console.log(fileName, " not found in current folder.");
    }
}

function openFile(){
    var fileName = readlineSync.question("Insert file name :");

    if(fileName == '') {
        console.log("File name can not be empty.");
        return;
    }

    for(var i = 0; i < myFileSystem.length; i++){

        if(!inCurrentFolder(i)) // only file in current folder can be shown
            continue;

        if(getName(i) == fileName){
            if(!isFile(i))
                return;

            console.log("** ",myFileSystem[i][3]," **");
            return;

        }
    }
}



function searchFile(){
    var filePart = readlineSync.question("Insert part of file/folder name or file content to look for :");
    var output = [];
    for(var i = 0; i < myFileSystem.length; i++) {
        var weight = 0;
        if (getName(i).includes(filePart)){
            weight += isFile(i) ? 5 : 10;
        }  // folder should be shown first
        if (isFileName(i, filePart)) weight++;
        if (isFile(i) && myFileSystem[i][3].includes(filePart)) weight++;
        if (isFile(i) && myFileSystem[i][3] == filePart) weight++;


        if (weight > 0) {
            output.push({w: weight, name: myFileSystem[i][2]});
        }
    }

    output.sort(function(a,b){ return b.w - a.w } );
	
    for( i = 0; i < output.length ; i++){
        console.log(output[i].name);
    }

}


function quitProgram(){

    do{
        var choice = readlineSync.question("Are you sure ? [y/n] :");
    } while(choice != 'y' && choice != 'n' )

     if(choice == 'y') {
         exit = true;
         console.log("Have a good day!");
     }
}
