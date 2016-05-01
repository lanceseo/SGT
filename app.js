/* v4 - Angular with Firebase (AngularFire) */

/***** Student Grade Table core operation app *****/
var app = angular.module('sgtapp',['firebase']);

// Data controller
app.controller('dataController', ['firebaseOper', 'gradeAvg', function(firebaseOper, gradeAvg){
	var self = this;
	this.sArray = [];
	this.gAverage = 0;
	this.newID = function() {
        if (self.sArray.length > 0) {
            return self.sArray[self.sArray.length-1].id+1;
        } else {
            return 1;
        }
    };
	this.getData = function() {
		self.sArray = firebaseOper.getData();
		console.log("self.sArray", self.sArray);
		self.gAverage = gradeAvg.calcAvg(self.sArray);
	};
	this.addData = function(sname, scourse, sgrade) {		
		var newStudent = {};
		newStudent.id = self.newID();
		newStudent.name = sname;
		newStudent.course = scourse;
		newStudent.grade = parseInt(sgrade);
		firebaseOper.addData(newStudent);
		self.getData();
	};
	this.deleteData = function(sid) {
		for (var i=0; i<self.sArray.length; i++) {
			if (self.sArray[i].id === parseInt(sid)) {
				firebaseOper.removeData(i);
				self.getData();
				return;
			} else if (i === self.sArray.length-1) {
				console.log('ID not found');
			}
		}
	};
}]);

// CRUD for Firebase
app.service('firebaseOper', ['$firebaseArray', function($firebaseArray) {
	var self = this;
	var Ref = new Firebase("https://ls-sgt.firebaseio.com/sgt1");
	this.dbArray = $firebaseArray(Ref);
	this.getData = function() {
		console.log('retrieved');
		return self.dbArray;
	};
	this.addData = function(sArray) {
		self.dbArray.$add(sArray);
		console.log('added');
	};
	this.removeData = function(sid) {
		self.dbArray.$remove(sid);
		console.log('removed');
	}
}]);

// Grade average calculator
app.service('gradeAvg', function() {
    this.calcAvg = function(sArray) {
	    var gradeTotal = null;
	    for (var i=0; i<sArray.length; i++) {
	        gradeTotal += parseInt(sArray[i].grade);
	    }
	    return parseInt((gradeTotal / sArray.length));
	};
});


// Input validation
/*app.service('inputCheck', function() {
	var self = this;
	this.expName = /^[\p{L}\s'.-]+$/;
	this.expCourse = /^[A-Za-z0-9\s-]+$/;

	this.checkName = function(input) {
		console.log(self.expName.test(input));
		return self.expName.test(input);
	};
	this.checkCourse = function(input) {
		return self.expCourse.test(input);
	};
	this.checkGrade = function(input) {
		if (parseInt(input) >= 0 && parseInt(input) <= 100) {
			return true;
		}
		return false;
	};
});*/

// CRUD operation using browser's Local Storage
/*app.service('storageOper', function() {
	var locStorage = localStorage;
	this.getStorage = function() {
		console.log(JSON.parse(locStorage.getItem('sData')));
		return JSON.parse(locStorage.getItem('sData'));
	};
	this.setStorage = function(sArray) {
		locStorage.setItem('sData', JSON.stringify(sArray));
		console.log('localStorage Set');
	};
	this.removeStorage = function() {
		locStorage.removeItem('sData');
		console.log('localStorage wiped');
	};
});*/



