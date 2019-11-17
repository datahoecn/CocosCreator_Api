function readWorkbookFromLocalFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        if(callback) callback(workbook);
    };
    reader.readAsBinaryString(file);
}

readWorkbookFromLocalFile("C:\Users\jieli\Desktop\test")