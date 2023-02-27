const animeParams = {
  targets: '.background',
  backgroundPosition: [
    {value: '0% 0%', duration: 4000},
    {value: '100% 0%', duration: 4000},
    {value: '100% 100%', duration: 4000},
    {value: '0% 100%', duration: 4000},
    {value: '0% 0%', duration: 4000},
  ],
  easing: 'linear',
  duration: 20000,
  loop: true
};

anime(animeParams);
