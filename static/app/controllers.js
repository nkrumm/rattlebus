App.controller("Slider", function ($scope){
  $scope.x_coord = 0;
  $scope.slide = function (to_pixel){
    $scope.x_coord = to_pixel * 320;
  }
}); // end controller
