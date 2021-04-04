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
console.log(products);

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

var images = ['assets/img/portfolio/portfolio-1.jpg', 
'assets/img/portfolio/portfolio-2.jpg',
'assets/img/portfolio/portfolio-3.jpg',
'assets/img/portfolio/portfolio-4.jpg',
'assets/img/portfolio/portfolio-5.jpg',
'assets/img/portfolio/portfolio-6.jpg',
'assets/img/portfolio/portfolio-7.jpg',
'assets/img/portfolio/portfolio-8.jpg',
'assets/img/portfolio/portfolio-9.jpg',
'assets/img/portfolio/portfolio-3.jpg',
'assets/img/portfolio/portfolio-4.jpg',
'assets/img/portfolio/portfolio-2.jpg',
'assets/img/portfolio/portfolio-3.jpg',
'assets/img/portfolio/portfolio-4.jpg',
'assets/img/portfolio/portfolio-5.jpg',
'assets/img/portfolio/portfolio-6.jpg',
'assets/img/portfolio/portfolio-7.jpg',
'assets/img/portfolio/portfolio-8.jpg',
'assets/img/portfolio/portfolio-9.jpg',
'assets/img/portfolio/portfolio-3.jpg',
'assets/img/portfolio/portfolio-4.jpg',
'assets/img/portfolio/portfolio-3.jpg',
'assets/img/portfolio/portfolio-4.jpg']

images = [
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

var cart = document.getElementById('cart');
if (cart != null) {
  cart.addEventListener('click', () => {
    if (localStorage.getItem('cartProducts')) {
      var cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    } else {
      var cartProducts = []
    }
    cartList = localStorage.getItem('cartList');
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