'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            $scope.dishes = menuFactory.getDishes();
            
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };
            
            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
            
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
            
            
        }])


        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
            
            var dish = menuFactory.getDish(parseInt($stateParams.id,10));
            
            $scope.dish = dish;
         
            
        }])
        
        .controller('CommentsController', ['$scope', function($scope) {
            
            var newcomment = { 
                rating:5,
                comment:"",
                author:"",
                date:""
            };
            
            $scope.newcomment = newcomment;
            
            var ratings = [ {value:1, label:"1"},
                           {value:2, label:"2"},
                           {value:3, label:"3"},
                           {value:4, label:"4"},
                           {value:5, label:"5"}
                          ];
            $scope.ratings = ratings;
            
            $scope.submitComment = function() {
                
                if($scope.newcomment.name === "" || $scope.newcomment.comments === "") {
                    console.log("Invalid");
                } else {
                                        
                    $scope.dish.comments.push ({
                        rating: parseInt(newcomment.rating),
                        comment: newcomment.comment,
                        author: newcomment.author,
                        date: Date.now()
                    });
                    console.log("Submitted");
                    console.log(newcomment);
                    
                    $scope.newcomment.author = "";
                    $scope.newcomment.comment = "";
                    $scope.newcomment.date = "";
                    $scope.newcomment.rating = 5;
                    
                    $scope.commentsForm.$setPristine();
                }
            };
        }])


        .controller('ContactController', ['$scope', function($scope) {
            
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:""};
            
            var channels = [{value:"tel", label:"Tel."}, 
                            {value:"Email", label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log("Incorrect");
                    } 
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {
                        mychannel:"", 
                        firstName:"", 
                        lastName:"",
                        agree:false,
                        email:"" 
                        };
                    
                    $scope.feedback.mychannel = "";
                    $scope.feedbackForm.$setPristine();
                    
                    console.log($scope.feedback);
                    }
                };
                
            }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            
            //var featuredItem = function() {
            $scope.featuredItem = menuFactory.getDishes();
                //return featuredItem;
            //}
            
            //$scope.featuredItem = featuredItem;
            
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
            var corpLeaders = corporateFactory.getLeaders();
            
            $scope.corpLeaders = corpLeaders;
            
        }])



;