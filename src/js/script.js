$(document).ready(function(){
	// Slick slider
	$('.carousel__inner').slick({
		speed: 1000,
		infinite: true,
		// adaptiveHeight: true,
		// prevArrow: '<button type="button" class="slick-prev"><img src="img/slider/arrow-left.png"></button>',
		// nextArrow: '<button type="button" class="slick-next"><img src="img/slider/arrow-right.png"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		nextArrow:'<button type="button" class="slick-next"></button>',
		responsive: [
				{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false,
					}
				}
			]
		});

		$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
			$(this)
			  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
		  });

		function toggleSlide(item){
			$(item).each(function(i){
				$(this).on('click', function(e){
					e.preventDefault();
					$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
					$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
				})
			})
		};

		toggleSlide('.catalog-item__link');
		toggleSlide('.catalog-item__back');

		// Modal

		$('[data-modal=consultation]').on('click', function(){
			$('.overlay, #consultation').fadeIn('slow');
		});
		$('.modal__close').on('click', function(){
			$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
		});
		

		$('.button_purchase').each(function(i){
			$(this).on('click', function(){
				$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
				$('.overlay, #order').fadeIn('slow');
			})
		});

		function validateForms(form){
			$(form).validate({
				rules: {
					name: {
						required: true
					},
					phone: {
						required: true
					},
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					name: {
						required: "Введите имя",
						minlength: jQuery.validator.format("Введите минимум {0} символа!")
					  },
					phone:{
						required: "Введите ваш номер телефона",
						// minlength: jQuery.validator.format("Ваш номер должен иметь {0} цифр!")
					  },
					email: {
					  required: "Введите почту",
					  email: "Неверный формат, пример: name@domain.com"
					}
				  }
			});
		}

		validateForms('#consultation form');
		validateForms('#order form');
		validateForms('#consultation-form');

		$('input[name=phone]').mask("+380 (999) 999-9999");

		$('form').submit(function(e){
			e.preventDefault();

			if(!$(this).validate()){
				return;
			}

			$.ajax({
				type: "POST",
				url: "mailer/smart.php",
				data: $(this).serialize()
			}).done(function(){
				$(this).find("input").val("");
				$('#consultation, #order').fadeOut();
				$('.overlay, #thanks').fadeIn('slow');

				$('form').trigger('reset');
			});
			return false;
		});

	// smooth scroll

	$(window).scroll(function(){
		if ($(this).scrollTop() > 1600){
			$('.pageup').fadeIn();
		} else{
			$('.pageup').fadeOut();
		}
	});

	new WOW().init();
});