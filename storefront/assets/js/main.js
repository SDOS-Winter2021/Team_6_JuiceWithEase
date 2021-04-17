var c = 0;
if (localStorage.getItem('cartList')) {
  console.log(localStorage.getItem('cartList'));
  console.log(JSON.parse(localStorage.getItem('cartList')));
  var c = JSON.parse(localStorage.getItem('cartList')).length;
}
var count = document.getElementById('count');
if (count != null) {
  count.innerHTML = c;
}

var userPage = document.getElementById('userPage');
if (userPage != null) {
  userPage.addEventListener('click', () => {
    if (localStorage.getItem('access')) {
        fetch('http://localhost:8000/auth/jwt/verify/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token : localStorage.getItem('access')}),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data['code'] == "token_not_valid") {
                    window.location.href = "login.html";
                } else {
                    window.location.href = "user.html";
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                window.location.href = "login.html";
            });
    } else {
        window.location.href = "login.html";
    }
  });
}

!(function($) {
  "use strict";
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 2;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });


 
  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

if (!localStorage.getItem('cartList')) {
  var cartList = [];
  localStorage.setItem('cartList', JSON.stringify(cartList));
}
console.log(localStorage);
console.log(JSON.parse(localStorage.getItem('cartList')));

addToCart = (e, id) => {
  var emptyCartWarning = document.getElementById('emptyCartWarning');
  emptyCartWarning.innerHTML = '';
  if (JSON.parse(localStorage.getItem('cartList')).includes(id)) {
    return;
  }
  var count = document.getElementById('count');
  console.log(JSON.parse(localStorage.getItem('cartList')));
  var c = JSON.parse(localStorage.getItem('cartList')).length;
  console.log(c);
  count.innerHTML = c+1;
  console.log(c);
  var temp = JSON.parse(localStorage.getItem('cartList'));
  temp.push(id);
  console.log(temp);
  localStorage.setItem('cartList', JSON.stringify(temp));
  console.log(localStorage.getItem('cartList'));
}

var queryString = decodeURIComponent(window.location.search);
console.log(queryString);
queryString = queryString.substring(1);
console.log(queryString);
if (queryString.substring(0, 12) == 'productTable') {
  var productTable = JSON.parse(queryString.substring(13));
  console.log(productTable);
} else if (queryString.substring(0, 8) == 'products'){
  console.log(queryString);
  var product = JSON.parse(queryString.substring(8,));
  console.log(product);
} else if (queryString.substring(0, 7) == 'product'){
  var product = JSON.parse(queryString.substring(8,));
  console.log(product);
} else {
  
}

var categories = {
  '1' : 'desiSplash',
  '2' : 'exoticDelight',
  '3' : 'dailyDetox',
  '4' : 'pulpyPure'
}

var bottleType = {
  '1' : '300ml',
  '2' : '500ml'
}

var products = [];
for (var i in productTable) {
  products.push({
    id : String(productTable[i]['_id']),
    name : productTable[i]['name'],
    category : categories[productTable[i]['category_Id']],
    price : productTable[i]['price'],
    bottle_type : bottleType[productTable[i]['bottle_id']],
    description : productTable[i]['description']
  });
  //console.log(productTable[i]);
}

var products = [{
  id : '1',
  name : 'Orange Juice',
  category : 'pulpyPure',
  price : '97',
  bottle_type : '300ml',
  description : ''
}, {
  id : '2',
  name : 'Red Juice',
  category : 'dailyDetox',
  price : '217',
  bottle_type : '500ml',
  description : 'Beet root + Carrot + Ginger + Lemon + Apple + Chia Seeds + Flax Seeds'
}, {
  id : '3',
  name : 'Ginger Mint Lemon(From East)',
  category : 'desiSplash',
  price : '67',
  bottle_type : '300ml',
  description : ''
}, {
  id : '4',
  name : 'Beet Root',
  category : 'pulpyPure',
  price : '97',
  bottle_type : '300ml',
  description : ''
}, {
  id : '5',
  name : 'Red Juice',
  category : 'dailyDetox',
  price : '217',
  bottle_type : '300ml',
  description : 'Beet root + Carrot + Ginger + Lemon + Apple + Chia Seeds + Flax Seeds'
}, {
  id : '6',
  name : 'Ginger Mint Lemon(From East)',
  category : 'pulpyPure',
  price : '67',
  bottle_type : '300ml',
  description : ''
}, {
  id : '7',
  name : 'Blueberry',
  category : 'exoticDelight',
  price : '97',
  bottle_type : '300ml',
  description : ''
}, {
  id : '8',
  name : 'Red Juice',
  category : 'dailyDetox',
  price : '217',
  bottle_type : '300ml',
  description : 'Beet root + Carrot + Ginger + Lemon + Apple + Chia Seeds + Flax Seeds'
}, {
  id : '9',
  name : 'Ginger Mint Lemon(From East)',
  category : 'desiSplash',
  price : '67',
  bottle_type : '300ml',
  description : ''
}, {
  id : '10',
  name : 'Ginger Mint Lemon(From East)',
  category : 'desiSplash',
  price : '97',
  bottle_type : '300ml',
  description : ''
}, {
  id : '11',
  name : 'Blueberry',
  category : 'exoticDelight',
  price : '217',
  bottle_type : '300ml',
  description : 'Beet root + Carrot + Ginger + Lemon + Apple + Chia Seeds + Flax Seeds'
}
]

var product_categories = {
  pulpyPure : 'Get the real pulp extracted from your favourite fruits. We ensure that the nutrient value of the juice is kept intact, so that you consume the best for your health. With no sugar, water, preservative or chemical in your juice, “Juice with ease” offers you the pure and pulpy juices.',
  dailyDetox : 'We understand what is best for your health because we care for you. Detoxifying your body helps in many ways, and at “Juice with ease” we have made it easy for you. Choose from wide range of our Daily Detoxifiers, and keep your mind, soul, and heart health.',
  desiSplash : 'We bring the real Indian-ness in our brand by offering our customers a range of regional drinks famous in different parts of India. Enjoy these healthy beverages made from real fruit(s)/ or ingredients. No concentrates or artificial flavours are used.',
  exoticDelight : 'There is a lot more to explore in healthy beverages, hence we offer you a selected range of juices made from “Exotic” fruits.  Enjoy the real taste of the fruit in its juicy form. Get health benefits from their nutrient contents (include antioxidant properties, have phytonutrients and others)'
}

var images = [
  'https://letsimagine.in/wp-content/uploads/2017/10/24-carrots-6.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/berry-go-round-3.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/citrus_burst-3.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/green-day-3.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/heart-beet-3.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/green-day-3.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/what-a-melon-1.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/24-carrots-6.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/what-a-melon-1.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/citrus_burst-3.png',
  'https://letsimagine.in/wp-content/uploads/2017/10/what-a-melon-1.png'
]

for (var i in products) {
  products[i]['image'] = images[i];
}

var container = document.getElementsByClassName('portfolio-container')[0];
if (container != undefined) {
  for (var i in products) {
    container.innerHTML += `<div class="col-lg-4 col-md-6 portfolio-item ${products[i].category}">
  <div onclick="productDetails(event, ${products[i].id})" class="portfolio-wrap">
    <img src=${products[i].image} class="img-fluid" alt="">
    <div class="portfolio-info">
      <h4>${products[i].name}</h4>
      <p class="productCategory">${products[i].category}</p>
      <p>${products[i].description}</p>
    </div>
  </div>
  <div class="addCart">
    <button onclick="addToCart(event, ${products[i].id})" class="btn btn-warning"><strong>ADD TO CART</strong>&nbsp; <i class="fas fa-shopping-cart"></i></button>
  </div>
  </div>`
  }
}
console.log(products);
console.log(JSON.parse(localStorage.getItem('cartList')));
var cart = document.getElementsByClassName('cart')[0];
if (cart != null) {
  cart.addEventListener('click', () => {
    cartList = JSON.parse(localStorage.getItem('cartList'));
    if (cartList == undefined || cartList == null) {
      window.location.href = 'products.html';
    }
    if (cartList.length == 0) {
      var emptyCartWarning = document.getElementById('emptyCartWarning');
      emptyCartWarning.innerHTML = '* Cart has no products!';
      return;
    }
    if (localStorage.getItem('cartProducts')) {
      var cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    } else {
      var cartProducts = []
    }
    var x = 0;
    for (var i in cartList) {
      var a = JSON.parse(localStorage.getItem('cartProducts'));
      for (var k in a) {
        if (a[k]['id'] == cartList[i]) {
          x = 1;
        }
      }
      if (x==1) {
        continue;
      }
      for (var j in products) {
          if (products[j].id == cartList[i]) {
              cartProducts.push(products[j]);
          }
      }
    }
    for (var i in cartProducts) {
        if (!cartProducts[i].quantity) {
          cartProducts[i]['quantity'] = 1;
        }
    }
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    localStorage.setItem('products', JSON.stringify(products));
    console.log(JSON.parse(localStorage.getItem('cartProducts')));
    window.location.href = "checkout.html";
  })
}

productDetails = (e, id) => {
  var product;
  console.log(products);
  for (var i in products) {
    if (products[i].id == id) {
      product = products[i];
    }
  }
  var queryString = "?product=" + JSON.stringify(product);
  window.location.href = "product-details.html" + queryString;
}

var categories = {
  pulpyPure : 'Pulpy Pure',
  dailyDetox : 'Daily Detox',
  desiSplash : 'Desi Splash',
  exoticDelight : 'Exotic Delight'
}

var namee = document.getElementById('name');
var category = document.getElementById('category');
var category_description = document.getElementById('category_description');
var price = document.getElementById('price');
var description = document.getElementById('description');
var category1 = document.getElementById('category1');
var productPic = document.getElementsByClassName('portfolio-details-carousel')[0];

if (namee != null) {
  namee.innerHTML = product.name + " [" + product.bottle_type + "]";
}
if (category != null) {
  category.innerHTML = categories[product.category];
}
if (description != null && product.description != '') {
  description.innerHTML = product.description;
}
if (category_description != null) {
  category_description.innerHTML = product_categories[product.category];
}
if (price != null) {
  price.innerHTML = product.price;
}
if (category1 != null) {
  category1.innerHTML = categories[product.category]
}
if (productPic != null) {
  //productPic.setAttribute('src', product.image);
  var img = document.createElement('img');
  img.setAttribute('src', product.image);
  img.setAttribute('class', 'img-fluid');
  productPic.appendChild(img);
}

function scrolltoTop(){
  window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
};

var logout = document.getElementById('logout');
var userPage = document.getElementById('userPage');

if (logout != null) {
if (localStorage.getItem('access')) {
  fetch('http://localhost:8000/auth/jwt/verify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token : localStorage.getItem('access')}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (data['code'] == "token_not_valid") {
        logout.innerHTML = 'Sign In';
        userPage.style.display = "none";

      } else {
        logout.innerHTML = 'Logout';
        userPage.style.display = "flex";

      }
    })
    .catch((error) => {
      console.error('Error:', error);
      logout.innerHTML = 'Sign In';
      userPage.style.display = "none";

    });
} else {
  logout.innerHTML = 'Sign In';
  userPage.style.display = "none";

}

logout.addEventListener('click', () => {
  if (logout.innerHTML == 'Logout') {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = 'index.html';
  } else {
    window.location.href = 'login.html';
  }
});
}


$(function(){
  var current_path = location.pathname;
  current_path = current_path[0] == '/' ? current_path.substr(1) : current_path;

  $('.nav-menu li a').each(function(){
      var $this = $(this);
      // if the current path is like this link, make it active and enable scrollTotop
      if($this.attr('href') == current_path){
          $this.parents('li').addClass('active');
          $this.on("click", function() {
            $("html").animate({ scrollTop: 0}, 600 );
          });
      }else{
        $this.parents('li').removeClass('active');

      }
  })
})

$(function(){
  var current_path = location.pathname;
  current_path = current_path[0] == '/' ? current_path.substr(1) : current_path;
  $('.footer-links li a').each(function(){
      var $this = $(this);
      // if the current path is like this link, enable scrollTotop
      if($this.attr('href') == current_path){
          $this.on("click", function() {
            $("html").animate({ scrollTop: 0}, 600 );
            return false;
          });
      }
  })
})