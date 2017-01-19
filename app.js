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
    [0,0,'root'],
    [1,0,'rtoot'],
    [2,1,'rotot'],
    [3,2,'roott'],
    [4,3,'roott'],
    [5,3,'roott'],
    [6,0, 'name', 'ttt']
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

function printCurrentFolder(){
    console.log(currentFolderName);
    for(var i = 0; i < myFileSystem.length; i++){
        if(myFileSystem[i][1] == currentFolder && myFileSystem[i][1] != myFileSystem[i][0]) // last check for root
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
                        currentFolderName = myFileSystem[j][2];
                    }

                }
            }
        }

    }
    else {  // go to subfolder
        for (var i = 0; i < myFileSystem.length; i++) {
            if (myFileSystem[i][2] == folderName && myFileSystem[i][1] == currentFolder && myFileSystem[i].length < 4) {
                currentFolder = myFileSystem[i][0];
                currentFolderName = myFileSystem[i][2];
                break;
            }

        }
    }
    printCurrentFolder();
}


function createFile(){
    var fileName = readlineSync.question("Insert file/folder name :");
    for(var i = 0; i < myFileSystem.length; i++){
        if(myFileSystem[i][1] == currentFolder && myFileSystem[i][2] == fileName ){
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
            if(myFileSystem[i].length < 4){
                deleteFoldersList(myFileSystem[i][0],list);
            }
        }
    }
}


function deleteFile(){
    var fileName = readlineSync.question("Insert file/folder name :");
    var folder = -1;
    var indexesToDelete = new Array(myFileSystem.length);

    for(var i = 1; i < myFileSystem.length; i++){   // from 1 becouse we should not delete root
        if(myFileSystem[i][2] == fileName){
            if(myFileSystem[i].length < 4 ){ //this is folder
                folder = myFileSystem[i][0];
                indexesToDelete[i] = true;
                break;
            }
                myFileSystem.splice(i,1);
                console.log("File ", fileName, " is deleted.");
                return;
        }

    }
    if(folder != -1) {
        deleteFoldersList(folder,indexesToDelete);
        var tmpSystem = [];
        for(var i = 0; i < myFileSystem.length; i++){
            if(indexesToDelete[i] != true)
                tmpSystem.push(myFileSystem[i]);
        }
        myFileSystem = tmpSystem;
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

        if(myFileSystem[i][1] != currentFolder) // only file in current folder can be shown
            continue;

        if(myFileSystem[i][2] == fileName){
            if(myFileSystem[i].length < 4) // this is folder
                continue;

            console.log("** ",myFileSystem[i][3]," **");
            return;

        }
    }
}



function searchFile(){
    var fileName = readlineSync.question("Insert part of file/folder name or file content to look for :");
    var weights = [];
    for(var i = 0; i < myFileSystem.length; i++){
        weights.push(0);
        if(myFileSystem[i][2] == fileName ) weights[i]++;
        if(myFileSystem[i][2].includes(fileName) ) weights[i]++;
        if(myFileSystem[i].length >3 && myFileSystem[i][2].includes(fileName) ) weights[i]++;
        if(myFileSystem[i].length >3 && myFileSystem[i][2] == fileName ) weights[i]++;
    }


    for(var i = 0; i < weights.length ; i++){
        console.log(myFileSystem[i][2]);
    }

}


function quitProgram(){
    var choice;

    while(choice != 'y' && choice != 'n' ) {
        choice = readlineSync.question("Are you sure ? [y/n] :");
    }
     if(choice == 'y') {
         exit = true;
         console.log("Have a good day!");
     }
}
