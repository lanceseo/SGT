// v2 sgt_php

var myStorage = localStorage;

// sample data -------
// var studentTest = [
//     {'id':1, 'name':'Randy', 'course':'Politics', 'grade':55},
//     {'id':2, 'name':'John', 'course':'Math', 'grade':66},
//     {'id':3, 'name':'Sandy', 'course':'Physics', 'grade':98}
// ]
// myStorage.setItem('student1', JSON.stringify(studentTest));
// ------- sample data


$("document").ready(function() {
    $(".addData").on("click", function() {
        console.log("add clicked");
        if (a_DOM.getInput(a_Student)) {
            a_Storage.getData(a_SGT);
            a_Storage.addData(a_Student, a_SGT);
            a_DOM.clearInputs();                
            // get updated data from localStorage & populate to table
            a_DOM.clearTable();
            a_Storage.getData(a_SGT);
            a_DOM.populate(a_SGT.studentArray);
            a_DOM.populateAvg(a_SGT.gradeAvg());
        }
    });

    $(".cancelData").on("click", function() {
        a_DOM.clearInputs();
    });

    $(".getData").on("click", function() {
        console.log("getData clicked");
        a_DOM.clearTable();
        if (a_Storage.getData(a_SGT)) {
            a_DOM.populate(a_SGT.studentArray);
            a_DOM.populateAvg(a_SGT.gradeAvg());
        }
    });

    $(".deleteData").on("click", function() {
        a_DOM.getInputID(d_Student);
        a_Storage.getData(a_SGT);
        a_Storage.removeData(a_SGT, d_Student);

        a_DOM.clearTable();
        a_Storage.getData(a_SGT);
        a_DOM.populate(a_SGT.studentArray);
        a_DOM.populateAvg(a_SGT.gradeAvg());
    });

    $(".wipeData").on("click", function() {
        a_Storage.wipeStorage();
        a_SGT.studentArray = [];
        a_DOM.clearTable();
    });
});


var SGT = function() {
    var self = this;
    self.studentArray = [];
    self.newID = function() {
        if (self.studentArray.length > 0) {
            return self.studentArray[self.studentArray.length-1].id+ 1;
        } else {
            return 1;
        }
    };
    self.gradeAvg = function() {
        var gradeTotal = null;
        for (var i=0; i<self.studentArray.length; i++) {
            gradeTotal += parseInt(self.studentArray[i].grade);
        }
        return parseInt((gradeTotal / self.studentArray.length));
    };
};

var Student = function() {
    var self = this;
    self.id = null;
    self.name = "";
    self.course = "";
    self.grade = null;
};

var SGT_Storage = function() {
    var self = this;
    self.getData = function(newSGT) {
        if (myStorage.getItem('student1')) {
            newSGT.studentArray = JSON.parse(myStorage.getItem('student1'));
            return true;
        } else {
            console.log("No data exists");
            return false;
        }
    };
    self.addData = function(newStudent, newSGT) {
        newStudent.id = newSGT.newID();
        newSGT.studentArray.push(newStudent);
        myStorage.setItem('student1', JSON.stringify(newSGT.studentArray));
    };
    self.removeData = function(delSGT, delStudent) {
        for (var i=0; i<delSGT.studentArray.length; i++) {
            if (delSGT.studentArray[i].id === delStudent.id) {
                delSGT.studentArray.splice(i,1);
                myStorage.setItem('student1', JSON.stringify(delSGT.studentArray));
            } else {
                console.log("ID not found!");
            }
        }
    };
    self.wipeStorage = function() {
        myStorage.removeItem('student1');
    }
}

var SGT_DOM = function() {
    var self = this;
    self.validateInputs = function() {

    };
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
        if (sName == "" || sCourse == "" || sGrade == "") {
            console.log("Name, course, or grade missing");
            return false;
        } else if (isNaN(sGrade)) {
            console.log("Incorrect grade entered");
            return false;
        } else {
            newStudent.name = sName;
            newStudent.course = sCourse;
            newStudent.grade = parseInt(sGrade);
            return true;
        }
    };
    self.clearInputs = function() {
        $("#studentName").val("");
        $("#course").val("");
        $("#studentGrade").val("");
    };
    self.clearTable = function() {
        $(".student-list tbody").empty();
    };
    self.getInputID = function(delStudent) {
        delStudent.id = parseInt($("#studentID").val());
    };
    self.populateAvg = function(gradeAvg) {
        $(".avgGrade").empty();
        $(".avgGrade").append(gradeAvg);
    };
};


var a_Student = new Student();
var d_Student = new Student();
var a_SGT = new SGT();
var a_DOM = new SGT_DOM();
var a_Storage = new SGT_Storage();

