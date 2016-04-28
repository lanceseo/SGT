var app = angular.module('sgtapp',[]);

// CRUD controller
app.controller('dataController', function(){
	var self = this;
	var locStorage = localStorage;
	this.sArray = [];

	this.getStorage = function() {
		console.log(JSON.parse(locStorage.getItem('sData')));
		return JSON.parse(locStorage.getItem('sData'));
	};
	this.setStorage = function(sArray) {
		locStorage.setItem('sData', JSON.stringify(sArray));
	};
	this.removeStorage = function() {
		locStorage.removeItem('sData');
	};

	this.newID = function() {
        if (self.sArray.length > 0) {
            return self.sArray[self.sArray.length-1].id+1;
        } else {
            return 1;
        }
    };

	this.getData = function() {
			self.sArray = self.getStorage();
	};
	this.addData = function(sname, scourse, sgrade) {
			var newStudent = {};
			newStudent.id = self.newID();
			newStudent.name = sname;
			newStudent.course = scourse;
			newStudent.grade = parseInt(sgrade);
			self.sArray.push(newStudent);
			self.setStorage(self.sArray);
	};
	this.deleteData = function(sid) {
		for (var i=0; i<self.sArray.length; i++) {
			if (self.sArray[i].id === parseInt(sid)) {
				self.sArray.splice(i,1);
				self.setStorage(self.sArray);
				return;
			} else if (i === self.sArray.length-1) {
				console.log('not found');
			}
		}
	};
	this.wipeData = function() {
		self.removeStorage();
		console.log('data wiped');
	};

});
