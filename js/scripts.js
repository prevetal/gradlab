WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Object info
	let objectInfo = document.querySelector('.object_info .swiper')

	if (objectInfo) {
		new Swiper('.object_info .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true
		})
	}


	// Objects slider
	const objectsSliders = [],
		objects = document.querySelectorAll('.objects .swiper')

	objects.forEach((el, i) => {
		el.classList.add('objects_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			spaceBetween: 16,
			breakpoints: {
				0: {
					slidesPerView: 'auto'
				},
				1024: {
					slidesPerView: 3
				},
				1440: {
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.object')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.object')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		}

		objectsSliders.push(new Swiper('.objects_s' + i, options))
	})


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Menu
	$('header .menu_btn, .menu_modal .close_btn').click(e => {
		e.preventDefault()

		$('header .menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('.menu_modal').toggleClass('show')
	})


	// Animate
	const boxes = document.querySelectorAll('.animate')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio >= 0.2 && !entry.target.classList.contains('animated')) {
				entry.target.classList.add('animated')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))


	// Cookie
	setTimeout(() => $('.cookie').fadeIn(300), 1500)

	$('.cookie .btn').click(function(e) {
		e.preventDefault()

		$('.cookie').fadeOut(300)
	})


	// Animate logo
	let svgs = Array.prototype.slice.call(document.querySelectorAll('.first_section .logo svg')),
        svgArr = new Array()

    svgs.forEach(function(el, i) {
        let svg = new SVGEl(el)

        svgArr[i] = svg

        setTimeout(function(el) {
            return function() {
                if( inViewport(el.parentNode) ) {
                    svg.render()
                }
            }
        }(el), 800)
    })


	// Directions
	$('.directions .item').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 360) document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})