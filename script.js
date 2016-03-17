// v1 Front-end coding with localStorage

var myStorage = localStorage;

$("document").ready(function() {
    $(".addData").on("click", function() {
        // a_DOM.getInput(a_Student);
        a_Student = {[1, "James", "Politics", 99], [2, "Randy", "Science", 77]};
        console.log(a_Student);
        //a_Storage.addData(a_Student);
        // a_SGT_Storage.addData(a_Student.id, a_Student.name, a_Student.course, a_Student.grade);
    });
    $(".getData").on("click", function() {
        //a_Storage.getData(a_SGT);
        a_DOM.populate(myStorage.getItem('student1'));
    });
});

// // callback function for API call
// function loadData(data, obj1, obj2) {
//     // console.log(data, obj1, obj2);
//     obj1.setStudentArray(data);
//     obj2.populate(obj1.studentArray);
// }

var SGT = function() {
    var self = this;
    self.setStudentArray = function(serverData) {
        self.studentArray = serverData;
    }
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
    self.populate = function(sData) {
        var sDataLength = sData.length;
        for (var i=0; i<sDataLength; i++) {
            var tr = $("<tr>");
            var tdId = $("<td>").text(sData[i].id);
            var tdName = $("<td>").text(sData[i].name);
            var tdCourse = $("<td>").text(sData[i].course);
            var tdGrade =  $("<td>").text(sData[i].grade);
            tr.append(tdId, tdName, tdCourse, tdGrade);
            $(".student-list tbody").append(tr);
        }
    };
    self.getInput = function(newStudent) {
        var sName = $("#studentName").val();
        var sCourse = $("#course").val();
        var sGrade = $("#studentGrade").val();
        console.log(sName, sCourse, sGrade);
        newStudent.id = 1;
        newStudent.name = sName;
        newStudent.course = sCourse;
        newStudent.grade = sGrade;
    }
};

var SGT_Storage = function() {
    var self = this;
    self.getData = function(newSGT) {
        newSGT.studentArray = myStorage.getItem('student1');
    }

    self.addData = function(a_Student) {
        myStorage.setItem('student1', JSON.stringify(a_Student));
        console.log( JSON.parse(myStorage.getItem('student1')));
    }
}


var a_Student = new Student();
var a_SGT = new SGT();
var a_DOM = new SGT_DOM();
var a_Storage = new SGT_Storage();


// var a_API = new SGT_API();


// var SGT_API = function() {
//     var self = this;
//     var apiKey = '2VSlnQzAoX';
//     self.getDataFromServer = function(obj1, obj2) {
//         $.ajax({
//             dataType: 'json',
//             method: 'post',
//             data: {
//                 api_key: apiKey
//             },
//             url: 'http://s-apis.learningfuze.com/sgt/get',
//             success: function(result) {
//                 loadData(result.data, obj1, obj2);
//             }
//         });
//     };
//     self.addDataToServer = function(sName, sCourse, sGrade) {
//         $.ajax({
//             dataType: 'json',
//             method: 'post',
//             data: {
//                 api_key: apiKey,
//                 name: sName,
//                 course: sCourse,
//                 grade: sGrade
//             },
//             url: 'http://s-apis.learningfuze.com/sgt/create',
//             success: function(result) {
//                 console.log("New ID: ", result.new_id);
//             }
//         });
//     };
// };