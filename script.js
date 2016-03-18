// v1 Front-end coding with localStorage

var myStorage = localStorage;

// sample data
// var studentTest = [
//     {'id':1, 'name':'Randy', 'course':'Politics', 'grade':55},
//     {'id':2, 'name':'John', 'course':'Math', 'grade':66},
//     {'id':3, 'name':'Sandy', 'course':'Physics', 'grade':98}
// ]
// myStorage.setItem('student1', JSON.stringify(studentTest));


$("document").ready(function() {
    $(".addData").on("click", function() {
        a_DOM.getInput(a_Student);
        a_Storage.getData(a_SGT);
        //console.log("New ID: " + a_SGT.newID());
        a_Storage.addData(a_Student, a_SGT);        
        
        // getData again to populate the Table
        a_Storage.getData(a_SGT);
        a_DOM.populate(a_SGT.studentArray);
    });

    $(".getData").on("click", function() {
        a_Storage.getData(a_SGT);
        a_DOM.populate(a_SGT.studentArray);
    });
});


var SGT = function() {
    var self = this;
    self.studentArray = [];
    self.newID = function() {
        return self.studentArray.length + 1;
    }
    // self.setStudentArray = function(storageData) {
    //     self.studentArray = storageData;
    // }
};

var Student = function() {
    var self = this;
    self.id = null;
    self.name = "";
    self.course = "";
    self.grade = null;
};

var SGT_DOM = function() {
    var self = this;
    self.populate = function(studentData) {
        var sDataLength = studentData.length;
        for (var i=0; i<sDataLength; i++) {
            var tr = $("<tr>");
            var tdId = $("<td>").text(studentData[i].id);
            var tdName = $("<td>").text(studentData[i].name);
            var tdCourse = $("<td>").text(studentData[i].course);
            var tdGrade =  $("<td>").text(studentData[i].grade);
            tr.append(tdId, tdName, tdCourse, tdGrade);
            $(".student-list tbody").append(tr);
        }
    };
    self.getInput = function(newStudent) {
        var sName = $("#studentName").val();
        var sCourse = $("#course").val();
        var sGrade = $("#studentGrade").val();
        console.log(sName, sCourse, sGrade);
        //newStudent.id = 1;
        newStudent.name = sName;
        newStudent.course = sCourse;
        newStudent.grade = sGrade;
    }
};

var SGT_Storage = function() {
    var self = this;
    self.getData = function(newSGT) {
        newSGT.studentArray = JSON.parse(myStorage.getItem('student1'));
    }
    self.addData = function(newStudent, newSGT) {
        newStudent.id = newSGT.newID();
        newSGT.studentArray.push(newStudent);
        myStorage.setItem('student1', JSON.stringify(newSGT.studentArray));
    }
}


var a_Student = new Student();
var a_SGT = new SGT();
var a_DOM = new SGT_DOM();
var a_Storage = new SGT_Storage();

