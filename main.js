//スライド1枚あたりの幅（px）
const slideWidth = 800;

//現在表示中のスライドがなんばん目か（０から数え始める）
let currentSlide = 0;

//スライドの全枚数
let numSlides;

//index(０から始まる)番目のスライドを表示する関数
const showSlide = (index) => {
  //1番目のスライドでは左矢印を非表示
  if (index === 0) {
    $('.carousel-control-prev').hide();
  }
  else {
    $('.carousel-control-prev').show();
  }

  //最後のスライドでは右矢印を非表示
  if (index === numSlides - 1) {
    $('.carousel-control-next').hide();
  }
  else {
    $('.carousel-control-next').show();
  }

};

//左矢印がクリックされたら1つ前のスライドを表示
$('.carousel-control-prev').on('click', (e) => {
  e.preventDefault();

  currentSlide -= 1;
  showSlide(currentSlide);
});

//右矢印がクリックされたら１つ後のスライドを表示
$('.carousel-control-next').on('click', (e) => {
  e.preventDefault();

  currentSlide += 1;
  showSlide(currentSlide);
});

//スライドが全部で何枚あるか取得
numSlides = $('.slides > li').length;

//最初のスライドを表示
showSlide(currentSlide);


/**
 * ----------------------
 * 指定された名前のタブを表示
 * ----------------------
 */
const showTab = (tabName) => {
  // すでに表示されている場合は何もせずに終了
  if ($(`#${tabName}`).is(':visible')) {
    return;
  }

  const tabsContainer = $(`a[href='#${tabName}']`).closest('.tabs');
  // .tabs__menu liのうちtabNameに該当するものにだけactiveクラスを付ける
  tabsContainer.find('.tabs__menu li').removeClass('active');
  tabsContainer
    .find(`.tabs__menu a[href='#${tabName}']`)
    .parent('li')
    .addClass('active');

  // .tabs__contentの直下の要素をすべて非表示
  tabsContainer.find('.tabs__content > *').css({ display: 'none' });
  // #<tabName>と.tabs__content .<tabName>を表示
  tabsContainer
    .find(`#${tabName}, .tabs__content .${tabName}`)
    .css({
      display: 'block',
      opacity: 0.7,
    })
    .animate({
      opacity: 1,
    },
    400,
    );
};

// タブがクリックされたらコンテンツを表示
$('.tabs__menu a').on('click', (e) => {
  const tabName = $(e.currentTarget).attr('href');

  // hrefにページ遷移しない
  e.preventDefault();

  if (tabName[0] === '#') {
    // hrefの先頭の#を除いたものをshowTab()関数に渡す
    showTab(tabName.substring(1));
  }
});

// 初期状態として1番目のタブを表示
showTab('asia-1');
showTab('europe-1');
showTab('africa-1');
showTab('s-america-1');
showTab('oceania-1');
