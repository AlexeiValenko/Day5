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
    'Search in file or folder',
    'Quit Program'
];

/* this will be the storage for our file system */
var fsStorage = [
    [0, 0, 'root'],
    [1, 0, 'subfolder1'],
    [2, 0, 'subfolder1'],
    [3, 0, 'subfolder1'],
    [4, 1, 'subfolder1'],
    [5, 4, 'subfolder1'],
    [6, 5, 'file1', 'content'],
    [7, 5, 'file2', 'content']
];

var currentFolder = 0;

main();

function main() {
    while (!exit) {
        printMenu();
    }
    process.exit(0);
}

function printMenu() {
    var answer = readlineSync.keyInSelect(menu, 'Please make your choise:');
    switch (answer) {
        case 0: printCurrentFolder(); break;
        case 1: changeCurrentFolder(); break;
        case 2: createFileOrFolder(); break;
        case 3: deleteFileOrFolder(); break;
        case 4: searchInFileOrFolder(); break;
        case 5: quitProgram(); break;
    }
}

function printCurrentFolder() {
    console.log('printing current folder');
    /* todo: implement hierarcial folder and file printing at current folder  */
}

function changeCurrentFolder() {
    console.log('changing current folder');
    /* todo: implement cli to move in all directions  */
}

function createFileOrFolder() {
    console.log('creating file folder');
    /* todo: implement additon of file/folder to file system array   */
}
