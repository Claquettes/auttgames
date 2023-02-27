const animeParams = {
  targets: '.background',
  scale: [
    {value: 1, easing: 'easeOutSine', duration: 1000},
    {value: 1.2, easing: 'easeInOutQuad', duration: 1200},
    {value: 1, easing: 'easeOutSine', duration: 1000},
    {value: 1.1, easing: 'easeInOutQuad', duration: 1200},
    {value: 1, easing: 'easeOutSine', duration: 1000}
  ],
  backgroundColor: [
    {value: '#1c1c1c'},
    {value: '#3b3b3b'},
    {value: '#1c1c1c'}
  ],
  easing: 'linear',
  duration: 5000,
  loop: true
};

anime(animeParams);
