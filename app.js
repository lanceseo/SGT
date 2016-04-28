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

// Click controller
app.controller('dataController', function(storageOper){
	var self = this;
	this.sArray = [];
	this.newID = function() {
        if (self.sArray.length > 0) {
            return self.sArray[self.sArray.length-1].id+1;
        } else {
            return 1;
        }
    };

	this.getData = function() {
		self.sArray = storageOper.getStorage();
	};
	this.addData = function(sname, scourse, sgrade) {
		var newStudent = {};
		newStudent.id = self.newID();
		newStudent.name = sname;
		newStudent.course = scourse;
		newStudent.grade = parseInt(sgrade);
		self.sArray.push(newStudent);
		storageOper.setStorage(self.sArray);
	};
	this.deleteData = function(sid) {
		for (var i=0; i<self.sArray.length; i++) {
			if (self.sArray[i].id === parseInt(sid)) {
				self.sArray.splice(i,1);
				storageOper.setStorage(self.sArray);
				return;
			} else if (i === self.sArray.length-1) {
				console.log('ID not found');
			}
		}
	};
	this.wipeData = function() {
		storageOper.removeStorage();
	};

});
