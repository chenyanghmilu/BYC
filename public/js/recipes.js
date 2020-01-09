$("form").on("submit", evt => {
    evt.preventDefault();

    $("#results").empty();

    var search = $("#search-input").val();

    $.ajax({
        method: "GET",
        url: '/api/recipes?q='+ search,
        success: function(response){
            console.log(response);
            for (let i = 0; i < 10; i++) {
                let images = response.hits[i].recipe.image;
                let labels = response.hits[i].recipe.label;
                let dietLabels = response.hits[i].recipe.dietLabels;
                let recipeUrl = response.hits[i].recipe.url;
                let ingredientLines = response.hits[i].recipe.ingredientLines
                let calories = response.hits[i].recipe.calories;
                let merge = `
                            <div class="col-sm-6 col-md-4">
                            <div class="thumbnail">
                            <a href= "${recipeUrl}" target="_blank"><img src="${images}"></a>
                            <p>${labels}</p>
                            <p>Diet lable:${dietLabels}</p>
                            <p>Recipe:${ingredientLines}</p>
                            <p>Calorie:${calories}</p>
                            </div>
                            </div>
                            `;
                $("#results").append(merge);
            }
        },
        error: function(response) {
            console.log('We discovered no results!');
        }
    });
});