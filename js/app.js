$(document).ready(function(){
  // Base url
  var BASE_URL = "http://www.omdbapi.com/";

  // Generate Template
  var source = $("#movie-template").html();
  var movieTemplate = Handlebars.compile(source);

  // Declared Attributes
  var $movieCardContainer = $("#movie-card-container");
  var $search = $(".search");

  $(document).on("submit", ".search", function(e){
    e.preventDefault();

    $.ajax({
      type : "GET",
      url : BASE_URL + "?s=" + encodeURIComponent($("#movie-title").val()),
      success : function(movies){

        if(!movies["Error"]){
          // Hide Search
          $search.hide();

          // Reset Search
          $("#movie-title").val("");

          movies.Search.forEach(function(movie){
            $.ajax({
              type : "GET",
              url : BASE_URL + "?i=" + movie['imdbID'],
              success : function(movie){
                $movieCardContainer.append(movieTemplate(movie));
              },
              error : function () { alert("Error"); }

            });

          });
          $movieCardContainer.append('<div class="return"><a href="#" class="btn btn-primary margin-top-20">Return to search</a></div>');
        }
      },
      error : function () { alert("Error"); }
    });

  });
  $(document).on("click", ".return a", function(e){
    $movieCardContainer.html("");
    $search.show();
  });


});
