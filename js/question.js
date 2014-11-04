
/*
 * Copyright (C) 2014 radsaggi(ashutosh)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


(function() {

var app = angular.module('question', ['services']);

var taunts = [
    "Are you sure??",
    "May I lock it?",
    "Double check!!",
    "Easy, aint it?",
    "Very peculiar!"
];

/*app.controller("QuestionController", function() {
    question = {
        type: 3,
        id: 123,
        text: "Who am i?",
        image: '0Wcc.png'
    };
});*/


app.controller("QuestionController", ['$scope','Question', function($scope, question) {
    var display = this;
    var setup = function(question) {
        display.text = question.text;
        display.image = "images/" + question.image;

        display.showText = (question.type & 1) == 1;
        display.showImage = (question.type & 2) == 2;

        display.qtypeString = function() {
            switch (question.type) {
                case 1: return "question-text";
                case 2: return "question-image";
                case 3: return "question-both";
            }
        }
    }

    var future = question.invoke({id: 112}).$promise;
    future.then(function(data) {
        var quest = data;
        setup(quest);
    }, function(error) {
        alert("Error: " + error);
        var quest = {
            type: 3,
            id: 123,
            text: "Who am i?",
            image: '0Wcc.png'
        };
        setup(quest);
    });
}]);

app.controller("SubmitAnswerController", ['Answer', '$location' function(ans, $location) {
    this.answer = "";
    this.submit = function () {
        alert("Your answer is " + this.answer);
        var future = ans.invoke({id: 113, answer: this.answer}).$promise;
        future.then(function(data) {
            if (data.stat) {
                alert('Yeah Right!');
                $location.hash('profile');
            } else {
                alert('Incorrect Answer. Try again!');
            }
        }, function(error) {
            alert('error: ' + error);
        });
    };
}]);

app.controller("TauntController", function() {
    this.get = function () {
        return taunts[0];
    };
});

})();