
function fetchData(){

    const PROJECT_ID = "495qpnu2";
    const DATASET = "production";
    const CDN_URL = 'https://cdn.sanity.io/images/495qpnu2/production/'

    let QUERY = encodeURIComponent('*[_type == "post"]{_id,title,publishedAt,mainImage,category}');
    let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    function fixImageUrl(imageUrl){
        removingThePrefix = imageUrl.replace('image-', '')

        if (imageUrl.includes('png')){
            removingTheSuffix = removingThePrefix.replace('-png', '.png')   
        } else if (imageurl.includes('jpg')){
            removingTheSuffix = removingThePrefix.replace('-jpg', '.jpg')    
        }

        return removingTheSuffix
    }


    fetch(URL)
        .then(response => {
        return response.json();
    })
    .then(data => {
        // console.log(data.result)
        const html = data.result.map (blog=> {
            console.log(`${CDN_URL}${fixImageUrl(blog.mainImage.asset._ref)}`)
            // ${`${CDN_URL}${fixImageUrl(blog.mainImage.asset._ref)}`}
            // console.log(`the url of the ${blog.title} is: ${CDN_URL}${fixImageUrl(blog.mainImage.asset._ref)}`)
                return `

            <div role="listitem" class="w-dyn-item w-col w-col-6">
              <div id="w-node-_3a5b1e7b-7e38-d14b-5a76-16353980ebee-8dbabcdb" style="background-image:url(${`${CDN_URL}${fixImageUrl(blog.mainImage.asset._ref)}`})" class="blog4-featured-post">
                <div class="label white-outline-label">${blog.category}</div>
                <div class="blog4-content-card-wrap">
                  <div class="blog4-name-wrap">
                    <a href=${`./detail_post.html?id=${blog._id}`} class="size4-link">${blog.title}</a>
                  </div>
                  <div>
                    <a data-w-id="3a5b1e7b-7e38-d14b-5a76-16353980ebf6" href=${`./detail_post.html?id=${blog._id}`} class="button-text w-inline-block">
                      <div class="button-label">Read Article</div><img src='' alt="" class="button-arrow">
                    </a>
                  </div>
                </div>
              </div>
            </div>
                `;
            })
            .join("")
        document.querySelector('#api-render').innerHTML = ("afterbegin", html);
    })
};

    
fetchData();



            