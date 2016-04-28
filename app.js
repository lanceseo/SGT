var app = angular.module('sgtapp',[]);

// CRUD operation
app.service('storageOper', function() {
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
});

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


// Data controller
app.controller('dataController', ['storageOper', 'gradeAvg', function(storageOper, gradeAvg){
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
		self.sArray = storageOper.getStorage();
		self.gAverage = gradeAvg.calcAvg(self.sArray);
	};
	this.addData = function(sname, scourse, sgrade) {
		var newStudent = {};
		newStudent.id = self.newID();
		newStudent.name = sname;
		newStudent.course = scourse;
		newStudent.grade = parseInt(sgrade);
		self.sArray.push(newStudent);
		storageOper.setStorage(self.sArray);
		self.gAverage = gradeAvg.calcAvg(self.sArray);
	};
	this.deleteData = function(sid) {
		for (var i=0; i<self.sArray.length; i++) {
			if (self.sArray[i].id === parseInt(sid)) {
				self.sArray.splice(i,1);
				storageOper.setStorage(self.sArray);
				self.gAverage = gradeAvg.calcAvg(self.sArray);
				return;
			} else if (i === self.sArray.length-1) {
				console.log('ID not found');
			}
		}
	};
	this.wipeData = function() {
		self.sArray = [];
		storageOper.removeStorage();
		self.gAverage = gradeAvg.calcAvg(self.sArray);
	};

}]);
